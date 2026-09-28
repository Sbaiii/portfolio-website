/* =============================================================================
   query.js — the ⌘K / Ctrl+K easter egg.

   A deliberately small SQL dialect over the site's own content:
     SELECT <cols|*> FROM <table> [WHERE <col> <op> <value>] [ORDER BY <col> [ASC|DESC]] [LIMIT n]

   Everything runs locally against the objects in content.js. There is no
   database and no request.
   ========================================================================== */

import { PROFILE, TRAJECTORY, PROJECTS, STACK, EDUCATION } from '../content.js';
import { t, formatRange, formatMonth } from './main.js';
import { session } from './session.js';

const SKILL_TYPE = { code: 'language', data: 'data', db: 'database', web: 'web' };

/** The queryable tables, rebuilt per call so translated columns stay current. */
function tables() {
    return {
        abdellah: [{
            name: PROFILE.name,
            role: t('masthead.role'),
            status: t('masthead.status'),
            based: `${PROFILE.base.city} (${PROFILE.base.offset})`,
            degree: EDUCATION.degree,
            email: PROFILE.email,
        }],
        experience: TRAJECTORY.filter((p) => p.type === 'work').map((p) => ({
            org: p.org,
            role: t(`trajectory.roles.${p.id}.role`),
            city: p.city,
            country: p.country,
            latitude: `${p.lat}°N`,
            date: formatRange(p.start, p.end),
            _sort: p.start,
        })),
        education: [{
            degree: EDUCATION.degree,
            institutions: EDUCATION.institutions.join(' + '),
            status: t('masthead.status'),
        }],
        skills: STACK.flatMap((g) => g.items.map((s) => ({
            skill: s,
            type: SKILL_TYPE[g.id] ?? g.id,
            group: t(`stack.groups.${g.id}`),
        }))),
        projects: PROJECTS.map((p) => ({
            project: t(`work.projects.${p.id}.title`),
            tags: p.tags.join(', ') || '—',
            status: p.status,
            url: p.repo || '—',
        })),
        contact: [
            { channel: 'email', value: PROFILE.email },
            { channel: 'linkedin', value: PROFILE.links.linkedin },
            { channel: 'github', value: PROFILE.links.github },
            { channel: 'kaggle', value: PROFILE.links.kaggle },
            { channel: 'cv', value: 'https://sbaiii.com/assets/resume.pdf' },
        ],
    };
}

const RE = /^\s*select\s+(.+?)\s+from\s+([a-z_]+)\s*(?:where\s+([a-z_]+)\s*(=|!=|like|>|<)\s*'?([^']*?)'?\s*)?(?:order\s+by\s+([a-z_]+)\s*(asc|desc)?\s*)?(?:limit\s+(\d+)\s*)?;?\s*$/i;

function run(input) {
    const db = tables();
    const q = input.trim();

    if (/^\s*(help|\?)\s*;?$/i.test(q)) {
        return { cols: ['table', 'rows'], rows: Object.entries(db).map(([k, v]) => ({ table: k, rows: v.length })) };
    }

    const m = RE.exec(q);
    if (!m) throw new Error('parse');

    const [, colsRaw, tableRaw, whereCol, op, whereVal, orderCol, dir, limit] = m;
    const table = db[tableRaw.toLowerCase()];
    if (!table) {
        throw new Error(`no such table: ${tableRaw}. try: ${Object.keys(db).join(', ')}`);
    }

    let rows = table.map((r) => ({ ...r }));

    if (whereCol) {
        const key = Object.keys(rows[0] || {}).find((k) => k.toLowerCase() === whereCol.toLowerCase());
        if (!key) throw new Error(`no such column: ${whereCol}`);
        const needle = String(whereVal).toLowerCase();
        rows = rows.filter((r) => {
            const v = String(r[key]).toLowerCase();
            switch (op.toLowerCase()) {
                case '=': return v === needle;
                case '!=': return v !== needle;
                case 'like': return v.includes(needle.replace(/%/g, ''));
                case '>': return v > needle;
                case '<': return v < needle;
                default: return true;
            }
        });
    }

    if (orderCol) {
        // Sort on the hidden ISO value where one exists: the visible `date` column
        // is a localised string, so "Sep 2024" would sort above "Jan 2026".
        const wanted = orderCol.toLowerCase();
        const hidden = `_${wanted}`;
        const key = (rows[0] && hidden in rows[0]) ? hidden
            : (wanted === 'date' && rows[0] && '_sort' in rows[0]) ? '_sort'
                : Object.keys(rows[0] || {}).find((k) => k.toLowerCase() === wanted);
        if (key) {
            rows.sort((a, b) => String(a[key]).localeCompare(String(b[key])));
            if ((dir || '').toLowerCase() === 'desc') rows.reverse();
        }
    }

    if (limit) rows = rows.slice(0, Number(limit));

    let cols = Object.keys(rows[0] || table[0] || {}).filter((c) => !c.startsWith('_'));
    if (colsRaw.trim() !== '*') {
        const want = colsRaw.split(',').map((c) => c.trim().toLowerCase());
        const picked = cols.filter((c) => want.includes(c.toLowerCase()));
        if (picked.length) cols = picked;
    }

    return { cols, rows };
}

/* --- UI ------------------------------------------------------------------- */

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]
));

export function mountQuery() {
    const overlay = document.getElementById('query');
    const input = document.getElementById('query-input');
    const out = document.getElementById('query-out');
    const chips = document.getElementById('query-chips');
    const openBtn = document.getElementById('query-open');
    if (!overlay) return;

    let lastFocus = null;

    const renderChips = () => {
        const keys = ['all', 'france', 'recent', 'db', 'projects', 'contact'];
        chips.innerHTML = keys
            .map((k) => `<button class="chip" data-q="${esc(t(`query.chips.${k}`))}">${esc(t(`query.chips.${k}`))}</button>`)
            .join('');
    };

    const show = (html) => { out.innerHTML = html; };

    const execute = (q) => {
        input.value = q;
        if (!q.trim()) { show(''); return; }
        try {
            const { cols, rows } = run(q);
            if (!rows.length) {
                show(`<p class="query__status">${esc(t('query.empty'))}</p>`);
                return;
            }
            show(`
                <p class="query__status">${rows.length} ${esc(t('query.rows'))}</p>
                <table class="qtable">
                    <thead><tr>${cols.map((c) => `<th>${esc(c)}</th>`).join('')}</tr></thead>
                    <tbody>${rows.map((r) => `<tr>${cols.map((c) => `<td>${esc(r[c] ?? '—')}</td>`).join('')}</tr>`).join('')}</tbody>
                </table>`);
        } catch (err) {
            const hints = [t('query.errorHints.0'), t('query.errorHints.1'), t('query.errorHints.2')];
            const detail = err.message === 'parse'
                ? hints[Math.floor(Math.random() * hints.length)]
                : err.message;
            show(`<p class="query__status is-error">${esc(t('query.error'))} — ${esc(detail)}</p>`);
        }
    };

    const open = () => {
        lastFocus = document.activeElement;
        overlay.hidden = false;
        overlay.classList.add('is-open');
        session.queryOpened = true;
        renderChips();
        input.placeholder = t('query.placeholder');
        input.focus();
        if (!out.innerHTML) execute(t('query.chips.all'));
    };

    const close = () => {
        overlay.classList.remove('is-open');
        overlay.hidden = true;
        if (lastFocus) lastFocus.focus();
    };

    openBtn?.addEventListener('click', open);

    document.addEventListener('keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            overlay.classList.contains('is-open') ? close() : open();
            return;
        }
        if (e.key === 'Escape' && overlay.classList.contains('is-open')) close();
    });

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) close();
    });

    chips.addEventListener('click', (e) => {
        const chip = e.target.closest('.chip');
        if (chip) { execute(chip.dataset.q); input.focus(); }
    });

    let debounce;
    input.addEventListener('input', () => {
        clearTimeout(debounce);
        debounce = setTimeout(() => execute(input.value), 220);
    });

    // Keep focus inside the dialog while it is open.
    overlay.addEventListener('keydown', (e) => {
        if (e.key !== 'Tab') return;
        const focusables = [...overlay.querySelectorAll('input, button')];
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });

    document.addEventListener('langchange', () => {
        if (overlay.classList.contains('is-open')) { renderChips(); execute(input.value); }
    });
}

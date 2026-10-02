/* =============================================================================
   page.js: the Ticket to Breathe case study.

   Theme, reveal and scramble come from js/chrome.js so there is one copy of
   them for the whole site. Everything else here is specific to this page.

   Nothing on this page draws a measurement. The only graphic with an axis is
   the policy timeline in fig. 01, and that axis is time.
   ========================================================================== */

import {
    $, $$, resolveKey, initTheme, scrambleTo, observeReveals, revealOnScreen,
} from '/js/chrome.js';
import { PAGE, LANGS } from './strings.js';
import { LOG } from './log.js';

const REPO = 'https://github.com/Sbaiii/ticket-to-breathe';
const DECISIONS = `${REPO}/blob/main/lab-notebook/04%20Decisions`;
const BREAKPOINT = 760;
const QUESTIONS = ['q1', 'q2', 'q3'];

let lang = 'en';

function t(path) {
    const hit = resolveKey(PAGE[lang], path);
    if (typeof hit === 'string') return hit;
    const fallback = resolveKey(PAGE.en, path);
    return typeof fallback === 'string' ? fallback : path;
}

/* --- fig. 01: the policy timeline ----------------------------------------- */

/* Months counted from January 2022. The axis runs two full years, which is the
   shortest span that holds all three policies and the gap between them. */
const MONTHS = 24;
const ROWS = [
    { name: '€9 ticket', when: 'whenSummer', from: 5, to: 8 },
    { name: 'Tankrabatt', when: 'whenSummer', from: 5, to: 8, confounder: true },
    { name: 'Deutschlandticket', when: 'whenFrom', from: 16, to: null },
];

/**
 * Three policies on a shared time axis. A row of labelled bars where there is
 * room, and a stack on a phone, rather than one diagram scaled down until the
 * dates are unreadable. The Deutschlandticket has no end date, so its bar ends
 * in a point instead of an edge.
 */
function renderTimeline() {
    const wide = window.innerWidth > BREAKPOINT;

    const W = wide ? 720 : 340;
    const x0 = wide ? 160 : 12;
    const x1 = wide ? 704 : 328;
    const barH = wide ? 22 : 18;
    const axisY = wide ? 146 : 188;
    const H = wide ? 176 : 218;

    const at = (month) => x0 + (month / MONTHS) * (x1 - x0);
    const mid = at(12);

    const rows = ROWS.map((row, i) => {
        // Beside the bar on a wide screen, above it on a narrow one.
        const centre = 28 + i * 44;
        const top = 12 + i * 54;
        const barY = wide ? centre - barH / 2 : top + 30;
        const anchor = wide ? 'end' : 'start';
        const textX = wide ? 142 : x0;
        const nameY = wide ? centre - 3 : top + 10;
        const whenY = wide ? centre + 11 : top + 23;

        const a = at(row.from);
        const b = row.to === null ? at(MONTHS) : at(row.to);
        const cls = `tl-bar${row.confounder ? ' tl-bar--confound' : ''}`;
        const bar = row.to === null
            ? `<path class="${cls}" d="M${a} ${barY} L${b - 7} ${barY} L${b} ${barY + barH / 2} L${b - 7} ${barY + barH} L${a} ${barY + barH} Z" />`
            : `<rect class="${cls}" x="${a}" y="${barY}" width="${b - a}" height="${barH}" rx="4" />`;

        return `
            <text class="tl-name" x="${textX}" y="${nameY}" text-anchor="${anchor}">${row.name}</text>
            <text class="tl-when" x="${textX}" y="${whenY}" text-anchor="${anchor}">${t(`experiment.${row.when}`)}</text>
            ${bar}`;
    }).join('');

    $('#timeline').innerHTML = `
        <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${t('experiment.alt')}">
            <line class="tl-grid" x1="${mid}" y1="8" x2="${mid}" y2="${axisY}" />
            ${rows}
            <line class="tl-axis" x1="${x0}" y1="${axisY}" x2="${x1}" y2="${axisY}" />
            <text class="tl-year" x="${(x0 + mid) / 2}" y="${axisY + 18}" text-anchor="middle">2022</text>
            <text class="tl-year" x="${(mid + x1) / 2}" y="${axisY + 18}" text-anchor="middle">2023</text>
        </svg>`;
}

/* --- fig. 02: the three questions ----------------------------------------- */

function renderQuestions() {
    const host = $('#questions');
    host.innerHTML = QUESTIONS.map((id, i) => `
        <article class="qcard reveal">
            <span class="qcard__n">Q${i + 1}</span>
            <h3 class="qcard__q">${t(`questions.items.${id}.q`)}</h3>
            <dl class="qcard__meta">
                <div>
                    <dt>${t('questions.decides')}</dt>
                    <dd>${t(`questions.items.${id}.decides`)}</dd>
                </div>
                <div>
                    <dt>${t('questions.metric')}</dt>
                    <dd class="qcard__metric">${t(`questions.items.${id}.metric`)}</dd>
                </div>
            </dl>
        </article>`).join('');
    observeReveals(host);
}

/* --- fig. 03: the pipeline ------------------------------------------------ */

const STEPS = [
    ['sources', 'sourcesNote'], ['extract', 'extractNote'], ['warehouse', 'warehouseNote'],
    ['deweather', 'deweatherNote'], ['causal', 'causalNote'], ['page', 'pageNote'],
];

/**
 * Six boxes and five arrows. Laid out left to right where there is room and
 * stacked top to bottom on a phone, rather than scaling one diagram down until
 * the labels are unreadable.
 */
function renderPipeline() {
    const wide = window.innerWidth > BREAKPOINT;
    const host = $('#pipeline');

    // Wider boxes and a tighter gap than the Negative Hours diagram: the method
    // names here are longer, and French is the worst case.
    const boxW = wide ? 186 : 260;
    const boxH = wide ? 92 : 74;
    const gap = wide ? 20 : 30;
    const pad = 20;
    const W = wide ? pad * 2 + STEPS.length * boxW + (STEPS.length - 1) * gap : 340;
    const H = wide ? boxH + 60 : STEPS.length * (boxH + gap) + 24;

    const pos = (i) => (wide
        ? { x: pad + i * (boxW + gap), y: 20 }
        : { x: (W - boxW) / 2, y: 12 + i * (boxH + gap) });

    const boxes = STEPS.map(([key, note], i) => {
        const { x, y } = pos(i);
        return `
            <g class="pl-step">
                <rect class="pl-box" x="${x}" y="${y}" width="${boxW}" height="${boxH}" rx="10" />
                <text class="pl-title" x="${x + boxW / 2}" y="${y + (wide ? 38 : 30)}" text-anchor="middle">${t(`pipeline.steps.${key}`)}</text>
                <text class="pl-note" x="${x + boxW / 2}" y="${y + (wide ? 60 : 50)}" text-anchor="middle">${t(`pipeline.steps.${note}`)}</text>
            </g>`;
    }).join('');

    const arrows = STEPS.slice(0, -1).map((_, i) => {
        const a = pos(i);
        const b = pos(i + 1);
        return wide
            ? `<path class="pl-arrow" d="M${a.x + boxW + 6} ${a.y + boxH / 2} L${b.x - 6} ${b.y + boxH / 2}" marker-end="url(#pl-head)" />`
            : `<path class="pl-arrow" d="M${a.x + boxW / 2} ${a.y + boxH + 5} L${b.x + boxW / 2} ${b.y - 5}" marker-end="url(#pl-head)" />`;
    }).join('');

    host.innerHTML = `
        <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${stepsSentence()}">
            <defs>
                <marker id="pl-head" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="6" markerHeight="6" orient="auto">
                    <path d="M0 0 L8 4 L0 8 z" fill="currentColor" />
                </marker>
            </defs>
            ${arrows}
            ${boxes}
        </svg>`;
}

/** The diagram's content as a sentence, for anyone not seeing the diagram. */
function stepsSentence() {
    return STEPS.map(([k]) => t(`pipeline.steps.${k}`)).join(' → ');
}

/* --- fig. 04: decision records -------------------------------------------- */

/* Three of these are written up in the repository. The fourth is a caveat
   about the analysis rather than a decision, so it has no record to link to
   and says so instead of pointing at a file that does not exist. */
const ADRS = [
    { id: 'controls', file: 'ADR-002 Control countries and station filter.md' },
    { id: 'clock', file: 'ADR-003 Time-zone rule for EEA timestamps.md' },
    { id: 'verified', file: 'ADR-004 Analysis window.md' },
    { id: 'confounder', file: null },
];

function renderDecisions() {
    const host = $('#decisions');
    host.innerHTML = ADRS.map(({ id, file }) => `
        <article class="dcard reveal">
            <span class="meta">${file ? file.split(' ')[0] : t('decisions.caveat')}</span>
            <h3 class="dcard__title">${t(`decisions.items.${id}.title`)}</h3>
            <p class="dcard__body">${t(`decisions.items.${id}.body`)}</p>
            ${file
            ? `<a class="btn btn--text" href="${DECISIONS}/${encodeURIComponent(file)}"
                   target="_blank" rel="noopener noreferrer">${t('decisions.read')}</a>`
            : ''}
        </article>`).join('');
    observeReveals(host);
}

/* --- fig. 05: build log --------------------------------------------------- */

function renderLog() {
    const host = $('#log');
    if (!LOG.length) {
        host.innerHTML = `<p class="lead">${t('log.empty')}</p>`;
        return;
    }
    const fmt = new Intl.DateTimeFormat(lang, { day: '2-digit', month: 'short', year: 'numeric' });
    host.innerHTML = LOG.map((entry) => {
        const [y, m, d] = entry.date.split('-').map(Number);
        const when = fmt.format(new Date(y, m - 1, d)).replace('.', '');
        return `
            <li class="logitem reveal">
                <time class="logitem__date" datetime="${entry.date}">${when}</time>
                <p class="logitem__text">${entry[lang] || entry.en}</p>
            </li>`;
    }).join('');
    observeReveals(host);
}

/* --- fig. 06: results, deliberately empty --------------------------------- */

function renderResults() {
    const host = $('#results');
    host.innerHTML = QUESTIONS.map((id, i) => `
        <div class="rslot reveal">
            <span class="rslot__n">Q${i + 1}</span>
            <p class="rslot__q">${t(`questions.items.${id}.q`)}</p>
            <p class="rslot__pending">${t('results.awaiting')}</p>
        </div>`).join('');
    observeReveals(host);
}

/* --- i18n + boot ---------------------------------------------------------- */

function applyI18n(animate = false) {
    $$('[data-i18n]').forEach((node) => {
        const value = t(node.getAttribute('data-i18n'));
        if (node.textContent.trim() === value) return;
        if (animate) scrambleTo(node, value);
        else node.textContent = value;
    });
    $$('[data-i18n-attr]').forEach((node) => {
        const [attr, key] = node.getAttribute('data-i18n-attr').split(':');
        node.setAttribute(attr, t(key));
    });
}

function renderAll(animate = false) {
    applyI18n(animate);
    renderTimeline();
    renderQuestions();
    renderPipeline();
    renderDecisions();
    renderLog();
    renderResults();
}

function setLanguage(next, animate = true) {
    if (!LANGS.includes(next)) next = 'en';
    if (next === lang) return;
    lang = next;
    document.documentElement.setAttribute('lang', lang);
    $('#lang-code').textContent = PAGE[lang].lang.code;
    $$('#lang-menu button').forEach((b) => b.setAttribute('aria-current', String(b.dataset.lang === lang)));
    $$('#nav-langs button').forEach((b) => b.setAttribute('aria-current', String(b.dataset.lang === lang)));
    renderAll(animate);
    try { localStorage.setItem('portfolio_lang', lang); } catch (e) { /* noop */ }
}

function initLang() {
    const btn = $('#lang-btn');
    const menu = $('#lang-menu');
    const setOpen = (open) => {
        menu.classList.toggle('is-open', open);
        btn.setAttribute('aria-expanded', String(open));
    };
    btn.addEventListener('click', (e) => { e.stopPropagation(); setOpen(!menu.classList.contains('is-open')); });
    $$('button', menu).forEach((b) => b.addEventListener('click', () => { setLanguage(b.dataset.lang); setOpen(false); }));
    $$('#nav-langs button').forEach((b) => b.addEventListener('click', () => setLanguage(b.dataset.lang)));
    document.addEventListener('click', (e) => { if (!e.target.closest('.lang')) setOpen(false); });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menu.classList.contains('is-open')) { setOpen(false); btn.focus(); }
    });

    let saved = null;
    try { saved = localStorage.getItem('portfolio_lang'); } catch (e) { /* noop */ }
    if (saved && saved !== 'en') setLanguage(saved, false);
}

function initNav() {
    const header = $('#header');
    const nav = $('#nav');
    const btn = $('#menu-btn');

    let queued = false;
    window.addEventListener('scroll', () => {
        if (queued) return;
        queued = true;
        requestAnimationFrame(() => {
            header.classList.toggle('is-scrolled', window.scrollY > 24);
            queued = false;
        });
    }, { passive: true });

    const setMenu = (open) => {
        nav.classList.toggle('is-open', open);
        btn.classList.toggle('is-open', open);
        btn.setAttribute('aria-expanded', String(open));
        btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        document.documentElement.classList.toggle('nav-open', open);
    };
    btn.addEventListener('click', () => setMenu(!nav.classList.contains('is-open')));
    $$('a', nav).forEach((a) => a.addEventListener('click', () => setMenu(false)));
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && nav.classList.contains('is-open')) { setMenu(false); btn.focus(); }
    });
    window.addEventListener('resize', () => {
        if (window.innerWidth > 860 && nav.classList.contains('is-open')) setMenu(false);
    });
}

function boot() {
    document.documentElement.classList.add('js');
    $('#year').textContent = String(new Date().getFullYear());

    initTheme();
    initLang();
    initNav();
    renderAll();
    observeReveals();

    const settle = () => revealOnScreen();
    window.addEventListener('load', settle);
    document.addEventListener('visibilitychange', () => { if (!document.hidden) settle(); });

    // Both diagrams swap between a row and a column, so they redraw on resize.
    let mode = window.innerWidth > BREAKPOINT;
    let timer;
    window.addEventListener('resize', () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            const next = window.innerWidth > BREAKPOINT;
            if (next !== mode) { mode = next; renderTimeline(); renderPipeline(); }
        }, 160);
    });

    // eslint-disable-next-line no-console
    console.log(
        `%cTicket to Breathe%c\n\nGermany's €9 ticket, and whether it shows up in the air.\nNo results on the page until the numbers are real.\n\n${REPO}`,
        'font:600 18px/1.4 ui-monospace,monospace;color:#1b4dff',
        'font:12px/1.6 ui-monospace,monospace;color:#888',
    );
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();

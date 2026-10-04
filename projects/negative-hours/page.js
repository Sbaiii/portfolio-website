/* =============================================================================
   page.js: the Negative Hours case study.

   Theme, reveal and scramble come from js/chrome.js so there is one copy of
   them for the whole site. Everything else here is specific to this page.
   ========================================================================== */

import {
    $, $$, reduceMotion, resolveKey, initTheme, scrambleTo, observeReveals, revealOnScreen,
} from '/js/chrome.js';
import { PAGE, LANGS } from './strings.js';

const REPO = 'https://github.com/Sbaiii/negative-hours';
const DECISIONS = `${REPO}/blob/main/control-room/04%20Decisions`;
const BREAKPOINT = 760;
const QIDS = ['q1', 'q2', 'q3', 'q4'];
const FIG_DIR = '/assets/projects/negative-hours';

let lang = 'en';

function t(path) {
    const hit = resolveKey(PAGE[lang], path);
    if (typeof hit === 'string') return hit;
    const fallback = resolveKey(PAGE.en, path);
    return typeof fallback === 'string' ? fallback : path;
}

const el = (tag, cls, html) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html !== undefined) n.innerHTML = html;
    return n;
};

/* --- fig. 01: the illustrative price day ---------------------------------- */

function renderExplainer() {
    $('#price-day').innerHTML = `
        <svg viewBox="0 0 560 240" role="img" aria-label="${t('explain.caption')}">
            <line class="cd-zero" x1="54" y1="150" x2="534" y2="150" />
            <path class="cd-neg"
                d="M54 150 L130 146 L200 140 L250 170 L300 204 L350 196 L400 152 L470 140 L534 144 L534 150 Z" />
            <path class="cd-line"
                d="M54 78 L130 66 L200 84 L250 132 L300 204 L350 196 L400 120 L470 56 L534 72" />
            <text class="cd-label" x="10" y="40">${t('explain.axisPrice')}</text>
            <text class="cd-label" x="34" y="154">${t('explain.axisZero')}</text>
            <text class="cd-label" x="60" y="232">${t('explain.axisNight')}</text>
            <text class="cd-label" x="272" y="232" text-anchor="middle">${t('explain.axisNoon')}</text>
            <text class="cd-label" x="534" y="232" text-anchor="end">${t('explain.axisNight')}</text>
            <text class="cd-shaded" x="325" y="186" text-anchor="middle">${t('explain.shaded')}</text>
        </svg>`;
}

/* --- fig. 02: the four questions ------------------------------------------ */

function renderQuestions() {
    const host = $('#questions');
    host.innerHTML = QIDS.map((id, i) => `
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
    ['api', 'apiNote'], ['extract', 'extractNote'], ['parquet', 'parquetNote'],
    ['warehouse', 'warehouseNote'], ['analysis', 'analysisNote'], ['dashboard', 'dashboardNote'],
];

/**
 * Six boxes and five arrows. Laid out left to right where there is room and
 * stacked top to bottom on a phone, rather than scaling one diagram down until
 * the labels are unreadable.
 */
function renderPipeline() {
    const wide = window.innerWidth > BREAKPOINT;
    const host = $('#pipeline');

    const boxW = wide ? 176 : 260;
    const boxH = wide ? 92 : 74;
    const gap = wide ? 26 : 30;
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

const ADRS = [
    { id: 'stack', file: 'ADR-001 Stack.md' },
    { id: 'zones', file: 'ADR-002 Bidding Zones.md' },
    { id: 'storage', file: 'ADR-003 Raw Price Storage.md' },
];

function renderDecisions() {
    const host = $('#decisions');
    host.innerHTML = ADRS.map(({ id, file }) => `
        <article class="dcard reveal">
            <span class="meta">${file.split(' ')[0]}</span>
            <h3 class="dcard__title">${t(`decisions.items.${id}.title`)}</h3>
            <p class="dcard__body">${t(`decisions.items.${id}.body`)}</p>
            <a class="btn btn--text" href="${DECISIONS}/${encodeURIComponent(file)}"
               target="_blank" rel="noopener noreferrer">${t('decisions.read')}</a>
        </article>`).join('');
    observeReveals(host);
}

/* --- fig. 05: results ----------------------------------------------------- */

/* Only the questions listed here have a published answer. Everything else
   renders as a pending slot, so the page cannot assert a result it does not
   have: adding a key is the single act that publishes one. */
const ANSWERED = {
    q1: {
        notebook: 'https://github.com/Sbaiii/negative-hours/blob/main/analysis/q1_negative_hours.ipynb',
        // Intrinsic size in CSS pixels, so the space is reserved before the
        // image arrives and the section never shifts. Note these are not the
        // viewBox numbers: the files declare their size in points, so the
        // browser scales them by 96/72 to get the natural size.
        figures: [
            { file: 'q1_negative_hours_by_zone.svg', w: 1152, h: 634 },
            { file: 'q1_ytd_like_for_like.svg', w: 1056, h: 538 },
            { file: 'q1_frequency_vs_depth_2025.svg', w: 864, h: 576 },
            { file: 'q1_share_at_or_below_zero_2026.svg', w: 912, h: 499 },
        ],
    },
    q2: {
        notebook: 'https://github.com/Sbaiii/negative-hours/blob/main/analysis/q2_capture_prices.ipynb',
        figures: [
            { file: 'q2_solar_capture_rate_by_zone.svg', w: 1152, h: 634 },
            { file: 'q2_ytd_capture_rate.svg', w: 1056, h: 538 },
            { file: 'q2_cannibalisation_curve.svg', w: 1152, h: 653 },
        ],
    },
    q3: {
        linkKey: 'results.notebookModel',
        notebook: 'https://github.com/Sbaiii/negative-hours/blob/main/analysis/q3_battery_arbitrage.ipynb',
        figures: [
            { file: 'q3_revenue_by_zone_2025.svg', w: 1056, h: 557 },
            { file: 'q3_ytd_revenue.svg', w: 1056, h: 557 },
            { file: 'q3_revenue_vs_negative_hours.svg', w: 1056, h: 595 },
        ],
    },
    q4: {
        linkKey: 'results.notebookShort',
        notebook: 'https://github.com/Sbaiii/negative-hours/blob/main/analysis/q4_ev_charging.ipynb',
        figures: [
            { file: 'q4_cheapest_hour_2019_vs_2025.svg', w: 1056, h: 538 },
            { file: 'q4_smart_charging_savings_2025.svg', w: 1056, h: 557 },
        ],
    },
};

function renderResults() {
    const host = $('#results');

    const answered = QIDS.filter((id) => ANSWERED[id]).map((id) => {
        const { notebook, figures, linkKey } = ANSWERED[id];
        const n = QIDS.indexOf(id) + 1;

        const plates = figures.map((f, j) => `
            <figure class="rfig">
                <div class="rfig__canvas">
                    <img src="${FIG_DIR}/${f.file}" width="${f.w}" height="${f.h}"
                         loading="lazy" decoding="async"
                         alt="${t(`results.answers.${id}.fig${j + 1}Alt`)}">
                </div>
                <figcaption class="meta rfig__caption">${t(`results.answers.${id}.fig${j + 1}Caption`)}</figcaption>
            </figure>`).join('');

        // A caveat is optional: an answer that needs one says so under the
        // claim, where it cannot be read separately from it.
        const caveatKey = `results.answers.${id}.caveat`;
        const caveat = t(caveatKey);

        return `
            <article class="rans reveal">
                <div class="rans__head">
                    <span class="rslot__n">Q${n}</span>
                    <span class="badge badge--done">${t('results.answered')}</span>
                </div>
                <h3 class="rans__q">${t(`questions.items.${id}.q`)}</h3>
                <p class="rans__summary">${t(`results.answers.${id}.summary`)}</p>
                ${caveat === caveatKey ? '' : `<p class="rans__caveat">${caveat}</p>`}
                <div class="rans__figures">${plates}</div>
                <a class="btn btn--text" href="${notebook}" target="_blank"
                   rel="noopener noreferrer">${t(linkKey || 'results.notebook')}</a>
            </article>`;
    }).join('');

    const waiting = QIDS.filter((id) => !ANSWERED[id]).map((id) => `
        <div class="rslot reveal">
            <span class="rslot__n">Q${QIDS.indexOf(id) + 1}</span>
            <p class="rslot__q">${t(`questions.items.${id}.q`)}</p>
            <p class="rslot__pending">${t('results.awaiting')}</p>
        </div>`).join('');

    const validated = t('results.validated');
    const note = validated === 'results.validated'
        ? ''
        : `<p class="rvalidated reveal">${validated}</p>`;

    host.innerHTML = note + answered + (waiting ? `<div class="rgrid">${waiting}</div>` : '');
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
    renderExplainer();
    renderQuestions();
    renderPipeline();
    renderDecisions();
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

    // The pipeline swaps between a row and a column, so it redraws on resize.
    let mode = window.innerWidth > BREAKPOINT;
    let timer;
    window.addEventListener('resize', () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            const next = window.innerWidth > BREAKPOINT;
            if (next !== mode) { mode = next; renderPipeline(); }
        }, 160);
    });

    // eslint-disable-next-line no-console
    console.log(
        `%cNegative Hours%c\n\nEight European bidding zones, hourly prices since 2019.\nNo results on the page until the numbers are real.\n\n${REPO}`,
        'font:600 18px/1.4 ui-monospace,monospace;color:#1b4dff',
        'font:12px/1.6 ui-monospace,monospace;color:#888',
    );
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();

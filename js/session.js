/* =============================================================================
   session.js — "You Are The Dataset".

   Measures this page view and shows it back. Everything here lives in a plain
   object in memory for the lifetime of the tab:
     · nothing is written to localStorage, sessionStorage, IndexedDB or cookies
     · nothing is sent over the network — there is no fetch/beacon in this file
     · reloading the page discards all of it

   The "classifier" is deliberately a printed rule, not a model. Showing a
   fabricated confidence score on a data analyst's portfolio would be the exact
   thing this site argues against.
   ========================================================================== */

import { t, reduceMotion, stats } from './main.js';

const SECTIONS = [
    { id: 'top', key: 'session.sectionTop', short: 'masthead' },
    { id: 'trajectory', key: 'nav.trajectory', short: 'trajectory' },
    { id: 'work', key: 'nav.work', short: 'work' },
    { id: 'stack', key: 'nav.stack', short: 'stack' },
    { id: 'session', key: 'nav.session', short: 'session' },
    { id: 'contact', key: 'nav.contact', short: 'contact' },
];

const state = {
    dwell: Object.fromEntries(SECTIONS.map((s) => [s.id, 0])),
    scrollDepth: 0,
    interactions: 0,
    cvClicked: false,
    contactClicked: false,
    queryOpened: false,
    pointsOpened: new Set(),
};

export const session = state;

/* --- measurement ---------------------------------------------------------- */

function sectionAtCentre() {
    const mid = window.innerHeight / 2;
    for (const s of SECTIONS) {
        const node = document.getElementById(s.id);
        if (!node) continue;
        const r = node.getBoundingClientRect();
        if (r.top <= mid && r.bottom >= mid) return s.id;
    }
    return null;
}

function startMeasuring() {
    setInterval(() => {
        if (document.hidden) return;
        const id = sectionAtCentre();
        if (id) state.dwell[id] += 1;
    }, 1000);

    let queued = false;
    window.addEventListener('scroll', () => {
        if (queued) return;
        queued = true;
        requestAnimationFrame(() => {
            const max = document.documentElement.scrollHeight - window.innerHeight;
            const pct = max > 0 ? Math.min(100, Math.round((window.scrollY / max) * 100)) : 0;
            state.scrollDepth = Math.max(state.scrollDepth, pct);
            queued = false;
        });
    }, { passive: true });

    document.addEventListener('click', (e) => {
        state.interactions += 1;
        const a = e.target.closest('a');
        if (!a) return;
        if (a.getAttribute('href')?.includes('resume.pdf')) state.cvClicked = true;
        if (a.getAttribute('href')?.startsWith('mailto:')) state.contactClicked = true;
    }, true);

    document.addEventListener('keydown', () => { state.interactions += 1; }, true);

    document.addEventListener('click', (e) => {
        const pt = e.target.closest('.chart__point');
        if (pt) state.pointsOpened.add(pt.dataset.id);
    }, true);
}

/* --- the rule ------------------------------------------------------------- */

function classify() {
    const exp = state.dwell.trajectory + state.dwell.work;
    if (exp > 20 && state.cvClicked) return 'recruiter';
    if (state.queryOpened || state.pointsOpened.size >= 3) return 'engineer';
    if (state.scrollDepth > 55) return 'browser';
    return 'unknown';
}

function ruleMarkup(verdict) {
    const exp = state.dwell.trajectory + state.dwell.work;
    // On a phone the verdict would sit off the right edge of a scrolling <pre>,
    // so break each branch onto its own second line instead.
    const narrow = window.innerWidth < 720;

    const branch = (cond, label, hit) => {
        const name = t(`session.verdicts.${label}`);
        const arrow = hit ? '<b>→</b>' : ' ';
        if (narrow) {
            return `${arrow} ${cond.trim()}\n     ${hit ? `<span class="ok">${name}</span>` : name}`;
        }
        return `${arrow} ${cond}${hit ? `<span class="ok">${name}</span>` : name}`;
    };

    return [
        branch('IF   dwell(work) &gt; 20s AND cv_clicked     ', 'recruiter', verdict === 'recruiter'),
        branch('ELIF opened(query) OR points_opened &gt;= 3  ', 'engineer', verdict === 'engineer'),
        branch('ELIF scroll_depth &gt; 55%                   ', 'browser', verdict === 'browser'),
        branch('ELSE                                      ', 'unknown', verdict === 'unknown'),
        '',
        `  dwell(work)   = ${exp}s`,
        `  cv_clicked    = ${state.cvClicked}`,
        `  opened(query) = ${state.queryOpened}`,
        `  points_opened = ${state.pointsOpened.size}`,
        `  scroll_depth  = ${state.scrollDepth}%`,
    ].join('\n');
}

/* --- rendering ------------------------------------------------------------ */

function metric(label, value, unit = '') {
    return `
        <div class="metric">
            <span class="metric__label">${label}</span>
            <span class="metric__value">${value}${unit ? `<span> ${unit}</span>` : ''}</span>
        </div>`;
}

function render() {
    const grid = document.getElementById('session-grid');
    if (!grid) return;

    const totals = SECTIONS.map((s) => ({ ...s, v: state.dwell[s.id] }));
    const peak = Math.max(1, ...totals.map((x) => x.v));

    const bars = totals.map((s) => `
        <div class="bar">
            <span>${t(s.key).toLowerCase()}</span>
            <span class="bar__track"><span class="bar__fill" style="width:${(s.v / peak) * 100}%"></span></span>
            <span class="bar__val">${s.v}${t('session.seconds')}</span>
        </div>`).join('');

    const isTouch = window.matchMedia('(hover: none)').matches;
    const theme = document.documentElement.getAttribute('data-theme')
        || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    const verdict = classify();

    grid.innerHTML = `
        <div class="metric metric--wide">
            <span class="metric__label">${t('session.dwell')}</span>
            <div class="bars">${bars}</div>
        </div>
        ${metric(t('session.scroll'), state.scrollDepth, '%')}
        ${metric(t('session.interactions'), state.interactions)}
        ${metric(t('session.viewport'), `${window.innerWidth}<span>×${window.innerHeight}</span>`)}
        ${metric(t('session.device'), `<span class="metric__word">${isTouch ? t('session.touch') : t('session.mouse')}</span>`)}
        ${metric(t('session.theme'), `<span class="metric__word">${theme}</span>`)}
        ${metric(t('session.language'), stats.langSwitches())}
        <div class="rule-box">
            <span class="metric__label">${t('session.classify')}</span>
            <pre>${ruleMarkup(verdict)}</pre>
        </div>`;

    // Predicted next action — a link, so it is actually useful.
    const cta = document.getElementById('session-cta');
    if (cta) {
        const wantsCv = !state.cvClicked;
        cta.innerHTML = `
            <span class="meta">${t('session.cta')}</span>
            <a class="btn btn--primary" href="${wantsCv ? './assets/resume.pdf' : 'mailto:abdellahsbaisbai@gmail.com'}"
               ${wantsCv ? 'download' : ''}>
               ${wantsCv ? t('session.ctaCv') : t('session.ctaContact')} →
            </a>
            <span class="meta" style="text-transform:none;letter-spacing:.02em">${t('session.classifyNote')}</span>`;
    }
}

export function mountSession() {
    const section = document.getElementById('session');
    if (!section) return;

    startMeasuring();
    render();

    // Only repaint while the panel is actually on screen.
    let timer = null;
    const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting && !timer) {
                render();
                timer = setInterval(render, reduceMotion.matches ? 2000 : 1000);
            } else if (!entry.isIntersecting && timer) {
                clearInterval(timer);
                timer = null;
            }
        });
    }, { threshold: 0.05 });
    io.observe(section);

    document.addEventListener('langchange', render);
    window.addEventListener('resize', render);
}

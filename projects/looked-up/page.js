/* =============================================================================
   page.js: the Looked Up case study.

   Theme, reveal and scramble come from js/chrome.js so there is one copy of
   them for the whole site. Everything else here is specific to this page.

   The three charts are redrawn from the project's own outputs rather than
   embedded as PNGs, so they follow the theme and carry no text of their own
   that the language switch cannot reach. Each data block names its source in
   github.com/Sbaiii/looked-up.
   ========================================================================== */

import {
    $, $$, resolveKey, initTheme, scrambleTo, observeReveals, revealOnScreen,
} from '/js/chrome.js';
import { PAGE, LANGS } from './strings.js';

const REPO = 'https://github.com/Sbaiii/looked-up';
const DOCS = `${REPO}/blob/main/docs`;
const APP = 'https://sbaiii.github.io/looked-up/';
const BREAKPOINT = 760;

let lang = 'en';

function t(path) {
    const hit = resolveKey(PAGE[lang], path);
    if (hit !== undefined && hit !== null) return hit;
    const fallback = resolveKey(PAGE.en, path);
    return fallback !== undefined && fallback !== null ? fallback : path;
}

/* Language-aware number formatting for chart ticks only; prose carries its
   own numbers, written the way each language writes them. */
const fmt = (n, digits = 0) => new Intl.NumberFormat(lang, {
    minimumFractionDigits: digits, maximumFractionDigits: digits,
}).format(n);

/** Breaks a label into lines of at most `max` characters, at spaces. */
function wrap(text, max) {
    const lines = [];
    let line = '';
    String(text).split(' ').forEach((word) => {
        if (line && (line + ' ' + word).length > max) { lines.push(line); line = word; }
        else line = line ? `${line} ${word}` : word;
    });
    if (line) lines.push(line);
    return lines;
}

const tspans = (lines, x, y, lh) => lines
    .map((l, i) => `<tspan x="${x}" y="${y + i * lh}">${l}</tspan>`).join('');

/* --- fig. 02: architecture ------------------------------------------------ */

/* The mermaid diagram in docs/ops.md, reduced to its two paths. */
const PATHS = [
    { label: 'batch', steps: [['dumps', 'dumpsNote'], ['actions', 'actionsNote'], ['lake', 'lakeNote']] },
    { label: 'live', steps: [['rc', 'rcNote'], ['worker', 'workerNote'], ['store', 'storeNote']] },
];

/**
 * Two rows that meet in the app. Left to right where there is room; on a phone
 * the two paths become two columns that run down into the app, rather than one
 * wide diagram scaled until its labels are unreadable.
 */
function renderArchitecture() {
    const wide = window.innerWidth > BREAKPOINT;
    const a = (k) => t(`built.arch.${k}`);
    const parts = [];
    let W;
    let H;

    const box = (x, y, w, h, title, note, size) => {
        const titleLines = wrap(title, size.titleMax);
        const noteLines = wrap(note, size.noteMax);
        const block = titleLines.length * size.titleLh + 6 + noteLines.length * size.noteLh;
        const top = y + (h - block) / 2 + size.titleLh * 0.78;
        const cx = x + w / 2;
        return `
            <g class="pl-step">
                <rect class="pl-box" x="${x}" y="${y}" width="${w}" height="${h}" rx="10" />
                <text class="pl-title" text-anchor="middle" style="font-size:${size.title}px">${tspans(titleLines, cx, top, size.titleLh)}</text>
                <text class="pl-note" text-anchor="middle">${tspans(noteLines, cx, top + titleLines.length * size.titleLh + 4, size.noteLh)}</text>
            </g>`;
    };
    const arrow = (x1, y1, x2, y2) =>
        `<path class="pl-arrow" d="M${x1} ${y1} L${x2} ${y2}" marker-end="url(#lu-head)" />`;

    if (wide) {
        const size = { title: 14, titleLh: 17, titleMax: 22, noteMax: 28, noteLh: 13 };
        const pad = 20;
        const bw = 196;
        const bh = 84;
        const gap = 38;
        const rowY = [34, 34 + bh + 58];
        const appX = pad + 3 * bw + 2 * gap + 52;
        W = appX + bw + pad;
        H = rowY[1] + bh + 12;

        PATHS.forEach((p, r) => {
            const y = rowY[r];
            parts.push(`<text class="ax-label lu-arch-path" x="${pad}" y="${y - 12}">${a(p.label)}</text>`);
            p.steps.forEach(([k, n], i) => {
                const x = pad + i * (bw + gap);
                parts.push(box(x, y, bw, bh, a(k), a(n), size));
                if (i < 2) parts.push(arrow(x + bw + 6, y + bh / 2, x + bw + gap - 6, y + bh / 2));
            });
            parts.push(arrow(pad + 3 * bw + 2 * gap + 6, y + bh / 2, appX - 6, y + bh / 2));
        });
        const appH = rowY[1] + bh - rowY[0];
        parts.push(box(appX, rowY[0], bw, appH, a('app'), a('appNote'), size).replace('class="pl-box"', 'class="pl-box lu-app"'));
    } else {
        const size = { title: 13, titleLh: 16, titleMax: 17, noteMax: 22, noteLh: 13 };
        const pad = 8;
        const colGap = 16;
        const bw = 158;
        const bh = 82;
        const gap = 30;
        const colX = [pad, pad + bw + colGap];
        const y0 = 30;
        W = pad * 2 + bw * 2 + colGap;
        const appY = y0 + 3 * bh + 3 * gap;
        const appH = 64;
        H = appY + appH + 8;

        PATHS.forEach((p, c) => {
            const x = colX[c];
            parts.push(`<text class="ax-label lu-arch-path" x="${x}" y="${y0 - 12}">${a(p.label)}</text>`);
            p.steps.forEach(([k, n], i) => {
                const y = y0 + i * (bh + gap);
                parts.push(box(x, y, bw, bh, a(k), a(n), size));
                const yEnd = i < 2 ? y + bh + gap - 6 : appY - 6;
                parts.push(arrow(x + bw / 2, y + bh + 6, x + bw / 2, yEnd));
            });
        });
        parts.push(box(pad, appY, W - pad * 2, appH, a('app'), a('appNote'), { ...size, titleMax: 40, noteMax: 40 })
            .replace('class="pl-box"', 'class="pl-box lu-app"'));
    }

    const sentence = PATHS.map((p) => `${a(p.label)}: ${p.steps.map(([k]) => a(k)).join(' → ')} → ${a('app')}`).join('. ');
    $('#architecture').innerHTML = `
        <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${sentence}">
            <defs>
                <marker id="lu-head" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="6" markerHeight="6" orient="auto">
                    <path d="M0 0 L8 4 L0 8 z" fill="currentColor" />
                </marker>
            </defs>
            ${parts.join('')}
        </svg>`;
}

/* --- fig. 02: numbers and the three speeds -------------------------------- */

function renderBuilt() {
    $('#numbers').innerHTML = t('built.numbers').map((n) => `
        <div class="figures__item">
            <span class="figures__value">${n.v}</span>
            <span class="figures__label">${n.l}</span>
        </div>`).join('');

    const host = $('#speeds');
    host.innerHTML = t('built.speeds').map((s, i) => `
        <article class="qcard reveal">
            <span class="qcard__n">${String(i + 1).padStart(2, '0')}</span>
            <h3 class="qcard__q">${s.n}</h3>
            <dl class="qcard__meta">
                <div>
                    <dt>${t('built.speedLabel')}</dt>
                    <dd class="qcard__metric">${s.speed}</dd>
                </div>
                <div>
                    <dt class="visually-hidden">${s.n}</dt>
                    <dd>${s.body}</dd>
                </div>
                <div>
                    <dt>${t('built.shows')}</dt>
                    <dd>${s.shows}</dd>
                </div>
            </dl>
        </article>`).join('');
    observeReveals(host);
}

/* --- fig. 03: the scorecard ----------------------------------------------- */

/* Verdicts as the four results files state them. */
const SCORECARD = [
    { id: 'h1', label: 'H1', phase: 'p2', verdict: 'rejected' },
    { id: 'h2', label: 'H2', phase: 'p2', verdict: 'rejected' },
    { id: 'h3', label: 'H3', phase: 'p2', verdict: 'inconclusive' },
    { id: 'h4', label: 'H4', phase: 'p2', verdict: 'rejected' },
    { id: 'h1b1', label: 'H1b-1', phase: 'p2b', verdict: 'rejected' },
    { id: 'h1b2', label: 'H1b-2', phase: 'p2b', verdict: 'rejected' },
    { id: 'h1b3', label: 'H1b-3', phase: 'p2b', verdict: 'inconclusive' },
    { id: 'h2b', label: 'H2b', phase: 'p2b', verdict: 'inconclusive' },
    { id: 'h5', label: 'H5', phase: 'p2b', verdict: 'inconclusive' },
    { id: 'h6', label: 'H6', phase: 'p4', verdict: 'supported' },
    { id: 'h7', label: 'H7', phase: 'p4', verdict: 'rejected' },
    { id: 'h8', label: 'H8', phase: 'p4', verdict: 'supported' },
    { id: 'h9', label: 'H9', phase: 'p5', verdict: 'rejected' },
    { id: 'h10', label: 'H10', phase: 'p5', verdict: 'inconclusive' },
];
const VERDICTS = ['supported', 'rejected', 'inconclusive'];

function renderScorecard() {
    const tally = VERDICTS.map((v) => {
        const n = SCORECARD.filter((r) => r.verdict === v).length;
        return `<div class="lu-tally__item"><span class="lu-tally__n">${n}</span><span class="rt-verdict lu-verdict--${v}">${t(`score.${v}`)}</span></div>`;
    }).join('');

    let phase = '';
    const body = SCORECARD.map((r) => {
        const row = t(`score.rows.${r.id}`);
        const group = r.phase !== phase
            ? `<tr class="lu-phase"><th colspan="4" scope="rowgroup">${t(`score.phases.${r.phase}`)}</th></tr>`
            : '';
        phase = r.phase;
        return `${group}
            <tr>
                <th scope="row"><span class="lu-hid">${r.label}</span>${row.name}</th>
                <td data-label="${t('score.cols.expected')}">${row.expected}</td>
                <td class="lu-found" data-label="${t('score.cols.found')}">${row.found}</td>
                <td class="lu-verdict"><span class="rt-verdict lu-verdict--${r.verdict}">${t(`score.${r.verdict}`)}</span></td>
            </tr>`;
    }).join('');

    $('#scorecard').innerHTML = `
        <div class="lu-tally">${tally}</div>
        <div class="rt-wrap">
            <table class="rt lu-score">
                <caption class="visually-hidden">${t('score.title')}</caption>
                <thead>
                    <tr>
                        <th scope="col">${t('score.cols.h')}</th>
                        <th scope="col">${t('score.cols.expected')}</th>
                        <th scope="col">${t('score.cols.found')}</th>
                        <th scope="col">${t('score.cols.verdict')}</th>
                    </tr>
                </thead>
                <tbody>${body}</tbody>
            </table>
        </div>
        <p class="meta rt-note">${t('score.note')}</p>`;
}

/* --- fig. 04: findings and their charts ----------------------------------- */

/* Languages spiking by hour after the first. docs/analysis/phase2_results.md,
   case studies 1 and 2: Panettiere 1 at 0 h, then 23 more within the next hour
   and 4 more in the hour after; Otamendi 29 in the same hour. */
const SPREAD = {
    final: [[0, 29], [1, 29], [2, 29]],
    death: [[0, 1], [1, 24], [2, 28]],
};

/* Edit burst lead time, binned by hour (floor of lead_minutes / 60), from the
   134 events with a burst in docs/analysis/phase5_h9.csv. Negative: readers
   spiked first. Median -106 min (docs/analysis/phase5_results.md). */
const LEAD = [
    [-21, 1], [-20, 1], [-19, 1], [-17, 1], [-16, 2], [-14, 1], [-13, 2], [-12, 1], [-11, 1],
    [-10, 3], [-9, 3], [-8, 1], [-7, 11], [-6, 3], [-5, 6], [-4, 6], [-3, 20], [-2, 21], [-1, 39],
    [1, 2], [4, 1], [10, 1], [20, 1], [21, 2], [23, 3],
];
const LEAD_MEDIAN_H = -106 / 60;

/* Calibration at t0 + 1 h on the test set: mean predicted p and observed share
   per bin. docs/analysis/phase4_metrics.json, m1.international_t1. */
const CALIBRATION = [
    [0.0135, 0.0142], [0.1383, 0.0773], [0.2461, 0.1914], [0.3469, 0.2955],
    [0.4442, 0.3409], [0.5516, 0.5200], [0.6450, 0.6667], [0.7356, 0.8000],
];
const CALIBRATION_FAME = [0.0417, 0.0330];

const scale = (d0, d1, r0, r1) => (v) => r0 + ((v - d0) / (d1 - d0)) * (r1 - r0);

/* Chart canvases are drawn narrower on a phone rather than scaled down, so the
   axis text stays near its set size. */
const narrow = () => window.innerWidth <= BREAKPOINT;

function spreadChart(f) {
    const W = narrow() ? 340 : 560; const H = narrow() ? 250 : 280; const L = 46; const R = 20; const T = 18; const B = 46;
    const x = scale(0, 2, L, W - R);
    const y = scale(0, 30, H - B, T);
    const step = (pts) => pts.map(([h, n], i) => {
        const p = `${x(h).toFixed(1)} ${y(n).toFixed(1)}`;
        return i === 0 ? `M${p}` : `H${x(h).toFixed(1)} V${y(n).toFixed(1)}`;
    }).join(' ');
    const yTicks = [0, 10, 20, 30].map((v) => `
        <line class="ax-line lu-grid" x1="${L}" x2="${W - R}" y1="${y(v)}" y2="${y(v)}" />
        <text class="ax-label" x="${L - 8}" y="${y(v) + 3}" text-anchor="end">${fmt(v)}</text>`).join('');
    const xTicks = [0, 1, 2].map((v) => `
        <text class="ax-label" x="${x(v)}" y="${H - B + 18}" text-anchor="middle">${fmt(v)}</text>`).join('');
    const dots = (pts, cls) => pts.map(([h, n]) => `<circle class="${cls}" cx="${x(h)}" cy="${y(n)}" r="4" />`).join('');
    return `
        <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${f.alt}">
            ${yTicks}${xTicks}
            <path class="cd-line" d="${step(SPREAD.final)}" />
            <path class="cd-line lu-line--alt" d="${step(SPREAD.death)}" />
            ${dots(SPREAD.final, 'lu-dot')}${dots(SPREAD.death, 'lu-dot lu-dot--alt')}
            <text class="lu-key" x="${x(0.04)}" y="${y(29) - 10}">${f.final}</text>
            <text class="lu-key lu-key--alt" x="${x(0.06)}" y="${y(1) - 10}">${f.death}</text>
            <text class="ax-label" x="${(L + W - R) / 2}" y="${H - 8}" text-anchor="middle">${f.axisX}</text>
            <text class="ax-label" x="12" y="${(T + H - B) / 2}" text-anchor="middle" transform="rotate(-90 12 ${(T + H - B) / 2})">${f.axisY}</text>
        </svg>`;
}

function leadChart(f) {
    const W = narrow() ? 340 : 560; const H = narrow() ? 250 : 280; const L = 40; const R = 14; const T = 26; const B = 46;
    const x = scale(-24, 24, L, W - R);
    const y = scale(0, 40, H - B, T);
    const bw = x(1) - x(0) - 1.5;
    const bars = LEAD.map(([h, n]) => `<rect class="lu-bar${h >= 0 ? ' lu-bar--alt' : ''}" x="${x(h) + 0.75}" y="${y(n)}" width="${bw}" height="${y(0) - y(n)}" />`).join('');
    const yTicks = [0, 10, 20, 30, 40].map((v) => `
        <line class="ax-line lu-grid" x1="${L}" x2="${W - R}" y1="${y(v)}" y2="${y(v)}" />
        <text class="ax-label" x="${L - 8}" y="${y(v) + 3}" text-anchor="end">${fmt(v)}</text>`).join('');
    const xTicks = (narrow() ? [-20, 0, 20] : [-20, -10, 0, 10, 20]).map((v) => `
        <text class="ax-label" x="${x(v)}" y="${H - B + 18}" text-anchor="middle">${v > 0 ? '+' : ''}${fmt(v)}</text>`).join('');
    return `
        <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${f.alt}">
            ${yTicks}${xTicks}
            ${bars}
            <line class="lu-zero" x1="${x(0)}" x2="${x(0)}" y1="${T - 8}" y2="${y(0)}" />
            <line class="cd-zero lu-prereg" x1="${x(1)}" x2="${x(1)}" y1="${T - 8}" y2="${y(0)}" />
            <line class="lu-median" x1="${x(LEAD_MEDIAN_H)}" x2="${x(LEAD_MEDIAN_H)}" y1="${y(39) - 4}" y2="${y(0)}" />
            <text class="lu-key" x="${x(-1.5)}" y="${T - 12}" text-anchor="end">← ${f.readers}</text>
            <text class="lu-key lu-key--alt" x="${x(1.6)}" y="${T - 12}">${f.editors} →</text>
            <text class="ax-label" x="${(L + W - R) / 2}" y="${H - 8}" text-anchor="middle">${f.axisX}</text>
            <text class="ax-label" x="10" y="${(T + H - B) / 2}" text-anchor="middle" transform="rotate(-90 10 ${(T + H - B) / 2})">${f.axisY}</text>
        </svg>`;
}

function calibrationChart(f) {
    const W = narrow() ? 330 : 400; const H = narrow() ? 300 : 340; const L = 46; const R = 16; const T = 16; const B = 46;
    const x = scale(0, 1, L, W - R);
    const y = scale(0, 1, H - B, T);
    const ticks = [0, 0.2, 0.4, 0.6, 0.8, 1];
    const grid = ticks.map((v) => `
        <line class="ax-line lu-grid" x1="${L}" x2="${W - R}" y1="${y(v)}" y2="${y(v)}" />
        <text class="ax-label" x="${L - 8}" y="${y(v) + 3}" text-anchor="end">${fmt(v * 100)}%</text>
        <text class="ax-label" x="${x(v)}" y="${H - B + 18}" text-anchor="middle">${fmt(v * 100)}%</text>`).join('');
    const line = CALIBRATION.map(([p, o], i) => `${i ? 'L' : 'M'}${x(p).toFixed(1)} ${y(o).toFixed(1)}`).join(' ');
    const dots = CALIBRATION.map(([p, o]) => `<circle class="lu-dot" cx="${x(p)}" cy="${y(o)}" r="4" />`).join('');
    const [fp, fo] = CALIBRATION_FAME;
    return `
        <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${f.alt}">
            ${grid}
            <line class="cd-zero" x1="${x(0)}" y1="${y(0)}" x2="${x(1)}" y2="${y(1)}" />
            <path class="cd-line" d="${line}" />
            ${dots}
            <rect class="lu-dot lu-dot--alt" x="${x(fp) - 4}" y="${y(fo) - 4}" width="8" height="8" />
            <circle class="lu-dot" cx="${L + 10}" cy="${T + 8}" r="4" />
            <text class="lu-key" x="${L + 20}" y="${T + 12}">${f.model}</text>
            <rect class="lu-dot lu-dot--alt" x="${L + 6}" y="${T + 22}" width="8" height="8" />
            <text class="lu-key lu-key--alt" x="${L + 20}" y="${T + 30}">${f.fame}</text>
            <text class="ax-label" x="${(L + W - R) / 2}" y="${H - 8}" text-anchor="middle">${f.axisX}</text>
            <text class="ax-label" x="12" y="${(T + H - B) / 2}" text-anchor="middle" transform="rotate(-90 12 ${(T + H - B) / 2})">${f.axisY}</text>
        </svg>`;
}

const CHARTS = { spread: spreadChart, lead: leadChart, calibration: calibrationChart };

/* The results file each finding is read from. */
const FINDING_SOURCES = [
    'analysis/phase2_results.md', 'analysis/phase2_results.md', 'analysis/phase2_results.md',
    'analysis/phase5_results.md', 'analysis/phase4_results.md',
];

function renderFindings() {
    const host = $('#findings');
    host.innerHTML = t('findings.items').map((f, i) => {
        const chart = f.chart ? `
            <figure class="ch-plate lu-chart lu-chart--${f.chart}">
                ${CHARTS[f.chart](f)}
                <figcaption class="meta ch-caption">${f.caption}</figcaption>
            </figure>` : '';
        return `
            <article class="rans reveal${chart ? ' lu-finding--chart' : ''}">
                <div class="lu-finding__text">
                    <div class="rans__head"><span class="rslot__n">${String(i + 1).padStart(2, '0')}</span></div>
                    <h3 class="rans__q">${f.title}</h3>
                    <p class="rans__summary">${f.body}</p>
                    <a class="btn btn--text" href="${DOCS}/${FINDING_SOURCES[i]}" target="_blank"
                       rel="noopener noreferrer">${t('findings.source')}</a>
                </div>
                ${chart}
            </article>`;
    }).join('');
    observeReveals(host);
}

/* --- fig. 05: three events ------------------------------------------------ */

/* Event ids from docs/analysis/nonportal_review.csv (Panettiere, Higashino)
   and docs/analysis/phase5_h9.csv (Otamendi), each present in the app's day
   file for its date. */
const EVENT_LINKS = {
    panettiere: `${APP}#/day/2026-08-17/event/Q171571`,
    final: `${APP}#/day/2026-07-19/event/Q182063`,
    higashino: `${APP}#/day/2026-07-27/event/Q125970`,
};

function renderEvents() {
    const host = $('#events');
    host.innerHTML = t('events.items').map((e) => `
        <article class="dcard reveal">
            <span class="meta">${e.kicker}</span>
            <h3 class="dcard__title">${e.title}</h3>
            <p class="meta lu-when">${e.when}</p>
            <p class="dcard__body">${e.body}</p>
            <a class="btn btn--text" href="${EVENT_LINKS[e.key]}" target="_blank"
               rel="noopener noreferrer">${t('events.open')}</a>
        </article>`).join('');
    observeReveals(host);
}

/* --- fig. 06 and fig. 07 -------------------------------------------------- */

function renderLimits() {
    const host = $('#limits');
    host.innerHTML = t('limits.items').map((l, i) => `
        <article class="dcard reveal">
            <span class="meta">${String(i + 1).padStart(2, '0')}</span>
            <h3 class="dcard__title">${l.title}</h3>
            <p class="dcard__body">${l.body}</p>
        </article>`).join('');
    observeReveals(host);
}

const PRACTICE_LINKS = {
    prereg: `${DOCS}/prereg_phase2.md`,
    adr: `${REPO}/tree/main/docs/adr`,
    results: `${REPO}/tree/main/docs/analysis`,
    ops: `${DOCS}/ops.md`,
};

function renderPractice() {
    const host = $('#practice');
    host.innerHTML = t('stack.items').map((s) => `
        <article class="dcard reveal">
            <h3 class="dcard__title">${s.title}</h3>
            <p class="dcard__body">${s.body}</p>
            <a class="btn btn--text" href="${PRACTICE_LINKS[s.key]}" target="_blank"
               rel="noopener noreferrer">${t('stack.read')}</a>
        </article>`).join('');
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
    renderArchitecture();
    renderBuilt();
    renderScorecard();
    renderFindings();
    renderEvents();
    renderLimits();
    renderPractice();
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
    revealOnScreen();
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

    // The architecture and the charts have a phone layout, so they redraw on resize.
    let mode = window.innerWidth > BREAKPOINT;
    let timer;
    window.addEventListener('resize', () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            const next = window.innerWidth > BREAKPOINT;
            if (next !== mode) { mode = next; renderArchitecture(); renderFindings(); }
        }, 160);
    });

    // eslint-disable-next-line no-console
    console.log(
        `%cLooked Up%c\n\nWikipedia across 30 languages, every hour.\n14 hypotheses written down first; 2 held.\n\n${REPO}`,
        'font:600 18px/1.4 ui-monospace,monospace;color:#1b4dff',
        'font:12px/1.6 ui-monospace,monospace;color:#888',
    );
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();

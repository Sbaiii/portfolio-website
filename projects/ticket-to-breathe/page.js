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
import { DATA, loadData, isProvisional, num, interval, count, DASH } from './data.js';

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
const TIMELINE_ORIGIN = 2022;

/** Months since January of TIMELINE_ORIGIN, for a YYYY-MM-DD string. */
function monthIndex(iso) {
    const [y, m] = iso.split('-').map(Number);
    return (y - TIMELINE_ORIGIN) * 12 + (m - 1);
}

/**
 * The policy windows, read from timeline.json. These are dates, not results,
 * so they are drawn whatever the data's status says. A missing file leaves the
 * figure empty rather than falling back to numbers written in here.
 */
function timelineRows() {
    return (DATA.timeline || []).map((w) => ({
        name: w.name,
        when: w.end ? 'whenSummer' : 'whenFrom',
        from: monthIndex(w.start),
        to: w.end ? monthIndex(w.end) + 1 : null,
        confounder: w.kind === 'confounder',
    })).filter((r) => r.from >= 0 && r.from < MONTHS);
}

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

    const rows = timelineRows().map((row, i) => {
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

    const host = $('#timeline');
    if (!timelineRows().length) { host.innerHTML = ''; return; }
    host.innerHTML = `
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

/* --- shared chart furniture ----------------------------------------------- */

/** Linear scale from a data range onto a pixel range. */
function scale(d0, d1, r0, r1) {
    const span = (d1 - d0) || 1;
    return (v) => r0 + ((v - d0) / span) * (r1 - r0);
}

function extent(values) {
    const clean = values.filter((v) => typeof v === 'number' && !Number.isNaN(v));
    if (!clean.length) return [0, 1];
    return [Math.min(...clean), Math.max(...clean)];
}

/** Pad a domain so the drawn series never touches the frame. */
function padded([lo, hi], by = 0.08) {
    const span = (hi - lo) || 1;
    return [lo - span * by, hi + span * by];
}

/**
 * The diagonal "fixture" wash. While the data is provisional every chart wears
 * it, so a shape drawn from placeholder numbers cannot be mistaken for a
 * finding even with the banner scrolled off the top.
 */
function watermark(id, w, h) {
    if (!isProvisional()) return '';
    return `
        <defs>
            <pattern id="${id}" width="150" height="56" patternUnits="userSpaceOnUse"
                     patternTransform="rotate(-24)">
                <text class="fx-mark" x="0" y="20">${t('provisional.label').toUpperCase()}</text>
            </pattern>
        </defs>
        <rect class="fx-wash" x="0" y="0" width="${w}" height="${h}" fill="url(#${id})" />`;
}

/** An axis tick label, which is a number and so is withheld while provisional. */
function tick(value, opts) {
    return isProvisional() ? '' : num(value, opts);
}

/* --- the provisional banner ----------------------------------------------- */

/**
 * The banner ships in the HTML and is visible from first paint, because that is
 * the honest default: without the data loaded the page cannot know the numbers
 * are final, and inserting it afterwards shifted the whole page down by its own
 * height. All this does is take it away once the data says FINAL.
 */
function renderBanner() {
    const host = $('#provisional');
    if (!host) return;
    const settled = DATA.loaded && !isProvisional() && !DATA.missing.length;
    host.hidden = settled;
    const missing = $('.prov__missing', host);
    if (missing) missing.hidden = !DATA.missing.length;
}

/* --- fig. 05: the map ----------------------------------------------------- */

const MAP_W = 640;
const MAP_H = 440;
let showStations = false;

/** Equirectangular, corrected at the middle latitude. Europe at this size. */
function projector(features) {
    let lons = [];
    let lats = [];
    features.forEach((f) => {
        rings(f).forEach((ring) => ring.forEach(([lon, lat]) => { lons.push(lon); lats.push(lat); }));
    });
    const [lon0, lon1] = extent(lons);
    const [lat0, lat1] = extent(lats);
    const k = Math.cos(((lat0 + lat1) / 2) * Math.PI / 180);
    const pad = 12;
    const w = (lon1 - lon0) * k;
    const h = lat1 - lat0;
    const s = Math.min((MAP_W - pad * 2) / w, (MAP_H - pad * 2) / h);
    const dx = (MAP_W - w * s) / 2;
    const dy = (MAP_H - h * s) / 2;
    return ([lon, lat]) => [
        dx + (lon - lon0) * k * s,
        dy + (lat1 - lat) * s,
    ];
}

/** Polygon and MultiPolygon, flattened to a list of rings. */
function rings(feature) {
    const g = feature.geometry || {};
    if (g.type === 'Polygon') return g.coordinates;
    if (g.type === 'MultiPolygon') return g.coordinates.flat();
    return [];
}

/**
 * Diverging, centred on zero. Blue reads as a fall, amber as a rise, which is
 * the direction a reader expects. While the data is provisional no country is
 * coloured by its value at all: the fill carries no number.
 */
function divergingFill(value, max) {
    if (isProvisional() || typeof value !== 'number') return 'var(--map-neutral)';
    const k = Math.min(1, Math.abs(value) / (max || 1));
    const hue = value < 0 ? 'var(--map-neg)' : 'var(--map-pos)';
    return `color-mix(in srgb, ${hue} ${(k * 100).toFixed(0)}%, var(--map-neutral))`;
}

function renderMap() {
    const host = $('#map');
    if (!host) return;
    const geo = DATA.countries;
    const payload = DATA.map || {};
    if (!geo || !geo.features) {
        host.innerHTML = `<p class="lead">${t('map.empty')}</p>`;
        return;
    }

    const byCc = {};
    (payload.countries || []).forEach((c) => { byCc[c.cc] = c; });
    const maxAbs = Math.max(
        1,
        ...(payload.countries || []).map((c) => Math.abs(c.value_nine_euro || 0)),
    );

    const project = projector(geo.features);
    const toPath = (f) => rings(f)
        .map((ring) => `M${ring.map((pt) => project(pt).map((n) => n.toFixed(1)).join(' ')).join('L')}Z`)
        .join('');

    const shapes = geo.features.map((f) => {
        const cc = f.properties.ISO_A2;
        const row = byCc[cc];
        const inStudy = Boolean(row);
        const fill = inStudy ? divergingFill(row.value_nine_euro, maxAbs) : 'var(--map-out)';
        const label = inStudy
            ? `${row.name}: ${num(row.value_nine_euro, { digits: 1, sign: true })}, ${count(row.n_stations)} ${t('map.stationCount')}`
            : (f.properties.NAME || cc);
        return `<path class="mp-country${inStudy ? ' is-study' : ''}" d="${toPath(f)}"
                      fill="${fill}" tabindex="${inStudy ? '0' : '-1'}"
                      role="${inStudy ? 'img' : 'presentation'}"
                      ${inStudy ? `aria-label="${label}"` : ''}><title>${label}</title></path>`;
    }).join('');

    const dots = showStations
        ? (payload.stations || []).map((st) => {
            const [x, y] = project([st.lon, st.lat]);
            return `<circle class="mp-dot mp-dot--${st.type}" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.1" />`;
        }).join('')
        : '';

    host.innerHTML = `
        <svg viewBox="0 0 ${MAP_W} ${MAP_H}" role="img" aria-label="${t('map.alt')}">
            ${shapes}
            ${dots}
            ${watermark('mp-fx', MAP_W, MAP_H)}
        </svg>`;

    renderMapLegend();
}

function renderMapLegend() {
    const host = $('#map-legend');
    if (!host) return;
    const types = ['urban_traffic', 'urban_background', 'suburban_background'];
    host.innerHTML = `
        <div class="mp-scale">
            <span class="meta">${t('map.legend')}</span>
            <div class="mp-ramp" aria-hidden="true"></div>
            <div class="mp-ramp__ends">
                <span>${isProvisional() ? DASH : num(-1, { digits: 0 })}</span>
                <span>0</span>
                <span>${isProvisional() ? DASH : num(1, { digits: 0, sign: true })}</span>
            </div>
        </div>
        <button type="button" class="btn btn--text mp-toggle" id="map-stations"
                aria-pressed="${showStations}">
            ${showStations ? t('map.stationsOff') : t('map.stations')}
        </button>
        ${showStations ? `<ul class="mp-key">${types.map((ty) => `
            <li><span class="mp-dot-key mp-dot--${ty}"></span>${t(`map.types.${ty}`)}</li>`).join('')}</ul>` : ''}`;

    const btn = $('#map-stations');
    if (btn) {
        btn.addEventListener('click', () => {
            showStations = !showStations;
            renderMap();
        });
    }
}

/* --- fig. 06: the results table ------------------------------------------- */

function renderResults() {
    const host = $('#results');
    if (!host) return;
    const rows = DATA.headline || [];
    if (!rows.length) {
        host.innerHTML = `<p class="lead">${t('results.empty')}</p>`;
        return;
    }

    const body = rows.map((r) => `
        <tr>
            <th scope="row">${t(`results.labels.${r.label}`)}</th>
            <td>${t(`results.families.${r.family}`)}</td>
            <td>${t(`results.outcomes.${r.outcome}`)}</td>
            <td class="rt-num">${num(r.estimate, { digits: 2, sign: true })}</td>
            <td class="rt-num">${interval(r.ci_low, r.ci_high, { digits: 2, sign: true })}</td>
            <td><span class="rt-verdict">${t(`results.verdicts.${r.verdict}`)}</span></td>
        </tr>`).join('');

    const meta = DATA.meta || {};
    const n = meta.n_stations || {};
    const win = meta.analysis_window || {};

    host.innerHTML = `
        <div class="rt-wrap">
            <table class="rt">
                <thead>
                    <tr>
                        <th scope="col">${t('results.cols.label')}</th>
                        <th scope="col">${t('results.cols.family')}</th>
                        <th scope="col">${t('results.cols.outcome')}</th>
                        <th scope="col">${t('results.cols.estimate')}</th>
                        <th scope="col">${t('results.cols.ci')}</th>
                        <th scope="col">${t('results.cols.verdict')}</th>
                    </tr>
                </thead>
                <tbody>${body}</tbody>
            </table>
        </div>
        <dl class="rt-meta">
            <div><dt>${t('results.stations')}</dt><dd>${count((n.DE || 0) + (n.controls || 0))}</dd></div>
            <div><dt>${t('results.stationDays')}</dt><dd>${count(meta.n_station_days)}</dd></div>
            <div><dt>${t('results.window')}</dt><dd>${isProvisional() || !win.start ? DASH : `${win.start} → ${win.end}`}</dd></div>
            <div><dt>${t('results.grid')}</dt><dd>${num(meta.weather_grid_deg, { digits: 2, suffix: '°' })}</dd></div>
        </dl>`;
}

/* --- fig. 07: the counterfactual ------------------------------------------ */

const CF_W = 720;
const CF_TOP = 250;
const CF_GAP = 110;

function renderCounterfactual() {
    const host = $('#counterfactual');
    if (!host) return;
    const sc = DATA.synthetic_control;
    if (!sc || !sc.series || !sc.series.length) {
        host.innerHTML = `<p class="lead">${t('counterfactual.empty')}</p>`;
        return;
    }

    const rows = sc.series;
    const months = rows.map((r) => r.month);
    const x = scale(0, rows.length - 1, 48, CF_W - 16);
    const yDom = padded(extent(rows.flatMap((r) => [r.actual, r.synthetic])));
    const y = scale(yDom[0], yDom[1], CF_TOP - 28, 16);

    const line = (key) => rows.map((r, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)} ${y(r[key]).toFixed(1)}`).join('');

    const gaps = rows.map((r) => r.actual - r.synthetic);
    const gDom = padded(extent(gaps.concat([0])));
    const gy = scale(gDom[0], gDom[1], CF_GAP - 24, 12);
    const gapLine = rows.map((r, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)} ${gy(gaps[i]).toFixed(1)}`).join('');

    const bands = policyBands(months, x);
    const yearTicks = months.map((m, i) => (m.endsWith('-01') ? `
        <text class="ax-label" x="${x(i).toFixed(1)}" y="${CF_TOP - 8}" text-anchor="middle">${m.slice(0, 4)}</text>` : '')).join('');

    host.innerHTML = `
        <svg viewBox="0 0 ${CF_W} ${CF_TOP + CF_GAP}" role="img" aria-label="${t('counterfactual.alt')}">
            ${bands(0, CF_TOP - 28)}
            <line class="ax-line" x1="48" y1="${CF_TOP - 28}" x2="${CF_W - 16}" y2="${CF_TOP - 28}" />
            <path class="cf-line cf-line--synth" d="${line('synthetic')}" />
            <path class="cf-line cf-line--actual" d="${line('actual')}" />
            <text class="ax-label" x="44" y="20" text-anchor="end">${tick(yDom[1])}</text>
            <text class="ax-label" x="44" y="${(CF_TOP - 28).toFixed(1)}" text-anchor="end">${tick(yDom[0])}</text>
            ${yearTicks}
            <g transform="translate(0 ${CF_TOP})">
                ${bands(0, CF_GAP - 24)}
                <line class="ax-zero" x1="48" y1="${gy(0).toFixed(1)}" x2="${CF_W - 16}" y2="${gy(0).toFixed(1)}" />
                <path class="cf-line cf-line--gap" d="${gapLine}" />
                <text class="ax-label" x="44" y="${(gy(0) + 4).toFixed(1)}" text-anchor="end">${t('counterfactual.gap')}</text>
            </g>
            ${watermark('cf-fx', CF_W, CF_TOP + CF_GAP)}
        </svg>
        <ul class="ch-key">
            <li><span class="ch-swatch ch-swatch--actual"></span>${t('counterfactual.actual')}</li>
            <li><span class="ch-swatch ch-swatch--synth"></span>${t('counterfactual.synthetic')}</li>
        </ul>`;
}

/** Shades the policy windows wherever a chart runs on the same month axis. */
function policyBands(months, x) {
    const windows = (DATA.timeline || []).filter((w) => w.kind === 'treatment');
    return (yTop, yBottom) => windows.map((w) => {
        const from = months.findIndex((m) => m >= w.start.slice(0, 7));
        if (from < 0) return '';
        const toMonth = w.end ? w.end.slice(0, 7) : months[months.length - 1];
        let to = months.findIndex((m) => m > toMonth);
        if (to < 0) to = months.length - 1;
        return `<rect class="ch-band" x="${x(from).toFixed(1)}" y="${yTop}"
                      width="${Math.max(2, x(to) - x(from)).toFixed(1)}" height="${yBottom - yTop}" />`;
    }).join('');
}

/* --- fig. 08: the event study --------------------------------------------- */

const ES_W = 720;
const ES_H = 280;
let eventVariant = 'nine_euro';

function renderEventStudy() {
    const host = $('#event-study');
    if (!host) return;
    const all = DATA.event_study || [];
    if (!all.length) {
        host.innerHTML = `<div class="ch-canvas ch-canvas--event"><p class="lead">${t('event.empty')}</p></div>`;
        return;
    }
    const variants = [...new Set(all.map((r) => r.variant))];
    if (!variants.includes(eventVariant)) eventVariant = variants[0];
    const rows = all.filter((r) => r.variant === eventVariant);
    const months = rows.map((r) => r.month);

    const x = scale(0, rows.length - 1, 48, ES_W - 16);
    const yDom = padded(extent(rows.flatMap((r) => [r.lo, r.hi]).concat([0])));
    const y = scale(yDom[0], yDom[1], ES_H - 34, 16);
    const bands = policyBands(months, x);

    const marks = rows.map((r, i) => `
        <line class="ev-ci" x1="${x(i).toFixed(1)}" y1="${y(r.lo).toFixed(1)}"
              x2="${x(i).toFixed(1)}" y2="${y(r.hi).toFixed(1)}" />
        <circle class="ev-dot" cx="${x(i).toFixed(1)}" cy="${y(r.est).toFixed(1)}" r="2.6" />`).join('');

    const yearTicks = months.map((m, i) => (m.endsWith('-01') ? `
        <text class="ax-label" x="${x(i).toFixed(1)}" y="${ES_H - 12}" text-anchor="middle">${m.slice(0, 4)}</text>` : '')).join('');

    host.innerHTML = `
        <div class="ch-tabs" role="group">
            ${variants.map((v) => `
                <button type="button" class="ch-tab${v === eventVariant ? ' is-on' : ''}"
                        data-variant="${v}" aria-pressed="${v === eventVariant}">${t(`event.variants.${v}`)}</button>`).join('')}
        </div>
        <div class="ch-canvas ch-canvas--event">
        <svg viewBox="0 0 ${ES_W} ${ES_H}" role="img" aria-label="${t('event.alt')}">
            ${bands(0, ES_H - 34)}
            <line class="ax-zero" x1="48" y1="${y(0).toFixed(1)}" x2="${ES_W - 16}" y2="${y(0).toFixed(1)}" />
            ${marks}
            <text class="ax-label" x="44" y="20" text-anchor="end">${tick(yDom[1])}</text>
            <text class="ax-label" x="44" y="${(y(0) + 4).toFixed(1)}" text-anchor="end">0</text>
            <text class="ax-label" x="44" y="${(ES_H - 34).toFixed(1)}" text-anchor="end">${tick(yDom[0])}</text>
            ${yearTicks}
            ${watermark('ev-fx', ES_W, ES_H)}
        </svg>
        </div>`;

    $$('.ch-tab', host).forEach((b) => b.addEventListener('click', () => {
        eventVariant = b.dataset.variant;
        renderEventStudy();
    }));
}

/* --- fig. 09: the placebo strip ------------------------------------------- */

const PB_W = 720;
const PB_H = 180;

function renderPlacebo() {
    const host = $('#placebo');
    if (!host) return;
    const rows = DATA.placebos || [];
    if (!rows.length) {
        host.innerHTML = `<p class="lead">${t('placebo.empty')}</p>`;
        return;
    }
    const real = (DATA.headline || []).find((r) => r.outcome === 'no2_deweathered');
    const values = rows.flatMap((r) => [r.lo, r.hi]).concat(real ? [real.estimate] : []);
    const xDom = padded(extent(values));
    const x = scale(xDom[0], xDom[1], 24, PB_W - 24);

    const kinds = ['in_space', 'in_time'];
    const lanes = kinds.map((kind, k) => {
        const lane = 54 + k * 46;
        const dots = rows.filter((r) => r.kind === kind).map((r) => `
            <line class="pb-ci" x1="${x(r.lo).toFixed(1)}" y1="${lane}" x2="${x(r.hi).toFixed(1)}" y2="${lane}" />
            <circle class="pb-dot" cx="${x(r.estimate).toFixed(1)}" cy="${lane}" r="3">
                <title>${r.label}: ${num(r.estimate, { digits: 2, sign: true })}</title>
            </circle>`).join('');
        return `
            <text class="ax-label" x="24" y="${lane - 14}">${t(kind === 'in_space' ? 'placebo.inSpace' : 'placebo.inTime')}</text>
            ${dots}`;
    }).join('');

    const realMark = real ? `
        <line class="pb-real" x1="${x(real.estimate).toFixed(1)}" y1="30" x2="${x(real.estimate).toFixed(1)}" y2="${PB_H - 30}" />
        <text class="ax-label pb-real-label" x="${x(real.estimate).toFixed(1)}" y="24" text-anchor="middle">${t('placebo.real')}</text>` : '';

    host.innerHTML = `
        <svg viewBox="0 0 ${PB_W} ${PB_H}" role="img" aria-label="${t('placebo.alt')}">
            <line class="ax-zero" x1="${x(0).toFixed(1)}" y1="30" x2="${x(0).toFixed(1)}" y2="${PB_H - 30}" />
            ${lanes}
            ${realMark}
            <text class="ax-label" x="24" y="${PB_H - 10}">${tick(xDom[0])}</text>
            <text class="ax-label" x="${PB_W - 24}" y="${PB_H - 10}" text-anchor="end">${tick(xDom[1])}</text>
            ${watermark('pb-fx', PB_W, PB_H)}
        </svg>`;
}

/* --- fig. 10: methods ----------------------------------------------------- */

const METHODS = ['prereg', 'deweathering', 'data', 'limitations'];

function renderMethods() {
    const host = $('#methods');
    if (!host) return;
    host.innerHTML = METHODS.map((id) => `
        <details class="mt-item">
            <summary class="mt-summary">
                <span class="mt-title">${t(`methods.items.${id}.title`)}</span>
                <span class="meta mt-cue" aria-hidden="true">${t('methods.show')}</span>
            </summary>
            <p class="mt-body">${t(`methods.items.${id}.body`)}</p>
        </details>`).join('');
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
    renderBanner();
    renderTimeline();
    renderQuestions();
    renderPipeline();
    renderDecisions();
    renderMap();
    renderResults();
    renderCounterfactual();
    renderEventStudy();
    renderPlacebo();
    renderMethods();
    observeReveals();
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

    // The page renders its empty states first, then fills in once the exports
    // arrive, so a slow or missing file never leaves a blank screen.
    loadData().then(() => renderAll());

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

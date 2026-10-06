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
import {
    DATA, loadData, isProvisional, num, interval, count, label, monthNumber, DASH,
} from './data.js';

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

const TL_CATEGORIES = ['treatment', 'fuel_price'];

/**
 * The figure's own contents as a sentence. The alt used to name three policies
 * that were written into the page; the file now carries nine, so it is built
 * from whatever is actually drawn.
 */
function timelineAlt(bars, marks) {
    const names = bars.map((r) => label(r.label)).join(', ');
    return `${t('experiment.alt')} ${names}.`
        + (marks.length ? ` ${marks.map((r) => `${label(r.label)} (${r.start})`).join('. ')}.` : '');
}

/** A YYYY-MM-DD string as months since year 0, for the timeline axis. */
function dayMonth(iso) {
    return monthNumber(String(iso).slice(0, 7));
}

/**
 * The policy windows, straight from timeline.json. Bars for anything with a
 * span, tick marks for the single-day COVID events. Dates are facts, so they
 * are drawn whatever the export's status says; a missing file leaves the figure
 * empty rather than falling back to anything written in here.
 */
function renderTimeline() {
    const host = $('#timeline');
    if (!host) return;
    const rows = (DATA.timeline || []);
    if (!rows.length) { host.innerHTML = ''; return; }

    const bars = rows.filter((r) => TL_CATEGORIES.includes(r.category));
    const marks = rows.filter((r) => r.category === 'covid');
    if (!bars.length) { host.innerHTML = ''; return; }

    // One layout at every width. Nine labelled windows do not restack into a
    // phone without colliding, so the figure keeps its label column and pans.
    const starts = rows.map((r) => dayMonth(r.start));
    const ends = rows.map((r) => (r.end ? dayMonth(r.end) + 1 : null)).filter((v) => v !== null);
    const lo = Math.min(...starts) - 1;
    const hi = Math.max(Math.max(...ends), lo + 12) + 2;

    const W = 760;
    const labelW = 168;
    const x0 = labelW + 14;
    const x1 = W - 14;
    const at = (m) => x0 + ((m - lo) / (hi - lo)) * (x1 - x0);

    const rowH = 34;
    const barH = 17;
    const top = 14;
    const axisY = top + bars.length * rowH + 14;
    const H = axisY + 34;

    const lanes = bars.map((r, i) => {
        const yMid = top + i * rowH + rowH / 2;
        const a = at(dayMonth(r.start));
        const b = r.end ? at(dayMonth(r.end) + 1) : at(hi);
        const open = !r.end;
        const cls = `tl-bar${r.category === 'fuel_price' ? ' tl-bar--confound' : ''}`;
        const y = yMid - barH / 2;
        const shape = open
            ? `<path class="${cls}" d="M${a.toFixed(1)} ${y} L${(b - 7).toFixed(1)} ${y} L${b.toFixed(1)} ${(y + barH / 2).toFixed(1)} L${(b - 7).toFixed(1)} ${(y + barH).toFixed(1)} L${a.toFixed(1)} ${(y + barH).toFixed(1)} Z" />`
            : `<rect class="${cls}" x="${a.toFixed(1)}" y="${y}" width="${Math.max(2, b - a).toFixed(1)}" height="${barH}" rx="3" />`;
        const span = r.end ? `${r.start} to ${r.end}` : `${r.start} onwards`;
        const text = `<text class="tl-name" x="${labelW}" y="${(yMid - 1).toFixed(1)}" text-anchor="end">${label(r.label)}</text>
               <text class="tl-cc" x="${labelW}" y="${(yMid + 11).toFixed(1)}" text-anchor="end">${r.cc}</text>`;
        return `${text}<g><title>${label(r.label)}, ${span}</title>${shape}</g>`;
    }).join('');

    const ticks = marks.map((r) => {
        const x = at(dayMonth(r.start));
        return `<g><title>${label(r.label)}, ${r.start}</title>
            <line class="tl-event" x1="${x.toFixed(1)}" y1="${top - 6}" x2="${x.toFixed(1)}" y2="${axisY}" /></g>`;
    }).join('');

    const years = [];
    for (let m = Math.floor(lo / 12) * 12; m < hi; m += 12) {
        const mid = Math.max(m + 6, (lo + Math.min(m + 12, hi)) / 2);
        if (Math.min(m + 12, hi) - Math.max(m, lo) >= 3) {
            years.push(`<text class="tl-year" x="${at(mid).toFixed(1)}" y="${axisY + 18}" text-anchor="middle">${m / 12}</text>`);
        }
        if (m > lo) years.push(`<line class="tl-grid" x1="${at(m).toFixed(1)}" y1="${top - 6}" x2="${at(m).toFixed(1)}" y2="${axisY}" />`);
    }

    host.innerHTML = `
        <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${timelineAlt(bars, marks)}">
            ${years.join('')}
            ${ticks}
            ${lanes}
            <line class="tl-axis" x1="${x0}" y1="${axisY}" x2="${x1}" y2="${axisY}" />
        </svg>
        ${marks.length ? `<p class="meta tl-events">${marks.map((r) => `${label(r.label)} (${r.start})`).join(' · ')}</p>` : ''}`;
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
 * The diagonal provisional wash. While the data is not final every chart wears
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
    // Hidden until the data says otherwise. Showing it by default meant it
    // collapsed out of the layout on every normal load, taking the top of the
    // page up 155px with it; nothing can print a number before this runs, so
    // starting hidden cannot mislead anyone.
    host.hidden = !(DATA.loaded && isProvisional());
    const missing = $('.prov__missing', host);
    if (missing) missing.hidden = !DATA.missing.length;
}

/* --- fig. 05: the map ----------------------------------------------------- */

const MAP_W = 640;
const MAP_H = 440;
const STATION_TYPES = ['traffic', 'background'];
let showStations = false;

/** Equirectangular, corrected at the middle latitude. Europe at this size. */
function projector(features) {
    const lons = [];
    const lats = [];
    features.forEach((f) => rings(f).forEach((ring) => ring.forEach(([lon, lat]) => {
        lons.push(lon); lats.push(lat);
    })));
    const [lon0, lon1] = extent(lons);
    const [lat0, lat1] = extent(lats);
    const k = Math.cos(((lat0 + lat1) / 2) * Math.PI / 180);
    const pad = 12;
    const w = (lon1 - lon0) * k;
    const h = lat1 - lat0;
    const sc = Math.min((MAP_W - pad * 2) / w, (MAP_H - pad * 2) / h);
    const dx = (MAP_W - w * sc) / 2;
    const dy = (MAP_H - h * sc) / 2;
    return ([lon, lat]) => [dx + (lon - lon0) * k * sc, dy + (lat1 - lat) * sc];
}

/** Polygon and MultiPolygon, flattened to a list of rings. */
function rings(feature) {
    const g = feature.geometry || {};
    if (g.type === 'Polygon') return g.coordinates;
    if (g.type === 'MultiPolygon') return g.coordinates.flat();
    return [];
}

/**
 * Diverging, centred on zero. Blue reads as less NO2 than expected, amber as
 * more, which is the direction the unit implies. Nothing is coloured by value
 * while the data is provisional: on a map the fill is the number.
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
    const maxAbs = Math.max(1, ...(payload.countries || []).map((c) => Math.abs(c.value_nine_euro || 0)));

    const project = projector(geo.features);
    const toPath = (f) => rings(f)
        .map((ring) => `M${ring.map((pt) => project(pt).map((n) => n.toFixed(1)).join(' ')).join('L')}Z`)
        .join('');

    const shapes = geo.features.map((f) => {
        const cc = f.properties.ISO_A2;
        const row = byCc[cc];
        const inStudy = Boolean(row);
        const fill = inStudy ? divergingFill(row.value_nine_euro, maxAbs) : 'var(--map-out)';
        const text = inStudy
            ? `${row.name}: ${num(row.value_nine_euro, { digits: 2, sign: true })}, ${count(row.n_stations)} ${t('map.stationCount')}`
            : (f.properties.NAME || cc);
        return `<path class="mp-country${inStudy ? ' is-study' : ''}" d="${toPath(f)}"
                      fill="${fill}" tabindex="${inStudy ? '0' : '-1'}"
                      role="${inStudy ? 'img' : 'presentation'}"
                      ${inStudy ? `aria-label="${text}"` : ''}><title>${text}</title></path>`;
    }).join('');

    const dots = showStations
        ? (payload.stations || []).map((st) => {
            const [x, y] = project([st.lon, st.lat]);
            return `<circle class="mp-dot mp-dot--${st.type}" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="1.9" />`;
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
    const payload = DATA.map || {};
    const maxAbs = Math.max(1, ...(payload.countries || []).map((c) => Math.abs(c.value_nine_euro || 0)));
    host.innerHTML = `
        <div class="mp-scale">
            <span class="meta">${t('map.legend')}</span>
            <div class="mp-ramp" aria-hidden="true"></div>
            <div class="mp-ramp__ends">
                <span>${num(-maxAbs, { digits: 0 })}</span>
                <span>0</span>
                <span>${num(maxAbs, { digits: 0, sign: true })}</span>
            </div>
        </div>
        <button type="button" class="btn btn--text mp-toggle" id="map-stations"
                aria-pressed="${showStations}">
            ${showStations ? t('map.stationsOff') : t('map.stations')}
        </button>
        ${showStations ? `<ul class="mp-key">${STATION_TYPES.map((ty) => `
            <li><span class="mp-dot-key mp-dot--${ty}"></span>${t(`map.types.${ty}`)}</li>`).join('')}</ul>` : ''}`;

    const btn = $('#map-stations');
    if (btn) btn.addEventListener('click', () => { showStations = !showStations; renderMap(); });
}

/* --- fig. 06: the results table ------------------------------------------- */

/* The contract's family values are prose-ish, so they map to string keys here
   rather than being mangled into one. A value with no entry falls through to
   itself, which shows up as a missing key rather than silently blank. */
const FAMILY_KEYS = {
    'primary': 'primary',
    'secondary (a)': 'secondary_a',
    'secondary (b)': 'secondary_b',
    'secondary (c)': 'secondary_c',
    'heterogeneity': 'heterogeneity',
    'exploratory (ADR-009)': 'exploratory',
};

/** The unit each outcome is measured in, appended to every estimate. */
const UNITS = { ratio_pct: ' pts', commute_excess: ' pts', resid_ugm3: ' µg/m³' };

function renderResults() {
    const host = $('#results');
    if (!host) return;
    const rows = DATA.headline || [];
    if (!rows.length) {
        host.innerHTML = `<p class="lead">${t('results.empty')}</p>`;
        return;
    }

    const body = rows.map((r) => {
        // "not evaluated" means no decision rule was applied to this row. It is
        // context for the reader, not a finding, and must not be dressed as one.
        const context = r.verdict === 'not evaluated';
        const key = String(r.verdict).replace(/\s+/g, '_');
        const dir = t(`results.directions.${r.direction}`);
        const unit = UNITS[r.outcome] || '';
        return `
            <tr class="${context ? 'rt-row--context' : ''}">
                <th scope="row">${label(r.label)}</th>
                <td>${t(`results.families.${FAMILY_KEYS[r.family] || r.family}`)}</td>
                <td>${t(`results.outcomes.${r.outcome}`)}</td>
                <td class="rt-num">${num(r.estimate, { digits: 2, sign: true, suffix: unit })}</td>
                <td class="rt-num">${interval(r.ci_low, r.ci_high, { digits: 2, sign: true })}</td>
                <td class="rt-decide">
                    <span class="rt-verdict rt-verdict--${key}">${t(`results.verdicts.${key}`)}</span>
                    <span class="rt-direction">${dir}</span>
                </td>
            </tr>`;
    }).join('');

    const meta = DATA.meta || {};
    const n = meta.n_stations || {};
    const win = meta.analysis_window || {};
    const years = Array.isArray(win.years) && !isProvisional() ? win.years.join(', ') : DASH;

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
        <p class="meta rt-note">${t('results.ruleNote')}</p>
        <dl class="rt-meta">
            <div><dt>${t('results.stations')}</dt><dd>${count((n.DE || 0) + (n.controls || 0))}</dd></div>
            <div><dt>${t('results.stationDays')}</dt><dd>${count(meta.n_station_days)}</dd></div>
            <div><dt>${t('results.window')}</dt><dd>${years}</dd></div>
            <div><dt>${t('results.grid')}</dt><dd>${num(meta.weather_grid_deg, { digits: 1, suffix: '°' })}</dd></div>
        </dl>`;
}

/* --- time axis shared by fig. 07 and fig. 08 ------------------------------ */

/**
 * A month axis that leaves a hole where months are missing. 2020 and 2021 were
 * dropped from the analysis, so drawing index-to-index would close the gap and
 * imply a continuous series across COVID. Everything here is spaced by real
 * date, and paths break wherever consecutive months are not adjacent.
 */
function monthAxis(months, left, right) {
    const nums = months.map(monthNumber);
    const lo = Math.min(...nums);
    const hi = Math.max(...nums);
    const x = scale(lo, hi, left, right);
    return { x, nums, lo, hi };
}

/** Splits a series into runs of consecutive months, so gaps stay gaps. */
function runs(nums) {
    const out = [];
    let run = [0];
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] - nums[i - 1] === 1) run.push(i);
        else { out.push(run); run = [i]; }
    }
    out.push(run);
    return out;
}

/** Shades the excluded years, so the hole in the line is explained. */
function gapBand(axis, yTop, yBottom) {
    const holes = [];
    for (let i = 1; i < axis.nums.length; i++) {
        if (axis.nums[i] - axis.nums[i - 1] > 1) holes.push([axis.nums[i - 1] + 1, axis.nums[i]]);
    }
    return holes.map(([a, b]) => `
        <rect class="ch-gap" x="${axis.x(a).toFixed(1)}" y="${yTop}"
              width="${Math.max(2, axis.x(b) - axis.x(a)).toFixed(1)}" height="${yBottom - yTop}" />
        <text class="ax-label ch-gap__label" x="${axis.x((a + b) / 2).toFixed(1)}"
              y="${yTop + 14}" text-anchor="middle">${t('charts.excluded')}</text>`).join('');
}

/** Shades the policy windows wherever a chart runs on a month axis. */
function policyBands(axis, yTop, yBottom) {
    return (DATA.timeline || [])
        .filter((w) => w.category === 'treatment' && w.cc === 'DE' && !/€/.test(w.label))
        .map((w) => {
            const a = monthNumber(String(w.start).slice(0, 7));
            const b = w.end ? monthNumber(String(w.end).slice(0, 7)) + 1 : axis.hi;
            if (b < axis.lo || a > axis.hi) return '';
            const x0 = axis.x(Math.max(a, axis.lo));
            const x1 = axis.x(Math.min(b, axis.hi));
            return `<rect class="ch-band" x="${x0.toFixed(1)}" y="${yTop}"
                          width="${Math.max(2, x1 - x0).toFixed(1)}" height="${yBottom - yTop}" />`;
        }).join('');
}

/** Year labels under a month axis. */
function yearTicks(axis, y) {
    const out = [];
    for (let m = Math.ceil(axis.lo / 12) * 12; m <= axis.hi; m += 12) {
        if (axis.nums.includes(m)) {
            out.push(`<text class="ax-label" x="${axis.x(m + 5).toFixed(1)}" y="${y}" text-anchor="middle">${m / 12}</text>`);
        }
    }
    return out.join('');
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
        host.innerHTML = `<div class="ch-canvas ch-canvas--cf"><p class="lead">${t('counterfactual.empty')}</p></div>`;
        return;
    }

    const rows = sc.series;
    const axis = monthAxis(rows.map((r) => r.month), 48, CF_W - 16);
    const yDom = padded(extent(rows.flatMap((r) => [r.actual, r.synthetic])));
    const y = scale(yDom[0], yDom[1], CF_TOP - 28, 16);

    const segs = runs(axis.nums);
    const line = (key) => segs.map((run) => run
        .map((i, k) => `${k ? 'L' : 'M'}${axis.x(axis.nums[i]).toFixed(1)} ${y(rows[i][key]).toFixed(1)}`)
        .join('')).join(' ');

    const gaps = rows.map((r) => r.actual - r.synthetic);
    const gDom = padded(extent(gaps.concat([0])));
    const gy = scale(gDom[0], gDom[1], CF_GAP - 24, 12);
    const gapLine = segs.map((run) => run
        .map((i, k) => `${k ? 'L' : 'M'}${axis.x(axis.nums[i]).toFixed(1)} ${gy(gaps[i]).toFixed(1)}`)
        .join('')).join(' ');

    const donors = Object.entries(sc.weights || {})
        .filter(([, w]) => w > 0.001)
        .sort((a, b) => b[1] - a[1])
        .map(([cc, w]) => `${cc} ${num(w * 100, { digits: 0, suffix: '%' })}`)
        .join(' · ');

    host.innerHTML = `
        <div class="ch-canvas ch-canvas--cf">
        <svg viewBox="0 0 ${CF_W} ${CF_TOP + CF_GAP}" role="img" aria-label="${t('counterfactual.alt')}">
            ${policyBands(axis, 0, CF_TOP - 28)}
            ${gapBand(axis, 0, CF_TOP - 28)}
            <line class="ax-line" x1="48" y1="${CF_TOP - 28}" x2="${CF_W - 16}" y2="${CF_TOP - 28}" />
            <path class="cf-line cf-line--synth" d="${line('synthetic')}" />
            <path class="cf-line cf-line--actual" d="${line('actual')}" />
            <text class="ax-label" x="44" y="20" text-anchor="end">${tick(yDom[1], { digits: 0 })}</text>
            <text class="ax-label" x="44" y="${(CF_TOP - 28).toFixed(1)}" text-anchor="end">${tick(yDom[0], { digits: 0 })}</text>
            ${yearTicks(axis, CF_TOP - 8)}
            <g transform="translate(0 ${CF_TOP})">
                ${policyBands(axis, 0, CF_GAP - 24)}
                ${gapBand(axis, 0, CF_GAP - 24)}
                <line class="ax-zero" x1="48" y1="${gy(0).toFixed(1)}" x2="${CF_W - 16}" y2="${gy(0).toFixed(1)}" />
                <path class="cf-line cf-line--gap" d="${gapLine}" />
                <text class="ax-label" x="44" y="${(gy(0) + 4).toFixed(1)}" text-anchor="end">${t('counterfactual.gap')}</text>
            </g>
            ${watermark('cf-fx', CF_W, CF_TOP + CF_GAP)}
        </svg>
        </div>
        <ul class="ch-key">
            <li><span class="ch-swatch ch-swatch--actual"></span>${t('counterfactual.actual')}</li>
            <li><span class="ch-swatch ch-swatch--synth"></span>${t('counterfactual.synthetic')}</li>
        </ul>
        <p class="meta ch-note">${t('counterfactual.weights')}: ${isProvisional() ? DASH : donors}</p>`;
}

/* --- fig. 08: the event study --------------------------------------------- */

const ES_W = 720;
const ES_H = 280;
let eventVariant = 'ref_janmay';

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

    const axis = monthAxis(rows.map((r) => r.month), 48, ES_W - 16);
    const yDom = padded(extent(rows.flatMap((r) => [r.lo, r.hi]).concat([0])));
    const y = scale(yDom[0], yDom[1], ES_H - 34, 16);

    const marks = rows.map((r, i) => `
        <line class="ev-ci" x1="${axis.x(axis.nums[i]).toFixed(1)}" y1="${y(r.lo).toFixed(1)}"
              x2="${axis.x(axis.nums[i]).toFixed(1)}" y2="${y(r.hi).toFixed(1)}" />
        <circle class="ev-dot" cx="${axis.x(axis.nums[i]).toFixed(1)}" cy="${y(r.est).toFixed(1)}" r="2.3" />`).join('');

    host.innerHTML = `
        <div class="ch-tabs" role="group">
            ${variants.map((v) => `
                <button type="button" class="ch-tab${v === eventVariant ? ' is-on' : ''}"
                        data-variant="${v}" aria-pressed="${v === eventVariant}">${t(`event.variants.${v}`)}</button>`).join('')}
        </div>
        <div class="ch-canvas ch-canvas--event">
        <svg viewBox="0 0 ${ES_W} ${ES_H}" role="img" aria-label="${t('event.alt')}">
            ${policyBands(axis, 0, ES_H - 34)}
            ${gapBand(axis, 0, ES_H - 34)}
            <line class="ax-zero" x1="48" y1="${y(0).toFixed(1)}" x2="${ES_W - 16}" y2="${y(0).toFixed(1)}" />
            ${marks}
            <text class="ax-label" x="44" y="20" text-anchor="end">${tick(yDom[1], { digits: 0 })}</text>
            <text class="ax-label" x="44" y="${(y(0) + 4).toFixed(1)}" text-anchor="end">0</text>
            <text class="ax-label" x="44" y="${(ES_H - 34).toFixed(1)}" text-anchor="end">${tick(yDom[0], { digits: 0 })}</text>
            ${yearTicks(axis, ES_H - 12)}
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
const PB_H = 190;

function renderPlacebo() {
    const host = $('#placebo');
    if (!host) return;
    const payload = DATA.placebos;
    const rows = (payload && payload.rows ? payload.rows : []).filter((r) => r.outcome === 'ratio_pct');
    if (!rows.length) {
        host.innerHTML = `<p class="lead">${t('placebo.empty')}</p>`;
        return;
    }
    const real = (payload.primary || []).find((r) => r.outcome === 'ratio_pct');

    const values = rows.flatMap((r) => [r.lo, r.hi]).concat(real ? [real.lo, real.hi] : []);
    const xDom = padded(extent(values));
    const x = scale(xDom[0], xDom[1], 24, PB_W - 24);

    const kinds = ['country', 'date'];
    const lanes = kinds.map((kind, k) => {
        const lane = 58 + k * 48;
        const dots = rows.filter((r) => r.kind === kind).map((r) => `
            <line class="pb-ci" x1="${x(r.lo).toFixed(1)}" y1="${lane}" x2="${x(r.hi).toFixed(1)}" y2="${lane}" />
            <circle class="pb-dot" cx="${x(r.estimate).toFixed(1)}" cy="${lane}" r="3">
                <title>${label(r.label)}: ${num(r.estimate, { digits: 2, sign: true })}</title>
            </circle>`).join('');
        return `
            <text class="ax-label" x="24" y="${lane - 15}">${t(kind === 'country' ? 'placebo.inSpace' : 'placebo.inTime')}</text>
            ${dots}`;
    }).join('');

    const realMark = real ? `
        <line class="pb-real" x1="${x(real.estimate).toFixed(1)}" y1="32" x2="${x(real.estimate).toFixed(1)}" y2="${PB_H - 32}" />
        <text class="ax-label pb-real-label" x="${x(real.estimate).toFixed(1)}" y="26" text-anchor="middle">${t('placebo.real')} ${num(real.estimate, { digits: 2, sign: true })}</text>` : '';

    host.innerHTML = `
        <svg viewBox="0 0 ${PB_W} ${PB_H}" role="img" aria-label="${t('placebo.alt')}">
            <line class="ax-zero" x1="${x(0).toFixed(1)}" y1="32" x2="${x(0).toFixed(1)}" y2="${PB_H - 32}" />
            ${lanes}
            ${realMark}
            <text class="ax-label" x="24" y="${PB_H - 10}">${tick(xDom[0], { digits: 0 })}</text>
            <text class="ax-label" x="${PB_W - 24}" y="${PB_H - 10}" text-anchor="end">${tick(xDom[1], { digits: 0, sign: true })}</text>
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
            if (next !== mode) { mode = next; renderPipeline(); }
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

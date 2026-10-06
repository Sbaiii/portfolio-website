/* =============================================================================
   data.js: loads the analysis exports and guards what may be printed.

   The files in ./data/ are written by the analysis repository's
   `analysis/dashboard_data.py` and are described by its dashboard/README.md.
   Never edit them by hand. This module only reads them.

   Two rules matter more than anything else here:

     1. The page may print a number only when EVERY file says "FINAL". One file
        left behind by a half-finished export is enough to hold the whole page
        back, which is the behaviour the contract asks for.

     2. A missing or malformed file is not a crash. Each one falls back to an
        empty value and is recorded in DATA.missing, so a fresh clone without
        the exports renders its empty states instead of a blank screen.
   ========================================================================== */

const DIR = new URL('./data/', import.meta.url);

/** Every file the page reads, and what an absent one falls back to. */
const FILES = {
    meta: {},
    headline: [],
    event_study: [],
    synthetic_control: null,
    placebos: null,
    map: null,
    timeline: [],
    countries: null,
};

/** Files whose payload is a list under `rows`, flattened on the way in. */
const ROW_FILES = new Set(['headline', 'event_study', 'timeline']);

export const DATA = { ...FILES, loaded: false, missing: [], statuses: {} };

async function one(key) {
    const file = key === 'countries' ? 'countries.geojson' : `${key}.json`;
    try {
        const res = await fetch(new URL(file, DIR));
        if (!res.ok) throw new Error(`${res.status}`);
        const body = await res.json();
        if (body && typeof body === 'object' && !Array.isArray(body)) {
            DATA.statuses[key] = body.status || null;
        }
        return ROW_FILES.has(key) && body && Array.isArray(body.rows) ? body.rows : body;
    } catch (e) {
        DATA.missing.push(file);
        return FILES[key];
    }
}

/** Fetch everything once. Resolves even when files are missing. */
export async function loadData() {
    const keys = Object.keys(FILES);
    const payloads = await Promise.all(keys.map(one));
    keys.forEach((k, i) => { DATA[k] = payloads[i]; });
    DATA.loaded = true;
    return DATA;
}

/* --- the guard ------------------------------------------------------------ */

/**
 * True until every file of the export says FINAL. A mixed export, where one
 * file lags behind the others, counts as provisional: the contract gives every
 * file its own status precisely so that can be caught.
 */
export function isProvisional() {
    if (!DATA.loaded || DATA.missing.length) return true;
    const seen = Object.values(DATA.statuses);
    if (!seen.length) return true;
    return seen.some((s) => s !== 'FINAL');
}

/** What the page prints where a number would go while it is not final. */
export const DASH = '—';

/**
 * The only way a number reaches the page. While the data is provisional this
 * returns a dash whatever it is handed, so nothing unfinished can be read as a
 * result, and a chart axis has nothing to label.
 */
export function num(value, { digits = 1, sign = false, suffix = '' } = {}) {
    if (isProvisional()) return DASH;
    if (value === null || value === undefined || Number.isNaN(Number(value))) return DASH;
    const n = Number(value);
    const body = Math.abs(n).toFixed(digits);
    const mark = n < 0 ? '−' : (sign ? '+' : '');
    return `${mark}${body}${suffix}`;
}

/** A confidence interval, or a dash. */
export function interval(lo, hi, opts) {
    if (isProvisional()) return DASH;
    return `${num(lo, opts)} to ${num(hi, opts)}`;
}

/** An integer count, for station and observation totals. */
export function count(value) {
    if (isProvisional()) return DASH;
    if (value === null || value === undefined) return DASH;
    return Number(value).toLocaleString('en');
}

/**
 * A label that came out of the data. The exports use en dashes in date ranges
 * and this site uses none anywhere, so they are evened out on the way to the
 * screen. The files themselves are never touched.
 */
export function label(text) {
    return String(text == null ? '' : text).replace(/–/g, '-');
}

/** Months since year 0, so a time axis can leave a hole where data is missing. */
export function monthNumber(ym) {
    const [y, m] = String(ym).split('-').map(Number);
    return y * 12 + (m - 1);
}

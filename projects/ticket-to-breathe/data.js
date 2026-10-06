/* =============================================================================
   data.js: loads the analysis exports and guards what may be printed.

   The files in ./data/ are whatever the analysis repository last exported. Two
   rules matter more than anything else here:

     1. meta.status is the single switch. Anything other than 'FINAL' means the
        numbers are not ready, and `num()` returns an em-less dash instead of a
        value. There is no second place to remember to check.

     2. A missing or malformed file is not a crash. The page renders its empty
        states and says the data is not loaded, which is the honest outcome and
        also what you see on a fresh clone before the exports are copied in.

   Replace ./data/*.json with the exports from
   github.com/Sbaiii/ticket-to-breathe (dashboard/data/) and nothing else on
   the page needs to change.
   ========================================================================== */

const DIR = new URL('./data/', import.meta.url);

/** Every file the page reads, and what an absent one falls back to. */
const FILES = {
    meta: {},
    headline: [],
    event_study: [],
    synthetic_control: null,
    placebos: [],
    map: null,
    timeline: [],
    countries: null,
};

export const DATA = { ...FILES, loaded: false, missing: [] };

async function one(key) {
    const file = key === 'countries' ? 'countries.geojson' : `${key}.json`;
    try {
        const res = await fetch(new URL(file, DIR), { cache: 'no-cache' });
        if (!res.ok) throw new Error(`${res.status}`);
        return await res.json();
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

/** True unless the export says the numbers are final. */
export function isProvisional() {
    return (DATA.meta && DATA.meta.status) !== 'FINAL';
}

/** What the page prints where a number would go while it is not final. */
export const DASH = '—';

/**
 * The only way a number reaches the page. While the data is provisional this
 * returns a dash whatever it is handed, so no fixture value can be read as a
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

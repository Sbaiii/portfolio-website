/* =============================================================================
   chart.js — "The Trajectory".

   A step chart of where Abdellah physically was, over time.
     x = time,  y = latitude °N   (wide layout)
     y = time,  x = latitude °N   (tall layout — phones, genuinely transposed)

   Each role is a horizontal segment spanning its actual duration; the diagonals
   between them are the moves. The line is drawn by scroll position, then ends in
   a dashed forecast whose confidence band fans across the full latitude range.
   ========================================================================== */

import { TRAJECTORY, FORECAST } from '../content.js';
import { t, formatRange, reduceMotion } from './main.js';

const SVG_NS = 'http://www.w3.org/2000/svg';
const BREAKPOINT = 860;

/* Decimal year, so time maths stays trivial. */
const toYear = (iso) => {
    const [y, m] = iso.split('-').map(Number);
    return y + (m - 1) / 12;
};
const nowYear = () => {
    const d = new Date();
    return d.getFullYear() + d.getMonth() / 12 + d.getDate() / 365;
};

const X_MIN = 2022;
const X_MAX = toYear(FORECAST.until);
const Y_MIN = FORECAST.latLow;
const Y_MAX = FORECAST.latHigh;

/* Which side each annotation sits on, tuned so nothing collides. */
const LABEL_SIDE = {
    axa: -1, bp: 1, audensiel: -1, mss: -1, apu: 1,
};

const el = (name, attrs = {}, text) => {
    const node = document.createElementNS(SVG_NS, name);
    for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, String(v));
    if (text !== undefined) node.textContent = text;
    return node;
};

/** Build the list of drawn segments: each role, plus the moves between them. */
function buildSegments() {
    const now = nowYear();
    return TRAJECTORY.map((p) => ({
        id: p.id,
        type: p.type,
        lat: p.lat,
        x0: toYear(p.start),
        x1: p.end ? toYear(p.end) : now,
        point: p,
    }));
}

function pathFor(segs, proj) {
    let d = '';
    segs.forEach((s, i) => {
        const a = proj(s.x0, s.lat);
        const b = proj(s.x1, s.lat);
        d += i === 0 ? `M ${a.x} ${a.y}` : ` L ${a.x} ${a.y}`;
        d += ` L ${b.x} ${b.y}`;
    });
    return d;
}

function render(host, mode) {
    const wide = mode === 'wide';
    const W = wide ? 1200 : 340;
    // The wide layout needs room under the axis for the below-line annotations,
    // which otherwise land on top of the year labels.
    const H = wide ? 640 : 1040;
    const pad = wide
        ? { l: 58, r: 130, t: 64, b: 118 }
        // Tall layout: the annotation column needs ~174px for the longest line
        // ("Île-de-France · 48.86°N" at 12px mono), so the latitude strip is
        // deliberately narrow — the shape still reads, and the labels are legible.
        : { l: 34, r: 198, t: 30, b: 44 };

    // Projection: (year, latitude) -> (x, y) in viewBox units.
    const proj = wide
        ? (year, lat) => ({
            x: pad.l + ((year - X_MIN) / (X_MAX - X_MIN)) * (W - pad.l - pad.r),
            y: pad.t + (1 - (lat - Y_MIN) / (Y_MAX - Y_MIN)) * (H - pad.t - pad.b),
        })
        : (year, lat) => ({
            x: pad.l + ((lat - Y_MIN) / (Y_MAX - Y_MIN)) * (W - pad.l - pad.r),
            y: pad.t + ((year - X_MIN) / (X_MAX - X_MIN)) * (H - pad.t - pad.b),
        });

    const svg = el('svg', {
        class: 'chart__svg',
        viewBox: `0 0 ${W} ${H}`,
        role: 'img',
        'aria-label': t('trajectory.standfirst'),
    });

    /* --- grid + axes ----------------------------------------------------- */
    const grid = el('g', { class: 'chart__grid' });
    [0, 15, 30, 45].forEach((lat) => {
        const a = proj(X_MIN, lat);
        const b = proj(X_MAX, lat);
        grid.appendChild(el('line', { x1: a.x, y1: a.y, x2: b.x, y2: b.y }));
        const label = wide
            ? el('text', { class: 'chart__axis-label', x: 8, y: a.y + 3 }, `${lat}°N`)
            : el('text', { class: 'chart__axis-label', x: a.x, y: 18, 'text-anchor': 'middle' }, `${lat}°`);
        grid.appendChild(label);
    });
    // Year ticks
    for (let y = X_MIN; y <= X_MAX; y += 1) {
        const p = proj(y, Y_MIN);
        grid.appendChild(
            wide
                ? el('text', { class: 'chart__axis-label', x: p.x, y: p.y + 20, 'text-anchor': 'middle' }, String(y))
                : el('text', { class: 'chart__axis-label', x: 6, y: p.y + 3 }, String(y)),
        );
    }
    svg.appendChild(grid);

    const segs = buildSegments();
    const last = segs[segs.length - 1];
    const tip = proj(last.x1, last.lat);
    const endHi = proj(X_MAX, Y_MAX);
    const endLo = proj(X_MAX, Y_MIN);
    const endMid = proj(X_MAX, (Y_MAX + Y_MIN) / 2);

    /* --- forecast band + dashed line (revealed last) --------------------- */
    const forecast = el('g', { class: 'chart__forecast-group', opacity: 0 });
    forecast.appendChild(el('path', {
        class: 'chart__band',
        d: `M ${tip.x} ${tip.y} L ${endHi.x} ${endHi.y} L ${endLo.x} ${endLo.y} Z`,
    }));
    forecast.appendChild(el('path', {
        class: 'chart__forecast',
        d: `M ${tip.x} ${tip.y} L ${endMid.x} ${endMid.y}`,
    }));
    // In the tall layout the band fills the lower half, so the caption sits
    // clear of it on the baseline rather than across the dashed line.
    forecast.appendChild(el('text', {
        class: 'chart__forecast-label',
        x: wide ? endMid.x - 4 : pad.l,
        y: wide ? endMid.y - 14 : H - 10,
        'text-anchor': wide ? 'end' : 'start',
    }, t('trajectory.forecast')));
    svg.appendChild(forecast);

    /* --- the line -------------------------------------------------------- */
    const line = el('path', { class: 'chart__line', d: pathFor(segs, proj) });
    svg.appendChild(line);

    /* --- annotated points ------------------------------------------------ */
    const pointsG = el('g');
    segs.forEach((s) => {
        const mid = proj((s.x0 + s.x1) / 2, s.lat);
        const side = LABEL_SIDE[s.id] ?? -1;
        const p = s.point;

        const g = el('g', {
            class: 'chart__point',
            'data-id': s.id,
            'data-type': s.type,
            tabindex: '0',
            role: 'button',
            opacity: 0,
            'aria-label': `${p.org}, ${p.city}. ${formatRange(p.start, p.end)}. ${p.lat}°N`,
        });

        // Leader line + label
        if (wide) {
            // Below-line callouts reach further so they clear the year axis.
            const reach = side < 0 ? 34 : 62;
            const ly = mid.y + side * reach;
            g.appendChild(el('line', { class: 'chart__leader', x1: mid.x, y1: mid.y, x2: mid.x, y2: ly }));
            g.appendChild(el('text', {
                class: 'chart__pt-org', x: mid.x, y: side < 0 ? ly - 16 : ly + 16, 'text-anchor': 'middle',
            }, p.org));
            g.appendChild(el('text', {
                class: 'chart__pt-meta', x: mid.x, y: side < 0 ? ly - 3 : ly + 29, 'text-anchor': 'middle',
            }, `${p.city}, ${p.cc} · ${p.lat}°N`));
            g.appendChild(el('text', {
                class: 'chart__pt-meta', x: mid.x, y: side < 0 ? ly + 10 : ly + 42, 'text-anchor': 'middle',
            }, formatRange(p.start, p.end)));
        } else {
            const lx = W - pad.r + 12;
            g.appendChild(el('line', { class: 'chart__leader', x1: mid.x, y1: mid.y, x2: lx - 6, y2: mid.y }));
            g.appendChild(el('text', { class: 'chart__pt-org', x: lx, y: mid.y - 5 }, p.org));
            g.appendChild(el('text', { class: 'chart__pt-meta', x: lx, y: mid.y + 10 }, `${p.city} · ${p.lat}°N`));
            g.appendChild(el('text', { class: 'chart__pt-meta', x: lx, y: mid.y + 24 }, formatRange(p.start, p.end)));
        }

        g.appendChild(el('circle', { class: 'chart__dot', cx: mid.x, cy: mid.y, r: 6 }));
        g.appendChild(el('circle', { class: 'chart__point-hit', cx: mid.x, cy: mid.y, r: 22 }));
        pointsG.appendChild(g);
    });
    svg.appendChild(pointsG);

    host.innerHTML = '';
    host.appendChild(svg);

    const points = [...pointsG.children];
    return { svg, line, forecast, points, at: thresholdsFor(line, points), segs, proj, wide };
}

/**
 * Fraction along the drawn path at which each dot sits, so annotations appear
 * exactly as the line reaches them. Path length is not linear in x — the
 * diagonals between postings are longer than they look — so sample rather than
 * assume an even spacing.
 */
function thresholdsFor(line, points) {
    const total = line.getTotalLength();
    if (!total) return points.map((_, i) => (i + 1) / points.length);

    const N = 256;
    const samples = [];
    for (let i = 0; i <= N; i++) {
        const L = (total * i) / N;
        const { x, y } = line.getPointAtLength(L);
        samples.push({ L, x, y });
    }

    return points.map((g) => {
        const dot = g.querySelector('.chart__dot');
        const cx = Number(dot.getAttribute('cx'));
        const cy = Number(dot.getAttribute('cy'));
        let best = 0;
        let bestDist = Infinity;
        for (const s of samples) {
            const d = (s.x - cx) ** 2 + (s.y - cy) ** 2;
            if (d < bestDist) { bestDist = d; best = s.L; }
        }
        return Math.min(1, best / total + 0.015);
    });
}

/* --- detail panel --------------------------------------------------------- */

function openDetail(id) {
    const panel = document.getElementById('chart-detail');
    const p = TRAJECTORY.find((x) => x.id === id);
    if (!p) return;

    const tools = p.tools.length
        ? `<div class="tools">${p.tools.map((x) => `<span class="tool">${x}</span>`).join('')}</div>`
        : '';

    panel.innerHTML = `
        <div class="chart__detail-top">
            <span class="chart__detail-org">${p.org}</span>
            <span class="meta">${formatRange(p.start, p.end)} · ${p.city}, ${p.country} · ${p.lat}°N</span>
        </div>
        <p class="chart__detail-role">${t(`trajectory.roles.${id}.role`)}</p>
        <p class="chart__detail-summary">${t(`trajectory.roles.${id}.summary`)}</p>
        ${tools}`;
    panel.classList.add('is-open');

    document.querySelectorAll('.chart__point').forEach((g) => {
        g.classList.toggle('is-active', g.dataset.id === id);
    });
}

/* --- mount ---------------------------------------------------------------- */

export function mountChart() {
    const host = document.getElementById('chart');
    if (!host) return;

    let view = null;
    let mode = null;
    let played = false;   // the reveal is one-shot; a re-render must not replay it

    const draw = () => {
        const next = window.innerWidth > BREAKPOINT ? 'wide' : 'tall';
        if (next === mode) return;
        mode = next;

        // The <svg> replaces everything after the axis caption.
        let mountPoint = host.querySelector('.chart__mount');
        if (!mountPoint) {
            mountPoint = document.createElement('div');
            mountPoint.className = 'chart__mount';
            host.appendChild(mountPoint);
        }
        view = render(mountPoint, mode);

        view.line.style.strokeDasharray = String(view.line.getTotalLength());

        view.points.forEach((g) => {
            const open = () => openDetail(g.dataset.id);
            g.addEventListener('click', open);
            g.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    open();
                }
            });
            g.addEventListener('focus', open);
        });

        // Re-rendering (a resize across the breakpoint, or a language switch)
        // rebuilds the SVG. If the reveal already ran, show the finished state
        // rather than animating it a second time.
        paint(played || reduceMotion.matches ? 1 : 0);
    };

    /* Apply a progress value 0..1 to the current view. */
    function paint(p) {
        if (!view) return;
        const len = view.line.getTotalLength();
        view.line.style.strokeDashoffset = String(len * (1 - p));
        view.points.forEach((g, i) => {
            g.setAttribute('opacity', p >= view.at[i] ? '1' : '0');
        });
        view.forecast.setAttribute('opacity', p >= 0.985 ? '1' : '0');
    }

    /**
     * The animation runs once, when the figure first comes into view, and then
     * stays finished. It is deliberately not tied to scroll position: scrubbing
     * the line back and forth as you scroll meant you had already scrolled past
     * the chart by the time it completed.
     */
    const DURATION = 2000;
    let raf = null;

    function play() {
        if (played) return;
        played = true;

        if (reduceMotion.matches) { paint(1); return; }

        const start = performance.now();
        const step = (now) => {
            const t = Math.min(1, (now - start) / DURATION);
            // ease-out cubic: quick off the mark, settles into the forecast
            paint(1 - Math.pow(1 - t, 3));
            raf = t < 1 ? requestAnimationFrame(step) : null;
        };
        raf = requestAnimationFrame(step);
    }

    // Fire once the figure is meaningfully on screen. A chart taller than the
    // viewport can never hit a large ratio, so also accept "its top has entered".
    const io = new IntersectionObserver((entries) => {
        for (const e of entries) {
            if (!e.isIntersecting) continue;
            const enough = e.intersectionRatio >= 0.35
                || e.intersectionRect.height >= window.innerHeight * 0.45;
            if (enough) { play(); io.disconnect(); }
        }
    }, { threshold: [0, 0.15, 0.35, 0.6] });
    io.observe(host);

    // A background tab gets no rAF, so a chart that "played" while hidden would
    // finish invisibly. Snap it to its final state when the tab is first shown.
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden && played && !raf) paint(1);
    });

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(draw, 160);
    });

    document.addEventListener('langchange', () => { mode = null; draw(); });

    draw();
}

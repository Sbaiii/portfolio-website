/* =============================================================================
   main.js: boot, theme, i18n, navigation, and the static section renderers.
   ========================================================================== */

import {
    PROFILE, FIGURES, TRAJECTORY, PROJECTS, STACK, EDUCATION, STRINGS, LANGS,
} from '../content.js';
import { mountChart } from './chart.js';
import { mountSession } from './session.js';
import { mountQuery } from './query.js';
import { mountIdCard } from './idcard.js';

/* --- shared helpers (exported for the other modules) --------------------- */

export const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

/** Walk a dotted path through nested objects/arrays. */
export function resolveKey(dict, path) {
    return path.split('.').reduce(
        (acc, part) => (acc === null || acc === undefined ? undefined : acc[part]),
        dict,
    );
}

export let lang = 'en';

/** Translate a dotted key, falling back to English then to the key itself. */
export function t(path) {
    const hit = resolveKey(STRINGS[lang], path);
    if (typeof hit === 'string') return hit;
    const fallback = resolveKey(STRINGS.en, path);
    return typeof fallback === 'string' ? fallback : path;
}

/** Format an ISO "YYYY-MM" as a localised "Mon YYYY". */
export function formatMonth(iso) {
    if (!iso) return t('trajectory.ongoing');
    const [y, m] = iso.split('-').map(Number);
    return new Intl.DateTimeFormat(lang, { month: 'short', year: 'numeric' })
        .format(new Date(y, m - 1, 1))
        .replace('.', '');
}

export function formatRange(start, end) {
    return `${formatMonth(start)} → ${end ? formatMonth(end) : t('trajectory.ongoing')}`;
}

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

/* --- theme --------------------------------------------------------------- */

const systemDark = window.matchMedia('(prefers-color-scheme: dark)');

function currentTheme() {
    return document.documentElement.getAttribute('data-theme')
        || (systemDark.matches ? 'dark' : 'light');
}

function setTheme(theme, persist = true) {
    document.documentElement.setAttribute('data-theme', theme);
    try {
        if (persist) localStorage.setItem('portfolio_theme', theme);
        else localStorage.removeItem('portfolio_theme');
    } catch (e) { /* private mode */ }
}

function initTheme() {
    const toggle = $('#theme-toggle');
    toggle.addEventListener('click', () => {
        const next = currentTheme() === 'dark' ? 'light' : 'dark';
        if (!document.startViewTransition || reduceMotion.matches) {
            setTheme(next);
            return;
        }
        document.startViewTransition(() => setTheme(next));
    });

    // Follow the OS only while the visitor has expressed no preference of their own.
    systemDark.addEventListener('change', (e) => {
        let stored = null;
        try { stored = localStorage.getItem('portfolio_theme'); } catch (err) { /* noop */ }
        if (stored) return;
        setTheme(e.matches ? 'dark' : 'light', false);
    });
}

/* --- i18n ---------------------------------------------------------------- */

const SCRAMBLE = '!<>-_\\/[]{}=+*^?#01';

/** Briefly scramble a string into its new value. Skipped under reduced motion. */
function scrambleTo(el, next) {
    const prev = el.textContent;

    // Correctness first. The final text is written synchronously so it never
    // depends on an animation frame arriving: rAF is suspended in a background
    // tab and can stall in an occluded or busy one, which would otherwise leave
    // the label frozen on the previous language. The scramble is decoration.
    el.textContent = next;

    if (reduceMotion.matches || document.hidden || next.length > 90) return;

    const start = performance.now();
    const dur = 340;
    const len = Math.max(prev.length, next.length);

    // Switching language twice quickly would leave two loops writing to the same
    // node; the later one wins and the earlier must stand down.
    const token = (el._scramble || 0) + 1;
    el._scramble = token;

    function frame(now) {
        if (el._scramble !== token) return;
        const p = Math.min(1, (now - start) / dur);
        let out = '';
        for (let i = 0; i < len; i++) {
            const reveal = i / len < p * 1.35;
            if (reveal) out += next[i] ?? '';
            else if (next[i]) out += SCRAMBLE[(Math.random() * SCRAMBLE.length) | 0];
        }
        el.textContent = out;
        if (p < 1) requestAnimationFrame(frame);
        else el.textContent = next;
    }
    requestAnimationFrame(frame);

    // Backstop: if the frames stop arriving part-way, repair the final value.
    setTimeout(() => {
        if (el._scramble === token && el.textContent !== next) el.textContent = next;
    }, dur + 150);
}

export function applyI18n(root = document, animate = false) {
    $$('[data-i18n]', root).forEach((el) => {
        const value = t(el.getAttribute('data-i18n'));
        if (el.textContent.trim() === value) return;
        if (animate) scrambleTo(el, value);
        else el.textContent = value;
    });
}

let langSwitchCount = 0;
export const stats = { langSwitches: () => langSwitchCount };

export function setLanguage(next, animate = true) {
    if (!LANGS.includes(next)) next = 'en';
    if (next === lang) return;
    lang = next;
    document.documentElement.setAttribute('lang', lang);
    langSwitchCount++;

    $('#lang-code').textContent = resolveKey(STRINGS[lang], 'lang.code');
    $$('#lang-menu button').forEach((b) => {
        b.setAttribute('aria-current', String(b.dataset.lang === lang));
    });

    applyI18n(document, animate);
    // Re-render the parts built from content, so their prose follows too.
    renderFigures();
    renderCases();
    renderStack();
    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
    try { localStorage.setItem('portfolio_lang', lang); } catch (e) { /* noop */ }
}

function initLang() {
    const btn = $('#lang-btn');
    const menu = $('#lang-menu');

    const setOpen = (open) => {
        menu.classList.toggle('is-open', open);
        btn.setAttribute('aria-expanded', String(open));
    };

    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        setOpen(!menu.classList.contains('is-open'));
    });

    $$('button', menu).forEach((b) => {
        b.addEventListener('click', () => {
            setLanguage(b.dataset.lang);
            setOpen(false);
        });
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.lang')) setOpen(false);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menu.classList.contains('is-open')) {
            setOpen(false);
            btn.focus();
        }
    });

    let saved = null;
    try { saved = localStorage.getItem('portfolio_lang'); } catch (e) { /* noop */ }
    if (saved && saved !== 'en') setLanguage(saved, false);
}

/* --- navigation ---------------------------------------------------------- */

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
        // Stop the page scrolling behind the full-screen menu.
        document.documentElement.classList.toggle('nav-open', open);
    };

    btn.addEventListener('click', () => setMenu(!nav.classList.contains('is-open')));
    $$('a', nav).forEach((a) => a.addEventListener('click', () => setMenu(false)));

    // Language pills live inside the menu on phones, where the header dropdown
    // has no room.
    const langPills = $$('#nav-langs button');
    const syncPills = () => langPills.forEach((b) => {
        b.setAttribute('aria-current', String(b.dataset.lang === lang));
    });
    langPills.forEach((b) => b.addEventListener('click', () => {
        setLanguage(b.dataset.lang);
        syncPills();
    }));
    syncPills();
    document.addEventListener('langchange', syncPills);

    // The ⌘K bar is unreachable without a keyboard, so surface it in the menu.
    $('#query-open-mobile')?.addEventListener('click', () => {
        setMenu(false);
        $('#query-open')?.click();
    });

    // A rotation back to desktop must not leave the menu latched open.
    window.addEventListener('resize', () => {
        if (window.innerWidth > 860 && nav.classList.contains('is-open')) setMenu(false);
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && nav.classList.contains('is-open')) {
            setMenu(false);
            btn.focus();
        }
    });

    // Mark the section currently in view.
    const links = $$('a[href^="#"]', nav);
    const spy = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            links.forEach((a) => {
                a.setAttribute('aria-current', String(a.getAttribute('href') === `#${entry.target.id}`));
            });
        });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ['top', 'trajectory', 'work', 'stack', 'session', 'contact']
        .map((id) => document.getElementById(id))
        .filter(Boolean)
        .forEach((el) => spy.observe(el));
}

/* --- live status clock --------------------------------------------------- */

function initStatus() {
    const clocks = $$('.js-clock');
    const fmt = new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit', minute: '2-digit', hour12: false, timeZone: PROFILE.base.tz,
    });
    const tick = () => {
        const text = `· ${PROFILE.base.city} ${PROFILE.base.offset} · ${fmt.format(new Date())}`;
        clocks.forEach((el) => { el.textContent = text; });
    };
    tick();
    setInterval(tick, 30000);
}

/* --- reveal on scroll ---------------------------------------------------- */

export function observeReveals(root = document) {
    const items = $$('.reveal:not(.is-visible)', root);
    if (reduceMotion.matches || !('IntersectionObserver' in window)) {
        items.forEach((el) => el.classList.add('is-visible'));
        return;
    }
    const io = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    items.forEach((el) => io.observe(el));
}

/**
 * Failsafe: anything already on screen must never stay hidden waiting for an
 * observer callback that, for whatever reason, did not arrive.
 */
function revealOnScreen() {
    $$('.reveal:not(.is-visible)').forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight) {
            el.classList.add('is-visible');
        }
    });
}

/* --- headline figures (with count-up) ------------------------------------ */

function countUp(el, to) {
    if (reduceMotion.matches) {
        el.textContent = String(to);
        return;
    }
    const dur = 900;
    const start = performance.now();
    const frame = (now) => {
        const p = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = String(Math.round(to * eased));
        if (p < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
}

function renderFigures() {
    const host = $('#figures');
    host.innerHTML = '';
    FIGURES.forEach((f) => {
        // Render the real number, never a placeholder zero: if the observer never
        // fires the page must still state the correct figure.
        const item = document.createElement('div');
        item.className = 'figures__item reveal';
        item.innerHTML = `
            <span class="figures__value" data-to="${f.value}">${f.value}</span>
            <span class="figures__label">${t(`figures.${f.id}`)}</span>`;
        host.appendChild(item);
    });

    observeReveals(host);
    if (reduceMotion.matches) return;

    const io = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
            const el = entry.target;
            if (entry.isIntersecting) {
                countUp(el, Number(el.dataset.to));
                obs.unobserve(el);
            } else if (!el.dataset.primed) {
                // Off screen, so an intersect event is still coming: safe to zero.
                el.dataset.primed = '1';
                el.textContent = '0';
            }
        });
    }, { threshold: 0.5 });
    $$('.figures__value', host).forEach((el) => io.observe(el));
}

/* --- case studies -------------------------------------------------------- */

function renderCases() {
    const host = $('#cases');
    host.innerHTML = '';

    PROJECTS.forEach((p, i) => {
        const base = `work.projects.${p.id}`;
        const result = t(`${base}.result`);
        const isTodo = result.startsWith('TODO');

        const media = p.image
            ? `<div class="case__media"><img src="${p.image}" alt="" width="640" height="480" loading="lazy" decoding="async"></div>`
            : '<div class="case__media case__media--empty"></div>';

        const tags = p.tags.length
            ? `<div class="case__tags">${p.tags.map((tag) => `<span class="tool">${tag}</span>`).join('')}</div>`
            : '';

        const resultBlock = result
            ? `<div class="case__block">
                   <dt>${t('work.result')}</dt>
                   <dd class="${isTodo ? 'is-todo' : ''}">${isTodo ? t('work.todo') : result}</dd>
               </div>`
            : '';

        const link = p.repo
            ? `<a class="btn btn--ghost" href="${p.repo}" target="_blank" rel="noopener noreferrer">${t('work.view')} ↗</a>`
            : `<span class="tool">${t('work.wip')}</span>`;

        const el = document.createElement('article');
        el.className = 'case reveal';
        el.innerHTML = `
            <div class="fig__label"><span class="meta">${String(i + 1).padStart(2, '0')}</span></div>
            <div class="case__body">
                <div>
                    ${tags}
                    <h3 class="case__title">${t(`${base}.title`)}</h3>
                    <dl>
                        <div class="case__block">
                            <dt>${t('work.problem')}</dt>
                            <dd>${t(`${base}.problem`)}</dd>
                        </div>
                        <div class="case__block">
                            <dt>${t('work.built')}</dt>
                            <dd>${t(`${base}.built`)}</dd>
                        </div>
                        ${resultBlock}
                    </dl>
                    ${link}
                </div>
                ${media}
            </div>`;
        host.appendChild(el);
    });

    observeReveals(host);
}

/* --- the stack ----------------------------------------------------------- */

function renderStack() {
    const grid = $('#stack-grid');
    grid.innerHTML = STACK.map((group) => `
        <div class="stack__group">
            <h3><span>${t(`stack.groups.${group.id}`)}</span><span>n = ${group.items.length}</span></h3>
            <ul class="stack__list">
                ${group.items.map((item) => `<li>${item}</li>`).join('')}
            </ul>
        </div>`).join('');

    $('#stack-aside').innerHTML = `
        <div class="aside-card">
            <h3>${t('stack.education')}</h3>
            <strong>${EDUCATION.degree}</strong>
            <p>${EDUCATION.institutions.join('<br>')}</p>
        </div>
        <div class="aside-card">
            <h3>${t('stack.focus')}</h3>
            <strong>${t('stack.focusText')}</strong>
        </div>`;
}

/* --- crosshair cursor ---------------------------------------------------- */

function initCrosshair() {
    const svg = $('#crosshair');
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches || reduceMotion.matches) {
        svg.remove();
        return;
    }
    svg.innerHTML = `
        <line id="ch-x" x1="0" y1="0" x2="0" y2="0"></line>
        <line id="ch-y" x1="0" y1="0" x2="0" y2="0"></line>
        <text id="ch-t" x="0" y="0"></text>`;
    const vx = $('#ch-x');
    const vy = $('#ch-y');
    const label = $('#ch-t');
    let raf = null;

    window.addEventListener('pointermove', (e) => {
        if (e.pointerType !== 'mouse' || raf) return;
        raf = requestAnimationFrame(() => {
            const { clientX: x, clientY: y } = e;
            const w = window.innerWidth;
            const h = window.innerHeight;
            vx.setAttribute('x1', x); vx.setAttribute('x2', x);
            vx.setAttribute('y1', 0); vx.setAttribute('y2', h);
            vy.setAttribute('y1', y); vy.setAttribute('y2', y);
            vy.setAttribute('x1', 0); vy.setAttribute('x2', w);
            label.setAttribute('x', Math.min(x + 10, w - 76));
            label.setAttribute('y', Math.max(y - 10, 14));
            label.textContent = `${x}, ${y}`;
            raf = null;
        });
    }, { passive: true });
}

/* --- boot ---------------------------------------------------------------- */

function boot() {
    // Enables the reveal-on-scroll hidden state; see `.js .reveal` in style.css.
    document.documentElement.classList.add('js');
    document.getElementById('year').textContent = String(new Date().getFullYear());

    initTheme();
    initLang();
    initNav();
    initStatus();
    initCrosshair();

    renderFigures();
    renderCases();
    renderStack();

    mountChart();
    mountSession();
    mountQuery();
    mountIdCard();

    applyI18n();
    observeReveals();
    window.addEventListener('load', revealOnScreen);
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) revealOnScreen();
    });

    // eslint-disable-next-line no-console
    console.log(
        `%cA Career, Plotted%c\n\nThe y-axis is real latitude: 34.0°N → 3.1°N → 48.9°N.\nNo framework, no tracking, no analytics. Press ⌘K / Ctrl+K to query me.\n\n${PROFILE.links.github}`,
        'font:600 18px/1.4 ui-monospace,monospace;color:#ff4a1c',
        'font:12px/1.6 ui-monospace,monospace;color:#888',
    );
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
} else {
    boot();
}

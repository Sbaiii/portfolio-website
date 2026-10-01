/* =============================================================================
   chrome.js: the parts every page shares.

   Theme, reveal-on-scroll and the text scramble are subtle enough that two
   copies would drift, so they live here and both the home page and the case
   study pages import them. Everything in this file is side-effect free until
   you call it, so importing it never boots a page.
   ========================================================================== */

export const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const systemDark = window.matchMedia('(prefers-color-scheme: dark)');

export const $ = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

/** Walk a dotted path through nested objects/arrays. */
export function resolveKey(dict, path) {
    return path.split('.').reduce(
        (acc, part) => (acc === null || acc === undefined ? undefined : acc[part]),
        dict,
    );
}

/* --- theme ---------------------------------------------------------------- */

export function currentTheme() {
    return document.documentElement.getAttribute('data-theme')
        || (systemDark.matches ? 'dark' : 'light');
}

export function setTheme(theme, persist = true) {
    document.documentElement.setAttribute('data-theme', theme);
    try {
        if (persist) localStorage.setItem('portfolio_theme', theme);
        else localStorage.removeItem('portfolio_theme');
    } catch (e) { /* private mode */ }
}

export function initTheme(selector = '#theme-toggle') {
    const toggle = $(selector);
    if (toggle) {
        toggle.addEventListener('click', () => {
            const next = currentTheme() === 'dark' ? 'light' : 'dark';
            if (!document.startViewTransition || reduceMotion.matches) {
                setTheme(next);
                return;
            }
            document.startViewTransition(() => setTheme(next));
        });
    }

    // Follow the OS only while the visitor has expressed no preference of their own.
    systemDark.addEventListener('change', (e) => {
        let stored = null;
        try { stored = localStorage.getItem('portfolio_theme'); } catch (err) { /* noop */ }
        if (stored) return;
        setTheme(e.matches ? 'dark' : 'light', false);
    });
}

/* --- text scramble -------------------------------------------------------- */

const SCRAMBLE = '!<>-_\\/[]{}=+*^?#01';

/** Briefly scramble a string into its new value. Skipped under reduced motion. */
export function scrambleTo(el, next) {
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

/* --- reveal on scroll ----------------------------------------------------- */

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
    }, { threshold: 0, rootMargin: '0px 0px 25% 0px' });
    items.forEach((el) => io.observe(el));
}

/** Anything already on screen must never wait on a callback that never arrives. */
export function revealOnScreen() {
    $$('.reveal:not(.is-visible)').forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight) {
            el.classList.add('is-visible');
        }
    });
}

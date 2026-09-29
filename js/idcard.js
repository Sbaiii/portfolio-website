/* =============================================================================
   idcard.js: clicking the portrait opens a passport-style data page.

   Every field is drawn from content.js, so the card cannot drift from the rest
   of the site. The machine-readable strip at the bottom is decorative, but it
   is encoded from real values only: no invented nationality, number or issuer.
   ========================================================================== */

import { PROFILE, EDUCATION, TRAJECTORY } from '../content.js';
import { t } from './main.js';

const MRZ_WIDTH = 44;

/** Passport-style: uppercase, spaces become `<`, padded to a fixed width. */
const mrz = (parts) => parts
    .join('<<')
    .toUpperCase()
    .replace(/[^A-Z0-9<+]+/g, '<')
    .slice(0, MRZ_WIDTH)
    .padEnd(MRZ_WIDTH, '<');

/** The strip is almost entirely `<`, which innerHTML would read as markup. */
const escapeHtml = (s) => s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));

function latitudeRange() {
    const lats = TRAJECTORY.map((p) => p.lat);
    return { lo: Math.min(...lats), hi: Math.max(...lats) };
}

function render(panel) {
    const { lo, hi } = latitudeRange();
    const pad = (n) => String(Math.round(n * 100)).padStart(4, '0');
    const issued = new Intl.DateTimeFormat('en-GB', {
        day: '2-digit', month: 'short', year: 'numeric',
    }).format(new Date()).toUpperCase();

    const field = (label, value) => `
        <div class="idcard__field">
            <dt>${label}</dt>
            <dd>${value}</dd>
        </div>`;

    panel.innerHTML = `
        <div class="idcard__head">
            <span class="idcard__doc">${t('idcard.doc')}</span>
            <button class="idcard__close" id="idcard-close" aria-label="${t('idcard.close')}">
                ${t('idcard.close')} <span aria-hidden="true">✕</span>
            </button>
        </div>

        <div class="idcard__body">
            <div class="idcard__photo">
                <picture>
                    <source srcset="./assets/portrait.webp" type="image/webp">
                    <img src="./assets/portrait.jpg" alt="" width="192" height="192" decoding="async">
                </picture>
                <span class="idcard__issued">${t('idcard.issued')} ${issued}</span>
            </div>

            <dl class="idcard__fields">
                ${field(t('idcard.surname'), 'SBAI ATTA ALLAH')}
                ${field(t('idcard.given'), 'ABDELLAH')}
                ${field(t('idcard.role'), t('masthead.role'))}
                ${field(t('idcard.status'), t('masthead.status'))}
                ${field(t('idcard.based'), `${PROFILE.base.city} · ${PROFILE.base.offset}`)}
                ${field(t('idcard.languages'), 'English · Français · Español')}
                ${field(t('idcard.degree'), EDUCATION.degree)}
                ${field(t('idcard.awarded'), EDUCATION.institutions.join('<br>'))}
                ${field(t('idcard.range'), `${lo.toFixed(2)}°N → ${hi.toFixed(2)}°N`)}
            </dl>
        </div>

        <div class="idcard__actions">
            <a class="btn btn--primary" href="${PROFILE.cv}" download>${t('masthead.cv')}</a>
            <a class="btn btn--ghost" href="mailto:${PROFILE.email}">${PROFILE.email}</a>
            <a class="btn btn--ghost" href="${PROFILE.links.github}" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
            <a class="btn btn--ghost" href="${PROFILE.links.linkedin}" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
        </div>

        <pre class="idcard__mrz" aria-hidden="true">${escapeHtml([
            mrz(['PID', 'SBAI ATTA ALLAH', 'ABDELLAH']),
            mrz(['ROLE', 'DATA ANALYST', 'SOFTWARE DEVELOPER']),
            mrz(['BASE ' + PROFILE.base.city, 'EN FR ES', `LAT ${pad(lo)}N ${pad(hi)}N`]),
        ].join('\n'))}</pre>
        <p class="idcard__hint">${t('idcard.hint')}</p>`;
}

export function mountIdCard() {
    const openBtn = document.getElementById('idcard-open');
    const overlay = document.getElementById('idcard');
    const panel = document.getElementById('idcard-panel');
    if (!openBtn || !overlay || !panel) return;

    let lastFocus = null;

    const setLabel = () => openBtn.setAttribute('aria-label', t('idcard.open'));

    const open = () => {
        lastFocus = document.activeElement;
        render(panel);
        overlay.hidden = false;
        overlay.classList.add('is-open');
        document.getElementById('idcard-close')?.focus();
    };

    const close = () => {
        overlay.classList.remove('is-open');
        overlay.hidden = true;
        if (lastFocus) lastFocus.focus();
    };

    openBtn.addEventListener('click', open);

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay || e.target.closest('#idcard-close')) close();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('is-open')) close();
    });

    // Keep tabbing inside the card while it is open.
    overlay.addEventListener('keydown', (e) => {
        if (e.key !== 'Tab') return;
        const items = [...overlay.querySelectorAll('a[href], button')].filter((el) => el.offsetParent !== null);
        if (!items.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });

    document.addEventListener('langchange', () => {
        setLabel();
        if (overlay.classList.contains('is-open')) render(panel);
    });

    setLabel();
}

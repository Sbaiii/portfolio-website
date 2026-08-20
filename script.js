document.addEventListener('DOMContentLoaded', () => {
    /* =========================================
       THEME TOGGLE & SYSTEM PREFERENCE
       ========================================= */
    const themeToggle = document.getElementById('theme-toggle');
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    function setTheme(theme, save = true) {
        document.documentElement.setAttribute('data-theme', theme);
        if (save) {
            localStorage.setItem('portfolio_theme', theme);
        } else {
            localStorage.removeItem('portfolio_theme');
        }
    }

    // The inline <head> script already applied the theme before first paint,
    // so there is nothing to initialize here.

    // Manual Toggle
    themeToggle.addEventListener('click', (e) => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        // Skip the circular wipe when the API is unavailable or the user asked for less motion
        if (!document.startViewTransition || reduceMotion.matches) {
            setTheme(newTheme);
            return;
        }

        // Get the click position, or use center of button as fallback
        const x = e.clientX ?? (themeToggle.getBoundingClientRect().left + themeToggle.offsetWidth / 2);
        const y = e.clientY ?? (themeToggle.getBoundingClientRect().top + themeToggle.offsetHeight / 2);

        // Set custom variables for the transition origin
        document.documentElement.style.setProperty('--x', `${x}px`);
        document.documentElement.style.setProperty('--y', `${y}px`);
        document.documentElement.setAttribute('data-transition', 'theme');

        const transition = document.startViewTransition(() => {
            setTheme(newTheme);
        });

        // Clean up after transition
        transition.finished.finally(() => {
            document.documentElement.removeAttribute('data-transition');
        });
    });

    // Listen for System Theme Changes
    mediaQuery.addEventListener('change', (e) => {
        // Only follow the device while the visitor has no explicit preference of
        // their own. A manual pick stays put until they toggle it back.
        if (localStorage.getItem('portfolio_theme')) return;
        setTheme(e.matches ? 'dark' : 'light', false);
    });

    /* =========================================
       SCROLL EFFECTS AND MOBILE MENU
       ========================================= */
    const header = document.querySelector('.header');
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    // Coalesce scroll handling into one class flip per frame
    let scrollQueued = false;
    window.addEventListener('scroll', () => {
        if (scrollQueued) return;
        scrollQueued = true;
        requestAnimationFrame(() => {
            header.classList.toggle('scrolled', window.scrollY > 50);
            scrollQueued = false;
        });
    }, { passive: true });

    function setMenu(open) {
        navLinks.classList.toggle('active', open);
        mobileBtn.classList.toggle('active', open);
        mobileBtn.setAttribute('aria-expanded', String(open));
        mobileBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }

    mobileBtn.addEventListener('click', () => {
        setMenu(!navLinks.classList.contains('active'));
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => setMenu(false));
    });

    // Escape closes the menu and returns focus to the button
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            setMenu(false);
            mobileBtn.focus();
        }
    });

    /* =========================================
       REVEAL ON SCROLL
       ========================================= */
    // Honour the OS "reduce motion" setting: everything just stays visible.
    if (!reduceMotion.matches) {
        const sections = document.querySelectorAll('.section-title, .about-grid, .skills-grid, .project-card');

        sections.forEach(sec => sec.classList.add('reveal'));

        const revealOnScroll = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        sections.forEach(sec => revealOnScroll.observe(sec));
    }
});

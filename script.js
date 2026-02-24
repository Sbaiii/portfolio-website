document.addEventListener('DOMContentLoaded', () => {
    /* =========================================
       CUSTOM CURSOR
       ========================================= */
    const cursorDot = document.querySelector('[data-cursor-dot]');
    const cursorOutline = document.querySelector('[data-cursor-outline]');

    // Check if device supports hover
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

    if (!isTouchDevice && cursorDot && cursorOutline) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            // Instantly move dot
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // Smoothly animate outline
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: 'forwards' });
        });

        // Hover effects for anchors and buttons
        const interactables = document.querySelectorAll('a, button, input, .lang-selector');
        interactables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorOutline.style.backgroundColor = 'rgba(128, 128, 128, 0.2)';
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorOutline.style.backgroundColor = 'transparent';
            });
        });
    }

    /* =========================================
       THEME TOGGLE & SYSTEM PREFERENCE
       ========================================= */
    const themeToggle = document.getElementById('theme-toggle');
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    function setTheme(theme, save = true) {
        document.documentElement.setAttribute('data-theme', theme);
        if (save) {
            localStorage.setItem('portfolio_theme', theme);
        } else {
            localStorage.removeItem('portfolio_theme');
        }
    }

    // Initialization
    const storedTheme = localStorage.getItem('portfolio_theme');
    if (storedTheme) {
        setTheme(storedTheme);
    } else {
        // Follow system preference
        setTheme(mediaQuery.matches ? 'dark' : 'light', false);
    }

    // Manual Toggle
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);

        // Brief pulse effect on cursor
        if (!isTouchDevice && cursorOutline) {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(2)';
            setTimeout(() => {
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
            }, 150);
        }
    });

    // Listen for System Theme Changes
    mediaQuery.addEventListener('change', (e) => {
        // When system theme changes, we automatically follow it 
        // and clear any manual override to stay in sync with the device
        const newSystemTheme = e.matches ? 'dark' : 'light';
        setTheme(newSystemTheme, false);
    });

    /* =========================================
       SCROLL EFFECTS AND MOBILE MENU
       ========================================= */
    const header = document.querySelector('.header');
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileBtn.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileBtn.classList.remove('active');
        });
    });

    // Simple reveal animation on scroll using Intersection Observer
    const sections = document.querySelectorAll('.section-title, .about-grid, .skills-grid, .project-card');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    // Give elements initial hidden state
    sections.forEach(sec => {
        sec.style.opacity = '0';
        sec.style.transform = 'translateY(20px)';
        sec.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(sec => revealOnScroll.observe(sec));
});

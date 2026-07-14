document.addEventListener('DOMContentLoaded', () => {
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
    themeToggle.addEventListener('click', (e) => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        // Check for View Transition API support
        if (!document.startViewTransition) {
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

    // Check if we have a hash in the URL to skip hiding that section
    const currentHash = window.location.hash;

    // Give elements initial hidden state
    sections.forEach(sec => {
        // Find the parent section to check if it matches the hash
        const parentSection = sec.closest('section');
        const isCurrentTarget = currentHash && parentSection && `#${parentSection.id}` === currentHash;

        if (isCurrentTarget) {
            // If this is the section the user is refreshing into, show it immediately
            sec.style.opacity = '1';
            sec.style.transform = 'translateY(0)';
        } else {
            sec.style.opacity = '0';
            sec.style.transform = 'translateY(20px)';
        }
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

    // Rescue scroll: If the browser was interrupted by layout shifts, re-scroll to the hash
    if (currentHash) {
        setTimeout(() => {
            const target = document.querySelector(currentHash);
            if (target) {
                target.scrollIntoView({ behavior: 'auto' });
            }
        }, 100);
    }
});

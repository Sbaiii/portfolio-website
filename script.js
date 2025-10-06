function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  const body = document.body;
  
  menu.classList.toggle("open");
  icon.classList.toggle("open");
  
  // Prevent body scroll when menu is open
  if (menu.classList.contains("open")) {
    body.classList.add("menu-open");
  } else {
    body.classList.remove("menu-open");
  }
}

// Enhanced language change function for mobile
function changeLanguage(lang) {
  // Update all elements with data attributes
  const elements = document.querySelectorAll('[data-en][data-fr][data-es]');
  elements.forEach(element => {
    const text = element.getAttribute(`data-${lang}`);
    if (text) {
      element.textContent = text;
    }
  });

  // Also update any elements using translation keys (mobile support)
  if (typeof loadLanguage === 'function') {
    loadLanguage(lang);
  }
  try { localStorage.setItem('preferred-language', lang); } catch (e) {}
  
  // Update mobile language selector active state
  const mobileOptions = document.querySelectorAll('.mobile-language-selector .language-option');
  mobileOptions.forEach(option => {
    option.classList.remove('active');
  });
  
  // Add active class to selected language
  const selectedOption = Array.from(mobileOptions).find(option => 
    option.textContent.includes(lang.toUpperCase())
  );
  if (selectedOption) {
    selectedOption.classList.add('active');
  }
  
  // Close mobile menu after language selection
  toggleMenu();
}

// Close menu when clicking outside
document.addEventListener('click', function(event) {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  
  if (menu.classList.contains("open") && 
      !menu.contains(event.target) && 
      !icon.contains(event.target)) {
    toggleMenu();
  }
});

// Close menu on escape key
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    const menu = document.querySelector(".menu-links");
    if (menu.classList.contains("open")) {
      toggleMenu();
    }
  }
});

// Initialize mobile language selector on page load
document.addEventListener('DOMContentLoaded', function() {
  // Set English as default active language in mobile menu
  const mobileOptions = document.querySelectorAll('.mobile-language-selector .language-option');
  mobileOptions.forEach(option => {
    if (option.textContent.includes('EN')) {
      option.classList.add('active');
    }
  });
  
  // Initialize scroll animations
  initializeScrollAnimations();
  
  // Initialize timeline center animations for mobile/tablet (hamburger breakpoint)
  initializeTimelineCenterAnimations();
  
  // Re-initialize on window resize to handle screen size changes
  window.addEventListener('resize', function() {
    // Update active item on any resize (works for desktop and mobile)
    if (typeof window.updateActiveTimelineItem === 'function') {
      window.updateActiveTimelineItem();
    }
  });
});

// Scroll-triggered fade-in animations
function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add a slight delay for staggered effect
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, 100);
      } else {
        // Remove visible class when scrolling back up for re-animation
        entry.target.classList.remove('visible');
      }
    });
  }, observerOptions);

  // Observe all fade-in elements
  const fadeElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .fade-in-up, .fade-in-down');
  fadeElements.forEach(element => {
    observer.observe(element);
  });
}

// Timeline center animations - animate when timeline items are at viewport center (all breakpoints)
function initializeTimelineCenterAnimations() {

  // Throttled scroll handler to set only the item closest to center as active
  let ticking = false;

  function getClosestItemToCenter(items) {
    const viewportCenter = window.innerHeight / 2;
    let closest = null;
    let closestDist = Infinity;

    items.forEach(item => {
      const rect = item.getBoundingClientRect();
      // Consider only items at least partially visible
      if (rect.bottom > 0 && rect.top < window.innerHeight) {
        const elementCenter = rect.top + rect.height / 2;
        const dist = Math.abs(elementCenter - viewportCenter);
        if (dist < closestDist) {
          closest = item;
          closestDist = dist;
        }
      }
    });
    return closest;
  }

  window.updateActiveTimelineItem = function updateActiveTimelineItem() {
    const items = Array.from(document.querySelectorAll('.timeline-item'));
    if (items.length === 0) return;
    const active = getClosestItemToCenter(items);
    items.forEach(item => {
      const content = item.querySelector('.timeline-content');
      const marker = item.querySelector('.timeline-marker');
      if (!content) return;
      if (item === active) {
        content.classList.add('center-animated');
        if (marker) marker.classList.add('center-animated');
      } else {
        content.classList.remove('center-animated');
        if (marker) marker.classList.remove('center-animated');
      }
    });
  };

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      window.updateActiveTimelineItem();
      ticking = false;
    });
  }

  // Initial set and listeners
  window.updateActiveTimelineItem();
  window.addEventListener('scroll', onScroll, { passive: true });
  document.addEventListener('scroll', onScroll, { passive: true });
  // Mobile-specific: ensure recalculation on orientation and page restore
  window.addEventListener('orientationchange', () => setTimeout(window.updateActiveTimelineItem, 300));
  window.addEventListener('pageshow', () => setTimeout(window.updateActiveTimelineItem, 0));
  window.addEventListener('load', () => setTimeout(window.updateActiveTimelineItem, 0));
  document.addEventListener('touchmove', onScroll, { passive: true });
}

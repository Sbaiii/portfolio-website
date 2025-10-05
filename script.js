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
  initScrollAnimations();
});

// Scroll Animation Functions
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.scroll-animate, .scroll-title, .scroll-box, .scroll-profile');
  
  // Create intersection observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        
        // Add complete class after animation for titles
        if (entry.target.classList.contains('scroll-title')) {
          setTimeout(() => {
            entry.target.classList.add('animate-complete');
          }, 800);
        }
        
        // Add complete class after animation for boxes
        if (entry.target.classList.contains('scroll-box')) {
          setTimeout(() => {
            entry.target.classList.add('animate-complete');
          }, 700);
        }
        
        // Add complete class after animation for profile
        if (entry.target.classList.contains('scroll-profile')) {
          setTimeout(() => {
            entry.target.classList.add('animate-complete');
          }, 800);
        }
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  // Observe all animated elements
  animatedElements.forEach(element => {
    observer.observe(element);
  });
}

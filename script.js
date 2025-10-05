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
});

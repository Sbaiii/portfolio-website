// Language Switcher JavaScript
let currentLanguage = 'en';

// Language data
const translations = {
  en: {
    // Navigation
    'nav-about': 'About',
    'nav-technical': 'Technical Proficiencies',
    'nav-experience': 'Experience',
    'nav-projects': 'Projects',
    'nav-contact': 'Contact',

    // Profile Section
    'profile-greeting': 'Hello, I\'m',
    'profile-title': 'Data Analytics Student',
    'btn-download': 'Download Resume',
    'btn-contact': 'Contact Info',

    // About Section
    'about-subtitle': 'Get To Know More',
    'about-title': 'About Me',
    'about-experience': 'Experience',
    'about-experience-text': '2+ years<br />Frontend Development',
    'about-education': 'Education',
    'about-education-text': 'B.Sc. Bachelors Degree<br />M.Sc. Masters Degree',
    'about-description': 'I\'m a Computer Science student specializing in Data Analytics with a strong interest in turning data into meaningful insights. I enjoy working with Python, SQL, and visualization tools to solve problems and present information clearly. Through academic projects, I\'ve built dashboards, databases, and analytical models that strengthened my technical skills and attention to detail. I\'m currently seeking internship opportunities where I can contribute, learn from real-world challenges, and grow into a well-rounded data professional.',

    // Technical Proficiencies Section
    'tech-subtitle': 'Explore My',
    'tech-title': 'Technical Proficiencies',
    'tech-programming': 'Programming Languages',
    'tech-data': 'Data Analytics & Visualization',
    'tech-databases': 'Databases & Query Languages',
    'tech-web': 'Web & Front-End Basics',
    'tech-tools': 'Tools & Environments',

    // Experience Section
    'exp-subtitle': 'Explore My',
    'exp-title': 'Experience',

    // Projects Section
    'projects-subtitle': 'Browse My Recent',
    'projects-title': 'Projects',
    'projects-github': 'Github',
    'projects-demo': 'Live Demo',

    // Contact Section
    'contact-subtitle': 'Get in Touch',
    'contact-title': 'Contact Me',

    // Footer
    'footer-copyright': 'Copyright © 2025 Abdellah Sbai. All Rights Reserved.'
  },

  fr: {
    // Navigation
    'nav-about': 'À propos',
    'nav-technical': 'Compétences Techniques',
    'nav-experience': 'Expérience',
    'nav-projects': 'Projets',
    'nav-contact': 'Contact',

    // Profile Section
    'profile-greeting': 'Bonjour, je suis',
    'profile-title': 'Étudiant en Analyse de Données',
    'btn-download': 'Télécharger le CV',
    'btn-contact': 'Informations de Contact',

    // About Section
    'about-subtitle': 'Apprenez à me connaître',
    'about-title': 'À propos de moi',
    'about-experience': 'Expérience',
    'about-experience-text': '2+ années<br />Développement Frontend',
    'about-education': 'Éducation',
    'about-education-text': 'Licence B.Sc.<br />Master M.Sc.',
    'about-description': 'Je suis étudiant en Informatique spécialisé en Analyse de Données avec un fort intérêt pour transformer les données en informations significatives. J\'aime travailler avec Python, SQL et les outils de visualisation pour résoudre des problèmes et présenter les informations clairement. Grâce à des projets académiques, j\'ai créé des tableaux de bord, des bases de données et des modèles analytiques qui ont renforcé mes compétences techniques et mon attention aux détails. Je recherche actuellement des opportunités de stage où je peux contribuer, apprendre des défis du monde réel et devenir un professionnel des données complet.',

    // Technical Proficiencies Section
    'tech-subtitle': 'Explorez mes',
    'tech-title': 'Compétences Techniques',
    'tech-programming': 'Langages de Programmation',
    'tech-data': 'Analyse de Données & Visualisation',
    'tech-databases': 'Bases de Données & Langages de Requête',
    'tech-web': 'Web & Bases Front-End',
    'tech-tools': 'Outils & Environnements',

    // Experience Section
    'exp-subtitle': 'Explorez mon',
    'exp-title': 'Expérience',

    // Projects Section
    'projects-subtitle': 'Parcourez mes récents',
    'projects-title': 'Projets',
    'projects-github': 'Github',
    'projects-demo': 'Démo Live',

    // Contact Section
    'contact-subtitle': 'Entrer en contact',
    'contact-title': 'Contactez-moi',

    // Footer
    'footer-copyright': 'Copyright © 2025 Abdellah Sbai. Tous droits réservés.'
  },

  es: {
    // Navigation
    'nav-about': 'Acerca de',
    'nav-technical': 'Competencias Técnicas',
    'nav-experience': 'Experiencia',
    'nav-projects': 'Proyectos',
    'nav-contact': 'Contacto',

    // Profile Section
    'profile-greeting': 'Hola, soy',
    'profile-title': 'Estudiante de Análisis de Datos',
    'btn-download': 'Descargar Currículum',
    'btn-contact': 'Información de Contacto',

    // About Section
    'about-subtitle': 'Conoce más sobre mí',
    'about-title': 'Acerca de mí',
    'about-experience': 'Experiencia',
    'about-experience-text': '2+ años<br />Desarrollo Frontend',
    'about-education': 'Educación',
    'about-education-text': 'Licenciatura B.Sc.<br />Maestría M.Sc.',
    'about-description': 'Soy estudiante de Ciencias de la Computación especializado en Análisis de Datos con un fuerte interés en convertir datos en información significativa. Disfruto trabajando con Python, SQL y herramientas de visualización para resolver problemas y presentar información de manera clara. A través de proyectos académicos, he construido tableros de control, bases de datos y modelos analíticos que fortalecieron mis habilidades técnicas y atención al detalle. Actualmente busco oportunidades de prácticas donde pueda contribuir, aprender de desafíos del mundo real y crecer como un profesional de datos completo.',

    // Technical Proficiencies Section
    'tech-subtitle': 'Explora mis',
    'tech-title': 'Competencias Técnicas',
    'tech-programming': 'Lenguajes de Programación',
    'tech-data': 'Análisis de Datos & Visualización',
    'tech-databases': 'Bases de Datos & Lenguajes de Consulta',
    'tech-web': 'Web & Fundamentos Front-End',
    'tech-tools': 'Herramientas & Entornos',

    // Experience Section
    'exp-subtitle': 'Explora mi',
    'exp-title': 'Experiencia',

    // Projects Section
    'projects-subtitle': 'Explora mis recientes',
    'projects-title': 'Proyectos',
    'projects-github': 'Github',
    'projects-demo': 'Demo en Vivo',

    // Contact Section
    'contact-subtitle': 'Ponerse en contacto',
    'contact-title': 'Contáctame',

    // Footer
    'footer-copyright': 'Copyright © 2025 Abdellah Sbai. Todos los derechos reservados.'
  }
};

// Language codes mapping
const languageCodes = {
  'en': 'EN',
  'fr': 'FR',
  'es': 'ES'
};

// Initialize language switcher
document.addEventListener('DOMContentLoaded', function () {
  initializeLanguageSwitcher();
  loadLanguage(currentLanguage);
});

function initializeLanguageSwitcher() {
  // Desktop language switcher only
  const desktopOptions = document.querySelectorAll('.language-option');

  // Add event listeners for desktop
  desktopOptions.forEach(option => {
    option.addEventListener('click', function () {
      const lang = this.getAttribute('data-lang');
      switchLanguage(lang);
    });
  });
}

function switchLanguage(lang) {
  currentLanguage = lang;
  loadLanguage(lang);

  // Update desktop language button only
  const desktopBtn = document.getElementById('current-lang');
  if (desktopBtn) {
    // Preserve the chevron
    desktopBtn.innerHTML = `${languageCodes[lang]} <span class="chevron"></span>`;
  }

  // Update active state in desktop menu
  const desktopOptions = document.querySelectorAll('.language-menu .language-option');
  desktopOptions.forEach(opt => {
    if (opt.getAttribute('data-lang') === lang) {
      opt.classList.add('active');
    } else {
      opt.classList.remove('active');
    }
  });

  // Store language preference
  localStorage.setItem('preferred-language', lang);
}

function loadLanguage(lang) {
  // Update ALL elements with data attributes (this handles everything now!)
  const elementsWithData = document.querySelectorAll('[data-en]');
  elementsWithData.forEach(element => {
    const translation = element.getAttribute(`data-${lang}`);
    if (translation) {
      element.textContent = translation;
    }
  });

  // Update elements with data-translate attributes
  const elementsWithTranslate = document.querySelectorAll('[data-translate]');
  elementsWithTranslate.forEach(element => {
    const translateKey = element.getAttribute('data-translate');
    if (translations[lang] && translations[lang][translateKey]) {
      element.textContent = translations[lang][translateKey];
    }
  });
}

function updateElementText(selector, text) {
  const element = document.querySelector(`[data-translate="${selector}"]`);
  if (element) {
    element.textContent = text;
  }
}

function updateButtonText(selector, text) {
  const element = document.querySelector(`[data-translate="${selector}"]`);
  if (element) {
    element.textContent = text;
  }
}

// Load saved language preference
window.addEventListener('load', function () {
  const savedLanguage = localStorage.getItem('preferred-language');
  if (savedLanguage && ['en', 'fr', 'es'].includes(savedLanguage)) {
    currentLanguage = savedLanguage;
    loadLanguage(savedLanguage);

    const desktopBtn = document.getElementById('current-lang');

    if (desktopBtn) desktopBtn.textContent = languageCodes[savedLanguage];
  }
});

/* =============================================================================
   content.js: everything you will ever need to edit lives in this file.

   Two kinds of thing live here, kept deliberately apart:

     1. DATA    = facts that are the same in every language.
                  Dates, latitudes, URLs, tool names. Edit once.
     2. STRINGS = prose, translated into en / fr / es.

   Anything marked TODO: is a placeholder waiting on real content.
   ========================================================================== */

export const PROFILE = {
  name: 'Abdellah Sbai Atta Allah',
  short: 'Abdellah Sbai',
  email: 'abdellahsbaisbai@gmail.com',
  cv: './assets/resume.pdf',
  // Drives the live status clock in the masthead.
  base: { city: 'Kuala Lumpur', tz: 'Asia/Kuala_Lumpur', offset: 'GMT+8' },
  links: {
    github: 'https://github.com/Sbaiii',
    linkedin: 'https://www.linkedin.com/in/sbaiii/',
    kaggle: 'https://www.kaggle.com/sbaiiiiii',
  },
};

/* The headline figures. All verifiable from the timeline below. */
export const FIGURES = [
  { id: 'internships', value: 4 },
  { id: 'spoken', value: 3 },
  { id: 'languages', value: 7 },
];

/* -----------------------------------------------------------------------------
   THE TRAJECTORY
   The y-axis is latitude in degrees north. These are real coordinates,
   that is the whole point, so do not fudge them.
   `type` is 'work' or 'study'; 'study' renders as a hollow point.
-------------------------------------------------------------------------------*/
export const TRAJECTORY = [
  {
    id: 'axa',
    type: 'work',
    org: 'AXA Assurance',
    city: 'Rabat',
    country: 'Morocco',
    cc: 'MA',
    lat: 34.02,
    start: '2022-06',
    end: '2022-09',
    tools: ['Power BI', 'Excel', 'SQL'],
  },
  {
    id: 'bp',
    type: 'work',
    org: 'BP Malaysia',
    city: 'Kuala Lumpur',
    country: 'Malaysia',
    cc: 'MY',
    lat: 3.14,
    start: '2023-06',
    end: '2023-11',
    tools: ['Python', 'SQL', 'Power BI'],
  },
  {
    id: 'audensiel',
    type: 'work',
    org: 'Audensiel',
    city: 'Île-de-France',
    country: 'France',
    cc: 'FR',
    lat: 48.86,
    start: '2024-09',
    end: '2025-02',
    tools: ['Python', 'R', 'Power BI', 'SQL'],
  },
  {
    id: 'mss',
    type: 'work',
    org: 'MSS CONSEIL',
    city: 'Île-de-France',
    country: 'France',
    cc: 'FR',
    lat: 48.86,
    start: '2026-01',
    end: '2026-04',
    tools: ['Python', 'SQL', 'Power BI'],
  },
  {
    id: 'apu',
    type: 'study',
    org: 'Asia Pacific University',
    city: 'Kuala Lumpur',
    country: 'Malaysia',
    cc: 'MY',
    lat: 3.14,
    start: '2026-09',
    end: null, // ongoing
    tools: [],
  },
];

/* Where the dashed forecast ends. The band spans the full latitude range
   on purpose: he moves a lot and is open to roles anywhere. */
export const FORECAST = { until: '2028-01', latLow: 0, latHigh: 56 };

/* -----------------------------------------------------------------------------
   PROJECTS
   `metrics` is intentionally empty until real numbers exist. The UI renders a
   visible TODO rather than inventing a result.
-------------------------------------------------------------------------------*/
export const PROJECTS = [
  {
    id: 'carResale',
    repo: 'https://github.com/Sbaiii/car-resale-price-analysis',
    tags: ['SAS', 'SQL', 'EDA'],
    image: './assets/project-1.png', // TODO: replace with a real chart/screenshot
    metrics: [], // TODO: add real results, e.g. { value: '…', label: '…' }
    status: 'live',
  },
  {
    id: 'purchaseOrder',
    repo: 'https://github.com/Sbaiii/Automated_purchase_Order_Management_System',
    tags: ['Java', 'OOP', 'Swing'],
    image: './assets/project-2.png', // TODO: replace with a real UI screenshot
    metrics: [], // TODO: add real results
    status: 'live',
  },
  {
    id: 'upcoming',
    repo: null,
    tags: [],
    image: null,
    metrics: [],
    status: 'wip',
  },
];

/* -----------------------------------------------------------------------------
   THE STACK: grouped by what the tool is for, not by logo availability.
-------------------------------------------------------------------------------*/
export const STACK = [
  { id: 'code', items: ['Python', 'C', 'C++', 'C#', 'Java', 'R', 'JavaScript'] },
  { id: 'data', items: ['Pandas', 'Seaborn', 'Matplotlib', 'Excel', 'Tableau', 'Power BI'] },
  { id: 'db', items: ['MySQL', 'PostgreSQL', 'SQLite', 'SQL Server'] },
  { id: 'web', items: ['HTML', 'CSS', 'JavaScript'] },
];

export const EDUCATION = {
  degree: 'BSc (Hons) Computer Science (Data Analytics)',
  institutions: [
    'Asia Pacific University (APU), Malaysia',
    'De Montfort University (DMU), United Kingdom',
  ],
};

/* -----------------------------------------------------------------------------
   STRINGS: prose only. Keys are dotted paths used by data-i18n in the HTML
   and by t() in js/main.js.
-------------------------------------------------------------------------------*/
export const STRINGS = {
  en: {
    lang: { name: 'English', code: 'EN' },
    nav: {
      trajectory: 'Trajectory',
      work: 'Case studies',
      stack: 'Stack',
      session: 'Your session',
      contact: 'Contact',
      skip: 'Skip to the facts',
      menu: 'Menu',
    },
    masthead: {
      fig: 'fig. 00',
      role: 'Data analyst & software developer',
      tagline: 'I don’t stop at insights. I build the thing that uses them.',
      sub: 'Analytics that ships, not analytics that sits in a report.',
      status: 'Final year',
      statusFull: 'Final year · BSc (Hons) Computer Science (Data Analytics)',
      cv: 'export → cv.pdf',
      contact: 'Get in touch',
      scroll: 'Scroll to plot',
    },
    figures: {
      internships: 'Internships',
      countries: 'Countries',
      spoken: 'Spoken languages',
      languages: 'Programming languages',
    },
    trajectory: {
      fig: 'fig. 01',
      title: 'The Trajectory',
      standfirst:
        'Four internships, three countries, one dual degree, plotted on the only axis I can prove.',
      axis: 'y = latitude °N · x = time · n = 5 · source: real life',
      footnote:
        'The y-axis is real latitude. I’m not going to plot “impact” on a chart and call myself a data analyst.',
      forecast: 'forecast: open to graduate roles',
      forecastNote:
        'The confidence band is wide because I move a lot. Anywhere on it works.',
      hint: 'Select a point for detail',
      close: 'Close',
      ongoing: 'ongoing',
      tools: 'Tools',
      roles: {
        axa: {
          role: 'Data Analyst Intern',
          summary:
            'Optimised data integrity through rigorous validation of customer datasets. Designed automated KPI dashboards in Power BI and Excel, and streamlined reporting by tuning slow SQL queries.',
        },
        bp: {
          role: 'Data & AI Intern',
          summary:
            'Translated business requirements into actionable KPIs. Built end-to-end ML pipelines (ETL and feature engineering) in Python and SQL, delivering Power BI analytics to monitor performance trends.',
        },
        audensiel: {
          role: 'Data Analyst Intern',
          summary:
            'Constructed optimised reporting datasets by consolidating multiple sources. Engineered statistical models in Python and R to support strategic decisions, and built interactive Power BI and SQL dashboards for stakeholder self-service.',
        },
        mss: {
          role: 'Data & CRM Intern',
          summary:
            'Architected CRM web app features including advanced filtering and search, backed by structured SQL databases. Developed automated reporting pipelines in Python and SQL, plus Power BI dashboards for operational decisions.',
        },
        apu: {
          role: 'Final year, BSc (Hons) Computer Science (Data Analytics)',
          summary:
            'Dual award with De Montfort University, UK. Currently focused on deep learning and SQL optimisation.',
        },
      },
    },
    work: {
      fig: 'fig. 02',
      title: 'Case Studies',
      standfirst: 'Two shipped, one in progress.',
      problem: 'Problem',
      built: 'What I built',
      result: 'Result',
      view: 'View on GitHub',
      todo: 'Results pending. Real numbers going in here.',
      wip: 'In progress',
      projects: {
        carResale: {
          title: 'Car Resale Price Analysis',
          problem:
            'Resale prices in the dataset were noisy and inconsistently recorded, making it hard to see which factors actually drove depreciation.',
          built:
            'Exploratory data analysis and a full preprocessing pipeline in SAS Studio and SQL: cleaning, outlier handling and feature exploration to isolate the real depreciation signals.',
          result: 'TODO: add the concrete result. What did the analysis show, and what changed because of it?',
        },
        purchaseOrder: {
          title: 'Automated Purchase Order System',
          problem:
            'Procurement approvals were manual, slow, and gave different roles no clear view of where an order actually was.',
          built:
            'A Java Swing desktop application with role-based dashboards and persistent storage, automating the approval workflow end to end.',
          result: 'TODO: add the concrete result: time saved, steps removed, users served.',
        },
        upcoming: {
          title: 'Next project',
          problem: 'TODO: name the project and the problem it solves.',
          built: 'In development.',
          result: '',
        },
      },
    },
    stack: {
      fig: 'fig. 03',
      title: 'The Stack',
      standfirst: 'What I actually reach for.',
      groups: {
        code: 'Programming languages',
        data: 'Data & visualisation',
        db: 'Databases',
        web: 'Web',
      },
      education: 'Education',
      focus: 'Current focus',
      focusText: 'Deep learning & SQL optimisation',
    },
    session: {
      fig: 'fig. 04',
      title: 'You Are The Dataset',
      standfirst:
        'You’ve been reading my data. Here’s yours, measured in your browser, for the length of this page view.',
      privacy:
        'Computed locally. Nothing is sent anywhere, nothing is stored, no cookies, no analytics. Reload and it’s gone.',
      dwell: 'Time per section',
      sectionTop: 'masthead',
      scroll: 'Scroll depth',
      viewport: 'Viewport',
      device: 'Input',
      theme: 'Theme',
      language: 'Language switches',
      interactions: 'Interactions',
      classify: 'Classifier',
      classifyNote:
        'This is a rule, not a model. No training data, no accuracy claim. The rule is printed above so you can check it yourself.',
      verdicts: {
        recruiter: 'recruiter',
        engineer: 'engineer',
        browser: 'passer-by',
        unknown: 'not enough data yet',
      },
      cta: 'Predicted next action',
      ctaCv: 'download the CV',
      ctaContact: 'send a message',
      seconds: 's',
      none: '·',
      touch: 'touch',
      mouse: 'mouse + keyboard',
    },
    idcard: {
      open: 'Open ID card',
      doc: 'PORTFOLIO ID',
      surname: 'Surname',
      given: 'Given names',
      role: 'Role',
      status: 'Status',
      based: 'Based',
      languages: 'Languages',
      degree: 'Degree',
      awarded: 'Awarded by',
      range: 'Latitude range',
      issued: 'RENDERED',
      close: 'Close',
      hint: 'Every field on this card is pulled from the same data as the chart. Press Esc to close.',
    },
    query: {
      open: 'Query me',
      title: 'Query',
      placeholder: 'SELECT * FROM abdellah',
      hint: 'Try a chip, or type SQL. Esc to close.',
      rows: 'rows',
      empty: 'No rows returned.',
      error: 'Syntax error',
      errorHints: [
        'That is not SQL, but I respect the confidence.',
        'Close, but no semicolon.',
        'I only speak a small dialect. Try a chip below.',
      ],
      chips: {
        all: 'SELECT * FROM abdellah',
        france: "SELECT * FROM experience WHERE country = 'France'",
        recent: 'SELECT * FROM experience ORDER BY date DESC',
        db: "SELECT * FROM skills WHERE type = 'database'",
        projects: 'SELECT * FROM projects',
        contact: 'SELECT * FROM contact',
      },
    },
    contact: {
      fig: 'fig. 05',
      title: 'Let’s talk',
      standfirst:
        'Open to graduate roles in data analytics and software. The forecast band is wide, so I’ll come to you.',
      email: 'Email',
      say: 'Say hello',
      colophon:
        'Built from scratch. No framework, no tracking. Vanilla HTML, CSS and about 20 KB of JavaScript.',
      source: 'Source',
      rights: 'All rights reserved.',
    },
    plain: {
      title: 'The facts',
      standfirst:
        'Everything on this site, as plain text. No motion, no JavaScript required.',
      back: 'Back to the full site',
      experience: 'Experience',
      education: 'Education',
      skills: 'Skills',
      projects: 'Projects',
      contact: 'Contact',
      print: 'Print this page',
    },
    notFound: {
      code: '404',
      title: 'This data point doesn’t exist',
      body: 'The URL you asked for isn’t in the dataset. It may have been moved, or it may never have been plotted.',
      back: 'Return to the chart',
    },
  },

  fr: {
    lang: { name: 'Français', code: 'FR' },
    nav: {
      trajectory: 'Trajectoire',
      work: 'Études de cas',
      stack: 'Stack',
      session: 'Votre session',
      contact: 'Contact',
      skip: 'Aller à l’essentiel',
      menu: 'Menu',
    },
    masthead: {
      fig: 'fig. 00',
      role: 'Analyste de données & développeur logiciel',
      tagline: 'Je ne m’arrête pas aux analyses. Je construis ce qui s’en sert.',
      sub: 'De l’analyse qui part en production, pas de l’analyse qui dort dans un rapport.',
      status: 'Dernière année',
      statusFull: 'Dernière année · BSc (Hons) Informatique (Data Analytics)',
      cv: 'export → cv.pdf',
      contact: 'Me contacter',
      scroll: 'Défilez pour tracer',
    },
    figures: {
      internships: 'Stages',
      countries: 'Pays',
      spoken: 'Langues parlées',
      languages: 'Langages de programmation',
    },
    trajectory: {
      fig: 'fig. 01',
      title: 'La Trajectoire',
      standfirst:
        'Quatre stages, trois pays, un double diplôme, tracés sur le seul axe que je peux prouver.',
      axis: 'y = latitude °N · x = temps · n = 5 · source : la vraie vie',
      footnote:
        'L’axe des ordonnées, c’est la latitude réelle. Je ne vais pas tracer « l’impact » sur un graphique et me dire analyste de données.',
      forecast: 'prévision : ouvert aux postes de jeune diplômé',
      forecastNote:
        'L’intervalle de confiance est large parce que je bouge beaucoup. N’importe où dessus me convient.',
      hint: 'Sélectionnez un point pour le détail',
      close: 'Fermer',
      ongoing: 'en cours',
      tools: 'Outils',
      roles: {
        axa: {
          role: 'Stagiaire Analyste de Données',
          summary:
            'Optimisation de l’intégrité des données par une validation rigoureuse des jeux de données clients. Conception de tableaux de bord KPI automatisés sous Power BI et Excel, et fluidification du reporting par l’optimisation de requêtes SQL lentes.',
        },
        bp: {
          role: 'Stagiaire Data & IA',
          summary:
            'Traduction des besoins métier en KPI exploitables. Construction de pipelines ML de bout en bout (ETL et feature engineering) en Python et SQL, avec des analyses Power BI pour suivre les tendances de performance.',
        },
        audensiel: {
          role: 'Stagiaire Analyste de Données',
          summary:
            'Construction de jeux de données optimisés pour le reporting par consolidation de sources multiples. Développement de modèles statistiques en Python et R pour appuyer les décisions stratégiques, et création de tableaux de bord Power BI et SQL interactifs en self-service.',
        },
        mss: {
          role: 'Stagiaire Data & CRM',
          summary:
            'Conception de fonctionnalités d’application web CRM, dont le filtrage et la recherche avancés, adossées à des bases SQL structurées. Développement de pipelines de reporting automatisés en Python et SQL, ainsi que de tableaux de bord Power BI pour le pilotage opérationnel.',
        },
        apu: {
          role: 'Dernière année, BSc (Hons) Informatique (Data Analytics)',
          summary:
            'Double diplôme avec De Montfort University, Royaume-Uni. Actuellement centré sur le deep learning et l’optimisation SQL.',
        },
      },
    },
    work: {
      fig: 'fig. 02',
      title: 'Études de Cas',
      standfirst: 'Deux livrés, un en cours.',
      problem: 'Problème',
      built: 'Ce que j’ai construit',
      result: 'Résultat',
      view: 'Voir sur GitHub',
      todo: 'Résultats à venir. Les vrais chiffres arrivent ici.',
      wip: 'En cours',
      projects: {
        carResale: {
          title: 'Analyse des Prix de Revente Automobile',
          problem:
            'Les prix de revente du jeu de données étaient bruités et saisis de façon incohérente, ce qui rendait difficile d’identifier les vrais facteurs de dépréciation.',
          built:
            'Analyse exploratoire et pipeline complet de prétraitement sous SAS Studio et SQL : nettoyage, traitement des valeurs aberrantes et exploration de variables pour isoler les signaux réels de dépréciation.',
          result:
            'TODO : ajouter le résultat concret. Qu’a montré l’analyse, et qu’est-ce que cela a changé ?',
        },
        purchaseOrder: {
          title: 'Système Automatisé de Bons de Commande',
          problem:
            'Les validations d’achat étaient manuelles, lentes, et aucun rôle n’avait de visibilité claire sur l’avancement réel d’une commande.',
          built:
            'Une application de bureau Java Swing avec tableaux de bord par rôle et stockage persistant, automatisant le circuit de validation de bout en bout.',
          result:
            'TODO : ajouter le résultat concret : temps gagné, étapes supprimées, utilisateurs servis.',
        },
        upcoming: {
          title: 'Prochain projet',
          problem: 'TODO : nommer le projet et le problème qu’il résout.',
          built: 'En développement.',
          result: '',
        },
      },
    },
    stack: {
      fig: 'fig. 03',
      title: 'La Stack',
      standfirst: 'Ce que j’utilise vraiment.',
      groups: {
        code: 'Langages de programmation',
        data: 'Données & visualisation',
        db: 'Bases de données',
        web: 'Web',
      },
      education: 'Formation',
      focus: 'Focus actuel',
      focusText: 'Deep learning & optimisation SQL',
    },
    session: {
      fig: 'fig. 04',
      title: 'Vous Êtes Le Jeu De Données',
      standfirst:
        'Vous venez de lire mes données. Voici les vôtres, mesurées dans votre navigateur, le temps de cette visite.',
      privacy:
        'Calculé localement. Rien n’est envoyé, rien n’est stocké, aucun cookie, aucun tracker. Rechargez et tout disparaît.',
      dwell: 'Temps par section',
      sectionTop: 'en-tête',
      scroll: 'Profondeur de défilement',
      viewport: 'Fenêtre',
      device: 'Saisie',
      theme: 'Thème',
      language: 'Changements de langue',
      interactions: 'Interactions',
      classify: 'Classifieur',
      classifyNote:
        'C’est une règle, pas un modèle. Aucune donnée d’entraînement, aucune prétention de précision. La règle est affichée ci-dessus, vérifiez-la vous-même.',
      verdicts: {
        recruiter: 'recruteur',
        engineer: 'ingénieur',
        browser: 'visiteur de passage',
        unknown: 'pas encore assez de données',
      },
      cta: 'Prochaine action prédite',
      ctaCv: 'télécharger le CV',
      ctaContact: 'envoyer un message',
      seconds: 's',
      none: '·',
      touch: 'tactile',
      mouse: 'souris + clavier',
    },
    idcard: {
      open: 'Ouvrir la carte d’identité',
      doc: 'CARTE PORTFOLIO',
      surname: 'Nom',
      given: 'Prénom',
      role: 'Fonction',
      status: 'Statut',
      based: 'Basé à',
      languages: 'Langues',
      degree: 'Diplôme',
      awarded: 'Délivré par',
      range: 'Amplitude de latitude',
      issued: 'GÉNÉRÉ LE',
      close: 'Fermer',
      hint: 'Chaque champ de cette carte provient des mêmes données que le graphique. Échap pour fermer.',
    },
    query: {
      open: 'Interrogez-moi',
      title: 'Requête',
      placeholder: 'SELECT * FROM abdellah',
      hint: 'Essayez une suggestion, ou tapez du SQL. Échap pour fermer.',
      rows: 'lignes',
      empty: 'Aucune ligne retournée.',
      error: 'Erreur de syntaxe',
      errorHints: [
        'Ce n’est pas du SQL, mais j’admire l’assurance.',
        'Presque, mais il manque le point-virgule.',
        'Je ne parle qu’un petit dialecte. Essayez une suggestion ci-dessous.',
      ],
      chips: {
        all: 'SELECT * FROM abdellah',
        france: "SELECT * FROM experience WHERE country = 'France'",
        recent: 'SELECT * FROM experience ORDER BY date DESC',
        db: "SELECT * FROM skills WHERE type = 'database'",
        projects: 'SELECT * FROM projects',
        contact: 'SELECT * FROM contact',
      },
    },
    contact: {
      fig: 'fig. 05',
      title: 'Parlons-en',
      standfirst:
        'Ouvert aux postes de jeune diplômé en data analytics et en développement. L’intervalle est large, je viendrai à vous.',
      email: 'E-mail',
      say: 'Dire bonjour',
      colophon:
        'Fait main. Sans framework, sans tracking. HTML, CSS et environ 20 Ko de JavaScript.',
      source: 'Code source',
      rights: 'Tous droits réservés.',
    },
    plain: {
      title: 'L’essentiel',
      standfirst:
        'Tout le contenu de ce site, en texte brut. Sans animation, sans JavaScript.',
      back: 'Retour au site complet',
      experience: 'Expérience',
      education: 'Formation',
      skills: 'Compétences',
      projects: 'Projets',
      contact: 'Contact',
      print: 'Imprimer cette page',
    },
    notFound: {
      code: '404',
      title: 'Ce point de données n’existe pas',
      body: 'L’URL demandée n’est pas dans le jeu de données. Elle a peut-être été déplacée, ou n’a jamais été tracée.',
      back: 'Retour au graphique',
    },
  },

  es: {
    lang: { name: 'Español', code: 'ES' },
    nav: {
      trajectory: 'Trayectoria',
      work: 'Casos prácticos',
      stack: 'Stack',
      session: 'Tu sesión',
      contact: 'Contacto',
      skip: 'Ir a lo esencial',
      menu: 'Menú',
    },
    masthead: {
      fig: 'fig. 00',
      role: 'Analista de datos y desarrollador de software',
      tagline: 'No me quedo en el análisis. Construyo lo que lo usa.',
      sub: 'Análisis que llega a producción, no análisis que duerme en un informe.',
      status: 'Último año',
      statusFull: 'Último año · BSc (Hons) Informática (Data Analytics)',
      cv: 'export → cv.pdf',
      contact: 'Hablemos',
      scroll: 'Desplázate para trazar',
    },
    figures: {
      internships: 'Prácticas',
      countries: 'Países',
      spoken: 'Idiomas hablados',
      languages: 'Lenguajes de programación',
    },
    trajectory: {
      fig: 'fig. 01',
      title: 'La Trayectoria',
      standfirst:
        'Cuatro prácticas, tres países, una doble titulación, trazados sobre el único eje que puedo demostrar.',
      axis: 'y = latitud °N · x = tiempo · n = 5 · fuente: la vida real',
      footnote:
        'El eje Y es latitud real. No voy a graficar «impacto» y llamarme analista de datos.',
      forecast: 'pronóstico: abierto a puestos de recién graduado',
      forecastNote:
        'La banda de confianza es ancha porque me muevo mucho. Cualquier punto de ella me sirve.',
      hint: 'Selecciona un punto para ver el detalle',
      close: 'Cerrar',
      ongoing: 'en curso',
      tools: 'Herramientas',
      roles: {
        axa: {
          role: 'Analista de Datos en Prácticas',
          summary:
            'Optimización de la integridad de los datos mediante una validación rigurosa de los conjuntos de clientes. Diseño de paneles de KPI automatizados en Power BI y Excel, y agilización del reporting optimizando consultas SQL lentas.',
        },
        bp: {
          role: 'Practicante de Datos e IA',
          summary:
            'Traducción de requisitos de negocio en KPI accionables. Construcción de pipelines de ML de extremo a extremo (ETL e ingeniería de variables) en Python y SQL, con analítica en Power BI para seguir las tendencias de rendimiento.',
        },
        audensiel: {
          role: 'Analista de Datos en Prácticas',
          summary:
            'Construcción de conjuntos de datos optimizados para reporting consolidando múltiples fuentes. Desarrollo de modelos estadísticos en Python y R para apoyar decisiones estratégicas, y creación de paneles interactivos en Power BI y SQL para autoservicio.',
        },
        mss: {
          role: 'Practicante de Datos y CRM',
          summary:
            'Diseño de funcionalidades de una aplicación web CRM, incluidos filtrado y búsqueda avanzados, apoyadas en bases de datos SQL estructuradas. Desarrollo de pipelines de reporting automatizados en Python y SQL, además de paneles de Power BI para decisiones operativas.',
        },
        apu: {
          role: 'Último año, BSc (Hons) Informática (Data Analytics)',
          summary:
            'Doble titulación con De Montfort University, Reino Unido. Actualmente centrado en deep learning y optimización SQL.',
        },
      },
    },
    work: {
      fig: 'fig. 02',
      title: 'Casos Prácticos',
      standfirst: 'Dos entregados, uno en curso.',
      problem: 'Problema',
      built: 'Lo que construí',
      result: 'Resultado',
      view: 'Ver en GitHub',
      todo: 'Resultados pendientes. Aquí van las cifras reales.',
      wip: 'En curso',
      projects: {
        carResale: {
          title: 'Análisis de Precios de Reventa de Coches',
          problem:
            'Los precios de reventa del conjunto de datos eran ruidosos y estaban registrados de forma inconsistente, lo que dificultaba ver qué factores impulsaban realmente la depreciación.',
          built:
            'Análisis exploratorio y un pipeline completo de preprocesamiento en SAS Studio y SQL: limpieza, tratamiento de atípicos y exploración de variables para aislar las señales reales de depreciación.',
          result:
            'TODO: añadir el resultado concreto. Qué mostró el análisis y qué cambió a raíz de ello.',
        },
        purchaseOrder: {
          title: 'Sistema Automatizado de Órdenes de Compra',
          problem:
            'Las aprobaciones de compra eran manuales, lentas, y ningún rol tenía visibilidad clara de dónde estaba realmente una orden.',
          built:
            'Una aplicación de escritorio en Java Swing con paneles por rol y almacenamiento persistente, que automatiza el flujo de aprobación de principio a fin.',
          result:
            'TODO: añadir el resultado concreto: tiempo ahorrado, pasos eliminados, usuarios atendidos.',
        },
        upcoming: {
          title: 'Próximo proyecto',
          problem: 'TODO: nombrar el proyecto y el problema que resuelve.',
          built: 'En desarrollo.',
          result: '',
        },
      },
    },
    stack: {
      fig: 'fig. 03',
      title: 'El Stack',
      standfirst: 'Lo que uso de verdad.',
      groups: {
        code: 'Lenguajes de programación',
        data: 'Datos y visualización',
        db: 'Bases de datos',
        web: 'Web',
      },
      education: 'Formación',
      focus: 'Foco actual',
      focusText: 'Deep learning y optimización SQL',
    },
    session: {
      fig: 'fig. 04',
      title: 'Tú Eres El Conjunto De Datos',
      standfirst:
        'Has estado leyendo mis datos. Aquí están los tuyos, medidos en tu navegador, durante esta visita.',
      privacy:
        'Calculado localmente. No se envía nada, no se guarda nada, sin cookies ni rastreadores. Recarga y desaparece.',
      dwell: 'Tiempo por sección',
      sectionTop: 'cabecera',
      scroll: 'Profundidad de scroll',
      viewport: 'Ventana',
      device: 'Entrada',
      theme: 'Tema',
      language: 'Cambios de idioma',
      interactions: 'Interacciones',
      classify: 'Clasificador',
      classifyNote:
        'Esto es una regla, no un modelo. Sin datos de entrenamiento ni promesas de precisión. La regla está arriba, compruébala tú mismo.',
      verdicts: {
        recruiter: 'reclutador',
        engineer: 'ingeniero',
        browser: 'visitante de paso',
        unknown: 'aún no hay datos suficientes',
      },
      cta: 'Próxima acción prevista',
      ctaCv: 'descargar el CV',
      ctaContact: 'enviar un mensaje',
      seconds: 's',
      none: '·',
      touch: 'táctil',
      mouse: 'ratón + teclado',
    },
    idcard: {
      open: 'Abrir la tarjeta de identidad',
      doc: 'TARJETA PORTFOLIO',
      surname: 'Apellidos',
      given: 'Nombre',
      role: 'Función',
      status: 'Situación',
      based: 'Base',
      languages: 'Idiomas',
      degree: 'Titulación',
      awarded: 'Expedido por',
      range: 'Rango de latitud',
      issued: 'GENERADO EL',
      close: 'Cerrar',
      hint: 'Cada campo de esta tarjeta procede de los mismos datos que el gráfico. Esc para cerrar.',
    },
    query: {
      open: 'Consúltame',
      title: 'Consulta',
      placeholder: 'SELECT * FROM abdellah',
      hint: 'Prueba una sugerencia, o escribe SQL. Esc para cerrar.',
      rows: 'filas',
      empty: 'Ninguna fila devuelta.',
      error: 'Error de sintaxis',
      errorHints: [
        'Eso no es SQL, pero respeto la confianza.',
        'Casi, pero falta el punto y coma.',
        'Solo hablo un dialecto pequeño. Prueba una sugerencia abajo.',
      ],
      chips: {
        all: 'SELECT * FROM abdellah',
        france: "SELECT * FROM experience WHERE country = 'France'",
        recent: 'SELECT * FROM experience ORDER BY date DESC',
        db: "SELECT * FROM skills WHERE type = 'database'",
        projects: 'SELECT * FROM projects',
        contact: 'SELECT * FROM contact',
      },
    },
    contact: {
      fig: 'fig. 05',
      title: 'Hablemos',
      standfirst:
        'Abierto a puestos de recién graduado en analítica de datos y software. La banda es ancha, yo me acerco.',
      email: 'Correo',
      say: 'Saludar',
      colophon:
        'Hecho a mano. Sin framework, sin rastreo. HTML, CSS y unos 20 KB de JavaScript.',
      source: 'Código fuente',
      rights: 'Todos los derechos reservados.',
    },
    plain: {
      title: 'Lo esencial',
      standfirst:
        'Todo el contenido de este sitio, en texto plano. Sin animación, sin JavaScript.',
      back: 'Volver al sitio completo',
      experience: 'Experiencia',
      education: 'Formación',
      skills: 'Habilidades',
      projects: 'Proyectos',
      contact: 'Contacto',
      print: 'Imprimir esta página',
    },
    notFound: {
      code: '404',
      title: 'Este punto de datos no existe',
      body: 'La URL que pediste no está en el conjunto de datos. Puede que se haya movido, o que nunca se trazara.',
      back: 'Volver al gráfico',
    },
  },
};

export const LANGS = ['en', 'fr', 'es'];

/* =============================================================================
   Copy for the Negative Hours case study, in EN / FR / ES.

   Kept beside the page rather than in the site-wide content.js, so the home
   page does not ship prose only this page uses.

   Anything factual here is either a design decision already recorded in the
   repo or a description of the pipeline. There are no results yet, and none are
   invented: fig. 06 shows an empty slot per question until the analysis ships.
   ========================================================================== */

export const LANGS = ['en', 'fr', 'es'];

export const PAGE = {
  en: {
    lang: { code: 'EN' },
    back: 'Back to the portfolio',
    nav: { home: 'Home', repo: 'Repository' },

    hero: {
      fig: 'fig. 00',
      kicker: 'Case study',
      title: 'Negative Hours',
      subtitle: 'Europe’s electricity market in the renewables era',
      hook: 'How often is power free in Europe, and what is a battery worth in each country?',
      status: 'In progress',
      repo: 'View the repository ↗',
      meta: '8 bidding zones · hourly prices since 2019 · official ENTSO-E data',
    },

    explain: {
      fig: 'fig. 01',
      title: 'Wait, negative prices?',
      p1: 'Electricity has to be used the moment it is made. There is no warehouse. So the wholesale price is whatever it takes to make supply match demand, every hour of every day.',
      p2: 'When it is sunny and windy at once, supply overshoots. Wind and solar cost almost nothing to run after they are built, and some conventional plants are expensive to switch off and start again. So rather than stop, generators accept a price of zero, and then a price below it. They pay to keep producing.',
      p3: 'For anything that can soak up that power, a battery, an electrolyser, a car charger, those hours are the entire opportunity. This project measures them.',
      caption: 'Illustrative, not real data. A day where midday sun pushes the price under zero.',
      axisPrice: '€/MWh',
      axisZero: '0',
      axisNoon: 'midday',
      axisNight: 'night',
      shaded: 'paid to consume',
    },

    questions: {
      fig: 'fig. 02',
      title: 'Four questions',
      standfirst: 'Each one ends in a decision somebody has to make.',
      decides: 'Decides',
      metric: 'Metric',
      items: {
        q1: {
          q: 'How often are prices negative?',
          decides: 'Which markets are moving, and how fast.',
          metric: 'Negative hours per year, ranked by country',
        },
        q2: {
          q: 'Does solar eat its own value?',
          decides: 'What a solar farm actually earns per MWh, rather than what the average price suggests.',
          metric: 'Solar capture rate',
        },
        q3: {
          q: 'Where should you build a battery?',
          decides: 'Which country pays most for storage, and whether the gap is widening.',
          metric: '€/MW/year from daily price spread',
        },
        q4: {
          q: 'When should EVs charge?',
          decides: 'Which hours to schedule charging in, and how that shifts across the year.',
          metric: 'Cheapest windows by season',
        },
      },
    },

    pipeline: {
      fig: 'fig. 03',
      title: 'How it works',
      standfirst: 'One command, and a schedule that runs it without me.',
      steps: {
        api: 'ENTSO-E API',
        apiNote: 'Official grid data',
        extract: 'Python extractor',
        extractNote: 'One file per zone per year',
        parquet: 'Parquet',
        parquetNote: 'Raw, immutable, UTC',
        warehouse: 'DuckDB + dbt',
        warehouseNote: 'staging → marts, tested',
        analysis: 'Analysis',
        analysisNote: 'SQL and Python',
        dashboard: 'Dashboard',
        dashboardNote: 'The four questions',
      },
      refresh: 'Refreshed on a schedule by GitHub Actions',
    },

    decisions: {
      fig: 'fig. 04',
      title: 'Decisions',
      standfirst: 'Written down when made, not reconstructed afterwards. Each one links to its record.',
      read: 'Read the record ↗',
      items: {
        stack: {
          title: 'The stack',
          body: 'DuckDB and dbt over a hosted warehouse. The dataset is tens of millions of rows, which fits comfortably on a laptop, and a file-based warehouse keeps the whole project reproducible by anyone who clones it.',
        },
        zones: {
          title: 'Eight bidding zones',
          body: 'Spain and Portugal for high solar share, France for nuclear, Germany-Luxembourg and the Netherlands for wind, Belgium as a dense interconnected market, Poland as a coal-heavy contrast, and northern Italy for its distinct price formation.',
        },
        storage: {
          title: 'Raw prices stored by UTC year',
          body: 'Everything lands in UTC and is partitioned by year. Local time and daylight saving are presentation concerns, so they are handled in the models rather than baked into the raw layer.',
        },
      },
    },

    log: {
      fig: 'fig. 05',
      title: 'Build log',
      standfirst: 'Updated as the work happens.',
      empty: 'No entries yet.',
    },

    results: {
      fig: 'fig. 06',
      title: 'Results',
      standfirst: 'Results land here as the analysis ships. Nothing is filled in until the numbers are real.',
      pending: 'Pending',
      awaiting: 'Awaiting analysis',
    },

    footer: {
      repo: 'Repository ↗',
      home: 'Back to sbaiii.com',
      note: 'Data: ENTSO-E Transparency Platform. Figures on this page are illustrations of the method, not results.',
    },
  },

  fr: {
    lang: { code: 'FR' },
    back: 'Retour au portfolio',
    nav: { home: 'Accueil', repo: 'Dépôt' },

    hero: {
      fig: 'fig. 00',
      kicker: 'Étude de cas',
      title: 'Negative Hours',
      subtitle: 'Le marché européen de l’électricité à l’ère des renouvelables',
      hook: 'À quelle fréquence l’électricité est-elle gratuite en Europe, et que vaut une batterie dans chaque pays ?',
      status: 'En cours',
      repo: 'Voir le dépôt ↗',
      meta: '8 zones de marché · prix horaires depuis 2019 · données officielles ENTSO-E',
    },

    explain: {
      fig: 'fig. 01',
      title: 'Attendez, des prix négatifs ?',
      p1: 'L’électricité doit être consommée à l’instant où elle est produite. Il n’y a pas d’entrepôt. Le prix de gros est donc celui qui permet à l’offre d’égaler la demande, à chaque heure de chaque journée.',
      p2: 'Quand il fait soleil et qu’il vente en même temps, l’offre déborde. L’éolien et le solaire ne coûtent presque rien à faire tourner une fois construits, et certaines centrales classiques sont coûteuses à arrêter puis à relancer. Plutôt que de s’arrêter, les producteurs acceptent un prix nul, puis un prix négatif. Ils paient pour continuer à produire.',
      p3: 'Pour tout ce qui peut absorber cette électricité, une batterie, un électrolyseur, une borne de recharge, ces heures sont toute l’opportunité. Ce projet les mesure.',
      caption: 'Illustration, pas des données réelles. Une journée où le soleil de midi fait passer le prix sous zéro.',
      axisPrice: '€/MWh',
      axisZero: '0',
      axisNoon: 'midi',
      axisNight: 'nuit',
      shaded: 'payé pour consommer',
    },

    questions: {
      fig: 'fig. 02',
      title: 'Quatre questions',
      standfirst: 'Chacune débouche sur une décision que quelqu’un doit prendre.',
      decides: 'Décide',
      metric: 'Indicateur',
      items: {
        q1: {
          q: 'À quelle fréquence les prix sont-ils négatifs ?',
          decides: 'Quels marchés bougent, et à quelle vitesse.',
          metric: 'Heures négatives par an, classées par pays',
        },
        q2: {
          q: 'Le solaire dévore-t-il sa propre valeur ?',
          decides: 'Ce qu’une centrale solaire gagne réellement par MWh, plutôt que ce que suggère le prix moyen.',
          metric: 'Taux de captation du solaire',
        },
        q3: {
          q: 'Où faut-il construire une batterie ?',
          decides: 'Quel pays rémunère le mieux le stockage, et si l’écart se creuse.',
          metric: '€/MW/an à partir de l’écart de prix journalier',
        },
        q4: {
          q: 'Quand faut-il recharger les véhicules électriques ?',
          decides: 'Sur quelles heures planifier la recharge, et comment cela se décale dans l’année.',
          metric: 'Créneaux les moins chers par saison',
        },
      },
    },

    pipeline: {
      fig: 'fig. 03',
      title: 'Comment ça marche',
      standfirst: 'Une commande, et une planification qui l’exécute sans moi.',
      steps: {
        api: 'API ENTSO-E',
        apiNote: 'Données officielles du réseau',
        extract: 'Extracteur Python',
        extractNote: 'Un fichier par zone et par an',
        parquet: 'Parquet',
        parquetNote: 'Brut, immuable, UTC',
        warehouse: 'DuckDB + dbt',
        warehouseNote: 'staging → marts, testé',
        analysis: 'Analyse',
        analysisNote: 'SQL et Python',
        dashboard: 'Tableau de bord',
        dashboardNote: 'Les quatre questions',
      },
      refresh: 'Rafraîchi automatiquement par GitHub Actions',
    },

    decisions: {
      fig: 'fig. 04',
      title: 'Décisions',
      standfirst: 'Écrites au moment où elles sont prises, pas reconstituées après coup. Chacune renvoie à sa fiche.',
      read: 'Lire la fiche ↗',
      items: {
        stack: {
          title: 'La stack',
          body: 'DuckDB et dbt plutôt qu’un entrepôt hébergé. Le jeu de données fait quelques dizaines de millions de lignes, ce qui tient sans peine sur un portable, et un entrepôt sur fichiers garde le projet reproductible par quiconque le clone.',
        },
        zones: {
          title: 'Huit zones de marché',
          body: 'L’Espagne et le Portugal pour leur part de solaire, la France pour le nucléaire, l’Allemagne-Luxembourg et les Pays-Bas pour l’éolien, la Belgique comme marché dense et interconnecté, la Pologne en contraste très charbonnier, et l’Italie du Nord pour sa formation de prix particulière.',
        },
        storage: {
          title: 'Prix bruts stockés par année UTC',
          body: 'Tout arrive en UTC et est partitionné par année. L’heure locale et le changement d’heure relèvent de la présentation : ils sont traités dans les modèles plutôt que figés dans la couche brute.',
        },
      },
    },

    log: {
      fig: 'fig. 05',
      title: 'Journal de bord',
      standfirst: 'Mis à jour au fil du travail.',
      empty: 'Aucune entrée pour l’instant.',
    },

    results: {
      fig: 'fig. 06',
      title: 'Résultats',
      standfirst: 'Les résultats arriveront ici au fil de l’analyse. Rien n’est rempli tant que les chiffres ne sont pas réels.',
      pending: 'En attente',
      awaiting: 'Analyse en cours',
    },

    footer: {
      repo: 'Dépôt ↗',
      home: 'Retour à sbaiii.com',
      note: 'Données : plateforme de transparence ENTSO-E. Les figures de cette page illustrent la méthode, ce ne sont pas des résultats.',
    },
  },

  es: {
    lang: { code: 'ES' },
    back: 'Volver al portfolio',
    nav: { home: 'Inicio', repo: 'Repositorio' },

    hero: {
      fig: 'fig. 00',
      kicker: 'Caso práctico',
      title: 'Negative Hours',
      subtitle: 'El mercado eléctrico europeo en la era de las renovables',
      hook: '¿Con qué frecuencia la electricidad es gratis en Europa, y cuánto vale una batería en cada país?',
      status: 'En curso',
      repo: 'Ver el repositorio ↗',
      meta: '8 zonas de mercado · precios horarios desde 2019 · datos oficiales de ENTSO-E',
    },

    explain: {
      fig: 'fig. 01',
      title: '¿Precios negativos?',
      p1: 'La electricidad se consume en el mismo instante en que se produce. No hay almacén. El precio mayorista es, por tanto, el que iguala oferta y demanda en cada hora de cada día.',
      p2: 'Cuando hace sol y viento a la vez, la oferta se desborda. La eólica y la solar casi no cuestan nada de operar una vez construidas, y algunas centrales convencionales son caras de apagar y volver a arrancar. Así que, en lugar de parar, los generadores aceptan un precio de cero, y después por debajo de cero. Pagan por seguir produciendo.',
      p3: 'Para cualquier cosa capaz de absorber esa energía, una batería, un electrolizador, un cargador de coche, esas horas son toda la oportunidad. Este proyecto las mide.',
      caption: 'Ilustración, no datos reales. Un día en que el sol del mediodía empuja el precio por debajo de cero.',
      axisPrice: '€/MWh',
      axisZero: '0',
      axisNoon: 'mediodía',
      axisNight: 'noche',
      shaded: 'pagado por consumir',
    },

    questions: {
      fig: 'fig. 02',
      title: 'Cuatro preguntas',
      standfirst: 'Cada una termina en una decisión que alguien tiene que tomar.',
      decides: 'Decide',
      metric: 'Métrica',
      items: {
        q1: {
          q: '¿Con qué frecuencia los precios son negativos?',
          decides: 'Qué mercados se mueven, y a qué velocidad.',
          metric: 'Horas negativas al año, por país',
        },
        q2: {
          q: '¿La solar se come su propio valor?',
          decides: 'Lo que una planta solar gana realmente por MWh, en lugar de lo que sugiere el precio medio.',
          metric: 'Tasa de captura solar',
        },
        q3: {
          q: '¿Dónde conviene construir una batería?',
          decides: 'Qué país paga más por el almacenamiento, y si la diferencia se amplía.',
          metric: '€/MW/año a partir del diferencial diario',
        },
        q4: {
          q: '¿Cuándo deberían cargar los coches eléctricos?',
          decides: 'En qué horas programar la carga, y cómo se desplaza a lo largo del año.',
          metric: 'Franjas más baratas por temporada',
        },
      },
    },

    pipeline: {
      fig: 'fig. 03',
      title: 'Cómo funciona',
      standfirst: 'Un comando, y una programación que lo ejecuta sin mí.',
      steps: {
        api: 'API de ENTSO-E',
        apiNote: 'Datos oficiales de red',
        extract: 'Extractor en Python',
        extractNote: 'Un archivo por zona y año',
        parquet: 'Parquet',
        parquetNote: 'Crudo, inmutable, UTC',
        warehouse: 'DuckDB + dbt',
        warehouseNote: 'staging → marts, con tests',
        analysis: 'Análisis',
        analysisNote: 'SQL y Python',
        dashboard: 'Panel',
        dashboardNote: 'Las cuatro preguntas',
      },
      refresh: 'Actualizado de forma programada por GitHub Actions',
    },

    decisions: {
      fig: 'fig. 04',
      title: 'Decisiones',
      standfirst: 'Escritas cuando se toman, no reconstruidas después. Cada una enlaza a su ficha.',
      read: 'Leer la ficha ↗',
      items: {
        stack: {
          title: 'La stack',
          body: 'DuckDB y dbt en lugar de un almacén alojado. El conjunto son decenas de millones de filas, que caben de sobra en un portátil, y un almacén basado en archivos mantiene el proyecto reproducible por cualquiera que lo clone.',
        },
        zones: {
          title: 'Ocho zonas de mercado',
          body: 'España y Portugal por su peso solar, Francia por la nuclear, Alemania-Luxemburgo y Países Bajos por la eólica, Bélgica como mercado denso e interconectado, Polonia como contraste intensivo en carbón, e Italia del Norte por su formación de precios particular.',
        },
        storage: {
          title: 'Precios crudos guardados por año UTC',
          body: 'Todo llega en UTC y se particiona por año. La hora local y el cambio horario son cuestiones de presentación: se resuelven en los modelos en lugar de fijarse en la capa cruda.',
        },
      },
    },

    log: {
      fig: 'fig. 05',
      title: 'Diario de obra',
      standfirst: 'Actualizado según avanza el trabajo.',
      empty: 'Todavía no hay entradas.',
    },

    results: {
      fig: 'fig. 06',
      title: 'Resultados',
      standfirst: 'Los resultados aparecerán aquí según avance el análisis. Nada se rellena hasta que las cifras sean reales.',
      pending: 'Pendiente',
      awaiting: 'A la espera del análisis',
    },

    footer: {
      repo: 'Repositorio ↗',
      home: 'Volver a sbaiii.com',
      note: 'Datos: plataforma de transparencia de ENTSO-E. Las figuras de esta página ilustran el método, no son resultados.',
    },
  },
};

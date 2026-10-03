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
      standfirst: 'Q1 has its answer. The rest land here as the analysis ships, and nothing is filled in until the numbers are real.',
      pending: 'Pending',
      awaiting: 'Awaiting analysis',
      answered: 'Answered',
      notebook: 'See the analysis notebook →',
      answers: {
        q1: {
          summary: 'Negative prices went from rare to routine: 5 of 8 European zones topped 500 negative-price hours in 2025, up from at most 112 in 2022. Spain and Portugal now hit zero or below most often, but their negative prices are shallow; Germany, the Netherlands and Belgium go much deeper.',
          fig1Alt: 'Eight small bar charts, one per bidding zone, showing hours per year with a day-ahead price below zero from 2019 to 2026. The Netherlands, Germany-Luxembourg, Spain, Belgium and France all pass 500 hours in 2025, Poland reaches 311 and Portugal 198, and northern Italy records none in any year. The 2026 bars are drawn hollow because the year is incomplete.',
          fig1Caption: 'Hours per year with a day-ahead price below 0 €/MWh, by bidding zone. The hollow 2026 bar is the year to date.',
          fig2Alt: 'A horizontal bar chart of the share of 2026 hours priced at or below zero, split into hours below zero and hours at exactly zero. Spain leads on 15.4 per cent, then Portugal on 13.2 and France on 12.0, ahead of Germany-Luxembourg on 8.3, the Netherlands on 6.8, Poland on 5.8, Belgium on 5.3 and northern Italy on 0.3. About a third of the Spanish, Portuguese and French hours sit at exactly zero, against 13 to 16 per cent in Germany, the Netherlands and Belgium.',
          fig2Caption: 'Share of 2026 hours to date priced at or below zero, split into below zero and exactly zero.',
        },
      },
    },

    footer: {
      repo: 'Repository ↗',
      home: 'Back to sbaiii.com',
      note: 'Data: ENTSO-E Transparency Platform. The fig. 01 chart illustrates the method; the fig. 06 charts are results read off the data.',
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
      standfirst: 'La Q1 a sa réponse. Les autres arriveront ici au fil de l’analyse, et rien n’est rempli tant que les chiffres ne sont pas réels.',
      pending: 'En attente',
      awaiting: 'Analyse en cours',
      answered: 'Répondue',
      notebook: 'Voir le notebook d’analyse →',
      answers: {
        q1: {
          summary: 'Les prix négatifs sont passés de rares à courants : 5 zones européennes sur 8 ont dépassé 500 heures de prix négatifs en 2025, contre 112 au maximum en 2022. L’Espagne et le Portugal touchent désormais zéro ou moins le plus souvent, mais leurs prix négatifs restent peu profonds ; l’Allemagne, les Pays-Bas et la Belgique descendent bien plus bas.',
          fig1Alt: 'Huit petits graphiques en barres, un par zone de marché, montrant le nombre d’heures par an avec un prix day-ahead inférieur à zéro de 2019 à 2026. Les Pays-Bas, l’Allemagne-Luxembourg, l’Espagne, la Belgique et la France dépassent tous 500 heures en 2025, la Pologne atteint 311 et le Portugal 198, et l’Italie du Nord n’en enregistre aucune, quelle que soit l’année. Les barres 2026 sont évidées car l’année est incomplète.',
          fig1Caption: 'Heures par an avec un prix day-ahead sous 0 €/MWh, par zone de marché. La barre 2026 évidée correspond à l’année en cours.',
          fig2Alt: 'Un graphique en barres horizontales de la part des heures 2026 cotées à zéro ou en dessous, séparant les heures sous zéro et les heures à exactement zéro. L’Espagne arrive en tête avec 15,4 %, puis le Portugal avec 13,2 % et la France avec 12,0 %, devant l’Allemagne-Luxembourg à 8,3 %, les Pays-Bas à 6,8 %, la Pologne à 5,8 %, la Belgique à 5,3 % et l’Italie du Nord à 0,3 %. Environ un tiers des heures espagnoles, portugaises et françaises sont à exactement zéro, contre 13 à 16 % en Allemagne, aux Pays-Bas et en Belgique.',
          fig2Caption: 'Part des heures 2026 à ce jour cotées à zéro ou en dessous, séparant sous zéro et exactement zéro.',
        },
      },
    },

    footer: {
      repo: 'Dépôt ↗',
      home: 'Retour à sbaiii.com',
      note: 'Données : plateforme de transparence ENTSO-E. Le graphique de la fig. 01 illustre la méthode ; ceux de la fig. 06 sont des résultats issus des données.',
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
      standfirst: 'La Q1 ya tiene respuesta. Las demás aparecerán aquí según avance el análisis, y nada se rellena hasta que las cifras sean reales.',
      pending: 'Pendiente',
      awaiting: 'A la espera del análisis',
      answered: 'Respondida',
      notebook: 'Ver el cuaderno de análisis →',
      answers: {
        q1: {
          summary: 'Los precios negativos han pasado de raros a habituales: 5 de las 8 zonas europeas superaron las 500 horas de precios negativos en 2025, frente a 112 como máximo en 2022. España y Portugal son ahora las que más veces tocan cero o por debajo, pero sus precios negativos son poco profundos; Alemania, Países Bajos y Bélgica bajan mucho más.',
          fig1Alt: 'Ocho gráficos de barras pequeños, uno por zona de mercado, con las horas al año con precio day-ahead por debajo de cero entre 2019 y 2026. Países Bajos, Alemania-Luxemburgo, España, Bélgica y Francia superan las 500 horas en 2025, Polonia llega a 311 y Portugal a 198, y el norte de Italia no registra ninguna en ningún año. Las barras de 2026 van huecas porque el año está incompleto.',
          fig1Caption: 'Horas al año con precio day-ahead por debajo de 0 €/MWh, por zona de mercado. La barra hueca de 2026 es el año en curso.',
          fig2Alt: 'Un gráfico de barras horizontales con la proporción de horas de 2026 a cero o por debajo, separando las horas por debajo de cero y las horas a exactamente cero. España encabeza con el 15,4 %, seguida de Portugal con el 13,2 % y Francia con el 12,0 %, por delante de Alemania-Luxemburgo con el 8,3 %, Países Bajos con el 6,8 %, Polonia con el 5,8 %, Bélgica con el 5,3 % y el norte de Italia con el 0,3 %. Alrededor de un tercio de las horas españolas, portuguesas y francesas están a exactamente cero, frente al 13 a 16 % en Alemania, Países Bajos y Bélgica.',
          fig2Caption: 'Proporción de las horas de 2026 hasta la fecha a cero o por debajo, separando por debajo de cero y exactamente cero.',
        },
      },
    },

    footer: {
      repo: 'Repositorio ↗',
      home: 'Volver a sbaiii.com',
      note: 'Datos: plataforma de transparencia de ENTSO-E. El gráfico de la fig. 01 ilustra el método; los de la fig. 06 son resultados obtenidos de los datos.',
    },
  },
};

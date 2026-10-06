/* =============================================================================
   Copy for the Ticket to Breathe case study, in EN / FR / ES.

   Kept beside the page rather than in the site-wide content.js, so the home
   page does not ship prose only this page uses.

   Every fact here is either a policy date, a decision already recorded in the
   repository, or a description of the method. There are no results yet, and
   none are invented: fig. 06 shows an empty slot per question until the
   analysis ships, and the only graphic on the page is a timeline of policy
   dates with no measured quantity on it at all.
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
      title: 'Ticket to Breathe',
      subtitle: 'The €9 experiment',
      hook: 'Did nearly-free public transport clean Germany’s air?',
      status: 'In progress',
      repo: 'View the repository ↗',
      meta: 'Germany + 7 control countries · hourly NO2, 2018 → 2025 · official EEA data',
    },

    experiment: {
      fig: 'fig. 01',
      title: 'A natural experiment',
      p1: 'In June 2022 Germany did something no country does on purpose. For three months it sold a single ticket, €9 a month, valid on every local and regional train, tram and bus in the country. Eighty million people woke up to transport that was effectively free.',
      p2: 'Then it stopped. The ticket expired at the end of August 2022 and fares went back to normal. In May 2023 the €49 Deutschlandticket brought cheap nationwide transit back, this time for good. On, off, on again.',
      p3: 'That is a natural experiment, and it is why this project exists. If cheap transit really does take people out of cars, then NO2, the pollutant most closely tied to road traffic, should fall in German cities relative to comparable cities abroad, and the fall should follow the switches rather than the calendar.',
      caption: 'Policy dates only, nothing measured. Tankrabatt was a cut in fuel tax: it ran over exactly the same three months as the €9 ticket while pushing the other way, which is why the 2023 Deutschlandticket is the cleaner test.',
      whenSummer: 'Jun → Aug 2022',
      whenFrom: 'from May 2023',
      alt: 'Timeline of three German policies on a two-year axis: the €9 ticket and the Tankrabatt fuel tax cut, both from June to August 2022, and the Deutschlandticket running from May 2023 onwards.',
    },

    questions: {
      fig: 'fig. 02',
      title: 'Three questions',
      standfirst: 'The third one decides whether the first two mean anything.',
      decides: 'Decides',
      metric: 'Method',
      items: {
        q1: {
          q: 'Did NO2 fall during the €9 summer, beyond what weather explains?',
          decides: 'Whether a cheap-transit policy shows up in air quality at all, once wind, rain and temperature are taken out.',
          metric: 'Difference-in-differences on deweathered NO2',
        },
        q2: {
          q: 'Did the effect switch off in September 2022, and back on in May 2023?',
          decides: 'Whether anything that moved was following the policy or just the calendar.',
          metric: 'Event study around each switch date',
        },
        q3: {
          q: 'How much could other things explain instead?',
          decides: 'How much of the 2022 estimate belongs to the simultaneous fuel tax cut, the post-COVID recovery and the energy crisis.',
          metric: 'Synthetic control and placebo tests',
        },
      },
    },

    pipeline: {
      fig: 'fig. 03',
      title: 'How it works',
      standfirst: 'From two public data sources to an estimate, with every step in the repository.',
      steps: {
        sources: 'EEA + Open-Meteo',
        sourcesNote: 'Air quality and ERA5',
        extract: 'Python pipeline',
        extractNote: 'Download, parse, validate',
        warehouse: 'DuckDB + dbt',
        warehouseNote: 'staging → marts, tested',
        deweather: 'LightGBM',
        deweatherNote: 'Weather effect removed',
        causal: 'Causal estimation',
        causalNote: 'DiD and synthetic control',
        page: 'This page',
        pageNote: 'Results when they are real',
      },
      refresh: 'Verified EEA data, 2018 → 2025. The unverified 2026 data is out of scope.',
    },

    decisions: {
      fig: 'fig. 04',
      title: 'Decisions',
      standfirst: 'Written down when they were made, not reconstructed afterwards.',
      read: 'Read the record ↗',
      caveat: 'Caveat',
      items: {
        controls: {
          title: 'Seven control countries, chosen by rule',
          body: 'Austria, Belgium, Switzerland, Czechia, France, the Netherlands and Poland. A country had to contribute at least ten qualifying stations to be included, which ruled out Denmark and Luxembourg. Spain was dropped for a different reason: it ran transit discounts of its own from September 2022, so it is not a clean control.',
        },
        clock: {
          title: 'One clock for every station',
          body: 'The time-zone labels in the EEA metadata did not match the data behind them. Rather than trust the label, every station was aligned empirically, by pairing it with its nearest German neighbour and reading the offset off the data itself.',
        },
        verified: {
          title: 'Verified data only',
          body: 'The core analysis uses verified measurements from 2018 to 2025. The 2026 data has not been through the EEA validation process yet, so it is out of scope rather than quietly mixed in.',
        },
        confounder: {
          title: 'The honest confounder',
          body: 'The fuel tax cut ran over exactly the same months as the €9 ticket, and it pushes the other way: cheaper petrol encourages driving. Anything measured in summer 2022 is therefore a combined effect of the two, and saying so now costs less than being asked about it later. The 2023 Deutschlandticket arrived on its own, which makes it the cleaner test.',
        },
      },
    },


    provisional: {
      label: 'Provisional',
      text: 'The analysis has not shipped. Every number on this page is withheld until it is final, so figures read as a dash and the charts carry a fixture watermark.',
      missing: 'Some data files are not loaded, so parts of this page are empty.',
    },

    map: {
      fig: 'fig. 05',
      title: 'Where we look',
      standfirst: 'TODO: one sentence on the station panel and why these countries.',
      legend: 'Percentage points vs expected',
      note: 'Descriptive country values, not causal estimates.',
      stations: 'Show stations',
      stationsOff: 'Hide stations',
      inStudy: 'In the study',
      other: 'Not in the study',
      stationCount: 'stations',
      fixtureGeometry: 'Country outlines are placeholders until the real boundary file is copied in.',
      empty: 'No map data loaded.',
      alt: 'A map of western and central Europe. The eight study countries are outlined and shaded by their value in percentage points against expected; every other country is grey. Station positions can be switched on as small dots.',
      types: {
        urban_traffic: 'Urban traffic',
        urban_background: 'Urban background',
        suburban_background: 'Suburban background',
      },
    },

    counterfactual: {
      fig: 'fig. 07',
      title: 'The counterfactual',
      standfirst: 'TODO: one sentence on what the synthetic control is and how to read it.',
      actual: 'Germany, actual',
      synthetic: 'Germany, synthetic',
      gap: 'Gap',
      caption: 'Monthly deweathered NO2 for Germany against its synthetic control, with the policy windows shaded. The lower panel is the gap between the two.',
      alt: 'A line chart of monthly deweathered NO2 for Germany and for its synthetic control, with the €9 ticket and Deutschlandticket windows shaded, and a smaller panel beneath showing the gap between the two series.',
      weights: 'Donor weights',
      empty: 'No counterfactual data loaded.',
    },

    event: {
      fig: 'fig. 08',
      title: 'Event study',
      standfirst: 'TODO: one sentence on the reference period and what a flat pre-trend would mean.',
      caption: 'Monthly estimates with 95% confidence intervals, policy windows shaded.',
      alt: 'An event study chart: one estimate per month with a 95% confidence interval, drawn against a zero line, with the policy windows shaded.',
      variants: {
        nine_euro: '€9 ticket',
        dticket: 'Deutschlandticket',
      },
      empty: 'No event study data loaded.',
    },

    placebo: {
      fig: 'fig. 09',
      title: 'Placebo tests',
      standfirst: 'TODO: one sentence on what the placebos are and what would count as a pass.',
      real: 'Germany, actual estimate',
      inSpace: 'Placebo in space',
      inTime: 'Placebo in time',
      caption: 'Each placebo estimate as a dot, with the real estimate marked.',
      alt: 'A strip chart of placebo estimates, one dot per placebo, with the real estimate for Germany marked separately.',
      empty: 'No placebo data loaded.',
    },

    methods: {
      fig: 'fig. 10',
      title: 'Methods',
      standfirst: 'The parts a reviewer will ask about, written down in one place.',
      show: 'Show',
      hide: 'Hide',
      items: {
        prereg: {
          title: 'Pre-registration',
          body: 'TODO: ADR-008 was committed before any estimate was run. Say what was fixed in advance, what was left open, and where the commit is.',
        },
        deweathering: {
          title: 'Deweathering',
          body: 'TODO: LightGBM per station, cross-fitted. Say which weather features, how the folds are cut, and what the residual is.',
        },
        data: {
          title: 'Data',
          body: 'TODO: stations, the filter that selected them, the analysis window, the weather grid, and what was excluded.',
        },
        limitations: {
          title: 'Limitations',
          body: 'TODO: the fuel tax cut, the post-COVID recovery, the energy crisis, and what this design cannot separate.',
        },
      },
    },

    results: {
      fig: 'fig. 06',
      title: 'Results',
      standfirst: 'TODO: one sentence framing the table. No conclusions until the analysis ships.',
      pending: 'Pending',
      awaiting: 'Awaiting analysis',
      empty: 'No results loaded.',
      cols: {
        label: 'Policy',
        family: 'Design',
        outcome: 'Outcome',
        estimate: 'Estimate',
        ci: '95% CI',
        verdict: 'Verdict',
      },
      families: {
        did: 'Difference-in-differences',
        synthetic_control: 'Synthetic control',
      },
      labels: {
        nine_euro_ticket: '€9 ticket',
        deutschlandticket: 'Deutschlandticket',
      },
      outcomes: {
        no2_deweathered: 'NO2, deweathered',
        no2_raw: 'NO2, raw',
      },
      verdicts: {
        inconclusive: 'Inconclusive',
        consistent: 'Consistent',
        not_detected: 'Not detected',
      },
      stations: 'Stations',
      stationDays: 'Station days',
      window: 'Window',
      grid: 'Weather grid',
    },

    footer: {
      repo: 'Repository ↗',
      home: 'Back to sbaiii.com',
      note: 'Air-quality data © European Environment Agency (CC BY 4.0). Weather data Open-Meteo.com, ERA5 / Copernicus (CC BY 4.0). The timeline on this page shows policy dates, not measurements.',
    },
  },

  fr: {
    lang: { code: 'FR' },
    back: 'Retour au portfolio',
    nav: { home: 'Accueil', repo: 'Dépôt' },

    hero: {
      fig: 'fig. 00',
      kicker: 'Étude de cas',
      title: 'Ticket to Breathe',
      subtitle: 'L’expérience des 9 €',
      hook: 'Un transport public quasi gratuit a-t-il assaini l’air allemand ?',
      status: 'En cours',
      repo: 'Voir le dépôt ↗',
      meta: 'Allemagne + 7 pays témoins · NO2 horaire, 2018 → 2025 · données officielles de l’AEE',
    },

    experiment: {
      fig: 'fig. 01',
      title: 'Une expérience naturelle',
      p1: 'En juin 2022, l’Allemagne a fait ce qu’aucun pays ne fait volontairement. Pendant trois mois, elle a vendu un titre unique, 9 € par mois, valable sur tous les trains régionaux, trams et bus du pays. Quatre-vingts millions de personnes se sont réveillées avec un transport quasiment gratuit.',
      p2: 'Puis cela s’est arrêté. Le titre a expiré fin août 2022 et les tarifs sont revenus à la normale. En mai 2023, le Deutschlandticket à 49 € a ramené le transport bon marché à l’échelle nationale, cette fois pour de bon. Allumé, éteint, rallumé.',
      p3: 'C’est une expérience naturelle, et c’est la raison d’être de ce projet. Si le transport bon marché sort vraiment les gens de leur voiture, le NO2, le polluant le plus étroitement lié au trafic routier, devrait baisser dans les villes allemandes par rapport à des villes comparables à l’étranger, et cette baisse devrait suivre les bascules plutôt que le calendrier.',
      caption: 'Uniquement des dates de mesures publiques, rien de mesuré. Le Tankrabatt était une remise sur la taxe carburant : il a couvert exactement les mêmes trois mois que le billet à 9 € tout en poussant dans l’autre sens, ce qui fait du Deutschlandticket de 2023 le test le plus propre.',
      whenSummer: 'juin → août 2022',
      whenFrom: 'à partir de mai 2023',
      alt: 'Chronologie de trois mesures allemandes sur deux ans : le billet à 9 € et la remise sur la taxe carburant (Tankrabatt), tous deux de juin à août 2022, et le Deutschlandticket à partir de mai 2023.',
    },

    questions: {
      fig: 'fig. 02',
      title: 'Trois questions',
      standfirst: 'La troisième décide si les deux premières veulent dire quelque chose.',
      decides: 'Décide',
      metric: 'Méthode',
      items: {
        q1: {
          q: 'Le NO2 a-t-il baissé pendant l’été à 9 €, au-delà de ce que la météo explique ?',
          decides: 'Si une politique de transport bon marché se voit tout court dans la qualité de l’air, une fois le vent, la pluie et la température retirés.',
          metric: 'Doubles différences sur le NO2 corrigé de la météo',
        },
        q2: {
          q: 'L’effet s’est-il éteint en septembre 2022, puis rallumé en mai 2023 ?',
          decides: 'Si ce qui a bougé suivait la politique ou simplement le calendrier.',
          metric: 'Étude d’événement autour de chaque bascule',
        },
        q3: {
          q: 'Qu’est-ce qui pourrait l’expliquer autrement ?',
          decides: 'Quelle part de l’estimation 2022 revient à la remise sur la taxe carburant, à la reprise post-COVID et à la crise de l’énergie.',
          metric: 'Contrôle synthétique et tests placebo',
        },
      },
    },

    pipeline: {
      fig: 'fig. 03',
      title: 'Comment ça marche',
      standfirst: 'De deux sources publiques à une estimation, chaque étape dans le dépôt.',
      steps: {
        sources: 'AEE + Open-Meteo',
        sourcesNote: 'Qualité de l’air + ERA5',
        extract: 'Pipeline Python',
        extractNote: 'Chargement et contrôles',
        warehouse: 'DuckDB + dbt',
        warehouseNote: 'staging → marts, testé',
        deweather: 'LightGBM',
        deweatherNote: 'Effet de la météo retiré',
        causal: 'Estimation causale',
        causalNote: 'DiD, contrôle synthétique',
        page: 'Cette page',
        pageNote: 'Résultats, une fois réels',
      },
      refresh: 'Données AEE validées, 2018 → 2025. Les données 2026, non validées, sont hors périmètre.',
    },

    decisions: {
      fig: 'fig. 04',
      title: 'Décisions',
      standfirst: 'Écrites au moment où elles sont prises, pas reconstituées après coup.',
      read: 'Lire la fiche ↗',
      caveat: 'Mise en garde',
      items: {
        controls: {
          title: 'Sept pays témoins, choisis par règle',
          body: 'Autriche, Belgique, Suisse, Tchéquie, France, Pays-Bas et Pologne. Un pays devait apporter au moins dix stations éligibles pour être retenu, ce qui a écarté le Danemark et le Luxembourg. L’Espagne a été exclue pour une autre raison : elle a lancé ses propres réductions sur les transports à partir de septembre 2022, ce qui en fait un témoin impur.',
        },
        clock: {
          title: 'Une seule horloge pour toutes les stations',
          body: 'Les fuseaux horaires annoncés dans les métadonnées de l’AEE ne correspondaient pas aux données qu’elles décrivaient. Plutôt que de faire confiance à l’étiquette, chaque station a été recalée empiriquement, en l’appariant à sa plus proche voisine allemande et en lisant le décalage directement dans les données.',
        },
        verified: {
          title: 'Uniquement des données validées',
          body: 'L’analyse principale s’appuie sur les mesures validées de 2018 à 2025. Les données 2026 n’ont pas encore passé la validation de l’AEE : elles sont donc hors périmètre plutôt que mélangées discrètement au reste.',
        },
        confounder: {
          title: 'Le facteur de confusion, dit franchement',
          body: 'La remise sur la taxe carburant a couvert exactement les mêmes mois que le billet à 9 €, et elle pousse dans l’autre sens : un carburant moins cher encourage la voiture. Tout ce qui sera mesuré sur l’été 2022 est donc un effet combiné des deux, et le dire maintenant coûte moins cher que de se le faire reprocher plus tard. Le Deutschlandticket de 2023 est arrivé seul, ce qui en fait le test le plus propre.',
        },
      },
    },


    provisional: {
      label: 'Provisoire',
      text: 'L’analyse n’est pas publiée. Tous les chiffres de cette page sont retenus tant qu’ils ne sont pas définitifs : ils s’affichent sous forme de tiret et les graphiques portent un filigrane indiquant des données fictives.',
      missing: 'Certains fichiers de données ne sont pas chargés : des parties de cette page restent vides.',
    },

    map: {
      fig: 'fig. 05',
      title: 'Où l’on regarde',
      standfirst: 'TODO : une phrase sur le panel de stations et le choix de ces pays.',
      legend: 'Points de pourcentage par rapport à l’attendu',
      note: 'Valeurs descriptives par pays, pas des estimations causales.',
      stations: 'Afficher les stations',
      stationsOff: 'Masquer les stations',
      inStudy: 'Dans l’étude',
      other: 'Hors étude',
      stationCount: 'stations',
      fixtureGeometry: 'Les contours des pays sont provisoires tant que le vrai fichier de frontières n’est pas copié.',
      empty: 'Aucune donnée cartographique chargée.',
      alt: 'Une carte de l’Europe occidentale et centrale. Les huit pays de l’étude sont détourés et teintés selon leur valeur en points de pourcentage par rapport à l’attendu ; tous les autres pays sont en gris. La position des stations peut être affichée sous forme de petits points.',
      types: {
        urban_traffic: 'Urbain trafic',
        urban_background: 'Urbain de fond',
        suburban_background: 'Périurbain de fond',
      },
    },

    counterfactual: {
      fig: 'fig. 07',
      title: 'Le contrefactuel',
      standfirst: 'TODO : une phrase sur ce qu’est le contrôle synthétique et comment le lire.',
      actual: 'Allemagne, observé',
      synthetic: 'Allemagne, synthétique',
      gap: 'Écart',
      caption: 'NO2 mensuel corrigé de la météo pour l’Allemagne face à son contrôle synthétique, fenêtres de politique publique ombrées. Le panneau du bas donne l’écart entre les deux.',
      alt: 'Un graphique en lignes du NO2 mensuel corrigé de la météo pour l’Allemagne et pour son contrôle synthétique, avec les fenêtres du billet à 9 € et du Deutschlandticket ombrées, et un panneau plus petit en dessous montrant l’écart entre les deux séries.',
      weights: 'Poids des donneurs',
      empty: 'Aucune donnée de contrefactuel chargée.',
    },

    event: {
      fig: 'fig. 08',
      title: 'Étude d’événement',
      standfirst: 'TODO : une phrase sur la période de référence et sur ce que signifierait une tendance pré-traitement plate.',
      caption: 'Estimations mensuelles avec intervalles de confiance à 95 %, fenêtres de politique publique ombrées.',
      alt: 'Un graphique d’étude d’événement : une estimation par mois avec son intervalle de confiance à 95 %, tracée par rapport à une ligne zéro, les fenêtres de politique publique étant ombrées.',
      variants: {
        nine_euro: 'Billet à 9 €',
        dticket: 'Deutschlandticket',
      },
      empty: 'Aucune donnée d’étude d’événement chargée.',
    },

    placebo: {
      fig: 'fig. 09',
      title: 'Tests placebo',
      standfirst: 'TODO : une phrase sur la nature des placebos et sur ce qui constituerait un succès.',
      real: 'Allemagne, estimation réelle',
      inSpace: 'Placebo dans l’espace',
      inTime: 'Placebo dans le temps',
      caption: 'Chaque estimation placebo sous forme de point, l’estimation réelle étant signalée.',
      alt: 'Un graphique en bande des estimations placebo, un point par placebo, avec l’estimation réelle pour l’Allemagne signalée à part.',
      empty: 'Aucune donnée de placebo chargée.',
    },

    methods: {
      fig: 'fig. 10',
      title: 'Méthodes',
      standfirst: 'Ce qu’un relecteur demandera, écrit au même endroit.',
      show: 'Afficher',
      hide: 'Masquer',
      items: {
        prereg: {
          title: 'Préenregistrement',
          body: 'TODO : l’ADR-008 a été committé avant toute estimation. Dire ce qui a été fixé à l’avance, ce qui est resté ouvert, et où se trouve le commit.',
        },
        deweathering: {
          title: 'Correction météo',
          body: 'TODO : LightGBM par station, en validation croisée. Dire quelles variables météo, comment les plis sont découpés, et ce qu’est le résidu.',
        },
        data: {
          title: 'Données',
          body: 'TODO : les stations, le filtre qui les a sélectionnées, la fenêtre d’analyse, la grille météo, et ce qui a été exclu.',
        },
        limitations: {
          title: 'Limites',
          body: 'TODO : la remise sur la taxe carburant, la reprise post-COVID, la crise de l’énergie, et ce que ce protocole ne peut pas séparer.',
        },
      },
    },

    results: {
      fig: 'fig. 06',
      title: 'Résultats',
      standfirst: 'TODO : une phrase de cadrage du tableau. Aucune conclusion tant que l’analyse n’est pas publiée.',
      pending: 'En attente',
      awaiting: 'Analyse en cours',
      empty: 'Aucun résultat chargé.',
      cols: {
        label: 'Mesure',
        family: 'Protocole',
        outcome: 'Variable',
        estimate: 'Estimation',
        ci: 'IC à 95 %',
        verdict: 'Verdict',
      },
      families: {
        did: 'Doubles différences',
        synthetic_control: 'Contrôle synthétique',
      },
      labels: {
        nine_euro_ticket: 'Billet à 9 €',
        deutschlandticket: 'Deutschlandticket',
      },
      outcomes: {
        no2_deweathered: 'NO2, corrigé de la météo',
        no2_raw: 'NO2, brut',
      },
      verdicts: {
        inconclusive: 'Non concluant',
        consistent: 'Cohérent',
        not_detected: 'Non détecté',
      },
      stations: 'Stations',
      stationDays: 'Jours-station',
      window: 'Fenêtre',
      grid: 'Grille météo',
    },

    footer: {
      repo: 'Dépôt ↗',
      home: 'Retour à sbaiii.com',
      note: 'Données de qualité de l’air © Agence européenne pour l’environnement (CC BY 4.0). Données météo Open-Meteo.com, ERA5 / Copernicus (CC BY 4.0). La chronologie de cette page montre des dates, pas des mesures.',
    },
  },

  es: {
    lang: { code: 'ES' },
    back: 'Volver al portfolio',
    nav: { home: 'Inicio', repo: 'Repositorio' },

    hero: {
      fig: 'fig. 00',
      kicker: 'Caso práctico',
      title: 'Ticket to Breathe',
      subtitle: 'El experimento de los 9 €',
      hook: '¿Limpió el aire de Alemania un transporte público casi gratis?',
      status: 'En curso',
      repo: 'Ver el repositorio ↗',
      meta: 'Alemania + 7 países de control · NO2 horario, 2018 → 2025 · datos oficiales de la AEMA',
    },

    experiment: {
      fig: 'fig. 01',
      title: 'Un experimento natural',
      p1: 'En junio de 2022 Alemania hizo algo que ningún país hace a propósito. Durante tres meses vendió un único abono, 9 € al mes, válido en todos los trenes regionales, tranvías y autobuses del país. Ochenta millones de personas amanecieron con un transporte prácticamente gratis.',
      p2: 'Y luego se acabó. El abono caducó a finales de agosto de 2022 y las tarifas volvieron a lo de siempre. En mayo de 2023 el Deutschlandticket de 49 € recuperó el transporte barato en todo el país, esta vez para quedarse. Encendido, apagado, encendido otra vez.',
      p3: 'Eso es un experimento natural, y es la razón de ser de este proyecto. Si el transporte barato saca gente del coche de verdad, el NO2, el contaminante más ligado al tráfico rodado, debería bajar en las ciudades alemanas frente a ciudades parecidas del extranjero, y la bajada debería seguir a los interruptores y no al calendario.',
      caption: 'Solo fechas de medidas públicas, nada medido. El Tankrabatt era una rebaja del impuesto a los carburantes: cubrió exactamente los mismos tres meses que el abono de 9 € y empuja en sentido contrario, y por eso el Deutschlandticket de 2023 es la prueba más limpia.',
      whenSummer: 'jun → ago 2022',
      whenFrom: 'desde mayo de 2023',
      alt: 'Cronología de tres medidas alemanas sobre dos años: el abono de 9 € y la rebaja del impuesto a los carburantes (Tankrabatt), ambos de junio a agosto de 2022, y el Deutschlandticket a partir de mayo de 2023.',
    },

    questions: {
      fig: 'fig. 02',
      title: 'Tres preguntas',
      standfirst: 'La tercera decide si las dos primeras significan algo.',
      decides: 'Decide',
      metric: 'Método',
      items: {
        q1: {
          q: '¿Bajó el NO2 durante el verano de los 9 €, más allá de lo que explica el tiempo?',
          decides: 'Si una política de transporte barato llega siquiera a verse en la calidad del aire, una vez descontados viento, lluvia y temperatura.',
          metric: 'Diferencias en diferencias sobre el NO2 corregido por meteorología',
        },
        q2: {
          q: '¿Se apagó el efecto en septiembre de 2022 y volvió en mayo de 2023?',
          decides: 'Si lo que se movió seguía a la política o simplemente al calendario.',
          metric: 'Estudio de eventos en torno a cada cambio',
        },
        q3: {
          q: '¿Cuánto podrían explicar otras cosas?',
          decides: 'Qué parte de la estimación de 2022 corresponde a la rebaja del combustible, a la recuperación pos-COVID y a la crisis energética.',
          metric: 'Control sintético y pruebas placebo',
        },
      },
    },

    pipeline: {
      fig: 'fig. 03',
      title: 'Cómo funciona',
      standfirst: 'De dos fuentes públicas a una estimación, con cada paso en el repositorio.',
      steps: {
        sources: 'AEMA + Open-Meteo',
        sourcesNote: 'Calidad del aire y ERA5',
        extract: 'Pipeline en Python',
        extractNote: 'Descarga y validación',
        warehouse: 'DuckDB + dbt',
        warehouseNote: 'staging → marts, con tests',
        deweather: 'LightGBM',
        deweatherNote: 'Sin efecto del tiempo',
        causal: 'Estimación causal',
        causalNote: 'DiD y control sintético',
        page: 'Esta página',
        pageNote: 'Resultados, cuando existan',
      },
      refresh: 'Datos validados de la AEMA, 2018 → 2025. Los datos de 2026, sin validar, quedan fuera.',
    },

    decisions: {
      fig: 'fig. 04',
      title: 'Decisiones',
      standfirst: 'Escritas cuando se toman, no reconstruidas después.',
      read: 'Leer la ficha ↗',
      caveat: 'Advertencia',
      items: {
        controls: {
          title: 'Siete países de control, elegidos por regla',
          body: 'Austria, Bélgica, Suiza, Chequia, Francia, Países Bajos y Polonia. Un país tenía que aportar al menos diez estaciones válidas para entrar, lo que dejó fuera a Dinamarca y Luxemburgo. España se descartó por otro motivo: puso en marcha sus propios descuentos de transporte desde septiembre de 2022, así que no sirve como control limpio.',
        },
        clock: {
          title: 'Un solo reloj para todas las estaciones',
          body: 'Las zonas horarias que declaraban los metadatos de la AEMA no cuadraban con los datos que describían. En lugar de fiarse de la etiqueta, cada estación se alineó de forma empírica, emparejándola con su estación alemana más cercana y leyendo el desfase en los propios datos.',
        },
        verified: {
          title: 'Solo datos validados',
          body: 'El análisis central usa mediciones validadas de 2018 a 2025. Los datos de 2026 todavía no han pasado la validación de la AEMA, así que quedan fuera del alcance en lugar de colarse sin avisar.',
        },
        confounder: {
          title: 'El factor de confusión, dicho claro',
          body: 'La rebaja del combustible cubrió exactamente los mismos meses que el abono de 9 €, y empuja en sentido contrario: la gasolina barata anima a coger el coche. Todo lo que se mida en el verano de 2022 es, por tanto, un efecto combinado de las dos medidas, y decirlo ahora sale más barato que que te lo digan después. El Deutschlandticket de 2023 llegó solo, y por eso es la prueba más limpia.',
        },
      },
    },


    provisional: {
      label: 'Provisional',
      text: 'El análisis aún no se ha publicado. Todas las cifras de esta página se retienen hasta que sean definitivas: aparecen como un guion y los gráficos llevan una marca de agua que indica datos de prueba.',
      missing: 'Algunos archivos de datos no están cargados, así que partes de esta página quedan vacías.',
    },

    map: {
      fig: 'fig. 05',
      title: 'Dónde miramos',
      standfirst: 'TODO: una frase sobre el panel de estaciones y por qué estos países.',
      legend: 'Puntos porcentuales frente a lo esperado',
      note: 'Valores descriptivos por país, no estimaciones causales.',
      stations: 'Mostrar estaciones',
      stationsOff: 'Ocultar estaciones',
      inStudy: 'En el estudio',
      other: 'Fuera del estudio',
      stationCount: 'estaciones',
      fixtureGeometry: 'Los contornos de los países son provisionales hasta que se copie el archivo de fronteras real.',
      empty: 'No hay datos de mapa cargados.',
      alt: 'Un mapa de Europa occidental y central. Los ocho países del estudio aparecen perfilados y coloreados según su valor en puntos porcentuales frente a lo esperado; el resto de países están en gris. La posición de las estaciones puede activarse como puntos pequeños.',
      types: {
        urban_traffic: 'Urbana de tráfico',
        urban_background: 'Urbana de fondo',
        suburban_background: 'Suburbana de fondo',
      },
    },

    counterfactual: {
      fig: 'fig. 07',
      title: 'El contrafactual',
      standfirst: 'TODO: una frase sobre qué es el control sintético y cómo leerlo.',
      actual: 'Alemania, observado',
      synthetic: 'Alemania, sintético',
      gap: 'Diferencia',
      caption: 'NO2 mensual corregido por meteorología para Alemania frente a su control sintético, con las ventanas de las medidas sombreadas. El panel inferior es la diferencia entre ambos.',
      alt: 'Un gráfico de líneas del NO2 mensual corregido por meteorología para Alemania y para su control sintético, con las ventanas del abono de 9 € y del Deutschlandticket sombreadas, y un panel más pequeño debajo que muestra la diferencia entre ambas series.',
      weights: 'Pesos de los donantes',
      empty: 'No hay datos de contrafactual cargados.',
    },

    event: {
      fig: 'fig. 08',
      title: 'Estudio de eventos',
      standfirst: 'TODO: una frase sobre el periodo de referencia y qué significaría una tendencia previa plana.',
      caption: 'Estimaciones mensuales con intervalos de confianza del 95 %, ventanas de las medidas sombreadas.',
      alt: 'Un gráfico de estudio de eventos: una estimación por mes con su intervalo de confianza del 95 %, trazada frente a una línea de cero, con las ventanas de las medidas sombreadas.',
      variants: {
        nine_euro: 'Abono de 9 €',
        dticket: 'Deutschlandticket',
      },
      empty: 'No hay datos de estudio de eventos cargados.',
    },

    placebo: {
      fig: 'fig. 09',
      title: 'Pruebas placebo',
      standfirst: 'TODO: una frase sobre qué son los placebos y qué contaría como aprobado.',
      real: 'Alemania, estimación real',
      inSpace: 'Placebo en el espacio',
      inTime: 'Placebo en el tiempo',
      caption: 'Cada estimación placebo como un punto, con la estimación real señalada.',
      alt: 'Un gráfico de banda con las estimaciones placebo, un punto por placebo, y la estimación real de Alemania señalada aparte.',
      empty: 'No hay datos de placebo cargados.',
    },

    methods: {
      fig: 'fig. 10',
      title: 'Métodos',
      standfirst: 'Lo que preguntará cualquier revisor, escrito en un solo sitio.',
      show: 'Mostrar',
      hide: 'Ocultar',
      items: {
        prereg: {
          title: 'Registro previo',
          body: 'TODO: el ADR-008 se registró antes de calcular ninguna estimación. Decir qué se fijó de antemano, qué quedó abierto y dónde está el commit.',
        },
        deweathering: {
          title: 'Corrección meteorológica',
          body: 'TODO: LightGBM por estación, con validación cruzada. Decir qué variables meteorológicas, cómo se parten los pliegues y qué es el residuo.',
        },
        data: {
          title: 'Datos',
          body: 'TODO: las estaciones, el filtro que las seleccionó, la ventana de análisis, la malla meteorológica y qué quedó excluido.',
        },
        limitations: {
          title: 'Limitaciones',
          body: 'TODO: la rebaja del impuesto a los carburantes, la recuperación pos-COVID, la crisis energética y lo que este diseño no puede separar.',
        },
      },
    },

    results: {
      fig: 'fig. 06',
      title: 'Resultados',
      standfirst: 'TODO: una frase que enmarque la tabla. Ninguna conclusión hasta que se publique el análisis.',
      pending: 'Pendiente',
      awaiting: 'A la espera del análisis',
      empty: 'No hay resultados cargados.',
      cols: {
        label: 'Medida',
        family: 'Diseño',
        outcome: 'Variable',
        estimate: 'Estimación',
        ci: 'IC del 95 %',
        verdict: 'Veredicto',
      },
      families: {
        did: 'Diferencias en diferencias',
        synthetic_control: 'Control sintético',
      },
      labels: {
        nine_euro_ticket: 'Abono de 9 €',
        deutschlandticket: 'Deutschlandticket',
      },
      outcomes: {
        no2_deweathered: 'NO2, corregido por meteorología',
        no2_raw: 'NO2, bruto',
      },
      verdicts: {
        inconclusive: 'No concluyente',
        consistent: 'Coherente',
        not_detected: 'No detectado',
      },
      stations: 'Estaciones',
      stationDays: 'Días-estación',
      window: 'Ventana',
      grid: 'Malla meteorológica',
    },

    footer: {
      repo: 'Repositorio ↗',
      home: 'Volver a sbaiii.com',
      note: 'Datos de calidad del aire © Agencia Europea de Medio Ambiente (CC BY 4.0). Datos meteorológicos de Open-Meteo.com, ERA5 / Copernicus (CC BY 4.0). La cronología de esta página muestra fechas, no mediciones.',
    },
  },
};

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
      status: 'Shipped',
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
      text: 'The analysis has not shipped. Every number on this page is withheld until it is final, so figures read as a dash and the charts carry a watermark.',
      missing: 'Some data files are not loaded, so parts of this page are empty.',
    },

    map: {
      fig: 'fig. 05',
      title: 'Where we look',
      standfirst: '284 German monitoring stations against 549 in seven neighbours, kept only if they reported at least 75% of hours in 2018, 2019, 2022 and 2023.',
      legend: 'Percentage points vs expected, same season',
      note: 'Descriptive country values, not causal estimates.',
      stations: 'Show stations',
      stationsOff: 'Hide stations',
      inStudy: 'In the study',
      other: 'Not in the study',
      stationCount: 'stations',
      credit: 'Boundaries: Natural Earth, public domain.',
      empty: 'No map data loaded.',
      alt: 'A map of western and central Europe. The eight study countries are outlined and shaded by their value in percentage points against expected; every other country is grey. Station positions can be switched on as small dots.',
      types: {
        traffic: 'Traffic',
        background: 'Background',
      },
    },

    counterfactual: {
      fig: 'fig. 07',
      title: 'The counterfactual',
      standfirst: 'A weighted blend of Belgium, Switzerland, the Netherlands and Czechia that tracks Germany before 2022; where the two lines part, something changed in Germany alone.',
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
      standfirst: 'Each month is the Germany-minus-controls gap against January to May 2022; a policy effect would show as a break at its start date, not a drift that began before it.',
      caption: 'Monthly estimates with 95% confidence intervals, policy windows shaded.',
      alt: 'An event study chart: one estimate per month with a 95% confidence interval, drawn against a zero line, with the policy windows shaded.',
      variants: {
        ref_janmay: 'vs Jan-May 2022',
        season_adjusted: 'Season-adjusted',
      },
      empty: 'No event study data loaded.',
    },

    placebo: {
      fig: 'fig. 09',
      title: 'Placebo tests',
      standfirst: 'The same test run on each control country as if it had the ticket, and on fake dates in 2018-19; a real effect has to stand out from all of them.',
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
          body: 'The analysis plan (ADR-008) was committed on its own before any estimate was run: the outcome, the triple-difference formula with 2018-19 as same-season baselines, the placebo tests and the decision rule. After seeing a provisional result with the wrong sign, the extra checks were logged as post-hoc (ADR-009), and two additions for the final run were declared before it (ADR-010). The git history shows the order.',
        },
        deweathering: {
          title: 'Deweathering',
          body: 'One LightGBM model per station learns hourly NO2 from ERA5 weather (wind, boundary-layer height, temperature, humidity, rain, pressure, sun, cloud), their 3- and 24-hour averages, and the calendar, trained only on pre-policy months. Every pre-policy month is predicted by a model that never saw it (5 folds of whole months, 7-day buffers). The outcome is observed divided by predicted, minus one: negative means less NO2 than the weather and the calendar would explain. Daily out-of-fold R² is 0.59 to 0.77 by country.',
        },
        data: {
          title: 'Data',
          body: 'Verified hourly NO2 from the European Environment Agency (1,955 files, 2.5 GB), 2018-2019 and 2022-2025; 2020-21 left out because of COVID. Urban and suburban traffic and background stations with at least 75% valid hours in 2018, 2019, 2022 and 2023; a control country needs at least 10 such stations, which leaves Austria, Belgium, Switzerland, Czechia, France, the Netherlands and Poland. Weather from Open-Meteo (ERA5) on a 1° grid. Timestamps were aligned to UTC empirically, after the metadata time-zone labels turned out not to match the data.',
        },
        limitations: {
          title: 'Limitations',
          body: 'The Tankrabatt fuel tax cut ran in exactly the same three months as the €9 ticket and pushes the other way, so the 2022 estimate is the two policies combined; five of the seven controls had fuel cuts of their own, which narrows but does not close that gap. Germany\'s NO2 was already falling faster than the controls before 2022, which is why a naive comparison shows a spurious drop. The energy crisis, when gas was replaced by coal, could raise NO2 at background stations; that hypothesis is untested. With one treated country, effects of a few percent cannot be told apart from the spread of the placebo countries.',
        },
      },
    },

    charts: {
      excluded: '2020-21 excluded',
    },
    results: {
      fig: 'fig. 06',
      title: 'Results',
      standfirst: 'Three pre-registered tests, one rule fixed before any estimate: a result counts only if its 95% interval excludes zero and it beats every placebo country.',
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
        primary: 'Primary',
        secondary_a: 'Secondary (a)',
        secondary_b: 'Secondary (b)',
        secondary_c: 'Secondary (c)',
        heterogeneity: 'Heterogeneity',
        exploratory: 'Exploratory',
      },
      labels: {
        nine_euro_ticket: '€9 ticket',
        deutschlandticket: 'Deutschlandticket',
      },
      outcomes: {
        ratio_pct: 'NO2 vs expected',
        resid_ugm3: 'NO2 residual',
        commute_excess: 'Commute excess',
      },
      verdicts: {
        detected: 'Detected',
        not_detected: 'Not detected',
        not_evaluated: 'Not evaluated',
      },
      directions: {
        higher: 'higher than expected',
        lower: 'lower than expected',
      },
      ruleNote: 'Only the pre-registered €9 estimate carries the decision rule. Rows marked "not evaluated" are context, not findings.',
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
      status: 'Publié',
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
      text: 'L’analyse n’est pas publiée. Tous les chiffres de cette page sont retenus tant qu’ils ne sont pas définitifs : ils s’affichent sous forme de tiret et les graphiques portent un filigrane.',
      missing: 'Certains fichiers de données ne sont pas chargés : des parties de cette page restent vides.',
    },

    map: {
      fig: 'fig. 05',
      title: 'Où l’on regarde',
      standfirst: '284 stations de mesure allemandes face à 549 dans sept pays voisins, retenues seulement si elles ont mesuré au moins 75 % des heures en 2018, 2019, 2022 et 2023.',
      legend: 'Points de pourcentage par rapport à l’attendu, même saison',
      note: 'Valeurs descriptives par pays, pas des estimations causales.',
      stations: 'Afficher les stations',
      stationsOff: 'Masquer les stations',
      inStudy: 'Dans l’étude',
      other: 'Hors étude',
      stationCount: 'stations',
      credit: 'Frontières : Natural Earth, domaine public.',
      empty: 'Aucune donnée cartographique chargée.',
      alt: 'Une carte de l’Europe occidentale et centrale. Les huit pays de l’étude sont détourés et teintés selon leur valeur en points de pourcentage par rapport à l’attendu ; tous les autres pays sont en gris. La position des stations peut être affichée sous forme de petits points.',
      types: {
        traffic: 'Trafic',
        background: 'Fond',
      },
    },

    counterfactual: {
      fig: 'fig. 07',
      title: 'Le contrefactuel',
      standfirst: 'Un mélange pondéré de la Belgique, de la Suisse, des Pays-Bas et de la Tchéquie qui suit l\'Allemagne avant 2022 ; là où les deux courbes se séparent, quelque chose a changé en Allemagne seulement.',
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
      standfirst: 'Chaque mois est l\'écart Allemagne moins témoins par rapport à janvier-mai 2022 ; un effet de la mesure apparaîtrait comme une rupture à sa date de départ, pas comme une dérive commencée avant.',
      caption: 'Estimations mensuelles avec intervalles de confiance à 95 %, fenêtres de politique publique ombrées.',
      alt: 'Un graphique d’étude d’événement : une estimation par mois avec son intervalle de confiance à 95 %, tracée par rapport à une ligne zéro, les fenêtres de politique publique étant ombrées.',
      variants: {
        ref_janmay: 'vs janvier-mai 2022',
        season_adjusted: 'Corrigé de la saison',
      },
      empty: 'Aucune donnée d’étude d’événement chargée.',
    },

    placebo: {
      fig: 'fig. 09',
      title: 'Tests placebo',
      standfirst: 'Le même test appliqué à chaque pays témoin comme s\'il avait eu le billet, et à de fausses dates en 2018-2019 ; un vrai effet doit se détacher de tous.',
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
          body: 'Le plan d\'analyse (ADR-008) a été committé seul avant toute estimation : la variable étudiée, la formule en triple différence avec 2018-2019 comme référence saisonnière, les tests placebo et la règle de décision. Après un résultat provisoire de signe inattendu, les contrôles supplémentaires ont été consignés comme post hoc (ADR-009), et deux ajouts pour le calcul final ont été déclarés avant celui-ci (ADR-010). L\'historique git montre l\'ordre.',
        },
        deweathering: {
          title: 'Correction météo',
          body: 'Un modèle LightGBM par station apprend le NO2 horaire à partir de la météo ERA5 (vent, hauteur de la couche limite, température, humidité, pluie, pression, ensoleillement, nébulosité), de ses moyennes sur 3 et 24 heures et du calendrier, entraîné uniquement sur les mois antérieurs aux mesures. Chaque mois antérieur est prédit par un modèle qui ne l\'a jamais vu (5 plis de mois entiers, marges de 7 jours). La variable étudiée est l\'observé divisé par le prédit, moins un : une valeur négative signifie moins de NO2 que la météo et le calendrier ne l\'expliquent. Le R² journalier hors pli va de 0,59 à 0,77 selon le pays.',
        },
        data: {
          title: 'Données',
          body: 'NO2 horaire validé de l\'Agence européenne pour l\'environnement (1 955 fichiers, 2,5 Go), 2018-2019 et 2022-2025 ; 2020-2021 écartés à cause du COVID. Stations urbaines et périurbaines de trafic et de fond avec au moins 75 % d\'heures valides en 2018, 2019, 2022 et 2023 ; un pays témoin doit en compter au moins 10, ce qui retient l\'Autriche, la Belgique, la Suisse, la Tchéquie, la France, les Pays-Bas et la Pologne. Météo Open-Meteo (ERA5) sur une grille de 1°. Les horodatages ont été alignés sur l\'UTC de façon empirique, car les fuseaux indiqués dans les métadonnées ne correspondaient pas aux données.',
        },
        limitations: {
          title: 'Limites',
          body: 'La remise sur la taxe carburant (Tankrabatt) a couvert exactement les mêmes trois mois que le billet à 9 € et pousse en sens inverse : l\'estimation 2022 combine donc les deux mesures ; cinq des sept pays témoins avaient leur propre baisse sur les carburants, ce qui réduit l\'écart sans le combler. Le NO2 allemand baissait déjà plus vite que celui des témoins avant 2022, d\'où la fausse baisse qu\'affiche une comparaison naïve. La crise de l\'énergie, quand le charbon a remplacé le gaz, a pu faire monter le NO2 aux stations de fond ; cette hypothèse n\'est pas testée. Avec un seul pays traité, des effets de quelques pour cent ne se distinguent pas de la dispersion des pays placebo.',
        },
      },
    },

    charts: {
      excluded: '2020-2021 écartés',
    },
    results: {
      fig: 'fig. 06',
      title: 'Résultats',
      standfirst: 'Trois tests préenregistrés, une règle fixée avant toute estimation : un résultat ne compte que si son intervalle à 95 % exclut zéro et qu\'il dépasse chaque pays placebo.',
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
        primary: 'Principal',
        secondary_a: 'Secondaire (a)',
        secondary_b: 'Secondaire (b)',
        secondary_c: 'Secondaire (c)',
        heterogeneity: 'Hétérogénéité',
        exploratory: 'Exploratoire',
      },
      labels: {
        nine_euro_ticket: 'Billet à 9 €',
        deutschlandticket: 'Deutschlandticket',
      },
      outcomes: {
        ratio_pct: 'NO2 par rapport à l’attendu',
        resid_ugm3: 'Résidu de NO2',
        commute_excess: 'Excès aux heures de pointe',
      },
      verdicts: {
        detected: 'Détecté',
        not_detected: 'Non détecté',
        not_evaluated: 'Non évalué',
      },
      directions: {
        higher: 'au-dessus de l’attendu',
        lower: 'en dessous de l’attendu',
      },
      ruleNote: 'Seule l’estimation préenregistrée des 9 € porte la règle de décision. Les lignes « non évalué » sont du contexte, pas des résultats.',
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
      status: 'Publicado',
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
      text: 'El análisis aún no se ha publicado. Todas las cifras de esta página se retienen hasta que sean definitivas: aparecen como un guion y los gráficos llevan una marca de agua.',
      missing: 'Algunos archivos de datos no están cargados, así que partes de esta página quedan vacías.',
    },

    map: {
      fig: 'fig. 05',
      title: 'Dónde miramos',
      standfirst: '284 estaciones de medición alemanas frente a 549 en siete países vecinos, conservadas solo si midieron al menos el 75 % de las horas en 2018, 2019, 2022 y 2023.',
      legend: 'Puntos porcentuales frente a lo esperado, misma estación',
      note: 'Valores descriptivos por país, no estimaciones causales.',
      stations: 'Mostrar estaciones',
      stationsOff: 'Ocultar estaciones',
      inStudy: 'En el estudio',
      other: 'Fuera del estudio',
      stationCount: 'estaciones',
      credit: 'Fronteras: Natural Earth, dominio público.',
      empty: 'No hay datos de mapa cargados.',
      alt: 'Un mapa de Europa occidental y central. Los ocho países del estudio aparecen perfilados y coloreados según su valor en puntos porcentuales frente a lo esperado; el resto de países están en gris. La posición de las estaciones puede activarse como puntos pequeños.',
      types: {
        traffic: 'Tráfico',
        background: 'Fondo',
      },
    },

    counterfactual: {
      fig: 'fig. 07',
      title: 'El contrafactual',
      standfirst: 'Una mezcla ponderada de Bélgica, Suiza, los Países Bajos y Chequia que sigue a Alemania antes de 2022; donde las dos líneas se separan, algo cambió solo en Alemania.',
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
      standfirst: 'Cada mes es la diferencia Alemania menos controles respecto a enero-mayo de 2022; un efecto de la medida aparecería como una ruptura en su fecha de inicio, no como una deriva que empezó antes.',
      caption: 'Estimaciones mensuales con intervalos de confianza del 95 %, ventanas de las medidas sombreadas.',
      alt: 'Un gráfico de estudio de eventos: una estimación por mes con su intervalo de confianza del 95 %, trazada frente a una línea de cero, con las ventanas de las medidas sombreadas.',
      variants: {
        ref_janmay: 'vs enero-mayo 2022',
        season_adjusted: 'Corregido por estación',
      },
      empty: 'No hay datos de estudio de eventos cargados.',
    },

    placebo: {
      fig: 'fig. 09',
      title: 'Pruebas placebo',
      standfirst: 'La misma prueba aplicada a cada país de control como si hubiera tenido el billete, y a fechas falsas de 2018-2019; un efecto real tiene que destacar sobre todos.',
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
          body: 'El plan de análisis (ADR-008) se registró por separado antes de calcular ninguna estimación: la variable, la fórmula de triple diferencia con 2018-2019 como referencia estacional, las pruebas placebo y la regla de decisión. Tras un resultado provisional con el signo contrario, las comprobaciones adicionales se anotaron como post hoc (ADR-009), y dos añadidos para la ejecución final se declararon antes de ella (ADR-010). El historial de git muestra el orden.',
        },
        deweathering: {
          title: 'Corrección meteorológica',
          body: 'Un modelo LightGBM por estación aprende el NO2 horario a partir de la meteorología ERA5 (viento, altura de la capa límite, temperatura, humedad, lluvia, presión, radiación, nubosidad), sus medias de 3 y 24 horas y el calendario, entrenado solo con meses anteriores a las medidas. Cada mes anterior lo predice un modelo que nunca lo vio (5 pliegues de meses completos, márgenes de 7 días). La variable es lo observado entre lo predicho, menos uno: un valor negativo significa menos NO2 del que explican el tiempo y el calendario. El R² diario fuera de pliegue va de 0,59 a 0,77 según el país.',
        },
        data: {
          title: 'Datos',
          body: 'NO2 horario validado de la Agencia Europea de Medio Ambiente (1.955 archivos, 2,5 GB), 2018-2019 y 2022-2025; 2020-2021 quedan fuera por el COVID. Estaciones urbanas y suburbanas de tráfico y de fondo con al menos un 75 % de horas válidas en 2018, 2019, 2022 y 2023; un país de control necesita al menos 10, lo que deja Austria, Bélgica, Suiza, Chequia, Francia, los Países Bajos y Polonia. Meteorología de Open-Meteo (ERA5) en una malla de 1°. Las marcas de tiempo se alinearon con UTC de forma empírica, porque las zonas horarias de los metadatos no coincidían con los datos.',
        },
        limitations: {
          title: 'Limitaciones',
          body: 'La rebaja del impuesto a los carburantes (Tankrabatt) coincidió exactamente con los tres meses del billete de 9 € y empuja en sentido contrario, así que la estimación de 2022 combina ambas medidas; cinco de los siete países de control tuvieron su propia rebaja, lo que reduce esa brecha pero no la cierra. El NO2 alemán ya bajaba más rápido que el de los controles antes de 2022, y por eso una comparación ingenua muestra una caída falsa. La crisis energética, cuando el carbón sustituyó al gas, pudo subir el NO2 en las estaciones de fondo; esa hipótesis no se ha comprobado. Con un solo país tratado, efectos de unos pocos puntos porcentuales no se distinguen de la dispersión de los países placebo.',
        },
      },
    },

    charts: {
      excluded: '2020-2021 excluidos',
    },
    results: {
      fig: 'fig. 06',
      title: 'Resultados',
      standfirst: 'Tres pruebas preregistradas y una regla fijada antes de cualquier estimación: un resultado solo cuenta si su intervalo al 95 % excluye el cero y supera a todos los países placebo.',
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
        primary: 'Principal',
        secondary_a: 'Secundario (a)',
        secondary_b: 'Secundario (b)',
        secondary_c: 'Secundario (c)',
        heterogeneity: 'Heterogeneidad',
        exploratory: 'Exploratorio',
      },
      labels: {
        nine_euro_ticket: 'Abono de 9 €',
        deutschlandticket: 'Deutschlandticket',
      },
      outcomes: {
        ratio_pct: 'NO2 frente a lo esperado',
        resid_ugm3: 'Residuo de NO2',
        commute_excess: 'Exceso en horas punta',
      },
      verdicts: {
        detected: 'Detectado',
        not_detected: 'No detectado',
        not_evaluated: 'No evaluado',
      },
      directions: {
        higher: 'por encima de lo esperado',
        lower: 'por debajo de lo esperado',
      },
      ruleNote: 'Solo la estimación preregistrada de los 9 € lleva la regla de decisión. Las filas «no evaluado» son contexto, no resultados.',
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

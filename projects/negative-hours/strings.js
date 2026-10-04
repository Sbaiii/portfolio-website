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
      standfirst: 'All four questions have their answers. Full years are compared with full years; 2026 is not over, so it appears only against the same dates of earlier years, 1 Jan to 2 Oct.',
      pending: 'Pending',
      awaiting: 'Awaiting analysis',
      answered: 'Answered',
      validated: 'Validated against official statistics. Negative hours match the published German counts for 2019 to 2024 and RTE’s French counts for 2023 to 2025 exactly, and Germany’s 2024 solar capture price lands within a cent of the official market value.',
      notebook: 'See the analysis notebook →',
      notebookModel: 'See the model and notebook →',
      notebookShort: 'See the notebook →',
      answers: {
        q1: {
          summary: 'Rare to routine. 5 of 8 zones topped 500 negative hours in 2025 (NL 584, DE 576, ES 556, BE 519, FR 513); before 2023, no zone ever exceeded 298. Counts use the hourly mean price, the convention of RTE and REE, and match the published French and German figures exactly. North Italy is absent by rule rather than by luck: its day-ahead market accepts no offer below 0 €/MWh, so it cannot go negative.',
          fig1Alt: 'Eight small bar charts, one per bidding zone, showing hours per full year whose hourly mean day-ahead price was below zero, from 2019 to 2025. The Netherlands reaches 584 in 2025, Germany-Luxembourg 576, Spain 556, Belgium 519 and France 513, with Poland on 310 and Portugal on 200. Before 2023 no bar passes 298. Northern Italy is flat at zero in every year.',
          fig1Caption: 'Hours per full year with an hourly mean day-ahead price below 0 €/MWh, by bidding zone. Northern Italy cannot go negative: its market accepts no offer below zero.',
          fig2Alt: 'A slope chart comparing 1 January to 2 October of 2025 and 2026 for each zone, so the part-year is matched against the same dates. Spain rises from 535 to 747 negative hours, Portugal from 190 to 599, France from 493 to 563 and Poland from 305 to 314, while Germany-Luxembourg falls from 525 to 471, the Netherlands from 538 to 388 and Belgium from 488 to 298. Northern Italy stays at zero.',
          fig2Caption: 'Negative hours from 1 January to 2 October, 2025 against 2026. The same dates in both years, because 2026 is not over.',
          fig3Alt: 'A scatter plot of 2025 negative hours against how deep those prices went, one dot per zone. Spain had 556 negative hours but averaged only 2.11 euros below zero; Germany-Luxembourg had a similar 576 and averaged 10.92 below. The Netherlands and Belgium go deeper again, at 12.12 and 14.03 below zero. Portugal is shallowest at 0.97 and Poland deepest on average at 15.72. Northern Italy is absent, having no negative hours at all.',
          fig3Caption: 'Negative hours in 2025 against the average price during those hours, by zone. Labels give each zone’s lowest price of the year.',
          fig4Alt: 'A horizontal bar chart of the share of time priced at or below zero from 1 January to 2 October 2026, split into time below zero and time at exactly zero, measured by price period. Spain leads on 15.5 per cent, then Portugal on 13.2 and France on 12.0, with Germany-Luxembourg on 8.3, the Netherlands on 6.9, Poland on 5.8, Belgium on 5.3 and northern Italy on 0.3. In Spain, Portugal and France 33 to 38 per cent of that time sits at exactly zero, against 13 to 16 per cent in Germany, the Netherlands and Belgium.',
          fig4Caption: 'Share of time priced at or below zero, 1 January to 2 October 2026, split into below zero and exactly zero.',
        },
        q2: {
          summary: 'Yes. In 2025 solar earned only 51% to 59% of the average power price in 5 of 8 zones, France the highest of them at 58.8%, down from 92% to 102% in 2019. Wind held 86% to 97% across the seven zones where it is large enough to compare. Over the same dates of 2026, solar’s capture rate rose in Belgium (47.6% to 55.7%) and Germany (48.0% to 51.8%), and fell in Spain, Portugal, France and Poland.',
          caveat: 'Solar volumes as reported to ENTSO-E. Dutch rooftop solar is largely missing, so the Netherlands is indicative only. North Italy’s wind is 0.3% of its reported generation, too little to compare, so its 102% is left out of the wind range.',
          fig1Alt: 'Eight small bar charts, one per bidding zone, showing the solar capture rate for each full year from 2019 to 2025: what a MWh of solar earned on the day-ahead market as a share of the average price. Belgium falls from 92 per cent to 51, Germany-Luxembourg from 93 to 51, Portugal from 102 to 53, Spain from 102 to 55 and France from 96 to 59. The Netherlands reads 94 down to 61 and Poland 64 in 2025, while northern Italy holds up best at 82. The Dutch and Polish panels carry notes about missing data.',
          fig1Caption: 'Solar capture rate by bidding zone, full years: what a MWh of solar earned on the day-ahead market, as a share of the average price.',
          fig2Alt: 'A slope chart comparing the solar capture rate from 1 January to 2 October of 2025 and 2026. It rose in Germany-Luxembourg from 48.0 to 51.8 per cent, Belgium from 47.6 to 55.7, the Netherlands from 58.4 to 59.0 and northern Italy from 80.3 to 84.6; it fell in Portugal from 51.1 to 50.2, Spain from 54.0 to 50.7, France from 54.8 to 54.0 and Poland from 63.2 to 58.8. No cause is claimed.',
          fig2Caption: 'Solar capture rate from 1 January to 2 October, 2025 against 2026. The same dates in both years. No cause is claimed.',
          fig3Alt: 'Seven small line charts plotting each zone’s solar share of generation against its solar capture rate, one point per year from 2019, with the other zones drawn faintly in grey behind. Every zone slopes downward: as solar takes a larger share, the price it captures falls. Spain is the clearest case, moving from about 6 per cent solar at a 102 per cent capture rate in 2019 to 20 per cent at 55 per cent in 2025. The Netherlands is left out, because ENTSO-E sees only about 2 per cent of Dutch solar.',
          fig3Caption: 'Solar share of reported generation against solar capture rate, one point per year from 2019. Grey lines are the other zones.',
        },
        q3: {
          summary: 'Not where prices go most negative. In 2025 an optimised 1 MW / 2 hour battery trading the day-ahead market could have earned up to €86k per MW in Poland, €76k in Germany and the Netherlands, and €37k in North Italy. What pays is the daily gap between cheap middays and expensive evenings: being paid to charge at negative prices was never more than 11% of a year’s revenue. Over the same dates of 2026, a battery earned more than in 2025 in all 8 zones, by 23% to 52%, or 16% to 42% once 2026 is re-solved on hourly prices.',
          caveat: 'Upper bound: day-ahead market only, perfect knowledge of cleared prices. Excludes intraday, balancing and capacity markets, degradation and grid fees. Not investment advice.',
          fig1Alt: 'A horizontal bar chart ranking what a 1 MW, 2 MWh battery could have earned from day-ahead arbitrage in 2025, by bidding zone. Poland leads on 85.6 thousand euros per MW, then Germany-Luxembourg and the Netherlands on 76.1 each, Belgium on 68.2, Spain on 60.7, Portugal on 58.9, France on 55.3 and northern Italy last on 36.6. A tick on each bar marks what a simple rule of thumb would have earned, and it falls short everywhere.',
          fig1Caption: 'What a 1 MW / 2 MWh battery could have earned from day-ahead arbitrage in 2025, at most one cycle a day and 88% round trip. Bars are the optimal schedule, ticks the rule of thumb.',
          fig2Alt: 'A slope chart comparing day-ahead arbitrage revenue from 1 January to 2 October of 2025 and 2026 for a 2-hour battery. Every zone earned more in 2026: France by 52 per cent, northern Italy 39, Spain 32, Portugal 30, Belgium 27, Poland and Germany-Luxembourg 25 each, and the Netherlands 23. A separate mark shows 2026 re-solved on hourly prices, where the gains fall to 16 to 42 per cent, so 15-minute products account for 2 to 10 points of the rise.',
          fig2Caption: 'Day-ahead arbitrage revenue per MW from 1 January to 2 October, 2025 against 2026, with 2026 also re-solved on hourly prices.',
          fig3Alt: 'A scatter plot of battery revenue against negative-price hours, one dot per zone and full year from 2019 to 2025. More negative hours generally went with more revenue, at a correlation of 0.40 across all 55 points and 0.76 once 2022 is set aside. The 2022 points are ringed and sit well above the rest: the energy crisis brought very high prices and few negative hours, so revenue was high for the opposite reason.',
          fig3Caption: 'Battery revenue against negative-price hours, one point per zone and full year. Association only: coupled zones move together and both series trend upward.',
        },
        q4: {
          summary: 'At midday, no longer at night. In 2019 the cheapest hour was 03:00 or 04:00 in every zone; in 2025 it was 12:00 to 14:00. Charging in the cheapest block of each day instead of plugging in at 18:00 cut wholesale cost by 67% to 74% in 7 of 8 zones. In Spain, charging overnight in summer 2025 cost 52.8% more than charging at 18:00.',
          caveat: 'Wholesale day-ahead cost only, for 10 kWh a day. Excludes retail margin, taxes and grid fees, so these are not household bills.',
          fig1Alt: 'A slope chart with one row per bidding zone, marking the hour of the day with the lowest average day-ahead price in 2019 as a hollow circle and in 2025 as a filled one. Every zone moves from the small hours to the middle of the day: 03:00 in 2019 for Germany-Luxembourg, Portugal and Poland and 04:00 for the rest, against 12:00 for Poland in 2025, 13:00 for Germany-Luxembourg, the Netherlands, Belgium, Portugal and northern Italy, and 14:00 for France and Spain. Poland is marked with an asterisk because its first year is 2020, earlier prices having been quoted in zloty.',
          fig1Caption: 'Hour of the day with the lowest average day-ahead price, local time, 2019 against 2025. Poland starts from 2020.',
          fig2Alt: 'A horizontal bar chart of what an electric car would have saved in 2025 by charging in the cheapest block of each day instead of plugging in at 18:00, for 10 kWh a day at 7 kW. Poland saves 368 euros a year, 67 per cent of its 547 euro cost at 18:00, then Germany-Luxembourg 338 or 72 per cent, the Netherlands 333 or 74 per cent, Belgium 300 or 72 per cent, Portugal 252 or 72 per cent, France 220 or 72 per cent, northern Italy 198 or 39 per cent, and Spain 182 or 67 per cent. A tick marks the smaller saving from charging overnight instead.',
          fig2Caption: 'Wholesale saving per car per year in 2025 from charging in the cheapest block of the day rather than at 18:00, for 10 kWh a day at 7 kW. Ticks mark the overnight strategy.',
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
      standfirst: 'Les quatre questions ont leur réponse. Les années complètes sont comparées à des années complètes ; 2026 n’est pas terminée, elle n’apparaît donc que face aux mêmes dates des années précédentes, du 1er janvier au 2 octobre.',
      pending: 'En attente',
      awaiting: 'Analyse en cours',
      answered: 'Répondue',
      validated: 'Validé face aux statistiques officielles. Les heures négatives correspondent exactement aux comptages allemands publiés pour 2019 à 2024 et à ceux de RTE pour la France de 2023 à 2025, et le prix de captation du solaire allemand en 2024 tombe à un centime près de la valeur de marché officielle.',
      notebook: 'Voir le notebook d’analyse →',
      notebookModel: 'Voir le modèle et le notebook →',
      notebookShort: 'Voir le notebook →',
      answers: {
        q1: {
          summary: 'De rare à courant. 5 zones sur 8 ont dépassé 500 heures négatives en 2025 (PB 584, DE 576, ES 556, BE 519, FR 513) ; avant 2023, aucune zone n’avait jamais dépassé 298. Les comptages utilisent le prix moyen horaire, la convention de RTE et de REE, et correspondent exactement aux chiffres publiés en France et en Allemagne. L’Italie du Nord est absente par règle et non par chance : son marché day-ahead n’accepte aucune offre sous 0 €/MWh, elle ne peut donc pas passer en négatif.',
          fig1Alt: 'Huit petits graphiques en barres, un par zone de marché, donnant le nombre d’heures par année complète dont le prix day-ahead moyen horaire était sous zéro, de 2019 à 2025. Les Pays-Bas atteignent 584 en 2025, l’Allemagne-Luxembourg 576, l’Espagne 556, la Belgique 519 et la France 513, la Pologne 310 et le Portugal 200. Avant 2023, aucune barre ne dépasse 298. L’Italie du Nord reste à zéro toutes les années.',
          fig1Caption: 'Heures par année complète avec un prix day-ahead moyen horaire sous 0 €/MWh, par zone de marché. L’Italie du Nord ne peut pas passer en négatif : son marché n’accepte aucune offre sous zéro.',
          fig2Alt: 'Un graphique en pente comparant le 1er janvier au 2 octobre de 2025 et de 2026 pour chaque zone, afin que l’année partielle soit mise en regard des mêmes dates. L’Espagne passe de 535 à 747 heures négatives, le Portugal de 190 à 599, la France de 493 à 563 et la Pologne de 305 à 314, tandis que l’Allemagne-Luxembourg recule de 525 à 471, les Pays-Bas de 538 à 388 et la Belgique de 488 à 298. L’Italie du Nord reste à zéro.',
          fig2Caption: 'Heures négatives du 1er janvier au 2 octobre, 2025 face à 2026. Les mêmes dates dans les deux années, puisque 2026 n’est pas terminée.',
          fig3Alt: 'Un nuage de points croisant les heures négatives de 2025 et la profondeur de ces prix, un point par zone. L’Espagne compte 556 heures négatives mais une moyenne de seulement 2,11 euros sous zéro ; l’Allemagne-Luxembourg en compte 576 pour une moyenne de 10,92 sous zéro. Les Pays-Bas et la Belgique descendent plus bas encore, à 12,12 et 14,03 sous zéro. Le Portugal est le moins profond à 0,97 et la Pologne la plus profonde en moyenne à 15,72. L’Italie du Nord est absente, faute d’heures négatives.',
          fig3Caption: 'Heures négatives en 2025 rapportées au prix moyen pendant ces heures, par zone. Les étiquettes donnent le plus bas de l’année pour chaque zone.',
          fig4Alt: 'Un graphique en barres horizontales de la part du temps coté à zéro ou en dessous du 1er janvier au 2 octobre 2026, séparant le temps sous zéro et le temps à exactement zéro, mesuré par période de prix. L’Espagne arrive en tête avec 15,5 %, puis le Portugal avec 13,2 % et la France avec 12,0 %, devant l’Allemagne-Luxembourg à 8,3 %, les Pays-Bas à 6,9 %, la Pologne à 5,8 %, la Belgique à 5,3 % et l’Italie du Nord à 0,3 %. En Espagne, au Portugal et en France, 33 à 38 % de ce temps est à exactement zéro, contre 13 à 16 % en Allemagne, aux Pays-Bas et en Belgique.',
          fig4Caption: 'Part du temps coté à zéro ou en dessous, du 1er janvier au 2 octobre 2026, séparant sous zéro et exactement zéro.',
        },
        q2: {
          summary: 'Oui. En 2025, le solaire n’a capté que 51 % à 59 % du prix moyen de l’électricité dans 5 zones sur 8, la France étant la plus haute d’entre elles à 58,8 %, contre 92 % à 102 % en 2019. L’éolien s’est maintenu entre 86 % et 97 % dans les sept zones où il pèse assez pour être comparé. Sur les mêmes dates de 2026, le taux de captation du solaire a progressé en Belgique (47,6 % à 55,7 %) et en Allemagne (48,0 % à 51,8 %), et reculé en Espagne, au Portugal, en France et en Pologne.',
          caveat: 'Volumes solaires tels que déclarés à ENTSO-E. Le solaire résidentiel néerlandais est en grande partie absent : les Pays-Bas ne sont donc donnés qu’à titre indicatif. L’éolien de l’Italie du Nord représente 0,3 % de sa production déclarée, trop peu pour être comparé : ses 102 % sont écartés de la fourchette éolienne.',
          fig1Alt: 'Huit petits graphiques en barres, un par zone de marché, donnant le taux de captation du solaire pour chaque année complète de 2019 à 2025 : ce qu’un MWh solaire a gagné sur le marché day-ahead, en part du prix moyen. La Belgique passe de 92 % à 51 %, l’Allemagne-Luxembourg de 93 à 51, le Portugal de 102 à 53, l’Espagne de 102 à 55 et la France de 96 à 59. Les Pays-Bas vont de 94 à 61 et la Pologne à 64 en 2025, tandis que l’Italie du Nord résiste le mieux à 82. Les panneaux néerlandais et polonais portent une note sur les données manquantes.',
          fig1Caption: 'Taux de captation du solaire par zone de marché, années complètes : ce qu’un MWh solaire a gagné sur le marché day-ahead, en part du prix moyen.',
          fig2Alt: 'Un graphique en pente comparant le taux de captation du solaire du 1er janvier au 2 octobre de 2025 et de 2026. Il progresse en Allemagne-Luxembourg de 48,0 à 51,8 %, en Belgique de 47,6 à 55,7, aux Pays-Bas de 58,4 à 59,0 et en Italie du Nord de 80,3 à 84,6 ; il recule au Portugal de 51,1 à 50,2, en Espagne de 54,0 à 50,7, en France de 54,8 à 54,0 et en Pologne de 63,2 à 58,8. Aucune cause n’est avancée.',
          fig2Caption: 'Taux de captation du solaire du 1er janvier au 2 octobre, 2025 face à 2026. Les mêmes dates dans les deux années. Aucune cause n’est avancée.',
          fig3Alt: 'Sept petits graphiques en lignes croisant, pour chaque zone, la part du solaire dans la production et son taux de captation, un point par année depuis 2019, les autres zones étant tracées en gris clair en arrière-plan. Toutes les zones descendent : plus la part du solaire augmente, moins le prix qu’il capte est élevé. L’Espagne est le cas le plus net, passant d’environ 6 % de solaire à un taux de 102 % en 2019 à 20 % à 55 % en 2025. Les Pays-Bas sont absents, ENTSO-E ne voyant qu’environ 2 % du solaire néerlandais.',
          fig3Caption: 'Part du solaire dans la production déclarée rapportée au taux de captation du solaire, un point par année depuis 2019. Les lignes grises sont les autres zones.',
        },
        q3: {
          summary: 'Pas là où les prix descendent le plus bas. En 2025, une batterie optimisée de 1 MW / 2 heures sur le marché day-ahead aurait pu gagner jusqu’à 86 k€ par MW en Pologne, 76 k€ en Allemagne et aux Pays-Bas, et 37 k€ en Italie du Nord. Ce qui paie, c’est l’écart quotidien entre des midis bon marché et des soirées chères : être payé pour se charger à prix négatif n’a jamais dépassé 11 % du revenu annuel d’une zone. Sur les mêmes dates de 2026, une batterie a gagné plus qu’en 2025 dans les 8 zones, de 23 % à 52 %, ou de 16 % à 42 % une fois 2026 recalculée sur des prix horaires.',
          caveat: 'Borne supérieure : marché day-ahead uniquement, connaissance parfaite des prix fixés. Hors marchés infrajournalier, d’équilibrage et de capacité, hors dégradation et frais de réseau. Ceci n’est pas un conseil en investissement.',
          fig1Alt: 'Un graphique en barres horizontales classant ce qu’une batterie de 1 MW et 2 MWh aurait pu gagner en arbitrage day-ahead en 2025, par zone de marché. La Pologne arrive en tête avec 85,6 milliers d’euros par MW, puis l’Allemagne-Luxembourg et les Pays-Bas à 76,1 chacun, la Belgique à 68,2, l’Espagne à 60,7, le Portugal à 58,9, la France à 55,3 et l’Italie du Nord en dernier à 36,6. Un trait sur chaque barre indique ce qu’aurait rapporté une règle simple, et il reste partout en deçà.',
          fig1Caption: 'Ce qu’une batterie de 1 MW / 2 MWh aurait pu gagner en arbitrage day-ahead en 2025, au plus un cycle par jour et 88 % de rendement aller-retour. Les barres donnent le programme optimal, les traits la règle empirique.',
          fig2Alt: 'Un graphique en pente comparant le revenu d’arbitrage day-ahead du 1er janvier au 2 octobre de 2025 et de 2026 pour une batterie de 2 heures. Toutes les zones gagnent plus en 2026 : la France de 52 %, l’Italie du Nord de 39, l’Espagne de 32, le Portugal de 30, la Belgique de 27, la Pologne et l’Allemagne-Luxembourg de 25 chacune, et les Pays-Bas de 23. Un repère distinct montre 2026 recalculée sur des prix horaires, où les gains retombent entre 16 et 42 %, les produits au quart d’heure expliquant donc 2 à 10 points de la hausse.',
          fig2Caption: 'Revenu d’arbitrage day-ahead par MW du 1er janvier au 2 octobre, 2025 face à 2026, avec 2026 également recalculée sur des prix horaires.',
          fig3Alt: 'Un nuage de points croisant le revenu de la batterie et le nombre d’heures à prix négatif, un point par zone et par année complète de 2019 à 2025. Plus d’heures négatives va généralement de pair avec plus de revenu, pour une corrélation de 0,40 sur les 55 points et de 0,76 une fois 2022 mis de côté. Les points de 2022 sont entourés et se détachent nettement vers le haut : la crise de l’énergie a amené des prix très élevés et peu d’heures négatives.',
          fig3Caption: 'Revenu de la batterie rapporté aux heures à prix négatif, un point par zone et par année complète. Simple association : les zones couplées bougent ensemble et les deux séries progressent dans le temps.',
        },
        q4: {
          summary: 'À midi, et non plus la nuit. En 2019, l’heure la moins chère était 03h00 ou 04h00 dans toutes les zones ; en 2025, c’est entre 12h00 et 14h00. Charger sur le créneau le moins cher de la journée plutôt que de brancher à 18h00 a réduit le coût de gros de 67 % à 74 % dans 7 zones sur 8. En Espagne, charger la nuit pendant l’été 2025 a coûté 52,8 % de plus que charger à 18h00.',
          caveat: 'Coût de gros day-ahead uniquement, pour 10 kWh par jour. Hors marge de détail, taxes et frais de réseau : ce ne sont donc pas des factures de ménage.',
          fig1Alt: 'Un graphique en pente avec une ligne par zone de marché, marquant l’heure de la journée au prix day-ahead moyen le plus bas en 2019 par un cercle vide et en 2025 par un cercle plein. Toutes les zones passent du milieu de la nuit au milieu de la journée : 03h00 en 2019 pour l’Allemagne-Luxembourg, le Portugal et la Pologne et 04h00 pour les autres, contre 12h00 pour la Pologne en 2025, 13h00 pour l’Allemagne-Luxembourg, les Pays-Bas, la Belgique, le Portugal et l’Italie du Nord, et 14h00 pour la France et l’Espagne. La Pologne porte un astérisque car sa première année est 2020, les prix antérieurs étant libellés en zloty.',
          fig1Caption: 'Heure de la journée au prix day-ahead moyen le plus bas, heure locale, 2019 face à 2025. La Pologne part de 2020.',
          fig2Alt: 'Un graphique en barres horizontales de ce qu’une voiture électrique aurait économisé en 2025 en chargeant sur le créneau le moins cher de chaque journée plutôt qu’en branchant à 18h00, pour 10 kWh par jour à 7 kW. La Pologne économise 368 euros par an, soit 67 % de son coût de 547 euros à 18h00, puis l’Allemagne-Luxembourg 338 ou 72 %, les Pays-Bas 333 ou 74 %, la Belgique 300 ou 72 %, le Portugal 252 ou 72 %, la France 220 ou 72 %, l’Italie du Nord 198 ou 39 %, et l’Espagne 182 ou 67 %. Un trait indique l’économie plus faible obtenue en chargeant la nuit.',
          fig2Caption: 'Économie de gros par voiture et par an en 2025 en chargeant sur le créneau le moins cher de la journée plutôt qu’à 18h00, pour 10 kWh par jour à 7 kW. Les traits indiquent la stratégie de nuit.',
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
      standfirst: 'Las cuatro preguntas ya tienen respuesta. Los años completos se comparan con años completos; 2026 no ha terminado, así que solo aparece frente a las mismas fechas de años anteriores, del 1 de enero al 2 de octubre.',
      pending: 'Pendiente',
      awaiting: 'A la espera del análisis',
      answered: 'Respondida',
      validated: 'Validado frente a estadísticas oficiales. Las horas negativas coinciden exactamente con los recuentos alemanes publicados de 2019 a 2024 y con los de RTE para Francia de 2023 a 2025, y el precio de captura de la solar alemana en 2024 queda a un céntimo del valor de mercado oficial.',
      notebook: 'Ver el cuaderno de análisis →',
      notebookModel: 'Ver el modelo y el cuaderno →',
      notebookShort: 'Ver el cuaderno →',
      answers: {
        q1: {
          summary: 'De raro a habitual. 5 de las 8 zonas superaron las 500 horas negativas en 2025 (PB 584, DE 576, ES 556, BE 519, FR 513); antes de 2023, ninguna zona había pasado nunca de 298. Los recuentos usan el precio medio horario, la convención de RTE y REE, y coinciden exactamente con las cifras publicadas en Francia y Alemania. El norte de Italia falta por norma y no por suerte: su mercado day-ahead no acepta ofertas por debajo de 0 €/MWh, así que no puede entrar en negativo.',
          fig1Alt: 'Ocho gráficos de barras pequeños, uno por zona de mercado, con las horas de cada año completo cuyo precio day-ahead medio horario estuvo por debajo de cero, de 2019 a 2025. Países Bajos llega a 584 en 2025, Alemania-Luxemburgo a 576, España a 556, Bélgica a 519 y Francia a 513, con Polonia en 310 y Portugal en 200. Antes de 2023 ninguna barra pasa de 298. El norte de Italia se queda en cero todos los años.',
          fig1Caption: 'Horas por año completo con un precio day-ahead medio horario por debajo de 0 €/MWh, por zona de mercado. El norte de Italia no puede entrar en negativo: su mercado no acepta ofertas por debajo de cero.',
          fig2Alt: 'Un gráfico de pendiente que compara del 1 de enero al 2 de octubre de 2025 y de 2026 en cada zona, para que el año parcial se mida contra las mismas fechas. España sube de 535 a 747 horas negativas, Portugal de 190 a 599, Francia de 493 a 563 y Polonia de 305 a 314, mientras que Alemania-Luxemburgo baja de 525 a 471, Países Bajos de 538 a 388 y Bélgica de 488 a 298. El norte de Italia se mantiene en cero.',
          fig2Caption: 'Horas negativas del 1 de enero al 2 de octubre, 2025 frente a 2026. Las mismas fechas en ambos años, porque 2026 no ha terminado.',
          fig3Alt: 'Un diagrama de dispersión que cruza las horas negativas de 2025 con lo profundos que fueron esos precios, un punto por zona. España tuvo 556 horas negativas pero una media de solo 2,11 euros bajo cero; Alemania-Luxemburgo tuvo 576 con una media de 10,92 bajo cero. Países Bajos y Bélgica bajan todavía más, a 12,12 y 14,03 bajo cero. Portugal es la menos profunda con 0,97 y Polonia la más profunda de media con 15,72. El norte de Italia no aparece, al no tener horas negativas.',
          fig3Caption: 'Horas negativas en 2025 frente al precio medio durante esas horas, por zona. Las etiquetas dan el mínimo del año de cada zona.',
          fig4Alt: 'Un gráfico de barras horizontales con la proporción de tiempo a cero o por debajo del 1 de enero al 2 de octubre de 2026, separando el tiempo por debajo de cero y el tiempo a exactamente cero, medido por periodo de precio. España encabeza con el 15,5 %, seguida de Portugal con el 13,2 % y Francia con el 12,0 %, por delante de Alemania-Luxemburgo con el 8,3 %, Países Bajos con el 6,9 %, Polonia con el 5,8 %, Bélgica con el 5,3 % y el norte de Italia con el 0,3 %. En España, Portugal y Francia entre el 33 y el 38 % de ese tiempo está a exactamente cero, frente al 13 a 16 % en Alemania, Países Bajos y Bélgica.',
          fig4Caption: 'Proporción de tiempo a cero o por debajo, del 1 de enero al 2 de octubre de 2026, separando por debajo de cero y exactamente cero.',
        },
        q2: {
          summary: 'Sí. En 2025 la solar solo capturó entre el 51 % y el 59 % del precio medio de la electricidad en 5 de las 8 zonas, con Francia como la más alta de ellas en el 58,8 %, frente al 92 % a 102 % de 2019. La eólica se mantuvo entre el 86 % y el 97 % en las siete zonas donde pesa lo suficiente para compararla. En las mismas fechas de 2026, la tasa de captura solar subió en Bélgica (del 47,6 % al 55,7 %) y Alemania (del 48,0 % al 51,8 %), y bajó en España, Portugal, Francia y Polonia.',
          caveat: 'Volúmenes solares según lo declarado a ENTSO-E. La solar residencial neerlandesa falta en gran medida, así que los Países Bajos son solo indicativos. La eólica del norte de Italia es el 0,3 % de su generación declarada, demasiado poco para compararla, así que su 102 % queda fuera del rango eólico.',
          fig1Alt: 'Ocho gráficos de barras pequeños, uno por zona de mercado, con la tasa de captura solar de cada año completo de 2019 a 2025: lo que un MWh solar ganó en el mercado day-ahead como proporción del precio medio. Bélgica cae del 92 % al 51 %, Alemania-Luxemburgo del 93 al 51, Portugal del 102 al 53, España del 102 al 55 y Francia del 96 al 59. Países Bajos va del 94 al 61 y Polonia al 64 en 2025, mientras que el norte de Italia aguanta mejor en el 82. Los paneles neerlandés y polaco llevan una nota sobre datos que faltan.',
          fig1Caption: 'Tasa de captura solar por zona de mercado, años completos: lo que un MWh solar ganó en el mercado day-ahead, como proporción del precio medio.',
          fig2Alt: 'Un gráfico de pendiente que compara la tasa de captura solar del 1 de enero al 2 de octubre de 2025 y de 2026. Sube en Alemania-Luxemburgo del 48,0 al 51,8 %, en Bélgica del 47,6 al 55,7, en Países Bajos del 58,4 al 59,0 y en el norte de Italia del 80,3 al 84,6; baja en Portugal del 51,1 al 50,2, en España del 54,0 al 50,7, en Francia del 54,8 al 54,0 y en Polonia del 63,2 al 58,8. No se afirma ninguna causa.',
          fig2Caption: 'Tasa de captura solar del 1 de enero al 2 de octubre, 2025 frente a 2026. Las mismas fechas en ambos años. No se afirma ninguna causa.',
          fig3Alt: 'Siete gráficos de líneas pequeños que cruzan, para cada zona, la proporción de solar en la generación y su tasa de captura, un punto por año desde 2019, con las demás zonas dibujadas en gris claro al fondo. Todas las zonas bajan: cuanta más generación aporta la solar, menos precio captura. España es el caso más claro, pasando de alrededor del 6 % de solar con una tasa del 102 % en 2019 al 20 % con el 55 % en 2025. Los Países Bajos quedan fuera, porque ENTSO-E solo ve en torno al 2 % de la solar neerlandesa.',
          fig3Caption: 'Proporción de solar en la generación declarada frente a la tasa de captura solar, un punto por año desde 2019. Las líneas grises son las demás zonas.',
        },
        q3: {
          summary: 'No donde los precios bajan más. En 2025 una batería optimizada de 1 MW / 2 horas operando en el mercado day-ahead habría podido ganar hasta 86 k€ por MW en Polonia, 76 k€ en Alemania y Países Bajos, y 37 k€ en el norte de Italia. Lo que paga es la diferencia diaria entre mediodías baratos y tardes caras: cobrar por cargar a precios negativos nunca pasó del 11 % de los ingresos anuales de una zona. En las mismas fechas de 2026, una batería ganó más que en 2025 en las 8 zonas, entre un 23 % y un 52 %, o entre un 16 % y un 42 % una vez recalculado 2026 con precios horarios.',
          caveat: 'Cota superior: solo mercado day-ahead y conocimiento perfecto de los precios casados. Excluye los mercados intradiario, de balance y de capacidad, la degradación y los peajes de red. Esto no es asesoramiento de inversión.',
          fig1Alt: 'Un gráfico de barras horizontales que ordena lo que una batería de 1 MW y 2 MWh habría podido ganar con arbitraje day-ahead en 2025, por zona de mercado. Polonia encabeza con 85,6 miles de euros por MW, seguida de Alemania-Luxemburgo y Países Bajos con 76,1 cada una, Bélgica con 68,2, España con 60,7, Portugal con 58,9, Francia con 55,3 y el norte de Italia en último lugar con 36,6. Una marca en cada barra señala lo que habría dado una regla sencilla, y en todas se queda por debajo.',
          fig1Caption: 'Lo que una batería de 1 MW / 2 MWh habría podido ganar con arbitraje day-ahead en 2025, como mucho un ciclo al día y 88 % de rendimiento de ida y vuelta. Las barras son el programa óptimo, las marcas la regla aproximada.',
          fig2Alt: 'Un gráfico de pendiente que compara los ingresos de arbitraje day-ahead del 1 de enero al 2 de octubre de 2025 y de 2026 para una batería de 2 horas. Todas las zonas ganan más en 2026: Francia un 52 %, el norte de Italia un 39, España un 32, Portugal un 30, Bélgica un 27, Polonia y Alemania-Luxemburgo un 25 cada una, y Países Bajos un 23. Una marca aparte muestra 2026 recalculado con precios horarios, donde las subidas caen al 16 a 42 %, así que los productos de quince minutos explican entre 2 y 10 puntos del aumento.',
          fig2Caption: 'Ingresos de arbitraje day-ahead por MW del 1 de enero al 2 de octubre, 2025 frente a 2026, con 2026 recalculado también con precios horarios.',
          fig3Alt: 'Un diagrama de dispersión que cruza los ingresos de la batería con las horas de precio negativo, un punto por zona y año completo de 2019 a 2025. Más horas negativas suelen ir con más ingresos, con una correlación de 0,40 en los 55 puntos y de 0,76 dejando fuera 2022. Los puntos de 2022 van rodeados y quedan muy por encima del resto: la crisis energética trajo precios muy altos y pocas horas negativas.',
          fig3Caption: 'Ingresos de la batería frente a las horas de precio negativo, un punto por zona y año completo. Solo asociación: las zonas acopladas se mueven juntas y ambas series crecen con el tiempo.',
        },
        q4: {
          summary: 'A mediodía, ya no de noche. En 2019 la hora más barata eran las 03:00 o las 04:00 en todas las zonas; en 2025 está entre las 12:00 y las 14:00. Cargar en el bloque más barato de cada día en lugar de enchufar a las 18:00 redujo el coste mayorista entre un 67 % y un 74 % en 7 de las 8 zonas. En España, cargar de noche durante el verano de 2025 costó un 52,8 % más que cargar a las 18:00.',
          caveat: 'Solo coste mayorista day-ahead, para 10 kWh al día. Excluye margen minorista, impuestos y peajes de red, así que no son facturas domésticas.',
          fig1Alt: 'Un gráfico de pendiente con una fila por zona de mercado, que marca la hora del día con el precio day-ahead medio más bajo en 2019 con un círculo hueco y en 2025 con uno relleno. Todas las zonas pasan de la madrugada al centro del día: las 03:00 en 2019 para Alemania-Luxemburgo, Portugal y Polonia y las 04:00 para el resto, frente a las 12:00 para Polonia en 2025, las 13:00 para Alemania-Luxemburgo, Países Bajos, Bélgica, Portugal y el norte de Italia, y las 14:00 para Francia y España. Polonia lleva un asterisco porque su primer año es 2020, ya que los precios anteriores estaban en zlotys.',
          fig1Caption: 'Hora del día con el precio day-ahead medio más bajo, hora local, 2019 frente a 2025. Polonia arranca en 2020.',
          fig2Alt: 'Un gráfico de barras horizontales con lo que un coche eléctrico habría ahorrado en 2025 cargando en el bloque más barato de cada día en lugar de enchufar a las 18:00, para 10 kWh al día a 7 kW. Polonia ahorra 368 euros al año, el 67 % de su coste de 547 euros a las 18:00, seguida de Alemania-Luxemburgo con 338 o el 72 %, Países Bajos con 333 o el 74 %, Bélgica con 300 o el 72 %, Portugal con 252 o el 72 %, Francia con 220 o el 72 %, el norte de Italia con 198 o el 39 %, y España con 182 o el 67 %. Una marca señala el ahorro menor de cargar de noche.',
          fig2Caption: 'Ahorro mayorista por coche y año en 2025 al cargar en el bloque más barato del día en lugar de a las 18:00, para 10 kWh al día a 7 kW. Las marcas indican la estrategia nocturna.',
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

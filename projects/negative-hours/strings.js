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
      standfirst: 'All four questions have their answers. Every number here came out of the pipeline in fig. 03, and nothing was filled in until it was real.',
      pending: 'Pending',
      awaiting: 'Awaiting analysis',
      answered: 'Answered',
      notebook: 'See the analysis notebook →',
      notebookModel: 'See the model and notebook →',
      notebookShort: 'See the notebook →',
      answers: {
        q1: {
          summary: 'Negative prices went from rare to routine: 5 of 8 European zones topped 500 negative-price hours in 2025, up from at most 112 in 2022. Spain and Portugal now hit zero or below most often, but their negative prices are shallow; Germany, the Netherlands and Belgium go much deeper.',
          fig1Alt: 'Eight small bar charts, one per bidding zone, showing hours per year with a day-ahead price below zero from 2019 to 2026. The Netherlands, Germany-Luxembourg, Spain, Belgium and France all pass 500 hours in 2025, Poland reaches 311 and Portugal 198, and northern Italy records none in any year. The 2026 bars are drawn hollow because the year is incomplete.',
          fig1Caption: 'Hours per year with a day-ahead price below 0 €/MWh, by bidding zone. The hollow 2026 bar is the year to date.',
          fig2Alt: 'A scatter plot of 2025 negative-price hours against how deep those prices went, one dot per bidding zone. The horizontal axis counts hours with a price below zero and the vertical axis is the average price during those hours. Spain had 552 negative hours but averaged only 2.11 euros below zero, with a year low of 15; Germany-Luxembourg had a similar 575 hours and averaged 10.92 below zero, with a year low of 250. The Netherlands and Belgium go deeper again, averaging about 12 and 14 below zero. Portugal is the shallowest and Poland the deepest on average. Northern Italy is absent because it had no negative hours.',
          fig2Caption: 'Hours with a price below 0 €/MWh in 2025 against the average price during those hours, by bidding zone. Labels give each zone’s lowest price of the year.',
          fig3Alt: 'A horizontal bar chart of the share of 2026 hours priced at or below zero, split into hours below zero and hours at exactly zero. Spain leads on 15.4 per cent, then Portugal on 13.2 and France on 12.0, ahead of Germany-Luxembourg on 8.3, the Netherlands on 6.8, Poland on 5.8, Belgium on 5.3 and northern Italy on 0.3. About a third of the Spanish, Portuguese and French hours sit at exactly zero, against 13 to 16 per cent in Germany, the Netherlands and Belgium.',
          fig3Caption: 'Share of 2026 hours to date priced at or below zero, split into below zero and exactly zero.',
        },
        q2: {
          summary: 'Yes. In 2025 solar earned only 51% to 59% of the average power price in 5 of 8 zones, down from 92% to 102% in 2019. Wind held between 86% and 102% across the same eight zones. Germany’s 2024 solar capture price comes out at 46.23 €/MWh against an official market value of 46.24, a cent apart.',
          caveat: 'Solar volumes as reported to ENTSO-E. Dutch rooftop solar is largely missing, so the Netherlands is shown as indicative.',
          fig1Alt: 'Eight small bar charts, one per bidding zone, showing the solar capture rate each year from 2019 to 2026: what a MWh of solar earned on the day-ahead market as a share of the average price. Belgium falls from 92 per cent in 2019 to 51 in 2025, Germany-Luxembourg from 93 to 52, Portugal from 102 to 53, Spain from 102 to 55 and France from 96 to 59. The Netherlands reads 94 down to 62 and Poland 64 in 2025, while northern Italy holds up best at 82. The 2026 bars are hollow because the year is incomplete, and the Dutch and Polish panels carry notes about missing data.',
          fig1Caption: 'Solar capture rate by bidding zone: what a MWh of solar earned on the day-ahead market, as a share of the average price. The hollow 2026 bar is the year to date.',
          fig2Alt: 'Seven small line charts plotting each zone’s solar share of generation against its solar capture rate, one point per year from 2019, with the other zones drawn faintly behind in grey. Every zone slopes downward: as solar takes a larger share of generation, the price it captures falls. Spain is the clearest case, moving from 6 per cent solar at a 102 per cent capture rate in 2019 to 20 per cent solar at 55 per cent in 2025. The Netherlands is left out, because ENTSO-E reports 0.49 TWh of Dutch solar in 2024 against 22 TWh in national statistics.',
          fig2Caption: 'Solar share of reported generation against solar capture rate, one point per year from 2019. Grey lines are the other zones.',
        },
        q3: {
          summary: 'Not where prices go most negative. In 2025 an optimised 1 MW / 2 hour battery trading the day-ahead market could have earned up to €86k per MW in Poland, €76k in Germany and the Netherlands, and €37k in North Italy. What pays is the daily gap between cheap middays and expensive evenings: being paid to charge at negative prices was never more than 11% of a year’s revenue in any zone, and under 7% in 2025.',
          caveat: 'Upper bound: day-ahead market only, perfect knowledge of cleared prices. Excludes intraday, balancing and capacity markets, degradation and grid fees. Not investment advice.',
          fig1Alt: 'A horizontal bar chart ranking what a 1 MW, 2 MWh battery could have earned from day-ahead arbitrage in 2025, by bidding zone. Poland leads on 85.6 thousand euros per MW, then Germany-Luxembourg and the Netherlands on 76.1 each, Belgium on 68.2, Spain on 60.7, Portugal on 58.9, France on 55.3 and northern Italy last on 36.6. A tick on each bar marks what a simple rule of thumb would have earned, charging in the cheapest two hours and discharging in the most expensive two, and it falls short of the optimal schedule everywhere.',
          fig1Caption: 'What a 1 MW / 2 MWh battery could have earned from day-ahead arbitrage in 2025, at most one cycle a day and 88% round trip. Bars are the optimal schedule, ticks the rule of thumb.',
          fig2Alt: 'A scatter plot of battery revenue against negative-price hours, one dot per zone and full year from 2019 to 2025, coloured by zone. More negative hours generally went with more revenue, at a correlation of 0.40 across all 55 points and 0.76 once 2022 is set aside. The 2022 points are ringed and sit well above the rest: the energy crisis brought very high prices and few negative hours, so revenue was high for the opposite reason.',
          fig2Caption: 'Battery revenue against negative-price hours, one point per zone and full year from 2019 to 2025. Association only: both grew over the same years.',
        },
        q4: {
          summary: 'At midday, no longer at night. In 2019 the cheapest hour was 03:00 or 04:00 in every zone; in 2025 it was 12:00 to 14:00. Charging in the cheapest block of each day instead of plugging in at 18:00 cut wholesale cost by 67% to 74% in 7 of 8 zones. In Spain, charging overnight in summer 2025 cost 53% more than charging at 18:00.',
          caveat: 'Wholesale day-ahead cost only, for 10 kWh a day. Excludes retail margin, taxes and grid fees, so these are not household bills.',
          fig1Alt: 'A slope chart with one row per bidding zone, marking the hour of the day with the lowest average day-ahead price in 2019 as a hollow circle and in 2025 as a filled one, joined by an arrow. Every zone moves from the small hours to the middle of the day: 03:00 in 2019 for Germany-Luxembourg, Portugal and Poland and 04:00 for the Netherlands, Belgium, France, Spain and northern Italy, against 12:00 for Poland in 2025, 13:00 for Germany-Luxembourg, the Netherlands, Belgium, Portugal and northern Italy, and 14:00 for France and Spain. Poland is marked with an asterisk because its first year is 2020 rather than 2019, since earlier prices were in zloty.',
          fig1Caption: 'Hour of the day with the lowest average day-ahead price, local time, 2019 against 2025. Poland starts from 2020, because earlier Polish prices were quoted in zloty.',
          fig2Alt: 'A horizontal bar chart of what an electric car would have saved in 2025 by charging in the cheapest block of each day instead of plugging in at 18:00, for 10 kWh a day at 7 kW. Poland saves 368 euros a year, which is 67 per cent of its 547 euro cost at 18:00, then Germany-Luxembourg 338 or 72 per cent, the Netherlands 333 or 74 per cent, Belgium 300 or 72 per cent, Portugal 252 or 72 per cent, France 220 or 72 per cent, northern Italy 198 or 39 per cent, and Spain 182 or 67 per cent. A tick on each bar marks the smaller saving from charging overnight between 22:00 and 07:00 instead.',
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
      standfirst: 'Les quatre questions ont leur réponse. Chaque chiffre est sorti du pipeline de la fig. 03, et rien n’a été rempli avant d’être réel.',
      pending: 'En attente',
      awaiting: 'Analyse en cours',
      answered: 'Répondue',
      notebook: 'Voir le notebook d’analyse →',
      notebookModel: 'Voir le modèle et le notebook →',
      notebookShort: 'Voir le notebook →',
      answers: {
        q1: {
          summary: 'Les prix négatifs sont passés de rares à courants : 5 zones européennes sur 8 ont dépassé 500 heures de prix négatifs en 2025, contre 112 au maximum en 2022. L’Espagne et le Portugal touchent désormais zéro ou moins le plus souvent, mais leurs prix négatifs restent peu profonds ; l’Allemagne, les Pays-Bas et la Belgique descendent bien plus bas.',
          fig1Alt: 'Huit petits graphiques en barres, un par zone de marché, montrant le nombre d’heures par an avec un prix day-ahead inférieur à zéro de 2019 à 2026. Les Pays-Bas, l’Allemagne-Luxembourg, l’Espagne, la Belgique et la France dépassent tous 500 heures en 2025, la Pologne atteint 311 et le Portugal 198, et l’Italie du Nord n’en enregistre aucune, quelle que soit l’année. Les barres 2026 sont évidées car l’année est incomplète.',
          fig1Caption: 'Heures par an avec un prix day-ahead sous 0 €/MWh, par zone de marché. La barre 2026 évidée correspond à l’année en cours.',
          fig2Alt: 'Un nuage de points croisant les heures de prix négatifs de 2025 et la profondeur de ces prix, un point par zone de marché. L’axe horizontal compte les heures sous zéro et l’axe vertical donne le prix moyen pendant ces heures. L’Espagne compte 552 heures négatives mais une moyenne de seulement 2,11 euros sous zéro, avec un plus bas annuel de 15 ; l’Allemagne-Luxembourg en compte 575, un total voisin, pour une moyenne de 10,92 sous zéro et un plus bas annuel de 250. Les Pays-Bas et la Belgique descendent encore plus bas, autour de 12 et 14 en moyenne. Le Portugal est le moins profond et la Pologne la plus profonde en moyenne. L’Italie du Nord est absente faute d’heures négatives.',
          fig2Caption: 'Heures sous 0 €/MWh en 2025 rapportées au prix moyen pendant ces heures, par zone de marché. Les étiquettes donnent le plus bas de l’année pour chaque zone.',
          fig3Alt: 'Un graphique en barres horizontales de la part des heures 2026 cotées à zéro ou en dessous, séparant les heures sous zéro et les heures à exactement zéro. L’Espagne arrive en tête avec 15,4 %, puis le Portugal avec 13,2 % et la France avec 12,0 %, devant l’Allemagne-Luxembourg à 8,3 %, les Pays-Bas à 6,8 %, la Pologne à 5,8 %, la Belgique à 5,3 % et l’Italie du Nord à 0,3 %. Environ un tiers des heures espagnoles, portugaises et françaises sont à exactement zéro, contre 13 à 16 % en Allemagne, aux Pays-Bas et en Belgique.',
          fig3Caption: 'Part des heures 2026 à ce jour cotées à zéro ou en dessous, séparant sous zéro et exactement zéro.',
        },
        q2: {
          summary: 'Oui. En 2025, le solaire n’a capté que 51 % à 59 % du prix moyen de l’électricité dans 5 zones sur 8, contre 92 % à 102 % en 2019. L’éolien s’est maintenu entre 86 % et 102 % sur ces mêmes huit zones. Le prix de captation du solaire allemand en 2024 ressort à 46,23 €/MWh face à une valeur de marché officielle de 46,24, soit un centime d’écart.',
          caveat: 'Volumes solaires tels que déclarés à ENTSO-E. Le solaire résidentiel néerlandais est en grande partie absent : les Pays-Bas sont donc donnés à titre indicatif.',
          fig1Alt: 'Huit petits graphiques en barres, un par zone de marché, donnant le taux de captation du solaire année par année de 2019 à 2026 : ce qu’un MWh solaire a gagné sur le marché day-ahead, en part du prix moyen. La Belgique passe de 92 % en 2019 à 51 % en 2025, l’Allemagne-Luxembourg de 93 à 52, le Portugal de 102 à 53, l’Espagne de 102 à 55 et la France de 96 à 59. Les Pays-Bas vont de 94 à 62 et la Pologne à 64 en 2025, tandis que l’Italie du Nord résiste le mieux à 82. Les barres 2026 sont évidées car l’année est incomplète, et les panneaux néerlandais et polonais portent une note sur les données manquantes.',
          fig1Caption: 'Taux de captation du solaire par zone de marché : ce qu’un MWh solaire a gagné sur le marché day-ahead, en part du prix moyen. La barre 2026 évidée correspond à l’année en cours.',
          fig2Alt: 'Sept petits graphiques en lignes croisant, pour chaque zone, la part du solaire dans la production et son taux de captation, un point par année depuis 2019, les autres zones étant tracées en gris clair en arrière-plan. Toutes les zones descendent : plus la part du solaire dans la production augmente, moins le prix qu’il capte est élevé. L’Espagne est le cas le plus net, passant de 6 % de solaire à un taux de 102 % en 2019 à 20 % de solaire à 55 % en 2025. Les Pays-Bas sont absents, car ENTSO-E déclare 0,49 TWh de solaire néerlandais en 2024 contre 22 TWh dans les statistiques nationales.',
          fig2Caption: 'Part du solaire dans la production déclarée rapportée au taux de captation du solaire, un point par année depuis 2019. Les lignes grises sont les autres zones.',
        },
        q3: {
          summary: 'Pas là où les prix descendent le plus bas. En 2025, une batterie optimisée de 1 MW / 2 heures sur le marché day-ahead aurait pu gagner jusqu’à 86 k€ par MW en Pologne, 76 k€ en Allemagne et aux Pays-Bas, et 37 k€ en Italie du Nord. Ce qui paie, c’est l’écart quotidien entre des midis bon marché et des soirées chères : être payé pour se charger à prix négatif n’a jamais dépassé 11 % du revenu annuel d’une zone, et moins de 7 % en 2025.',
          caveat: 'Borne supérieure : marché day-ahead uniquement, connaissance parfaite des prix fixés. Hors marchés infrajournalier, d’équilibrage et de capacité, hors dégradation et frais de réseau. Ceci n’est pas un conseil en investissement.',
          fig1Alt: 'Un graphique en barres horizontales classant ce qu’une batterie de 1 MW et 2 MWh aurait pu gagner en arbitrage day-ahead en 2025, par zone de marché. La Pologne arrive en tête avec 85,6 milliers d’euros par MW, puis l’Allemagne-Luxembourg et les Pays-Bas à 76,1 chacun, la Belgique à 68,2, l’Espagne à 60,7, le Portugal à 58,9, la France à 55,3 et l’Italie du Nord en dernier à 36,6. Un trait sur chaque barre indique ce qu’aurait rapporté une règle simple, charger pendant les deux heures les moins chères et décharger pendant les deux plus chères, et il reste partout en deçà du programme optimal.',
          fig1Caption: 'Ce qu’une batterie de 1 MW / 2 MWh aurait pu gagner en arbitrage day-ahead en 2025, au plus un cycle par jour et 88 % de rendement aller-retour. Les barres donnent le programme optimal, les traits la règle empirique.',
          fig2Alt: 'Un nuage de points croisant le revenu de la batterie et le nombre d’heures à prix négatif, un point par zone et par année complète de 2019 à 2025, coloré par zone. Plus d’heures négatives va généralement de pair avec plus de revenu, pour une corrélation de 0,40 sur les 55 points et de 0,76 une fois 2022 mis de côté. Les points de 2022 sont entourés et se détachent nettement vers le haut : la crise de l’énergie a amené des prix très élevés et peu d’heures négatives, le revenu était donc élevé pour la raison inverse.',
          fig2Caption: 'Revenu de la batterie rapporté aux heures à prix négatif, un point par zone et par année complète de 2019 à 2025. Simple association : les deux ont progressé sur les mêmes années.',
        },
        q4: {
          summary: 'À midi, et non plus la nuit. En 2019, l’heure la moins chère était 03h00 ou 04h00 dans toutes les zones ; en 2025, c’est entre 12h00 et 14h00. Charger sur le créneau le moins cher de la journée plutôt que de brancher à 18h00 a réduit le coût de gros de 67 % à 74 % dans 7 zones sur 8. En Espagne, charger la nuit pendant l’été 2025 a coûté 53 % de plus que charger à 18h00.',
          caveat: 'Coût de gros day-ahead uniquement, pour 10 kWh par jour. Hors marge de détail, taxes et frais de réseau : ce ne sont donc pas des factures de ménage.',
          fig1Alt: 'Un graphique en pente avec une ligne par zone de marché, marquant l’heure de la journée au prix day-ahead moyen le plus bas en 2019 par un cercle vide et en 2025 par un cercle plein, reliés par une flèche. Toutes les zones passent du milieu de la nuit au milieu de la journée : 03h00 en 2019 pour l’Allemagne-Luxembourg, le Portugal et la Pologne, 04h00 pour les Pays-Bas, la Belgique, la France, l’Espagne et l’Italie du Nord, contre 12h00 pour la Pologne en 2025, 13h00 pour l’Allemagne-Luxembourg, les Pays-Bas, la Belgique, le Portugal et l’Italie du Nord, et 14h00 pour la France et l’Espagne. La Pologne porte un astérisque car sa première année est 2020 et non 2019, les prix antérieurs étant en zloty.',
          fig1Caption: 'Heure de la journée au prix day-ahead moyen le plus bas, heure locale, 2019 face à 2025. La Pologne part de 2020, ses prix antérieurs étant libellés en zloty.',
          fig2Alt: 'Un graphique en barres horizontales de ce qu’une voiture électrique aurait économisé en 2025 en chargeant sur le créneau le moins cher de chaque journée plutôt qu’en branchant à 18h00, pour 10 kWh par jour à 7 kW. La Pologne économise 368 euros par an, soit 67 % de son coût de 547 euros à 18h00, puis l’Allemagne-Luxembourg 338 ou 72 %, les Pays-Bas 333 ou 74 %, la Belgique 300 ou 72 %, le Portugal 252 ou 72 %, la France 220 ou 72 %, l’Italie du Nord 198 ou 39 %, et l’Espagne 182 ou 67 %. Un trait sur chaque barre indique l’économie plus faible obtenue en chargeant la nuit entre 22h00 et 07h00.',
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
      standfirst: 'Las cuatro preguntas ya tienen respuesta. Cada cifra salió del pipeline de la fig. 03, y nada se rellenó hasta que fue real.',
      pending: 'Pendiente',
      awaiting: 'A la espera del análisis',
      answered: 'Respondida',
      notebook: 'Ver el cuaderno de análisis →',
      notebookModel: 'Ver el modelo y el cuaderno →',
      notebookShort: 'Ver el cuaderno →',
      answers: {
        q1: {
          summary: 'Los precios negativos han pasado de raros a habituales: 5 de las 8 zonas europeas superaron las 500 horas de precios negativos en 2025, frente a 112 como máximo en 2022. España y Portugal son ahora las que más veces tocan cero o por debajo, pero sus precios negativos son poco profundos; Alemania, Países Bajos y Bélgica bajan mucho más.',
          fig1Alt: 'Ocho gráficos de barras pequeños, uno por zona de mercado, con las horas al año con precio day-ahead por debajo de cero entre 2019 y 2026. Países Bajos, Alemania-Luxemburgo, España, Bélgica y Francia superan las 500 horas en 2025, Polonia llega a 311 y Portugal a 198, y el norte de Italia no registra ninguna en ningún año. Las barras de 2026 van huecas porque el año está incompleto.',
          fig1Caption: 'Horas al año con precio day-ahead por debajo de 0 €/MWh, por zona de mercado. La barra hueca de 2026 es el año en curso.',
          fig2Alt: 'Un diagrama de dispersión que cruza las horas de precios negativos de 2025 con lo profundos que fueron esos precios, un punto por zona de mercado. El eje horizontal cuenta las horas por debajo de cero y el eje vertical es el precio medio durante esas horas. España tuvo 552 horas negativas pero una media de solo 2,11 euros bajo cero, con un mínimo anual de 15; Alemania-Luxemburgo tuvo 575, una cifra parecida, con una media de 10,92 bajo cero y un mínimo anual de 250. Países Bajos y Bélgica bajan todavía más, en torno a 12 y 14 de media. Portugal es la menos profunda y Polonia la más profunda de media. El norte de Italia no aparece porque no tuvo horas negativas.',
          fig2Caption: 'Horas por debajo de 0 €/MWh en 2025 frente al precio medio durante esas horas, por zona de mercado. Las etiquetas dan el mínimo del año de cada zona.',
          fig3Alt: 'Un gráfico de barras horizontales con la proporción de horas de 2026 a cero o por debajo, separando las horas por debajo de cero y las horas a exactamente cero. España encabeza con el 15,4 %, seguida de Portugal con el 13,2 % y Francia con el 12,0 %, por delante de Alemania-Luxemburgo con el 8,3 %, Países Bajos con el 6,8 %, Polonia con el 5,8 %, Bélgica con el 5,3 % y el norte de Italia con el 0,3 %. Alrededor de un tercio de las horas españolas, portuguesas y francesas están a exactamente cero, frente al 13 a 16 % en Alemania, Países Bajos y Bélgica.',
          fig3Caption: 'Proporción de las horas de 2026 hasta la fecha a cero o por debajo, separando por debajo de cero y exactamente cero.',
        },
        q2: {
          summary: 'Sí. En 2025 la solar solo capturó entre el 51 % y el 59 % del precio medio de la electricidad en 5 de las 8 zonas, frente al 92 % a 102 % de 2019. La eólica se mantuvo entre el 86 % y el 102 % en esas mismas ocho zonas. El precio de captura de la solar alemana en 2024 sale en 46,23 €/MWh frente a un valor de mercado oficial de 46,24, a un céntimo de distancia.',
          caveat: 'Volúmenes solares según lo declarado a ENTSO-E. La solar residencial neerlandesa falta en gran medida, así que los Países Bajos se muestran a título indicativo.',
          fig1Alt: 'Ocho gráficos de barras pequeños, uno por zona de mercado, con la tasa de captura solar año a año de 2019 a 2026: lo que un MWh solar ganó en el mercado day-ahead como proporción del precio medio. Bélgica cae del 92 % en 2019 al 51 % en 2025, Alemania-Luxemburgo del 93 al 52, Portugal del 102 al 53, España del 102 al 55 y Francia del 96 al 59. Países Bajos va del 94 al 62 y Polonia al 64 en 2025, mientras que el norte de Italia aguanta mejor en el 82. Las barras de 2026 van huecas porque el año está incompleto, y los paneles neerlandés y polaco llevan una nota sobre datos que faltan.',
          fig1Caption: 'Tasa de captura solar por zona de mercado: lo que un MWh solar ganó en el mercado day-ahead, como proporción del precio medio. La barra hueca de 2026 es el año en curso.',
          fig2Alt: 'Siete gráficos de líneas pequeños que cruzan, para cada zona, la proporción de solar en la generación y su tasa de captura, un punto por año desde 2019, con las demás zonas dibujadas en gris claro al fondo. Todas las zonas bajan: cuanta más generación aporta la solar, menos precio captura. España es el caso más claro, pasando del 6 % de solar con una tasa del 102 % en 2019 al 20 % de solar con el 55 % en 2025. Los Países Bajos quedan fuera, porque ENTSO-E declara 0,49 TWh de solar neerlandesa en 2024 frente a 22 TWh en las estadísticas nacionales.',
          fig2Caption: 'Proporción de solar en la generación declarada frente a la tasa de captura solar, un punto por año desde 2019. Las líneas grises son las demás zonas.',
        },
        q3: {
          summary: 'No donde los precios bajan más. En 2025 una batería optimizada de 1 MW / 2 horas operando en el mercado day-ahead habría podido ganar hasta 86 k€ por MW en Polonia, 76 k€ en Alemania y Países Bajos, y 37 k€ en el norte de Italia. Lo que paga es la diferencia diaria entre mediodías baratos y tardes caras: cobrar por cargar a precios negativos nunca pasó del 11 % de los ingresos anuales de una zona, y se quedó por debajo del 7 % en 2025.',
          caveat: 'Cota superior: solo mercado day-ahead y conocimiento perfecto de los precios casados. Excluye los mercados intradiario, de balance y de capacidad, la degradación y los peajes de red. Esto no es asesoramiento de inversión.',
          fig1Alt: 'Un gráfico de barras horizontales que ordena lo que una batería de 1 MW y 2 MWh habría podido ganar con arbitraje day-ahead en 2025, por zona de mercado. Polonia encabeza con 85,6 miles de euros por MW, seguida de Alemania-Luxemburgo y Países Bajos con 76,1 cada una, Bélgica con 68,2, España con 60,7, Portugal con 58,9, Francia con 55,3 y el norte de Italia en último lugar con 36,6. Una marca en cada barra señala lo que habría dado una regla sencilla, cargar en las dos horas más baratas y descargar en las dos más caras, y en todas las zonas se queda por debajo del programa óptimo.',
          fig1Caption: 'Lo que una batería de 1 MW / 2 MWh habría podido ganar con arbitraje day-ahead en 2025, como mucho un ciclo al día y 88 % de rendimiento de ida y vuelta. Las barras son el programa óptimo, las marcas la regla aproximada.',
          fig2Alt: 'Un diagrama de dispersión que cruza los ingresos de la batería con las horas de precio negativo, un punto por zona y año completo de 2019 a 2025, con color por zona. Más horas negativas suelen ir con más ingresos, con una correlación de 0,40 en los 55 puntos y de 0,76 dejando fuera 2022. Los puntos de 2022 van rodeados y quedan muy por encima del resto: la crisis energética trajo precios muy altos y pocas horas negativas, así que los ingresos fueron altos por el motivo contrario.',
          fig2Caption: 'Ingresos de la batería frente a las horas de precio negativo, un punto por zona y año completo de 2019 a 2025. Solo asociación: ambos crecieron en los mismos años.',
        },
        q4: {
          summary: 'A mediodía, ya no de noche. En 2019 la hora más barata eran las 03:00 o las 04:00 en todas las zonas; en 2025 está entre las 12:00 y las 14:00. Cargar en el bloque más barato de cada día en lugar de enchufar a las 18:00 redujo el coste mayorista entre un 67 % y un 74 % en 7 de las 8 zonas. En España, cargar de noche durante el verano de 2025 costó un 53 % más que cargar a las 18:00.',
          caveat: 'Solo coste mayorista day-ahead, para 10 kWh al día. Excluye margen minorista, impuestos y peajes de red, así que no son facturas domésticas.',
          fig1Alt: 'Un gráfico de pendiente con una fila por zona de mercado, que marca la hora del día con el precio day-ahead medio más bajo en 2019 con un círculo hueco y en 2025 con uno relleno, unidos por una flecha. Todas las zonas pasan de la madrugada al centro del día: las 03:00 en 2019 para Alemania-Luxemburgo, Portugal y Polonia, y las 04:00 para Países Bajos, Bélgica, Francia, España y el norte de Italia, frente a las 12:00 para Polonia en 2025, las 13:00 para Alemania-Luxemburgo, Países Bajos, Bélgica, Portugal y el norte de Italia, y las 14:00 para Francia y España. Polonia lleva un asterisco porque su primer año es 2020 y no 2019, ya que los precios anteriores estaban en zlotys.',
          fig1Caption: 'Hora del día con el precio day-ahead medio más bajo, hora local, 2019 frente a 2025. Polonia arranca en 2020, porque sus precios anteriores estaban en zlotys.',
          fig2Alt: 'Un gráfico de barras horizontales con lo que un coche eléctrico habría ahorrado en 2025 cargando en el bloque más barato de cada día en lugar de enchufar a las 18:00, para 10 kWh al día a 7 kW. Polonia ahorra 368 euros al año, el 67 % de su coste de 547 euros a las 18:00, seguida de Alemania-Luxemburgo con 338 o el 72 %, Países Bajos con 333 o el 74 %, Bélgica con 300 o el 72 %, Portugal con 252 o el 72 %, Francia con 220 o el 72 %, el norte de Italia con 198 o el 39 %, y España con 182 o el 67 %. Una marca en cada barra señala el ahorro menor de cargar de noche entre las 22:00 y las 07:00.',
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

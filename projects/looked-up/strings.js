/* =============================================================================
   Copy for the Looked Up case study, in EN / FR / ES.

   Kept beside the page rather than in the site-wide content.js, so the home
   page does not ship prose only this page uses.

   Every number comes from a file in github.com/Sbaiii/looked-up and the file is
   named in a comment beside it. Paths are relative to that repository:
     P2   docs/analysis/phase2_results.md
     P2B  docs/analysis/phase2b_results.md
     P4   docs/analysis/phase4_results.md
     P5   docs/analysis/phase5_results.md
   Nothing is rounded further than those files round it.
   ========================================================================== */

export const LANGS = ['en', 'fr', 'es'];

export const PAGE = {
  en: {
    lang: { code: 'EN' },
    back: 'Back to the portfolio',
    nav: { home: 'Home', repo: 'Repository', app: 'The app' },

    hero: {
      fig: 'fig. 00',
      kicker: 'Case study',
      status: 'Live',
      title: 'Looked Up',
      subtitle: 'What humanity looked up today.',
      hook: 'Wikipedia across 30 languages, every hour, turned into attention events, forecasts and a live globe.', // config/languages.yml top_n: 30
      meta: '30 languages · updated every hour · 14 pre-registered hypotheses · €0', // config/languages.yml; docs/ops.md (hourly.yml); P2 P2B P4 P5; docs/adr/0002
      app: 'Open the app ↗',
      repo: 'GitHub ↗',
      dataset: 'Dataset ↗',
    },

    question: {
      fig: 'fig. 01',
      title: 'The question',
      ask: 'Can we see what the world pays attention to, hour by hour, across languages, from public data, for free?',
      p1: 'Every hour, Wikimedia publishes how many times each Wikipedia article was read, for more than 300 language editions. Wikidata links the same topic across them, so “Lisbon”, “Lisboa” and “リスボン” count as one.', // README.md
      p2: 'Reading is the attention measure. Edits are the fast signal: editors react within minutes, while the reading numbers for an hour arrive about 3.2 hours after it begins.', // P5
      p3: 'Before looking at the data, I wrote down what I expected to find, with a threshold for each claim. The interesting part is how much of it was wrong.',
    },

    built: {
      fig: 'fig. 02',
      title: 'What I built',
      standfirst: 'Two pipelines on free infrastructure, one for readers and one for editors, meeting in one app.',
      shotsCaption: 'The front page, desktop and phone: what editors are updating right now, what readers looked up in the last 24 hours, and what is most likely to spread next.',
      shotDesktopAlt: 'The Looked Up app on a desktop screen. A strip at the top lists articles editors are updating right now. Below it, the headline reads “Today the world looked up Gillian Anderson”, 6 languages in 6 hours, led by Spanish, beside a dark world map with arcs from Mexico to Europe, and a list of the three articles most likely to spread next.', // docs/screenshots/desktop-today.png
      shotPhoneAlt: 'The same front page on a phone: the editors strip at the top, then the headline “Today the world looked up Gillian Anderson”, the one-sentence briefing and the forecast list.', // docs/screenshots/phone-today.png
      archTitle: 'Architecture',
      archCaption: 'Batch path, hours late and complete: pageview dumps, the lake, scoring and forecasts, the app. Live path, minutes and partial: recent changes, the Worker, the app’s “Right now” strip. Wikidata joins articles across languages, and a daily job copies the Worker’s bursts back to the lake.', // docs/ops.md
      arch: {
        batch: 'readers · hours',
        live: 'editors · minutes',
        dumps: 'Pageview dumps',
        dumpsNote: 'hourly, ≈ 55 MB', // docs/feasibility.md
        actions: 'GitHub Actions',
        actionsNote: 'ingest, score, forecast',
        lake: 'Hugging Face lake',
        lakeNote: 'Parquet, ≈ 16 GB a year', // docs/data_model.md
        rc: 'Recent changes',
        rcNote: 'MediaWiki API',
        worker: 'Cloudflare Worker',
        workerNote: 'TypeScript, every minute', // docs/ops.md
        store: 'D1 + KV',
        storeNote: 'counts only, no users', // docs/adr/0033
        app: 'The app',
        appNote: 'GitHub Pages',
      },
      numbersTitle: 'In numbers',
      numbers: [
        { v: '30', l: 'languages, 98.5% of human article views among the 60 largest Wikipedias' }, // config/languages.yml: rank 30 cumulative_share_of_candidates 0.9851
        { v: '≈\u00a055 MB', l: 'per hourly dump, compressed' }, // docs/feasibility.md
        { v: '≈\u00a016 GB', l: 'of lake a year' }, // docs/data_model.md
        { v: '37,386', l: 'attention events in 84 days' }, // docs/adr/0021-product-tiers.md
        { v: '124', l: 'planetary: 20 languages or more' }, // docs/adr/0021-product-tiers.md
        { v: '1 h', l: 'between updates' }, // docs/ops.md: hourly.yml, cron 17 * * * *
        { v: '€0', l: 'budget, free tiers only' }, // docs/adr/0002-storage-and-compute.md; README.md (free infrastructure only)
      ],
      speedsTitle: 'Three speeds',
      speedLabel: 'Speed',
      shows: 'In the app',
      speeds: [
        {
          n: 'Editors',
          speed: 'minutes',
          body: 'A Cloudflare Worker reads each Wikipedia’s recent changes every 6 minutes and flags articles that several editors are rushing to update. It keeps counts only, never user names.', // docs/adr/0033; docs/ops.md
          shows: 'the “Right now” strip',
        },
        {
          n: 'Readers',
          speed: 'hours',
          body: 'Every hour, GitHub Actions adds the newest pageview dump to the lake and scores it: an event is one topic spiking in 2 or more languages within 6 hours, against its own 28 day baseline.', // README.md; docs/adr/0021
          shows: 'events, tiers, the globe',
        },
        {
          n: 'Forecast',
          speed: 'next 24 h',
          body: 'LightGBM models estimate, an hour after detection, whether an event will reach 5 languages, and how much attention it has left in the next 24 hours.', // P4; README.md
          shows: 'the “Spreading” badge, the fade time',
        },
      ],
    },

    score: {
      fig: 'fig. 03',
      title: 'The scorecard',
      standfirst: '14 hypotheses, each committed with its threshold before the code or data that would judge it. 2 held.', // P2 P2B P4 P5
      supported: 'supported',
      rejected: 'rejected',
      inconclusive: 'inconclusive',
      cols: { h: 'Hypothesis', expected: 'Expected', found: 'Found', verdict: 'Verdict' },
      note: 'Inconclusive always means the same thing here: the minimum sample written into the pre-registration was not reached. It never means “close”.',
      phases: {
        p2: 'Phase 2 · events',
        p2b: 'Phase 2b · timed events',
        p4: 'Phase 4 · forecasts',
        p5: 'Phase 5 · live edits',
      },
      rows: {
        h1: { name: 'Current events', expected: 'At least 70% of the major entries on Wikipedia’s Current events portal show up within 6 hours.', found: '4.3% (366 of 8,461): the portal lists conflicts and politics, while readers spike on deaths and sport.' }, // P2
        h2: { name: 'Lead language', expected: 'The first language to spike is the event country’s language in at least 60% of cases.', found: '40.7% (77 of 189), and English leads 26.6% of all events.' }, // P2
        h3: { name: 'Automation filter', expected: 'The bot filter flags at least 90% of labelled non-events.', found: '2 of 9 flagged, and 9 non-events is short of the 20 required.' }, // P2
        h4: { name: 'Spread speed', expected: 'Deaths and disasters spread across languages faster than sports and entertainment.', found: 'The reverse: a median 2.5 h against 1.0 h (p\u00a0=\u00a01.0).' }, // P2
        h1b1: { name: 'Deaths', expected: 'At least 60% of notable deaths are detected within their 24 hour window.', found: '32.5% (159 of 489).' }, // P2B
        h1b2: { name: 'Earthquakes', expected: 'At least 70% of M6.5+ earthquakes are detected within 6 hours.', found: '3 of 9 (33%), almost all missed ones offshore or remote.' }, // P2B
        h1b3: { name: 'Matches', expected: 'At least 90% of World Cup matches are detected within 3 hours of kick-off.', found: '2 of 2, short of the 5 required.' }, // P2B
        h2b: { name: 'Quake language', expected: 'At least 60% of detected quakes are led by an affected country’s language.', found: '2 of 4, short of the 5 required.' }, // P2B
        h5: { name: 'Quake delay', expected: 'Median delay from origin to detection of 4 hours or less.', found: '0 h, but from only 4 detected quakes, short of the 5 required.' }, // P2B
        h6: { name: 'Going international', expected: 'An hour after detection: AUC of at least 0.80 and a calibration slope between 0.8 and 1.2.', found: 'AUC 0.875 and slope 0.83, on 17 unseen days scored once.' }, // P4; README.md
        h7: { name: 'Fame dominates', expected: 'Sitelinks alone reach at least 70% of the model’s PR AUC.', found: '20% (0.063 against 0.310): the first hour of reading matters more.' }, // P4
        h8: { name: 'Attention left', expected: 'The 24 hour forecast beats a category median decay rule by at least 20% MAE.', found: '26% lower error (1.639 against 2.205).' }, // P4
        h9: { name: 'Editors first', expected: 'Edit bursts come at least 60 minutes before the first reading spike.', found: 'Readers come first: bursts land a median 106 minutes after it (n\u00a0=\u00a0134).' }, // P5
        h10: { name: 'Live events', expected: 'Bursts in 2 languages within 30 minutes predict a reading event with at least 30% precision.', found: 'No live event scored yet. The verdict waits for 100, which accumulate daily.' }, // P5
      },
    },

    findings: {
      fig: 'fig. 04',
      title: 'What the data said instead',
      standfirst: 'Rejected hypotheses are findings too. These are the five I would tell someone first.',
      source: 'Read the results ↗',
      items: [
        {
          title: 'English leads only 26.6% of events.', // P2 (H2, base rate)
          body: 'In the pre-registered run of 11,127 events, English Wikipedia spiked first in 26.6% of them. Outside English-speaking countries, the local language led 36.6% of the time: locality matters, but it does not dominate. Part of the non-English lead is a small wiki crossing its own threshold an hour earlier.', // P2
        },
        {
          title: 'A final reaches 29 languages in the same hour. A death takes hours.', // P2
          body: 'Nicolás Otamendi at the World Cup final spiked in 29 languages within one hour. Hayden Panettiere’s death started in English and reached 28 languages over 2 hours. Across all events, deaths and disasters spread at a median 2.5 h and sports and entertainment at 1.0 h, the reverse of H4: a scheduled event reaches everyone at once, while news of a death travels.', // P2
          chart: 'spread',
          caption: 'Languages spiking, by hours after the first one. Source: phase 2 case studies.',
          alt: 'A step chart of how many languages had spiked, by hours after the first language. Nicolás Otamendi at the World Cup final is at 29 languages from hour 0. Hayden Panettiere’s death starts at 1 language at hour 0, reaches 24 at hour 1 and 28 at hour 2.', // P2; docs/figures/spread_lag_biggest_event.png
          axisX: 'hours after the first language spiked',
          axisY: 'languages',
          final: 'World Cup final (Otamendi)',
          death: 'A death (Panettiere)',
        },
        {
          title: 'The biggest events the news portal missed are mostly real.',
          body: 'I checked by hand the 30 largest events that Wikipedia’s English Current events portal never linked. 25 are real: 15 deaths, 7 World Cup final topics, 2 people in the news because of a death and a celebrity marriage. 17 of those 25 were led by a non-English edition. The portal’s daily pages do not list deaths at all.', // P2
        },
        {
          title: 'Readers lead editors, but editors beat the data.',
          body: 'Of the 2,000 widest events, only 134 (6.7%) had an edit burst, and the median burst came 106 minutes after the first reading spike. Editors were first in 7.5%. But an hour’s reading numbers are published about 3.2 hours after it begins, so the burst is known a median 86 minutes before the reading data, in 70% of those events.', // P5
          chart: 'lead',
          caption: '134 events with an edit burst. Bars left of zero: readers spiked first. Dotted line: the pre-registered 60 minutes.', // P5
          alt: 'A histogram of the time between the first reading spike and the edit burst, for 134 events. Almost all bars sit left of zero, with the tallest, 39 events, in the hour just before zero, meaning readers spiked first. Only 10 events sit right of zero, where editors came first. The pre-registered threshold of 60 minutes is a dotted line at plus one hour, and the median is 106 minutes on the readers’ side.', // docs/analysis/phase5_h9.csv; P5
          axisX: 'first reading spike minus edit burst, hours',
          axisY: 'events',
          readers: 'readers first',
          editors: 'editors first',
        },
        {
          title: 'Fame explains a fifth of going global.',
          body: 'How many Wikipedias have an article on a topic gets only 20% of the model’s PR AUC on its own (0.063 against 0.310). The first hour of reading matters more: the model reaches AUC 0.875 an hour after detection and 0.919 after three. It is overconfident in the middle of the range, where a predicted 44% happened 34% of the time.', // P4
          chart: 'calibration',
          caption: 'Calibration on the test set, one hour after detection, 10 bins. On the diagonal, a forecast of x% comes true x% of the time.', // P4; docs/analysis/phase4_metrics.json
          alt: 'A calibration chart for the forecast of going international, one hour after detection. The model’s points follow the diagonal closely at low probabilities, dip below it in the middle, where a predicted 44% came true 34% of the time, and end near 74% predicted against 80% observed. The sitelinks only baseline is a single point near zero.', // docs/analysis/phase4_metrics.json m1.international_t1
          axisX: 'predicted probability',
          axisY: 'observed share',
          model: 'model',
          fame: 'fame only',
        },
      ],
    },

    events: {
      fig: 'fig. 05',
      title: 'Three events',
      standfirst: 'Each one opens in the app, on its day, with its spread on the globe.',
      open: 'Open in the app ↗',
      items: [
        {
          key: 'panettiere',
          kicker: 'The biggest',
          title: 'Hayden Panettiere',
          when: '17 Aug, 02:00 UTC', // P2
          body: '28 languages within 2 hours, 14.4 M excess views. English led, 23 languages followed within the next hour and 4 more in the hour after.', // P2
        },
        {
          key: 'final',
          kicker: 'The fastest',
          title: 'The World Cup final',
          when: '19 Jul, 19:00 UTC', // P2
          body: 'Nicolás Otamendi spiked in 29 languages in the same hour. Lamine Yamal, at the same final, reached all 30 within 9 hours.', // P2
        },
        {
          key: 'higashino',
          kicker: 'The one English missed',
          title: 'Keigo Higashino',
          when: '27 Jul, 07:00 UTC', // P2
          body: 'Led by Japanese Wikipedia, which carried most of the attention: 1.1 M excess views, 8 languages within 3 hours. Missed by the English portal, whose daily pages list no deaths.', // P2
        },
      ],
    },

    limits: {
      fig: 'fig. 06',
      title: 'Honest limitations',
      standfirst: 'What this cannot tell you, stated next to what it can.',
      items: [
        { title: 'Hours late', body: 'An hour’s reading numbers arrive about 3.2 hours after it begins, mostly Wikimedia’s ≈ 2.2 h median dump lag. The live layer covers that gap, but only for the slice of attention editors touch.' }, // P5
        { title: 'Languages, not countries', body: 'Wikimedia’s per-country data is daily, top 1,000 and rounded, and 18 of the 38 countries probed are suppressed. The globe colours language communities, never countries.' }, // docs/feasibility.md
        { title: 'Fame bias', body: 'Detection favours the famous: 23% of notable deaths are caught for people with articles in 5 to 9 languages, 54% for people with 20 or more.' }, // P2B
        { title: 'Planetary on 3 events', body: 'The forecast test set held only 3 planetary events, so those results are reported, not interpreted. The app shows a planetary chance only above 30%, with that warning.' }, // P4
        { title: 'Bots', body: 'Automated traffic is caught by a heuristic: titles with more than 1,000 views and under 5% mobile. It misses one-hour bursts on mobile-heavy pages, which is where the one false positive in the case studies came from.' }, // docs/adr/0006; P2
        { title: 'The Worker at the limit', body: 'The live Worker’s polls take a median 10 ms of CPU (p95 16 ms), against the free plan’s 10 ms. Cloudflare rejected none of the 85 polls watched, and a daily check warns if that changes.' }, // docs/adr/0033; docs/ops.md
      ],
    },

    stack: {
      fig: 'fig. 07',
      title: 'Stack and practice',
      standfirst: 'Free tiers only, and every decision written down.',
      read: 'Read ↗',
      items: [
        { key: 'prereg', title: 'Pre-registration', body: 'Each phase’s hypotheses, thresholds and rejection rules were committed before the code or data that judges them. The files are never edited afterwards.' }, // docs/prereg_*.md
        { key: 'adr', title: '33 decision records', body: 'One per decision, deviations from a pre-registration included: they are logged as new records, not edited into the plan.' }, // docs/adr/ (0001 to 0033)
        { key: 'results', title: 'Results, with the misses', body: 'One results file per phase, with its raw outputs, its limitations and the commands that reproduce it.' }, // docs/analysis/
        { key: 'ops', title: 'Operations', body: 'Where everything runs and lives, what each workflow does and what to do when something breaks.' }, // docs/ops.md
      ],
    },

    footer: {
      note: 'Data: Wikimedia pageviews and Wikidata, CC0. Every number on this page comes from the project’s results files.',
      repo: 'Repository ↗',
      home: 'Back to sbaiii.com',
    },
  },

  fr: {
    lang: { code: 'FR' },
    back: 'Retour au portfolio',
    nav: { home: 'Accueil', repo: 'Dépôt', app: 'L’application' },

    hero: {
      fig: 'fig. 00',
      kicker: 'Étude de cas',
      status: 'En ligne',
      title: 'Looked Up',
      subtitle: 'Ce que l’humanité a cherché aujourd’hui.',
      hook: 'Wikipédia dans 30 langues, toutes les heures, transformée en événements d’attention, en prévisions et en globe en direct.',
      meta: '30 langues · mis à jour toutes les heures · 14 hypothèses préenregistrées · 0 €',
      app: 'Ouvrir l’application ↗',
      repo: 'GitHub ↗',
      dataset: 'Jeu de données ↗',
    },

    question: {
      fig: 'fig. 01',
      title: 'La question',
      ask: 'Peut-on voir ce à quoi le monde prête attention, heure par heure, d’une langue à l’autre, avec des données publiques et gratuitement ?',
      p1: 'Toutes les heures, Wikimedia publie combien de fois chaque article de Wikipédia a été lu, pour plus de 300 éditions linguistiques. Wikidata relie un même sujet d’une édition à l’autre : « Lisbon », « Lisboa » et « リスボン » comptent pour un.',
      p2: 'La lecture mesure l’attention. Les modifications sont le signal rapide : les contributeurs réagissent en quelques minutes, alors que les chiffres de lecture d’une heure arrivent environ 3,2 heures après son début.',
      p3: 'Avant de regarder les données, j’ai écrit ce que je m’attendais à trouver, avec un seuil pour chaque affirmation. Le plus intéressant, c’est la part qui s’est révélée fausse.',
    },

    built: {
      fig: 'fig. 02',
      title: 'Ce que j’ai construit',
      standfirst: 'Deux chaînes de traitement sur une infrastructure gratuite, l’une pour les lecteurs, l’autre pour les contributeurs, réunies dans une seule application.',
      shotsCaption: 'La page d’accueil, sur ordinateur et sur téléphone : ce que les contributeurs modifient en ce moment, ce que les lecteurs ont cherché ces dernières 24 heures, et ce qui a le plus de chances de se propager.',
      shotDesktopAlt: 'L’application Looked Up sur un écran d’ordinateur. Un bandeau en haut liste les articles que les contributeurs modifient en ce moment. En dessous, le titre « Today the world looked up Gillian Anderson », 6 langues en 6 heures, en tête l’espagnol, à côté d’une carte du monde sombre avec des arcs du Mexique vers l’Europe, et la liste des trois articles les plus susceptibles de se propager.',
      shotPhoneAlt: 'La même page d’accueil sur téléphone : le bandeau des contributeurs en haut, puis le titre « Today the world looked up Gillian Anderson », la phrase de synthèse et la liste des prévisions.',
      archTitle: 'Architecture',
      archCaption: 'Chemin par lots, en retard de quelques heures mais complet : fichiers de consultations, lac, détection et prévisions, application. Chemin en direct, en minutes mais partiel : modifications récentes, Worker, bandeau « Right now » de l’application. Wikidata relie les articles entre les langues, et une tâche quotidienne recopie les pics du Worker dans le lac.',
      arch: {
        batch: 'lecteurs · heures',
        live: 'contributeurs · minutes',
        dumps: 'Fichiers de consultations',
        dumpsNote: 'horaires, ≈ 55 Mo',
        actions: 'GitHub Actions',
        actionsNote: 'ingestion, détection, prévision',
        lake: 'Lac Hugging Face',
        lakeNote: 'Parquet, ≈ 16 Go par an',
        rc: 'Modifications récentes',
        rcNote: 'API MediaWiki',
        worker: 'Cloudflare Worker',
        workerNote: 'TypeScript, chaque minute',
        store: 'D1 + KV',
        storeNote: 'des comptes, aucun utilisateur',
        app: 'L’application',
        appNote: 'GitHub Pages',
      },
      numbersTitle: 'En chiffres',
      numbers: [
        { v: '30', l: 'langues, 98,5 % des lectures humaines d’articles parmi les 60 plus grandes Wikipédia' },
        { v: '≈\u00a055 Mo', l: 'par fichier horaire, compressé' },
        { v: '≈\u00a016 Go', l: 'de lac par an' },
        { v: '37 386', l: 'événements d’attention en 84 jours' },
        { v: '124', l: 'planétaires : 20 langues ou plus' },
        { v: '1 h', l: 'entre deux mises à jour' },
        { v: '0 €', l: 'de budget, offres gratuites uniquement' },
      ],
      speedsTitle: 'Trois vitesses',
      speedLabel: 'Vitesse',
      shows: 'Dans l’application',
      speeds: [
        {
          n: 'Contributeurs',
          speed: 'minutes',
          body: 'Un Cloudflare Worker lit les modifications récentes de chaque Wikipédia toutes les 6 minutes et signale les articles que plusieurs contributeurs se pressent de mettre à jour. Il ne garde que des comptes, jamais de noms d’utilisateur.',
          shows: 'le bandeau « Right now »',
        },
        {
          n: 'Lecteurs',
          speed: 'heures',
          body: 'Toutes les heures, GitHub Actions ajoute le dernier fichier de consultations au lac et le note : un événement, c’est un sujet qui s’envole dans au moins 2 langues en moins de 6 heures, par rapport à sa propre base de 28 jours.',
          shows: 'événements, niveaux, globe',
        },
        {
          n: 'Prévision',
          speed: 'prochaines 24 h',
          body: 'Des modèles LightGBM estiment, une heure après la détection, si un événement atteindra 5 langues, et combien d’attention il lui reste pour les 24 heures suivantes.',
          shows: 'le badge « Spreading », le temps d’extinction',
        },
      ],
    },

    score: {
      fig: 'fig. 03',
      title: 'Le bilan',
      standfirst: '14 hypothèses, chacune déposée avec son seuil avant le code ou les données qui allaient la juger. 2 ont tenu.',
      supported: 'confirmée',
      rejected: 'rejetée',
      inconclusive: 'non concluante',
      cols: { h: 'Hypothèse', expected: 'Attendu', found: 'Constaté', verdict: 'Verdict' },
      note: '« Non concluante » veut toujours dire la même chose ici : l’échantillon minimum inscrit dans le préenregistrement n’a pas été atteint. Jamais « presque ».',
      phases: {
        p2: 'Phase 2 · événements',
        p2b: 'Phase 2b · événements datés',
        p4: 'Phase 4 · prévisions',
        p5: 'Phase 5 · modifications en direct',
      },
      rows: {
        h1: { name: 'Actualités', expected: 'Au moins 70 % des entrées majeures du portail Current events de Wikipédia apparaissent en moins de 6 heures.', found: '4,3 % (366 sur 8 461) : le portail recense conflits et politique, alors que les lecteurs s’envolent sur les décès et le sport.' },
        h2: { name: 'Langue de tête', expected: 'La première langue à s’envoler est celle du pays de l’événement dans au moins 60 % des cas.', found: '40,7 % (77 sur 189), et l’anglais mène 26,6 % de tous les événements.' },
        h3: { name: 'Filtre anti-robots', expected: 'Le filtre signale au moins 90 % des non-événements étiquetés.', found: '2 sur 9 signalés, et 9 non-événements, c’est moins que les 20 requis.' },
        h4: { name: 'Vitesse de diffusion', expected: 'Décès et catastrophes se diffusent entre les langues plus vite que le sport et le divertissement.', found: 'L’inverse : une médiane de 2,5 h contre 1,0 h (p\u00a0=\u00a01,0).' },
        h1b1: { name: 'Décès', expected: 'Au moins 60 % des décès notables sont détectés dans leur fenêtre de 24 heures.', found: '32,5 % (159 sur 489).' },
        h1b2: { name: 'Séismes', expected: 'Au moins 70 % des séismes de magnitude 6,5 ou plus sont détectés en moins de 6 heures.', found: '3 sur 9 (33 %), les manqués presque tous en mer ou en zone isolée.' },
        h1b3: { name: 'Matchs', expected: 'Au moins 90 % des matchs de Coupe du monde sont détectés dans les 3 heures du coup d’envoi.', found: '2 sur 2, moins que les 5 requis.' },
        h2b: { name: 'Langue des séismes', expected: 'Au moins 60 % des séismes détectés sont menés par une langue d’un pays touché.', found: '2 sur 4, moins que les 5 requis.' },
        h5: { name: 'Délai des séismes', expected: 'Délai médian entre le séisme et la détection de 4 heures au plus.', found: '0 h, mais sur 4 séismes détectés seulement, moins que les 5 requis.' },
        h6: { name: 'Devenir international', expected: 'Une heure après la détection : AUC d’au moins 0,80 et pente de calibration entre 0,8 et 1,2.', found: 'AUC 0,875 et pente 0,83, sur 17 jours jamais vus, notés une seule fois.' },
        h7: { name: 'La notoriété domine', expected: 'Le nombre de liens interlangues seul atteint au moins 70 % de la PR AUC du modèle.', found: '20 % (0,063 contre 0,310) : la première heure de lecture compte davantage.' },
        h8: { name: 'Attention restante', expected: 'La prévision à 24 heures bat une règle de décroissance médiane par catégorie d’au moins 20 % de MAE.', found: 'Erreur inférieure de 26 % (1,639 contre 2,205).' },
        h9: { name: 'Contributeurs d’abord', expected: 'Les pics de modifications arrivent au moins 60 minutes avant le premier pic de lecture.', found: 'Les lecteurs arrivent d’abord : les pics tombent en médiane 106 minutes après (n\u00a0=\u00a0134).' },
        h10: { name: 'Événements en direct', expected: 'Des pics dans 2 langues en moins de 30 minutes prédisent un événement de lecture avec une précision d’au moins 30 %.', found: 'Aucun événement en direct encore noté. Le verdict attend les 100 requis, qui s’accumulent chaque jour.' },
      },
    },

    findings: {
      fig: 'fig. 04',
      title: 'Ce que les données ont dit à la place',
      standfirst: 'Une hypothèse rejetée est aussi un résultat. Voici les cinq que je raconterais en premier.',
      source: 'Lire les résultats ↗',
      items: [
        {
          title: 'L’anglais ne mène que 26,6 % des événements.',
          body: 'Sur les 11 127 événements de l’analyse préenregistrée, Wikipédia en anglais s’est envolée la première dans 26,6 % des cas. Hors des pays anglophones, la langue locale a mené 36,6 % du temps : la proximité compte, sans dominer. Une partie des « têtes » non anglaises vient d’un petit wiki qui franchit son propre seuil une heure plus tôt.',
        },
        {
          title: 'Une finale atteint 29 langues dans la même heure. Un décès prend des heures.',
          body: 'Nicolás Otamendi, en finale de Coupe du monde, s’est envolé dans 29 langues en une heure. Le décès de Hayden Panettiere est parti de l’anglais et a atteint 28 langues en 2 heures. Sur l’ensemble des événements, décès et catastrophes se diffusent en une médiane de 2,5 h, sport et divertissement en 1,0 h, soit l’inverse de H4 : un événement programmé touche tout le monde à la fois, la nouvelle d’un décès voyage.',
          chart: 'spread',
          caption: 'Langues en pic, selon les heures écoulées depuis la première. Source : études de cas de la phase 2.',
          alt: 'Un graphique en escalier du nombre de langues en pic selon les heures écoulées depuis la première. Nicolás Otamendi en finale de Coupe du monde est à 29 langues dès l’heure 0. Le décès de Hayden Panettiere part d’une langue à l’heure 0, atteint 24 à l’heure 1 et 28 à l’heure 2.',
          axisX: 'heures depuis le pic de la première langue',
          axisY: 'langues',
          final: 'Finale de Coupe du monde (Otamendi)',
          death: 'Un décès (Panettiere)',
        },
        {
          title: 'Les plus gros événements manqués par le portail d’actualité sont surtout réels.',
          body: 'J’ai vérifié à la main les 30 plus gros événements que le portail Current events de Wikipédia en anglais n’a jamais liés. 25 sont réels : 15 décès, 7 sujets liés à la finale de Coupe du monde, 2 personnes dans l’actualité à cause d’un décès et un mariage de célébrité. 17 de ces 25 étaient menés par une édition non anglaise. Les pages quotidiennes du portail ne listent aucun décès.',
        },
        {
          title: 'Les lecteurs devancent les contributeurs, mais les contributeurs devancent les données.',
          body: 'Sur les 2 000 événements les plus larges, 134 seulement (6,7 %) ont eu un pic de modifications, arrivé en médiane 106 minutes après le premier pic de lecture. Les contributeurs étaient premiers dans 7,5 % des cas. Mais les chiffres de lecture d’une heure sont publiés environ 3,2 heures après son début : le pic de modifications est donc connu en médiane 86 minutes avant les données de lecture, dans 70 % de ces événements.',
          chart: 'lead',
          caption: '134 événements avec un pic de modifications. Barres à gauche de zéro : les lecteurs d’abord. Ligne pointillée : les 60 minutes préenregistrées.',
          alt: 'Un histogramme du temps entre le premier pic de lecture et le pic de modifications, pour 134 événements. Presque toutes les barres sont à gauche de zéro, la plus haute, 39 événements, dans l’heure juste avant zéro : les lecteurs se sont envolés d’abord. Seuls 10 événements sont à droite de zéro, où les contributeurs étaient premiers. Le seuil préenregistré de 60 minutes est une ligne pointillée à plus une heure, et la médiane est de 106 minutes du côté des lecteurs.',
          axisX: 'premier pic de lecture moins pic de modifications, heures',
          axisY: 'événements',
          readers: 'lecteurs d’abord',
          editors: 'contributeurs d’abord',
        },
        {
          title: 'La notoriété explique un cinquième de la diffusion mondiale.',
          body: 'Le nombre de Wikipédia qui ont un article sur un sujet n’atteint seul que 20 % de la PR AUC du modèle (0,063 contre 0,310). La première heure de lecture compte davantage : le modèle atteint une AUC de 0,875 une heure après la détection et 0,919 après trois. Il est trop sûr de lui au milieu de l’échelle, où une prévision de 44 % s’est réalisée 34 % du temps.',
          chart: 'calibration',
          caption: 'Calibration sur le jeu de test, une heure après la détection, 10 classes. Sur la diagonale, une prévision de x % se réalise x % du temps.',
          alt: 'Un graphique de calibration de la prévision « devenir international », une heure après la détection. Les points du modèle suivent la diagonale aux faibles probabilités, passent en dessous au milieu, où une prévision de 44 % s’est réalisée 34 % du temps, et finissent vers 74 % prévus contre 80 % observés. Le modèle fondé sur les seuls liens interlangues est un point unique près de zéro.',
          axisX: 'probabilité prévue',
          axisY: 'part observée',
          model: 'modèle',
          fame: 'notoriété seule',
        },
      ],
    },

    events: {
      fig: 'fig. 05',
      title: 'Trois événements',
      standfirst: 'Chacun s’ouvre dans l’application, à sa date, avec sa diffusion sur le globe.',
      open: 'Ouvrir dans l’application ↗',
      items: [
        {
          key: 'panettiere',
          kicker: 'Le plus gros',
          title: 'Hayden Panettiere',
          when: '17 août, 02:00 UTC',
          body: '28 langues en 2 heures, 14,4 M de consultations en excès. L’anglais a mené, 23 langues ont suivi dans l’heure et 4 de plus l’heure d’après.',
        },
        {
          key: 'final',
          kicker: 'Le plus rapide',
          title: 'La finale de la Coupe du monde',
          when: '19 juil., 19:00 UTC',
          body: 'Nicolás Otamendi s’est envolé dans 29 langues dans la même heure. Lamine Yamal, lors de la même finale, a atteint les 30 en 9 heures.',
        },
        {
          key: 'higashino',
          kicker: 'Celui que l’anglais a manqué',
          title: 'Keigo Higashino',
          when: '27 juil., 07:00 UTC',
          body: 'Mené par Wikipédia en japonais, qui a porté l’essentiel de l’attention : 1,1 M de consultations en excès, 8 langues en 3 heures. Manqué par le portail anglais, dont les pages quotidiennes ne listent aucun décès.',
        },
      ],
    },

    limits: {
      fig: 'fig. 06',
      title: 'Limites, honnêtement',
      standfirst: 'Ce que ce projet ne peut pas dire, à côté de ce qu’il peut dire.',
      items: [
        { title: 'Des heures de retard', body: 'Les chiffres de lecture d’une heure arrivent environ 3,2 heures après son début, surtout à cause du délai médian de ≈ 2,2 h des fichiers Wikimedia. La couche en direct comble cet écart, mais seulement pour la part de l’attention que touchent les contributeurs.' },
        { title: 'Des langues, pas des pays', body: 'Les données par pays de Wikimedia sont quotidiennes, limitées au top 1 000 et arrondies, et 18 des 38 pays testés sont masqués. Le globe colore des communautés linguistiques, jamais des pays.' },
        { title: 'Biais de notoriété', body: 'La détection favorise les célèbres : 23 % des décès notables sont repérés pour les personnes ayant un article dans 5 à 9 langues, 54 % pour celles qui en ont 20 ou plus.' },
        { title: 'Le planétaire sur 3 événements', body: 'Le jeu de test des prévisions ne comptait que 3 événements planétaires : ces résultats sont rapportés, pas interprétés. L’application n’affiche une chance planétaire qu’au-dessus de 30 %, avec cet avertissement.' },
        { title: 'Les robots', body: 'Le trafic automatisé est repéré par une heuristique : les titres de plus de 1 000 consultations avec moins de 5 % sur mobile. Elle manque les pics d’une heure sur des pages très mobiles, d’où vient le seul faux positif des études de cas.' },
        { title: 'Le Worker à la limite', body: 'Les relevés du Worker en direct prennent en médiane 10 ms de CPU (p95 16 ms), pour une limite gratuite de 10 ms. Cloudflare n’a rejeté aucun des 85 relevés observés, et une vérification quotidienne prévient si cela change.' },
      ],
    },

    stack: {
      fig: 'fig. 07',
      title: 'Outils et méthode',
      standfirst: 'Uniquement des offres gratuites, et chaque décision écrite.',
      read: 'Lire ↗',
      items: [
        { key: 'prereg', title: 'Préenregistrement', body: 'Les hypothèses, seuils et règles de rejet de chaque phase ont été déposés avant le code ou les données qui les jugent. Les fichiers ne sont jamais modifiés ensuite.' },
        { key: 'adr', title: '33 décisions consignées', body: 'Une par décision, écarts au préenregistrement compris : ils sont consignés dans de nouvelles fiches, jamais réécrits dans le plan.' },
        { key: 'results', title: 'Les résultats, échecs compris', body: 'Un fichier de résultats par phase, avec ses sorties brutes, ses limites et les commandes qui le reproduisent.' },
        { key: 'ops', title: 'Exploitation', body: 'Où tout tourne et où tout est stocké, ce que fait chaque workflow, et quoi faire quand quelque chose casse.' },
      ],
    },

    footer: {
      note: 'Données : consultations Wikimedia et Wikidata, CC0. Chaque chiffre de cette page vient des fichiers de résultats du projet.',
      repo: 'Dépôt ↗',
      home: 'Retour à sbaiii.com',
    },
  },

  es: {
    lang: { code: 'ES' },
    back: 'Volver al portfolio',
    nav: { home: 'Inicio', repo: 'Repositorio', app: 'La aplicación' },

    hero: {
      fig: 'fig. 00',
      kicker: 'Caso práctico',
      status: 'En directo',
      title: 'Looked Up',
      subtitle: 'Lo que la humanidad buscó hoy.',
      hook: 'Wikipedia en 30 idiomas, cada hora, convertida en eventos de atención, previsiones y un globo en directo.',
      meta: '30 idiomas · actualizado cada hora · 14 hipótesis preregistradas · 0 €',
      app: 'Abrir la aplicación ↗',
      repo: 'GitHub ↗',
      dataset: 'Conjunto de datos ↗',
    },

    question: {
      fig: 'fig. 01',
      title: 'La pregunta',
      ask: '¿Podemos ver a qué presta atención el mundo, hora a hora, entre idiomas, con datos públicos y gratis?',
      p1: 'Cada hora, Wikimedia publica cuántas veces se leyó cada artículo de Wikipedia, en más de 300 ediciones de idioma. Wikidata une el mismo tema entre ellas, así que «Lisbon», «Lisboa» y «リスボン» cuentan como uno.',
      p2: 'La lectura mide la atención. Las ediciones son la señal rápida: los editores reaccionan en minutos, mientras que las cifras de lectura de una hora llegan unas 3,2 horas después de que empiece.',
      p3: 'Antes de mirar los datos, escribí lo que esperaba encontrar, con un umbral para cada afirmación. Lo interesante es cuánto resultó ser falso.',
    },

    built: {
      fig: 'fig. 02',
      title: 'Lo que construí',
      standfirst: 'Dos cadenas de procesamiento sobre infraestructura gratuita, una para lectores y otra para editores, que se juntan en una aplicación.',
      shotsCaption: 'La portada, en ordenador y en móvil: lo que los editores están actualizando ahora, lo que los lectores buscaron en las últimas 24 horas y lo que tiene más probabilidades de propagarse.',
      shotDesktopAlt: 'La aplicación Looked Up en una pantalla de ordenador. Una franja arriba enumera los artículos que los editores están actualizando ahora. Debajo, el titular «Today the world looked up Gillian Anderson», 6 idiomas en 6 horas, liderado por el español, junto a un mapa del mundo oscuro con arcos de México a Europa, y la lista de los tres artículos con más probabilidades de propagarse.',
      shotPhoneAlt: 'La misma portada en un móvil: la franja de los editores arriba, luego el titular «Today the world looked up Gillian Anderson», la frase de resumen y la lista de previsiones.',
      archTitle: 'Arquitectura',
      archCaption: 'Ruta por lotes, con horas de retraso pero completa: volcados de visitas, el lago, la detección y las previsiones, la aplicación. Ruta en directo, en minutos pero parcial: cambios recientes, el Worker, la franja «Right now» de la aplicación. Wikidata une los artículos entre idiomas, y una tarea diaria copia los picos del Worker al lago.',
      arch: {
        batch: 'lectores · horas',
        live: 'editores · minutos',
        dumps: 'Volcados de visitas',
        dumpsNote: 'cada hora, ≈ 55 MB',
        actions: 'GitHub Actions',
        actionsNote: 'ingesta, detección, previsión',
        lake: 'Lago en Hugging Face',
        lakeNote: 'Parquet, ≈ 16 GB al año',
        rc: 'Cambios recientes',
        rcNote: 'API de MediaWiki',
        worker: 'Cloudflare Worker',
        workerNote: 'TypeScript, cada minuto',
        store: 'D1 + KV',
        storeNote: 'solo recuentos, sin usuarios',
        app: 'La aplicación',
        appNote: 'GitHub Pages',
      },
      numbersTitle: 'En cifras',
      numbers: [
        { v: '30', l: 'idiomas, el 98,5 % de las lecturas humanas de artículos entre las 60 Wikipedias más grandes' },
        { v: '≈\u00a055 MB', l: 'por volcado horario, comprimido' },
        { v: '≈\u00a016 GB', l: 'de lago al año' },
        { v: '37.386', l: 'eventos de atención en 84 días' },
        { v: '124', l: 'planetarios: 20 idiomas o más' },
        { v: '1 h', l: 'entre actualizaciones' },
        { v: '0 €', l: 'de presupuesto, solo niveles gratuitos' },
      ],
      speedsTitle: 'Tres velocidades',
      speedLabel: 'Velocidad',
      shows: 'En la aplicación',
      speeds: [
        {
          n: 'Editores',
          speed: 'minutos',
          body: 'Un Cloudflare Worker lee los cambios recientes de cada Wikipedia cada 6 minutos y señala los artículos que varios editores se apresuran a actualizar. Solo guarda recuentos, nunca nombres de usuario.',
          shows: 'la franja «Right now»',
        },
        {
          n: 'Lectores',
          speed: 'horas',
          body: 'Cada hora, GitHub Actions añade el volcado de visitas más reciente al lago y lo puntúa: un evento es un tema que se dispara en 2 o más idiomas en menos de 6 horas, frente a su propia base de 28 días.',
          shows: 'eventos, niveles, el globo',
        },
        {
          n: 'Previsión',
          speed: 'próximas 24 h',
          body: 'Modelos LightGBM estiman, una hora después de la detección, si un evento llegará a 5 idiomas y cuánta atención le queda en las 24 horas siguientes.',
          shows: 'la etiqueta «Spreading», el tiempo de apagado',
        },
      ],
    },

    score: {
      fig: 'fig. 03',
      title: 'El balance',
      standfirst: '14 hipótesis, cada una registrada con su umbral antes del código o los datos que la iban a juzgar. Se sostuvieron 2.',
      supported: 'confirmada',
      rejected: 'rechazada',
      inconclusive: 'no concluyente',
      cols: { h: 'Hipótesis', expected: 'Esperado', found: 'Encontrado', verdict: 'Veredicto' },
      note: '«No concluyente» significa siempre lo mismo aquí: no se alcanzó la muestra mínima escrita en el preregistro. Nunca significa «casi».',
      phases: {
        p2: 'Fase 2 · eventos',
        p2b: 'Fase 2b · eventos fechados',
        p4: 'Fase 4 · previsiones',
        p5: 'Fase 5 · ediciones en directo',
      },
      rows: {
        h1: { name: 'Actualidad', expected: 'Al menos el 70 % de las entradas principales del portal Current events de Wikipedia aparecen en menos de 6 horas.', found: '4,3 % (366 de 8.461): el portal recoge conflictos y política, mientras que los lectores se disparan con muertes y deporte.' },
        h2: { name: 'Idioma líder', expected: 'El primer idioma en dispararse es el del país del evento en al menos el 60 % de los casos.', found: '40,7 % (77 de 189), y el inglés lidera el 26,6 % de todos los eventos.' },
        h3: { name: 'Filtro de bots', expected: 'El filtro marca al menos el 90 % de los no eventos etiquetados.', found: '2 de 9 marcados, y 9 no eventos no llegan a los 20 exigidos.' },
        h4: { name: 'Velocidad de difusión', expected: 'Las muertes y los desastres se difunden entre idiomas más rápido que el deporte y el entretenimiento.', found: 'Al revés: una mediana de 2,5 h frente a 1,0 h (p\u00a0=\u00a01,0).' },
        h1b1: { name: 'Muertes', expected: 'Al menos el 60 % de las muertes notables se detectan dentro de su ventana de 24 horas.', found: '32,5 % (159 de 489).' },
        h1b2: { name: 'Terremotos', expected: 'Al menos el 70 % de los terremotos de magnitud 6,5 o más se detectan en menos de 6 horas.', found: '3 de 9 (33 %), los perdidos casi todos en el mar o en zonas remotas.' },
        h1b3: { name: 'Partidos', expected: 'Al menos el 90 % de los partidos del Mundial se detectan en las 3 horas siguientes al saque inicial.', found: '2 de 2, por debajo de los 5 exigidos.' },
        h2b: { name: 'Idioma de los terremotos', expected: 'Al menos el 60 % de los terremotos detectados los lidera un idioma de un país afectado.', found: '2 de 4, por debajo de los 5 exigidos.' },
        h5: { name: 'Retraso de los terremotos', expected: 'Retraso mediano entre el terremoto y la detección de 4 horas o menos.', found: '0 h, pero con solo 4 terremotos detectados, por debajo de los 5 exigidos.' },
        h6: { name: 'Volverse internacional', expected: 'Una hora después de la detección: AUC de al menos 0,80 y pendiente de calibración entre 0,8 y 1,2.', found: 'AUC 0,875 y pendiente 0,83, en 17 días no vistos, puntuados una sola vez.' },
        h7: { name: 'La fama domina', expected: 'El número de enlaces entre idiomas por sí solo alcanza al menos el 70 % de la PR AUC del modelo.', found: '20 % (0,063 frente a 0,310): la primera hora de lectura pesa más.' },
        h8: { name: 'Atención restante', expected: 'La previsión a 24 horas mejora en al menos un 20 % de MAE una regla de decaimiento mediano por categoría.', found: 'Un 26 % menos de error (1,639 frente a 2,205).' },
        h9: { name: 'Primero los editores', expected: 'Los picos de ediciones llegan al menos 60 minutos antes del primer pico de lectura.', found: 'Primero llegan los lectores: los picos caen una mediana de 106 minutos después (n\u00a0=\u00a0134).' },
        h10: { name: 'Eventos en directo', expected: 'Picos en 2 idiomas en menos de 30 minutos predicen un evento de lectura con una precisión de al menos el 30 %.', found: 'Aún no se ha puntuado ningún evento en directo. El veredicto espera a los 100 exigidos, que se acumulan cada día.' },
      },
    },

    findings: {
      fig: 'fig. 04',
      title: 'Lo que dijeron los datos en su lugar',
      standfirst: 'Una hipótesis rechazada también es un resultado. Estas son las cinco que contaría primero.',
      source: 'Leer los resultados ↗',
      items: [
        {
          title: 'El inglés lidera solo el 26,6 % de los eventos.',
          body: 'En el análisis preregistrado de 11.127 eventos, la Wikipedia en inglés se disparó primero en el 26,6 %. Fuera de los países de habla inglesa, el idioma local lideró el 36,6 % de las veces: la cercanía importa, pero no domina. Parte del liderazgo no inglés es una wiki pequeña que cruza su propio umbral una hora antes.',
        },
        {
          title: 'Una final llega a 29 idiomas en la misma hora. Una muerte tarda horas.',
          body: 'Nicolás Otamendi, en la final del Mundial, se disparó en 29 idiomas en una hora. La muerte de Hayden Panettiere empezó en inglés y llegó a 28 idiomas en 2 horas. En el conjunto de eventos, las muertes y los desastres se difunden en una mediana de 2,5 h y el deporte y el entretenimiento en 1,0 h, al revés que H4: un evento programado llega a todos a la vez, mientras que la noticia de una muerte viaja.',
          chart: 'spread',
          caption: 'Idiomas en pico, según las horas desde el primero. Fuente: casos de la fase 2.',
          alt: 'Un gráfico escalonado de cuántos idiomas se habían disparado, según las horas desde el primero. Nicolás Otamendi en la final del Mundial está en 29 idiomas desde la hora 0. La muerte de Hayden Panettiere empieza en 1 idioma en la hora 0, llega a 24 en la hora 1 y a 28 en la hora 2.',
          axisX: 'horas desde el pico del primer idioma',
          axisY: 'idiomas',
          final: 'Final del Mundial (Otamendi)',
          death: 'Una muerte (Panettiere)',
        },
        {
          title: 'Los mayores eventos que el portal de noticias no recogió son, en su mayoría, reales.',
          body: 'Revisé a mano los 30 mayores eventos que el portal Current events de la Wikipedia en inglés nunca enlazó. 25 son reales: 15 muertes, 7 temas de la final del Mundial, 2 personas en las noticias por una muerte y una boda de famosos. 17 de esos 25 los lideró una edición no inglesa. Las páginas diarias del portal no recogen ninguna muerte.',
        },
        {
          title: 'Los lectores van por delante de los editores, pero los editores van por delante de los datos.',
          body: 'De los 2.000 eventos más amplios, solo 134 (6,7 %) tuvieron un pico de ediciones, y el pico mediano llegó 106 minutos después del primer pico de lectura. Los editores fueron primero en el 7,5 %. Pero las cifras de lectura de una hora se publican unas 3,2 horas después de que empiece, así que el pico se conoce una mediana de 86 minutos antes que los datos de lectura, en el 70 % de esos eventos.',
          chart: 'lead',
          caption: '134 eventos con pico de ediciones. Barras a la izquierda de cero: primero los lectores. Línea de puntos: los 60 minutos preregistrados.',
          alt: 'Un histograma del tiempo entre el primer pico de lectura y el pico de ediciones, para 134 eventos. Casi todas las barras están a la izquierda de cero, la más alta, 39 eventos, en la hora justo antes de cero: los lectores se dispararon primero. Solo 10 eventos están a la derecha de cero, donde los editores fueron primero. El umbral preregistrado de 60 minutos es una línea de puntos en más una hora, y la mediana es de 106 minutos del lado de los lectores.',
          axisX: 'primer pico de lectura menos pico de ediciones, horas',
          axisY: 'eventos',
          readers: 'primero los lectores',
          editors: 'primero los editores',
        },
        {
          title: 'La fama explica una quinta parte de volverse global.',
          body: 'Cuántas Wikipedias tienen un artículo sobre un tema alcanza por sí solo apenas el 20 % de la PR AUC del modelo (0,063 frente a 0,310). La primera hora de lectura pesa más: el modelo llega a un AUC de 0,875 una hora después de la detección y de 0,919 a las tres. Es demasiado confiado en la mitad de la escala, donde una previsión del 44 % se cumplió el 34 % de las veces.',
          chart: 'calibration',
          caption: 'Calibración en el conjunto de prueba, una hora después de la detección, 10 intervalos. Sobre la diagonal, una previsión del x % se cumple el x % de las veces.',
          alt: 'Un gráfico de calibración de la previsión de volverse internacional, una hora después de la detección. Los puntos del modelo siguen la diagonal en probabilidades bajas, caen por debajo en la mitad, donde una previsión del 44 % se cumplió el 34 % de las veces, y terminan cerca del 74 % previsto frente al 80 % observado. El modelo basado solo en enlaces entre idiomas es un único punto cerca de cero.',
          axisX: 'probabilidad prevista',
          axisY: 'proporción observada',
          model: 'modelo',
          fame: 'solo la fama',
        },
      ],
    },

    events: {
      fig: 'fig. 05',
      title: 'Tres eventos',
      standfirst: 'Cada uno se abre en la aplicación, en su día, con su difusión en el globo.',
      open: 'Abrir en la aplicación ↗',
      items: [
        {
          key: 'panettiere',
          kicker: 'El mayor',
          title: 'Hayden Panettiere',
          when: '17 ago., 02:00 UTC',
          body: '28 idiomas en 2 horas, 14,4 M de visitas en exceso. Lideró el inglés, 23 idiomas siguieron en la hora siguiente y 4 más en la de después.',
        },
        {
          key: 'final',
          kicker: 'El más rápido',
          title: 'La final del Mundial',
          when: '19 jul., 19:00 UTC',
          body: 'Nicolás Otamendi se disparó en 29 idiomas en la misma hora. Lamine Yamal, en la misma final, llegó a los 30 en 9 horas.',
        },
        {
          key: 'higashino',
          kicker: 'El que el inglés no vio',
          title: 'Keigo Higashino',
          when: '27 jul., 07:00 UTC',
          body: 'Lo lideró la Wikipedia en japonés, que concentró casi toda la atención: 1,1 M de visitas en exceso, 8 idiomas en 3 horas. El portal en inglés no lo recogió: sus páginas diarias no incluyen muertes.',
        },
      ],
    },

    limits: {
      fig: 'fig. 06',
      title: 'Limitaciones, con honestidad',
      standfirst: 'Lo que este proyecto no puede decir, junto a lo que sí.',
      items: [
        { title: 'Horas de retraso', body: 'Las cifras de lectura de una hora llegan unas 3,2 horas después de que empiece, sobre todo por el retraso mediano de ≈ 2,2 h de los volcados de Wikimedia. La capa en directo cubre ese hueco, pero solo para la parte de la atención que tocan los editores.' },
        { title: 'Idiomas, no países', body: 'Los datos por país de Wikimedia son diarios, limitados al top 1.000 y redondeados, y 18 de los 38 países consultados están ocultos. El globo colorea comunidades de idioma, nunca países.' },
        { title: 'Sesgo de fama', body: 'La detección favorece a los famosos: se detecta el 23 % de las muertes notables de personas con artículo en 5 a 9 idiomas, y el 54 % de las que lo tienen en 20 o más.' },
        { title: 'Lo planetario, sobre 3 eventos', body: 'El conjunto de prueba de las previsiones solo tenía 3 eventos planetarios, así que esos resultados se informan, no se interpretan. La aplicación solo muestra una probabilidad planetaria por encima del 30 %, con esa advertencia.' },
        { title: 'Bots', body: 'El tráfico automatizado se detecta con una heurística: títulos con más de 1.000 visitas y menos del 5 % en móvil. Se le escapan los picos de una hora en páginas muy móviles, que es de donde salió el único falso positivo de los casos.' },
        { title: 'El Worker al límite', body: 'Las consultas del Worker en directo usan una mediana de 10 ms de CPU (p95 16 ms), frente al límite gratuito de 10 ms. Cloudflare no rechazó ninguna de las 85 consultas observadas, y una comprobación diaria avisa si eso cambia.' },
      ],
    },

    stack: {
      fig: 'fig. 07',
      title: 'Herramientas y método',
      standfirst: 'Solo niveles gratuitos, y cada decisión por escrito.',
      read: 'Leer ↗',
      items: [
        { key: 'prereg', title: 'Preregistro', body: 'Las hipótesis, los umbrales y las reglas de rechazo de cada fase se registraron antes del código o los datos que las juzgan. Los archivos no se modifican después.' },
        { key: 'adr', title: '33 registros de decisión', body: 'Uno por decisión, incluidas las desviaciones del preregistro: se anotan como registros nuevos, nunca se reescriben en el plan.' },
        { key: 'results', title: 'Resultados, con los fallos', body: 'Un archivo de resultados por fase, con sus salidas en bruto, sus limitaciones y los comandos que lo reproducen.' },
        { key: 'ops', title: 'Operaciones', body: 'Dónde corre y dónde vive cada cosa, qué hace cada workflow y qué hacer cuando algo falla.' },
      ],
    },

    footer: {
      note: 'Datos: visitas de Wikimedia y Wikidata, CC0. Cada cifra de esta página sale de los archivos de resultados del proyecto.',
      repo: 'Repositorio ↗',
      home: 'Volver a sbaiii.com',
    },
  },
};

/* =============================================================================
   Build log for the Negative Hours case study.

   Add one entry per working day at the TOP of the array. Newest first.

       { date: '2026-10-02', en: '…', fr: '…', es: '…' }

   `date` is ISO so it sorts and formats per language on its own. If you only
   write the English line, the page falls back to it rather than showing a gap.
   ========================================================================== */

export const LOG = [
  {
    date: '2026-10-03',
    en: 'Q4 answered: the cheapest hour moved from night to midday.',
    fr: 'Q4 répondue : l’heure la moins chère est passée de la nuit à la mi-journée.',
    es: 'Q4 respondida: la hora más barata pasó de la noche al mediodía.',
  },
  {
    date: '2026-10-03',
    en: 'Q3 answered: battery value by zone, solved as 67,002 linear programs.',
    fr: 'Q3 répondue : valeur d’une batterie par zone, résolue en 67 002 programmes linéaires.',
    es: 'Q3 respondida: valor de una batería por zona, resuelto con 67.002 programas lineales.',
  },
  {
    date: '2026-10-03',
    en: 'Q2 answered: solar capture rates, validated against official German market values.',
    fr: 'Q2 répondue : taux de captation du solaire, validés face aux valeurs de marché officielles allemandes.',
    es: 'Q2 respondida: tasas de captura solar, validadas frente a los valores de mercado oficiales alemanes.',
  },
  {
    date: '2026-10-03',
    en: 'Q1 answered: negative hours by zone, 2019 → 2026.',
    fr: 'Q1 répondue : heures négatives par zone, 2019 → 2026.',
    es: 'Q1 respondida: horas negativas por zona, 2019 → 2026.',
  },
  {
    date: '2026-10-03',
    en: 'dbt warehouse built. The results match published German statistics exactly.',
    fr: 'Entrepôt dbt construit. Les résultats correspondent exactement aux statistiques allemandes publiées.',
    es: 'Almacén dbt construido. Los resultados coinciden exactamente con las estadísticas alemanas publicadas.',
  },
  {
    date: '2026-10-03',
    en: 'Resolution bug found in the raw data and fixed, with 14 pipeline tests behind it.',
    fr: 'Bug de résolution détecté dans les données brutes et corrigé, avec 14 tests de pipeline derrière.',
    es: 'Error de resolución detectado en los datos brutos y corregido, con 14 tests de pipeline detrás.',
  },
  {
    date: '2026-10-02',
    en: 'Full backfill: prices, generation and load, 8 zones, 2019 → 2026.',
    fr: 'Historique complet récupéré : prix, production et consommation, 8 zones, 2019 → 2026.',
    es: 'Histórico completo descargado: precios, generación y demanda, 8 zonas, 2019 → 2026.',
  },
  {
    date: '2026-10-02',
    en: 'ENTSO-E API access granted, and the first real data downloaded.',
    fr: 'Accès à l’API ENTSO-E accordé, et premières données réelles téléchargées.',
    es: 'Acceso a la API de ENTSO-E concedido, y primeros datos reales descargados.',
  },
  {
    date: '2026-10-01',
    en: 'Bidding zones chosen: eight, picked for contrast rather than convenience.',
    fr: 'Zones de marché choisies : huit, retenues pour leur contraste plutôt que par commodité.',
    es: 'Zonas de mercado elegidas: ocho, seleccionadas por contraste y no por comodidad.',
  },
  {
    date: '2026-10-01',
    en: 'Day-ahead price extractor written and tested against the ENTSO-E API.',
    fr: 'Extracteur des prix day-ahead écrit et testé sur l’API ENTSO-E.',
    es: 'Extractor de precios day-ahead escrito y probado contra la API de ENTSO-E.',
  },
  {
    date: '2026-10-01',
    en: 'Project scoped, repository and decision log set up.',
    fr: 'Projet cadré, dépôt et journal de décisions mis en place.',
    es: 'Proyecto acotado, repositorio y registro de decisiones creados.',
  },
];

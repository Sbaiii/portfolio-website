/* =============================================================================
   Build log for the Negative Hours case study.

   Add one entry per working day at the TOP of the array. Newest first.

       { date: '2026-10-02', en: '…', fr: '…', es: '…' }

   `date` is ISO so it sorts and formats per language on its own. If you only
   write the English line, the page falls back to it rather than showing a gap.
   ========================================================================== */

export const LOG = [
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

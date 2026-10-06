#!/usr/bin/env python3
"""Write FIXTURE data files for the Ticket to Breathe page.

These exist so the page can be built and reviewed before the analysis ships.
Every file carries "status": "FIXTURE"; the page refuses to print a number from
any file whose status is not "FINAL". Replace them wholesale with the exports
from github.com/Sbaiii/ticket-to-breathe (dashboard/data/) and nothing on the
page needs to change.

    python3 make_fixtures.py
"""
import json, math, os, random

HERE = os.path.dirname(os.path.abspath(__file__))
STATUS = 'FIXTURE'
GENERATED = '2026-10-06T00:00:00Z'
CONTROLS = ['AT', 'BE', 'CH', 'CZ', 'FR', 'NL', 'PL']
rng = random.Random(20261006)


def write(name, payload):
    with open(os.path.join(HERE, name), 'w', encoding='utf-8') as fh:
        json.dump(payload, fh, ensure_ascii=False, indent=2, sort_keys=False)
        fh.write('\n')
    print('wrote', name)


# --- meta -------------------------------------------------------------------
by_country = {'DE': 268}
for cc in CONTROLS:
    by_country[cc] = rng.randint(28, 140)

write('meta.json', {
    'status': STATUS,
    'generated_utc': GENERATED,
    'n_stations': {
        'DE': by_country['DE'],
        'controls': sum(by_country[c] for c in CONTROLS),
        'by_country': by_country,
    },
    'n_station_days': 1_955_000,
    'control_countries': CONTROLS,
    'analysis_window': {'start': '2018-01-01', 'end': '2025-12-31'},
    'weather_grid_deg': 0.25,
})

# --- headline ---------------------------------------------------------------
FAMILIES = [
    ('nine_euro', 'nine_euro_ticket', 'did'),
    ('dticket', 'deutschlandticket', 'did'),
    ('nine_euro_sc', 'nine_euro_ticket', 'synthetic_control'),
]
headline = []
for i, (hid, label, family) in enumerate(FAMILIES):
    for outcome in ('no2_deweathered', 'no2_raw'):
        est = round(rng.uniform(-9.5, 1.5), 2)
        half = round(rng.uniform(1.4, 4.2), 2)
        headline.append({
            'id': '%s__%s' % (hid, outcome),
            'label': label,
            'family': family,
            'outcome': outcome,
            'estimate': est,
            'ci_low': round(est - half, 2),
            'ci_high': round(est + half, 2),
            'placebo_min': round(est - rng.uniform(5, 9), 2),
            'placebo_max': round(est + rng.uniform(5, 9), 2),
            'verdict': rng.choice(['inconclusive', 'consistent', 'not_detected']),
            'direction': 'negative' if est < 0 else 'positive',
            'n_de': by_country['DE'],
            'n_ctrl': sum(by_country[c] for c in CONTROLS),
        })
write('headline.json', headline)

# --- event study ------------------------------------------------------------
MONTHS = ['%d-%02d' % (y, m) for y in (2021, 2022, 2023) for m in range(1, 13)]
event = []
for variant in ('nine_euro', 'dticket'):
    for month in MONTHS:
        est = round(rng.uniform(-7.0, 3.0), 2)
        half = round(rng.uniform(1.2, 3.6), 2)
        event.append({'month': month, 'variant': variant,
                      'est': est, 'lo': round(est - half, 2), 'hi': round(est + half, 2)})
write('event_study.json', event)

# --- synthetic control ------------------------------------------------------
weights = {}
left = 1.0
for cc in CONTROLS[:-1]:
    w = round(rng.uniform(0, left * 0.6), 3)
    weights[cc] = w
    left = round(left - w, 3)
weights[CONTROLS[-1]] = round(max(left, 0.0), 3)

series = []
for month in MONTHS:
    actual = round(rng.uniform(14, 34), 2)
    series.append({'month': month, 'actual': actual,
                   'synthetic': round(actual + rng.uniform(-4.5, 4.5), 2)})
write('synthetic_control.json', {
    'weights': weights,
    'series': series,
    'rank_jun_aug_2022': rng.randint(1, 8),
    'rank_may_dec_2023': rng.randint(1, 8),
    'n_units': len(CONTROLS) + 1,
})

# --- placebos ---------------------------------------------------------------
placebos = []
for cc in CONTROLS:
    est = round(rng.uniform(-6.5, 6.5), 2)
    half = round(rng.uniform(1.5, 4.0), 2)
    placebos.append({'kind': 'in_space', 'label': cc, 'outcome': 'no2_deweathered',
                     'estimate': est, 'lo': round(est - half, 2), 'hi': round(est + half, 2)})
for year in (2018, 2019, 2021):
    est = round(rng.uniform(-5.5, 5.5), 2)
    half = round(rng.uniform(1.5, 4.0), 2)
    placebos.append({'kind': 'in_time', 'label': str(year), 'outcome': 'no2_deweathered',
                     'estimate': est, 'lo': round(est - half, 2), 'hi': round(est + half, 2)})
write('placebos.json', placebos)

# --- map --------------------------------------------------------------------
CENTROIDS = {
    'DE': (10.45, 51.17), 'AT': (14.55, 47.52), 'BE': (4.47, 50.50),
    'CH': (8.23, 46.82), 'CZ': (15.47, 49.82), 'FR': (2.21, 46.23),
    'NL': (5.29, 52.13), 'PL': (19.15, 51.92),
}
NAMES = {'DE': 'Germany', 'AT': 'Austria', 'BE': 'Belgium', 'CH': 'Switzerland',
         'CZ': 'Czechia', 'FR': 'France', 'NL': 'Netherlands', 'PL': 'Poland'}
TYPES = ['urban_traffic', 'urban_background', 'suburban_background']

countries, stations = [], []
for cc, (lon, lat) in CENTROIDS.items():
    countries.append({
        'cc': cc, 'name': NAMES[cc],
        'value_nine_euro': round(rng.uniform(-11, 6), 2),
        'value_dticket': round(rng.uniform(-11, 6), 2),
        'n_stations': by_country[cc], 'lat': lat, 'lon': lon,
    })
    for k in range(min(by_country[cc], 26)):
        stations.append({
            'id': '%s%04d' % (cc, k),
            'cc': cc,
            'type': TYPES[k % 3],
            'lat': round(lat + rng.uniform(-2.2, 2.2), 3),
            'lon': round(lon + rng.uniform(-3.2, 3.2), 3),
        })
write('map.json', {'status': STATUS, 'countries': countries, 'stations': stations})

# --- timeline ---------------------------------------------------------------
write('timeline.json', [
    {'id': 'nine_euro', 'name': '€9 ticket', 'start': '2022-06-01', 'end': '2022-08-31',
     'kind': 'treatment'},
    {'id': 'tankrabatt', 'name': 'Tankrabatt', 'start': '2022-06-01', 'end': '2022-08-31',
     'kind': 'confounder'},
    {'id': 'dticket', 'name': 'Deutschlandticket', 'start': '2023-05-01', 'end': None,
     'kind': 'treatment'},
])

#!/usr/bin/env python3
"""Placeholder country outlines for the Ticket to Breathe map.

These are NOT real borders. Each country is a coarse ring derived from its
bounding box with a deterministic wobble, placed at roughly the right spot, so
the map code (projection, colour scale, hit testing, legend, station dots) can
be built and reviewed before the real file arrives. The FeatureCollection
carries "fixture_geometry": true and the page says so under the map while it
is set.

Replace with the real countries.geojson from the analysis repo. The only
property the page reads is ISO_A2.
"""
import json, math, os, random

HERE = os.path.dirname(os.path.abspath(__file__))
rng = random.Random(4242)

# cc: (west, south, east, north, in_study)
BOX = {
    'DE': (5.9, 47.3, 15.0, 55.1, True),
    'FR': (-4.8, 42.3, 8.2, 51.1, True),
    'NL': (3.4, 50.8, 7.2, 53.5, True),
    'BE': (2.5, 49.5, 6.4, 51.5, True),
    'CH': (5.9, 45.8, 10.5, 47.8, True),
    'AT': (9.5, 46.4, 17.2, 49.0, True),
    'CZ': (12.1, 48.5, 18.9, 51.1, True),
    'PL': (14.1, 49.0, 24.2, 54.9, True),
    'ES': (-9.3, 36.0, 3.3, 43.8, False),
    'PT': (-9.5, 37.0, -6.2, 42.1, False),
    'IT': (6.6, 36.6, 18.5, 47.1, False),
    'DK': (8.1, 54.6, 12.7, 57.8, False),
    'LU': (5.7, 49.4, 6.5, 50.2, False),
    'GB': (-6.0, 50.0, 1.8, 58.7, False),
    'IE': (-10.5, 51.4, -6.0, 55.4, False),
    'SK': (16.8, 47.7, 22.6, 49.6, False),
    'HU': (16.1, 45.7, 22.9, 48.6, False),
    'SI': (13.4, 45.4, 16.6, 46.9, False),
}
NAME = {
    'DE': 'Germany', 'FR': 'France', 'NL': 'Netherlands', 'BE': 'Belgium',
    'CH': 'Switzerland', 'AT': 'Austria', 'CZ': 'Czechia', 'PL': 'Poland',
    'ES': 'Spain', 'PT': 'Portugal', 'IT': 'Italy', 'DK': 'Denmark',
    'LU': 'Luxembourg', 'GB': 'United Kingdom', 'IE': 'Ireland',
    'SK': 'Slovakia', 'HU': 'Hungary', 'SI': 'Slovenia',
}

def ring(w, s, e, n, points=14):
    """A closed ring around the box centre, radius wobbled so it is obviously
    not a rectangle and obviously not a real coastline either."""
    cx, cy = (w + e) / 2.0, (s + n) / 2.0
    rx, ry = (e - w) / 2.0, (n - s) / 2.0
    out = []
    for i in range(points):
        a = 2 * math.pi * i / points
        k = 0.78 + rng.random() * 0.34
        out.append([round(cx + rx * k * math.cos(a), 3),
                    round(cy + ry * k * math.sin(a), 3)])
    out.append(out[0])
    return [out]

features = []
for cc, (w, s, e, n, study) in BOX.items():
    features.append({
        'type': 'Feature',
        'properties': {'ISO_A2': cc, 'NAME': NAME[cc], 'in_study': study},
        'geometry': {'type': 'Polygon', 'coordinates': ring(w, s, e, n)},
    })

path = os.path.join(HERE, 'countries.geojson')
with open(path, 'w', encoding='utf-8') as fh:
    json.dump({'type': 'FeatureCollection', 'fixture_geometry': True,
               'features': features}, fh, ensure_ascii=False, separators=(',', ':'))
    fh.write('\n')
print('wrote countries.geojson with', len(features), 'placeholder outlines')

# Bottle imagery — placeholders

Every PNG in this folder was cropped out of the design mock's featured strip and
had its navy backdrop removed programmatically. They are roughly 190×480 and
soft when scaled up, which is fine for laying the UI out and not fine for
launch.

## Replacing them

Keep the filenames. Each one is referenced by `image` in
`src/mocks/data.ts`, and nothing else needs to change.

| File | Wine |
| --- | --- |
| `lastar-tamjanika.png` | Lastar Tamjanika |
| `100-zena-rose.png` | 100 Žena Rosé |
| `fresckoo-bianko-kovacevic.png` | Fresckoo Bianko (Kovačević) |
| `lastar-chardonnay.png` | Lastar Chardonnay |
| `vronski-prokupac.png` | Vronski Prokupac |
| `100-zena-belo.png` | 100 Žena Belo |
| `fresckoo-sauvignon-blanc.png` | Fresckoo Sauvignon Blanc |
| `100-zena-crveno.png` | 100 Žena Crveno |
| `lastar-merlot.png` | Lastar Merlot Rosé |
| `100-zena-pjenusavo.png` | 100 Žena Pjenušavo |

## What the real files should be

- **Transparent PNG or WebP.** Bottles sit on cream cards, on the navy strip and
  on gradient panels, so a baked-in background will show.
- **Portrait, bottle centred**, roughly 3:8 — the layout sizes by height and lets
  width follow.
- **At least 800px tall.** The detail page renders a bottle at 384 CSS pixels,
  which is 768 on a 2× screen.
- **Consistent lighting and shadow** across the set; they appear side by side in
  the strip and in set cards, where mismatched shadows are obvious.

## Also placeholder

`public/hero/pour.jpg` — the hero photograph, cropped from the same mock. Wants a
wide landscape shot (about 16:9) with the subject left of centre, since the right
third sits under a gradient and the left edge feathers into the olive field.

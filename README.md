# LUFT

Wine discovery and shop. The site presents wines, sells them, and — the part that
makes it LUFT — helps people choose one, through **Alek**, a sommelier you tell
about your evening.

Serbian-first, with an English toggle. One responsive source serves both the
desktop and phone designs.

## Status

**Frontend only.** There is no server yet. Every network call is answered by
[MSW](https://mswjs.io) handlers in `src/mocks/`, so the app makes real HTTP
requests and nothing in the components knows the difference. When a backend
arrives, delete the handlers and point `VITE_API_BASE` at it.

## Stack

| Concern | Choice |
| --- | --- |
| Build | Vite 8 |
| UI | React 19 + TypeScript |
| Styling | Tailwind CSS 4 (CSS-first `@theme` tokens, no config file) |
| Accessible primitives | Radix (dropdown, tabs) |
| Routing | React Router 8 (declarative SPA) |
| Server state | TanStack Query |
| Client state | Zustand (cart, favorites — both persisted) |
| Mock API | MSW |
| i18n | i18next / react-i18next, `sr` default |
| Icons | lucide-react |
| Fonts | Playfair Display (display), Montserrat (UI), self-hosted |

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
```

| Script | Does |
| --- | --- |
| `npm run dev` | Dev server with the mock API running |
| `npm run build` | Typecheck and build to `dist/` |
| `npm run preview` | Serve the production build |
| `npm run lint` | oxlint |
| `npm run format` | Prettier over `src/` |

### Environment

Copy `.env.example` to `.env` if you need to change anything:

- `VITE_ENABLE_MOCKS` — `false` turns MSW off. The mock bundle is a dynamic
  import, so it drops out of the build when unused.
- `VITE_API_BASE` — base URL for a real API. Empty means same-origin.

## Routes

| Path | Screen |
| --- | --- |
| `/` | Home |
| `/pretraga` | Search and filters |
| `/vino/:slug` | Wine detail |
| `/uparivanje/:slug?` | Food and occasion pairing |
| `/alek` | Ask Alek (chat) |
| `/korpa` | Cart |
| `/checkout` | Three-step checkout |
| `/setovi`, `/favoriti`, `/profil`, `/trending`, `/danas` | Supporting pages |

## Layout of the source

```
src/
├─ app/           router, providers, root layout
├─ components/
│  ├─ ui/         Button, Chip, Rating, WineCard, BottleTile, …
│  └─ layout/     Header, Footer, MobileTabBar, LanguageSwitch
├─ features/      home, catalog, pairing, alek, cart, profile, shared
├─ mocks/         MSW handlers and the seed catalogue
├─ i18n/          sr.json, en.json
├─ stores/        cart, favorites
├─ lib/           api hooks, formatting, cn()
└─ styles/        index.css — all design tokens live here
```

## Design tokens

Colours, type and the marquee animation are declared once, in
`src/styles/index.css`, under Tailwind's `@theme`. The palette was sampled from
the approved mock: olive `forest` for the hero, `navy` for the featured strip,
burgundy `wine` for calls to action, `rust` for the trust band, and five
situation colours for the moment picker.

## Notes

- **The featured strip** (`features/home/FeaturedMarquee.tsx`) drifts on a CSS
  keyframe over two copies of the list, so the loop has no visible seam and the
  animation stays off the main thread. It pauses on hover and on keyboard focus,
  and `prefers-reduced-motion: reduce` replaces it with a normal scroller.
- **Prices** are formatted with `Intl.NumberFormat('sr-RS')` — never by hand.
- **Alek's replies** come back from the mock as i18n keys, so a recommendation
  reads correctly in both languages.

## Imagery

`public/wines/` and `public/hero/` currently hold placeholders cropped out of
the design mock. They are low resolution by nature. See
[`public/wines/README.md`](public/wines/README.md) for what to drop in.

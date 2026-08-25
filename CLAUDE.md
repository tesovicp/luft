# CLAUDE.md

Guidance for Claude Code working in this repository.

## What this is

LUFT — a wine presentation and shop, whose differentiator is **Alek**, a
sommelier persona who picks a wine from a situation the visitor describes.
Serbian-first with an English toggle. **One responsive source** serves both the
desktop and phone designs; there is deliberately no separate mobile build.

**Status: frontend only, backend mocked.** This is intentional and agreed — the
UI is being settled before any server exists. Do not propose building a backend
unless asked.

## Design source of truth

Two prototypes were supplied as the visual spec:

- Desktop: https://vino2507.netlify.app/
- Mobile: https://vino-mob-2507.netlify.app/

**These are not code to port.** Each is a single screenshot embedded as a
base64 background image with a couple of live overlays on top. The palette in
`src/styles/index.css` was sampled from those pixels; the five situation colours
came from the prototypes' own inline stylesheet (they carry the authored values,
not JPEG-compressed ones). If a colour question comes up, that file is the
answer — do not re-derive from the screenshots.

## Decisions already taken

Do not re-litigate these without being asked:

- **Tailwind v4 + Radix primitives** — not a component library. The brand is too
  specific; a library costs more in overrides than it saves.
- **All six app flows are built**, not just the home page.
- **i18next from day one**, `sr` default. Every user-visible string is a key.
- **Imagery is placeholder**, cropped from the mock, with documented swap targets.
- MSW at the network boundary rather than imported fixtures.

## Commands

```bash
npm run dev          # Vite dev server, mock API active
npm run build        # tsc -b && vite build
npm run typecheck    # tsc -b
npm run lint         # oxlint
npm run format       # prettier --write over src/
```

## Conventions

- **Never hardcode user-visible text.** It goes in `src/i18n/sr.json` *and*
  `en.json`, and is read with `t()`. Serbian is the source language.
- **Never format prices by hand.** Use `formatRsd()` from `src/lib/format.ts`;
  it uses `Intl.NumberFormat('sr-RS')` so `1890` renders `1.890 RSD`.
- **Design tokens live only in `src/styles/index.css`** under `@theme`. There is
  no `tailwind.config.js` — Tailwind v4 is CSS-first. Add a token there rather
  than writing a raw hex in a component.
- **Components never import from `src/mocks/`.** They call hooks in
  `src/lib/api.ts`, which fetch real URLs that MSW intercepts. The one exception
  is `SearchPage`, which reads the static `grapes`/`countries` filter vocabulary.
- Alek's replies come back from the mock as **i18n keys** (`alek.reply.belo`),
  so a recommendation reads correctly in both languages. Keep that contract.
- `cn()` from `src/lib/utils.ts` for conditional classes.
- Prettier sorts Tailwind classes via `prettier-plugin-tailwindcss`. Run
  `npm run format` rather than hand-ordering.

## TypeScript settings that bite

`tsconfig.app.json` is strict, plus:

- `erasableSyntaxOnly` — **no enums, no parameter properties.** Use union types
  and `as const` arrays.
- `verbatimModuleSyntax` — type-only imports must use `import type`.
- `noUnusedLocals` / `noUnusedParameters` are on.
- `baseUrl` was removed (deprecated in TS 6+). The `@/*` path alias resolves
  relative to the tsconfig, and is mirrored in `vite.config.ts`.

## Gotchas discovered the hard way

- **Emoji flags do not render on Windows.** Regional-indicator pairs show as
  bare letters. Country identity is shown as two-letter codes (FR/IT/RS/NZ)
  instead — keep it that way.
- **Bottle PNGs are transparent cutouts** that appear on cream, on navy, and on
  gradients. Any replacement must be transparent, or backgrounds will show.
- **The featured marquee has an accessibility contract** — see below. Do not
  convert it to a JS-driven animation.

## The featured marquee

`src/features/home/FeaturedMarquee.tsx` is the animated strip below the hero,
and the one piece the client called out specifically.

- Two identical copies of the list in one track, animated `translateX(0 → -50%)`
  by a CSS keyframe, so the loop seam is invisible and it stays on the
  compositor.
- Pauses on hover **and** `focus-within`.
- Under `prefers-reduced-motion: reduce` the animation is disabled and the
  viewport becomes a snap scroller — the rule lives at the bottom of
  `src/styles/index.css`, keyed off `.marquee-track` / `.marquee-viewport`.
  If you rename those classes, update that block too.

## Layout

```
src/
├─ app/           router, providers, RootLayout
├─ components/
│  ├─ ui/         Button, Chip, Rating, WineCard, BottleTile, QtyStepper, …
│  └─ layout/     Header, Footer, MobileTabBar, LanguageSwitch, Logo
├─ features/      home, catalog, pairing, alek, cart, profile, shared
├─ mocks/         handlers.ts (MSW routes) + data.ts (seed catalogue)
├─ i18n/          sr.json, en.json, index.ts
├─ stores/        cart, favorites (both persisted to localStorage)
├─ lib/           api.ts (query hooks), format.ts, utils.ts
└─ styles/        index.css — the whole design system
```

Routes are Serbian-language paths: `/pretraga`, `/vino/:slug`,
`/uparivanje/:slug?`, `/alek`, `/korpa`, `/checkout`, `/setovi`, `/favoriti`,
`/profil`, `/trending`, `/danas`.

Navigation splits by breakpoint: header nav on `lg` and up, a fixed bottom tab
bar with a raised Alek button below it. `HowItWorks` genuinely renders different
content per breakpoint — six screen previews on desktop, four steps on mobile —
which is faithful to the mocks, not an oversight.

## Verifying UI work

There is no e2e suite. For visual checks, install Playwright transiently rather
than adding it as a dependency:

```bash
npm install -D playwright --no-save && npx playwright install chromium
```

Compare at **390px** against the mobile mock and **1198px** against the desktop
one — those are the widths the prototypes were authored at.

## Open items

- One pairing label in the mock is illegible at its resolution — read as `Rebe`,
  seeded as **Ribe** (fish) alongside Slavlje / Pasta / Aperitivi. Needs
  confirmation from the client.
- Real photography, a real backend, payments, auth, and the actual model behind
  Alek are all deferred. Alek is a keyword-routed mock in
  `src/mocks/handlers.ts`.

# Prompt Studio — design & code conventions

This file is loaded automatically by GitHub Copilot Chat for every request in
this repo. Follow these conventions for any new component or visual change —
do not introduce a new color palette, font, or animation style without being
explicitly asked to.

## Stack

Next.js 14 (App Router) + TypeScript + Tailwind CSS + Framer Motion + Lenis
(smooth scroll) + lucide-react icons. No GSAP, no other animation library —
everything motion-related goes through `framer-motion`.

## Language

All UI copy is in **English**. Do not write Spanish strings in components,
even if the person asks in Spanish — translate the request, write the code in
English.

## Color palette (do not invent new colors)

Defined in `tailwind.config.ts`, blue/dark theme:

- `base` (`#0a0e16`) — page background
- `surface` / `surface-elevated` — panel backgrounds
- `ember-{50,200,400,500,600,700}` — the accent ramp (despite the name, this
  is blue: `500` = `#3b82f6`). Reuse this scale for any new accent use —
  never hardcode a new hex for buttons, links, or highlights.
- `cream` (`#eef1f6`) — primary text on dark backgrounds
- `smoke` (`#8a93a3`) — secondary/muted text

The prompt "ticket" (`prompt-ticket.tsx`) is the one deliberate exception —
it's styled as a physical paper receipt (`bg-cream`, dark ink text) and stays
warm/cream regardless of the app's accent color.

## Typography

- Display: `font-display` (Outfit, loaded via `next/font/google` in
  `app/layout.tsx`) — headings only.
- Body: `font-body` (DM Sans).
- Mono: `font-mono` (JetBrains Mono) — used for the ticket, labels, badges.
- Never introduce a new font family without being asked.

## Motion conventions

- Standard ease curve: `const EASE: [number, number, number, number] =
[0.21, 0.47, 0.32, 0.98];` — reuse this constant in every new animated
  component instead of a different curve.
- Card entrance: `whileInView` + `staggerChildren`, margin `-80px`.
- Card hover: `whileHover={{ scale: 1.02 }}`, `whileTap={{ scale: 0.98 }}`.
- Mouse-tracked tilt: see `category-card.tsx` — `useMotionValue` +
  `useSpring` on `rotateX`/`rotateY`, updated via `onMouseMove`.

## Reusable CSS classes (in `app/globals.css`)

- `.depth-card` — the physical/skeuomorphic card background + shadow used
  for every card in the app (category cards, history rows). Use this class,
  don't hand-roll a new card style.
- `.depth-sheen` — the radial highlight that follows the mouse inside a
  `.depth-card`. Pairs with the `--mouse-x` / `--mouse-y` CSS vars set in
  `onMouseMove`.
- `.btn-tactile` + `.btn-tactile-primary` / `.btn-tactile-dark` — physical
  button styles (gradient + multi-layer shadow + press feedback). Use these
  for any new primary/secondary button instead of plain Tailwind button
  classes.
- `.film-grain` — the ambient noise-texture overlay, mounted once in
  `app/layout.tsx` via `<FilmGrain />`. Never duplicate it inside a page or
  component.
- `.ticket-edge` — the perforated-paper edge effect, only for the prompt
  ticket.

## File/component conventions

- One feature = one file under `components/`, named `kebab-case.tsx`.
- Category/effect data (titles, descriptions, prompt templates) lives only
  in `lib/categories.ts` — never inline prompt text inside a component.
- `next.config.js` has a conditional `basePath`/`assetPrefix` (empty in
  `npm run dev`, `/promt` in production build) so local dev works at
  `localhost:3000/` with no prefix — don't remove that conditional.

## Before proposing a visual change

1. Reuse `.depth-card`, `.btn-tactile-*`, the `ember` color scale, and the
   shared `EASE` curve rather than inventing new tokens.
2. Keep copy in English, sentence case, matching the existing tone (short,
   direct, e.g. "Add to my list", "Copy prompt").
3. If a change genuinely requires a new color, font, or motion pattern, ask
   first instead of adding it silently.

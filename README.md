# Prompt Studio — Video IA para Restaurante

Rediseño "agency-grade" del generador de prompts: Next.js (App Router) + TypeScript +
Tailwind CSS + Framer Motion (parallax, staggered reveals, tilt) + Lenis (scroll suave) +
lucide-react.

## Instalación

```bash
npm install
npm run dev
```

Abre `http://localhost:3000`.

## Estructura

```
app/
  layout.tsx        → fuentes (Outfit / DM Sans / JetBrains Mono) + Lenis global
  page.tsx           → renderiza <PromptGenerator />
  globals.css         → variables, .glass, ticket-edge, skeleton shimmer
components/
  smooth-scroll.tsx    → wrapper de Lenis (rAF loop)
  hero.tsx              → parallax con useScroll/useTransform + reveal escalonado
  category-grid.tsx     → grid de efectos, whileInView + stagger
  category-card.tsx      → tarjeta con tilt magnético (useMotionValue + spring)
  config-form.tsx          → formulario con AnimatePresence al cambiar de efecto
  prompt-ticket.tsx         → "ticket" con el prompt en vivo + copiar (feedback de estado)
  prompt-generator.tsx       → orquestador: estado de categoría, config e historial
  history-panel.tsx           → lista de prompts guardados, animada con layout + AnimatePresence
lib/
  categories.ts              → las 9 categorías de efecto y sus plantillas de prompt
  utils.ts                    → cn() (clsx + tailwind-merge)
```

## Personalizar

- **Colores / tipografía:** `tailwind.config.ts` (paleta `ember`, `surface`, `base`) y las
  fuentes en `app/layout.tsx`.
- **Efectos y textos del prompt:** todo vive en `lib/categories.ts` — agregar una categoría
  nueva es agregar un objeto al array `CATEGORIES`.
- **Historial persistente:** actualmente vive en memoria (estado de React). Si quieres que
  sobreviva a un refresh, se puede conectar a `localStorage` o a una base de datos.

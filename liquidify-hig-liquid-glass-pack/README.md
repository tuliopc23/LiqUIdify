# Liquidify — Apple HIG + Liquid Glass Enhancement Pack (Ark UI + Panda CSS)

This pack gives you **high‑fidelity, Apple‑docs‑style** building blocks:
- Tokens for **light/dark**, hairline borders, glass surfaces, system colors.
- Panda **recipes** for Card, Button, Badge/Pill, Input (glass), **Segmented Tabs** (Ark UI), Symbol Tiles.
- A **glass navbar** that frosts on scroll (like Apple’s docs top bar).

## Install

1) Install Panda & Ark UI (if you haven’t)

```bash
npm i -D @pandacss/dev
npm i @ark-ui/react
npx panda init --postcss
```

2) Replace your `panda.config.ts` with the one in this pack (or merge the `theme.extend` parts).  
3) Copy `src/theme/recipes.ts` and `src/components/*` into your project.  
4) Run Panda:

```bash
npx panda codegen --watch
```

5) Use the recipes/classes:

```tsx
import { button, card, input, tabs } from './src/theme/recipes'
```

### Ark UI + Panda slot recipes
The `tabs` export is a **slot recipe** mapped to Ark UI Tabs anatomy, so you can style parts and variants type‑safely.

### Light/Dark and system fonts
The config respects `prefers-color-scheme`. For typography we rely on the **system font stack** so SF shows on Apple devices.

### Notes on SF Symbols
Don’t embed Apple’s SF Symbols on the open web—license restricts that. Use your own SVG icons styled inside the **symbol tiles**.

---

## Tuning

- **Colors**: update semantic tokens under `theme.extend.semanticTokens.colors` (e.g., `bg.surface`, `glass.*`, `primary`).  
- **Radii**: `tokens.radii`—cards generally look best at `14px` to match the Apple feel.  
- **Glass effect**: tweak `blurs.lg`, `colors.glass.*`, and the `layerStyles.glass` definition.  
- **Focus ring**: adjust the ring in the `button`/`input` recipes to match your accessibility prefs.

---

## Demo

Import `src/pages/DemoPage.tsx` somewhere in your app to preview the patterns.

```tsx
import DemoPage from './src/pages/DemoPage'
```

Then mount it in your router / app root.


### Optional: Liquid effect
`<LiquidBackdrop />` injects an SVG filter. Add class `liquid-warp` to a decorative layer to get a subtle displacement.

```tsx
import { LiquidBackdrop } from './src/components/LiquidBackdrop'

function Hero() {
  return (
    <section style={{ position: 'relative' }}>
      <LiquidBackdrop />
      <div className="liquid-warp" style={{ position:'absolute', inset:0, opacity:.06, background:'radial-gradient(1200px 600px at 10% 20%, rgba(255,255,255,.5), transparent)' }} />
      <h1 className="text-display">Liquid glass for the web</h1>
    </section>
  )
}
```

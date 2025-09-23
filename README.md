# 🌊 LiqUIdify — Apple Liquid Glass for React (built on Ark UI + Panda CSS)

[![npm version](https://img.shields.io/npm/v/liquidify-react)](https://www.npmjs.com/package/liquidify-react)
[![npm downloads](https://img.shields.io/npm/dm/liquidify-react)](https://www.npmjs.com/package/liquidify-react)
[![Build Status](https://github.com/tuliopc23/LiqUIdify/actions/workflows/ci.yml/badge.svg)](https://github.com/tuliopc23/LiqUIdify/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![WCAG 2.1 AA](https://img.shields.io/badge/WCAG%202.1-AA%20Compliant-green)](https://www.w3.org/WAI/WCAG21/quickref/)

Production‑ready, opinionated React components pre‑styled with Apple’s Liquid Glass look and feel. 47 Ark UI wrappers + 1 custom Button, TypeScript‑first, tree‑shakeable, and accessible.

## ✨ What you get
- 🍎 Apple HIG Liquid Glass styling (blurred glass surfaces, Apple accent system, SF Pro typography)
- 🏗️ Ark UI primitives under the hood (accessible, headless)
- 🎨 Panda CSS recipes and tokens generated at build time
- ⚡ Tree‑shaking with root and subpath imports
- ♿ WCAG 2.1 AA targets (keyboard + screen reader friendly)
- 🔧 React 18/19 compatible, ESM + CJS outputs

## 🚀 Install

LiqUIdify ships in peer mode (recommended). Install the package and peers:

```bash
# Bun
bun add liquidify-react react react-dom @ark-ui/react framer-motion lucide-react

# npm
npm i liquidify-react react react-dom @ark-ui/react framer-motion lucide-react

# pnpm
pnpm add liquidify-react react react-dom @ark-ui/react framer-motion lucide-react

# yarn
yarn add liquidify-react react react-dom @ark-ui/react framer-motion lucide-react
```

## 🧩 Use

Import the CSS once (tokens, preflight, and glass styles), then import components.

```tsx
import "liquidify-react/styles";
import { Button } from "liquidify-react";

export default function App() {
  return <Button variant="primary">Get Started</Button>;
}
```

You can also subpath‑import any component for optimal tree‑shaking:

```tsx
import "liquidify-react/styles";
import { Button } from "liquidify-react/button";
// e.g. import { Tabs } from "liquidify-react/tabs";
```

Why CSS import? Library mode emits a single CSS file. Importing `liquidify-react/styles` ensures tokens + recipes are applied regardless of the consumer bundler.

## 📦 Exports

- Root: `import { Button } from "liquidify-react"`
- Styles: `import "liquidify-react/styles"`
- Subpaths: `import { Checkbox } from "liquidify-react/checkbox"` (works for all components)

Types map to built artifacts and subpaths, CJS and ESM are provided.

## 🔗 Peers and compatibility

- react: ^18 or ^19 (peer)
- react-dom: ^18 or ^19 (peer)
- @ark-ui/react: ^5 (peer)
- framer-motion: ^12 (peer)
- lucide-react: ^0.544.0 (peer)

Keeping Ark UI as a peer avoids duplicate copies in apps, improving bundle size and compatibility.

## 🧱 Architecture

- Headless behavior from Ark UI
- Style system from Panda CSS (recipes + tokens)
- Apple HIG inspired theme (glass surfaces, accent colors, SF Pro, motion)

Components attach their classes via Panda recipes at runtime; the global CSS provides tokens and preflight.

## 📚 Component inventory

47 Ark UI wrappers + 1 custom:

- Forms & Inputs: Button, IconButton, Checkbox, RadioGroup, Switch, Slider, NumberInput, PasswordInput, PinInput, TagsInput, Select, Combobox, DatePicker, FileUpload
- Navigation & Structure: Tabs, Accordion, Collapsible, Menu, Pagination, Steps, Splitter
- Feedback & Display: Toast, Progress (Linear/Circular), Avatar, HoverCard, Tooltip, Popover, ScrollArea, FloatingPanel, Dialog
- Advanced: TreeView, ColorPicker, AngleSlider, SignaturePad, Carousel, RatingGroup, SegmentGroup, Toggle/ToggleGroup, QRCode, Timer, Tour

All wrappers ship pre‑styled.

## 🛠️ Framework notes

Any React app (Vite, Next.js, Remix, …) works the same: import the CSS once, then import components. Example (Vite):

```tsx
// main.tsx
import "liquidify-react/styles";
import { createRoot } from "react-dom/client";
import App from "./App";
createRoot(document.getElementById("root")!).render(<App />);
```

## 🧪 SSR/RSC safety

- No window access at import time. Rendering on the server is supported.
- Use components inside your render phase; any browser‑only hooks are guarded.

Minimal server smoke test idea:

```ts
import { renderToString } from "react-dom/server";
import * as UI from "liquidify-react";
for (const [name, exp] of Object.entries(UI)) {
  if (typeof exp === "function") renderToString(exp({} as any));
}
```

## 🎨 Theming & tokens

Out of the box you get Apple HIG‑inspired tokens (colors, radii, shadows, blur, typography). Override via CSS custom properties or integrate Panda CSS in your app if you want to extend recipes.

```css
:root {
  --colors-accent-primary: #007aff;
  --radii-md: 16px;
  --blurs-glass-md: 10px;
}
```

## ⤴️ Rounded corners (Apple HIG roles)

LiqUIdify uses a roles‑based radius system for consistent, Apple‑style rounding across all components. When customizing shapes, use role tokens — do not use size‑based radii in component recipes.

Roles and values:
- button: capsule (full)
- buttonCompact: 14px
- buttonLarge: capsule (full)
- control: 14px
- field: 14px
- fieldLarge: 16px
- card: 20px
- cardLarge: 22px
- sheet: 22px
- modal: 26px
- pill, badge: capsule (full)

Tip (for Panda users extending styles):

```ts
// Example: prefer role tokens over size tokens
// This ensures library‑wide consistency with Apple HIG
const styles = {
  card: { borderRadius: "token(radii.roles.card)" },
  field: { borderRadius: "token(radii.roles.field)" },
  modal: { borderRadius: "token(radii.roles.modal)" },
  button: { borderRadius: "token(radii.roles.button)" },
};
```

## ⚡ Performance & tree‑shaking

- Subpath imports enable minimal bundles
- CSS is marked as a side effect to ensure inclusion while keeping JS treeshakeable
- React and Ark UI remain peers to prevent duplicate copies

## 🧰 Scripts (repo)

Use Bun for local development:

```bash
# install deps
bun install

# dev (library playground)
bun run dev

# build the library (writes to dist/libs/components)
bun run build:lib

# type check, lint, test
bun run type-check
bun run lint
bun run test
```

These map to scripts in package.json and target `libs/components/vite.config.ts` for the library build.

## 📄 License

MIT © [Tulio Pinheiro Cunha](https://tuliocunha.dev)

## Links

- Docs: https://docs.useliquidify.dev
- GitHub: https://github.com/tuliopc23/LiqUIdify
- npm: https://www.npmjs.com/package/liquidify-react
- Issues: https://github.com/tuliopc23/LiqUIdify/issues

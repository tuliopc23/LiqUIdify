## Why
Bring Liquidify in line with Apple HIG-inspired system semantics and materials to improve accessibility, consistency, and theming flexibility across light/dark modes and glassy surfaces.

## What Changes
- Colors/materials: adopt system semantic colors (label/secondaryLabel, systemBackground/secondary/tertiary, separator/fill), dynamic SystemBlue (light/dark) and remove custom blue; add material tiers (ultraThin/thin/regular/thick) tokens; introduce vibrancy overlays; hairline separators; enforce contrast ≥4.5:1 on glass; expose accent theming API.
- Type/layout: SF Pro Text/Display with optical sizing; dynamic type scale mapping; 8pt spacing grid; min targets ≥44px; role radii (pill buttons; 26px sheets/modals/cards); tuned elevation/shadow tokens per light/dark.
- Components/states: segmented control parity; button hover/pressed/disabled with spring easing; macOS focus ring (accent, 2px ring + halo); form placeholders/selection color; menus/sheets popover translucency; consistent glass pseudo-elements; prefers-reduced-motion behaviors.
- Icons/a11y/dev: optional SF Symbols pack (sizes/weights), keyboard/ARIA parity and VoiceOver names, high-contrast mode, axe audits; SSR-safe recipes; avoid nested heavy blurs; docs on accent switching.

## Impact
- Affected specs: design-system/colors, design-system/typography, components/buttons, components/segmented-control, a11y/focus, a11y/contrast, theming/docs.
- Affected code: Panda tokens (`panda.config.ts`), component recipes and styles under `libs/components`, global styles, SSR utilities, docs/examples.
- Non-breaking for consumers if defaults preserved; enables optional accent theming and HIG presets.

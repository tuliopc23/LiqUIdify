const tokens = {
  "colors.glass.bg": {
    "value": "rgba(255, 255, 255, 0.1)",
    "variable": "var(--colors-glass-bg)"
  },
  "colors.glass.border": {
    "value": "rgba(255, 255, 255, 0.2)",
    "variable": "var(--colors-glass-border)"
  },
  "colors.glass.ripple": {
    "value": "rgba(255, 255, 255, 0.3)",
    "variable": "var(--colors-glass-ripple)"
  },
  "colors.glass.subtle.bg": {
    "value": "rgba(255, 255, 255, 0.06)",
    "variable": "var(--colors-glass-subtle-bg)"
  },
  "colors.glass.subtle.border": {
    "value": "rgba(255, 255, 255, 0.12)",
    "variable": "var(--colors-glass-subtle-border)"
  },
  "colors.glass.medium.bg": {
    "value": "rgba(255, 255, 255, 0.12)",
    "variable": "var(--colors-glass-medium-bg)"
  },
  "colors.glass.medium.border": {
    "value": "rgba(255, 255, 255, 0.22)",
    "variable": "var(--colors-glass-medium-border)"
  },
  "colors.glass.strong.bg": {
    "value": "rgba(255, 255, 255, 0.22)",
    "variable": "var(--colors-glass-strong-bg)"
  },
  "colors.glass.strong.border": {
    "value": "rgba(255, 255, 255, 0.34)",
    "variable": "var(--colors-glass-strong-border)"
  },
  "colors.glass.accent.bg": {
    "value": "var(--colors-accent-dynamic)",
    "variable": "var(--colors-glass-accent-bg)"
  },
  "colors.glass.accent.border": {
    "value": "var(--colors-accent-dynamic)",
    "variable": "var(--colors-glass-accent-border)"
  },
  "colors.glass.gradients.before._p3": {
    "value": "linear-gradient(145deg, color(display-p3 1 1 1 / 0.25) 0%, color(display-p3 1 1 1 / 0.08) 50%, color(display-p3 1 1 1 / 0) 100%)",
    "variable": "var(--colors-glass-gradients-before-_p3)"
  },
  "colors.glass.gradients.before": {
    "value": "linear-gradient(145deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(255, 255, 255, 0) 100%)",
    "variable": "var(--colors-glass-gradients-before)"
  },
  "colors.glass.gradients.after._p3": {
    "value": "linear-gradient(145deg, color(display-p3 1 1 1 / 0.15) 0%, color(display-p3 1 1 1 / 0.04) 50%, color(display-p3 0 0 0 / 0.08) 100%)",
    "variable": "var(--colors-glass-gradients-after-_p3)"
  },
  "colors.glass.gradients.after": {
    "value": "linear-gradient(145deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.02) 50%, rgba(0, 0, 0, 0.05) 100%)",
    "variable": "var(--colors-glass-gradients-after)"
  },
  "colors.glass.gradients.depth._p3": {
    "value": "linear-gradient(135deg, color(display-p3 1 1 1 / 0.2) 0%, color(display-p3 1 1 1 / 0.12) 25%, color(display-p3 1 1 1 / 0.05) 50%, color(display-p3 0 0 0 / 0.05) 75%, color(display-p3 0 0 0 / 0.12) 100%)",
    "variable": "var(--colors-glass-gradients-depth-_p3)"
  },
  "colors.glass.gradients.depth": {
    "value": "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 25%, rgba(255,255,255,0.03) 50%, rgba(0,0,0,0.03) 75%, rgba(0,0,0,0.08) 100%)",
    "variable": "var(--colors-glass-gradients-depth)"
  },
  "colors.glass.gradients.vibrancy._p3": {
    "value": "radial-gradient(ellipse at top left, color(display-p3 1 1 1 / 0.18) 0%, color(display-p3 1 1 1 / 0.09) 40%, transparent 70%)",
    "variable": "var(--colors-glass-gradients-vibrancy-_p3)"
  },
  "colors.glass.gradients.vibrancy": {
    "value": "radial-gradient(ellipse at top left, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 40%, transparent 70%)",
    "variable": "var(--colors-glass-gradients-vibrancy)"
  },
  "colors.glass.liquid.base._p3": {
    "value": "color(display-p3 1 1 1 / 0.12)",
    "variable": "var(--colors-glass-liquid-base-_p3)"
  },
  "colors.glass.liquid.base": {
    "value": "rgba(255,255,255,0.08)",
    "variable": "var(--colors-glass-liquid-base)"
  },
  "colors.glass.liquid.opacity": {
    "value": "0.08",
    "variable": "var(--colors-glass-liquid-opacity)"
  },
  "colors.glass.liquid.blur": {
    "value": "backdrop-filter: blur(12px) saturate(1.8)",
    "variable": "var(--colors-glass-liquid-blur)"
  },
  "colors.glass.liquid.layers.before._p3": {
    "value": "linear-gradient(135deg, color(display-p3 1 1 1 / 0.25) 0%, transparent 100%)",
    "variable": "var(--colors-glass-liquid-layers-before-_p3)"
  },
  "colors.glass.liquid.layers.before": {
    "value": "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 100%)",
    "variable": "var(--colors-glass-liquid-layers-before)"
  },
  "colors.glass.liquid.layers.after._p3": {
    "value": "radial-gradient(circle, color(display-p3 1 1 1 / 0.15) 0%, transparent 70%)",
    "variable": "var(--colors-glass-liquid-layers-after-_p3)"
  },
  "colors.glass.liquid.layers.after": {
    "value": "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
    "variable": "var(--colors-glass-liquid-layers-after)"
  },
  "colors.glass.liquid.layers.glow._p3": {
    "value": "box-shadow: inset 0 1px 0 color(display-p3 1 1 1 / 0.25), 0 0 20px color(display-p3 1 1 1 / 0.1)",
    "variable": "var(--colors-glass-liquid-layers-glow-_p3)"
  },
  "colors.glass.liquid.layers.glow": {
    "value": "box-shadow: inset 0 1px 0 rgba(255,255,255,0.2)",
    "variable": "var(--colors-glass-liquid-layers-glow)"
  },
  "colors.glass.liquid.layers.shimmer._p3": {
    "value": "linear-gradient(90deg, transparent 0%, color(display-p3 1 1 1 / 0.5) 50%, transparent 100%)",
    "variable": "var(--colors-glass-liquid-layers-shimmer-_p3)"
  },
  "colors.glass.liquid.layers.shimmer": {
    "value": "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
    "variable": "var(--colors-glass-liquid-layers-shimmer)"
  },
  "colors.glass.liquid.layers.depth._p3": {
    "value": "box-shadow: inset 0 2px 4px color(display-p3 0 0 0 / 0.15), inset 0 -1px 0 color(display-p3 1 1 1 / 0.4)",
    "variable": "var(--colors-glass-liquid-layers-depth-_p3)"
  },
  "colors.glass.liquid.layers.depth": {
    "value": "box-shadow: inset 0 2px 4px rgba(0,0,0,0.1), inset 0 -1px 0 rgba(255,255,255,0.3)",
    "variable": "var(--colors-glass-liquid-layers-depth)"
  },
  "colors.button.primary.bg": {
    "value": "linear-gradient(135deg, color-mix(in oklch, var(--colors-accent-dynamic) 30%, transparent) 0%, color-mix(in oklch, var(--colors-accent-dynamic) 30%, transparent) 100%)",
    "variable": "var(--colors-button-primary-bg)"
  },
  "colors.button.primary.border": {
    "value": "color-mix(in oklch, var(--colors-accent-dynamic) 50%, transparent)",
    "variable": "var(--colors-button-primary-border)"
  },
  "colors.button.secondary.bg": {
    "value": "var(--colors-glass-medium-bg)",
    "variable": "var(--colors-button-secondary-bg)"
  },
  "colors.button.secondary.border": {
    "value": "var(--colors-glass-medium-border)",
    "variable": "var(--colors-button-secondary-border)"
  },
  "colors.button.ghost.bg": {
    "value": "transparent",
    "variable": "var(--colors-button-ghost-bg)"
  },
  "colors.button.ghost.border": {
    "value": "var(--colors-glass-subtle-border)",
    "variable": "var(--colors-button-ghost-border)"
  },
  "colors.button.danger.bg": {
    "value": "linear-gradient(135deg, rgba(255, 59, 48, 0.30) 0%, rgba(255, 59, 48, 0.30) 100%)",
    "variable": "var(--colors-button-danger-bg)"
  },
  "colors.button.danger.border": {
    "value": "rgba(255, 59, 48, 0.50)",
    "variable": "var(--colors-button-danger-border)"
  },
  "colors.button.success.bg": {
    "value": "linear-gradient(135deg, rgba(76, 217, 100, 0.30) 0%, rgba(76, 217, 100, 0.30) 100%)",
    "variable": "var(--colors-button-success-bg)"
  },
  "colors.button.success.border": {
    "value": "rgba(76, 217, 100, 0.50)",
    "variable": "var(--colors-button-success-border)"
  },
  "colors.button.warning.bg": {
    "value": "linear-gradient(135deg, rgba(255, 149, 0, 0.30) 0%, rgba(255, 149, 0, 0.30) 100%)",
    "variable": "var(--colors-button-warning-bg)"
  },
  "colors.button.warning.border": {
    "value": "rgba(255, 149, 0, 0.50)",
    "variable": "var(--colors-button-warning-border)"
  },
  "colors.button.hig.filled.accent.default.bg": {
    "value": "color-mix(in oklch, var(--colors-accent-dynamic) 28%, transparent)",
    "variable": "var(--colors-button-hig-filled-accent-default-bg)"
  },
  "colors.button.hig.filled.accent.default.text": {
    "value": "var(--colors-text-glass-primary)",
    "variable": "var(--colors-button-hig-filled-accent-default-text)"
  },
  "colors.button.hig.filled.accent.default.border": {
    "value": "color-mix(in oklch, var(--colors-accent-dynamic) 55%, transparent)",
    "variable": "var(--colors-button-hig-filled-accent-default-border)"
  },
  "colors.button.hig.filled.accent.hover.bg": {
    "value": "color-mix(in oklch, var(--colors-accent-dynamic) 36%, transparent)",
    "variable": "var(--colors-button-hig-filled-accent-hover-bg)"
  },
  "colors.button.hig.filled.accent.hover.text": {
    "value": "var(--colors-text-glass-primary)",
    "variable": "var(--colors-button-hig-filled-accent-hover-text)"
  },
  "colors.button.hig.filled.accent.hover.border": {
    "value": "color-mix(in oklch, var(--colors-accent-dynamic) 60%, transparent)",
    "variable": "var(--colors-button-hig-filled-accent-hover-border)"
  },
  "colors.button.hig.filled.accent.active.bg": {
    "value": "color-mix(in oklch, var(--colors-accent-dynamic) 42%, transparent)",
    "variable": "var(--colors-button-hig-filled-accent-active-bg)"
  },
  "colors.button.hig.filled.accent.active.text": {
    "value": "var(--colors-text-glass-primary)",
    "variable": "var(--colors-button-hig-filled-accent-active-text)"
  },
  "colors.button.hig.filled.accent.active.border": {
    "value": "color-mix(in oklch, var(--colors-accent-dynamic) 65%, transparent)",
    "variable": "var(--colors-button-hig-filled-accent-active-border)"
  },
  "colors.button.hig.filled.accent.disabled.bg": {
    "value": "color-mix(in oklch, var(--colors-accent-dynamic) 18%, transparent)",
    "variable": "var(--colors-button-hig-filled-accent-disabled-bg)"
  },
  "colors.button.hig.filled.accent.disabled.text": {
    "value": "var(--colors-text-glass-disabled)",
    "variable": "var(--colors-button-hig-filled-accent-disabled-text)"
  },
  "colors.button.hig.filled.accent.disabled.border": {
    "value": "color-mix(in oklch, var(--colors-accent-dynamic) 35%, transparent)",
    "variable": "var(--colors-button-hig-filled-accent-disabled-border)"
  },
  "colors.button.hig.filled.accent.focus.bg": {
    "value": "color-mix(in oklch, var(--colors-accent-dynamic) 32%, transparent)",
    "variable": "var(--colors-button-hig-filled-accent-focus-bg)"
  },
  "colors.button.hig.filled.accent.focus.text": {
    "value": "var(--colors-text-glass-primary)",
    "variable": "var(--colors-button-hig-filled-accent-focus-text)"
  },
  "colors.button.hig.filled.accent.focus.border": {
    "value": "var(--colors-accent-dynamic)",
    "variable": "var(--colors-button-hig-filled-accent-focus-border)"
  },
  "colors.button.hig.filled.accent.loading.bg": {
    "value": "color-mix(in oklch, var(--colors-accent-dynamic) 28%, transparent)",
    "variable": "var(--colors-button-hig-filled-accent-loading-bg)"
  },
  "colors.button.hig.filled.accent.loading.text": {
    "value": "var(--colors-text-glass-primary)",
    "variable": "var(--colors-button-hig-filled-accent-loading-text)"
  },
  "colors.button.hig.filled.accent.loading.border": {
    "value": "color-mix(in oklch, var(--colors-accent-dynamic) 55%, transparent)",
    "variable": "var(--colors-button-hig-filled-accent-loading-border)"
  },
  "colors.button.hig.filled.neutral.default.bg": {
    "value": "var(--colors-glass-medium-bg)",
    "variable": "var(--colors-button-hig-filled-neutral-default-bg)"
  },
  "colors.button.hig.filled.neutral.default.text": {
    "value": "var(--colors-text-glass-primary)",
    "variable": "var(--colors-button-hig-filled-neutral-default-text)"
  },
  "colors.button.hig.filled.neutral.default.border": {
    "value": "var(--colors-glass-medium-border)",
    "variable": "var(--colors-button-hig-filled-neutral-default-border)"
  },
  "colors.button.hig.filled.neutral.hover.bg": {
    "value": "var(--colors-glass-strong-bg)",
    "variable": "var(--colors-button-hig-filled-neutral-hover-bg)"
  },
  "colors.button.hig.filled.neutral.hover.text": {
    "value": "var(--colors-text-glass-primary)",
    "variable": "var(--colors-button-hig-filled-neutral-hover-text)"
  },
  "colors.button.hig.filled.neutral.hover.border": {
    "value": "var(--colors-glass-strong-border)",
    "variable": "var(--colors-button-hig-filled-neutral-hover-border)"
  },
  "colors.button.hig.filled.neutral.active.bg": {
    "value": "color-mix(in oklch, #000 5%, var(--colors-glass-strong-bg))",
    "variable": "var(--colors-button-hig-filled-neutral-active-bg)"
  },
  "colors.button.hig.filled.neutral.active.text": {
    "value": "var(--colors-text-glass-primary)",
    "variable": "var(--colors-button-hig-filled-neutral-active-text)"
  },
  "colors.button.hig.filled.neutral.active.border": {
    "value": "var(--colors-glass-strong-border)",
    "variable": "var(--colors-button-hig-filled-neutral-active-border)"
  },
  "colors.button.hig.filled.neutral.disabled.bg": {
    "value": "var(--colors-glass-subtle-bg)",
    "variable": "var(--colors-button-hig-filled-neutral-disabled-bg)"
  },
  "colors.button.hig.filled.neutral.disabled.text": {
    "value": "var(--colors-text-glass-disabled)",
    "variable": "var(--colors-button-hig-filled-neutral-disabled-text)"
  },
  "colors.button.hig.filled.neutral.disabled.border": {
    "value": "var(--colors-glass-subtle-border)",
    "variable": "var(--colors-button-hig-filled-neutral-disabled-border)"
  },
  "colors.button.hig.filled.neutral.focus.bg": {
    "value": "var(--colors-glass-medium-bg)",
    "variable": "var(--colors-button-hig-filled-neutral-focus-bg)"
  },
  "colors.button.hig.filled.neutral.focus.text": {
    "value": "var(--colors-text-glass-primary)",
    "variable": "var(--colors-button-hig-filled-neutral-focus-text)"
  },
  "colors.button.hig.filled.neutral.focus.border": {
    "value": "var(--colors-accent-dynamic)",
    "variable": "var(--colors-button-hig-filled-neutral-focus-border)"
  },
  "colors.button.hig.filled.neutral.loading.bg": {
    "value": "var(--colors-glass-medium-bg)",
    "variable": "var(--colors-button-hig-filled-neutral-loading-bg)"
  },
  "colors.button.hig.filled.neutral.loading.text": {
    "value": "var(--colors-text-glass-primary)",
    "variable": "var(--colors-button-hig-filled-neutral-loading-text)"
  },
  "colors.button.hig.filled.neutral.loading.border": {
    "value": "var(--colors-glass-medium-border)",
    "variable": "var(--colors-button-hig-filled-neutral-loading-border)"
  },
  "colors.button.hig.filled.destructive.default.bg": {
    "value": "color-mix(in oklch, var(--colors-accent-danger) 30%, transparent)",
    "variable": "var(--colors-button-hig-filled-destructive-default-bg)"
  },
  "colors.button.hig.filled.destructive.default.text": {
    "value": "var(--colors-text-glass-primary)",
    "variable": "var(--colors-button-hig-filled-destructive-default-text)"
  },
  "colors.button.hig.filled.destructive.default.border": {
    "value": "color-mix(in oklch, var(--colors-accent-danger) 55%, transparent)",
    "variable": "var(--colors-button-hig-filled-destructive-default-border)"
  },
  "colors.button.hig.filled.destructive.hover.bg": {
    "value": "color-mix(in oklch, var(--colors-accent-danger) 36%, transparent)",
    "variable": "var(--colors-button-hig-filled-destructive-hover-bg)"
  },
  "colors.button.hig.filled.destructive.hover.text": {
    "value": "var(--colors-text-glass-primary)",
    "variable": "var(--colors-button-hig-filled-destructive-hover-text)"
  },
  "colors.button.hig.filled.destructive.hover.border": {
    "value": "color-mix(in oklch, var(--colors-accent-danger) 60%, transparent)",
    "variable": "var(--colors-button-hig-filled-destructive-hover-border)"
  },
  "colors.button.hig.filled.destructive.active.bg": {
    "value": "color-mix(in oklch, var(--colors-accent-danger) 42%, transparent)",
    "variable": "var(--colors-button-hig-filled-destructive-active-bg)"
  },
  "colors.button.hig.filled.destructive.active.text": {
    "value": "var(--colors-text-glass-primary)",
    "variable": "var(--colors-button-hig-filled-destructive-active-text)"
  },
  "colors.button.hig.filled.destructive.active.border": {
    "value": "color-mix(in oklch, var(--colors-accent-danger) 65%, transparent)",
    "variable": "var(--colors-button-hig-filled-destructive-active-border)"
  },
  "colors.button.hig.filled.destructive.disabled.bg": {
    "value": "color-mix(in oklch, var(--colors-accent-danger) 18%, transparent)",
    "variable": "var(--colors-button-hig-filled-destructive-disabled-bg)"
  },
  "colors.button.hig.filled.destructive.disabled.text": {
    "value": "var(--colors-text-glass-disabled)",
    "variable": "var(--colors-button-hig-filled-destructive-disabled-text)"
  },
  "colors.button.hig.filled.destructive.disabled.border": {
    "value": "color-mix(in oklch, var(--colors-accent-danger) 35%, transparent)",
    "variable": "var(--colors-button-hig-filled-destructive-disabled-border)"
  },
  "colors.button.hig.filled.destructive.focus.bg": {
    "value": "color-mix(in oklch, var(--colors-accent-danger) 32%, transparent)",
    "variable": "var(--colors-button-hig-filled-destructive-focus-bg)"
  },
  "colors.button.hig.filled.destructive.focus.text": {
    "value": "var(--colors-text-glass-primary)",
    "variable": "var(--colors-button-hig-filled-destructive-focus-text)"
  },
  "colors.button.hig.filled.destructive.focus.border": {
    "value": "var(--colors-accent-danger)",
    "variable": "var(--colors-button-hig-filled-destructive-focus-border)"
  },
  "colors.button.hig.filled.destructive.loading.bg": {
    "value": "color-mix(in oklch, var(--colors-accent-danger) 30%, transparent)",
    "variable": "var(--colors-button-hig-filled-destructive-loading-bg)"
  },
  "colors.button.hig.filled.destructive.loading.text": {
    "value": "var(--colors-text-glass-primary)",
    "variable": "var(--colors-button-hig-filled-destructive-loading-text)"
  },
  "colors.button.hig.filled.destructive.loading.border": {
    "value": "color-mix(in oklch, var(--colors-accent-danger) 55%, transparent)",
    "variable": "var(--colors-button-hig-filled-destructive-loading-border)"
  },
  "colors.button.hig.tinted.accent.default.bg": {
    "value": "color-mix(in oklch, var(--colors-accent-dynamic) 18%, transparent)",
    "variable": "var(--colors-button-hig-tinted-accent-default-bg)"
  },
  "colors.button.hig.tinted.accent.default.text": {
    "value": "var(--colors-text-glass-primary)",
    "variable": "var(--colors-button-hig-tinted-accent-default-text)"
  },
  "colors.button.hig.tinted.accent.default.border": {
    "value": "color-mix(in oklch, var(--colors-accent-dynamic) 35%, transparent)",
    "variable": "var(--colors-button-hig-tinted-accent-default-border)"
  },
  "colors.button.hig.tinted.accent.hover.bg": {
    "value": "color-mix(in oklch, var(--colors-accent-dynamic) 24%, transparent)",
    "variable": "var(--colors-button-hig-tinted-accent-hover-bg)"
  },
  "colors.button.hig.tinted.accent.hover.text": {
    "value": "var(--colors-text-glass-primary)",
    "variable": "var(--colors-button-hig-tinted-accent-hover-text)"
  },
  "colors.button.hig.tinted.accent.hover.border": {
    "value": "color-mix(in oklch, var(--colors-accent-dynamic) 45%, transparent)",
    "variable": "var(--colors-button-hig-tinted-accent-hover-border)"
  },
  "colors.button.hig.tinted.accent.active.bg": {
    "value": "color-mix(in oklch, var(--colors-accent-dynamic) 28%, transparent)",
    "variable": "var(--colors-button-hig-tinted-accent-active-bg)"
  },
  "colors.button.hig.tinted.accent.active.text": {
    "value": "var(--colors-text-glass-primary)",
    "variable": "var(--colors-button-hig-tinted-accent-active-text)"
  },
  "colors.button.hig.tinted.accent.active.border": {
    "value": "color-mix(in oklch, var(--colors-accent-dynamic) 50%, transparent)",
    "variable": "var(--colors-button-hig-tinted-accent-active-border)"
  },
  "colors.button.hig.tinted.accent.disabled.bg": {
    "value": "color-mix(in oklch, var(--colors-accent-dynamic) 12%, transparent)",
    "variable": "var(--colors-button-hig-tinted-accent-disabled-bg)"
  },
  "colors.button.hig.tinted.accent.disabled.text": {
    "value": "var(--colors-text-glass-disabled)",
    "variable": "var(--colors-button-hig-tinted-accent-disabled-text)"
  },
  "colors.button.hig.tinted.accent.disabled.border": {
    "value": "color-mix(in oklch, var(--colors-accent-dynamic) 25%, transparent)",
    "variable": "var(--colors-button-hig-tinted-accent-disabled-border)"
  },
  "colors.button.hig.tinted.accent.focus.bg": {
    "value": "color-mix(in oklch, var(--colors-accent-dynamic) 20%, transparent)",
    "variable": "var(--colors-button-hig-tinted-accent-focus-bg)"
  },
  "colors.button.hig.tinted.accent.focus.text": {
    "value": "var(--colors-text-glass-primary)",
    "variable": "var(--colors-button-hig-tinted-accent-focus-text)"
  },
  "colors.button.hig.tinted.accent.focus.border": {
    "value": "var(--colors-accent-dynamic)",
    "variable": "var(--colors-button-hig-tinted-accent-focus-border)"
  },
  "colors.button.hig.tinted.accent.loading.bg": {
    "value": "color-mix(in oklch, var(--colors-accent-dynamic) 18%, transparent)",
    "variable": "var(--colors-button-hig-tinted-accent-loading-bg)"
  },
  "colors.button.hig.tinted.accent.loading.text": {
    "value": "var(--colors-text-glass-primary)",
    "variable": "var(--colors-button-hig-tinted-accent-loading-text)"
  },
  "colors.button.hig.tinted.accent.loading.border": {
    "value": "color-mix(in oklch, var(--colors-accent-dynamic) 35%, transparent)",
    "variable": "var(--colors-button-hig-tinted-accent-loading-border)"
  },
  "colors.button.hig.tinted.neutral.default.bg": {
    "value": "var(--colors-glass-subtle-bg)",
    "variable": "var(--colors-button-hig-tinted-neutral-default-bg)"
  },
  "colors.button.hig.tinted.neutral.default.text": {
    "value": "var(--colors-text-glass-primary)",
    "variable": "var(--colors-button-hig-tinted-neutral-default-text)"
  },
  "colors.button.hig.tinted.neutral.default.border": {
    "value": "var(--colors-glass-subtle-border)",
    "variable": "var(--colors-button-hig-tinted-neutral-default-border)"
  },
  "colors.button.hig.tinted.neutral.hover.bg": {
    "value": "var(--colors-glass-medium-bg)",
    "variable": "var(--colors-button-hig-tinted-neutral-hover-bg)"
  },
  "colors.button.hig.tinted.neutral.hover.text": {
    "value": "var(--colors-text-glass-primary)",
    "variable": "var(--colors-button-hig-tinted-neutral-hover-text)"
  },
  "colors.button.hig.tinted.neutral.hover.border": {
    "value": "var(--colors-glass-medium-border)",
    "variable": "var(--colors-button-hig-tinted-neutral-hover-border)"
  },
  "colors.button.hig.tinted.neutral.active.bg": {
    "value": "var(--colors-glass-strong-bg)",
    "variable": "var(--colors-button-hig-tinted-neutral-active-bg)"
  },
  "colors.button.hig.tinted.neutral.active.text": {
    "value": "var(--colors-text-glass-primary)",
    "variable": "var(--colors-button-hig-tinted-neutral-active-text)"
  },
  "colors.button.hig.tinted.neutral.active.border": {
    "value": "var(--colors-glass-strong-border)",
    "variable": "var(--colors-button-hig-tinted-neutral-active-border)"
  },
  "colors.button.hig.tinted.neutral.disabled.bg": {
    "value": "var(--colors-glass-subtle-bg)",
    "variable": "var(--colors-button-hig-tinted-neutral-disabled-bg)"
  },
  "colors.button.hig.tinted.neutral.disabled.text": {
    "value": "var(--colors-text-glass-disabled)",
    "variable": "var(--colors-button-hig-tinted-neutral-disabled-text)"
  },
  "colors.button.hig.tinted.neutral.disabled.border": {
    "value": "var(--colors-glass-subtle-border)",
    "variable": "var(--colors-button-hig-tinted-neutral-disabled-border)"
  },
  "colors.button.hig.tinted.neutral.focus.bg": {
    "value": "var(--colors-glass-medium-bg)",
    "variable": "var(--colors-button-hig-tinted-neutral-focus-bg)"
  },
  "colors.button.hig.tinted.neutral.focus.text": {
    "value": "var(--colors-text-glass-primary)",
    "variable": "var(--colors-button-hig-tinted-neutral-focus-text)"
  },
  "colors.button.hig.tinted.neutral.focus.border": {
    "value": "var(--colors-accent-dynamic)",
    "variable": "var(--colors-button-hig-tinted-neutral-focus-border)"
  },
  "colors.button.hig.tinted.neutral.loading.bg": {
    "value": "var(--colors-glass-subtle-bg)",
    "variable": "var(--colors-button-hig-tinted-neutral-loading-bg)"
  },
  "colors.button.hig.tinted.neutral.loading.text": {
    "value": "var(--colors-text-glass-primary)",
    "variable": "var(--colors-button-hig-tinted-neutral-loading-text)"
  },
  "colors.button.hig.tinted.neutral.loading.border": {
    "value": "var(--colors-glass-subtle-border)",
    "variable": "var(--colors-button-hig-tinted-neutral-loading-border)"
  },
  "colors.button.hig.tinted.destructive.default.bg": {
    "value": "color-mix(in oklch, var(--colors-accent-danger) 18%, transparent)",
    "variable": "var(--colors-button-hig-tinted-destructive-default-bg)"
  },
  "colors.button.hig.tinted.destructive.default.text": {
    "value": "var(--colors-text-glass-primary)",
    "variable": "var(--colors-button-hig-tinted-destructive-default-text)"
  },
  "colors.button.hig.tinted.destructive.default.border": {
    "value": "color-mix(in oklch, var(--colors-accent-danger) 35%, transparent)",
    "variable": "var(--colors-button-hig-tinted-destructive-default-border)"
  },
  "colors.button.hig.tinted.destructive.hover.bg": {
    "value": "color-mix(in oklch, var(--colors-accent-danger) 24%, transparent)",
    "variable": "var(--colors-button-hig-tinted-destructive-hover-bg)"
  },
  "colors.button.hig.tinted.destructive.hover.text": {
    "value": "var(--colors-text-glass-primary)",
    "variable": "var(--colors-button-hig-tinted-destructive-hover-text)"
  },
  "colors.button.hig.tinted.destructive.hover.border": {
    "value": "color-mix(in oklch, var(--colors-accent-danger) 45%, transparent)",
    "variable": "var(--colors-button-hig-tinted-destructive-hover-border)"
  },
  "colors.button.hig.tinted.destructive.active.bg": {
    "value": "color-mix(in oklch, var(--colors-accent-danger) 28%, transparent)",
    "variable": "var(--colors-button-hig-tinted-destructive-active-bg)"
  },
  "colors.button.hig.tinted.destructive.active.text": {
    "value": "var(--colors-text-glass-primary)",
    "variable": "var(--colors-button-hig-tinted-destructive-active-text)"
  },
  "colors.button.hig.tinted.destructive.active.border": {
    "value": "color-mix(in oklch, var(--colors-accent-danger) 50%, transparent)",
    "variable": "var(--colors-button-hig-tinted-destructive-active-border)"
  },
  "colors.button.hig.tinted.destructive.disabled.bg": {
    "value": "color-mix(in oklch, var(--colors-accent-danger) 12%, transparent)",
    "variable": "var(--colors-button-hig-tinted-destructive-disabled-bg)"
  },
  "colors.button.hig.tinted.destructive.disabled.text": {
    "value": "var(--colors-text-glass-disabled)",
    "variable": "var(--colors-button-hig-tinted-destructive-disabled-text)"
  },
  "colors.button.hig.tinted.destructive.disabled.border": {
    "value": "color-mix(in oklch, var(--colors-accent-danger) 25%, transparent)",
    "variable": "var(--colors-button-hig-tinted-destructive-disabled-border)"
  },
  "colors.button.hig.tinted.destructive.focus.bg": {
    "value": "color-mix(in oklch, var(--colors-accent-danger) 20%, transparent)",
    "variable": "var(--colors-button-hig-tinted-destructive-focus-bg)"
  },
  "colors.button.hig.tinted.destructive.focus.text": {
    "value": "var(--colors-text-glass-primary)",
    "variable": "var(--colors-button-hig-tinted-destructive-focus-text)"
  },
  "colors.button.hig.tinted.destructive.focus.border": {
    "value": "var(--colors-accent-danger)",
    "variable": "var(--colors-button-hig-tinted-destructive-focus-border)"
  },
  "colors.button.hig.tinted.destructive.loading.bg": {
    "value": "color-mix(in oklch, var(--colors-accent-danger) 18%, transparent)",
    "variable": "var(--colors-button-hig-tinted-destructive-loading-bg)"
  },
  "colors.button.hig.tinted.destructive.loading.text": {
    "value": "var(--colors-text-glass-primary)",
    "variable": "var(--colors-button-hig-tinted-destructive-loading-text)"
  },
  "colors.button.hig.tinted.destructive.loading.border": {
    "value": "color-mix(in oklch, var(--colors-accent-danger) 35%, transparent)",
    "variable": "var(--colors-button-hig-tinted-destructive-loading-border)"
  },
  "colors.button.hig.plain.accent.default.bg": {
    "value": "transparent",
    "variable": "var(--colors-button-hig-plain-accent-default-bg)"
  },
  "colors.button.hig.plain.accent.default.text": {
    "value": "var(--colors-text-glass-primary)",
    "variable": "var(--colors-button-hig-plain-accent-default-text)"
  },
  "colors.button.hig.plain.accent.default.border": {
    "value": "var(--colors-glass-subtle-border)",
    "variable": "var(--colors-button-hig-plain-accent-default-border)"
  },
  "colors.button.hig.plain.accent.hover.bg": {
    "value": "var(--colors-glass-subtle-bg)",
    "variable": "var(--colors-button-hig-plain-accent-hover-bg)"
  },
  "colors.button.hig.plain.accent.hover.text": {
    "value": "var(--colors-text-glass-primary)",
    "variable": "var(--colors-button-hig-plain-accent-hover-text)"
  },
  "colors.button.hig.plain.accent.hover.border": {
    "value": "var(--colors-glass-subtle-border)",
    "variable": "var(--colors-button-hig-plain-accent-hover-border)"
  },
  "colors.button.hig.plain.accent.active.bg": {
    "value": "var(--colors-glass-medium-bg)",
    "variable": "var(--colors-button-hig-plain-accent-active-bg)"
  },
  "colors.button.hig.plain.accent.active.text": {
    "value": "var(--colors-text-glass-primary)",
    "variable": "var(--colors-button-hig-plain-accent-active-text)"
  },
  "colors.button.hig.plain.accent.active.border": {
    "value": "var(--colors-glass-medium-border)",
    "variable": "var(--colors-button-hig-plain-accent-active-border)"
  },
  "colors.button.hig.plain.accent.disabled.bg": {
    "value": "transparent",
    "variable": "var(--colors-button-hig-plain-accent-disabled-bg)"
  },
  "colors.button.hig.plain.accent.disabled.text": {
    "value": "var(--colors-text-glass-disabled)",
    "variable": "var(--colors-button-hig-plain-accent-disabled-text)"
  },
  "colors.button.hig.plain.accent.disabled.border": {
    "value": "var(--colors-glass-subtle-border)",
    "variable": "var(--colors-button-hig-plain-accent-disabled-border)"
  },
  "colors.button.hig.plain.accent.focus.bg": {
    "value": "transparent",
    "variable": "var(--colors-button-hig-plain-accent-focus-bg)"
  },
  "colors.button.hig.plain.accent.focus.text": {
    "value": "var(--colors-text-glass-primary)",
    "variable": "var(--colors-button-hig-plain-accent-focus-text)"
  },
  "colors.button.hig.plain.accent.focus.border": {
    "value": "var(--colors-accent-dynamic)",
    "variable": "var(--colors-button-hig-plain-accent-focus-border)"
  },
  "colors.button.hig.plain.accent.loading.bg": {
    "value": "transparent",
    "variable": "var(--colors-button-hig-plain-accent-loading-bg)"
  },
  "colors.button.hig.plain.accent.loading.text": {
    "value": "var(--colors-text-glass-primary)",
    "variable": "var(--colors-button-hig-plain-accent-loading-text)"
  },
  "colors.button.hig.plain.accent.loading.border": {
    "value": "var(--colors-glass-subtle-border)",
    "variable": "var(--colors-button-hig-plain-accent-loading-border)"
  },
  "colors.button.hig.plain.neutral.default.bg": {
    "value": "transparent",
    "variable": "var(--colors-button-hig-plain-neutral-default-bg)"
  },
  "colors.button.hig.plain.neutral.default.text": {
    "value": "var(--colors-text-glass-primary)",
    "variable": "var(--colors-button-hig-plain-neutral-default-text)"
  },
  "colors.button.hig.plain.neutral.default.border": {
    "value": "var(--colors-glass-subtle-border)",
    "variable": "var(--colors-button-hig-plain-neutral-default-border)"
  },
  "colors.button.hig.plain.neutral.hover.bg": {
    "value": "var(--colors-glass-subtle-bg)",
    "variable": "var(--colors-button-hig-plain-neutral-hover-bg)"
  },
  "colors.button.hig.plain.neutral.hover.text": {
    "value": "var(--colors-text-glass-primary)",
    "variable": "var(--colors-button-hig-plain-neutral-hover-text)"
  },
  "colors.button.hig.plain.neutral.hover.border": {
    "value": "var(--colors-glass-subtle-border)",
    "variable": "var(--colors-button-hig-plain-neutral-hover-border)"
  },
  "colors.button.hig.plain.neutral.active.bg": {
    "value": "var(--colors-glass-medium-bg)",
    "variable": "var(--colors-button-hig-plain-neutral-active-bg)"
  },
  "colors.button.hig.plain.neutral.active.text": {
    "value": "var(--colors-text-glass-primary)",
    "variable": "var(--colors-button-hig-plain-neutral-active-text)"
  },
  "colors.button.hig.plain.neutral.active.border": {
    "value": "var(--colors-glass-medium-border)",
    "variable": "var(--colors-button-hig-plain-neutral-active-border)"
  },
  "colors.button.hig.plain.neutral.disabled.bg": {
    "value": "transparent",
    "variable": "var(--colors-button-hig-plain-neutral-disabled-bg)"
  },
  "colors.button.hig.plain.neutral.disabled.text": {
    "value": "var(--colors-text-glass-disabled)",
    "variable": "var(--colors-button-hig-plain-neutral-disabled-text)"
  },
  "colors.button.hig.plain.neutral.disabled.border": {
    "value": "var(--colors-glass-subtle-border)",
    "variable": "var(--colors-button-hig-plain-neutral-disabled-border)"
  },
  "colors.button.hig.plain.neutral.focus.bg": {
    "value": "transparent",
    "variable": "var(--colors-button-hig-plain-neutral-focus-bg)"
  },
  "colors.button.hig.plain.neutral.focus.text": {
    "value": "var(--colors-text-glass-primary)",
    "variable": "var(--colors-button-hig-plain-neutral-focus-text)"
  },
  "colors.button.hig.plain.neutral.focus.border": {
    "value": "var(--colors-accent-dynamic)",
    "variable": "var(--colors-button-hig-plain-neutral-focus-border)"
  },
  "colors.button.hig.plain.neutral.loading.bg": {
    "value": "transparent",
    "variable": "var(--colors-button-hig-plain-neutral-loading-bg)"
  },
  "colors.button.hig.plain.neutral.loading.text": {
    "value": "var(--colors-text-glass-primary)",
    "variable": "var(--colors-button-hig-plain-neutral-loading-text)"
  },
  "colors.button.hig.plain.neutral.loading.border": {
    "value": "var(--colors-glass-subtle-border)",
    "variable": "var(--colors-button-hig-plain-neutral-loading-border)"
  },
  "colors.button.hig.plain.destructive.default.bg": {
    "value": "transparent",
    "variable": "var(--colors-button-hig-plain-destructive-default-bg)"
  },
  "colors.button.hig.plain.destructive.default.text": {
    "value": "var(--colors-text-glass-primary)",
    "variable": "var(--colors-button-hig-plain-destructive-default-text)"
  },
  "colors.button.hig.plain.destructive.default.border": {
    "value": "var(--colors-glass-subtle-border)",
    "variable": "var(--colors-button-hig-plain-destructive-default-border)"
  },
  "colors.button.hig.plain.destructive.hover.bg": {
    "value": "var(--colors-glass-subtle-bg)",
    "variable": "var(--colors-button-hig-plain-destructive-hover-bg)"
  },
  "colors.button.hig.plain.destructive.hover.text": {
    "value": "var(--colors-text-glass-primary)",
    "variable": "var(--colors-button-hig-plain-destructive-hover-text)"
  },
  "colors.button.hig.plain.destructive.hover.border": {
    "value": "var(--colors-glass-subtle-border)",
    "variable": "var(--colors-button-hig-plain-destructive-hover-border)"
  },
  "colors.button.hig.plain.destructive.active.bg": {
    "value": "var(--colors-glass-medium-bg)",
    "variable": "var(--colors-button-hig-plain-destructive-active-bg)"
  },
  "colors.button.hig.plain.destructive.active.text": {
    "value": "var(--colors-text-glass-primary)",
    "variable": "var(--colors-button-hig-plain-destructive-active-text)"
  },
  "colors.button.hig.plain.destructive.active.border": {
    "value": "var(--colors-glass-medium-border)",
    "variable": "var(--colors-button-hig-plain-destructive-active-border)"
  },
  "colors.button.hig.plain.destructive.disabled.bg": {
    "value": "transparent",
    "variable": "var(--colors-button-hig-plain-destructive-disabled-bg)"
  },
  "colors.button.hig.plain.destructive.disabled.text": {
    "value": "var(--colors-text-glass-disabled)",
    "variable": "var(--colors-button-hig-plain-destructive-disabled-text)"
  },
  "colors.button.hig.plain.destructive.disabled.border": {
    "value": "var(--colors-glass-subtle-border)",
    "variable": "var(--colors-button-hig-plain-destructive-disabled-border)"
  },
  "colors.button.hig.plain.destructive.focus.bg": {
    "value": "transparent",
    "variable": "var(--colors-button-hig-plain-destructive-focus-bg)"
  },
  "colors.button.hig.plain.destructive.focus.text": {
    "value": "var(--colors-text-glass-primary)",
    "variable": "var(--colors-button-hig-plain-destructive-focus-text)"
  },
  "colors.button.hig.plain.destructive.focus.border": {
    "value": "var(--colors-accent-danger)",
    "variable": "var(--colors-button-hig-plain-destructive-focus-border)"
  },
  "colors.button.hig.plain.destructive.loading.bg": {
    "value": "transparent",
    "variable": "var(--colors-button-hig-plain-destructive-loading-bg)"
  },
  "colors.button.hig.plain.destructive.loading.text": {
    "value": "var(--colors-text-glass-primary)",
    "variable": "var(--colors-button-hig-plain-destructive-loading-text)"
  },
  "colors.button.hig.plain.destructive.loading.border": {
    "value": "var(--colors-glass-subtle-border)",
    "variable": "var(--colors-button-hig-plain-destructive-loading-border)"
  },
  "colors.button.filled.accent.default.bg": {
    "value": "var(--colors-button-hig-filled-accent-default-bg)",
    "variable": "var(--colors-button-filled-accent-default-bg)"
  },
  "colors.button.filled.accent.default.text": {
    "value": "var(--colors-button-hig-filled-accent-default-text)",
    "variable": "var(--colors-button-filled-accent-default-text)"
  },
  "colors.button.filled.accent.default.border": {
    "value": "var(--colors-button-hig-filled-accent-default-border)",
    "variable": "var(--colors-button-filled-accent-default-border)"
  },
  "colors.button.filled.accent.hover.bg": {
    "value": "var(--colors-button-hig-filled-accent-hover-bg)",
    "variable": "var(--colors-button-filled-accent-hover-bg)"
  },
  "colors.button.filled.accent.hover.text": {
    "value": "var(--colors-button-hig-filled-accent-hover-text)",
    "variable": "var(--colors-button-filled-accent-hover-text)"
  },
  "colors.button.filled.accent.hover.border": {
    "value": "var(--colors-button-hig-filled-accent-hover-border)",
    "variable": "var(--colors-button-filled-accent-hover-border)"
  },
  "colors.button.filled.accent.active.bg": {
    "value": "var(--colors-button-hig-filled-accent-active-bg)",
    "variable": "var(--colors-button-filled-accent-active-bg)"
  },
  "colors.button.filled.accent.active.text": {
    "value": "var(--colors-button-hig-filled-accent-active-text)",
    "variable": "var(--colors-button-filled-accent-active-text)"
  },
  "colors.button.filled.accent.active.border": {
    "value": "var(--colors-button-hig-filled-accent-active-border)",
    "variable": "var(--colors-button-filled-accent-active-border)"
  },
  "colors.button.filled.accent.disabled.bg": {
    "value": "var(--colors-button-hig-filled-accent-disabled-bg)",
    "variable": "var(--colors-button-filled-accent-disabled-bg)"
  },
  "colors.button.filled.accent.disabled.text": {
    "value": "var(--colors-button-hig-filled-accent-disabled-text)",
    "variable": "var(--colors-button-filled-accent-disabled-text)"
  },
  "colors.button.filled.accent.disabled.border": {
    "value": "var(--colors-button-hig-filled-accent-disabled-border)",
    "variable": "var(--colors-button-filled-accent-disabled-border)"
  },
  "colors.button.filled.accent.focus.bg": {
    "value": "var(--colors-button-hig-filled-accent-focus-bg)",
    "variable": "var(--colors-button-filled-accent-focus-bg)"
  },
  "colors.button.filled.accent.focus.text": {
    "value": "var(--colors-button-hig-filled-accent-focus-text)",
    "variable": "var(--colors-button-filled-accent-focus-text)"
  },
  "colors.button.filled.accent.focus.border": {
    "value": "var(--colors-button-hig-filled-accent-focus-border)",
    "variable": "var(--colors-button-filled-accent-focus-border)"
  },
  "colors.button.filled.accent.loading.bg": {
    "value": "var(--colors-button-hig-filled-accent-loading-bg)",
    "variable": "var(--colors-button-filled-accent-loading-bg)"
  },
  "colors.button.filled.accent.loading.text": {
    "value": "var(--colors-button-hig-filled-accent-loading-text)",
    "variable": "var(--colors-button-filled-accent-loading-text)"
  },
  "colors.button.filled.accent.loading.border": {
    "value": "var(--colors-button-hig-filled-accent-loading-border)",
    "variable": "var(--colors-button-filled-accent-loading-border)"
  },
  "colors.button.filled.neutral.default.bg": {
    "value": "var(--colors-button-hig-filled-neutral-default-bg)",
    "variable": "var(--colors-button-filled-neutral-default-bg)"
  },
  "colors.button.filled.neutral.default.text": {
    "value": "var(--colors-button-hig-filled-neutral-default-text)",
    "variable": "var(--colors-button-filled-neutral-default-text)"
  },
  "colors.button.filled.neutral.default.border": {
    "value": "var(--colors-button-hig-filled-neutral-default-border)",
    "variable": "var(--colors-button-filled-neutral-default-border)"
  },
  "colors.button.filled.neutral.hover.bg": {
    "value": "var(--colors-button-hig-filled-neutral-hover-bg)",
    "variable": "var(--colors-button-filled-neutral-hover-bg)"
  },
  "colors.button.filled.neutral.hover.text": {
    "value": "var(--colors-button-hig-filled-neutral-hover-text)",
    "variable": "var(--colors-button-filled-neutral-hover-text)"
  },
  "colors.button.filled.neutral.hover.border": {
    "value": "var(--colors-button-hig-filled-neutral-hover-border)",
    "variable": "var(--colors-button-filled-neutral-hover-border)"
  },
  "colors.button.filled.neutral.active.bg": {
    "value": "var(--colors-button-hig-filled-neutral-active-bg)",
    "variable": "var(--colors-button-filled-neutral-active-bg)"
  },
  "colors.button.filled.neutral.active.text": {
    "value": "var(--colors-button-hig-filled-neutral-active-text)",
    "variable": "var(--colors-button-filled-neutral-active-text)"
  },
  "colors.button.filled.neutral.active.border": {
    "value": "var(--colors-button-hig-filled-neutral-active-border)",
    "variable": "var(--colors-button-filled-neutral-active-border)"
  },
  "colors.button.filled.neutral.disabled.bg": {
    "value": "var(--colors-button-hig-filled-neutral-disabled-bg)",
    "variable": "var(--colors-button-filled-neutral-disabled-bg)"
  },
  "colors.button.filled.neutral.disabled.text": {
    "value": "var(--colors-button-hig-filled-neutral-disabled-text)",
    "variable": "var(--colors-button-filled-neutral-disabled-text)"
  },
  "colors.button.filled.neutral.disabled.border": {
    "value": "var(--colors-button-hig-filled-neutral-disabled-border)",
    "variable": "var(--colors-button-filled-neutral-disabled-border)"
  },
  "colors.button.filled.neutral.focus.bg": {
    "value": "var(--colors-button-hig-filled-neutral-focus-bg)",
    "variable": "var(--colors-button-filled-neutral-focus-bg)"
  },
  "colors.button.filled.neutral.focus.text": {
    "value": "var(--colors-button-hig-filled-neutral-focus-text)",
    "variable": "var(--colors-button-filled-neutral-focus-text)"
  },
  "colors.button.filled.neutral.focus.border": {
    "value": "var(--colors-button-hig-filled-neutral-focus-border)",
    "variable": "var(--colors-button-filled-neutral-focus-border)"
  },
  "colors.button.filled.neutral.loading.bg": {
    "value": "var(--colors-button-hig-filled-neutral-loading-bg)",
    "variable": "var(--colors-button-filled-neutral-loading-bg)"
  },
  "colors.button.filled.neutral.loading.text": {
    "value": "var(--colors-button-hig-filled-neutral-loading-text)",
    "variable": "var(--colors-button-filled-neutral-loading-text)"
  },
  "colors.button.filled.neutral.loading.border": {
    "value": "var(--colors-button-hig-filled-neutral-loading-border)",
    "variable": "var(--colors-button-filled-neutral-loading-border)"
  },
  "colors.button.filled.destructive.default.bg": {
    "value": "var(--colors-button-hig-filled-destructive-default-bg)",
    "variable": "var(--colors-button-filled-destructive-default-bg)"
  },
  "colors.button.filled.destructive.default.text": {
    "value": "var(--colors-button-hig-filled-destructive-default-text)",
    "variable": "var(--colors-button-filled-destructive-default-text)"
  },
  "colors.button.filled.destructive.default.border": {
    "value": "var(--colors-button-hig-filled-destructive-default-border)",
    "variable": "var(--colors-button-filled-destructive-default-border)"
  },
  "colors.button.filled.destructive.hover.bg": {
    "value": "var(--colors-button-hig-filled-destructive-hover-bg)",
    "variable": "var(--colors-button-filled-destructive-hover-bg)"
  },
  "colors.button.filled.destructive.hover.text": {
    "value": "var(--colors-button-hig-filled-destructive-hover-text)",
    "variable": "var(--colors-button-filled-destructive-hover-text)"
  },
  "colors.button.filled.destructive.hover.border": {
    "value": "var(--colors-button-hig-filled-destructive-hover-border)",
    "variable": "var(--colors-button-filled-destructive-hover-border)"
  },
  "colors.button.filled.destructive.active.bg": {
    "value": "var(--colors-button-hig-filled-destructive-active-bg)",
    "variable": "var(--colors-button-filled-destructive-active-bg)"
  },
  "colors.button.filled.destructive.active.text": {
    "value": "var(--colors-button-hig-filled-destructive-active-text)",
    "variable": "var(--colors-button-filled-destructive-active-text)"
  },
  "colors.button.filled.destructive.active.border": {
    "value": "var(--colors-button-hig-filled-destructive-active-border)",
    "variable": "var(--colors-button-filled-destructive-active-border)"
  },
  "colors.button.filled.destructive.disabled.bg": {
    "value": "var(--colors-button-hig-filled-destructive-disabled-bg)",
    "variable": "var(--colors-button-filled-destructive-disabled-bg)"
  },
  "colors.button.filled.destructive.disabled.text": {
    "value": "var(--colors-button-hig-filled-destructive-disabled-text)",
    "variable": "var(--colors-button-filled-destructive-disabled-text)"
  },
  "colors.button.filled.destructive.disabled.border": {
    "value": "var(--colors-button-hig-filled-destructive-disabled-border)",
    "variable": "var(--colors-button-filled-destructive-disabled-border)"
  },
  "colors.button.filled.destructive.focus.bg": {
    "value": "var(--colors-button-hig-filled-destructive-focus-bg)",
    "variable": "var(--colors-button-filled-destructive-focus-bg)"
  },
  "colors.button.filled.destructive.focus.text": {
    "value": "var(--colors-button-hig-filled-destructive-focus-text)",
    "variable": "var(--colors-button-filled-destructive-focus-text)"
  },
  "colors.button.filled.destructive.focus.border": {
    "value": "var(--colors-button-hig-filled-destructive-focus-border)",
    "variable": "var(--colors-button-filled-destructive-focus-border)"
  },
  "colors.button.filled.destructive.loading.bg": {
    "value": "var(--colors-button-hig-filled-destructive-loading-bg)",
    "variable": "var(--colors-button-filled-destructive-loading-bg)"
  },
  "colors.button.filled.destructive.loading.text": {
    "value": "var(--colors-button-hig-filled-destructive-loading-text)",
    "variable": "var(--colors-button-filled-destructive-loading-text)"
  },
  "colors.button.filled.destructive.loading.border": {
    "value": "var(--colors-button-hig-filled-destructive-loading-border)",
    "variable": "var(--colors-button-filled-destructive-loading-border)"
  },
  "colors.button.tinted.accent.default.bg": {
    "value": "var(--colors-button-hig-tinted-accent-default-bg)",
    "variable": "var(--colors-button-tinted-accent-default-bg)"
  },
  "colors.button.tinted.accent.default.text": {
    "value": "var(--colors-button-hig-tinted-accent-default-text)",
    "variable": "var(--colors-button-tinted-accent-default-text)"
  },
  "colors.button.tinted.accent.default.border": {
    "value": "var(--colors-button-hig-tinted-accent-default-border)",
    "variable": "var(--colors-button-tinted-accent-default-border)"
  },
  "colors.button.tinted.accent.hover.bg": {
    "value": "var(--colors-button-hig-tinted-accent-hover-bg)",
    "variable": "var(--colors-button-tinted-accent-hover-bg)"
  },
  "colors.button.tinted.accent.hover.text": {
    "value": "var(--colors-button-hig-tinted-accent-hover-text)",
    "variable": "var(--colors-button-tinted-accent-hover-text)"
  },
  "colors.button.tinted.accent.hover.border": {
    "value": "var(--colors-button-hig-tinted-accent-hover-border)",
    "variable": "var(--colors-button-tinted-accent-hover-border)"
  },
  "colors.button.tinted.accent.active.bg": {
    "value": "var(--colors-button-hig-tinted-accent-active-bg)",
    "variable": "var(--colors-button-tinted-accent-active-bg)"
  },
  "colors.button.tinted.accent.active.text": {
    "value": "var(--colors-button-hig-tinted-accent-active-text)",
    "variable": "var(--colors-button-tinted-accent-active-text)"
  },
  "colors.button.tinted.accent.active.border": {
    "value": "var(--colors-button-hig-tinted-accent-active-border)",
    "variable": "var(--colors-button-tinted-accent-active-border)"
  },
  "colors.button.tinted.accent.disabled.bg": {
    "value": "var(--colors-button-hig-tinted-accent-disabled-bg)",
    "variable": "var(--colors-button-tinted-accent-disabled-bg)"
  },
  "colors.button.tinted.accent.disabled.text": {
    "value": "var(--colors-button-hig-tinted-accent-disabled-text)",
    "variable": "var(--colors-button-tinted-accent-disabled-text)"
  },
  "colors.button.tinted.accent.disabled.border": {
    "value": "var(--colors-button-hig-tinted-accent-disabled-border)",
    "variable": "var(--colors-button-tinted-accent-disabled-border)"
  },
  "colors.button.tinted.accent.focus.bg": {
    "value": "var(--colors-button-hig-tinted-accent-focus-bg)",
    "variable": "var(--colors-button-tinted-accent-focus-bg)"
  },
  "colors.button.tinted.accent.focus.text": {
    "value": "var(--colors-button-hig-tinted-accent-focus-text)",
    "variable": "var(--colors-button-tinted-accent-focus-text)"
  },
  "colors.button.tinted.accent.focus.border": {
    "value": "var(--colors-button-hig-tinted-accent-focus-border)",
    "variable": "var(--colors-button-tinted-accent-focus-border)"
  },
  "colors.button.tinted.accent.loading.bg": {
    "value": "var(--colors-button-hig-tinted-accent-loading-bg)",
    "variable": "var(--colors-button-tinted-accent-loading-bg)"
  },
  "colors.button.tinted.accent.loading.text": {
    "value": "var(--colors-button-hig-tinted-accent-loading-text)",
    "variable": "var(--colors-button-tinted-accent-loading-text)"
  },
  "colors.button.tinted.accent.loading.border": {
    "value": "var(--colors-button-hig-tinted-accent-loading-border)",
    "variable": "var(--colors-button-tinted-accent-loading-border)"
  },
  "colors.button.tinted.neutral.default.bg": {
    "value": "var(--colors-button-hig-tinted-neutral-default-bg)",
    "variable": "var(--colors-button-tinted-neutral-default-bg)"
  },
  "colors.button.tinted.neutral.default.text": {
    "value": "var(--colors-button-hig-tinted-neutral-default-text)",
    "variable": "var(--colors-button-tinted-neutral-default-text)"
  },
  "colors.button.tinted.neutral.default.border": {
    "value": "var(--colors-button-hig-tinted-neutral-default-border)",
    "variable": "var(--colors-button-tinted-neutral-default-border)"
  },
  "colors.button.tinted.neutral.hover.bg": {
    "value": "var(--colors-button-hig-tinted-neutral-hover-bg)",
    "variable": "var(--colors-button-tinted-neutral-hover-bg)"
  },
  "colors.button.tinted.neutral.hover.text": {
    "value": "var(--colors-button-hig-tinted-neutral-hover-text)",
    "variable": "var(--colors-button-tinted-neutral-hover-text)"
  },
  "colors.button.tinted.neutral.hover.border": {
    "value": "var(--colors-button-hig-tinted-neutral-hover-border)",
    "variable": "var(--colors-button-tinted-neutral-hover-border)"
  },
  "colors.button.tinted.neutral.active.bg": {
    "value": "var(--colors-button-hig-tinted-neutral-active-bg)",
    "variable": "var(--colors-button-tinted-neutral-active-bg)"
  },
  "colors.button.tinted.neutral.active.text": {
    "value": "var(--colors-button-hig-tinted-neutral-active-text)",
    "variable": "var(--colors-button-tinted-neutral-active-text)"
  },
  "colors.button.tinted.neutral.active.border": {
    "value": "var(--colors-button-hig-tinted-neutral-active-border)",
    "variable": "var(--colors-button-tinted-neutral-active-border)"
  },
  "colors.button.tinted.neutral.disabled.bg": {
    "value": "var(--colors-button-hig-tinted-neutral-disabled-bg)",
    "variable": "var(--colors-button-tinted-neutral-disabled-bg)"
  },
  "colors.button.tinted.neutral.disabled.text": {
    "value": "var(--colors-button-hig-tinted-neutral-disabled-text)",
    "variable": "var(--colors-button-tinted-neutral-disabled-text)"
  },
  "colors.button.tinted.neutral.disabled.border": {
    "value": "var(--colors-button-hig-tinted-neutral-disabled-border)",
    "variable": "var(--colors-button-tinted-neutral-disabled-border)"
  },
  "colors.button.tinted.neutral.focus.bg": {
    "value": "var(--colors-button-hig-tinted-neutral-focus-bg)",
    "variable": "var(--colors-button-tinted-neutral-focus-bg)"
  },
  "colors.button.tinted.neutral.focus.text": {
    "value": "var(--colors-button-hig-tinted-neutral-focus-text)",
    "variable": "var(--colors-button-tinted-neutral-focus-text)"
  },
  "colors.button.tinted.neutral.focus.border": {
    "value": "var(--colors-button-hig-tinted-neutral-focus-border)",
    "variable": "var(--colors-button-tinted-neutral-focus-border)"
  },
  "colors.button.tinted.neutral.loading.bg": {
    "value": "var(--colors-button-hig-tinted-neutral-loading-bg)",
    "variable": "var(--colors-button-tinted-neutral-loading-bg)"
  },
  "colors.button.tinted.neutral.loading.text": {
    "value": "var(--colors-button-hig-tinted-neutral-loading-text)",
    "variable": "var(--colors-button-tinted-neutral-loading-text)"
  },
  "colors.button.tinted.neutral.loading.border": {
    "value": "var(--colors-button-hig-tinted-neutral-loading-border)",
    "variable": "var(--colors-button-tinted-neutral-loading-border)"
  },
  "colors.button.tinted.destructive.default.bg": {
    "value": "var(--colors-button-hig-tinted-destructive-default-bg)",
    "variable": "var(--colors-button-tinted-destructive-default-bg)"
  },
  "colors.button.tinted.destructive.default.text": {
    "value": "var(--colors-button-hig-tinted-destructive-default-text)",
    "variable": "var(--colors-button-tinted-destructive-default-text)"
  },
  "colors.button.tinted.destructive.default.border": {
    "value": "var(--colors-button-hig-tinted-destructive-default-border)",
    "variable": "var(--colors-button-tinted-destructive-default-border)"
  },
  "colors.button.tinted.destructive.hover.bg": {
    "value": "var(--colors-button-hig-tinted-destructive-hover-bg)",
    "variable": "var(--colors-button-tinted-destructive-hover-bg)"
  },
  "colors.button.tinted.destructive.hover.text": {
    "value": "var(--colors-button-hig-tinted-destructive-hover-text)",
    "variable": "var(--colors-button-tinted-destructive-hover-text)"
  },
  "colors.button.tinted.destructive.hover.border": {
    "value": "var(--colors-button-hig-tinted-destructive-hover-border)",
    "variable": "var(--colors-button-tinted-destructive-hover-border)"
  },
  "colors.button.tinted.destructive.active.bg": {
    "value": "var(--colors-button-hig-tinted-destructive-active-bg)",
    "variable": "var(--colors-button-tinted-destructive-active-bg)"
  },
  "colors.button.tinted.destructive.active.text": {
    "value": "var(--colors-button-hig-tinted-destructive-active-text)",
    "variable": "var(--colors-button-tinted-destructive-active-text)"
  },
  "colors.button.tinted.destructive.active.border": {
    "value": "var(--colors-button-hig-tinted-destructive-active-border)",
    "variable": "var(--colors-button-tinted-destructive-active-border)"
  },
  "colors.button.tinted.destructive.disabled.bg": {
    "value": "var(--colors-button-hig-tinted-destructive-disabled-bg)",
    "variable": "var(--colors-button-tinted-destructive-disabled-bg)"
  },
  "colors.button.tinted.destructive.disabled.text": {
    "value": "var(--colors-button-hig-tinted-destructive-disabled-text)",
    "variable": "var(--colors-button-tinted-destructive-disabled-text)"
  },
  "colors.button.tinted.destructive.disabled.border": {
    "value": "var(--colors-button-hig-tinted-destructive-disabled-border)",
    "variable": "var(--colors-button-tinted-destructive-disabled-border)"
  },
  "colors.button.tinted.destructive.focus.bg": {
    "value": "var(--colors-button-hig-tinted-destructive-focus-bg)",
    "variable": "var(--colors-button-tinted-destructive-focus-bg)"
  },
  "colors.button.tinted.destructive.focus.text": {
    "value": "var(--colors-button-hig-tinted-destructive-focus-text)",
    "variable": "var(--colors-button-tinted-destructive-focus-text)"
  },
  "colors.button.tinted.destructive.focus.border": {
    "value": "var(--colors-button-hig-tinted-destructive-focus-border)",
    "variable": "var(--colors-button-tinted-destructive-focus-border)"
  },
  "colors.button.tinted.destructive.loading.bg": {
    "value": "var(--colors-button-hig-tinted-destructive-loading-bg)",
    "variable": "var(--colors-button-tinted-destructive-loading-bg)"
  },
  "colors.button.tinted.destructive.loading.text": {
    "value": "var(--colors-button-hig-tinted-destructive-loading-text)",
    "variable": "var(--colors-button-tinted-destructive-loading-text)"
  },
  "colors.button.tinted.destructive.loading.border": {
    "value": "var(--colors-button-hig-tinted-destructive-loading-border)",
    "variable": "var(--colors-button-tinted-destructive-loading-border)"
  },
  "colors.button.plain.accent.default.bg": {
    "value": "var(--colors-button-hig-plain-accent-default-bg)",
    "variable": "var(--colors-button-plain-accent-default-bg)"
  },
  "colors.button.plain.accent.default.text": {
    "value": "var(--colors-button-hig-plain-accent-default-text)",
    "variable": "var(--colors-button-plain-accent-default-text)"
  },
  "colors.button.plain.accent.default.border": {
    "value": "var(--colors-button-hig-plain-accent-default-border)",
    "variable": "var(--colors-button-plain-accent-default-border)"
  },
  "colors.button.plain.accent.hover.bg": {
    "value": "var(--colors-button-hig-plain-accent-hover-bg)",
    "variable": "var(--colors-button-plain-accent-hover-bg)"
  },
  "colors.button.plain.accent.hover.text": {
    "value": "var(--colors-button-hig-plain-accent-hover-text)",
    "variable": "var(--colors-button-plain-accent-hover-text)"
  },
  "colors.button.plain.accent.hover.border": {
    "value": "var(--colors-button-hig-plain-accent-hover-border)",
    "variable": "var(--colors-button-plain-accent-hover-border)"
  },
  "colors.button.plain.accent.active.bg": {
    "value": "var(--colors-button-hig-plain-accent-active-bg)",
    "variable": "var(--colors-button-plain-accent-active-bg)"
  },
  "colors.button.plain.accent.active.text": {
    "value": "var(--colors-button-hig-plain-accent-active-text)",
    "variable": "var(--colors-button-plain-accent-active-text)"
  },
  "colors.button.plain.accent.active.border": {
    "value": "var(--colors-button-hig-plain-accent-active-border)",
    "variable": "var(--colors-button-plain-accent-active-border)"
  },
  "colors.button.plain.accent.disabled.bg": {
    "value": "var(--colors-button-hig-plain-accent-disabled-bg)",
    "variable": "var(--colors-button-plain-accent-disabled-bg)"
  },
  "colors.button.plain.accent.disabled.text": {
    "value": "var(--colors-button-hig-plain-accent-disabled-text)",
    "variable": "var(--colors-button-plain-accent-disabled-text)"
  },
  "colors.button.plain.accent.disabled.border": {
    "value": "var(--colors-button-hig-plain-accent-disabled-border)",
    "variable": "var(--colors-button-plain-accent-disabled-border)"
  },
  "colors.button.plain.accent.focus.bg": {
    "value": "var(--colors-button-hig-plain-accent-focus-bg)",
    "variable": "var(--colors-button-plain-accent-focus-bg)"
  },
  "colors.button.plain.accent.focus.text": {
    "value": "var(--colors-button-hig-plain-accent-focus-text)",
    "variable": "var(--colors-button-plain-accent-focus-text)"
  },
  "colors.button.plain.accent.focus.border": {
    "value": "var(--colors-button-hig-plain-accent-focus-border)",
    "variable": "var(--colors-button-plain-accent-focus-border)"
  },
  "colors.button.plain.accent.loading.bg": {
    "value": "var(--colors-button-hig-plain-accent-loading-bg)",
    "variable": "var(--colors-button-plain-accent-loading-bg)"
  },
  "colors.button.plain.accent.loading.text": {
    "value": "var(--colors-button-hig-plain-accent-loading-text)",
    "variable": "var(--colors-button-plain-accent-loading-text)"
  },
  "colors.button.plain.accent.loading.border": {
    "value": "var(--colors-button-hig-plain-accent-loading-border)",
    "variable": "var(--colors-button-plain-accent-loading-border)"
  },
  "colors.button.plain.neutral.default.bg": {
    "value": "var(--colors-button-hig-plain-neutral-default-bg)",
    "variable": "var(--colors-button-plain-neutral-default-bg)"
  },
  "colors.button.plain.neutral.default.text": {
    "value": "var(--colors-button-hig-plain-neutral-default-text)",
    "variable": "var(--colors-button-plain-neutral-default-text)"
  },
  "colors.button.plain.neutral.default.border": {
    "value": "var(--colors-button-hig-plain-neutral-default-border)",
    "variable": "var(--colors-button-plain-neutral-default-border)"
  },
  "colors.button.plain.neutral.hover.bg": {
    "value": "var(--colors-button-hig-plain-neutral-hover-bg)",
    "variable": "var(--colors-button-plain-neutral-hover-bg)"
  },
  "colors.button.plain.neutral.hover.text": {
    "value": "var(--colors-button-hig-plain-neutral-hover-text)",
    "variable": "var(--colors-button-plain-neutral-hover-text)"
  },
  "colors.button.plain.neutral.hover.border": {
    "value": "var(--colors-button-hig-plain-neutral-hover-border)",
    "variable": "var(--colors-button-plain-neutral-hover-border)"
  },
  "colors.button.plain.neutral.active.bg": {
    "value": "var(--colors-button-hig-plain-neutral-active-bg)",
    "variable": "var(--colors-button-plain-neutral-active-bg)"
  },
  "colors.button.plain.neutral.active.text": {
    "value": "var(--colors-button-hig-plain-neutral-active-text)",
    "variable": "var(--colors-button-plain-neutral-active-text)"
  },
  "colors.button.plain.neutral.active.border": {
    "value": "var(--colors-button-hig-plain-neutral-active-border)",
    "variable": "var(--colors-button-plain-neutral-active-border)"
  },
  "colors.button.plain.neutral.disabled.bg": {
    "value": "var(--colors-button-hig-plain-neutral-disabled-bg)",
    "variable": "var(--colors-button-plain-neutral-disabled-bg)"
  },
  "colors.button.plain.neutral.disabled.text": {
    "value": "var(--colors-button-hig-plain-neutral-disabled-text)",
    "variable": "var(--colors-button-plain-neutral-disabled-text)"
  },
  "colors.button.plain.neutral.disabled.border": {
    "value": "var(--colors-button-hig-plain-neutral-disabled-border)",
    "variable": "var(--colors-button-plain-neutral-disabled-border)"
  },
  "colors.button.plain.neutral.focus.bg": {
    "value": "var(--colors-button-hig-plain-neutral-focus-bg)",
    "variable": "var(--colors-button-plain-neutral-focus-bg)"
  },
  "colors.button.plain.neutral.focus.text": {
    "value": "var(--colors-button-hig-plain-neutral-focus-text)",
    "variable": "var(--colors-button-plain-neutral-focus-text)"
  },
  "colors.button.plain.neutral.focus.border": {
    "value": "var(--colors-button-hig-plain-neutral-focus-border)",
    "variable": "var(--colors-button-plain-neutral-focus-border)"
  },
  "colors.button.plain.neutral.loading.bg": {
    "value": "var(--colors-button-hig-plain-neutral-loading-bg)",
    "variable": "var(--colors-button-plain-neutral-loading-bg)"
  },
  "colors.button.plain.neutral.loading.text": {
    "value": "var(--colors-button-hig-plain-neutral-loading-text)",
    "variable": "var(--colors-button-plain-neutral-loading-text)"
  },
  "colors.button.plain.neutral.loading.border": {
    "value": "var(--colors-button-hig-plain-neutral-loading-border)",
    "variable": "var(--colors-button-plain-neutral-loading-border)"
  },
  "colors.button.plain.destructive.default.bg": {
    "value": "var(--colors-button-hig-plain-destructive-default-bg)",
    "variable": "var(--colors-button-plain-destructive-default-bg)"
  },
  "colors.button.plain.destructive.default.text": {
    "value": "var(--colors-button-hig-plain-destructive-default-text)",
    "variable": "var(--colors-button-plain-destructive-default-text)"
  },
  "colors.button.plain.destructive.default.border": {
    "value": "var(--colors-button-hig-plain-destructive-default-border)",
    "variable": "var(--colors-button-plain-destructive-default-border)"
  },
  "colors.button.plain.destructive.hover.bg": {
    "value": "var(--colors-button-hig-plain-destructive-hover-bg)",
    "variable": "var(--colors-button-plain-destructive-hover-bg)"
  },
  "colors.button.plain.destructive.hover.text": {
    "value": "var(--colors-button-hig-plain-destructive-hover-text)",
    "variable": "var(--colors-button-plain-destructive-hover-text)"
  },
  "colors.button.plain.destructive.hover.border": {
    "value": "var(--colors-button-hig-plain-destructive-hover-border)",
    "variable": "var(--colors-button-plain-destructive-hover-border)"
  },
  "colors.button.plain.destructive.active.bg": {
    "value": "var(--colors-button-hig-plain-destructive-active-bg)",
    "variable": "var(--colors-button-plain-destructive-active-bg)"
  },
  "colors.button.plain.destructive.active.text": {
    "value": "var(--colors-button-hig-plain-destructive-active-text)",
    "variable": "var(--colors-button-plain-destructive-active-text)"
  },
  "colors.button.plain.destructive.active.border": {
    "value": "var(--colors-button-hig-plain-destructive-active-border)",
    "variable": "var(--colors-button-plain-destructive-active-border)"
  },
  "colors.button.plain.destructive.disabled.bg": {
    "value": "var(--colors-button-hig-plain-destructive-disabled-bg)",
    "variable": "var(--colors-button-plain-destructive-disabled-bg)"
  },
  "colors.button.plain.destructive.disabled.text": {
    "value": "var(--colors-button-hig-plain-destructive-disabled-text)",
    "variable": "var(--colors-button-plain-destructive-disabled-text)"
  },
  "colors.button.plain.destructive.disabled.border": {
    "value": "var(--colors-button-hig-plain-destructive-disabled-border)",
    "variable": "var(--colors-button-plain-destructive-disabled-border)"
  },
  "colors.button.plain.destructive.focus.bg": {
    "value": "var(--colors-button-hig-plain-destructive-focus-bg)",
    "variable": "var(--colors-button-plain-destructive-focus-bg)"
  },
  "colors.button.plain.destructive.focus.text": {
    "value": "var(--colors-button-hig-plain-destructive-focus-text)",
    "variable": "var(--colors-button-plain-destructive-focus-text)"
  },
  "colors.button.plain.destructive.focus.border": {
    "value": "var(--colors-button-hig-plain-destructive-focus-border)",
    "variable": "var(--colors-button-plain-destructive-focus-border)"
  },
  "colors.button.plain.destructive.loading.bg": {
    "value": "var(--colors-button-hig-plain-destructive-loading-bg)",
    "variable": "var(--colors-button-plain-destructive-loading-bg)"
  },
  "colors.button.plain.destructive.loading.text": {
    "value": "var(--colors-button-hig-plain-destructive-loading-text)",
    "variable": "var(--colors-button-plain-destructive-loading-text)"
  },
  "colors.button.plain.destructive.loading.border": {
    "value": "var(--colors-button-hig-plain-destructive-loading-border)",
    "variable": "var(--colors-button-plain-destructive-loading-border)"
  },
  "colors.accent.dynamic": {
    "value": "var(--ui-accent, color(display-p3 0.0 0.478 1.0))",
    "variable": "var(--colors-accent-dynamic)"
  },
  "colors.accent.primary._p3": {
    "value": "color(display-p3 0.0 0.478 1.0)",
    "variable": "var(--colors-accent-primary-_p3)"
  },
  "colors.accent.primary": {
    "value": "#007AFF",
    "variable": "var(--colors-accent-primary)"
  },
  "colors.accent.secondary._p3": {
    "value": "color(display-p3 0.345 0.337 0.839)",
    "variable": "var(--colors-accent-secondary-_p3)"
  },
  "colors.accent.secondary": {
    "value": "#5856D6",
    "variable": "var(--colors-accent-secondary)"
  },
  "colors.accent.success._p3": {
    "value": "color(display-p3 0.204 0.78 0.349)",
    "variable": "var(--colors-accent-success-_p3)"
  },
  "colors.accent.success": {
    "value": "#34C759",
    "variable": "var(--colors-accent-success)"
  },
  "colors.accent.warning._p3": {
    "value": "color(display-p3 1.0 0.584 0.0)",
    "variable": "var(--colors-accent-warning-_p3)"
  },
  "colors.accent.warning": {
    "value": "#FF9500",
    "variable": "var(--colors-accent-warning)"
  },
  "colors.accent.danger._p3": {
    "value": "color(display-p3 1.0 0.231 0.188)",
    "variable": "var(--colors-accent-danger-_p3)"
  },
  "colors.accent.danger": {
    "value": "#FF3B30",
    "variable": "var(--colors-accent-danger)"
  },
  "colors.accent.indigo._p3": {
    "value": "color(display-p3 0.345 0.337 0.839)",
    "variable": "var(--colors-accent-indigo-_p3)"
  },
  "colors.accent.indigo": {
    "value": "#5856D6",
    "variable": "var(--colors-accent-indigo)"
  },
  "colors.accent.teal._p3": {
    "value": "color(display-p3 0.353 0.784 0.98)",
    "variable": "var(--colors-accent-teal-_p3)"
  },
  "colors.accent.teal": {
    "value": "#5AC8FA",
    "variable": "var(--colors-accent-teal)"
  },
  "colors.accent.cyan._p3": {
    "value": "color(display-p3 0.196 0.843 0.294)",
    "variable": "var(--colors-accent-cyan-_p3)"
  },
  "colors.accent.cyan": {
    "value": "#32D74B",
    "variable": "var(--colors-accent-cyan)"
  },
  "colors.accent.mint._p3": {
    "value": "color(display-p3 0.0 0.78 0.745)",
    "variable": "var(--colors-accent-mint-_p3)"
  },
  "colors.accent.mint": {
    "value": "#00C7BE",
    "variable": "var(--colors-accent-mint)"
  },
  "colors.accent.pink._p3": {
    "value": "color(display-p3 1.0 0.176 0.573)",
    "variable": "var(--colors-accent-pink-_p3)"
  },
  "colors.accent.pink": {
    "value": "#FF2D92",
    "variable": "var(--colors-accent-pink)"
  },
  "colors.accent.yellow._p3": {
    "value": "color(display-p3 1.0 0.8 0.0)",
    "variable": "var(--colors-accent-yellow-_p3)"
  },
  "colors.accent.yellow": {
    "value": "#FFCC00",
    "variable": "var(--colors-accent-yellow)"
  },
  "colors.accent.neonBlue._p3": {
    "value": "color(display-p3 0.0 0.6 1.0)",
    "variable": "var(--colors-accent-neon-blue-_p3)"
  },
  "colors.accent.neonBlue": {
    "value": "#007AFF",
    "variable": "var(--colors-accent-neon-blue)"
  },
  "colors.accent.vibrantPurple._p3": {
    "value": "color(display-p3 0.4 0.3 0.9)",
    "variable": "var(--colors-accent-vibrant-purple-_p3)"
  },
  "colors.accent.vibrantPurple": {
    "value": "#5856D6",
    "variable": "var(--colors-accent-vibrant-purple)"
  },
  "colors.accent.liquidTeal._p3": {
    "value": "color(display-p3 0.3 0.85 1.0)",
    "variable": "var(--colors-accent-liquid-teal-_p3)"
  },
  "colors.accent.liquidTeal": {
    "value": "#5AC8FA",
    "variable": "var(--colors-accent-liquid-teal)"
  },
  "colors.text.glass.primary": {
    "value": "rgba(255, 255, 255, 1)",
    "variable": "var(--colors-text-glass-primary)"
  },
  "colors.text.glass.secondary": {
    "value": "rgba(255, 255, 255, 0.9)",
    "variable": "var(--colors-text-glass-secondary)"
  },
  "colors.text.glass.muted": {
    "value": "rgba(255, 255, 255, 0.7)",
    "variable": "var(--colors-text-glass-muted)"
  },
  "colors.text.glass.disabled": {
    "value": "rgba(255, 255, 255, 0.5)",
    "variable": "var(--colors-text-glass-disabled)"
  },
  "colors.gray.50": {
    "value": "#FAFAFA",
    "variable": "var(--colors-gray-50)"
  },
  "colors.gray.100": {
    "value": "#F5F5F7",
    "variable": "var(--colors-gray-100)"
  },
  "colors.gray.200": {
    "value": "#E5E5EA",
    "variable": "var(--colors-gray-200)"
  },
  "colors.gray.300": {
    "value": "#D1D1D6",
    "variable": "var(--colors-gray-300)"
  },
  "colors.gray.400": {
    "value": "#C7C7CC",
    "variable": "var(--colors-gray-400)"
  },
  "colors.gray.500": {
    "value": "#AEAEB2",
    "variable": "var(--colors-gray-500)"
  },
  "colors.gray.600": {
    "value": "#8E8E93",
    "variable": "var(--colors-gray-600)"
  },
  "colors.gray.700": {
    "value": "#636366",
    "variable": "var(--colors-gray-700)"
  },
  "colors.gray.800": {
    "value": "#48484A",
    "variable": "var(--colors-gray-800)"
  },
  "colors.gray.900": {
    "value": "#1C1C1E",
    "variable": "var(--colors-gray-900)"
  },
  "colors.blue.100": {
    "value": "#D1E9FF",
    "variable": "var(--colors-blue-100)"
  },
  "colors.blue.500": {
    "value": "#007AFF",
    "variable": "var(--colors-blue-500)"
  },
  "colors.blue.600": {
    "value": "#0056CC",
    "variable": "var(--colors-blue-600)"
  },
  "colors.indigo.100": {
    "value": "#D1D1FF",
    "variable": "var(--colors-indigo-100)"
  },
  "colors.indigo.500": {
    "value": "#5856D6",
    "variable": "var(--colors-indigo-500)"
  },
  "colors.indigo.600": {
    "value": "#3634A3",
    "variable": "var(--colors-indigo-600)"
  },
  "colors.teal.100": {
    "value": "#B8F2FF",
    "variable": "var(--colors-teal-100)"
  },
  "colors.teal.500": {
    "value": "#5AC8FA",
    "variable": "var(--colors-teal-500)"
  },
  "colors.teal.600": {
    "value": "#0A84FF",
    "variable": "var(--colors-teal-600)"
  },
  "colors.green.100": {
    "value": "#D8F5A2",
    "variable": "var(--colors-green-100)"
  },
  "colors.green.500": {
    "value": "#34C759",
    "variable": "var(--colors-green-500)"
  },
  "colors.green.600": {
    "value": "#248A3D",
    "variable": "var(--colors-green-600)"
  },
  "colors.orange.100": {
    "value": "#FFE5B4",
    "variable": "var(--colors-orange-100)"
  },
  "colors.orange.500": {
    "value": "#FF9500",
    "variable": "var(--colors-orange-500)"
  },
  "colors.orange.600": {
    "value": "#C93400",
    "variable": "var(--colors-orange-600)"
  },
  "colors.pink.100": {
    "value": "#FFD1DC",
    "variable": "var(--colors-pink-100)"
  },
  "colors.pink.500": {
    "value": "#FF2D92",
    "variable": "var(--colors-pink-500)"
  },
  "colors.pink.600": {
    "value": "#D70015",
    "variable": "var(--colors-pink-600)"
  },
  "colors.bg.canvas": {
    "value": "var(--colors-gray-50)",
    "variable": "var(--colors-bg-canvas)"
  },
  "colors.bg.surface": {
    "value": "var(--colors-gray-100)",
    "variable": "var(--colors-bg-surface)"
  },
  "colors.bg.subtle": {
    "value": "#F2F3F5",
    "variable": "var(--colors-bg-subtle)"
  },
  "colors.border.default": {
    "value": "var(--colors-gray-200)",
    "variable": "var(--colors-border-default)"
  },
  "colors.border.hairline": {
    "value": "color-mix(in oklch, #000 10%, transparent)",
    "variable": "var(--colors-border-hairline)"
  },
  "colors.semantic.label": {
    "value": "rgba(0, 0, 0, 0.92)",
    "variable": "var(--colors-semantic-label)"
  },
  "colors.semantic.secondaryLabel": {
    "value": "rgba(0, 0, 0, 0.6)",
    "variable": "var(--colors-semantic-secondary-label)"
  },
  "colors.semantic.tertiaryLabel": {
    "value": "rgba(0, 0, 0, 0.3)",
    "variable": "var(--colors-semantic-tertiary-label)"
  },
  "colors.semantic.quaternaryLabel": {
    "value": "rgba(0, 0, 0, 0.18)",
    "variable": "var(--colors-semantic-quaternary-label)"
  },
  "colors.semantic.systemBackground": {
    "value": "var(--colors-bg-canvas)",
    "variable": "var(--colors-semantic-system-background)"
  },
  "colors.semantic.secondarySystemBackground": {
    "value": "var(--colors-bg-surface)",
    "variable": "var(--colors-semantic-secondary-system-background)"
  },
  "colors.semantic.tertiarySystemBackground": {
    "value": "var(--colors-bg-subtle)",
    "variable": "var(--colors-semantic-tertiary-system-background)"
  },
  "colors.semantic.separator": {
    "value": "color-mix(in oklch, #000 10%, transparent)",
    "variable": "var(--colors-semantic-separator)"
  },
  "colors.semantic.fill": {
    "value": "color-mix(in oklch, #000 5%, transparent)",
    "variable": "var(--colors-semantic-fill)"
  },
  "colors.semantic.fillSecondary": {
    "value": "color-mix(in oklch, #000 10%, transparent)",
    "variable": "var(--colors-semantic-fill-secondary)"
  },
  "colors.materials.ultraThin._p3": {
    "value": "color(display-p3 1 1 1 / 0.08)",
    "variable": "var(--colors-materials-ultra-thin-_p3)"
  },
  "colors.materials.ultraThin": {
    "value": "rgba(255, 255, 255, 0.06)",
    "variable": "var(--colors-materials-ultra-thin)"
  },
  "colors.materials.thin._p3": {
    "value": "color(display-p3 1 1 1 / 0.15)",
    "variable": "var(--colors-materials-thin-_p3)"
  },
  "colors.materials.thin": {
    "value": "rgba(255, 255, 255, 0.12)",
    "variable": "var(--colors-materials-thin)"
  },
  "colors.materials.regular._p3": {
    "value": "color(display-p3 1 1 1 / 0.25)",
    "variable": "var(--colors-materials-regular-_p3)"
  },
  "colors.materials.regular": {
    "value": "rgba(255, 255, 255, 0.2)",
    "variable": "var(--colors-materials-regular)"
  },
  "colors.materials.thick._p3": {
    "value": "color(display-p3 1 1 1 / 0.35)",
    "variable": "var(--colors-materials-thick-_p3)"
  },
  "colors.materials.thick": {
    "value": "rgba(255, 255, 255, 0.28)",
    "variable": "var(--colors-materials-thick)"
  },
  "colors.materials.overlayLight._p3": {
    "value": "linear-gradient(145deg, color(display-p3 1 1 1 / 0.22) 0%, color(display-p3 1 1 1 / 0.06) 50%, transparent 100%)",
    "variable": "var(--colors-materials-overlay-light-_p3)"
  },
  "colors.materials.overlayLight": {
    "value": "linear-gradient(145deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 50%, transparent 100%)",
    "variable": "var(--colors-materials-overlay-light)"
  },
  "colors.materials.overlayDark._p3": {
    "value": "linear-gradient(145deg, color(display-p3 0 0 0 / 0.25) 0%, color(display-p3 0 0 0 / 0.08) 50%, transparent 100%)",
    "variable": "var(--colors-materials-overlay-dark-_p3)"
  },
  "colors.materials.overlayDark": {
    "value": "linear-gradient(145deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.06) 50%, transparent 100%)",
    "variable": "var(--colors-materials-overlay-dark)"
  },
  "colors.materials.vibrancyUltraLight._p3": {
    "value": "color(display-p3 1 1 1 / 0.05)",
    "variable": "var(--colors-materials-vibrancy-ultra-light-_p3)"
  },
  "colors.materials.vibrancyUltraLight": {
    "value": "rgba(255, 255, 255, 0.03)",
    "variable": "var(--colors-materials-vibrancy-ultra-light)"
  },
  "colors.materials.vibrancyLight._p3": {
    "value": "color(display-p3 1 1 1 / 0.12)",
    "variable": "var(--colors-materials-vibrancy-light-_p3)"
  },
  "colors.materials.vibrancyLight": {
    "value": "rgba(255, 255, 255, 0.08)",
    "variable": "var(--colors-materials-vibrancy-light)"
  },
  "colors.materials.vibrancyMedium._p3": {
    "value": "color(display-p3 1 1 1 / 0.2)",
    "variable": "var(--colors-materials-vibrancy-medium-_p3)"
  },
  "colors.materials.vibrancyMedium": {
    "value": "rgba(255, 255, 255, 0.15)",
    "variable": "var(--colors-materials-vibrancy-medium)"
  },
  "colors.materials.vibrancyStrong._p3": {
    "value": "color(display-p3 1 1 1 / 0.32)",
    "variable": "var(--colors-materials-vibrancy-strong-_p3)"
  },
  "colors.materials.vibrancyStrong": {
    "value": "rgba(255, 255, 255, 0.25)",
    "variable": "var(--colors-materials-vibrancy-strong)"
  },
  "colors.materials.depthGradient._p3": {
    "value": "linear-gradient(135deg, color(display-p3 1 1 1 / 0.2) 0%, color(display-p3 1 1 1 / 0.12) 30%, color(display-p3 1 1 1 / 0.05) 60%, color(display-p3 0 0 0 / 0.04) 80%, color(display-p3 0 0 0 / 0.08) 100%)",
    "variable": "var(--colors-materials-depth-gradient-_p3)"
  },
  "colors.materials.depthGradient": {
    "value": "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 30%, rgba(255,255,255,0.03) 60%, rgba(0,0,0,0.02) 80%, rgba(0,0,0,0.06) 100%)",
    "variable": "var(--colors-materials-depth-gradient)"
  },
  "colors.materials.shimmerOverlay._p3": {
    "value": "radial-gradient(circle at 30% 30%, color(display-p3 1 1 1 / 0.18) 0%, color(display-p3 1 1 1 / 0.09) 40%, transparent 70%)",
    "variable": "var(--colors-materials-shimmer-overlay-_p3)"
  },
  "colors.materials.shimmerOverlay": {
    "value": "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 40%, transparent 70%)",
    "variable": "var(--colors-materials-shimmer-overlay)"
  },
  "colors.selection.bg": {
    "value": "color-mix(in oklch, var(--colors-accent-dynamic) 40%, transparent)",
    "variable": "var(--colors-selection-bg)"
  },
  "colors.selection.fg": {
    "value": "var(--colors-text-glass-primary)",
    "variable": "var(--colors-selection-fg)"
  },
  "radii.none": {
    "value": "0px",
    "variable": "var(--radii-none)"
  },
  "radii.xs": {
    "value": "4px",
    "variable": "var(--radii-xs)"
  },
  "radii.sm": {
    "value": "6px",
    "variable": "var(--radii-sm)"
  },
  "radii.md": {
    "value": "8px",
    "variable": "var(--radii-md)"
  },
  "radii.lg": {
    "value": "12px",
    "variable": "var(--radii-lg)"
  },
  "radii.xl": {
    "value": "16px",
    "variable": "var(--radii-xl)"
  },
  "radii.2xl": {
    "value": "20px",
    "variable": "var(--radii-2xl)"
  },
  "radii.3xl": {
    "value": "24px",
    "variable": "var(--radii-3xl)"
  },
  "radii.full": {
    "value": "9999px",
    "variable": "var(--radii-full)"
  },
  "radii.roles.button": {
    "value": "var(--radii-full)",
    "variable": "var(--radii-roles-button)"
  },
  "radii.roles.buttonCompact": {
    "value": "14px",
    "variable": "var(--radii-roles-button-compact)"
  },
  "radii.roles.buttonLarge": {
    "value": "var(--radii-full)",
    "variable": "var(--radii-roles-button-large)"
  },
  "radii.roles.control": {
    "value": "14px",
    "variable": "var(--radii-roles-control)"
  },
  "radii.roles.field": {
    "value": "14px",
    "variable": "var(--radii-roles-field)"
  },
  "radii.roles.fieldLarge": {
    "value": "16px",
    "variable": "var(--radii-roles-field-large)"
  },
  "radii.roles.card": {
    "value": "26px",
    "variable": "var(--radii-roles-card)"
  },
  "radii.roles.cardLarge": {
    "value": "26px",
    "variable": "var(--radii-roles-card-large)"
  },
  "radii.roles.sheet": {
    "value": "26px",
    "variable": "var(--radii-roles-sheet)"
  },
  "radii.roles.modal": {
    "value": "26px",
    "variable": "var(--radii-roles-modal)"
  },
  "radii.roles.pill": {
    "value": "var(--radii-full)",
    "variable": "var(--radii-roles-pill)"
  },
  "radii.roles.badge": {
    "value": "var(--radii-full)",
    "variable": "var(--radii-roles-badge)"
  },
  "radii.button.default": {
    "value": "0 6px 16px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.25)",
    "variable": "var(--radii-button-default)"
  },
  "radii.button.hover": {
    "value": "0 10px 28px rgba(0, 0, 0, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
    "variable": "var(--radii-button-hover)"
  },
  "radii.button.active": {
    "value": "0 3px 8px rgba(0, 0, 0, 0.15), inset 0 2px 4px rgba(0, 0, 0, 0.15)",
    "variable": "var(--radii-button-active)"
  },
  "radii.glass.xs": {
    "value": "var(--radii-xs)",
    "variable": "var(--radii-glass-xs)"
  },
  "radii.glass.sm": {
    "value": "var(--radii-sm)",
    "variable": "var(--radii-glass-sm)"
  },
  "radii.glass.md": {
    "value": "var(--radii-md)",
    "variable": "var(--radii-glass-md)"
  },
  "radii.glass.lg": {
    "value": "var(--radii-lg)",
    "variable": "var(--radii-glass-lg)"
  },
  "radii.glass.xl": {
    "value": "var(--radii-xl)",
    "variable": "var(--radii-glass-xl)"
  },
  "radii.glass.2xl": {
    "value": "var(--radii-2xl)",
    "variable": "var(--radii-glass-2xl)"
  },
  "radii.glass.3xl": {
    "value": "var(--radii-3xl)",
    "variable": "var(--radii-glass-3xl)"
  },
  "radii.glass.full": {
    "value": "var(--radii-full)",
    "variable": "var(--radii-glass-full)"
  },
  "blurs.glass.sm": {
    "value": "5px",
    "variable": "var(--blurs-glass-sm)"
  },
  "blurs.glass.md": {
    "value": "10px",
    "variable": "var(--blurs-glass-md)"
  },
  "blurs.glass.lg": {
    "value": "20px",
    "variable": "var(--blurs-glass-lg)"
  },
  "blurs.glass.xl": {
    "value": "30px",
    "variable": "var(--blurs-glass-xl)"
  },
  "shadows.button.default": {
    "value": "var(--shadows-glass-base)",
    "variable": "var(--shadows-button-default)"
  },
  "shadows.button.hover": {
    "value": "var(--shadows-glass-hover)",
    "variable": "var(--shadows-button-hover)"
  },
  "shadows.button.active": {
    "value": "var(--shadows-glass-sm)",
    "variable": "var(--shadows-button-active)"
  },
  "shadows.button.focus": {
    "value": "var(--shadows-glass-md)",
    "variable": "var(--shadows-button-focus)"
  },
  "shadows.glass.base": {
    "value": "0 12px 40px rgba(0, 0, 0, 0.15), inset 0 2px 4px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.4), inset 0 -1px 0 rgba(0, 0, 0, 0.15), 0 0 20px rgba(255, 255, 255, 0.1)",
    "variable": "var(--shadows-glass-base)"
  },
  "shadows.glass.sm": {
    "value": "0 4px 6px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
    "variable": "var(--shadows-glass-sm)"
  },
  "shadows.glass.md": {
    "value": "0 12px 40px rgba(0, 0, 0, 0.15), inset 0 2px 4px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.4), inset 0 -1px 0 rgba(0, 0, 0, 0.15), 0 0 20px rgba(255, 255, 255, 0.1)",
    "variable": "var(--shadows-glass-md)"
  },
  "shadows.glass.lg": {
    "value": "0 16px 50px rgba(0, 0, 0, 0.2), inset 0 2px 4px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.5), inset 0 -1px 0 rgba(0, 0, 0, 0.15), 0 0 30px rgba(255, 255, 255, 0.15)",
    "variable": "var(--shadows-glass-lg)"
  },
  "shadows.glass.hover": {
    "value": "0 16px 50px rgba(0, 0, 0, 0.2), inset 0 2px 4px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.5), inset 0 -1px 0 rgba(0, 0, 0, 0.15), 0 0 30px rgba(255, 255, 255, 0.15)",
    "variable": "var(--shadows-glass-hover)"
  },
  "durations.button.hover": {
    "value": "var(--durations-glass-flow)",
    "variable": "var(--durations-button-hover)"
  },
  "durations.button.press": {
    "value": "var(--durations-glass-instant)",
    "variable": "var(--durations-button-press)"
  },
  "durations.button.focus": {
    "value": "var(--durations-glass-flow)",
    "variable": "var(--durations-button-focus)"
  },
  "durations.glass.flow": {
    "value": "0.8s",
    "variable": "var(--durations-glass-flow)"
  },
  "durations.glass.bounce": {
    "value": "0.6s",
    "variable": "var(--durations-glass-bounce)"
  },
  "durations.glass.quick": {
    "value": "0.2s",
    "variable": "var(--durations-glass-quick)"
  },
  "durations.glass.instant": {
    "value": "0.1s",
    "variable": "var(--durations-glass-instant)"
  },
  "easings.glass.flow": {
    "value": "cubic-bezier(0.23, 1, 0.32, 1)",
    "variable": "var(--easings-glass-flow)"
  },
  "easings.glass.bounce": {
    "value": "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
    "variable": "var(--easings-glass-bounce)"
  },
  "easings.glass.spring": {
    "value": "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    "variable": "var(--easings-glass-spring)"
  },
  "sizes.glass.xs": {
    "value": "8px",
    "variable": "var(--sizes-glass-xs)"
  },
  "sizes.glass.sm": {
    "value": "12px",
    "variable": "var(--sizes-glass-sm)"
  },
  "sizes.glass.md": {
    "value": "16px",
    "variable": "var(--sizes-glass-md)"
  },
  "sizes.glass.lg": {
    "value": "20px",
    "variable": "var(--sizes-glass-lg)"
  },
  "sizes.glass.xl": {
    "value": "24px",
    "variable": "var(--sizes-glass-xl)"
  },
  "spacing.glass.xs": {
    "value": "4px",
    "variable": "var(--spacing-glass-xs)"
  },
  "spacing.glass.sm": {
    "value": "8px",
    "variable": "var(--spacing-glass-sm)"
  },
  "spacing.glass.md": {
    "value": "12px",
    "variable": "var(--spacing-glass-md)"
  },
  "spacing.glass.lg": {
    "value": "16px",
    "variable": "var(--spacing-glass-lg)"
  },
  "spacing.glass.xl": {
    "value": "20px",
    "variable": "var(--spacing-glass-xl)"
  },
  "spacing.glass.2xl": {
    "value": "24px",
    "variable": "var(--spacing-glass-2xl)"
  },
  "spacing.glass.3xl": {
    "value": "32px",
    "variable": "var(--spacing-glass-3xl)"
  },
  "spacing.button.pad.compact": {
    "value": "8px 12px",
    "variable": "var(--spacing-button-pad-compact)"
  },
  "spacing.button.pad.regular": {
    "value": "10px 16px",
    "variable": "var(--spacing-button-pad-regular)"
  },
  "spacing.button.pad.large": {
    "value": "12px 20px",
    "variable": "var(--spacing-button-pad-large)"
  },
  "spacing.button.gap.icon.compact": {
    "value": "var(--spacing-glass-xs)",
    "variable": "var(--spacing-button-gap-icon-compact)"
  },
  "spacing.button.gap.icon.regular": {
    "value": "var(--spacing-glass-xs)",
    "variable": "var(--spacing-button-gap-icon-regular)"
  },
  "spacing.button.gap.icon.large": {
    "value": "var(--spacing-glass-sm)",
    "variable": "var(--spacing-button-gap-icon-large)"
  },
  "spacing.button.hit.min": {
    "value": "44px",
    "variable": "var(--spacing-button-hit-min)"
  },
  "fonts.sans": {
    "value": "\"SF Pro Display\", sans-serif",
    "variable": "var(--fonts-sans)"
  },
  "fonts.display": {
    "value": "\"SF Pro Display\", sans-serif",
    "variable": "var(--fonts-display)"
  },
  "fonts.mono": {
    "value": "\"SF Mono\", monospace",
    "variable": "var(--fonts-mono)"
  },
  "fontSizes.caption2": {
    "value": "11px",
    "variable": "var(--font-sizes-caption2)"
  },
  "fontSizes.caption1": {
    "value": "12px",
    "variable": "var(--font-sizes-caption1)"
  },
  "fontSizes.footnote": {
    "value": "13px",
    "variable": "var(--font-sizes-footnote)"
  },
  "fontSizes.subheadline": {
    "value": "15px",
    "variable": "var(--font-sizes-subheadline)"
  },
  "fontSizes.callout": {
    "value": "16px",
    "variable": "var(--font-sizes-callout)"
  },
  "fontSizes.body": {
    "value": "17px",
    "variable": "var(--font-sizes-body)"
  },
  "fontSizes.headline": {
    "value": "17px",
    "variable": "var(--font-sizes-headline)"
  },
  "fontSizes.title3": {
    "value": "20px",
    "variable": "var(--font-sizes-title3)"
  },
  "fontSizes.title2": {
    "value": "22px",
    "variable": "var(--font-sizes-title2)"
  },
  "fontSizes.title1": {
    "value": "28px",
    "variable": "var(--font-sizes-title1)"
  },
  "fontSizes.largeTitle": {
    "value": "34px",
    "variable": "var(--font-sizes-large-title)"
  },
  "fontSizes.xs": {
    "value": "11px",
    "variable": "var(--font-sizes-xs)"
  },
  "fontSizes.sm": {
    "value": "13px",
    "variable": "var(--font-sizes-sm)"
  },
  "fontSizes.md": {
    "value": "17px",
    "variable": "var(--font-sizes-md)"
  },
  "fontSizes.lg": {
    "value": "20px",
    "variable": "var(--font-sizes-lg)"
  },
  "fontSizes.xl": {
    "value": "22px",
    "variable": "var(--font-sizes-xl)"
  },
  "fontSizes.2xl": {
    "value": "28px",
    "variable": "var(--font-sizes-2xl)"
  },
  "fontSizes.3xl": {
    "value": "34px",
    "variable": "var(--font-sizes-3xl)"
  },
  "lineHeights.tight": {
    "value": "1.1",
    "variable": "var(--line-heights-tight)"
  },
  "lineHeights.snug": {
    "value": "1.2",
    "variable": "var(--line-heights-snug)"
  },
  "lineHeights.normal": {
    "value": "1.25",
    "variable": "var(--line-heights-normal)"
  },
  "lineHeights.relaxed": {
    "value": "1.4",
    "variable": "var(--line-heights-relaxed)"
  },
  "lineHeights.loose": {
    "value": "1.6",
    "variable": "var(--line-heights-loose)"
  },
  "lineHeights.none": {
    "value": "1",
    "variable": "var(--line-heights-none)"
  },
  "fontWeights.thin": {
    "value": "100",
    "variable": "var(--font-weights-thin)"
  },
  "fontWeights.extralight": {
    "value": "200",
    "variable": "var(--font-weights-extralight)"
  },
  "fontWeights.light": {
    "value": "300",
    "variable": "var(--font-weights-light)"
  },
  "fontWeights.normal": {
    "value": "400",
    "variable": "var(--font-weights-normal)"
  },
  "fontWeights.medium": {
    "value": "500",
    "variable": "var(--font-weights-medium)"
  },
  "fontWeights.semibold": {
    "value": "600",
    "variable": "var(--font-weights-semibold)"
  },
  "fontWeights.bold": {
    "value": "700",
    "variable": "var(--font-weights-bold)"
  },
  "fontWeights.extrabold": {
    "value": "800",
    "variable": "var(--font-weights-extrabold)"
  },
  "fontWeights.black": {
    "value": "900",
    "variable": "var(--font-weights-black)"
  },
  "letterSpacings.largeTitle": {
    "value": "-0.026em",
    "variable": "var(--letter-spacings-large-title)"
  },
  "letterSpacings.title": {
    "value": "-0.022em",
    "variable": "var(--letter-spacings-title)"
  },
  "letterSpacings.headline": {
    "value": "-0.019em",
    "variable": "var(--letter-spacings-headline)"
  },
  "letterSpacings.body": {
    "value": "-0.016em",
    "variable": "var(--letter-spacings-body)"
  },
  "letterSpacings.callout": {
    "value": "-0.012em",
    "variable": "var(--letter-spacings-callout)"
  },
  "letterSpacings.subheadline": {
    "value": "-0.006em",
    "variable": "var(--letter-spacings-subheadline)"
  },
  "letterSpacings.footnote": {
    "value": "-0.003em",
    "variable": "var(--letter-spacings-footnote)"
  },
  "letterSpacings.caption": {
    "value": "0em",
    "variable": "var(--letter-spacings-caption)"
  },
  "letterSpacings.tighter": {
    "value": "-0.02em",
    "variable": "var(--letter-spacings-tighter)"
  },
  "letterSpacings.tight": {
    "value": "-0.01em",
    "variable": "var(--letter-spacings-tight)"
  },
  "letterSpacings.normal": {
    "value": "0",
    "variable": "var(--letter-spacings-normal)"
  },
  "letterSpacings.wide": {
    "value": "0.01em",
    "variable": "var(--letter-spacings-wide)"
  },
  "letterSpacings.wider": {
    "value": "0.02em",
    "variable": "var(--letter-spacings-wider)"
  },
  "letterSpacings.widest": {
    "value": "0.04em",
    "variable": "var(--letter-spacings-widest)"
  },
  "spacing.glass.-xs": {
    "value": "calc(var(--spacing-glass-xs) * -1)",
    "variable": "var(--spacing-glass-xs)"
  },
  "spacing.glass.-sm": {
    "value": "calc(var(--spacing-glass-sm) * -1)",
    "variable": "var(--spacing-glass-sm)"
  },
  "spacing.glass.-md": {
    "value": "calc(var(--spacing-glass-md) * -1)",
    "variable": "var(--spacing-glass-md)"
  },
  "spacing.glass.-lg": {
    "value": "calc(var(--spacing-glass-lg) * -1)",
    "variable": "var(--spacing-glass-lg)"
  },
  "spacing.glass.-xl": {
    "value": "calc(var(--spacing-glass-xl) * -1)",
    "variable": "var(--spacing-glass-xl)"
  },
  "spacing.glass.-2xl": {
    "value": "calc(var(--spacing-glass-2xl) * -1)",
    "variable": "var(--spacing-glass-2xl)"
  },
  "spacing.glass.-3xl": {
    "value": "calc(var(--spacing-glass-3xl) * -1)",
    "variable": "var(--spacing-glass-3xl)"
  },
  "spacing.button.pad.-compact": {
    "value": "calc(var(--spacing-button-pad-compact) * -1)",
    "variable": "var(--spacing-button-pad-compact)"
  },
  "spacing.button.pad.-regular": {
    "value": "calc(var(--spacing-button-pad-regular) * -1)",
    "variable": "var(--spacing-button-pad-regular)"
  },
  "spacing.button.pad.-large": {
    "value": "calc(var(--spacing-button-pad-large) * -1)",
    "variable": "var(--spacing-button-pad-large)"
  },
  "spacing.button.gap.icon.-compact": {
    "value": "calc(var(--spacing-button-gap-icon-compact) * -1)",
    "variable": "var(--spacing-button-gap-icon-compact)"
  },
  "spacing.button.gap.icon.-regular": {
    "value": "calc(var(--spacing-button-gap-icon-regular) * -1)",
    "variable": "var(--spacing-button-gap-icon-regular)"
  },
  "spacing.button.gap.icon.-large": {
    "value": "calc(var(--spacing-button-gap-icon-large) * -1)",
    "variable": "var(--spacing-button-gap-icon-large)"
  },
  "spacing.button.hit.-min": {
    "value": "calc(var(--spacing-button-hit-min) * -1)",
    "variable": "var(--spacing-button-hit-min)"
  },
  "colors.colorPalette.bg": {
    "value": "var(--colors-color-palette-bg)",
    "variable": "var(--colors-color-palette-bg)"
  },
  "colors.colorPalette.border": {
    "value": "var(--colors-color-palette-border)",
    "variable": "var(--colors-color-palette-border)"
  },
  "colors.colorPalette.ripple": {
    "value": "var(--colors-color-palette-ripple)",
    "variable": "var(--colors-color-palette-ripple)"
  },
  "colors.colorPalette.subtle.bg": {
    "value": "var(--colors-color-palette-subtle-bg)",
    "variable": "var(--colors-color-palette-subtle-bg)"
  },
  "colors.colorPalette.subtle.border": {
    "value": "var(--colors-color-palette-subtle-border)",
    "variable": "var(--colors-color-palette-subtle-border)"
  },
  "colors.colorPalette.medium.bg": {
    "value": "var(--colors-color-palette-medium-bg)",
    "variable": "var(--colors-color-palette-medium-bg)"
  },
  "colors.colorPalette.medium.border": {
    "value": "var(--colors-color-palette-medium-border)",
    "variable": "var(--colors-color-palette-medium-border)"
  },
  "colors.colorPalette.strong.bg": {
    "value": "var(--colors-color-palette-strong-bg)",
    "variable": "var(--colors-color-palette-strong-bg)"
  },
  "colors.colorPalette.strong.border": {
    "value": "var(--colors-color-palette-strong-border)",
    "variable": "var(--colors-color-palette-strong-border)"
  },
  "colors.colorPalette.accent.bg": {
    "value": "var(--colors-color-palette-accent-bg)",
    "variable": "var(--colors-color-palette-accent-bg)"
  },
  "colors.colorPalette.accent.border": {
    "value": "var(--colors-color-palette-accent-border)",
    "variable": "var(--colors-color-palette-accent-border)"
  },
  "colors.colorPalette.gradients.before._p3": {
    "value": "var(--colors-color-palette-gradients-before-_p3)",
    "variable": "var(--colors-color-palette-gradients-before-_p3)"
  },
  "colors.colorPalette.before._p3": {
    "value": "var(--colors-color-palette-before-_p3)",
    "variable": "var(--colors-color-palette-before-_p3)"
  },
  "colors.colorPalette._p3": {
    "value": "var(--colors-color-palette-_p3)",
    "variable": "var(--colors-color-palette-_p3)"
  },
  "colors.colorPalette.gradients.before": {
    "value": "var(--colors-color-palette-gradients-before)",
    "variable": "var(--colors-color-palette-gradients-before)"
  },
  "colors.colorPalette.before": {
    "value": "var(--colors-color-palette-before)",
    "variable": "var(--colors-color-palette-before)"
  },
  "colors.colorPalette": {
    "value": "var(--colors-color-palette)",
    "variable": "var(--colors-color-palette)"
  },
  "colors.colorPalette.gradients.after._p3": {
    "value": "var(--colors-color-palette-gradients-after-_p3)",
    "variable": "var(--colors-color-palette-gradients-after-_p3)"
  },
  "colors.colorPalette.after._p3": {
    "value": "var(--colors-color-palette-after-_p3)",
    "variable": "var(--colors-color-palette-after-_p3)"
  },
  "colors.colorPalette.gradients.after": {
    "value": "var(--colors-color-palette-gradients-after)",
    "variable": "var(--colors-color-palette-gradients-after)"
  },
  "colors.colorPalette.after": {
    "value": "var(--colors-color-palette-after)",
    "variable": "var(--colors-color-palette-after)"
  },
  "colors.colorPalette.gradients.depth._p3": {
    "value": "var(--colors-color-palette-gradients-depth-_p3)",
    "variable": "var(--colors-color-palette-gradients-depth-_p3)"
  },
  "colors.colorPalette.depth._p3": {
    "value": "var(--colors-color-palette-depth-_p3)",
    "variable": "var(--colors-color-palette-depth-_p3)"
  },
  "colors.colorPalette.gradients.depth": {
    "value": "var(--colors-color-palette-gradients-depth)",
    "variable": "var(--colors-color-palette-gradients-depth)"
  },
  "colors.colorPalette.depth": {
    "value": "var(--colors-color-palette-depth)",
    "variable": "var(--colors-color-palette-depth)"
  },
  "colors.colorPalette.gradients.vibrancy._p3": {
    "value": "var(--colors-color-palette-gradients-vibrancy-_p3)",
    "variable": "var(--colors-color-palette-gradients-vibrancy-_p3)"
  },
  "colors.colorPalette.vibrancy._p3": {
    "value": "var(--colors-color-palette-vibrancy-_p3)",
    "variable": "var(--colors-color-palette-vibrancy-_p3)"
  },
  "colors.colorPalette.gradients.vibrancy": {
    "value": "var(--colors-color-palette-gradients-vibrancy)",
    "variable": "var(--colors-color-palette-gradients-vibrancy)"
  },
  "colors.colorPalette.vibrancy": {
    "value": "var(--colors-color-palette-vibrancy)",
    "variable": "var(--colors-color-palette-vibrancy)"
  },
  "colors.colorPalette.liquid.base._p3": {
    "value": "var(--colors-color-palette-liquid-base-_p3)",
    "variable": "var(--colors-color-palette-liquid-base-_p3)"
  },
  "colors.colorPalette.base._p3": {
    "value": "var(--colors-color-palette-base-_p3)",
    "variable": "var(--colors-color-palette-base-_p3)"
  },
  "colors.colorPalette.liquid.base": {
    "value": "var(--colors-color-palette-liquid-base)",
    "variable": "var(--colors-color-palette-liquid-base)"
  },
  "colors.colorPalette.base": {
    "value": "var(--colors-color-palette-base)",
    "variable": "var(--colors-color-palette-base)"
  },
  "colors.colorPalette.liquid.opacity": {
    "value": "var(--colors-color-palette-liquid-opacity)",
    "variable": "var(--colors-color-palette-liquid-opacity)"
  },
  "colors.colorPalette.opacity": {
    "value": "var(--colors-color-palette-opacity)",
    "variable": "var(--colors-color-palette-opacity)"
  },
  "colors.colorPalette.liquid.blur": {
    "value": "var(--colors-color-palette-liquid-blur)",
    "variable": "var(--colors-color-palette-liquid-blur)"
  },
  "colors.colorPalette.blur": {
    "value": "var(--colors-color-palette-blur)",
    "variable": "var(--colors-color-palette-blur)"
  },
  "colors.colorPalette.liquid.layers.before._p3": {
    "value": "var(--colors-color-palette-liquid-layers-before-_p3)",
    "variable": "var(--colors-color-palette-liquid-layers-before-_p3)"
  },
  "colors.colorPalette.layers.before._p3": {
    "value": "var(--colors-color-palette-layers-before-_p3)",
    "variable": "var(--colors-color-palette-layers-before-_p3)"
  },
  "colors.colorPalette.liquid.layers.before": {
    "value": "var(--colors-color-palette-liquid-layers-before)",
    "variable": "var(--colors-color-palette-liquid-layers-before)"
  },
  "colors.colorPalette.layers.before": {
    "value": "var(--colors-color-palette-layers-before)",
    "variable": "var(--colors-color-palette-layers-before)"
  },
  "colors.colorPalette.liquid.layers.after._p3": {
    "value": "var(--colors-color-palette-liquid-layers-after-_p3)",
    "variable": "var(--colors-color-palette-liquid-layers-after-_p3)"
  },
  "colors.colorPalette.layers.after._p3": {
    "value": "var(--colors-color-palette-layers-after-_p3)",
    "variable": "var(--colors-color-palette-layers-after-_p3)"
  },
  "colors.colorPalette.liquid.layers.after": {
    "value": "var(--colors-color-palette-liquid-layers-after)",
    "variable": "var(--colors-color-palette-liquid-layers-after)"
  },
  "colors.colorPalette.layers.after": {
    "value": "var(--colors-color-palette-layers-after)",
    "variable": "var(--colors-color-palette-layers-after)"
  },
  "colors.colorPalette.liquid.layers.glow._p3": {
    "value": "var(--colors-color-palette-liquid-layers-glow-_p3)",
    "variable": "var(--colors-color-palette-liquid-layers-glow-_p3)"
  },
  "colors.colorPalette.layers.glow._p3": {
    "value": "var(--colors-color-palette-layers-glow-_p3)",
    "variable": "var(--colors-color-palette-layers-glow-_p3)"
  },
  "colors.colorPalette.glow._p3": {
    "value": "var(--colors-color-palette-glow-_p3)",
    "variable": "var(--colors-color-palette-glow-_p3)"
  },
  "colors.colorPalette.liquid.layers.glow": {
    "value": "var(--colors-color-palette-liquid-layers-glow)",
    "variable": "var(--colors-color-palette-liquid-layers-glow)"
  },
  "colors.colorPalette.layers.glow": {
    "value": "var(--colors-color-palette-layers-glow)",
    "variable": "var(--colors-color-palette-layers-glow)"
  },
  "colors.colorPalette.glow": {
    "value": "var(--colors-color-palette-glow)",
    "variable": "var(--colors-color-palette-glow)"
  },
  "colors.colorPalette.liquid.layers.shimmer._p3": {
    "value": "var(--colors-color-palette-liquid-layers-shimmer-_p3)",
    "variable": "var(--colors-color-palette-liquid-layers-shimmer-_p3)"
  },
  "colors.colorPalette.layers.shimmer._p3": {
    "value": "var(--colors-color-palette-layers-shimmer-_p3)",
    "variable": "var(--colors-color-palette-layers-shimmer-_p3)"
  },
  "colors.colorPalette.shimmer._p3": {
    "value": "var(--colors-color-palette-shimmer-_p3)",
    "variable": "var(--colors-color-palette-shimmer-_p3)"
  },
  "colors.colorPalette.liquid.layers.shimmer": {
    "value": "var(--colors-color-palette-liquid-layers-shimmer)",
    "variable": "var(--colors-color-palette-liquid-layers-shimmer)"
  },
  "colors.colorPalette.layers.shimmer": {
    "value": "var(--colors-color-palette-layers-shimmer)",
    "variable": "var(--colors-color-palette-layers-shimmer)"
  },
  "colors.colorPalette.shimmer": {
    "value": "var(--colors-color-palette-shimmer)",
    "variable": "var(--colors-color-palette-shimmer)"
  },
  "colors.colorPalette.liquid.layers.depth._p3": {
    "value": "var(--colors-color-palette-liquid-layers-depth-_p3)",
    "variable": "var(--colors-color-palette-liquid-layers-depth-_p3)"
  },
  "colors.colorPalette.layers.depth._p3": {
    "value": "var(--colors-color-palette-layers-depth-_p3)",
    "variable": "var(--colors-color-palette-layers-depth-_p3)"
  },
  "colors.colorPalette.liquid.layers.depth": {
    "value": "var(--colors-color-palette-liquid-layers-depth)",
    "variable": "var(--colors-color-palette-liquid-layers-depth)"
  },
  "colors.colorPalette.layers.depth": {
    "value": "var(--colors-color-palette-layers-depth)",
    "variable": "var(--colors-color-palette-layers-depth)"
  },
  "colors.colorPalette.primary.bg": {
    "value": "var(--colors-color-palette-primary-bg)",
    "variable": "var(--colors-color-palette-primary-bg)"
  },
  "colors.colorPalette.primary.border": {
    "value": "var(--colors-color-palette-primary-border)",
    "variable": "var(--colors-color-palette-primary-border)"
  },
  "colors.colorPalette.secondary.bg": {
    "value": "var(--colors-color-palette-secondary-bg)",
    "variable": "var(--colors-color-palette-secondary-bg)"
  },
  "colors.colorPalette.secondary.border": {
    "value": "var(--colors-color-palette-secondary-border)",
    "variable": "var(--colors-color-palette-secondary-border)"
  },
  "colors.colorPalette.ghost.bg": {
    "value": "var(--colors-color-palette-ghost-bg)",
    "variable": "var(--colors-color-palette-ghost-bg)"
  },
  "colors.colorPalette.ghost.border": {
    "value": "var(--colors-color-palette-ghost-border)",
    "variable": "var(--colors-color-palette-ghost-border)"
  },
  "colors.colorPalette.danger.bg": {
    "value": "var(--colors-color-palette-danger-bg)",
    "variable": "var(--colors-color-palette-danger-bg)"
  },
  "colors.colorPalette.danger.border": {
    "value": "var(--colors-color-palette-danger-border)",
    "variable": "var(--colors-color-palette-danger-border)"
  },
  "colors.colorPalette.success.bg": {
    "value": "var(--colors-color-palette-success-bg)",
    "variable": "var(--colors-color-palette-success-bg)"
  },
  "colors.colorPalette.success.border": {
    "value": "var(--colors-color-palette-success-border)",
    "variable": "var(--colors-color-palette-success-border)"
  },
  "colors.colorPalette.warning.bg": {
    "value": "var(--colors-color-palette-warning-bg)",
    "variable": "var(--colors-color-palette-warning-bg)"
  },
  "colors.colorPalette.warning.border": {
    "value": "var(--colors-color-palette-warning-border)",
    "variable": "var(--colors-color-palette-warning-border)"
  },
  "colors.colorPalette.hig.filled.accent.default.bg": {
    "value": "var(--colors-color-palette-hig-filled-accent-default-bg)",
    "variable": "var(--colors-color-palette-hig-filled-accent-default-bg)"
  },
  "colors.colorPalette.filled.accent.default.bg": {
    "value": "var(--colors-color-palette-filled-accent-default-bg)",
    "variable": "var(--colors-color-palette-filled-accent-default-bg)"
  },
  "colors.colorPalette.accent.default.bg": {
    "value": "var(--colors-color-palette-accent-default-bg)",
    "variable": "var(--colors-color-palette-accent-default-bg)"
  },
  "colors.colorPalette.default.bg": {
    "value": "var(--colors-color-palette-default-bg)",
    "variable": "var(--colors-color-palette-default-bg)"
  },
  "colors.colorPalette.hig.filled.accent.default.text": {
    "value": "var(--colors-color-palette-hig-filled-accent-default-text)",
    "variable": "var(--colors-color-palette-hig-filled-accent-default-text)"
  },
  "colors.colorPalette.filled.accent.default.text": {
    "value": "var(--colors-color-palette-filled-accent-default-text)",
    "variable": "var(--colors-color-palette-filled-accent-default-text)"
  },
  "colors.colorPalette.accent.default.text": {
    "value": "var(--colors-color-palette-accent-default-text)",
    "variable": "var(--colors-color-palette-accent-default-text)"
  },
  "colors.colorPalette.default.text": {
    "value": "var(--colors-color-palette-default-text)",
    "variable": "var(--colors-color-palette-default-text)"
  },
  "colors.colorPalette.text": {
    "value": "var(--colors-color-palette-text)",
    "variable": "var(--colors-color-palette-text)"
  },
  "colors.colorPalette.hig.filled.accent.default.border": {
    "value": "var(--colors-color-palette-hig-filled-accent-default-border)",
    "variable": "var(--colors-color-palette-hig-filled-accent-default-border)"
  },
  "colors.colorPalette.filled.accent.default.border": {
    "value": "var(--colors-color-palette-filled-accent-default-border)",
    "variable": "var(--colors-color-palette-filled-accent-default-border)"
  },
  "colors.colorPalette.accent.default.border": {
    "value": "var(--colors-color-palette-accent-default-border)",
    "variable": "var(--colors-color-palette-accent-default-border)"
  },
  "colors.colorPalette.default.border": {
    "value": "var(--colors-color-palette-default-border)",
    "variable": "var(--colors-color-palette-default-border)"
  },
  "colors.colorPalette.hig.filled.accent.hover.bg": {
    "value": "var(--colors-color-palette-hig-filled-accent-hover-bg)",
    "variable": "var(--colors-color-palette-hig-filled-accent-hover-bg)"
  },
  "colors.colorPalette.filled.accent.hover.bg": {
    "value": "var(--colors-color-palette-filled-accent-hover-bg)",
    "variable": "var(--colors-color-palette-filled-accent-hover-bg)"
  },
  "colors.colorPalette.accent.hover.bg": {
    "value": "var(--colors-color-palette-accent-hover-bg)",
    "variable": "var(--colors-color-palette-accent-hover-bg)"
  },
  "colors.colorPalette.hover.bg": {
    "value": "var(--colors-color-palette-hover-bg)",
    "variable": "var(--colors-color-palette-hover-bg)"
  },
  "colors.colorPalette.hig.filled.accent.hover.text": {
    "value": "var(--colors-color-palette-hig-filled-accent-hover-text)",
    "variable": "var(--colors-color-palette-hig-filled-accent-hover-text)"
  },
  "colors.colorPalette.filled.accent.hover.text": {
    "value": "var(--colors-color-palette-filled-accent-hover-text)",
    "variable": "var(--colors-color-palette-filled-accent-hover-text)"
  },
  "colors.colorPalette.accent.hover.text": {
    "value": "var(--colors-color-palette-accent-hover-text)",
    "variable": "var(--colors-color-palette-accent-hover-text)"
  },
  "colors.colorPalette.hover.text": {
    "value": "var(--colors-color-palette-hover-text)",
    "variable": "var(--colors-color-palette-hover-text)"
  },
  "colors.colorPalette.hig.filled.accent.hover.border": {
    "value": "var(--colors-color-palette-hig-filled-accent-hover-border)",
    "variable": "var(--colors-color-palette-hig-filled-accent-hover-border)"
  },
  "colors.colorPalette.filled.accent.hover.border": {
    "value": "var(--colors-color-palette-filled-accent-hover-border)",
    "variable": "var(--colors-color-palette-filled-accent-hover-border)"
  },
  "colors.colorPalette.accent.hover.border": {
    "value": "var(--colors-color-palette-accent-hover-border)",
    "variable": "var(--colors-color-palette-accent-hover-border)"
  },
  "colors.colorPalette.hover.border": {
    "value": "var(--colors-color-palette-hover-border)",
    "variable": "var(--colors-color-palette-hover-border)"
  },
  "colors.colorPalette.hig.filled.accent.active.bg": {
    "value": "var(--colors-color-palette-hig-filled-accent-active-bg)",
    "variable": "var(--colors-color-palette-hig-filled-accent-active-bg)"
  },
  "colors.colorPalette.filled.accent.active.bg": {
    "value": "var(--colors-color-palette-filled-accent-active-bg)",
    "variable": "var(--colors-color-palette-filled-accent-active-bg)"
  },
  "colors.colorPalette.accent.active.bg": {
    "value": "var(--colors-color-palette-accent-active-bg)",
    "variable": "var(--colors-color-palette-accent-active-bg)"
  },
  "colors.colorPalette.active.bg": {
    "value": "var(--colors-color-palette-active-bg)",
    "variable": "var(--colors-color-palette-active-bg)"
  },
  "colors.colorPalette.hig.filled.accent.active.text": {
    "value": "var(--colors-color-palette-hig-filled-accent-active-text)",
    "variable": "var(--colors-color-palette-hig-filled-accent-active-text)"
  },
  "colors.colorPalette.filled.accent.active.text": {
    "value": "var(--colors-color-palette-filled-accent-active-text)",
    "variable": "var(--colors-color-palette-filled-accent-active-text)"
  },
  "colors.colorPalette.accent.active.text": {
    "value": "var(--colors-color-palette-accent-active-text)",
    "variable": "var(--colors-color-palette-accent-active-text)"
  },
  "colors.colorPalette.active.text": {
    "value": "var(--colors-color-palette-active-text)",
    "variable": "var(--colors-color-palette-active-text)"
  },
  "colors.colorPalette.hig.filled.accent.active.border": {
    "value": "var(--colors-color-palette-hig-filled-accent-active-border)",
    "variable": "var(--colors-color-palette-hig-filled-accent-active-border)"
  },
  "colors.colorPalette.filled.accent.active.border": {
    "value": "var(--colors-color-palette-filled-accent-active-border)",
    "variable": "var(--colors-color-palette-filled-accent-active-border)"
  },
  "colors.colorPalette.accent.active.border": {
    "value": "var(--colors-color-palette-accent-active-border)",
    "variable": "var(--colors-color-palette-accent-active-border)"
  },
  "colors.colorPalette.active.border": {
    "value": "var(--colors-color-palette-active-border)",
    "variable": "var(--colors-color-palette-active-border)"
  },
  "colors.colorPalette.hig.filled.accent.disabled.bg": {
    "value": "var(--colors-color-palette-hig-filled-accent-disabled-bg)",
    "variable": "var(--colors-color-palette-hig-filled-accent-disabled-bg)"
  },
  "colors.colorPalette.filled.accent.disabled.bg": {
    "value": "var(--colors-color-palette-filled-accent-disabled-bg)",
    "variable": "var(--colors-color-palette-filled-accent-disabled-bg)"
  },
  "colors.colorPalette.accent.disabled.bg": {
    "value": "var(--colors-color-palette-accent-disabled-bg)",
    "variable": "var(--colors-color-palette-accent-disabled-bg)"
  },
  "colors.colorPalette.disabled.bg": {
    "value": "var(--colors-color-palette-disabled-bg)",
    "variable": "var(--colors-color-palette-disabled-bg)"
  },
  "colors.colorPalette.hig.filled.accent.disabled.text": {
    "value": "var(--colors-color-palette-hig-filled-accent-disabled-text)",
    "variable": "var(--colors-color-palette-hig-filled-accent-disabled-text)"
  },
  "colors.colorPalette.filled.accent.disabled.text": {
    "value": "var(--colors-color-palette-filled-accent-disabled-text)",
    "variable": "var(--colors-color-palette-filled-accent-disabled-text)"
  },
  "colors.colorPalette.accent.disabled.text": {
    "value": "var(--colors-color-palette-accent-disabled-text)",
    "variable": "var(--colors-color-palette-accent-disabled-text)"
  },
  "colors.colorPalette.disabled.text": {
    "value": "var(--colors-color-palette-disabled-text)",
    "variable": "var(--colors-color-palette-disabled-text)"
  },
  "colors.colorPalette.hig.filled.accent.disabled.border": {
    "value": "var(--colors-color-palette-hig-filled-accent-disabled-border)",
    "variable": "var(--colors-color-palette-hig-filled-accent-disabled-border)"
  },
  "colors.colorPalette.filled.accent.disabled.border": {
    "value": "var(--colors-color-palette-filled-accent-disabled-border)",
    "variable": "var(--colors-color-palette-filled-accent-disabled-border)"
  },
  "colors.colorPalette.accent.disabled.border": {
    "value": "var(--colors-color-palette-accent-disabled-border)",
    "variable": "var(--colors-color-palette-accent-disabled-border)"
  },
  "colors.colorPalette.disabled.border": {
    "value": "var(--colors-color-palette-disabled-border)",
    "variable": "var(--colors-color-palette-disabled-border)"
  },
  "colors.colorPalette.hig.filled.accent.focus.bg": {
    "value": "var(--colors-color-palette-hig-filled-accent-focus-bg)",
    "variable": "var(--colors-color-palette-hig-filled-accent-focus-bg)"
  },
  "colors.colorPalette.filled.accent.focus.bg": {
    "value": "var(--colors-color-palette-filled-accent-focus-bg)",
    "variable": "var(--colors-color-palette-filled-accent-focus-bg)"
  },
  "colors.colorPalette.accent.focus.bg": {
    "value": "var(--colors-color-palette-accent-focus-bg)",
    "variable": "var(--colors-color-palette-accent-focus-bg)"
  },
  "colors.colorPalette.focus.bg": {
    "value": "var(--colors-color-palette-focus-bg)",
    "variable": "var(--colors-color-palette-focus-bg)"
  },
  "colors.colorPalette.hig.filled.accent.focus.text": {
    "value": "var(--colors-color-palette-hig-filled-accent-focus-text)",
    "variable": "var(--colors-color-palette-hig-filled-accent-focus-text)"
  },
  "colors.colorPalette.filled.accent.focus.text": {
    "value": "var(--colors-color-palette-filled-accent-focus-text)",
    "variable": "var(--colors-color-palette-filled-accent-focus-text)"
  },
  "colors.colorPalette.accent.focus.text": {
    "value": "var(--colors-color-palette-accent-focus-text)",
    "variable": "var(--colors-color-palette-accent-focus-text)"
  },
  "colors.colorPalette.focus.text": {
    "value": "var(--colors-color-palette-focus-text)",
    "variable": "var(--colors-color-palette-focus-text)"
  },
  "colors.colorPalette.hig.filled.accent.focus.border": {
    "value": "var(--colors-color-palette-hig-filled-accent-focus-border)",
    "variable": "var(--colors-color-palette-hig-filled-accent-focus-border)"
  },
  "colors.colorPalette.filled.accent.focus.border": {
    "value": "var(--colors-color-palette-filled-accent-focus-border)",
    "variable": "var(--colors-color-palette-filled-accent-focus-border)"
  },
  "colors.colorPalette.accent.focus.border": {
    "value": "var(--colors-color-palette-accent-focus-border)",
    "variable": "var(--colors-color-palette-accent-focus-border)"
  },
  "colors.colorPalette.focus.border": {
    "value": "var(--colors-color-palette-focus-border)",
    "variable": "var(--colors-color-palette-focus-border)"
  },
  "colors.colorPalette.hig.filled.accent.loading.bg": {
    "value": "var(--colors-color-palette-hig-filled-accent-loading-bg)",
    "variable": "var(--colors-color-palette-hig-filled-accent-loading-bg)"
  },
  "colors.colorPalette.filled.accent.loading.bg": {
    "value": "var(--colors-color-palette-filled-accent-loading-bg)",
    "variable": "var(--colors-color-palette-filled-accent-loading-bg)"
  },
  "colors.colorPalette.accent.loading.bg": {
    "value": "var(--colors-color-palette-accent-loading-bg)",
    "variable": "var(--colors-color-palette-accent-loading-bg)"
  },
  "colors.colorPalette.loading.bg": {
    "value": "var(--colors-color-palette-loading-bg)",
    "variable": "var(--colors-color-palette-loading-bg)"
  },
  "colors.colorPalette.hig.filled.accent.loading.text": {
    "value": "var(--colors-color-palette-hig-filled-accent-loading-text)",
    "variable": "var(--colors-color-palette-hig-filled-accent-loading-text)"
  },
  "colors.colorPalette.filled.accent.loading.text": {
    "value": "var(--colors-color-palette-filled-accent-loading-text)",
    "variable": "var(--colors-color-palette-filled-accent-loading-text)"
  },
  "colors.colorPalette.accent.loading.text": {
    "value": "var(--colors-color-palette-accent-loading-text)",
    "variable": "var(--colors-color-palette-accent-loading-text)"
  },
  "colors.colorPalette.loading.text": {
    "value": "var(--colors-color-palette-loading-text)",
    "variable": "var(--colors-color-palette-loading-text)"
  },
  "colors.colorPalette.hig.filled.accent.loading.border": {
    "value": "var(--colors-color-palette-hig-filled-accent-loading-border)",
    "variable": "var(--colors-color-palette-hig-filled-accent-loading-border)"
  },
  "colors.colorPalette.filled.accent.loading.border": {
    "value": "var(--colors-color-palette-filled-accent-loading-border)",
    "variable": "var(--colors-color-palette-filled-accent-loading-border)"
  },
  "colors.colorPalette.accent.loading.border": {
    "value": "var(--colors-color-palette-accent-loading-border)",
    "variable": "var(--colors-color-palette-accent-loading-border)"
  },
  "colors.colorPalette.loading.border": {
    "value": "var(--colors-color-palette-loading-border)",
    "variable": "var(--colors-color-palette-loading-border)"
  },
  "colors.colorPalette.hig.filled.neutral.default.bg": {
    "value": "var(--colors-color-palette-hig-filled-neutral-default-bg)",
    "variable": "var(--colors-color-palette-hig-filled-neutral-default-bg)"
  },
  "colors.colorPalette.filled.neutral.default.bg": {
    "value": "var(--colors-color-palette-filled-neutral-default-bg)",
    "variable": "var(--colors-color-palette-filled-neutral-default-bg)"
  },
  "colors.colorPalette.neutral.default.bg": {
    "value": "var(--colors-color-palette-neutral-default-bg)",
    "variable": "var(--colors-color-palette-neutral-default-bg)"
  },
  "colors.colorPalette.hig.filled.neutral.default.text": {
    "value": "var(--colors-color-palette-hig-filled-neutral-default-text)",
    "variable": "var(--colors-color-palette-hig-filled-neutral-default-text)"
  },
  "colors.colorPalette.filled.neutral.default.text": {
    "value": "var(--colors-color-palette-filled-neutral-default-text)",
    "variable": "var(--colors-color-palette-filled-neutral-default-text)"
  },
  "colors.colorPalette.neutral.default.text": {
    "value": "var(--colors-color-palette-neutral-default-text)",
    "variable": "var(--colors-color-palette-neutral-default-text)"
  },
  "colors.colorPalette.hig.filled.neutral.default.border": {
    "value": "var(--colors-color-palette-hig-filled-neutral-default-border)",
    "variable": "var(--colors-color-palette-hig-filled-neutral-default-border)"
  },
  "colors.colorPalette.filled.neutral.default.border": {
    "value": "var(--colors-color-palette-filled-neutral-default-border)",
    "variable": "var(--colors-color-palette-filled-neutral-default-border)"
  },
  "colors.colorPalette.neutral.default.border": {
    "value": "var(--colors-color-palette-neutral-default-border)",
    "variable": "var(--colors-color-palette-neutral-default-border)"
  },
  "colors.colorPalette.hig.filled.neutral.hover.bg": {
    "value": "var(--colors-color-palette-hig-filled-neutral-hover-bg)",
    "variable": "var(--colors-color-palette-hig-filled-neutral-hover-bg)"
  },
  "colors.colorPalette.filled.neutral.hover.bg": {
    "value": "var(--colors-color-palette-filled-neutral-hover-bg)",
    "variable": "var(--colors-color-palette-filled-neutral-hover-bg)"
  },
  "colors.colorPalette.neutral.hover.bg": {
    "value": "var(--colors-color-palette-neutral-hover-bg)",
    "variable": "var(--colors-color-palette-neutral-hover-bg)"
  },
  "colors.colorPalette.hig.filled.neutral.hover.text": {
    "value": "var(--colors-color-palette-hig-filled-neutral-hover-text)",
    "variable": "var(--colors-color-palette-hig-filled-neutral-hover-text)"
  },
  "colors.colorPalette.filled.neutral.hover.text": {
    "value": "var(--colors-color-palette-filled-neutral-hover-text)",
    "variable": "var(--colors-color-palette-filled-neutral-hover-text)"
  },
  "colors.colorPalette.neutral.hover.text": {
    "value": "var(--colors-color-palette-neutral-hover-text)",
    "variable": "var(--colors-color-palette-neutral-hover-text)"
  },
  "colors.colorPalette.hig.filled.neutral.hover.border": {
    "value": "var(--colors-color-palette-hig-filled-neutral-hover-border)",
    "variable": "var(--colors-color-palette-hig-filled-neutral-hover-border)"
  },
  "colors.colorPalette.filled.neutral.hover.border": {
    "value": "var(--colors-color-palette-filled-neutral-hover-border)",
    "variable": "var(--colors-color-palette-filled-neutral-hover-border)"
  },
  "colors.colorPalette.neutral.hover.border": {
    "value": "var(--colors-color-palette-neutral-hover-border)",
    "variable": "var(--colors-color-palette-neutral-hover-border)"
  },
  "colors.colorPalette.hig.filled.neutral.active.bg": {
    "value": "var(--colors-color-palette-hig-filled-neutral-active-bg)",
    "variable": "var(--colors-color-palette-hig-filled-neutral-active-bg)"
  },
  "colors.colorPalette.filled.neutral.active.bg": {
    "value": "var(--colors-color-palette-filled-neutral-active-bg)",
    "variable": "var(--colors-color-palette-filled-neutral-active-bg)"
  },
  "colors.colorPalette.neutral.active.bg": {
    "value": "var(--colors-color-palette-neutral-active-bg)",
    "variable": "var(--colors-color-palette-neutral-active-bg)"
  },
  "colors.colorPalette.hig.filled.neutral.active.text": {
    "value": "var(--colors-color-palette-hig-filled-neutral-active-text)",
    "variable": "var(--colors-color-palette-hig-filled-neutral-active-text)"
  },
  "colors.colorPalette.filled.neutral.active.text": {
    "value": "var(--colors-color-palette-filled-neutral-active-text)",
    "variable": "var(--colors-color-palette-filled-neutral-active-text)"
  },
  "colors.colorPalette.neutral.active.text": {
    "value": "var(--colors-color-palette-neutral-active-text)",
    "variable": "var(--colors-color-palette-neutral-active-text)"
  },
  "colors.colorPalette.hig.filled.neutral.active.border": {
    "value": "var(--colors-color-palette-hig-filled-neutral-active-border)",
    "variable": "var(--colors-color-palette-hig-filled-neutral-active-border)"
  },
  "colors.colorPalette.filled.neutral.active.border": {
    "value": "var(--colors-color-palette-filled-neutral-active-border)",
    "variable": "var(--colors-color-palette-filled-neutral-active-border)"
  },
  "colors.colorPalette.neutral.active.border": {
    "value": "var(--colors-color-palette-neutral-active-border)",
    "variable": "var(--colors-color-palette-neutral-active-border)"
  },
  "colors.colorPalette.hig.filled.neutral.disabled.bg": {
    "value": "var(--colors-color-palette-hig-filled-neutral-disabled-bg)",
    "variable": "var(--colors-color-palette-hig-filled-neutral-disabled-bg)"
  },
  "colors.colorPalette.filled.neutral.disabled.bg": {
    "value": "var(--colors-color-palette-filled-neutral-disabled-bg)",
    "variable": "var(--colors-color-palette-filled-neutral-disabled-bg)"
  },
  "colors.colorPalette.neutral.disabled.bg": {
    "value": "var(--colors-color-palette-neutral-disabled-bg)",
    "variable": "var(--colors-color-palette-neutral-disabled-bg)"
  },
  "colors.colorPalette.hig.filled.neutral.disabled.text": {
    "value": "var(--colors-color-palette-hig-filled-neutral-disabled-text)",
    "variable": "var(--colors-color-palette-hig-filled-neutral-disabled-text)"
  },
  "colors.colorPalette.filled.neutral.disabled.text": {
    "value": "var(--colors-color-palette-filled-neutral-disabled-text)",
    "variable": "var(--colors-color-palette-filled-neutral-disabled-text)"
  },
  "colors.colorPalette.neutral.disabled.text": {
    "value": "var(--colors-color-palette-neutral-disabled-text)",
    "variable": "var(--colors-color-palette-neutral-disabled-text)"
  },
  "colors.colorPalette.hig.filled.neutral.disabled.border": {
    "value": "var(--colors-color-palette-hig-filled-neutral-disabled-border)",
    "variable": "var(--colors-color-palette-hig-filled-neutral-disabled-border)"
  },
  "colors.colorPalette.filled.neutral.disabled.border": {
    "value": "var(--colors-color-palette-filled-neutral-disabled-border)",
    "variable": "var(--colors-color-palette-filled-neutral-disabled-border)"
  },
  "colors.colorPalette.neutral.disabled.border": {
    "value": "var(--colors-color-palette-neutral-disabled-border)",
    "variable": "var(--colors-color-palette-neutral-disabled-border)"
  },
  "colors.colorPalette.hig.filled.neutral.focus.bg": {
    "value": "var(--colors-color-palette-hig-filled-neutral-focus-bg)",
    "variable": "var(--colors-color-palette-hig-filled-neutral-focus-bg)"
  },
  "colors.colorPalette.filled.neutral.focus.bg": {
    "value": "var(--colors-color-palette-filled-neutral-focus-bg)",
    "variable": "var(--colors-color-palette-filled-neutral-focus-bg)"
  },
  "colors.colorPalette.neutral.focus.bg": {
    "value": "var(--colors-color-palette-neutral-focus-bg)",
    "variable": "var(--colors-color-palette-neutral-focus-bg)"
  },
  "colors.colorPalette.hig.filled.neutral.focus.text": {
    "value": "var(--colors-color-palette-hig-filled-neutral-focus-text)",
    "variable": "var(--colors-color-palette-hig-filled-neutral-focus-text)"
  },
  "colors.colorPalette.filled.neutral.focus.text": {
    "value": "var(--colors-color-palette-filled-neutral-focus-text)",
    "variable": "var(--colors-color-palette-filled-neutral-focus-text)"
  },
  "colors.colorPalette.neutral.focus.text": {
    "value": "var(--colors-color-palette-neutral-focus-text)",
    "variable": "var(--colors-color-palette-neutral-focus-text)"
  },
  "colors.colorPalette.hig.filled.neutral.focus.border": {
    "value": "var(--colors-color-palette-hig-filled-neutral-focus-border)",
    "variable": "var(--colors-color-palette-hig-filled-neutral-focus-border)"
  },
  "colors.colorPalette.filled.neutral.focus.border": {
    "value": "var(--colors-color-palette-filled-neutral-focus-border)",
    "variable": "var(--colors-color-palette-filled-neutral-focus-border)"
  },
  "colors.colorPalette.neutral.focus.border": {
    "value": "var(--colors-color-palette-neutral-focus-border)",
    "variable": "var(--colors-color-palette-neutral-focus-border)"
  },
  "colors.colorPalette.hig.filled.neutral.loading.bg": {
    "value": "var(--colors-color-palette-hig-filled-neutral-loading-bg)",
    "variable": "var(--colors-color-palette-hig-filled-neutral-loading-bg)"
  },
  "colors.colorPalette.filled.neutral.loading.bg": {
    "value": "var(--colors-color-palette-filled-neutral-loading-bg)",
    "variable": "var(--colors-color-palette-filled-neutral-loading-bg)"
  },
  "colors.colorPalette.neutral.loading.bg": {
    "value": "var(--colors-color-palette-neutral-loading-bg)",
    "variable": "var(--colors-color-palette-neutral-loading-bg)"
  },
  "colors.colorPalette.hig.filled.neutral.loading.text": {
    "value": "var(--colors-color-palette-hig-filled-neutral-loading-text)",
    "variable": "var(--colors-color-palette-hig-filled-neutral-loading-text)"
  },
  "colors.colorPalette.filled.neutral.loading.text": {
    "value": "var(--colors-color-palette-filled-neutral-loading-text)",
    "variable": "var(--colors-color-palette-filled-neutral-loading-text)"
  },
  "colors.colorPalette.neutral.loading.text": {
    "value": "var(--colors-color-palette-neutral-loading-text)",
    "variable": "var(--colors-color-palette-neutral-loading-text)"
  },
  "colors.colorPalette.hig.filled.neutral.loading.border": {
    "value": "var(--colors-color-palette-hig-filled-neutral-loading-border)",
    "variable": "var(--colors-color-palette-hig-filled-neutral-loading-border)"
  },
  "colors.colorPalette.filled.neutral.loading.border": {
    "value": "var(--colors-color-palette-filled-neutral-loading-border)",
    "variable": "var(--colors-color-palette-filled-neutral-loading-border)"
  },
  "colors.colorPalette.neutral.loading.border": {
    "value": "var(--colors-color-palette-neutral-loading-border)",
    "variable": "var(--colors-color-palette-neutral-loading-border)"
  },
  "colors.colorPalette.hig.filled.destructive.default.bg": {
    "value": "var(--colors-color-palette-hig-filled-destructive-default-bg)",
    "variable": "var(--colors-color-palette-hig-filled-destructive-default-bg)"
  },
  "colors.colorPalette.filled.destructive.default.bg": {
    "value": "var(--colors-color-palette-filled-destructive-default-bg)",
    "variable": "var(--colors-color-palette-filled-destructive-default-bg)"
  },
  "colors.colorPalette.destructive.default.bg": {
    "value": "var(--colors-color-palette-destructive-default-bg)",
    "variable": "var(--colors-color-palette-destructive-default-bg)"
  },
  "colors.colorPalette.hig.filled.destructive.default.text": {
    "value": "var(--colors-color-palette-hig-filled-destructive-default-text)",
    "variable": "var(--colors-color-palette-hig-filled-destructive-default-text)"
  },
  "colors.colorPalette.filled.destructive.default.text": {
    "value": "var(--colors-color-palette-filled-destructive-default-text)",
    "variable": "var(--colors-color-palette-filled-destructive-default-text)"
  },
  "colors.colorPalette.destructive.default.text": {
    "value": "var(--colors-color-palette-destructive-default-text)",
    "variable": "var(--colors-color-palette-destructive-default-text)"
  },
  "colors.colorPalette.hig.filled.destructive.default.border": {
    "value": "var(--colors-color-palette-hig-filled-destructive-default-border)",
    "variable": "var(--colors-color-palette-hig-filled-destructive-default-border)"
  },
  "colors.colorPalette.filled.destructive.default.border": {
    "value": "var(--colors-color-palette-filled-destructive-default-border)",
    "variable": "var(--colors-color-palette-filled-destructive-default-border)"
  },
  "colors.colorPalette.destructive.default.border": {
    "value": "var(--colors-color-palette-destructive-default-border)",
    "variable": "var(--colors-color-palette-destructive-default-border)"
  },
  "colors.colorPalette.hig.filled.destructive.hover.bg": {
    "value": "var(--colors-color-palette-hig-filled-destructive-hover-bg)",
    "variable": "var(--colors-color-palette-hig-filled-destructive-hover-bg)"
  },
  "colors.colorPalette.filled.destructive.hover.bg": {
    "value": "var(--colors-color-palette-filled-destructive-hover-bg)",
    "variable": "var(--colors-color-palette-filled-destructive-hover-bg)"
  },
  "colors.colorPalette.destructive.hover.bg": {
    "value": "var(--colors-color-palette-destructive-hover-bg)",
    "variable": "var(--colors-color-palette-destructive-hover-bg)"
  },
  "colors.colorPalette.hig.filled.destructive.hover.text": {
    "value": "var(--colors-color-palette-hig-filled-destructive-hover-text)",
    "variable": "var(--colors-color-palette-hig-filled-destructive-hover-text)"
  },
  "colors.colorPalette.filled.destructive.hover.text": {
    "value": "var(--colors-color-palette-filled-destructive-hover-text)",
    "variable": "var(--colors-color-palette-filled-destructive-hover-text)"
  },
  "colors.colorPalette.destructive.hover.text": {
    "value": "var(--colors-color-palette-destructive-hover-text)",
    "variable": "var(--colors-color-palette-destructive-hover-text)"
  },
  "colors.colorPalette.hig.filled.destructive.hover.border": {
    "value": "var(--colors-color-palette-hig-filled-destructive-hover-border)",
    "variable": "var(--colors-color-palette-hig-filled-destructive-hover-border)"
  },
  "colors.colorPalette.filled.destructive.hover.border": {
    "value": "var(--colors-color-palette-filled-destructive-hover-border)",
    "variable": "var(--colors-color-palette-filled-destructive-hover-border)"
  },
  "colors.colorPalette.destructive.hover.border": {
    "value": "var(--colors-color-palette-destructive-hover-border)",
    "variable": "var(--colors-color-palette-destructive-hover-border)"
  },
  "colors.colorPalette.hig.filled.destructive.active.bg": {
    "value": "var(--colors-color-palette-hig-filled-destructive-active-bg)",
    "variable": "var(--colors-color-palette-hig-filled-destructive-active-bg)"
  },
  "colors.colorPalette.filled.destructive.active.bg": {
    "value": "var(--colors-color-palette-filled-destructive-active-bg)",
    "variable": "var(--colors-color-palette-filled-destructive-active-bg)"
  },
  "colors.colorPalette.destructive.active.bg": {
    "value": "var(--colors-color-palette-destructive-active-bg)",
    "variable": "var(--colors-color-palette-destructive-active-bg)"
  },
  "colors.colorPalette.hig.filled.destructive.active.text": {
    "value": "var(--colors-color-palette-hig-filled-destructive-active-text)",
    "variable": "var(--colors-color-palette-hig-filled-destructive-active-text)"
  },
  "colors.colorPalette.filled.destructive.active.text": {
    "value": "var(--colors-color-palette-filled-destructive-active-text)",
    "variable": "var(--colors-color-palette-filled-destructive-active-text)"
  },
  "colors.colorPalette.destructive.active.text": {
    "value": "var(--colors-color-palette-destructive-active-text)",
    "variable": "var(--colors-color-palette-destructive-active-text)"
  },
  "colors.colorPalette.hig.filled.destructive.active.border": {
    "value": "var(--colors-color-palette-hig-filled-destructive-active-border)",
    "variable": "var(--colors-color-palette-hig-filled-destructive-active-border)"
  },
  "colors.colorPalette.filled.destructive.active.border": {
    "value": "var(--colors-color-palette-filled-destructive-active-border)",
    "variable": "var(--colors-color-palette-filled-destructive-active-border)"
  },
  "colors.colorPalette.destructive.active.border": {
    "value": "var(--colors-color-palette-destructive-active-border)",
    "variable": "var(--colors-color-palette-destructive-active-border)"
  },
  "colors.colorPalette.hig.filled.destructive.disabled.bg": {
    "value": "var(--colors-color-palette-hig-filled-destructive-disabled-bg)",
    "variable": "var(--colors-color-palette-hig-filled-destructive-disabled-bg)"
  },
  "colors.colorPalette.filled.destructive.disabled.bg": {
    "value": "var(--colors-color-palette-filled-destructive-disabled-bg)",
    "variable": "var(--colors-color-palette-filled-destructive-disabled-bg)"
  },
  "colors.colorPalette.destructive.disabled.bg": {
    "value": "var(--colors-color-palette-destructive-disabled-bg)",
    "variable": "var(--colors-color-palette-destructive-disabled-bg)"
  },
  "colors.colorPalette.hig.filled.destructive.disabled.text": {
    "value": "var(--colors-color-palette-hig-filled-destructive-disabled-text)",
    "variable": "var(--colors-color-palette-hig-filled-destructive-disabled-text)"
  },
  "colors.colorPalette.filled.destructive.disabled.text": {
    "value": "var(--colors-color-palette-filled-destructive-disabled-text)",
    "variable": "var(--colors-color-palette-filled-destructive-disabled-text)"
  },
  "colors.colorPalette.destructive.disabled.text": {
    "value": "var(--colors-color-palette-destructive-disabled-text)",
    "variable": "var(--colors-color-palette-destructive-disabled-text)"
  },
  "colors.colorPalette.hig.filled.destructive.disabled.border": {
    "value": "var(--colors-color-palette-hig-filled-destructive-disabled-border)",
    "variable": "var(--colors-color-palette-hig-filled-destructive-disabled-border)"
  },
  "colors.colorPalette.filled.destructive.disabled.border": {
    "value": "var(--colors-color-palette-filled-destructive-disabled-border)",
    "variable": "var(--colors-color-palette-filled-destructive-disabled-border)"
  },
  "colors.colorPalette.destructive.disabled.border": {
    "value": "var(--colors-color-palette-destructive-disabled-border)",
    "variable": "var(--colors-color-palette-destructive-disabled-border)"
  },
  "colors.colorPalette.hig.filled.destructive.focus.bg": {
    "value": "var(--colors-color-palette-hig-filled-destructive-focus-bg)",
    "variable": "var(--colors-color-palette-hig-filled-destructive-focus-bg)"
  },
  "colors.colorPalette.filled.destructive.focus.bg": {
    "value": "var(--colors-color-palette-filled-destructive-focus-bg)",
    "variable": "var(--colors-color-palette-filled-destructive-focus-bg)"
  },
  "colors.colorPalette.destructive.focus.bg": {
    "value": "var(--colors-color-palette-destructive-focus-bg)",
    "variable": "var(--colors-color-palette-destructive-focus-bg)"
  },
  "colors.colorPalette.hig.filled.destructive.focus.text": {
    "value": "var(--colors-color-palette-hig-filled-destructive-focus-text)",
    "variable": "var(--colors-color-palette-hig-filled-destructive-focus-text)"
  },
  "colors.colorPalette.filled.destructive.focus.text": {
    "value": "var(--colors-color-palette-filled-destructive-focus-text)",
    "variable": "var(--colors-color-palette-filled-destructive-focus-text)"
  },
  "colors.colorPalette.destructive.focus.text": {
    "value": "var(--colors-color-palette-destructive-focus-text)",
    "variable": "var(--colors-color-palette-destructive-focus-text)"
  },
  "colors.colorPalette.hig.filled.destructive.focus.border": {
    "value": "var(--colors-color-palette-hig-filled-destructive-focus-border)",
    "variable": "var(--colors-color-palette-hig-filled-destructive-focus-border)"
  },
  "colors.colorPalette.filled.destructive.focus.border": {
    "value": "var(--colors-color-palette-filled-destructive-focus-border)",
    "variable": "var(--colors-color-palette-filled-destructive-focus-border)"
  },
  "colors.colorPalette.destructive.focus.border": {
    "value": "var(--colors-color-palette-destructive-focus-border)",
    "variable": "var(--colors-color-palette-destructive-focus-border)"
  },
  "colors.colorPalette.hig.filled.destructive.loading.bg": {
    "value": "var(--colors-color-palette-hig-filled-destructive-loading-bg)",
    "variable": "var(--colors-color-palette-hig-filled-destructive-loading-bg)"
  },
  "colors.colorPalette.filled.destructive.loading.bg": {
    "value": "var(--colors-color-palette-filled-destructive-loading-bg)",
    "variable": "var(--colors-color-palette-filled-destructive-loading-bg)"
  },
  "colors.colorPalette.destructive.loading.bg": {
    "value": "var(--colors-color-palette-destructive-loading-bg)",
    "variable": "var(--colors-color-palette-destructive-loading-bg)"
  },
  "colors.colorPalette.hig.filled.destructive.loading.text": {
    "value": "var(--colors-color-palette-hig-filled-destructive-loading-text)",
    "variable": "var(--colors-color-palette-hig-filled-destructive-loading-text)"
  },
  "colors.colorPalette.filled.destructive.loading.text": {
    "value": "var(--colors-color-palette-filled-destructive-loading-text)",
    "variable": "var(--colors-color-palette-filled-destructive-loading-text)"
  },
  "colors.colorPalette.destructive.loading.text": {
    "value": "var(--colors-color-palette-destructive-loading-text)",
    "variable": "var(--colors-color-palette-destructive-loading-text)"
  },
  "colors.colorPalette.hig.filled.destructive.loading.border": {
    "value": "var(--colors-color-palette-hig-filled-destructive-loading-border)",
    "variable": "var(--colors-color-palette-hig-filled-destructive-loading-border)"
  },
  "colors.colorPalette.filled.destructive.loading.border": {
    "value": "var(--colors-color-palette-filled-destructive-loading-border)",
    "variable": "var(--colors-color-palette-filled-destructive-loading-border)"
  },
  "colors.colorPalette.destructive.loading.border": {
    "value": "var(--colors-color-palette-destructive-loading-border)",
    "variable": "var(--colors-color-palette-destructive-loading-border)"
  },
  "colors.colorPalette.hig.tinted.accent.default.bg": {
    "value": "var(--colors-color-palette-hig-tinted-accent-default-bg)",
    "variable": "var(--colors-color-palette-hig-tinted-accent-default-bg)"
  },
  "colors.colorPalette.tinted.accent.default.bg": {
    "value": "var(--colors-color-palette-tinted-accent-default-bg)",
    "variable": "var(--colors-color-palette-tinted-accent-default-bg)"
  },
  "colors.colorPalette.hig.tinted.accent.default.text": {
    "value": "var(--colors-color-palette-hig-tinted-accent-default-text)",
    "variable": "var(--colors-color-palette-hig-tinted-accent-default-text)"
  },
  "colors.colorPalette.tinted.accent.default.text": {
    "value": "var(--colors-color-palette-tinted-accent-default-text)",
    "variable": "var(--colors-color-palette-tinted-accent-default-text)"
  },
  "colors.colorPalette.hig.tinted.accent.default.border": {
    "value": "var(--colors-color-palette-hig-tinted-accent-default-border)",
    "variable": "var(--colors-color-palette-hig-tinted-accent-default-border)"
  },
  "colors.colorPalette.tinted.accent.default.border": {
    "value": "var(--colors-color-palette-tinted-accent-default-border)",
    "variable": "var(--colors-color-palette-tinted-accent-default-border)"
  },
  "colors.colorPalette.hig.tinted.accent.hover.bg": {
    "value": "var(--colors-color-palette-hig-tinted-accent-hover-bg)",
    "variable": "var(--colors-color-palette-hig-tinted-accent-hover-bg)"
  },
  "colors.colorPalette.tinted.accent.hover.bg": {
    "value": "var(--colors-color-palette-tinted-accent-hover-bg)",
    "variable": "var(--colors-color-palette-tinted-accent-hover-bg)"
  },
  "colors.colorPalette.hig.tinted.accent.hover.text": {
    "value": "var(--colors-color-palette-hig-tinted-accent-hover-text)",
    "variable": "var(--colors-color-palette-hig-tinted-accent-hover-text)"
  },
  "colors.colorPalette.tinted.accent.hover.text": {
    "value": "var(--colors-color-palette-tinted-accent-hover-text)",
    "variable": "var(--colors-color-palette-tinted-accent-hover-text)"
  },
  "colors.colorPalette.hig.tinted.accent.hover.border": {
    "value": "var(--colors-color-palette-hig-tinted-accent-hover-border)",
    "variable": "var(--colors-color-palette-hig-tinted-accent-hover-border)"
  },
  "colors.colorPalette.tinted.accent.hover.border": {
    "value": "var(--colors-color-palette-tinted-accent-hover-border)",
    "variable": "var(--colors-color-palette-tinted-accent-hover-border)"
  },
  "colors.colorPalette.hig.tinted.accent.active.bg": {
    "value": "var(--colors-color-palette-hig-tinted-accent-active-bg)",
    "variable": "var(--colors-color-palette-hig-tinted-accent-active-bg)"
  },
  "colors.colorPalette.tinted.accent.active.bg": {
    "value": "var(--colors-color-palette-tinted-accent-active-bg)",
    "variable": "var(--colors-color-palette-tinted-accent-active-bg)"
  },
  "colors.colorPalette.hig.tinted.accent.active.text": {
    "value": "var(--colors-color-palette-hig-tinted-accent-active-text)",
    "variable": "var(--colors-color-palette-hig-tinted-accent-active-text)"
  },
  "colors.colorPalette.tinted.accent.active.text": {
    "value": "var(--colors-color-palette-tinted-accent-active-text)",
    "variable": "var(--colors-color-palette-tinted-accent-active-text)"
  },
  "colors.colorPalette.hig.tinted.accent.active.border": {
    "value": "var(--colors-color-palette-hig-tinted-accent-active-border)",
    "variable": "var(--colors-color-palette-hig-tinted-accent-active-border)"
  },
  "colors.colorPalette.tinted.accent.active.border": {
    "value": "var(--colors-color-palette-tinted-accent-active-border)",
    "variable": "var(--colors-color-palette-tinted-accent-active-border)"
  },
  "colors.colorPalette.hig.tinted.accent.disabled.bg": {
    "value": "var(--colors-color-palette-hig-tinted-accent-disabled-bg)",
    "variable": "var(--colors-color-palette-hig-tinted-accent-disabled-bg)"
  },
  "colors.colorPalette.tinted.accent.disabled.bg": {
    "value": "var(--colors-color-palette-tinted-accent-disabled-bg)",
    "variable": "var(--colors-color-palette-tinted-accent-disabled-bg)"
  },
  "colors.colorPalette.hig.tinted.accent.disabled.text": {
    "value": "var(--colors-color-palette-hig-tinted-accent-disabled-text)",
    "variable": "var(--colors-color-palette-hig-tinted-accent-disabled-text)"
  },
  "colors.colorPalette.tinted.accent.disabled.text": {
    "value": "var(--colors-color-palette-tinted-accent-disabled-text)",
    "variable": "var(--colors-color-palette-tinted-accent-disabled-text)"
  },
  "colors.colorPalette.hig.tinted.accent.disabled.border": {
    "value": "var(--colors-color-palette-hig-tinted-accent-disabled-border)",
    "variable": "var(--colors-color-palette-hig-tinted-accent-disabled-border)"
  },
  "colors.colorPalette.tinted.accent.disabled.border": {
    "value": "var(--colors-color-palette-tinted-accent-disabled-border)",
    "variable": "var(--colors-color-palette-tinted-accent-disabled-border)"
  },
  "colors.colorPalette.hig.tinted.accent.focus.bg": {
    "value": "var(--colors-color-palette-hig-tinted-accent-focus-bg)",
    "variable": "var(--colors-color-palette-hig-tinted-accent-focus-bg)"
  },
  "colors.colorPalette.tinted.accent.focus.bg": {
    "value": "var(--colors-color-palette-tinted-accent-focus-bg)",
    "variable": "var(--colors-color-palette-tinted-accent-focus-bg)"
  },
  "colors.colorPalette.hig.tinted.accent.focus.text": {
    "value": "var(--colors-color-palette-hig-tinted-accent-focus-text)",
    "variable": "var(--colors-color-palette-hig-tinted-accent-focus-text)"
  },
  "colors.colorPalette.tinted.accent.focus.text": {
    "value": "var(--colors-color-palette-tinted-accent-focus-text)",
    "variable": "var(--colors-color-palette-tinted-accent-focus-text)"
  },
  "colors.colorPalette.hig.tinted.accent.focus.border": {
    "value": "var(--colors-color-palette-hig-tinted-accent-focus-border)",
    "variable": "var(--colors-color-palette-hig-tinted-accent-focus-border)"
  },
  "colors.colorPalette.tinted.accent.focus.border": {
    "value": "var(--colors-color-palette-tinted-accent-focus-border)",
    "variable": "var(--colors-color-palette-tinted-accent-focus-border)"
  },
  "colors.colorPalette.hig.tinted.accent.loading.bg": {
    "value": "var(--colors-color-palette-hig-tinted-accent-loading-bg)",
    "variable": "var(--colors-color-palette-hig-tinted-accent-loading-bg)"
  },
  "colors.colorPalette.tinted.accent.loading.bg": {
    "value": "var(--colors-color-palette-tinted-accent-loading-bg)",
    "variable": "var(--colors-color-palette-tinted-accent-loading-bg)"
  },
  "colors.colorPalette.hig.tinted.accent.loading.text": {
    "value": "var(--colors-color-palette-hig-tinted-accent-loading-text)",
    "variable": "var(--colors-color-palette-hig-tinted-accent-loading-text)"
  },
  "colors.colorPalette.tinted.accent.loading.text": {
    "value": "var(--colors-color-palette-tinted-accent-loading-text)",
    "variable": "var(--colors-color-palette-tinted-accent-loading-text)"
  },
  "colors.colorPalette.hig.tinted.accent.loading.border": {
    "value": "var(--colors-color-palette-hig-tinted-accent-loading-border)",
    "variable": "var(--colors-color-palette-hig-tinted-accent-loading-border)"
  },
  "colors.colorPalette.tinted.accent.loading.border": {
    "value": "var(--colors-color-palette-tinted-accent-loading-border)",
    "variable": "var(--colors-color-palette-tinted-accent-loading-border)"
  },
  "colors.colorPalette.hig.tinted.neutral.default.bg": {
    "value": "var(--colors-color-palette-hig-tinted-neutral-default-bg)",
    "variable": "var(--colors-color-palette-hig-tinted-neutral-default-bg)"
  },
  "colors.colorPalette.tinted.neutral.default.bg": {
    "value": "var(--colors-color-palette-tinted-neutral-default-bg)",
    "variable": "var(--colors-color-palette-tinted-neutral-default-bg)"
  },
  "colors.colorPalette.hig.tinted.neutral.default.text": {
    "value": "var(--colors-color-palette-hig-tinted-neutral-default-text)",
    "variable": "var(--colors-color-palette-hig-tinted-neutral-default-text)"
  },
  "colors.colorPalette.tinted.neutral.default.text": {
    "value": "var(--colors-color-palette-tinted-neutral-default-text)",
    "variable": "var(--colors-color-palette-tinted-neutral-default-text)"
  },
  "colors.colorPalette.hig.tinted.neutral.default.border": {
    "value": "var(--colors-color-palette-hig-tinted-neutral-default-border)",
    "variable": "var(--colors-color-palette-hig-tinted-neutral-default-border)"
  },
  "colors.colorPalette.tinted.neutral.default.border": {
    "value": "var(--colors-color-palette-tinted-neutral-default-border)",
    "variable": "var(--colors-color-palette-tinted-neutral-default-border)"
  },
  "colors.colorPalette.hig.tinted.neutral.hover.bg": {
    "value": "var(--colors-color-palette-hig-tinted-neutral-hover-bg)",
    "variable": "var(--colors-color-palette-hig-tinted-neutral-hover-bg)"
  },
  "colors.colorPalette.tinted.neutral.hover.bg": {
    "value": "var(--colors-color-palette-tinted-neutral-hover-bg)",
    "variable": "var(--colors-color-palette-tinted-neutral-hover-bg)"
  },
  "colors.colorPalette.hig.tinted.neutral.hover.text": {
    "value": "var(--colors-color-palette-hig-tinted-neutral-hover-text)",
    "variable": "var(--colors-color-palette-hig-tinted-neutral-hover-text)"
  },
  "colors.colorPalette.tinted.neutral.hover.text": {
    "value": "var(--colors-color-palette-tinted-neutral-hover-text)",
    "variable": "var(--colors-color-palette-tinted-neutral-hover-text)"
  },
  "colors.colorPalette.hig.tinted.neutral.hover.border": {
    "value": "var(--colors-color-palette-hig-tinted-neutral-hover-border)",
    "variable": "var(--colors-color-palette-hig-tinted-neutral-hover-border)"
  },
  "colors.colorPalette.tinted.neutral.hover.border": {
    "value": "var(--colors-color-palette-tinted-neutral-hover-border)",
    "variable": "var(--colors-color-palette-tinted-neutral-hover-border)"
  },
  "colors.colorPalette.hig.tinted.neutral.active.bg": {
    "value": "var(--colors-color-palette-hig-tinted-neutral-active-bg)",
    "variable": "var(--colors-color-palette-hig-tinted-neutral-active-bg)"
  },
  "colors.colorPalette.tinted.neutral.active.bg": {
    "value": "var(--colors-color-palette-tinted-neutral-active-bg)",
    "variable": "var(--colors-color-palette-tinted-neutral-active-bg)"
  },
  "colors.colorPalette.hig.tinted.neutral.active.text": {
    "value": "var(--colors-color-palette-hig-tinted-neutral-active-text)",
    "variable": "var(--colors-color-palette-hig-tinted-neutral-active-text)"
  },
  "colors.colorPalette.tinted.neutral.active.text": {
    "value": "var(--colors-color-palette-tinted-neutral-active-text)",
    "variable": "var(--colors-color-palette-tinted-neutral-active-text)"
  },
  "colors.colorPalette.hig.tinted.neutral.active.border": {
    "value": "var(--colors-color-palette-hig-tinted-neutral-active-border)",
    "variable": "var(--colors-color-palette-hig-tinted-neutral-active-border)"
  },
  "colors.colorPalette.tinted.neutral.active.border": {
    "value": "var(--colors-color-palette-tinted-neutral-active-border)",
    "variable": "var(--colors-color-palette-tinted-neutral-active-border)"
  },
  "colors.colorPalette.hig.tinted.neutral.disabled.bg": {
    "value": "var(--colors-color-palette-hig-tinted-neutral-disabled-bg)",
    "variable": "var(--colors-color-palette-hig-tinted-neutral-disabled-bg)"
  },
  "colors.colorPalette.tinted.neutral.disabled.bg": {
    "value": "var(--colors-color-palette-tinted-neutral-disabled-bg)",
    "variable": "var(--colors-color-palette-tinted-neutral-disabled-bg)"
  },
  "colors.colorPalette.hig.tinted.neutral.disabled.text": {
    "value": "var(--colors-color-palette-hig-tinted-neutral-disabled-text)",
    "variable": "var(--colors-color-palette-hig-tinted-neutral-disabled-text)"
  },
  "colors.colorPalette.tinted.neutral.disabled.text": {
    "value": "var(--colors-color-palette-tinted-neutral-disabled-text)",
    "variable": "var(--colors-color-palette-tinted-neutral-disabled-text)"
  },
  "colors.colorPalette.hig.tinted.neutral.disabled.border": {
    "value": "var(--colors-color-palette-hig-tinted-neutral-disabled-border)",
    "variable": "var(--colors-color-palette-hig-tinted-neutral-disabled-border)"
  },
  "colors.colorPalette.tinted.neutral.disabled.border": {
    "value": "var(--colors-color-palette-tinted-neutral-disabled-border)",
    "variable": "var(--colors-color-palette-tinted-neutral-disabled-border)"
  },
  "colors.colorPalette.hig.tinted.neutral.focus.bg": {
    "value": "var(--colors-color-palette-hig-tinted-neutral-focus-bg)",
    "variable": "var(--colors-color-palette-hig-tinted-neutral-focus-bg)"
  },
  "colors.colorPalette.tinted.neutral.focus.bg": {
    "value": "var(--colors-color-palette-tinted-neutral-focus-bg)",
    "variable": "var(--colors-color-palette-tinted-neutral-focus-bg)"
  },
  "colors.colorPalette.hig.tinted.neutral.focus.text": {
    "value": "var(--colors-color-palette-hig-tinted-neutral-focus-text)",
    "variable": "var(--colors-color-palette-hig-tinted-neutral-focus-text)"
  },
  "colors.colorPalette.tinted.neutral.focus.text": {
    "value": "var(--colors-color-palette-tinted-neutral-focus-text)",
    "variable": "var(--colors-color-palette-tinted-neutral-focus-text)"
  },
  "colors.colorPalette.hig.tinted.neutral.focus.border": {
    "value": "var(--colors-color-palette-hig-tinted-neutral-focus-border)",
    "variable": "var(--colors-color-palette-hig-tinted-neutral-focus-border)"
  },
  "colors.colorPalette.tinted.neutral.focus.border": {
    "value": "var(--colors-color-palette-tinted-neutral-focus-border)",
    "variable": "var(--colors-color-palette-tinted-neutral-focus-border)"
  },
  "colors.colorPalette.hig.tinted.neutral.loading.bg": {
    "value": "var(--colors-color-palette-hig-tinted-neutral-loading-bg)",
    "variable": "var(--colors-color-palette-hig-tinted-neutral-loading-bg)"
  },
  "colors.colorPalette.tinted.neutral.loading.bg": {
    "value": "var(--colors-color-palette-tinted-neutral-loading-bg)",
    "variable": "var(--colors-color-palette-tinted-neutral-loading-bg)"
  },
  "colors.colorPalette.hig.tinted.neutral.loading.text": {
    "value": "var(--colors-color-palette-hig-tinted-neutral-loading-text)",
    "variable": "var(--colors-color-palette-hig-tinted-neutral-loading-text)"
  },
  "colors.colorPalette.tinted.neutral.loading.text": {
    "value": "var(--colors-color-palette-tinted-neutral-loading-text)",
    "variable": "var(--colors-color-palette-tinted-neutral-loading-text)"
  },
  "colors.colorPalette.hig.tinted.neutral.loading.border": {
    "value": "var(--colors-color-palette-hig-tinted-neutral-loading-border)",
    "variable": "var(--colors-color-palette-hig-tinted-neutral-loading-border)"
  },
  "colors.colorPalette.tinted.neutral.loading.border": {
    "value": "var(--colors-color-palette-tinted-neutral-loading-border)",
    "variable": "var(--colors-color-palette-tinted-neutral-loading-border)"
  },
  "colors.colorPalette.hig.tinted.destructive.default.bg": {
    "value": "var(--colors-color-palette-hig-tinted-destructive-default-bg)",
    "variable": "var(--colors-color-palette-hig-tinted-destructive-default-bg)"
  },
  "colors.colorPalette.tinted.destructive.default.bg": {
    "value": "var(--colors-color-palette-tinted-destructive-default-bg)",
    "variable": "var(--colors-color-palette-tinted-destructive-default-bg)"
  },
  "colors.colorPalette.hig.tinted.destructive.default.text": {
    "value": "var(--colors-color-palette-hig-tinted-destructive-default-text)",
    "variable": "var(--colors-color-palette-hig-tinted-destructive-default-text)"
  },
  "colors.colorPalette.tinted.destructive.default.text": {
    "value": "var(--colors-color-palette-tinted-destructive-default-text)",
    "variable": "var(--colors-color-palette-tinted-destructive-default-text)"
  },
  "colors.colorPalette.hig.tinted.destructive.default.border": {
    "value": "var(--colors-color-palette-hig-tinted-destructive-default-border)",
    "variable": "var(--colors-color-palette-hig-tinted-destructive-default-border)"
  },
  "colors.colorPalette.tinted.destructive.default.border": {
    "value": "var(--colors-color-palette-tinted-destructive-default-border)",
    "variable": "var(--colors-color-palette-tinted-destructive-default-border)"
  },
  "colors.colorPalette.hig.tinted.destructive.hover.bg": {
    "value": "var(--colors-color-palette-hig-tinted-destructive-hover-bg)",
    "variable": "var(--colors-color-palette-hig-tinted-destructive-hover-bg)"
  },
  "colors.colorPalette.tinted.destructive.hover.bg": {
    "value": "var(--colors-color-palette-tinted-destructive-hover-bg)",
    "variable": "var(--colors-color-palette-tinted-destructive-hover-bg)"
  },
  "colors.colorPalette.hig.tinted.destructive.hover.text": {
    "value": "var(--colors-color-palette-hig-tinted-destructive-hover-text)",
    "variable": "var(--colors-color-palette-hig-tinted-destructive-hover-text)"
  },
  "colors.colorPalette.tinted.destructive.hover.text": {
    "value": "var(--colors-color-palette-tinted-destructive-hover-text)",
    "variable": "var(--colors-color-palette-tinted-destructive-hover-text)"
  },
  "colors.colorPalette.hig.tinted.destructive.hover.border": {
    "value": "var(--colors-color-palette-hig-tinted-destructive-hover-border)",
    "variable": "var(--colors-color-palette-hig-tinted-destructive-hover-border)"
  },
  "colors.colorPalette.tinted.destructive.hover.border": {
    "value": "var(--colors-color-palette-tinted-destructive-hover-border)",
    "variable": "var(--colors-color-palette-tinted-destructive-hover-border)"
  },
  "colors.colorPalette.hig.tinted.destructive.active.bg": {
    "value": "var(--colors-color-palette-hig-tinted-destructive-active-bg)",
    "variable": "var(--colors-color-palette-hig-tinted-destructive-active-bg)"
  },
  "colors.colorPalette.tinted.destructive.active.bg": {
    "value": "var(--colors-color-palette-tinted-destructive-active-bg)",
    "variable": "var(--colors-color-palette-tinted-destructive-active-bg)"
  },
  "colors.colorPalette.hig.tinted.destructive.active.text": {
    "value": "var(--colors-color-palette-hig-tinted-destructive-active-text)",
    "variable": "var(--colors-color-palette-hig-tinted-destructive-active-text)"
  },
  "colors.colorPalette.tinted.destructive.active.text": {
    "value": "var(--colors-color-palette-tinted-destructive-active-text)",
    "variable": "var(--colors-color-palette-tinted-destructive-active-text)"
  },
  "colors.colorPalette.hig.tinted.destructive.active.border": {
    "value": "var(--colors-color-palette-hig-tinted-destructive-active-border)",
    "variable": "var(--colors-color-palette-hig-tinted-destructive-active-border)"
  },
  "colors.colorPalette.tinted.destructive.active.border": {
    "value": "var(--colors-color-palette-tinted-destructive-active-border)",
    "variable": "var(--colors-color-palette-tinted-destructive-active-border)"
  },
  "colors.colorPalette.hig.tinted.destructive.disabled.bg": {
    "value": "var(--colors-color-palette-hig-tinted-destructive-disabled-bg)",
    "variable": "var(--colors-color-palette-hig-tinted-destructive-disabled-bg)"
  },
  "colors.colorPalette.tinted.destructive.disabled.bg": {
    "value": "var(--colors-color-palette-tinted-destructive-disabled-bg)",
    "variable": "var(--colors-color-palette-tinted-destructive-disabled-bg)"
  },
  "colors.colorPalette.hig.tinted.destructive.disabled.text": {
    "value": "var(--colors-color-palette-hig-tinted-destructive-disabled-text)",
    "variable": "var(--colors-color-palette-hig-tinted-destructive-disabled-text)"
  },
  "colors.colorPalette.tinted.destructive.disabled.text": {
    "value": "var(--colors-color-palette-tinted-destructive-disabled-text)",
    "variable": "var(--colors-color-palette-tinted-destructive-disabled-text)"
  },
  "colors.colorPalette.hig.tinted.destructive.disabled.border": {
    "value": "var(--colors-color-palette-hig-tinted-destructive-disabled-border)",
    "variable": "var(--colors-color-palette-hig-tinted-destructive-disabled-border)"
  },
  "colors.colorPalette.tinted.destructive.disabled.border": {
    "value": "var(--colors-color-palette-tinted-destructive-disabled-border)",
    "variable": "var(--colors-color-palette-tinted-destructive-disabled-border)"
  },
  "colors.colorPalette.hig.tinted.destructive.focus.bg": {
    "value": "var(--colors-color-palette-hig-tinted-destructive-focus-bg)",
    "variable": "var(--colors-color-palette-hig-tinted-destructive-focus-bg)"
  },
  "colors.colorPalette.tinted.destructive.focus.bg": {
    "value": "var(--colors-color-palette-tinted-destructive-focus-bg)",
    "variable": "var(--colors-color-palette-tinted-destructive-focus-bg)"
  },
  "colors.colorPalette.hig.tinted.destructive.focus.text": {
    "value": "var(--colors-color-palette-hig-tinted-destructive-focus-text)",
    "variable": "var(--colors-color-palette-hig-tinted-destructive-focus-text)"
  },
  "colors.colorPalette.tinted.destructive.focus.text": {
    "value": "var(--colors-color-palette-tinted-destructive-focus-text)",
    "variable": "var(--colors-color-palette-tinted-destructive-focus-text)"
  },
  "colors.colorPalette.hig.tinted.destructive.focus.border": {
    "value": "var(--colors-color-palette-hig-tinted-destructive-focus-border)",
    "variable": "var(--colors-color-palette-hig-tinted-destructive-focus-border)"
  },
  "colors.colorPalette.tinted.destructive.focus.border": {
    "value": "var(--colors-color-palette-tinted-destructive-focus-border)",
    "variable": "var(--colors-color-palette-tinted-destructive-focus-border)"
  },
  "colors.colorPalette.hig.tinted.destructive.loading.bg": {
    "value": "var(--colors-color-palette-hig-tinted-destructive-loading-bg)",
    "variable": "var(--colors-color-palette-hig-tinted-destructive-loading-bg)"
  },
  "colors.colorPalette.tinted.destructive.loading.bg": {
    "value": "var(--colors-color-palette-tinted-destructive-loading-bg)",
    "variable": "var(--colors-color-palette-tinted-destructive-loading-bg)"
  },
  "colors.colorPalette.hig.tinted.destructive.loading.text": {
    "value": "var(--colors-color-palette-hig-tinted-destructive-loading-text)",
    "variable": "var(--colors-color-palette-hig-tinted-destructive-loading-text)"
  },
  "colors.colorPalette.tinted.destructive.loading.text": {
    "value": "var(--colors-color-palette-tinted-destructive-loading-text)",
    "variable": "var(--colors-color-palette-tinted-destructive-loading-text)"
  },
  "colors.colorPalette.hig.tinted.destructive.loading.border": {
    "value": "var(--colors-color-palette-hig-tinted-destructive-loading-border)",
    "variable": "var(--colors-color-palette-hig-tinted-destructive-loading-border)"
  },
  "colors.colorPalette.tinted.destructive.loading.border": {
    "value": "var(--colors-color-palette-tinted-destructive-loading-border)",
    "variable": "var(--colors-color-palette-tinted-destructive-loading-border)"
  },
  "colors.colorPalette.hig.plain.accent.default.bg": {
    "value": "var(--colors-color-palette-hig-plain-accent-default-bg)",
    "variable": "var(--colors-color-palette-hig-plain-accent-default-bg)"
  },
  "colors.colorPalette.plain.accent.default.bg": {
    "value": "var(--colors-color-palette-plain-accent-default-bg)",
    "variable": "var(--colors-color-palette-plain-accent-default-bg)"
  },
  "colors.colorPalette.hig.plain.accent.default.text": {
    "value": "var(--colors-color-palette-hig-plain-accent-default-text)",
    "variable": "var(--colors-color-palette-hig-plain-accent-default-text)"
  },
  "colors.colorPalette.plain.accent.default.text": {
    "value": "var(--colors-color-palette-plain-accent-default-text)",
    "variable": "var(--colors-color-palette-plain-accent-default-text)"
  },
  "colors.colorPalette.hig.plain.accent.default.border": {
    "value": "var(--colors-color-palette-hig-plain-accent-default-border)",
    "variable": "var(--colors-color-palette-hig-plain-accent-default-border)"
  },
  "colors.colorPalette.plain.accent.default.border": {
    "value": "var(--colors-color-palette-plain-accent-default-border)",
    "variable": "var(--colors-color-palette-plain-accent-default-border)"
  },
  "colors.colorPalette.hig.plain.accent.hover.bg": {
    "value": "var(--colors-color-palette-hig-plain-accent-hover-bg)",
    "variable": "var(--colors-color-palette-hig-plain-accent-hover-bg)"
  },
  "colors.colorPalette.plain.accent.hover.bg": {
    "value": "var(--colors-color-palette-plain-accent-hover-bg)",
    "variable": "var(--colors-color-palette-plain-accent-hover-bg)"
  },
  "colors.colorPalette.hig.plain.accent.hover.text": {
    "value": "var(--colors-color-palette-hig-plain-accent-hover-text)",
    "variable": "var(--colors-color-palette-hig-plain-accent-hover-text)"
  },
  "colors.colorPalette.plain.accent.hover.text": {
    "value": "var(--colors-color-palette-plain-accent-hover-text)",
    "variable": "var(--colors-color-palette-plain-accent-hover-text)"
  },
  "colors.colorPalette.hig.plain.accent.hover.border": {
    "value": "var(--colors-color-palette-hig-plain-accent-hover-border)",
    "variable": "var(--colors-color-palette-hig-plain-accent-hover-border)"
  },
  "colors.colorPalette.plain.accent.hover.border": {
    "value": "var(--colors-color-palette-plain-accent-hover-border)",
    "variable": "var(--colors-color-palette-plain-accent-hover-border)"
  },
  "colors.colorPalette.hig.plain.accent.active.bg": {
    "value": "var(--colors-color-palette-hig-plain-accent-active-bg)",
    "variable": "var(--colors-color-palette-hig-plain-accent-active-bg)"
  },
  "colors.colorPalette.plain.accent.active.bg": {
    "value": "var(--colors-color-palette-plain-accent-active-bg)",
    "variable": "var(--colors-color-palette-plain-accent-active-bg)"
  },
  "colors.colorPalette.hig.plain.accent.active.text": {
    "value": "var(--colors-color-palette-hig-plain-accent-active-text)",
    "variable": "var(--colors-color-palette-hig-plain-accent-active-text)"
  },
  "colors.colorPalette.plain.accent.active.text": {
    "value": "var(--colors-color-palette-plain-accent-active-text)",
    "variable": "var(--colors-color-palette-plain-accent-active-text)"
  },
  "colors.colorPalette.hig.plain.accent.active.border": {
    "value": "var(--colors-color-palette-hig-plain-accent-active-border)",
    "variable": "var(--colors-color-palette-hig-plain-accent-active-border)"
  },
  "colors.colorPalette.plain.accent.active.border": {
    "value": "var(--colors-color-palette-plain-accent-active-border)",
    "variable": "var(--colors-color-palette-plain-accent-active-border)"
  },
  "colors.colorPalette.hig.plain.accent.disabled.bg": {
    "value": "var(--colors-color-palette-hig-plain-accent-disabled-bg)",
    "variable": "var(--colors-color-palette-hig-plain-accent-disabled-bg)"
  },
  "colors.colorPalette.plain.accent.disabled.bg": {
    "value": "var(--colors-color-palette-plain-accent-disabled-bg)",
    "variable": "var(--colors-color-palette-plain-accent-disabled-bg)"
  },
  "colors.colorPalette.hig.plain.accent.disabled.text": {
    "value": "var(--colors-color-palette-hig-plain-accent-disabled-text)",
    "variable": "var(--colors-color-palette-hig-plain-accent-disabled-text)"
  },
  "colors.colorPalette.plain.accent.disabled.text": {
    "value": "var(--colors-color-palette-plain-accent-disabled-text)",
    "variable": "var(--colors-color-palette-plain-accent-disabled-text)"
  },
  "colors.colorPalette.hig.plain.accent.disabled.border": {
    "value": "var(--colors-color-palette-hig-plain-accent-disabled-border)",
    "variable": "var(--colors-color-palette-hig-plain-accent-disabled-border)"
  },
  "colors.colorPalette.plain.accent.disabled.border": {
    "value": "var(--colors-color-palette-plain-accent-disabled-border)",
    "variable": "var(--colors-color-palette-plain-accent-disabled-border)"
  },
  "colors.colorPalette.hig.plain.accent.focus.bg": {
    "value": "var(--colors-color-palette-hig-plain-accent-focus-bg)",
    "variable": "var(--colors-color-palette-hig-plain-accent-focus-bg)"
  },
  "colors.colorPalette.plain.accent.focus.bg": {
    "value": "var(--colors-color-palette-plain-accent-focus-bg)",
    "variable": "var(--colors-color-palette-plain-accent-focus-bg)"
  },
  "colors.colorPalette.hig.plain.accent.focus.text": {
    "value": "var(--colors-color-palette-hig-plain-accent-focus-text)",
    "variable": "var(--colors-color-palette-hig-plain-accent-focus-text)"
  },
  "colors.colorPalette.plain.accent.focus.text": {
    "value": "var(--colors-color-palette-plain-accent-focus-text)",
    "variable": "var(--colors-color-palette-plain-accent-focus-text)"
  },
  "colors.colorPalette.hig.plain.accent.focus.border": {
    "value": "var(--colors-color-palette-hig-plain-accent-focus-border)",
    "variable": "var(--colors-color-palette-hig-plain-accent-focus-border)"
  },
  "colors.colorPalette.plain.accent.focus.border": {
    "value": "var(--colors-color-palette-plain-accent-focus-border)",
    "variable": "var(--colors-color-palette-plain-accent-focus-border)"
  },
  "colors.colorPalette.hig.plain.accent.loading.bg": {
    "value": "var(--colors-color-palette-hig-plain-accent-loading-bg)",
    "variable": "var(--colors-color-palette-hig-plain-accent-loading-bg)"
  },
  "colors.colorPalette.plain.accent.loading.bg": {
    "value": "var(--colors-color-palette-plain-accent-loading-bg)",
    "variable": "var(--colors-color-palette-plain-accent-loading-bg)"
  },
  "colors.colorPalette.hig.plain.accent.loading.text": {
    "value": "var(--colors-color-palette-hig-plain-accent-loading-text)",
    "variable": "var(--colors-color-palette-hig-plain-accent-loading-text)"
  },
  "colors.colorPalette.plain.accent.loading.text": {
    "value": "var(--colors-color-palette-plain-accent-loading-text)",
    "variable": "var(--colors-color-palette-plain-accent-loading-text)"
  },
  "colors.colorPalette.hig.plain.accent.loading.border": {
    "value": "var(--colors-color-palette-hig-plain-accent-loading-border)",
    "variable": "var(--colors-color-palette-hig-plain-accent-loading-border)"
  },
  "colors.colorPalette.plain.accent.loading.border": {
    "value": "var(--colors-color-palette-plain-accent-loading-border)",
    "variable": "var(--colors-color-palette-plain-accent-loading-border)"
  },
  "colors.colorPalette.hig.plain.neutral.default.bg": {
    "value": "var(--colors-color-palette-hig-plain-neutral-default-bg)",
    "variable": "var(--colors-color-palette-hig-plain-neutral-default-bg)"
  },
  "colors.colorPalette.plain.neutral.default.bg": {
    "value": "var(--colors-color-palette-plain-neutral-default-bg)",
    "variable": "var(--colors-color-palette-plain-neutral-default-bg)"
  },
  "colors.colorPalette.hig.plain.neutral.default.text": {
    "value": "var(--colors-color-palette-hig-plain-neutral-default-text)",
    "variable": "var(--colors-color-palette-hig-plain-neutral-default-text)"
  },
  "colors.colorPalette.plain.neutral.default.text": {
    "value": "var(--colors-color-palette-plain-neutral-default-text)",
    "variable": "var(--colors-color-palette-plain-neutral-default-text)"
  },
  "colors.colorPalette.hig.plain.neutral.default.border": {
    "value": "var(--colors-color-palette-hig-plain-neutral-default-border)",
    "variable": "var(--colors-color-palette-hig-plain-neutral-default-border)"
  },
  "colors.colorPalette.plain.neutral.default.border": {
    "value": "var(--colors-color-palette-plain-neutral-default-border)",
    "variable": "var(--colors-color-palette-plain-neutral-default-border)"
  },
  "colors.colorPalette.hig.plain.neutral.hover.bg": {
    "value": "var(--colors-color-palette-hig-plain-neutral-hover-bg)",
    "variable": "var(--colors-color-palette-hig-plain-neutral-hover-bg)"
  },
  "colors.colorPalette.plain.neutral.hover.bg": {
    "value": "var(--colors-color-palette-plain-neutral-hover-bg)",
    "variable": "var(--colors-color-palette-plain-neutral-hover-bg)"
  },
  "colors.colorPalette.hig.plain.neutral.hover.text": {
    "value": "var(--colors-color-palette-hig-plain-neutral-hover-text)",
    "variable": "var(--colors-color-palette-hig-plain-neutral-hover-text)"
  },
  "colors.colorPalette.plain.neutral.hover.text": {
    "value": "var(--colors-color-palette-plain-neutral-hover-text)",
    "variable": "var(--colors-color-palette-plain-neutral-hover-text)"
  },
  "colors.colorPalette.hig.plain.neutral.hover.border": {
    "value": "var(--colors-color-palette-hig-plain-neutral-hover-border)",
    "variable": "var(--colors-color-palette-hig-plain-neutral-hover-border)"
  },
  "colors.colorPalette.plain.neutral.hover.border": {
    "value": "var(--colors-color-palette-plain-neutral-hover-border)",
    "variable": "var(--colors-color-palette-plain-neutral-hover-border)"
  },
  "colors.colorPalette.hig.plain.neutral.active.bg": {
    "value": "var(--colors-color-palette-hig-plain-neutral-active-bg)",
    "variable": "var(--colors-color-palette-hig-plain-neutral-active-bg)"
  },
  "colors.colorPalette.plain.neutral.active.bg": {
    "value": "var(--colors-color-palette-plain-neutral-active-bg)",
    "variable": "var(--colors-color-palette-plain-neutral-active-bg)"
  },
  "colors.colorPalette.hig.plain.neutral.active.text": {
    "value": "var(--colors-color-palette-hig-plain-neutral-active-text)",
    "variable": "var(--colors-color-palette-hig-plain-neutral-active-text)"
  },
  "colors.colorPalette.plain.neutral.active.text": {
    "value": "var(--colors-color-palette-plain-neutral-active-text)",
    "variable": "var(--colors-color-palette-plain-neutral-active-text)"
  },
  "colors.colorPalette.hig.plain.neutral.active.border": {
    "value": "var(--colors-color-palette-hig-plain-neutral-active-border)",
    "variable": "var(--colors-color-palette-hig-plain-neutral-active-border)"
  },
  "colors.colorPalette.plain.neutral.active.border": {
    "value": "var(--colors-color-palette-plain-neutral-active-border)",
    "variable": "var(--colors-color-palette-plain-neutral-active-border)"
  },
  "colors.colorPalette.hig.plain.neutral.disabled.bg": {
    "value": "var(--colors-color-palette-hig-plain-neutral-disabled-bg)",
    "variable": "var(--colors-color-palette-hig-plain-neutral-disabled-bg)"
  },
  "colors.colorPalette.plain.neutral.disabled.bg": {
    "value": "var(--colors-color-palette-plain-neutral-disabled-bg)",
    "variable": "var(--colors-color-palette-plain-neutral-disabled-bg)"
  },
  "colors.colorPalette.hig.plain.neutral.disabled.text": {
    "value": "var(--colors-color-palette-hig-plain-neutral-disabled-text)",
    "variable": "var(--colors-color-palette-hig-plain-neutral-disabled-text)"
  },
  "colors.colorPalette.plain.neutral.disabled.text": {
    "value": "var(--colors-color-palette-plain-neutral-disabled-text)",
    "variable": "var(--colors-color-palette-plain-neutral-disabled-text)"
  },
  "colors.colorPalette.hig.plain.neutral.disabled.border": {
    "value": "var(--colors-color-palette-hig-plain-neutral-disabled-border)",
    "variable": "var(--colors-color-palette-hig-plain-neutral-disabled-border)"
  },
  "colors.colorPalette.plain.neutral.disabled.border": {
    "value": "var(--colors-color-palette-plain-neutral-disabled-border)",
    "variable": "var(--colors-color-palette-plain-neutral-disabled-border)"
  },
  "colors.colorPalette.hig.plain.neutral.focus.bg": {
    "value": "var(--colors-color-palette-hig-plain-neutral-focus-bg)",
    "variable": "var(--colors-color-palette-hig-plain-neutral-focus-bg)"
  },
  "colors.colorPalette.plain.neutral.focus.bg": {
    "value": "var(--colors-color-palette-plain-neutral-focus-bg)",
    "variable": "var(--colors-color-palette-plain-neutral-focus-bg)"
  },
  "colors.colorPalette.hig.plain.neutral.focus.text": {
    "value": "var(--colors-color-palette-hig-plain-neutral-focus-text)",
    "variable": "var(--colors-color-palette-hig-plain-neutral-focus-text)"
  },
  "colors.colorPalette.plain.neutral.focus.text": {
    "value": "var(--colors-color-palette-plain-neutral-focus-text)",
    "variable": "var(--colors-color-palette-plain-neutral-focus-text)"
  },
  "colors.colorPalette.hig.plain.neutral.focus.border": {
    "value": "var(--colors-color-palette-hig-plain-neutral-focus-border)",
    "variable": "var(--colors-color-palette-hig-plain-neutral-focus-border)"
  },
  "colors.colorPalette.plain.neutral.focus.border": {
    "value": "var(--colors-color-palette-plain-neutral-focus-border)",
    "variable": "var(--colors-color-palette-plain-neutral-focus-border)"
  },
  "colors.colorPalette.hig.plain.neutral.loading.bg": {
    "value": "var(--colors-color-palette-hig-plain-neutral-loading-bg)",
    "variable": "var(--colors-color-palette-hig-plain-neutral-loading-bg)"
  },
  "colors.colorPalette.plain.neutral.loading.bg": {
    "value": "var(--colors-color-palette-plain-neutral-loading-bg)",
    "variable": "var(--colors-color-palette-plain-neutral-loading-bg)"
  },
  "colors.colorPalette.hig.plain.neutral.loading.text": {
    "value": "var(--colors-color-palette-hig-plain-neutral-loading-text)",
    "variable": "var(--colors-color-palette-hig-plain-neutral-loading-text)"
  },
  "colors.colorPalette.plain.neutral.loading.text": {
    "value": "var(--colors-color-palette-plain-neutral-loading-text)",
    "variable": "var(--colors-color-palette-plain-neutral-loading-text)"
  },
  "colors.colorPalette.hig.plain.neutral.loading.border": {
    "value": "var(--colors-color-palette-hig-plain-neutral-loading-border)",
    "variable": "var(--colors-color-palette-hig-plain-neutral-loading-border)"
  },
  "colors.colorPalette.plain.neutral.loading.border": {
    "value": "var(--colors-color-palette-plain-neutral-loading-border)",
    "variable": "var(--colors-color-palette-plain-neutral-loading-border)"
  },
  "colors.colorPalette.hig.plain.destructive.default.bg": {
    "value": "var(--colors-color-palette-hig-plain-destructive-default-bg)",
    "variable": "var(--colors-color-palette-hig-plain-destructive-default-bg)"
  },
  "colors.colorPalette.plain.destructive.default.bg": {
    "value": "var(--colors-color-palette-plain-destructive-default-bg)",
    "variable": "var(--colors-color-palette-plain-destructive-default-bg)"
  },
  "colors.colorPalette.hig.plain.destructive.default.text": {
    "value": "var(--colors-color-palette-hig-plain-destructive-default-text)",
    "variable": "var(--colors-color-palette-hig-plain-destructive-default-text)"
  },
  "colors.colorPalette.plain.destructive.default.text": {
    "value": "var(--colors-color-palette-plain-destructive-default-text)",
    "variable": "var(--colors-color-palette-plain-destructive-default-text)"
  },
  "colors.colorPalette.hig.plain.destructive.default.border": {
    "value": "var(--colors-color-palette-hig-plain-destructive-default-border)",
    "variable": "var(--colors-color-palette-hig-plain-destructive-default-border)"
  },
  "colors.colorPalette.plain.destructive.default.border": {
    "value": "var(--colors-color-palette-plain-destructive-default-border)",
    "variable": "var(--colors-color-palette-plain-destructive-default-border)"
  },
  "colors.colorPalette.hig.plain.destructive.hover.bg": {
    "value": "var(--colors-color-palette-hig-plain-destructive-hover-bg)",
    "variable": "var(--colors-color-palette-hig-plain-destructive-hover-bg)"
  },
  "colors.colorPalette.plain.destructive.hover.bg": {
    "value": "var(--colors-color-palette-plain-destructive-hover-bg)",
    "variable": "var(--colors-color-palette-plain-destructive-hover-bg)"
  },
  "colors.colorPalette.hig.plain.destructive.hover.text": {
    "value": "var(--colors-color-palette-hig-plain-destructive-hover-text)",
    "variable": "var(--colors-color-palette-hig-plain-destructive-hover-text)"
  },
  "colors.colorPalette.plain.destructive.hover.text": {
    "value": "var(--colors-color-palette-plain-destructive-hover-text)",
    "variable": "var(--colors-color-palette-plain-destructive-hover-text)"
  },
  "colors.colorPalette.hig.plain.destructive.hover.border": {
    "value": "var(--colors-color-palette-hig-plain-destructive-hover-border)",
    "variable": "var(--colors-color-palette-hig-plain-destructive-hover-border)"
  },
  "colors.colorPalette.plain.destructive.hover.border": {
    "value": "var(--colors-color-palette-plain-destructive-hover-border)",
    "variable": "var(--colors-color-palette-plain-destructive-hover-border)"
  },
  "colors.colorPalette.hig.plain.destructive.active.bg": {
    "value": "var(--colors-color-palette-hig-plain-destructive-active-bg)",
    "variable": "var(--colors-color-palette-hig-plain-destructive-active-bg)"
  },
  "colors.colorPalette.plain.destructive.active.bg": {
    "value": "var(--colors-color-palette-plain-destructive-active-bg)",
    "variable": "var(--colors-color-palette-plain-destructive-active-bg)"
  },
  "colors.colorPalette.hig.plain.destructive.active.text": {
    "value": "var(--colors-color-palette-hig-plain-destructive-active-text)",
    "variable": "var(--colors-color-palette-hig-plain-destructive-active-text)"
  },
  "colors.colorPalette.plain.destructive.active.text": {
    "value": "var(--colors-color-palette-plain-destructive-active-text)",
    "variable": "var(--colors-color-palette-plain-destructive-active-text)"
  },
  "colors.colorPalette.hig.plain.destructive.active.border": {
    "value": "var(--colors-color-palette-hig-plain-destructive-active-border)",
    "variable": "var(--colors-color-palette-hig-plain-destructive-active-border)"
  },
  "colors.colorPalette.plain.destructive.active.border": {
    "value": "var(--colors-color-palette-plain-destructive-active-border)",
    "variable": "var(--colors-color-palette-plain-destructive-active-border)"
  },
  "colors.colorPalette.hig.plain.destructive.disabled.bg": {
    "value": "var(--colors-color-palette-hig-plain-destructive-disabled-bg)",
    "variable": "var(--colors-color-palette-hig-plain-destructive-disabled-bg)"
  },
  "colors.colorPalette.plain.destructive.disabled.bg": {
    "value": "var(--colors-color-palette-plain-destructive-disabled-bg)",
    "variable": "var(--colors-color-palette-plain-destructive-disabled-bg)"
  },
  "colors.colorPalette.hig.plain.destructive.disabled.text": {
    "value": "var(--colors-color-palette-hig-plain-destructive-disabled-text)",
    "variable": "var(--colors-color-palette-hig-plain-destructive-disabled-text)"
  },
  "colors.colorPalette.plain.destructive.disabled.text": {
    "value": "var(--colors-color-palette-plain-destructive-disabled-text)",
    "variable": "var(--colors-color-palette-plain-destructive-disabled-text)"
  },
  "colors.colorPalette.hig.plain.destructive.disabled.border": {
    "value": "var(--colors-color-palette-hig-plain-destructive-disabled-border)",
    "variable": "var(--colors-color-palette-hig-plain-destructive-disabled-border)"
  },
  "colors.colorPalette.plain.destructive.disabled.border": {
    "value": "var(--colors-color-palette-plain-destructive-disabled-border)",
    "variable": "var(--colors-color-palette-plain-destructive-disabled-border)"
  },
  "colors.colorPalette.hig.plain.destructive.focus.bg": {
    "value": "var(--colors-color-palette-hig-plain-destructive-focus-bg)",
    "variable": "var(--colors-color-palette-hig-plain-destructive-focus-bg)"
  },
  "colors.colorPalette.plain.destructive.focus.bg": {
    "value": "var(--colors-color-palette-plain-destructive-focus-bg)",
    "variable": "var(--colors-color-palette-plain-destructive-focus-bg)"
  },
  "colors.colorPalette.hig.plain.destructive.focus.text": {
    "value": "var(--colors-color-palette-hig-plain-destructive-focus-text)",
    "variable": "var(--colors-color-palette-hig-plain-destructive-focus-text)"
  },
  "colors.colorPalette.plain.destructive.focus.text": {
    "value": "var(--colors-color-palette-plain-destructive-focus-text)",
    "variable": "var(--colors-color-palette-plain-destructive-focus-text)"
  },
  "colors.colorPalette.hig.plain.destructive.focus.border": {
    "value": "var(--colors-color-palette-hig-plain-destructive-focus-border)",
    "variable": "var(--colors-color-palette-hig-plain-destructive-focus-border)"
  },
  "colors.colorPalette.plain.destructive.focus.border": {
    "value": "var(--colors-color-palette-plain-destructive-focus-border)",
    "variable": "var(--colors-color-palette-plain-destructive-focus-border)"
  },
  "colors.colorPalette.hig.plain.destructive.loading.bg": {
    "value": "var(--colors-color-palette-hig-plain-destructive-loading-bg)",
    "variable": "var(--colors-color-palette-hig-plain-destructive-loading-bg)"
  },
  "colors.colorPalette.plain.destructive.loading.bg": {
    "value": "var(--colors-color-palette-plain-destructive-loading-bg)",
    "variable": "var(--colors-color-palette-plain-destructive-loading-bg)"
  },
  "colors.colorPalette.hig.plain.destructive.loading.text": {
    "value": "var(--colors-color-palette-hig-plain-destructive-loading-text)",
    "variable": "var(--colors-color-palette-hig-plain-destructive-loading-text)"
  },
  "colors.colorPalette.plain.destructive.loading.text": {
    "value": "var(--colors-color-palette-plain-destructive-loading-text)",
    "variable": "var(--colors-color-palette-plain-destructive-loading-text)"
  },
  "colors.colorPalette.hig.plain.destructive.loading.border": {
    "value": "var(--colors-color-palette-hig-plain-destructive-loading-border)",
    "variable": "var(--colors-color-palette-hig-plain-destructive-loading-border)"
  },
  "colors.colorPalette.plain.destructive.loading.border": {
    "value": "var(--colors-color-palette-plain-destructive-loading-border)",
    "variable": "var(--colors-color-palette-plain-destructive-loading-border)"
  },
  "colors.colorPalette.dynamic": {
    "value": "var(--colors-color-palette-dynamic)",
    "variable": "var(--colors-color-palette-dynamic)"
  },
  "colors.colorPalette.primary._p3": {
    "value": "var(--colors-color-palette-primary-_p3)",
    "variable": "var(--colors-color-palette-primary-_p3)"
  },
  "colors.colorPalette.primary": {
    "value": "var(--colors-color-palette-primary)",
    "variable": "var(--colors-color-palette-primary)"
  },
  "colors.colorPalette.secondary._p3": {
    "value": "var(--colors-color-palette-secondary-_p3)",
    "variable": "var(--colors-color-palette-secondary-_p3)"
  },
  "colors.colorPalette.secondary": {
    "value": "var(--colors-color-palette-secondary)",
    "variable": "var(--colors-color-palette-secondary)"
  },
  "colors.colorPalette.success._p3": {
    "value": "var(--colors-color-palette-success-_p3)",
    "variable": "var(--colors-color-palette-success-_p3)"
  },
  "colors.colorPalette.success": {
    "value": "var(--colors-color-palette-success)",
    "variable": "var(--colors-color-palette-success)"
  },
  "colors.colorPalette.warning._p3": {
    "value": "var(--colors-color-palette-warning-_p3)",
    "variable": "var(--colors-color-palette-warning-_p3)"
  },
  "colors.colorPalette.warning": {
    "value": "var(--colors-color-palette-warning)",
    "variable": "var(--colors-color-palette-warning)"
  },
  "colors.colorPalette.danger._p3": {
    "value": "var(--colors-color-palette-danger-_p3)",
    "variable": "var(--colors-color-palette-danger-_p3)"
  },
  "colors.colorPalette.danger": {
    "value": "var(--colors-color-palette-danger)",
    "variable": "var(--colors-color-palette-danger)"
  },
  "colors.colorPalette.indigo._p3": {
    "value": "var(--colors-color-palette-indigo-_p3)",
    "variable": "var(--colors-color-palette-indigo-_p3)"
  },
  "colors.colorPalette.indigo": {
    "value": "var(--colors-color-palette-indigo)",
    "variable": "var(--colors-color-palette-indigo)"
  },
  "colors.colorPalette.teal._p3": {
    "value": "var(--colors-color-palette-teal-_p3)",
    "variable": "var(--colors-color-palette-teal-_p3)"
  },
  "colors.colorPalette.teal": {
    "value": "var(--colors-color-palette-teal)",
    "variable": "var(--colors-color-palette-teal)"
  },
  "colors.colorPalette.cyan._p3": {
    "value": "var(--colors-color-palette-cyan-_p3)",
    "variable": "var(--colors-color-palette-cyan-_p3)"
  },
  "colors.colorPalette.cyan": {
    "value": "var(--colors-color-palette-cyan)",
    "variable": "var(--colors-color-palette-cyan)"
  },
  "colors.colorPalette.mint._p3": {
    "value": "var(--colors-color-palette-mint-_p3)",
    "variable": "var(--colors-color-palette-mint-_p3)"
  },
  "colors.colorPalette.mint": {
    "value": "var(--colors-color-palette-mint)",
    "variable": "var(--colors-color-palette-mint)"
  },
  "colors.colorPalette.pink._p3": {
    "value": "var(--colors-color-palette-pink-_p3)",
    "variable": "var(--colors-color-palette-pink-_p3)"
  },
  "colors.colorPalette.pink": {
    "value": "var(--colors-color-palette-pink)",
    "variable": "var(--colors-color-palette-pink)"
  },
  "colors.colorPalette.yellow._p3": {
    "value": "var(--colors-color-palette-yellow-_p3)",
    "variable": "var(--colors-color-palette-yellow-_p3)"
  },
  "colors.colorPalette.yellow": {
    "value": "var(--colors-color-palette-yellow)",
    "variable": "var(--colors-color-palette-yellow)"
  },
  "colors.colorPalette.neonBlue._p3": {
    "value": "var(--colors-color-palette-neon-blue-_p3)",
    "variable": "var(--colors-color-palette-neon-blue-_p3)"
  },
  "colors.colorPalette.neonBlue": {
    "value": "var(--colors-color-palette-neon-blue)",
    "variable": "var(--colors-color-palette-neon-blue)"
  },
  "colors.colorPalette.vibrantPurple._p3": {
    "value": "var(--colors-color-palette-vibrant-purple-_p3)",
    "variable": "var(--colors-color-palette-vibrant-purple-_p3)"
  },
  "colors.colorPalette.vibrantPurple": {
    "value": "var(--colors-color-palette-vibrant-purple)",
    "variable": "var(--colors-color-palette-vibrant-purple)"
  },
  "colors.colorPalette.liquidTeal._p3": {
    "value": "var(--colors-color-palette-liquid-teal-_p3)",
    "variable": "var(--colors-color-palette-liquid-teal-_p3)"
  },
  "colors.colorPalette.liquidTeal": {
    "value": "var(--colors-color-palette-liquid-teal)",
    "variable": "var(--colors-color-palette-liquid-teal)"
  },
  "colors.colorPalette.glass.primary": {
    "value": "var(--colors-color-palette-glass-primary)",
    "variable": "var(--colors-color-palette-glass-primary)"
  },
  "colors.colorPalette.glass.secondary": {
    "value": "var(--colors-color-palette-glass-secondary)",
    "variable": "var(--colors-color-palette-glass-secondary)"
  },
  "colors.colorPalette.glass.muted": {
    "value": "var(--colors-color-palette-glass-muted)",
    "variable": "var(--colors-color-palette-glass-muted)"
  },
  "colors.colorPalette.muted": {
    "value": "var(--colors-color-palette-muted)",
    "variable": "var(--colors-color-palette-muted)"
  },
  "colors.colorPalette.glass.disabled": {
    "value": "var(--colors-color-palette-glass-disabled)",
    "variable": "var(--colors-color-palette-glass-disabled)"
  },
  "colors.colorPalette.disabled": {
    "value": "var(--colors-color-palette-disabled)",
    "variable": "var(--colors-color-palette-disabled)"
  },
  "colors.colorPalette.50": {
    "value": "var(--colors-color-palette-50)",
    "variable": "var(--colors-color-palette-50)"
  },
  "colors.colorPalette.100": {
    "value": "var(--colors-color-palette-100)",
    "variable": "var(--colors-color-palette-100)"
  },
  "colors.colorPalette.200": {
    "value": "var(--colors-color-palette-200)",
    "variable": "var(--colors-color-palette-200)"
  },
  "colors.colorPalette.300": {
    "value": "var(--colors-color-palette-300)",
    "variable": "var(--colors-color-palette-300)"
  },
  "colors.colorPalette.400": {
    "value": "var(--colors-color-palette-400)",
    "variable": "var(--colors-color-palette-400)"
  },
  "colors.colorPalette.500": {
    "value": "var(--colors-color-palette-500)",
    "variable": "var(--colors-color-palette-500)"
  },
  "colors.colorPalette.600": {
    "value": "var(--colors-color-palette-600)",
    "variable": "var(--colors-color-palette-600)"
  },
  "colors.colorPalette.700": {
    "value": "var(--colors-color-palette-700)",
    "variable": "var(--colors-color-palette-700)"
  },
  "colors.colorPalette.800": {
    "value": "var(--colors-color-palette-800)",
    "variable": "var(--colors-color-palette-800)"
  },
  "colors.colorPalette.900": {
    "value": "var(--colors-color-palette-900)",
    "variable": "var(--colors-color-palette-900)"
  },
  "colors.colorPalette.canvas": {
    "value": "var(--colors-color-palette-canvas)",
    "variable": "var(--colors-color-palette-canvas)"
  },
  "colors.colorPalette.surface": {
    "value": "var(--colors-color-palette-surface)",
    "variable": "var(--colors-color-palette-surface)"
  },
  "colors.colorPalette.subtle": {
    "value": "var(--colors-color-palette-subtle)",
    "variable": "var(--colors-color-palette-subtle)"
  },
  "colors.colorPalette.default": {
    "value": "var(--colors-color-palette-default)",
    "variable": "var(--colors-color-palette-default)"
  },
  "colors.colorPalette.hairline": {
    "value": "var(--colors-color-palette-hairline)",
    "variable": "var(--colors-color-palette-hairline)"
  },
  "colors.colorPalette.label": {
    "value": "var(--colors-color-palette-label)",
    "variable": "var(--colors-color-palette-label)"
  },
  "colors.colorPalette.secondaryLabel": {
    "value": "var(--colors-color-palette-secondary-label)",
    "variable": "var(--colors-color-palette-secondary-label)"
  },
  "colors.colorPalette.tertiaryLabel": {
    "value": "var(--colors-color-palette-tertiary-label)",
    "variable": "var(--colors-color-palette-tertiary-label)"
  },
  "colors.colorPalette.quaternaryLabel": {
    "value": "var(--colors-color-palette-quaternary-label)",
    "variable": "var(--colors-color-palette-quaternary-label)"
  },
  "colors.colorPalette.systemBackground": {
    "value": "var(--colors-color-palette-system-background)",
    "variable": "var(--colors-color-palette-system-background)"
  },
  "colors.colorPalette.secondarySystemBackground": {
    "value": "var(--colors-color-palette-secondary-system-background)",
    "variable": "var(--colors-color-palette-secondary-system-background)"
  },
  "colors.colorPalette.tertiarySystemBackground": {
    "value": "var(--colors-color-palette-tertiary-system-background)",
    "variable": "var(--colors-color-palette-tertiary-system-background)"
  },
  "colors.colorPalette.separator": {
    "value": "var(--colors-color-palette-separator)",
    "variable": "var(--colors-color-palette-separator)"
  },
  "colors.colorPalette.fill": {
    "value": "var(--colors-color-palette-fill)",
    "variable": "var(--colors-color-palette-fill)"
  },
  "colors.colorPalette.fillSecondary": {
    "value": "var(--colors-color-palette-fill-secondary)",
    "variable": "var(--colors-color-palette-fill-secondary)"
  },
  "colors.colorPalette.ultraThin._p3": {
    "value": "var(--colors-color-palette-ultra-thin-_p3)",
    "variable": "var(--colors-color-palette-ultra-thin-_p3)"
  },
  "colors.colorPalette.ultraThin": {
    "value": "var(--colors-color-palette-ultra-thin)",
    "variable": "var(--colors-color-palette-ultra-thin)"
  },
  "colors.colorPalette.thin._p3": {
    "value": "var(--colors-color-palette-thin-_p3)",
    "variable": "var(--colors-color-palette-thin-_p3)"
  },
  "colors.colorPalette.thin": {
    "value": "var(--colors-color-palette-thin)",
    "variable": "var(--colors-color-palette-thin)"
  },
  "colors.colorPalette.regular._p3": {
    "value": "var(--colors-color-palette-regular-_p3)",
    "variable": "var(--colors-color-palette-regular-_p3)"
  },
  "colors.colorPalette.regular": {
    "value": "var(--colors-color-palette-regular)",
    "variable": "var(--colors-color-palette-regular)"
  },
  "colors.colorPalette.thick._p3": {
    "value": "var(--colors-color-palette-thick-_p3)",
    "variable": "var(--colors-color-palette-thick-_p3)"
  },
  "colors.colorPalette.thick": {
    "value": "var(--colors-color-palette-thick)",
    "variable": "var(--colors-color-palette-thick)"
  },
  "colors.colorPalette.overlayLight._p3": {
    "value": "var(--colors-color-palette-overlay-light-_p3)",
    "variable": "var(--colors-color-palette-overlay-light-_p3)"
  },
  "colors.colorPalette.overlayLight": {
    "value": "var(--colors-color-palette-overlay-light)",
    "variable": "var(--colors-color-palette-overlay-light)"
  },
  "colors.colorPalette.overlayDark._p3": {
    "value": "var(--colors-color-palette-overlay-dark-_p3)",
    "variable": "var(--colors-color-palette-overlay-dark-_p3)"
  },
  "colors.colorPalette.overlayDark": {
    "value": "var(--colors-color-palette-overlay-dark)",
    "variable": "var(--colors-color-palette-overlay-dark)"
  },
  "colors.colorPalette.vibrancyUltraLight._p3": {
    "value": "var(--colors-color-palette-vibrancy-ultra-light-_p3)",
    "variable": "var(--colors-color-palette-vibrancy-ultra-light-_p3)"
  },
  "colors.colorPalette.vibrancyUltraLight": {
    "value": "var(--colors-color-palette-vibrancy-ultra-light)",
    "variable": "var(--colors-color-palette-vibrancy-ultra-light)"
  },
  "colors.colorPalette.vibrancyLight._p3": {
    "value": "var(--colors-color-palette-vibrancy-light-_p3)",
    "variable": "var(--colors-color-palette-vibrancy-light-_p3)"
  },
  "colors.colorPalette.vibrancyLight": {
    "value": "var(--colors-color-palette-vibrancy-light)",
    "variable": "var(--colors-color-palette-vibrancy-light)"
  },
  "colors.colorPalette.vibrancyMedium._p3": {
    "value": "var(--colors-color-palette-vibrancy-medium-_p3)",
    "variable": "var(--colors-color-palette-vibrancy-medium-_p3)"
  },
  "colors.colorPalette.vibrancyMedium": {
    "value": "var(--colors-color-palette-vibrancy-medium)",
    "variable": "var(--colors-color-palette-vibrancy-medium)"
  },
  "colors.colorPalette.vibrancyStrong._p3": {
    "value": "var(--colors-color-palette-vibrancy-strong-_p3)",
    "variable": "var(--colors-color-palette-vibrancy-strong-_p3)"
  },
  "colors.colorPalette.vibrancyStrong": {
    "value": "var(--colors-color-palette-vibrancy-strong)",
    "variable": "var(--colors-color-palette-vibrancy-strong)"
  },
  "colors.colorPalette.depthGradient._p3": {
    "value": "var(--colors-color-palette-depth-gradient-_p3)",
    "variable": "var(--colors-color-palette-depth-gradient-_p3)"
  },
  "colors.colorPalette.depthGradient": {
    "value": "var(--colors-color-palette-depth-gradient)",
    "variable": "var(--colors-color-palette-depth-gradient)"
  },
  "colors.colorPalette.shimmerOverlay._p3": {
    "value": "var(--colors-color-palette-shimmer-overlay-_p3)",
    "variable": "var(--colors-color-palette-shimmer-overlay-_p3)"
  },
  "colors.colorPalette.shimmerOverlay": {
    "value": "var(--colors-color-palette-shimmer-overlay)",
    "variable": "var(--colors-color-palette-shimmer-overlay)"
  },
  "colors.colorPalette.fg": {
    "value": "var(--colors-color-palette-fg)",
    "variable": "var(--colors-color-palette-fg)"
  }
}

export function token(path, fallback) {
  return tokens[path]?.value || fallback
}

function tokenVar(path, fallback) {
  return tokens[path]?.variable || fallback
}

token.var = tokenVar
import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  preflight: true,
  presets: ["@pandacss/preset-base", "@park-ui/panda-preset"],

  include: ["./libs/components/src/**/*.{js,jsx,ts,tsx}"],

  exclude: [],

  // Essential for component library build tools (tsup, bun, vite)
  outExtension: "js",

  theme: {
    extend: {
      tokens: {
        colors: {
          // Core Liquid Glass Colors from HTML demo
          glass: {
            // Base glass colors
            bg: { value: "rgba(255, 255, 255, 0.1)" },
            border: { value: "rgba(255, 255, 255, 0.2)" },
            ripple: { value: "rgba(255, 255, 255, 0.3)" },

            // Glass intensities (balanced for Apple-like translucency)
            subtle: {
              bg: { value: "rgba(255, 255, 255, 0.06)" },
              border: { value: "rgba(255, 255, 255, 0.12)" },
            },
            medium: {
              bg: { value: "rgba(255, 255, 255, 0.12)" },
              border: { value: "rgba(255, 255, 255, 0.22)" },
            },
            strong: {
              bg: { value: "rgba(255, 255, 255, 0.22)" },
              border: { value: "rgba(255, 255, 255, 0.34)" },
            },

            // Glass accent colors for interactive states (direct values to avoid circular refs)
            accent: {
              bg: { value: "{colors.accent.dynamic}" },
              border: { value: "{colors.accent.dynamic}" },
            },

            // Glass gradients for pseudo-elements
            gradients: {
              before: {
                value:
                  "linear-gradient(145deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(255, 255, 255, 0) 100%)",
              },
              after: {
                value:
                  "linear-gradient(145deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.02) 50%, rgba(0, 0, 0, 0.05) 100%)",
              },
            },
            liquid: {
              base: { value: "rgba(255,255,255,0.08)" },
              opacity: { value: "0.08" }, // Base opacity for liquid glass states
              blur: { value: "backdrop-filter: blur(12px)" },
              layers: {
                before: {
                  value:
                    "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 100%)",
                },
                after: {
                  value:
                    "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
                },
                glow: {
                  value: "box-shadow: inset 0 1px 0 rgba(255,255,255,0.2)",
                },
              },
            },
          },

          // Component Variants (Apple-inspired, token-driven)
          button: {
            // Primary actions use the Apple Blue accent, blended for glass context
            primary: {
              bg: {
                value:
                  "linear-gradient(135deg, color-mix(in oklch, {colors.accent.dynamic} 30%, transparent) 0%, color-mix(in oklch, {colors.accent.dynamic} 30%, transparent) 100%)",
              },
              border: {
                value:
                  "color-mix(in oklch, {colors.accent.dynamic} 50%, transparent)",
              },
            },
            // Neutral/glassy surface — keep mostly translucent
            secondary: {
              bg: { value: "{colors.glass.medium.bg}" },
              border: { value: "{colors.glass.medium.border}" },
            },
            ghost: {
              bg: { value: "transparent" },
              border: { value: "{colors.glass.subtle.border}" },
            },
            // Contextual accents mapped to Apple palette tokens
            danger: {
              bg: {
                value:
                  "linear-gradient(135deg, rgba(255, 59, 48, 0.30) 0%, rgba(255, 59, 48, 0.30) 100%)",
              },
              border: { value: "rgba(255, 59, 48, 0.50)" },
            },
            success: {
              bg: {
                value:
                  "linear-gradient(135deg, rgba(76, 217, 100, 0.30) 0%, rgba(76, 217, 100, 0.30) 100%)",
              },
              border: { value: "rgba(76, 217, 100, 0.50)" },
            },
            warning: {
              bg: {
                value:
                  "linear-gradient(135deg, rgba(255, 149, 0, 0.30) 0%, rgba(255, 149, 0, 0.30) 100%)",
              },
              border: { value: "rgba(255, 149, 0, 0.50)" },
            },

            // HIG-aligned scaffold: filled/tinted/plain × tones × states
            hig: {
              // Emphasis: filled
              filled: {
                accent: {
                  default: {
                    bg: {
                      value:
                        "color-mix(in oklch, {colors.accent.dynamic} 28%, transparent)",
                    },
                    text: { value: "{colors.text.glass.primary}" },
                    border: {
                      value:
                        "color-mix(in oklch, {colors.accent.dynamic} 55%, transparent)",
                    },
                  },
                  hover: {
                    bg: {
                      value:
                        "color-mix(in oklch, {colors.accent.dynamic} 36%, transparent)",
                    },
                    text: { value: "{colors.text.glass.primary}" },
                    border: {
                      value:
                        "color-mix(in oklch, {colors.accent.dynamic} 60%, transparent)",
                    },
                  },
                  active: {
                    bg: {
                      value:
                        "color-mix(in oklch, {colors.accent.dynamic} 42%, transparent)",
                    },
                    text: { value: "{colors.text.glass.primary}" },
                    border: {
                      value:
                        "color-mix(in oklch, {colors.accent.dynamic} 65%, transparent)",
                    },
                  },
                  disabled: {
                    bg: {
                      value:
                        "color-mix(in oklch, {colors.accent.dynamic} 18%, transparent)",
                    },
                    text: { value: "{colors.text.glass.disabled}" },
                    border: {
                      value:
                        "color-mix(in oklch, {colors.accent.dynamic} 35%, transparent)",
                    },
                  },
                  focus: {
                    bg: {
                      value:
                        "color-mix(in oklch, {colors.accent.dynamic} 32%, transparent)",
                    },
                    text: { value: "{colors.text.glass.primary}" },
                    border: { value: "{colors.accent.dynamic}" },
                  },
                  loading: {
                    bg: {
                      value:
                        "color-mix(in oklch, {colors.accent.dynamic} 28%, transparent)",
                    },
                    text: { value: "{colors.text.glass.primary}" },
                    border: {
                      value:
                        "color-mix(in oklch, {colors.accent.dynamic} 55%, transparent)",
                    },
                  },
                },
                neutral: {
                  default: {
                    bg: { value: "{colors.glass.medium.bg}" },
                    text: { value: "{colors.text.glass.primary}" },
                    border: { value: "{colors.glass.medium.border}" },
                  },
                  hover: {
                    bg: { value: "{colors.glass.strong.bg}" },
                    text: { value: "{colors.text.glass.primary}" },
                    border: { value: "{colors.glass.strong.border}" },
                  },
                  active: {
                    bg: {
                      value:
                        "color-mix(in oklch, #000 5%, {colors.glass.strong.bg})",
                    },
                    text: { value: "{colors.text.glass.primary}" },
                    border: { value: "{colors.glass.strong.border}" },
                  },
                  disabled: {
                    bg: { value: "{colors.glass.subtle.bg}" },
                    text: { value: "{colors.text.glass.disabled}" },
                    border: { value: "{colors.glass.subtle.border}" },
                  },
                  focus: {
                    bg: { value: "{colors.glass.medium.bg}" },
                    text: { value: "{colors.text.glass.primary}" },
                    border: { value: "{colors.accent.dynamic}" },
                  },
                  loading: {
                    bg: { value: "{colors.glass.medium.bg}" },
                    text: { value: "{colors.text.glass.primary}" },
                    border: { value: "{colors.glass.medium.border}" },
                  },
                },
                destructive: {
                  default: {
                    bg: {
                      value:
                        "color-mix(in oklch, {colors.accent.danger} 30%, transparent)",
                    },
                    text: { value: "{colors.text.glass.primary}" },
                    border: {
                      value:
                        "color-mix(in oklch, {colors.accent.danger} 55%, transparent)",
                    },
                  },
                  hover: {
                    bg: {
                      value:
                        "color-mix(in oklch, {colors.accent.danger} 36%, transparent)",
                    },
                    text: { value: "{colors.text.glass.primary}" },
                    border: {
                      value:
                        "color-mix(in oklch, {colors.accent.danger} 60%, transparent)",
                    },
                  },
                  active: {
                    bg: {
                      value:
                        "color-mix(in oklch, {colors.accent.danger} 42%, transparent)",
                    },
                    text: { value: "{colors.text.glass.primary}" },
                    border: {
                      value:
                        "color-mix(in oklch, {colors.accent.danger} 65%, transparent)",
                    },
                  },
                  disabled: {
                    bg: {
                      value:
                        "color-mix(in oklch, {colors.accent.danger} 18%, transparent)",
                    },
                    text: { value: "{colors.text.glass.disabled}" },
                    border: {
                      value:
                        "color-mix(in oklch, {colors.accent.danger} 35%, transparent)",
                    },
                  },
                  focus: {
                    bg: {
                      value:
                        "color-mix(in oklch, {colors.accent.danger} 32%, transparent)",
                    },
                    text: { value: "{colors.text.glass.primary}" },
                    border: { value: "{colors.accent.danger}" },
                  },
                  loading: {
                    bg: {
                      value:
                        "color-mix(in oklch, {colors.accent.danger} 30%, transparent)",
                    },
                    text: { value: "{colors.text.glass.primary}" },
                    border: {
                      value:
                        "color-mix(in oklch, {colors.accent.danger} 55%, transparent)",
                    },
                  },
                },
              },

              // Emphasis: tinted
              tinted: {
                accent: {
                  default: {
                    bg: {
                      value:
                        "color-mix(in oklch, {colors.accent.dynamic} 18%, transparent)",
                    },
                    text: { value: "{colors.text.glass.primary}" },
                    border: {
                      value:
                        "color-mix(in oklch, {colors.accent.dynamic} 35%, transparent)",
                    },
                  },
                  hover: {
                    bg: {
                      value:
                        "color-mix(in oklch, {colors.accent.dynamic} 24%, transparent)",
                    },
                    text: { value: "{colors.text.glass.primary}" },
                    border: {
                      value:
                        "color-mix(in oklch, {colors.accent.dynamic} 45%, transparent)",
                    },
                  },
                  active: {
                    bg: {
                      value:
                        "color-mix(in oklch, {colors.accent.dynamic} 28%, transparent)",
                    },
                    text: { value: "{colors.text.glass.primary}" },
                    border: {
                      value:
                        "color-mix(in oklch, {colors.accent.dynamic} 50%, transparent)",
                    },
                  },
                  disabled: {
                    bg: {
                      value:
                        "color-mix(in oklch, {colors.accent.dynamic} 12%, transparent)",
                    },
                    text: { value: "{colors.text.glass.disabled}" },
                    border: {
                      value:
                        "color-mix(in oklch, {colors.accent.dynamic} 25%, transparent)",
                    },
                  },
                  focus: {
                    bg: {
                      value:
                        "color-mix(in oklch, {colors.accent.dynamic} 20%, transparent)",
                    },
                    text: { value: "{colors.text.glass.primary}" },
                    border: { value: "{colors.accent.dynamic}" },
                  },
                  loading: {
                    bg: {
                      value:
                        "color-mix(in oklch, {colors.accent.dynamic} 18%, transparent)",
                    },
                    text: { value: "{colors.text.glass.primary}" },
                    border: {
                      value:
                        "color-mix(in oklch, {colors.accent.dynamic} 35%, transparent)",
                    },
                  },
                },
                neutral: {
                  default: {
                    bg: { value: "{colors.glass.subtle.bg}" },
                    text: { value: "{colors.text.glass.primary}" },
                    border: { value: "{colors.glass.subtle.border}" },
                  },
                  hover: {
                    bg: { value: "{colors.glass.medium.bg}" },
                    text: { value: "{colors.text.glass.primary}" },
                    border: { value: "{colors.glass.medium.border}" },
                  },
                  active: {
                    bg: { value: "{colors.glass.strong.bg}" },
                    text: { value: "{colors.text.glass.primary}" },
                    border: { value: "{colors.glass.strong.border}" },
                  },
                  disabled: {
                    bg: { value: "{colors.glass.subtle.bg}" },
                    text: { value: "{colors.text.glass.disabled}" },
                    border: { value: "{colors.glass.subtle.border}" },
                  },
                  focus: {
                    bg: { value: "{colors.glass.medium.bg}" },
                    text: { value: "{colors.text.glass.primary}" },
                    border: { value: "{colors.accent.dynamic}" },
                  },
                  loading: {
                    bg: { value: "{colors.glass.subtle.bg}" },
                    text: { value: "{colors.text.glass.primary}" },
                    border: { value: "{colors.glass.subtle.border}" },
                  },
                },
                destructive: {
                  default: {
                    bg: {
                      value:
                        "color-mix(in oklch, {colors.accent.danger} 18%, transparent)",
                    },
                    text: { value: "{colors.text.glass.primary}" },
                    border: {
                      value:
                        "color-mix(in oklch, {colors.accent.danger} 35%, transparent)",
                    },
                  },
                  hover: {
                    bg: {
                      value:
                        "color-mix(in oklch, {colors.accent.danger} 24%, transparent)",
                    },
                    text: { value: "{colors.text.glass.primary}" },
                    border: {
                      value:
                        "color-mix(in oklch, {colors.accent.danger} 45%, transparent)",
                    },
                  },
                  active: {
                    bg: {
                      value:
                        "color-mix(in oklch, {colors.accent.danger} 28%, transparent)",
                    },
                    text: { value: "{colors.text.glass.primary}" },
                    border: {
                      value:
                        "color-mix(in oklch, {colors.accent.danger} 50%, transparent)",
                    },
                  },
                  disabled: {
                    bg: {
                      value:
                        "color-mix(in oklch, {colors.accent.danger} 12%, transparent)",
                    },
                    text: { value: "{colors.text.glass.disabled}" },
                    border: {
                      value:
                        "color-mix(in oklch, {colors.accent.danger} 25%, transparent)",
                    },
                  },
                  focus: {
                    bg: {
                      value:
                        "color-mix(in oklch, {colors.accent.danger} 20%, transparent)",
                    },
                    text: { value: "{colors.text.glass.primary}" },
                    border: { value: "{colors.accent.danger}" },
                  },
                  loading: {
                    bg: {
                      value:
                        "color-mix(in oklch, {colors.accent.danger} 18%, transparent)",
                    },
                    text: { value: "{colors.text.glass.primary}" },
                    border: {
                      value:
                        "color-mix(in oklch, {colors.accent.danger} 35%, transparent)",
                    },
                  },
                },
              },

              // Emphasis: plain
              plain: {
                accent: {
                  default: {
                    bg: { value: "transparent" },
                    text: { value: "{colors.text.glass.primary}" },
                    border: { value: "{colors.glass.subtle.border}" },
                  },
                  hover: {
                    bg: { value: "{colors.glass.subtle.bg}" },
                    text: { value: "{colors.text.glass.primary}" },
                    border: { value: "{colors.glass.subtle.border}" },
                  },
                  active: {
                    bg: { value: "{colors.glass.medium.bg}" },
                    text: { value: "{colors.text.glass.primary}" },
                    border: { value: "{colors.glass.medium.border}" },
                  },
                  disabled: {
                    bg: { value: "transparent" },
                    text: { value: "{colors.text.glass.disabled}" },
                    border: { value: "{colors.glass.subtle.border}" },
                  },
                  focus: {
                    bg: { value: "transparent" },
                    text: { value: "{colors.text.glass.primary}" },
                    border: { value: "{colors.accent.dynamic}" },
                  },
                  loading: {
                    bg: { value: "transparent" },
                    text: { value: "{colors.text.glass.primary}" },
                    border: { value: "{colors.glass.subtle.border}" },
                  },
                },
                neutral: {
                  default: {
                    bg: { value: "transparent" },
                    text: { value: "{colors.text.glass.primary}" },
                    border: { value: "{colors.glass.subtle.border}" },
                  },
                  hover: {
                    bg: { value: "{colors.glass.subtle.bg}" },
                    text: { value: "{colors.text.glass.primary}" },
                    border: { value: "{colors.glass.subtle.border}" },
                  },
                  active: {
                    bg: { value: "{colors.glass.medium.bg}" },
                    text: { value: "{colors.text.glass.primary}" },
                    border: { value: "{colors.glass.medium.border}" },
                  },
                  disabled: {
                    bg: { value: "transparent" },
                    text: { value: "{colors.text.glass.disabled}" },
                    border: { value: "{colors.glass.subtle.border}" },
                  },
                  focus: {
                    bg: { value: "transparent" },
                    text: { value: "{colors.text.glass.primary}" },
                    border: { value: "{colors.accent.dynamic}" },
                  },
                  loading: {
                    bg: { value: "transparent" },
                    text: { value: "{colors.text.glass.primary}" },
                    border: { value: "{colors.glass.subtle.border}" },
                  },
                },
                destructive: {
                  default: {
                    bg: { value: "transparent" },
                    text: { value: "{colors.text.glass.primary}" },
                    border: { value: "{colors.glass.subtle.border}" },
                  },
                  hover: {
                    bg: { value: "{colors.glass.subtle.bg}" },
                    text: { value: "{colors.text.glass.primary}" },
                    border: { value: "{colors.glass.subtle.border}" },
                  },
                  active: {
                    bg: { value: "{colors.glass.medium.bg}" },
                    text: { value: "{colors.text.glass.primary}" },
                    border: { value: "{colors.glass.medium.border}" },
                  },
                  disabled: {
                    bg: { value: "transparent" },
                    text: { value: "{colors.text.glass.disabled}" },
                    border: { value: "{colors.glass.subtle.border}" },
                  },
                  focus: {
                    bg: { value: "transparent" },
                    text: { value: "{colors.text.glass.primary}" },
                    border: { value: "{colors.accent.danger}" },
                  },
                  loading: {
                    bg: { value: "transparent" },
                    text: { value: "{colors.text.glass.primary}" },
                    border: { value: "{colors.glass.subtle.border}" },
                  },
                },
              },
            },

            // Alias tokens for HIG button variants (filled/tinted/plain)
            filled: {
              accent: {
                default: {
                  bg: { value: "{colors.button.hig.filled.accent.default.bg}" },
                  text: {
                    value: "{colors.button.hig.filled.accent.default.text}",
                  },
                  border: {
                    value: "{colors.button.hig.filled.accent.default.border}",
                  },
                },
                hover: {
                  bg: { value: "{colors.button.hig.filled.accent.hover.bg}" },
                  text: {
                    value: "{colors.button.hig.filled.accent.hover.text}",
                  },
                  border: {
                    value: "{colors.button.hig.filled.accent.hover.border}",
                  },
                },
                active: {
                  bg: { value: "{colors.button.hig.filled.accent.active.bg}" },
                  text: {
                    value: "{colors.button.hig.filled.accent.active.text}",
                  },
                  border: {
                    value: "{colors.button.hig.filled.accent.active.border}",
                  },
                },
                disabled: {
                  bg: {
                    value: "{colors.button.hig.filled.accent.disabled.bg}",
                  },
                  text: {
                    value: "{colors.button.hig.filled.accent.disabled.text}",
                  },
                  border: {
                    value: "{colors.button.hig.filled.accent.disabled.border}",
                  },
                },
                focus: {
                  bg: { value: "{colors.button.hig.filled.accent.focus.bg}" },
                  text: {
                    value: "{colors.button.hig.filled.accent.focus.text}",
                  },
                  border: {
                    value: "{colors.button.hig.filled.accent.focus.border}",
                  },
                },
                loading: {
                  bg: { value: "{colors.button.hig.filled.accent.loading.bg}" },
                  text: {
                    value: "{colors.button.hig.filled.accent.loading.text}",
                  },
                  border: {
                    value: "{colors.button.hig.filled.accent.loading.border}",
                  },
                },
              },
              neutral: {
                default: {
                  bg: {
                    value: "{colors.button.hig.filled.neutral.default.bg}",
                  },
                  text: {
                    value: "{colors.button.hig.filled.neutral.default.text}",
                  },
                  border: {
                    value: "{colors.button.hig.filled.neutral.default.border}",
                  },
                },
                hover: {
                  bg: { value: "{colors.button.hig.filled.neutral.hover.bg}" },
                  text: {
                    value: "{colors.button.hig.filled.neutral.hover.text}",
                  },
                  border: {
                    value: "{colors.button.hig.filled.neutral.hover.border}",
                  },
                },
                active: {
                  bg: { value: "{colors.button.hig.filled.neutral.active.bg}" },
                  text: {
                    value: "{colors.button.hig.filled.neutral.active.text}",
                  },
                  border: {
                    value: "{colors.button.hig.filled.neutral.active.border}",
                  },
                },
                disabled: {
                  bg: {
                    value: "{colors.button.hig.filled.neutral.disabled.bg}",
                  },
                  text: {
                    value: "{colors.button.hig.filled.neutral.disabled.text}",
                  },
                  border: {
                    value: "{colors.button.hig.filled.neutral.disabled.border}",
                  },
                },
                focus: {
                  bg: { value: "{colors.button.hig.filled.neutral.focus.bg}" },
                  text: {
                    value: "{colors.button.hig.filled.neutral.focus.text}",
                  },
                  border: {
                    value: "{colors.button.hig.filled.neutral.focus.border}",
                  },
                },
                loading: {
                  bg: {
                    value: "{colors.button.hig.filled.neutral.loading.bg}",
                  },
                  text: {
                    value: "{colors.button.hig.filled.neutral.loading.text}",
                  },
                  border: {
                    value: "{colors.button.hig.filled.neutral.loading.border}",
                  },
                },
              },
              destructive: {
                default: {
                  bg: {
                    value: "{colors.button.hig.filled.destructive.default.bg}",
                  },
                  text: {
                    value:
                      "{colors.button.hig.filled.destructive.default.text}",
                  },
                  border: {
                    value:
                      "{colors.button.hig.filled.destructive.default.border}",
                  },
                },
                hover: {
                  bg: {
                    value: "{colors.button.hig.filled.destructive.hover.bg}",
                  },
                  text: {
                    value: "{colors.button.hig.filled.destructive.hover.text}",
                  },
                  border: {
                    value:
                      "{colors.button.hig.filled.destructive.hover.border}",
                  },
                },
                active: {
                  bg: {
                    value: "{colors.button.hig.filled.destructive.active.bg}",
                  },
                  text: {
                    value: "{colors.button.hig.filled.destructive.active.text}",
                  },
                  border: {
                    value:
                      "{colors.button.hig.filled.destructive.active.border}",
                  },
                },
                disabled: {
                  bg: {
                    value: "{colors.button.hig.filled.destructive.disabled.bg}",
                  },
                  text: {
                    value:
                      "{colors.button.hig.filled.destructive.disabled.text}",
                  },
                  border: {
                    value:
                      "{colors.button.hig.filled.destructive.disabled.border}",
                  },
                },
                focus: {
                  bg: {
                    value: "{colors.button.hig.filled.destructive.focus.bg}",
                  },
                  text: {
                    value: "{colors.button.hig.filled.destructive.focus.text}",
                  },
                  border: {
                    value:
                      "{colors.button.hig.filled.destructive.focus.border}",
                  },
                },
                loading: {
                  bg: {
                    value: "{colors.button.hig.filled.destructive.loading.bg}",
                  },
                  text: {
                    value:
                      "{colors.button.hig.filled.destructive.loading.text}",
                  },
                  border: {
                    value:
                      "{colors.button.hig.filled.destructive.loading.border}",
                  },
                },
              },
            },

            tinted: {
              accent: {
                default: {
                  bg: { value: "{colors.button.hig.tinted.accent.default.bg}" },
                  text: {
                    value: "{colors.button.hig.tinted.accent.default.text}",
                  },
                  border: {
                    value: "{colors.button.hig.tinted.accent.default.border}",
                  },
                },
                hover: {
                  bg: { value: "{colors.button.hig.tinted.accent.hover.bg}" },
                  text: {
                    value: "{colors.button.hig.tinted.accent.hover.text}",
                  },
                  border: {
                    value: "{colors.button.hig.tinted.accent.hover.border}",
                  },
                },
                active: {
                  bg: { value: "{colors.button.hig.tinted.accent.active.bg}" },
                  text: {
                    value: "{colors.button.hig.tinted.accent.active.text}",
                  },
                  border: {
                    value: "{colors.button.hig.tinted.accent.active.border}",
                  },
                },
                disabled: {
                  bg: {
                    value: "{colors.button.hig.tinted.accent.disabled.bg}",
                  },
                  text: {
                    value: "{colors.button.hig.tinted.accent.disabled.text}",
                  },
                  border: {
                    value: "{colors.button.hig.tinted.accent.disabled.border}",
                  },
                },
                focus: {
                  bg: { value: "{colors.button.hig.tinted.accent.focus.bg}" },
                  text: {
                    value: "{colors.button.hig.tinted.accent.focus.text}",
                  },
                  border: {
                    value: "{colors.button.hig.tinted.accent.focus.border}",
                  },
                },
                loading: {
                  bg: { value: "{colors.button.hig.tinted.accent.loading.bg}" },
                  text: {
                    value: "{colors.button.hig.tinted.accent.loading.text}",
                  },
                  border: {
                    value: "{colors.button.hig.tinted.accent.loading.border}",
                  },
                },
              },
              neutral: {
                default: {
                  bg: {
                    value: "{colors.button.hig.tinted.neutral.default.bg}",
                  },
                  text: {
                    value: "{colors.button.hig.tinted.neutral.default.text}",
                  },
                  border: {
                    value: "{colors.button.hig.tinted.neutral.default.border}",
                  },
                },
                hover: {
                  bg: { value: "{colors.button.hig.tinted.neutral.hover.bg}" },
                  text: {
                    value: "{colors.button.hig.tinted.neutral.hover.text}",
                  },
                  border: {
                    value: "{colors.button.hig.tinted.neutral.hover.border}",
                  },
                },
                active: {
                  bg: { value: "{colors.button.hig.tinted.neutral.active.bg}" },
                  text: {
                    value: "{colors.button.hig.tinted.neutral.active.text}",
                  },
                  border: {
                    value: "{colors.button.hig.tinted.neutral.active.border}",
                  },
                },
                disabled: {
                  bg: {
                    value: "{colors.button.hig.tinted.neutral.disabled.bg}",
                  },
                  text: {
                    value: "{colors.button.hig.tinted.neutral.disabled.text}",
                  },
                  border: {
                    value: "{colors.button.hig.tinted.neutral.disabled.border}",
                  },
                },
                focus: {
                  bg: { value: "{colors.button.hig.tinted.neutral.focus.bg}" },
                  text: {
                    value: "{colors.button.hig.tinted.neutral.focus.text}",
                  },
                  border: {
                    value: "{colors.button.hig.tinted.neutral.focus.border}",
                  },
                },
                loading: {
                  bg: {
                    value: "{colors.button.hig.tinted.neutral.loading.bg}",
                  },
                  text: {
                    value: "{colors.button.hig.tinted.neutral.loading.text}",
                  },
                  border: {
                    value: "{colors.button.hig.tinted.neutral.loading.border}",
                  },
                },
              },
              destructive: {
                default: {
                  bg: {
                    value: "{colors.button.hig.tinted.destructive.default.bg}",
                  },
                  text: {
                    value:
                      "{colors.button.hig.tinted.destructive.default.text}",
                  },
                  border: {
                    value:
                      "{colors.button.hig.tinted.destructive.default.border}",
                  },
                },
                hover: {
                  bg: {
                    value: "{colors.button.hig.tinted.destructive.hover.bg}",
                  },
                  text: {
                    value: "{colors.button.hig.tinted.destructive.hover.text}",
                  },
                  border: {
                    value:
                      "{colors.button.hig.tinted.destructive.hover.border}",
                  },
                },
                active: {
                  bg: {
                    value: "{colors.button.hig.tinted.destructive.active.bg}",
                  },
                  text: {
                    value: "{colors.button.hig.tinted.destructive.active.text}",
                  },
                  border: {
                    value:
                      "{colors.button.hig.tinted.destructive.active.border}",
                  },
                },
                disabled: {
                  bg: {
                    value: "{colors.button.hig.tinted.destructive.disabled.bg}",
                  },
                  text: {
                    value:
                      "{colors.button.hig.tinted.destructive.disabled.text}",
                  },
                  border: {
                    value:
                      "{colors.button.hig.tinted.destructive.disabled.border}",
                  },
                },
                focus: {
                  bg: {
                    value: "{colors.button.hig.tinted.destructive.focus.bg}",
                  },
                  text: {
                    value: "{colors.button.hig.tinted.destructive.focus.text}",
                  },
                  border: {
                    value:
                      "{colors.button.hig.tinted.destructive.focus.border}",
                  },
                },
                loading: {
                  bg: {
                    value: "{colors.button.hig.tinted.destructive.loading.bg}",
                  },
                  text: {
                    value:
                      "{colors.button.hig.tinted.destructive.loading.text}",
                  },
                  border: {
                    value:
                      "{colors.button.hig.tinted.destructive.loading.border}",
                  },
                },
              },
            },

            plain: {
              accent: {
                default: {
                  bg: { value: "{colors.button.hig.plain.accent.default.bg}" },
                  text: {
                    value: "{colors.button.hig.plain.accent.default.text}",
                  },
                  border: {
                    value: "{colors.button.hig.plain.accent.default.border}",
                  },
                },
                hover: {
                  bg: { value: "{colors.button.hig.plain.accent.hover.bg}" },
                  text: {
                    value: "{colors.button.hig.plain.accent.hover.text}",
                  },
                  border: {
                    value: "{colors.button.hig.plain.accent.hover.border}",
                  },
                },
                active: {
                  bg: { value: "{colors.button.hig.plain.accent.active.bg}" },
                  text: {
                    value: "{colors.button.hig.plain.accent.active.text}",
                  },
                  border: {
                    value: "{colors.button.hig.plain.accent.active.border}",
                  },
                },
                disabled: {
                  bg: { value: "{colors.button.hig.plain.accent.disabled.bg}" },
                  text: {
                    value: "{colors.button.hig.plain.accent.disabled.text}",
                  },
                  border: {
                    value: "{colors.button.hig.plain.accent.disabled.border}",
                  },
                },
                focus: {
                  bg: { value: "{colors.button.hig.plain.accent.focus.bg}" },
                  text: {
                    value: "{colors.button.hig.plain.accent.focus.text}",
                  },
                  border: {
                    value: "{colors.button.hig.plain.accent.focus.border}",
                  },
                },
                loading: {
                  bg: { value: "{colors.button.hig.plain.accent.loading.bg}" },
                  text: {
                    value: "{colors.button.hig.plain.accent.loading.text}",
                  },
                  border: {
                    value: "{colors.button.hig.plain.accent.loading.border}",
                  },
                },
              },
              neutral: {
                default: {
                  bg: { value: "{colors.button.hig.plain.neutral.default.bg}" },
                  text: {
                    value: "{colors.button.hig.plain.neutral.default.text}",
                  },
                  border: {
                    value: "{colors.button.hig.plain.neutral.default.border}",
                  },
                },
                hover: {
                  bg: { value: "{colors.button.hig.plain.neutral.hover.bg}" },
                  text: {
                    value: "{colors.button.hig.plain.neutral.hover.text}",
                  },
                  border: {
                    value: "{colors.button.hig.plain.neutral.hover.border}",
                  },
                },
                active: {
                  bg: { value: "{colors.button.hig.plain.neutral.active.bg}" },
                  text: {
                    value: "{colors.button.hig.plain.neutral.active.text}",
                  },
                  border: {
                    value: "{colors.button.hig.plain.neutral.active.border}",
                  },
                },
                disabled: {
                  bg: {
                    value: "{colors.button.hig.plain.neutral.disabled.bg}",
                  },
                  text: {
                    value: "{colors.button.hig.plain.neutral.disabled.text}",
                  },
                  border: {
                    value: "{colors.button.hig.plain.neutral.disabled.border}",
                  },
                },
                focus: {
                  bg: { value: "{colors.button.hig.plain.neutral.focus.bg}" },
                  text: {
                    value: "{colors.button.hig.plain.neutral.focus.text}",
                  },
                  border: {
                    value: "{colors.button.hig.plain.neutral.focus.border}",
                  },
                },
                loading: {
                  bg: { value: "{colors.button.hig.plain.neutral.loading.bg}" },
                  text: {
                    value: "{colors.button.hig.plain.neutral.loading.text}",
                  },
                  border: {
                    value: "{colors.button.hig.plain.neutral.loading.border}",
                  },
                },
              },
              destructive: {
                default: {
                  bg: {
                    value: "{colors.button.hig.plain.destructive.default.bg}",
                  },
                  text: {
                    value: "{colors.button.hig.plain.destructive.default.text}",
                  },
                  border: {
                    value:
                      "{colors.button.hig.plain.destructive.default.border}",
                  },
                },
                hover: {
                  bg: {
                    value: "{colors.button.hig.plain.destructive.hover.bg}",
                  },
                  text: {
                    value: "{colors.button.hig.plain.destructive.hover.text}",
                  },
                  border: {
                    value: "{colors.button.hig.plain.destructive.hover.border}",
                  },
                },
                active: {
                  bg: {
                    value: "{colors.button.hig.plain.destructive.active.bg}",
                  },
                  text: {
                    value: "{colors.button.hig.plain.destructive.active.text}",
                  },
                  border: {
                    value:
                      "{colors.button.hig.plain.destructive.active.border}",
                  },
                },
                disabled: {
                  bg: {
                    value: "{colors.button.hig.plain.destructive.disabled.bg}",
                  },
                  text: {
                    value:
                      "{colors.button.hig.plain.destructive.disabled.text}",
                  },
                  border: {
                    value:
                      "{colors.button.hig.plain.destructive.disabled.border}",
                  },
                },
                focus: {
                  bg: {
                    value: "{colors.button.hig.plain.destructive.focus.bg}",
                  },
                  text: {
                    value: "{colors.button.hig.plain.destructive.focus.text}",
                  },
                  border: {
                    value: "{colors.button.hig.plain.destructive.focus.border}",
                  },
                },
                loading: {
                  bg: {
                    value: "{colors.button.hig.plain.destructive.loading.bg}",
                  },
                  text: {
                    value: "{colors.button.hig.plain.destructive.loading.text}",
                  },
                  border: {
                    value:
                      "{colors.button.hig.plain.destructive.loading.border}",
                  },
                },
              },
            },
          },

          // Apple System Accents (exact Apple system colors)
          accent: {
            // Dynamic accent – driven by CSS var with Apple Blue fallback
            dynamic: { value: "var(--ui-accent, #007AFF)" },
            // Blue — iOS/macOS system blue (exact Apple color)
            primary: { value: "#007AFF" },
            // Purple — iOS/macOS system purple
            secondary: { value: "#5856D6" },
            // Green — iOS/macOS system green
            success: { value: "#34C759" },
            // Orange — iOS/macOS system orange
            warning: { value: "#FF9500" },
            // Red — iOS/macOS system red
            danger: { value: "#FF3B30" },
            // Additional Apple system colors
            indigo: { value: "#5856D6" },
            teal: { value: "#5AC8FA" },
            cyan: { value: "#32D74B" },
            mint: { value: "#00C7BE" },
            pink: { value: "#FF2D92" },
            yellow: { value: "#FFCC00" },
          },

          // Text colors for glass components
          text: {
            glass: {
              primary: { value: "rgba(255, 255, 255, 1)" },
              secondary: { value: "rgba(255, 255, 255, 0.9)" },
              muted: { value: "rgba(255, 255, 255, 0.7)" },
              disabled: { value: "rgba(255, 255, 255, 0.5)" },
            },
          },
          // Apple system grays (exact HIG specifications)
          gray: {
            50: { value: "#FAFAFA" },
            100: { value: "#F5F5F7" },
            200: { value: "#E5E5EA" },
            300: { value: "#D1D1D6" },
            400: { value: "#C7C7CC" },
            500: { value: "#AEAEB2" },
            600: { value: "#8E8E93" },
            700: { value: "#636366" },
            800: { value: "#48484A" },
            900: { value: "#1C1C1E" },
          },
          // Apple system colors (exact values)
          blue: {
            100: { value: "#D1E9FF" },
            500: { value: "#007AFF" },
            600: { value: "#0056CC" },
          },
          indigo: {
            100: { value: "#D1D1FF" },
            500: { value: "#5856D6" },
            600: { value: "#3634A3" },
          },
          teal: {
            100: { value: "#B8F2FF" },
            500: { value: "#5AC8FA" },
            600: { value: "#0A84FF" },
          },
          green: {
            100: { value: "#D8F5A2" },
            500: { value: "#34C759" },
            600: { value: "#248A3D" },
          },
          orange: {
            100: { value: "#FFE5B4" },
            500: { value: "#FF9500" },
            600: { value: "#C93400" },
          },
          pink: {
            100: { value: "#FFD1DC" },
            500: { value: "#FF2D92" },
            600: { value: "#D70015" },
          },
          // Surface tiers and borders (light defaults; override per app theme if needed)
          bg: {
            canvas: { value: "{colors.gray.50}" },
            surface: { value: "{colors.gray.100}" },
            subtle: { value: "#F2F3F5" },
          },
          border: {
            default: { value: "{colors.gray.200}" },
            hairline: {
              value: "color-mix(in oklch, #000 10%, transparent)",
            },
          },
          // System semantic colors (Apple HIG)
          semantic: {
            label: { value: "rgba(0, 0, 0, 0.92)" },
            secondaryLabel: { value: "rgba(0, 0, 0, 0.6)" },
            tertiaryLabel: { value: "rgba(0, 0, 0, 0.3)" },
            quaternaryLabel: { value: "rgba(0, 0, 0, 0.18)" },
            systemBackground: { value: "{colors.bg.canvas}" },
            secondarySystemBackground: { value: "{colors.bg.surface}" },
            tertiarySystemBackground: { value: "{colors.bg.subtle}" },
            separator: { value: "color-mix(in oklch, #000 10%, transparent)" },
            fill: { value: "color-mix(in oklch, #000 5%, transparent)" },
            fillSecondary: {
              value: "color-mix(in oklch, #000 10%, transparent)",
            },
          },
          // Material tiers and vibrancy overlays
          materials: {
            ultraThin: { value: "rgba(255, 255, 255, 0.06)" },
            thin: { value: "rgba(255, 255, 255, 0.12)" },
            regular: { value: "rgba(255, 255, 255, 0.2)" },
            thick: { value: "rgba(255, 255, 255, 0.28)" },
            overlayLight: {
              value:
                "linear-gradient(145deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 50%, transparent 100%)",
            },
            overlayDark: {
              value:
                "linear-gradient(145deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.06) 50%, transparent 100%)",
            },
          },
          selection: {
            bg: {
              value:
                "color-mix(in oklch, {colors.accent.dynamic} 40%, transparent)",
            },
            fg: { value: "{colors.text.glass.primary}" },
          },
        },

        // Apple-exact border radius system (matches iOS/macOS HIG)
        radii: {
          // Base radius values (Apple standard)
          none: { value: "0px" },
          xs: { value: "4px" }, // Small elements
          sm: { value: "6px" }, // Compact buttons, badges
          md: { value: "8px" }, // Standard buttons, controls
          lg: { value: "12px" }, // Cards, input fields
          xl: { value: "16px" }, // Large cards, sheets
          "2xl": { value: "20px" }, // Very large surfaces
          "3xl": { value: "24px" }, // Hero elements
          full: { value: "9999px" },

          // Apple-specific component roles (exact HIG compliance)
          roles: {
            // Buttons: capsule rounding for standard/large; compact keeps a readable curve
            button: { value: "{radii.full}" },
            buttonCompact: { value: "14px" },
            buttonLarge: { value: "{radii.full}" },
            // Generic small pressables
            control: { value: "14px" },

            // Input fields
            field: { value: "14px" },
            fieldLarge: { value: "16px" },

            // Cards and surfaces
            card: { value: "26px" },
            cardLarge: { value: "26px" },

            // Sheets and modals
            sheet: { value: "26px" },
            modal: { value: "26px" },

            // Pills and badges (full radius)
            pill: { value: "{radii.full}" },
            badge: { value: "{radii.full}" },
          },

          // Glass-specific radius tokens (inherits Apple standards)
          button: {
            default: {
              value:
                "0 6px 16px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.25)",
            },
            hover: {
              value:
                "0 10px 28px rgba(0, 0, 0, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
            },
            active: {
              value:
                "0 3px 8px rgba(0, 0, 0, 0.15), inset 0 2px 4px rgba(0, 0, 0, 0.15)",
            },
          },
          glass: {
            xs: { value: "{radii.xs}" },
            sm: { value: "{radii.sm}" },
            md: { value: "{radii.md}" },
            lg: { value: "{radii.lg}" },
            xl: { value: "{radii.xl}" },
            "2xl": { value: "{radii.2xl}" },
            "3xl": { value: "{radii.3xl}" },
            full: { value: "{radii.full}" },
          },
        },

        // Blur effects
        blurs: {
          glass: {
            sm: { value: "5px" },
            md: { value: "10px" },
            lg: { value: "20px" },
            xl: { value: "30px" },
          },
        },

        // Complete shadow system from HTML demo
        shadows: {
          button: {
            default: { value: "{shadows.glass.base}" },
            hover: { value: "{shadows.glass.hover}" },
            active: { value: "{shadows.glass.sm}" },
            focus: { value: "{shadows.glass.md}" },
          },
          glass: {
            // Main glass shadow from HTML demo
            base: {
              value:
                "0 12px 40px rgba(0, 0, 0, 0.15), inset 0 2px 4px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.4), inset 0 -1px 0 rgba(0, 0, 0, 0.15), 0 0 20px rgba(255, 255, 255, 0.1)",
            },
            sm: {
              value:
                "0 4px 6px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
            },
            md: {
              value:
                "0 12px 40px rgba(0, 0, 0, 0.15), inset 0 2px 4px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.4), inset 0 -1px 0 rgba(0, 0, 0, 0.15), 0 0 20px rgba(255, 255, 255, 0.1)",
            },
            lg: {
              value:
                "0 16px 50px rgba(0, 0, 0, 0.2), inset 0 2px 4px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.5), inset 0 -1px 0 rgba(0, 0, 0, 0.15), 0 0 30px rgba(255, 255, 255, 0.15)",
            },
            // Hover state shadow
            hover: {
              value:
                "0 16px 50px rgba(0, 0, 0, 0.2), inset 0 2px 4px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.5), inset 0 -1px 0 rgba(0, 0, 0, 0.15), 0 0 30px rgba(255, 255, 255, 0.15)",
            },
          },
        },

        // Animation durations
        durations: {
          button: {
            hover: { value: "{durations.glass.flow}" },
            press: { value: "{durations.glass.instant}" },
            focus: { value: "{durations.glass.flow}" },
          },

          glass: {
            flow: { value: "0.8s" },
            bounce: { value: "0.6s" },
            quick: { value: "0.2s" },
            instant: { value: "0.1s" },
          },
        },

        // Easing curves from HTML demo
        easings: {
          glass: {
            flow: { value: "cubic-bezier(0.23, 1, 0.32, 1)" },
            bounce: { value: "cubic-bezier(0.68, -0.55, 0.265, 1.55)" },
            spring: { value: "cubic-bezier(0.175, 0.885, 0.32, 1.275)" },
          },
        },

        // Size system for components
        sizes: {
          glass: {
            xs: { value: "8px" },
            sm: { value: "12px" },
            md: { value: "16px" },
            lg: { value: "20px" },
            xl: { value: "24px" },
          },
        },

        // Spacing system
        spacing: {
          glass: {
            xs: { value: "4px" },
            sm: { value: "8px" },
            md: { value: "12px" },
            lg: { value: "16px" },
            xl: { value: "20px" },
            "2xl": { value: "24px" },
            "3xl": { value: "32px" },
          },
          button: {
            pad: {
              compact: { value: "8px 12px" },
              regular: { value: "10px 16px" },
              large: { value: "12px 20px" },
            },
            gap: {
              icon: {
                compact: { value: "{spacing.glass.xs}" },
                regular: { value: "{spacing.glass.xs}" },
                large: { value: "{spacing.glass.sm}" },
              },
            },
            hit: {
              min: { value: "44px" },
            },
          },
        },

        // Typography tokens
        fonts: {
          sans: {
            value: '"SF Pro Display", sans-serif',
          },
          display: {
            value: '"SF Pro Display", sans-serif',
          },
          mono: {
            value: '"SF Mono", monospace',
          },
        },
        fontSizes: {
          // Apple HIG Typography Scale (exact specifications)
          caption2: { value: "11px" }, // Caption 2
          caption1: { value: "12px" }, // Caption 1
          footnote: { value: "13px" }, // Footnote
          subheadline: { value: "15px" }, // Subheadline
          callout: { value: "16px" }, // Callout
          body: { value: "17px" }, // Body (default reading size)
          headline: { value: "17px" }, // Headline
          title3: { value: "20px" }, // Title 3
          title2: { value: "22px" }, // Title 2
          title1: { value: "28px" }, // Title 1
          largeTitle: { value: "34px" }, // Large Title

          // Legacy size mapping for compatibility
          xs: { value: "11px" }, // caption2
          sm: { value: "13px" }, // footnote
          md: { value: "17px" }, // body
          lg: { value: "20px" }, // title3
          xl: { value: "22px" }, // title2
          "2xl": { value: "28px" }, // title1
          "3xl": { value: "34px" }, // largeTitle
        },
        lineHeights: {
          // Apple HIG Line Heights (optimized for readability)
          tight: { value: "1.1" }, // For large titles
          snug: { value: "1.2" }, // For headlines
          normal: { value: "1.25" }, // For body text (Apple's preferred)
          relaxed: { value: "1.4" }, // For longer content
          loose: { value: "1.6" }, // For captions

          // Legacy mapping
          none: { value: "1" },
        },
        fontWeights: {
          thin: { value: "100" },
          extralight: { value: "200" },
          light: { value: "300" },
          normal: { value: "400" },
          medium: { value: "500" },
          semibold: { value: "600" },
          bold: { value: "700" },
          extrabold: { value: "800" },
          black: { value: "900" },
        },
        letterSpacings: {
          // Apple HIG specific letter spacing values (based on SF Pro Display characteristics)
          largeTitle: { value: "-0.026em" }, // For titles > 28px
          title: { value: "-0.022em" }, // For title1, title2, title3
          headline: { value: "-0.019em" }, // For headline text
          body: { value: "-0.016em" }, // For body text (Apple's standard)
          callout: { value: "-0.012em" }, // For callout text
          subheadline: { value: "-0.006em" }, // For subheadline
          footnote: { value: "-0.003em" }, // For footnote
          caption: { value: "0em" }, // For caption text
          
          // Generic spacing (legacy support)
          tighter: { value: "-0.02em" },
          tight: { value: "-0.01em" },
          normal: { value: "0" },
          wide: { value: "0.01em" },
          wider: { value: "0.02em" },
          widest: { value: "0.04em" },
        },
      },

      // Complete Apple HIG Typography Styles (iOS 26/macOS 26 compliant)
      textStyles: {
        // Large Titles (Hero sections, main headings)
        largeTitle: {
          description: "Large title - Primary hero text and main headings",
          value: {
            fontFamily: "token(fonts.display)",
            fontWeight: "token(fontWeights.bold)",
            fontSize: "token(fontSizes.largeTitle)", // 34px
            lineHeight: "token(lineHeights.tight)", // 1.1
            letterSpacing: "token(letterSpacings.largeTitle)", // -0.026em
          },
        },

        // Title Hierarchy
        title1: {
          description: "Title 1 - Section headings, page titles",
          value: {
            fontFamily: "token(fonts.display)",
            fontWeight: "token(fontWeights.bold)",
            fontSize: "token(fontSizes.title1)", // 28px
            lineHeight: "token(lineHeights.snug)", // 1.2
            letterSpacing: "token(letterSpacings.title)", // -0.022em
          },
        },
        title2: {
          description: "Title 2 - Subsection headings",
          value: {
            fontFamily: "token(fonts.display)",
            fontWeight: "token(fontWeights.bold)",
            fontSize: "token(fontSizes.title2)", // 22px
            lineHeight: "token(lineHeights.snug)", // 1.2
            letterSpacing: "token(letterSpacings.title)", // -0.022em
          },
        },
        title3: {
          description: "Title 3 - Card titles, component headers",
          value: {
            fontFamily: "token(fonts.display)",
            fontWeight: "token(fontWeights.semibold)",
            fontSize: "token(fontSizes.title3)", // 20px
            lineHeight: "token(lineHeights.snug)", // 1.2
            letterSpacing: "token(letterSpacings.title)", // -0.022em
          },
        },

        // Body Text
        headline: {
          description: "Headline - Emphasized body text, important content",
          value: {
            fontFamily: "token(fonts.sans)",
            fontWeight: "token(fontWeights.semibold)",
            fontSize: "token(fontSizes.headline)", // 17px
            lineHeight: "token(lineHeights.normal)", // 1.25
            letterSpacing: "token(letterSpacings.headline)", // -0.019em
          },
        },
        body: {
          description: "Body - Primary reading text, paragraphs",
          value: {
            fontFamily: "token(fonts.sans)",
            fontWeight: "token(fontWeights.normal)",
            fontSize: "token(fontSizes.body)", // 17px
            lineHeight: "token(lineHeights.normal)", // 1.25
            letterSpacing: "token(letterSpacings.body)", // -0.016em
          },
        },
        callout: {
          description: "Callout - Highlighted content, emphasized body text",
          value: {
            fontFamily: "token(fonts.sans)",
            fontWeight: "token(fontWeights.medium)",
            fontSize: "token(fontSizes.callout)", // 16px
            lineHeight: "token(lineHeights.normal)", // 1.25
            letterSpacing: "token(letterSpacings.callout)", // -0.012em
          },
        },

        // Secondary Text
        subheadline: {
          description: "Subheadline - Supporting text, secondary information",
          value: {
            fontFamily: "token(fonts.sans)",
            fontWeight: "token(fontWeights.normal)",
            fontSize: "token(fontSizes.subheadline)", // 15px
            lineHeight: "token(lineHeights.relaxed)", // 1.4
            letterSpacing: "token(letterSpacings.subheadline)", // -0.006em
          },
        },
        footnote: {
          description: "Footnote - Metadata, timestamps, auxiliary information",
          value: {
            fontFamily: "token(fonts.sans)",
            fontWeight: "token(fontWeights.normal)",
            fontSize: "token(fontSizes.footnote)", // 13px
            lineHeight: "token(lineHeights.relaxed)", // 1.4
            letterSpacing: "token(letterSpacings.footnote)", // -0.003em
          },
        },

        // Caption Text
        caption1: {
          description: "Caption 1 - Image captions, form labels",
          value: {
            fontFamily: "token(fonts.sans)",
            fontWeight: "token(fontWeights.medium)",
            fontSize: "token(fontSizes.caption1)", // 12px
            lineHeight: "token(lineHeights.relaxed)", // 1.4
            letterSpacing: "token(letterSpacings.caption)", // 0em
          },
        },
        caption2: {
          description: "Caption 2 - Fine print, legal text",
          value: {
            fontFamily: "token(fonts.sans)",
            fontWeight: "token(fontWeights.normal)",
            fontSize: "token(fontSizes.caption2)", // 11px
            lineHeight: "token(lineHeights.loose)", // 1.6
            letterSpacing: "token(letterSpacings.caption)", // 0em
          },
        },

        // Interactive Elements
        button: {
          description: "Button - Interactive controls, CTAs",
          value: {
            fontFamily: "token(fonts.sans)",
            fontWeight: "token(fontWeights.semibold)",
            fontSize: "token(fontSizes.body)", // 17px
            lineHeight: "token(lineHeights.none)", // 1
            letterSpacing: "token(letterSpacings.body)", // -0.016em
          },
        },

        // Legacy/Responsive Display (for hero sections)
        display: {
          description: "Display - Large hero text with fluid scaling",
          value: {
            fontFamily: "token(fonts.display)",
            fontWeight: "token(fontWeights.bold)",
            letterSpacing: "token(letterSpacings.largeTitle)",
            lineHeight: "token(lineHeights.tight)",
            fontSize: { 
              base: "token(fontSizes.title1)", // 28px on small screens
              md: "token(fontSizes.largeTitle)", // 34px on larger screens
              lg: "clamp(34px, 2.5vw + 20px, 56px)" // Fluid scaling for very large screens
            },
          },
        },
      },

      // All animations from HTML demo
      keyframes: {
        liquidRipple: {
          "0%": { transform: "scale(0)", opacity: "1" },
          "50%": { opacity: "0.6" },
          "100%": { transform: "scale(4)", opacity: "0" },
        },
        liquidJiggle: {
          "0%, 100%": { transform: "scale(1) rotate(0deg)" },
          "8%": { transform: "scale(1.12) rotate(-2deg)" },
          "16%": { transform: "scale(0.92) rotate(2.5deg)" },
          "24%": { transform: "scale(1.06) rotate(-1.8deg)" },
          "32%": { transform: "scale(0.95) rotate(1.5deg)" },
          "40%": { transform: "scale(1.04) rotate(-1deg)" },
          "48%": { transform: "scale(0.97) rotate(0.8deg)" },
          "56%": { transform: "scale(1.02) rotate(-0.6deg)" },
          "64%": { transform: "scale(0.99) rotate(0.4deg)" },
          "72%": { transform: "scale(1.01) rotate(-0.3deg)" },
          "80%": { transform: "scale(0.995) rotate(0.2deg)" },
          "88%": { transform: "scale(1.005) rotate(-0.1deg)" },
          "96%": { transform: "scale(0.998) rotate(0.05deg)" },
        },
        liquidFlow: {
          "0%": { transform: "translateY(0) scale(1)" },
          "50%": { transform: "translateY(-2px) scale(1.02)" },
          "100%": { transform: "translateY(0) scale(1)" },
        },
        liquidBounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
        },
      },

      // Slot recipes for multi-part components (auto-applied via JSX tracking)
      slotRecipes: {
        // Dialog - Modal/popup component
        dialog: {
          className: "dialog",
          jsx: ["Dialog"],
          slots: [
            "backdrop",
            "positioner",
            "content",
            "title",
            "description",
            "trigger",
            "closeTrigger",
          ],
          base: {
            backdrop: {
              position: "fixed",
              inset: 0,
              zIndex: 50,
              background: "rgba(0, 0, 0, 0.5)",
              backdropFilter: "blur(4px)",
            },
            positioner: {
              position: "fixed",
              inset: 0,
              zIndex: 50,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "token(spacing.glass.lg)",
            },
            content: {
              position: "relative",
              overflow: "hidden",
              background: "token(colors.glass.bg)",
              backdropFilter: "blur(token(blurs.glass.md))",
              border: "1px solid token(colors.glass.border)",
              boxShadow: "token(shadows.glass.base)",
              borderRadius: "token(radii.roles.modal)",
              maxWidth: "500px",
              width: "100%",
              maxHeight: "90vh",
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              _before: {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: "inherit",
                background: "token(colors.glass.gradients.before)",
                pointerEvents: "none",
                zIndex: 1,
              },
              _after: {
                content: '""',
                position: "absolute",
                top: "2px",
                left: "2px",
                right: "2px",
                bottom: "2px",
                borderRadius: "inherit",
                background: "token(colors.glass.gradients.after)",
                pointerEvents: "none",
                zIndex: 0,
              },
            },
            title: {
              position: "relative",
              zIndex: 2,
              color: "token(colors.text.glass.primary)",
              fontSize: "token(fontSizes.title3)",
              fontWeight: "token(fontWeights.bold)",
              lineHeight: "token(lineHeights.snug)",
            },
            description: {
              position: "relative",
              zIndex: 2,
              color: "token(colors.text.glass.secondary)",
              fontSize: "token(fontSizes.body)",
              lineHeight: "token(lineHeights.normal)",
            },
            trigger: {
              position: "relative",
              overflow: "hidden",
              background: "token(colors.glass.bg)",
              backdropFilter: "blur(token(blurs.glass.md))",
              border: "1px solid token(colors.glass.border)",
              boxShadow: "token(shadows.glass.base)",
              borderRadius: "token(radii.roles.control)",
              cursor: "pointer",
              _focusVisible: {
                outline: "none",
                boxShadow:
                  "0 0 0 3px color-mix(in oklch, {colors.accent.dynamic} 35%, transparent)",
                borderColor: "token(colors.accent.dynamic)",
              },
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "token(spacing.glass.md) token(spacing.glass.lg)",
              color: "token(colors.text.glass.primary)",
              transition:
                "all token(durations.glass.flow) token(easings.glass.flow)",
              _hover: {
                transform: "translateY(-1px)",
                boxShadow: "token(shadows.glass.hover)",
              },
            },
            closeTrigger: {
              position: "absolute",
              top: "token(spacing.glass.md)",
              right: "token(spacing.glass.md)",
              width: "32px",
              height: "32px",
              borderRadius: "token(radii.roles.control)",
              background: "token(colors.glass.bg)",
              border: "1px solid token(colors.glass.border)",
              cursor: "pointer",
              _focusVisible: {
                outline: "none",
                boxShadow:
                  "0 0 0 3px color-mix(in oklch, {colors.accent.dynamic} 35%, transparent)",
                borderColor: "token(colors.accent.dynamic)",
              },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "token(colors.text.glass.primary)",
              zIndex: 3,
              _hover: {
                background: "token(colors.glass.subtle.bg)",
              },
            },
          },
        },

        // Menu - Dropdown menu component
        menu: {
          className: "menu",
          jsx: ["Menu"],
          slots: [
            "trigger",
            "positioner",
            "content",
            "item",
            "itemText",
            "separator",
          ],
          base: {
            trigger: {
              position: "relative",
              overflow: "hidden",
              background: "token(colors.glass.bg)",
              backdropFilter: "blur(token(blurs.glass.md))",
              border: "1px solid token(colors.glass.border)",
              boxShadow: "token(shadows.glass.base)",
              borderRadius: "token(radii.roles.control)",
              cursor: "pointer",
              _focusVisible: {
                outline: "none",
                boxShadow:
                  "0 0 0 3px color-mix(in oklch, {colors.accent.dynamic} 35%, transparent)",
                borderColor: "token(colors.accent.dynamic)",
              },
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "token(spacing.glass.sm)",
              padding: "token(spacing.glass.md) token(spacing.glass.lg)",
              color: "token(colors.text.glass.primary)",
              transition:
                "all token(durations.glass.flow) token(easings.glass.flow)",
              _hover: {
                transform: "translateY(-1px)",
                boxShadow: "token(shadows.glass.hover)",
              },
            },
            positioner: {
              zIndex: 50,
            },
            content: {
              position: "relative",
              overflow: "hidden",
              background: "token(colors.glass.bg)",
              backdropFilter: "blur(token(blurs.glass.md))",
              border: "1px solid token(colors.glass.border)",
              boxShadow: "token(shadows.glass.base)",
              borderRadius: "token(radii.roles.sheet)",
              minWidth: "200px",
              padding: "token(spacing.glass.sm)",
              zIndex: 50,
              _before: {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: "inherit",
                background: "token(colors.glass.gradients.before)",
                pointerEvents: "none",
                zIndex: 1,
              },
            },
            item: {
              position: "relative",
              zIndex: 2,
              display: "flex",
              alignItems: "center",
              gap: "token(spacing.glass.sm)",
              padding: "token(spacing.glass.md) token(spacing.glass.lg)",
              borderRadius: "token(radii.roles.control)",
              fontSize: "14px",
              border: "none",
              background: "transparent",
              width: "100%",
              textAlign: "left",
              cursor: "pointer",
              _focusVisible: {
                outline: "none",
                boxShadow:
                  "0 0 0 3px color-mix(in oklch, {colors.accent.dynamic} 35%, transparent)",
                borderColor: "token(colors.accent.dynamic)",
              },
              color: "token(colors.text.glass.primary)",
              transition:
                "all token(durations.glass.quick) token(easings.glass.flow)",
              _hover: {
                background: "token(colors.glass.subtle.bg)",
              },
              "&[data-highlighted]": {
                background: "token(colors.glass.subtle.bg)",
              },
            },
            itemText: {
              position: "relative",
              zIndex: 2,
              color: "token(colors.text.glass.primary)",
            },
            separator: {
              height: "1px",
              background: "token(colors.glass.border)",
              margin: "token(spacing.glass.sm) 0",
            },
          },
        },

        // Select - Dropdown select component
        select: {
          className: "select",
          jsx: ["Select"],
          slots: [
            "trigger",
            "content",
            "item",
            "itemText",
            "positioner",
            "indicator",
            "clearTrigger",
          ],
          base: {
            trigger: {
              position: "relative",
              overflow: "hidden",
              background: "token(colors.glass.bg)",
              backdropFilter: "blur(token(blurs.glass.md))",
              border: "1px solid token(colors.glass.border)",
              boxShadow: "token(shadows.glass.base)",
              borderRadius: "token(radii.roles.field)",
              cursor: "pointer",
              _focusVisible: {
                outline: "none",
                boxShadow:
                  "0 0 0 3px color-mix(in oklch, {colors.accent.dynamic} 35%, transparent)",
                borderColor: "token(colors.accent.dynamic)",
              },
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "token(spacing.glass.sm)",
              padding: "token(spacing.glass.md) token(spacing.glass.lg)",
              minHeight: "44px",
              width: "100%",
              textAlign: "left",
              color: "token(colors.text.glass.primary)",
              transition:
                "all token(durations.glass.flow) token(easings.glass.flow)",
              _before: {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: "inherit",
                background: "token(colors.glass.gradients.before)",
                pointerEvents: "none",
                zIndex: 1,
              },
              _hover: {
                transform: "translateY(-1px)",
                boxShadow: "token(shadows.glass.hover)",
              },
            },
            positioner: {
              zIndex: 50,
            },
            content: {
              position: "relative",
              overflow: "hidden",
              background: "token(colors.glass.bg)",
              backdropFilter: "blur(token(blurs.glass.md))",
              border: "1px solid token(colors.glass.border)",
              boxShadow: "token(shadows.glass.base)",
              borderRadius: "token(radii.roles.sheet)",
              minWidth: "var(--reference-width)",
              maxHeight: "300px",
              overflowY: "auto",
              padding: "token(spacing.glass.sm)",
              zIndex: 50,
              _before: {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: "inherit",
                background: "token(colors.glass.gradients.before)",
                pointerEvents: "none",
                zIndex: 1,
              },
            },
            item: {
              position: "relative",
              zIndex: 2,
              display: "flex",
              alignItems: "center",
              gap: "token(spacing.glass.sm)",
              padding: "token(spacing.glass.md) token(spacing.glass.lg)",
              borderRadius: "token(radii.roles.control)",
              fontSize: "14px",
              border: "none",
              background: "transparent",
              width: "100%",
              textAlign: "left",
              cursor: "pointer",
              _focusVisible: {
                outline: "none",
                boxShadow:
                  "0 0 0 3px color-mix(in oklch, {colors.accent.dynamic} 35%, transparent)",
                borderColor: "token(colors.accent.dynamic)",
              },
              color: "token(colors.text.glass.primary)",
              transition:
                "all token(durations.glass.quick) token(easings.glass.flow)",
              "&[data-highlighted]": {
                background: "token(colors.glass.subtle.bg)",
              },
              "&[data-state=checked]": {
                background: "token(colors.glass.medium.bg)",
              },
            },
            itemText: {
              position: "relative",
              zIndex: 2,
              color: "token(colors.text.glass.primary)",
            },
            indicator: {
              position: "relative",
              zIndex: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "token(colors.text.glass.primary)",
            },
            clearTrigger: {
              position: "relative",
              zIndex: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "24px",
              height: "24px",
              borderRadius: "token(radii.roles.control)",
              background: "transparent",
              border: "1px solid token(colors.glass.border)",
              cursor: "pointer",
              _focusVisible: {
                outline: "none",
                boxShadow:
                  "0 0 0 3px color-mix(in oklch, {colors.accent.dynamic} 35%, transparent)",
                borderColor: "token(colors.accent.dynamic)",
              },
              color: "token(colors.text.glass.primary)",
              _hover: {
                background: "token(colors.glass.subtle.bg)",
              },
            },
          },
        },

        // Tabs - Apple HIG segmented control
        tabs: {
          className: "tabs",
          jsx: ["Tabs"],
          slots: ["root", "list", "trigger", "content", "indicator"],
          base: {
            root: {},
            list: {
              display: "inline-flex",
              gap: "2px",
              borderRadius: "token(radii.roles.button)",
              padding: "2px",
              background: "{colors.bg.subtle}",
              border: "1px solid {colors.border.default}",
            },
            trigger: {
              padding: "8px 12px",
              borderRadius: "token(radii.roles.buttonCompact)",
              fontWeight: "token(fontWeights.semibold)",
              fontSize: "token(fontSizes.subheadline)",
              lineHeight: "token(lineHeights.snug)",
              color: "{colors.text.glass.muted}",
              transition: "color .15s ease, background-color .15s ease",
              _focusVisible: {
                outline: "none",
                boxShadow:
                  "0 0 0 3px color-mix(in oklch, {colors.accent.dynamic} 35%, transparent)",
                borderColor: "token(colors.accent.dynamic)",
              },
              _hover: { color: "{colors.text.glass.primary}" },
              _selected: {
                color: "{colors.text.glass.primary}",
                background: "{colors.glass.bg}",
                border: "1px solid {colors.glass.border}",
                backdropFilter: "blur(token(blurs.glass.md))",
              },
              _disabled: { opacity: 0.5, cursor: "not-allowed" },
            },
            content: {
              marginTop: "16px",
              fontSize: "token(fontSizes.body)",
              lineHeight: "token(lineHeights.normal)",
            },
            indicator: { display: "none" },
          },
        },

        // Tooltip - Hover tooltip component
        tooltip: {
          className: "tooltip",
          jsx: ["Tooltip"],
          slots: ["trigger", "positioner", "content"],
          base: {
            trigger: {
              display: "inline-flex",
            },
            positioner: {
              zIndex: 50,
            },
            content: {
              position: "relative",
              overflow: "hidden",
              background: "token(colors.glass.bg)",
              backdropFilter: "blur(token(blurs.glass.md))",
              border: "1px solid token(colors.glass.border)",
              boxShadow: "token(shadows.glass.base)",
              borderRadius: "token(radii.roles.control)",
              padding: "token(spacing.glass.sm) token(spacing.glass.md)",
              fontSize: "14px",
              maxWidth: "300px",
              zIndex: 50,
              color: "token(colors.text.glass.primary)",
              _before: {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: "inherit",
                background: "token(colors.glass.gradients.before)",
                pointerEvents: "none",
                zIndex: 1,
              },
            },
          },
        },

        // Popover - Click popup component
        popover: {
          className: "popover",
          jsx: ["Popover"],
          slots: [
            "trigger",
            "positioner",
            "content",
            "title",
            "description",
            "closeTrigger",
          ],
          base: {
            trigger: {
              position: "relative",
              overflow: "hidden",
              background: "token(colors.glass.bg)",
              backdropFilter: "blur(token(blurs.glass.md))",
              border: "1px solid token(colors.glass.border)",
              boxShadow: "token(shadows.glass.base)",
              borderRadius: "token(radii.roles.control)",
              cursor: "pointer",
              _focusVisible: {
                outline: "none",
                boxShadow:
                  "0 0 0 3px color-mix(in oklch, {colors.accent.dynamic} 35%, transparent)",
                borderColor: "token(colors.accent.dynamic)",
              },
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "token(spacing.glass.md) token(spacing.glass.lg)",
              color: "token(colors.text.glass.primary)",
              transition:
                "all token(durations.glass.flow) token(easings.glass.flow)",
              _hover: {
                transform: "translateY(-1px)",
                boxShadow: "token(shadows.glass.hover)",
              },
            },
            positioner: {
              zIndex: 50,
            },
            content: {
              position: "relative",
              overflow: "hidden",
              background: "token(colors.glass.bg)",
              backdropFilter: "blur(token(blurs.glass.md))",
              border: "1px solid token(colors.glass.border)",
              boxShadow: "token(shadows.glass.base)",
              borderRadius: "token(radii.roles.sheet)",
              minWidth: "300px",
              padding: "token(spacing.glass.lg)",
              zIndex: 50,
              display: "flex",
              flexDirection: "column",
              gap: "token(spacing.glass.md)",
              _before: {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: "inherit",
                background: "token(colors.glass.gradients.before)",
                pointerEvents: "none",
                zIndex: 1,
              },
            },
            title: {
              position: "relative",
              zIndex: 2,
              fontSize: "16px",
              fontWeight: 600,
              lineHeight: 1.2,
              color: "token(colors.text.glass.primary)",
            },
            description: {
              position: "relative",
              zIndex: 2,
              fontSize: "14px",
              color: "token(colors.text.glass.secondary)",
              lineHeight: 1.5,
            },
            closeTrigger: {
              position: "absolute",
              top: "token(spacing.glass.sm)",
              right: "token(spacing.glass.sm)",
              width: "24px",
              height: "24px",
              borderRadius: "token(radii.roles.control)",
              background: "token(colors.glass.bg)",
              border: "1px solid token(colors.glass.border)",
              cursor: "pointer",
              _focusVisible: {
                outline: "none",
                boxShadow:
                  "0 0 0 3px color-mix(in oklch, {colors.accent.dynamic} 35%, transparent)",
                borderColor: "token(colors.accent.dynamic)",
              },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "token(colors.text.glass.primary)",
              zIndex: 3,
              _hover: {
                background: "token(colors.glass.subtle.bg)",
              },
            },
          },
        },

        // Toast - Notification component
        toast: {
          className: "toast",
          jsx: ["Toast"],
          slots: [
            "root",
            "title",
            "description",
            "closeTrigger",
            "actionTrigger",
          ],
          base: {
            root: {
              position: "relative",
              overflow: "hidden",
              background: "token(colors.glass.bg)",
              backdropFilter: "blur(token(blurs.glass.md))",
              border: "1px solid token(colors.glass.border)",
              boxShadow: "token(shadows.glass.base)",
              borderRadius: "token(radii.roles.card)",
              display: "flex",
              alignItems: "flex-start",
              gap: "token(spacing.glass.md)",
              padding: "token(spacing.glass.lg)",
              minWidth: "300px",
              maxWidth: "500px",
              _before: {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: "inherit",
                background: "token(colors.glass.gradients.before)",
                pointerEvents: "none",
                zIndex: 1,
              },
            },
            title: {
              position: "relative",
              zIndex: 2,
              fontSize: "16px",
              fontWeight: 600,
              lineHeight: 1.2,
              color: "token(colors.text.glass.primary)",
            },
            description: {
              position: "relative",
              zIndex: 2,
              fontSize: "14px",
              color: "token(colors.text.glass.secondary)",
              lineHeight: 1.5,
            },
            closeTrigger: {
              position: "relative",
              zIndex: 2,
              width: "24px",
              height: "24px",
              borderRadius: "token(radii.roles.control)",
              background: "transparent",
              border: "1px solid token(colors.glass.border)",
              cursor: "pointer",
              _focusVisible: {
                outline: "none",
                boxShadow:
                  "0 0 0 3px color-mix(in oklch, {colors.accent.dynamic} 35%, transparent)",
                borderColor: "token(colors.accent.dynamic)",
              },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginLeft: "auto",
              color: "token(colors.text.glass.primary)",
              _hover: {
                background: "token(colors.glass.subtle.bg)",
              },
            },
            actionTrigger: {
              position: "relative",
              zIndex: 2,
              padding: "token(spacing.glass.sm) token(spacing.glass.md)",
              borderRadius: "token(radii.roles.control)",
              background: "token(colors.glass.bg)",
              border: "1px solid token(colors.glass.border)",
              fontSize: "14px",
              fontWeight: "token(fontWeights.medium)",
              cursor: "pointer",
              _focusVisible: {
                outline: "none",
                boxShadow:
                  "0 0 0 3px color-mix(in oklch, {colors.accent.dynamic} 35%, transparent)",
                borderColor: "token(colors.accent.dynamic)",
              },
              color: "token(colors.text.glass.primary)",
              _hover: {
                background: "token(colors.glass.subtle.bg)",
              },
            },
          },
          variants: {
            status: {
              info: {
                root: {
                  borderLeftColor: "token(colors.accent.dynamic)",
                  borderLeftWidth: "4px",
                },
              },
              success: {
                root: {
                  borderLeftColor: "token(colors.accent.success)",
                  borderLeftWidth: "4px",
                },
              },
              warning: {
                root: {
                  borderLeftColor: "token(colors.accent.warning)",
                  borderLeftWidth: "4px",
                },
              },
              error: {
                root: {
                  borderLeftColor: "token(colors.accent.danger)",
                  borderLeftWidth: "4px",
                },
              },
            },
          },
          defaultVariants: { status: "info" },
        },

        // Updated Accordion with liquid glass styling
        accordion: {
          className: "accordion",
          jsx: ["Accordion"],
          slots: ["root", "item", "trigger", "content"],
          base: {
            root: {
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "token(spacing.glass.sm)",
            },
            item: {
              position: "relative",
              overflow: "hidden",
              background: "token(colors.glass.bg)",
              backdropFilter: "blur(token(blurs.glass.md))",
              border: "1px solid token(colors.glass.border)",
              boxShadow: "token(shadows.glass.base)",
              borderRadius: "token(radii.roles.card)",
              _before: {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: "inherit",
                background: "token(colors.glass.gradients.before)",
                pointerEvents: "none",
                zIndex: 1,
              },
              _after: {
                content: '""',
                position: "absolute",
                top: "2px",
                left: "2px",
                right: "2px",
                bottom: "2px",
                borderRadius: "inherit",
                background: "token(colors.glass.gradients.after)",
                pointerEvents: "none",
                zIndex: 0,
              },
            },
            trigger: {
              position: "relative",
              zIndex: 2,
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "token(spacing.glass.lg)",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              _focusVisible: {
                outline: "none",
                boxShadow:
                  "0 0 0 3px color-mix(in oklch, {colors.accent.dynamic} 35%, transparent)",
                borderColor: "token(colors.accent.dynamic)",
              },
              fontSize: "16px",
              fontWeight: "token(fontWeights.medium)",
              textAlign: "left",
              color: "token(colors.text.glass.primary)",
              transition:
                "all token(durations.glass.quick) token(easings.glass.flow)",
              _hover: {
                background: "token(colors.glass.subtle.bg)",
              },
            },
            content: {
              position: "relative",
              zIndex: 2,
              padding: "0 token(spacing.glass.lg) token(spacing.glass.lg)",
              color: "token(colors.text.glass.secondary)",
              lineHeight: 1.6,
            },
          },
        },

        // Combobox - Searchable select component
        combobox: {
          className: "combobox",
          jsx: ["Combobox"],
          slots: [
            "root",
            "trigger",
            "input",
            "positioner",
            "content",
            "item",
            "itemText",
          ],
          base: {
            root: {
              position: "relative",
              display: "inline-flex",
              flexDirection: "column",
              gap: "token(spacing.glass.sm)",
            },
            trigger: {
              position: "relative",
              overflow: "hidden",
              background: "token(colors.glass.bg)",
              backdropFilter: "blur(token(blurs.glass.md))",
              border: "1px solid token(colors.glass.border)",
              boxShadow: "token(shadows.glass.base)",
              borderRadius: "token(radii.roles.field)",
              padding: "token(spacing.glass.md)",
              cursor: "pointer",
              _focusVisible: {
                outline: "none",
                boxShadow:
                  "0 0 0 3px color-mix(in oklch, {colors.accent.dynamic} 35%, transparent)",
                borderColor: "token(colors.accent.dynamic)",
              },
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              _before: {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: "inherit",
                background: "token(colors.glass.gradients.before)",
                pointerEvents: "none",
                zIndex: 1,
              },
            },
            input: {
              position: "relative",
              zIndex: 2,
              background: "transparent",
              border: "none",
              outline: "none",
              width: "100%",
              color: "token(colors.text.glass.primary)",
              fontSize: "16px",
              _placeholder: { color: "token(colors.text.glass.muted)" },
            },
            positioner: {
              position: "absolute",
              zIndex: 50,
              top: "calc(100% + 4px)",
              left: 0,
              right: 0,
            },
            content: {
              position: "relative",
              overflow: "hidden",
              background: "token(colors.glass.bg)",
              backdropFilter: "blur(token(blurs.glass.md))",
              border: "1px solid token(colors.glass.border)",
              boxShadow: "token(shadows.glass.base)",
              borderRadius: "token(radii.roles.sheet)",
              maxHeight: "200px",
              overflowY: "auto",
              _before: {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: "inherit",
                background: "token(colors.glass.gradients.before)",
                pointerEvents: "none",
                zIndex: 1,
              },
            },
            item: {
              position: "relative",
              zIndex: 2,
              padding: "token(spacing.glass.md)",
              cursor: "pointer",
              _focusVisible: {
                outline: "none",
                boxShadow:
                  "0 0 0 3px color-mix(in oklch, {colors.accent.dynamic} 35%, transparent)",
                borderColor: "token(colors.accent.dynamic)",
              },
              color: "token(colors.text.glass.primary)",
              _hover: { background: "token(colors.glass.subtle.bg)" },
              _selected: { background: "token(colors.glass.medium.bg)" },
            },
            itemText: {
              fontSize: "16px",
              lineHeight: 1.5,
            },
          },
        },

        // DatePicker - Date selection component
        datePicker: {
          className: "date-picker",
          jsx: ["DatePicker"],
          slots: [
            "root",
            "trigger",
            "input",
            "positioner",
            "content",
            "table",
            "tableHead",
            "tableBody",
            "tableRow",
            "tableCell",
          ],
          base: {
            root: {
              position: "relative",
              display: "inline-flex",
              flexDirection: "column",
              gap: "token(spacing.glass.sm)",
            },
            trigger: {
              position: "relative",
              overflow: "hidden",
              background: "token(colors.glass.bg)",
              backdropFilter: "blur(token(blurs.glass.md))",
              border: "1px solid token(colors.glass.border)",
              boxShadow: "token(shadows.glass.base)",
              borderRadius: "token(radii.roles.field)",
              padding: "token(spacing.glass.md)",
              cursor: "pointer",
              _focusVisible: {
                outline: "none",
                boxShadow:
                  "0 0 0 3px color-mix(in oklch, {colors.accent.dynamic} 35%, transparent)",
                borderColor: "token(colors.accent.dynamic)",
              },
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              _before: {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: "inherit",
                background: "token(colors.glass.gradients.before)",
                pointerEvents: "none",
                zIndex: 1,
              },
            },
            input: {
              position: "relative",
              zIndex: 2,
              background: "transparent",
              border: "none",
              outline: "none",
              width: "100%",
              color: "token(colors.text.glass.primary)",
              fontSize: "16px",
              cursor: "pointer",
              _focusVisible: {
                outline: "none",
                boxShadow:
                  "0 0 0 3px color-mix(in oklch, {colors.accent.dynamic} 35%, transparent)",
                borderColor: "token(colors.accent.dynamic)",
              },
            },
            positioner: {
              position: "absolute",
              zIndex: 50,
              top: "calc(100% + 4px)",
              left: 0,
            },
            content: {
              position: "relative",
              overflow: "hidden",
              background: "token(colors.glass.bg)",
              backdropFilter: "blur(token(blurs.glass.md))",
              border: "1px solid token(colors.glass.border)",
              boxShadow: "token(shadows.glass.base)",
              borderRadius: "token(radii.roles.sheet)",
              padding: "token(spacing.glass.lg)",
              _before: {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: "inherit",
                background: "token(colors.glass.gradients.before)",
                pointerEvents: "none",
                zIndex: 1,
              },
            },
            table: {
              position: "relative",
              zIndex: 2,
              width: "100%",
              borderCollapse: "collapse",
            },
            tableHead: {
              fontWeight: "600",
              color: "token(colors.text.glass.primary)",
            },
            tableBody: {
              color: "token(colors.text.glass.secondary)",
            },
            tableRow: {
              display: "table-row",
            },
            tableCell: {
              padding: "token(spacing.glass.sm)",
              textAlign: "center",
              cursor: "pointer",
              _focusVisible: {
                outline: "none",
                boxShadow:
                  "0 0 0 3px color-mix(in oklch, {colors.accent.dynamic} 35%, transparent)",
                borderColor: "token(colors.accent.dynamic)",
              },
              borderRadius: "token(radii.roles.control)",
              _hover: { background: "token(colors.glass.subtle.bg)" },
              _selected: {
                background: "token(colors.glass.medium.bg)",
                color: "token(colors.text.glass.primary)",
              },
            },
          },
        },

        // FileUpload - File upload component
        fileUpload: {
          className: "file-upload",
          jsx: ["FileUpload"],
          slots: [
            "root",
            "dropzone",
            "trigger",
            "itemGroup",
            "item",
            "itemName",
            "itemSizeText",
          ],
          base: {
            root: {
              position: "relative",
              display: "flex",
              flexDirection: "column",
              gap: "token(spacing.glass.md)",
            },
            dropzone: {
              position: "relative",
              overflow: "hidden",
              background: "token(colors.glass.bg)",
              backdropFilter: "blur(token(blurs.glass.md))",
              border: "2px dashed token(colors.glass.border)",
              boxShadow: "token(shadows.glass.base)",
              borderRadius: "token(radii.roles.card)",
              padding: "token(spacing.glass.2xl)",
              textAlign: "center",
              cursor: "pointer",
              _focusVisible: {
                outline: "none",
                boxShadow:
                  "0 0 0 3px color-mix(in oklch, {colors.accent.dynamic} 35%, transparent)",
                borderColor: "token(colors.accent.dynamic)",
              },
              transition:
                "all token(durations.glass.quick) token(easings.glass.flow)",
              _before: {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: "inherit",
                background: "token(colors.glass.gradients.before)",
                pointerEvents: "none",
                zIndex: 1,
              },
              _dragAccept: {
                borderColor: "token(colors.glass.accent.border)",
                background: "token(colors.glass.accent.bg)",
              },
            },
            trigger: {
              position: "relative",
              zIndex: 2,
              background: "token(colors.glass.medium.bg)",
              border: "1px solid token(colors.glass.border)",
              borderRadius: "token(radii.roles.control)",
              padding: "token(spacing.glass.sm) token(spacing.glass.md)",
              cursor: "pointer",
              _focusVisible: {
                outline: "none",
                boxShadow:
                  "0 0 0 3px color-mix(in oklch, {colors.accent.dynamic} 35%, transparent)",
                borderColor: "token(colors.accent.dynamic)",
              },
              fontSize: "14px",
              fontWeight: "token(fontWeights.medium)",
              color: "token(colors.text.glass.primary)",
              _hover: { background: "token(colors.glass.subtle.bg)" },
            },
            itemGroup: {
              display: "flex",
              flexDirection: "column",
              gap: "token(spacing.glass.sm)",
            },
            item: {
              position: "relative",
              overflow: "hidden",
              background: "token(colors.glass.subtle.bg)",
              backdropFilter: "blur(token(blurs.glass.sm))",
              border: "1px solid token(colors.glass.border)",
              borderRadius: "token(radii.roles.control)",
              padding: "token(spacing.glass.sm) token(spacing.glass.md)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            },
            itemName: {
              fontSize: "14px",
              fontWeight: "token(fontWeights.medium)",
              color: "token(colors.text.glass.primary)",
            },
            itemSizeText: {
              fontSize: "12px",
              color: "token(colors.text.glass.muted)",
            },
          },
        },

        // NumberInput - Numeric input component
        numberInput: {
          className: "number-input",
          jsx: ["NumberInput"],
          slots: ["root", "field", "incrementTrigger", "decrementTrigger"],
          base: {
            root: {
              position: "relative",
              display: "inline-flex",
              alignItems: "center",
              background: "token(colors.glass.bg)",
              backdropFilter: "blur(token(blurs.glass.md))",
              border: "1px solid token(colors.glass.border)",
              boxShadow: "token(shadows.glass.base)",
              borderRadius: "token(radii.roles.field)",
              overflow: "hidden",
              _before: {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: "inherit",
                background: "token(colors.glass.gradients.before)",
                pointerEvents: "none",
                zIndex: 1,
              },
            },
            field: {
              position: "relative",
              zIndex: 2,
              background: "transparent",
              border: "none",
              outline: "none",
              padding: "token(spacing.glass.md)",
              fontSize: "16px",
              color: "token(colors.text.glass.primary)",
              textAlign: "center",
              _placeholder: { color: "token(colors.text.glass.muted)" },
            },
            incrementTrigger: {
              position: "relative",
              zIndex: 2,
              background: "token(colors.glass.subtle.bg)",
              border: "none",
              borderLeft: "1px solid token(colors.glass.border)",
              padding: "token(spacing.glass.sm)",
              cursor: "pointer",
              _focusVisible: {
                outline: "none",
                boxShadow:
                  "0 0 0 3px color-mix(in oklch, {colors.accent.dynamic} 35%, transparent)",
                borderColor: "token(colors.accent.dynamic)",
              },
              color: "token(colors.text.glass.primary)",
              _hover: { background: "token(colors.glass.medium.bg)" },
            },
            decrementTrigger: {
              position: "relative",
              zIndex: 2,
              background: "token(colors.glass.subtle.bg)",
              border: "none",
              borderRight: "1px solid token(colors.glass.border)",
              padding: "token(spacing.glass.sm)",
              cursor: "pointer",
              _focusVisible: {
                outline: "none",
                boxShadow:
                  "0 0 0 3px color-mix(in oklch, {colors.accent.dynamic} 35%, transparent)",
                borderColor: "token(colors.accent.dynamic)",
              },
              color: "token(colors.text.glass.primary)",
              _hover: { background: "token(colors.glass.medium.bg)" },
            },
          },
        },

        // RadioGroup - Radio button group component
        radioGroup: {
          className: "radio-group",
          jsx: ["RadioGroup"],
          slots: ["root", "item", "itemControl", "itemText"],
          base: {
            root: {
              display: "flex",
              flexDirection: "column",
              gap: "token(spacing.glass.sm)",
            },
            item: {
              display: "flex",
              alignItems: "center",
              gap: "token(spacing.glass.sm)",
              cursor: "pointer",
              _focusVisible: {
                outline: "none",
                boxShadow:
                  "0 0 0 3px color-mix(in oklch, {colors.accent.dynamic} 35%, transparent)",
                borderColor: "token(colors.accent.dynamic)",
              },
            },
            itemControl: {
              position: "relative",
              overflow: "hidden",
              background: "token(colors.glass.bg)",
              backdropFilter: "blur(token(blurs.glass.md))",
              border: "1px solid token(colors.glass.border)",
              boxShadow: "token(shadows.glass.base)",
              borderRadius: "token(radii.full)",
              width: "20px",
              height: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              _focusVisible: {
                outline: "none",
                boxShadow:
                  "0 0 0 3px color-mix(in oklch, {colors.accent.dynamic} 35%, transparent)",
                borderColor: "token(colors.accent.dynamic)",
              },
              _before: {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: "inherit",
                background: "token(colors.glass.gradients.before)",
                pointerEvents: "none",
                zIndex: 1,
              },
              _checked: {
                _after: {
                  content: '""',
                  position: "relative",
                  zIndex: 2,
                  width: "8px",
                  height: "8px",
                  borderRadius: "token(radii.full)",
                  background: "token(colors.glass.accent.bg)",
                },
              },
            },
            itemText: {
              fontSize: "16px",
              color: "token(colors.text.glass.primary)",
            },
          },
        },

        // Pagination - Page navigation component
        pagination: {
          className: "pagination",
          jsx: ["Pagination"],
          slots: ["root", "item", "ellipsis", "prevTrigger", "nextTrigger"],
          base: {
            root: {
              display: "flex",
              alignItems: "center",
              gap: "token(spacing.glass.sm)",
            },
            item: {
              position: "relative",
              overflow: "hidden",
              background: "token(colors.glass.bg)",
              backdropFilter: "blur(token(blurs.glass.md))",
              border: "1px solid token(colors.glass.border)",
              boxShadow: "token(shadows.glass.base)",
              borderRadius: "token(radii.roles.control)",
              padding: "token(spacing.glass.sm) token(spacing.glass.md)",
              cursor: "pointer",
              _focusVisible: {
                outline: "none",
                boxShadow:
                  "0 0 0 3px color-mix(in oklch, {colors.accent.dynamic} 35%, transparent)",
                borderColor: "token(colors.accent.dynamic)",
              },
              fontSize: "14px",
              fontWeight: "token(fontWeights.medium)",
              color: "token(colors.text.glass.primary)",
              minWidth: "32px",
              textAlign: "center",
              _before: {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: "inherit",
                background: "token(colors.glass.gradients.before)",
                pointerEvents: "none",
                zIndex: 1,
              },
              _hover: { background: "token(colors.glass.subtle.bg)" },
              _selected: {
                background: "token(colors.glass.accent.bg)",
                color: "white",
              },
            },
            ellipsis: {
              padding: "token(spacing.glass.sm)",
              color: "token(colors.text.glass.muted)",
            },
            prevTrigger: {
              position: "relative",
              overflow: "hidden",
              background: "token(colors.glass.bg)",
              backdropFilter: "blur(token(blurs.glass.md))",
              border: "1px solid token(colors.glass.border)",
              boxShadow: "token(shadows.glass.base)",
              borderRadius: "token(radii.roles.control)",
              padding: "token(spacing.glass.sm) token(spacing.glass.md)",
              cursor: "pointer",
              _focusVisible: {
                outline: "none",
                boxShadow:
                  "0 0 0 3px color-mix(in oklch, {colors.accent.dynamic} 35%, transparent)",
                borderColor: "token(colors.accent.dynamic)",
              },
              fontSize: "14px",
              color: "token(colors.text.glass.primary)",
              _hover: { background: "token(colors.glass.subtle.bg)" },
              _disabled: {
                opacity: 0.5,
                cursor: "not-allowed",
              },
            },
            nextTrigger: {
              position: "relative",
              overflow: "hidden",
              background: "token(colors.glass.bg)",
              backdropFilter: "blur(token(blurs.glass.md))",
              border: "1px solid token(colors.glass.border)",
              boxShadow: "token(shadows.glass.base)",
              borderRadius: "token(radii.roles.control)",
              padding: "token(spacing.glass.sm) token(spacing.glass.md)",
              cursor: "pointer",
              _focusVisible: {
                outline: "none",
                boxShadow:
                  "0 0 0 3px color-mix(in oklch, {colors.accent.dynamic} 35%, transparent)",
                borderColor: "token(colors.accent.dynamic)",
              },
              fontSize: "14px",
              color: "token(colors.text.glass.primary)",
              _hover: { background: "token(colors.glass.subtle.bg)" },
              _disabled: {
                opacity: 0.5,
                cursor: "not-allowed",
              },
            },
          },
        },

        // Carousel - Image/content carousel component
        carousel: {
          className: "carousel",
          jsx: ["Carousel"],
          slots: [
            "root",
            "viewport",
            "itemGroup",
            "item",
            "nextTrigger",
            "prevTrigger",
            "indicatorGroup",
            "indicator",
          ],
          base: {
            root: {
              position: "relative",
              overflow: "hidden",
              background: "token(colors.glass.bg)",
              backdropFilter: "blur(token(blurs.glass.md))",
              border: "1px solid token(colors.glass.border)",
              boxShadow: "token(shadows.glass.base)",
              borderRadius: "token(radii.roles.card)",
              _before: {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: "inherit",
                background: "token(colors.glass.gradients.before)",
                pointerEvents: "none",
                zIndex: 1,
              },
            },
            viewport: {
              position: "relative",
              zIndex: 2,
              overflow: "hidden",
              width: "100%",
              height: "100%",
            },
            itemGroup: {
              display: "flex",
              transition:
                "transform token(durations.glass.flow) token(easings.glass.flow)",
            },
            item: {
              flex: "0 0 100%",
              minWidth: 0,
            },
            nextTrigger: {
              position: "absolute",
              top: "50%",
              right: "token(spacing.glass.md)",
              transform: "translateY(-50%)",
              zIndex: 3,
              background: "token(colors.glass.medium.bg)",
              backdropFilter: "blur(token(blurs.glass.sm))",
              border: "1px solid token(colors.glass.border)",
              borderRadius: "token(radii.full)",
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              _focusVisible: {
                outline: "none",
                boxShadow:
                  "0 0 0 3px color-mix(in oklch, {colors.accent.dynamic} 35%, transparent)",
                borderColor: "token(colors.accent.dynamic)",
              },
              color: "token(colors.text.glass.primary)",
              _hover: { background: "token(colors.glass.subtle.bg)" },
            },
            prevTrigger: {
              position: "absolute",
              top: "50%",
              left: "token(spacing.glass.md)",
              transform: "translateY(-50%)",
              zIndex: 3,
              background: "token(colors.glass.medium.bg)",
              backdropFilter: "blur(token(blurs.glass.sm))",
              border: "1px solid token(colors.glass.border)",
              borderRadius: "token(radii.full)",
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              _focusVisible: {
                outline: "none",
                boxShadow:
                  "0 0 0 3px color-mix(in oklch, {colors.accent.dynamic} 35%, transparent)",
                borderColor: "token(colors.accent.dynamic)",
              },
              color: "token(colors.text.glass.primary)",
              _hover: { background: "token(colors.glass.subtle.bg)" },
            },
            indicatorGroup: {
              position: "absolute",
              bottom: "token(spacing.glass.md)",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 3,
              display: "flex",
              gap: "token(spacing.glass.sm)",
            },
            indicator: {
              width: "8px",
              height: "8px",
              borderRadius: "token(radii.full)",
              background: "token(colors.glass.subtle.bg)",
              cursor: "pointer",
              _focusVisible: {
                outline: "none",
                boxShadow:
                  "0 0 0 3px color-mix(in oklch, {colors.accent.dynamic} 35%, transparent)",
                borderColor: "token(colors.accent.dynamic)",
              },
              transition:
                "all token(durations.glass.quick) token(easings.glass.flow)",
              _current: { background: "token(colors.glass.accent.bg)" },
            },
          },
        },
      },

      // Recipe for base liquid glass component
      recipes: {
        liquidGlass: {
          className: "glass-surface",
          base: {
            position: "relative",
            overflow: "hidden",
            background: "token(colors.glass.bg)",
            backdropFilter: "blur(token(blurs.glass.md))",
            border: "1px solid token(colors.glass.border)",
            boxShadow: "token(shadows.glass.base)",
            transition:
              "all token(durations.glass.flow) token(easings.glass.flow)",
            transformOrigin: "center center",
            _before: {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: "inherit",
              background: "token(colors.glass.gradients.before)",
              pointerEvents: "none",
              zIndex: 1,
            },
            _after: {
              content: '""',
              position: "absolute",
              top: "2px",
              left: "2px",
              right: "2px",
              bottom: "2px",
              borderRadius: "inherit",
              background: "token(colors.glass.gradients.after)",
              pointerEvents: "none",
              zIndex: 0,
            },
          },
          variants: {
            intensity: {
              subtle: {
                background: "token(colors.glass.subtle.bg)",
                border: "1px solid token(colors.glass.subtle.border)",
              },
              medium: {
                background: "token(colors.glass.medium.bg)",
                border: "1px solid token(colors.glass.medium.border)",
              },
              strong: {
                background: "token(colors.glass.strong.bg)",
                border: "1px solid token(colors.glass.strong.border)",
              },
            },
            size: {
              sm: {
                padding: "token(spacing.glass.sm) token(spacing.glass.md)",
                borderRadius: "token(radii.sm)", // 8px for small components
                fontSize: "14px",
              },
              md: {
                padding: "token(spacing.glass.md) token(spacing.glass.lg)",
                borderRadius: "token(radii.md)", // 16px - PRIMARY DEFAULT
                fontSize: "16px",
              },
              lg: {
                padding: "token(spacing.glass.lg) token(spacing.glass.xl)",
                borderRadius: "token(radii.lg)", // 20px for large components
                fontSize: "18px",
              },
            },
          },
          defaultVariants: {
            intensity: "medium",
            size: "md", // Uses 16px border radius as default
          },
        },

        // Complete Button recipe using only Panda tokens (upgraded for HIG variant/tone/size)
        button: {
          className: "liquid-button",
          base: {
            // Layout & Structure
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "token(spacing.glass.sm)",
            position: "relative",
            overflow: "hidden",
            cursor: "pointer",
            userSelect: "none",
            whiteSpace: "nowrap",
            fontFamily: "inherit",
            fontWeight: "token(fontWeights.semibold)",

            // Liquid Glass Foundation
            background: "token(colors.glass.bg)",
            backdropFilter: "blur(token(blurs.glass.md))",
            border: "1px solid token(colors.glass.border)",
            boxShadow: "token(shadows.glass.base)",
            color: "token(colors.text.glass.primary)",

            // Focus ring (accent-aware)
            _focusVisible: {
              outline: "none",
              boxShadow:
                "0 0 0 3px color-mix(in oklch, {colors.accent.dynamic} 35%, transparent)",
              borderColor: "token(colors.accent.dynamic)",
            },

            // Base interactive transitions
            transition:
              "all token(durations.glass.flow) token(easings.glass.flow)",
            transformOrigin: "center center",

            // State selectors
            "&[aria-disabled='true']": {
              opacity: 0.5,
              cursor: "not-allowed",
              pointerEvents: "none",
            },
            "&[data-loading]": {
              cursor: "progress",
              pointerEvents: "none",
            },
            _hover: {
              transform: "translateY(-2px)",
              borderColor: "rgba(255, 255, 255, 0.4)",
              boxShadow: "token(shadows.glass.hover)",
            },
            _active: {
              transform: "translateY(1px) scale(0.96)",
              transition:
                "all token(durations.glass.instant) token(easings.glass.flow)",
            },

            // Icon-only affordance (square hit area)
            "&[data-icon-only]": {
              aspectRatio: "1 / 1",
            },

            // Pseudo elements for glass gradients
            _before: {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: "inherit",
              background: "token(colors.glass.gradients.before)",
              pointerEvents: "none",
              zIndex: 1,
            },
            _after: {
              content: '""',
              position: "absolute",
              top: "2px",
              left: "2px",
              right: "2px",
              bottom: "2px",
              borderRadius: "inherit",
              background: "token(colors.glass.gradients.after)",
              pointerEvents: "none",
              zIndex: 0,
            },

            // Reduced motion
            "@media (prefers-reduced-motion: reduce)": {
              transition: "none",
              _hover: {
                transform: "none",
                boxShadow: "token(shadows.glass.base)",
              },
              _active: { transform: "none" },
            },
          },
          variants: {
            // Legacy variants (kept for backward-compat)
            variant: {
              primary: {
                background: "token(colors.button.primary.bg)",
                borderColor: "token(colors.button.primary.border)",
              },
              secondary: {
                background: "token(colors.button.secondary.bg)",
                borderColor: "token(colors.button.secondary.border)",
              },
              ghost: {
                background: "token(colors.button.ghost.bg)",
                borderColor: "token(colors.button.ghost.border)",
              },
              danger: {
                background: "token(colors.button.danger.bg)",
                borderColor: "token(colors.button.danger.border)",
              },
              success: {
                background: "token(colors.button.success.bg)",
                borderColor: "token(colors.button.success.border)",
              },
              warning: {
                background: "token(colors.button.warning.bg)",
                borderColor: "token(colors.button.warning.border)",
              },

              // New HIG emphasis variants
              filled: {},
              tinted: {},
              plain: {},
            },

            // New HIG tones (used with filled/tinted/plain)
            tone: {
              accent: {},
              neutral: {},
              destructive: {},
            },

            // Sizes (new names + legacy aliases)
            size: {
              // NEW
              compact: {
                padding: "8px 12px",
                borderRadius: "token(radii.roles.buttonCompact)",
                fontSize: "token(fontSizes.footnote)",
                minHeight: "32px",
                fontWeight: "token(fontWeights.semibold)",
                lineHeight: "token(lineHeights.snug)",
              },
              regular: {
                padding: "10px 16px",
                borderRadius: "token(radii.roles.button)",
                fontSize: "token(fontSizes.body)",
                minHeight: "44px", // HIG >= 44px
                fontWeight: "token(fontWeights.semibold)",
                lineHeight: "token(lineHeights.normal)",
              },
              large: {
                padding: "12px 20px",
                borderRadius: "token(radii.roles.buttonLarge)",
                fontSize: "token(fontSizes.title3)",
                minHeight: "50px",
                fontWeight: "token(fontWeights.semibold)",
                lineHeight: "token(lineHeights.snug)",
              },

              // LEGACY aliases
              sm: {
                padding: "8px 12px",
                borderRadius: "token(radii.roles.buttonCompact)",
                fontSize: "token(fontSizes.footnote)",
                minHeight: "32px",
                fontWeight: "token(fontWeights.semibold)",
                lineHeight: "token(lineHeights.snug)",
              },
              md: {
                padding: "10px 16px",
                borderRadius: "token(radii.roles.button)",
                fontSize: "token(fontSizes.body)",
                minHeight: "44px",
                fontWeight: "token(fontWeights.semibold)",
                lineHeight: "token(lineHeights.normal)",
              },
              lg: {
                padding: "12px 20px",
                borderRadius: "token(radii.roles.buttonLarge)",
                fontSize: "token(fontSizes.title3)",
                minHeight: "50px",
                fontWeight: "token(fontWeights.semibold)",
                lineHeight: "token(lineHeights.snug)",
              },
              xl: {
                padding: "16px 24px",
                borderRadius: "token(radii.lg)",
                fontSize: "token(fontSizes.title2)",
                minHeight: "56px",
                fontWeight: "token(fontWeights.bold)",
                lineHeight: "token(lineHeights.snug)",
              },
            },
          },

          // Apply HIG color tokens per (variant, tone) pair
          compoundVariants: [
            // filled × accent
            {
              variant: "filled",
              tone: "accent",
              css: {
                background: "token(colors.button.hig.filled.accent.default.bg)",
                borderColor:
                  "token(colors.button.hig.filled.accent.default.border)",
                color: "token(colors.button.hig.filled.accent.default.text)",
                _hover: {
                  background: "token(colors.button.hig.filled.accent.hover.bg)",
                  borderColor:
                    "token(colors.button.hig.filled.accent.hover.border)",
                },
                _active: {
                  background:
                    "token(colors.button.hig.filled.accent.active.bg)",
                  borderColor:
                    "token(colors.button.hig.filled.accent.active.border)",
                },
                _focusVisible: {
                  background: "token(colors.button.hig.filled.accent.focus.bg)",
                  borderColor:
                    "token(colors.button.hig.filled.accent.focus.border)",
                },
                "&:disabled, &[disabled], &[aria-disabled='true']": {
                  background:
                    "token(colors.button.hig.filled.accent.disabled.bg)",
                  borderColor:
                    "token(colors.button.hig.filled.accent.disabled.border)",
                  color: "token(colors.button.hig.filled.accent.disabled.text)",
                },
                "&[data-loading]": {
                  background:
                    "token(colors.button.hig.filled.accent.loading.bg)",
                  borderColor:
                    "token(colors.button.hig.filled.accent.loading.border)",
                },
              },
            },
            // filled × neutral
            {
              variant: "filled",
              tone: "neutral",
              css: {
                background:
                  "token(colors.button.hig.filled.neutral.default.bg)",
                borderColor:
                  "token(colors.button.hig.filled.neutral.default.border)",
                color: "token(colors.button.hig.filled.neutral.default.text)",
                _hover: {
                  background:
                    "token(colors.button.hig.filled.neutral.hover.bg)",
                  borderColor:
                    "token(colors.button.hig.filled.neutral.hover.border)",
                },
                _active: {
                  background:
                    "token(colors.button.hig.filled.neutral.active.bg)",
                  borderColor:
                    "token(colors.button.hig.filled.neutral.active.border)",
                },
                _focusVisible: {
                  background:
                    "token(colors.button.hig.filled.neutral.focus.bg)",
                  borderColor:
                    "token(colors.button.hig.filled.neutral.focus.border)",
                },
                "&:disabled, &[disabled], &[aria-disabled='true']": {
                  background:
                    "token(colors.button.hig.filled.neutral.disabled.bg)",
                  borderColor:
                    "token(colors.button.hig.filled.neutral.disabled.border)",
                  color:
                    "token(colors.button.hig.filled.neutral.disabled.text)",
                },
                "&[data-loading]": {
                  background:
                    "token(colors.button.hig.filled.neutral.loading.bg)",
                  borderColor:
                    "token(colors.button.hig.filled.neutral.loading.border)",
                },
              },
            },
            // filled × destructive
            {
              variant: "filled",
              tone: "destructive",
              css: {
                background:
                  "token(colors.button.hig.filled.destructive.default.bg)",
                borderColor:
                  "token(colors.button.hig.filled.destructive.default.border)",
                color:
                  "token(colors.button.hig.filled.destructive.default.text)",
                _hover: {
                  background:
                    "token(colors.button.hig.filled.destructive.hover.bg)",
                  borderColor:
                    "token(colors.button.hig.filled.destructive.hover.border)",
                },
                _active: {
                  background:
                    "token(colors.button.hig.filled.destructive.active.bg)",
                  borderColor:
                    "token(colors.button.hig.filled.destructive.active.border)",
                },
                _focusVisible: {
                  background:
                    "token(colors.button.hig.filled.destructive.focus.bg)",
                  borderColor:
                    "token(colors.button.hig.filled.destructive.focus.border)",
                },
                "&:disabled, &[disabled], &[aria-disabled='true']": {
                  background:
                    "token(colors.button.hig.filled.destructive.disabled.bg)",
                  borderColor:
                    "token(colors.button.hig.filled.destructive.disabled.border)",
                  color:
                    "token(colors.button.hig.filled.destructive.disabled.text)",
                },
                "&[data-loading]": {
                  background:
                    "token(colors.button.hig.filled.destructive.loading.bg)",
                  borderColor:
                    "token(colors.button.hig.filled.destructive.loading.border)",
                },
              },
            },

            // tinted × accent
            {
              variant: "tinted",
              tone: "accent",
              css: {
                background: "token(colors.button.hig.tinted.accent.default.bg)",
                borderColor:
                  "token(colors.button.hig.tinted.accent.default.border)",
                color: "token(colors.button.hig.tinted.accent.default.text)",
                _hover: {
                  background: "token(colors.button.hig.tinted.accent.hover.bg)",
                  borderColor:
                    "token(colors.button.hig.tinted.accent.hover.border)",
                },
                _active: {
                  background:
                    "token(colors.button.hig.tinted.accent.active.bg)",
                  borderColor:
                    "token(colors.button.hig.tinted.accent.active.border)",
                },
                _focusVisible: {
                  background: "token(colors.button.hig.tinted.accent.focus.bg)",
                  borderColor:
                    "token(colors.button.hig.tinted.accent.focus.border)",
                },
                "&:disabled, &[disabled], &[aria-disabled='true']": {
                  background:
                    "token(colors.button.hig.tinted.accent.disabled.bg)",
                  borderColor:
                    "token(colors.button.hig.tinted.accent.disabled.border)",
                  color: "token(colors.button.hig.tinted.accent.disabled.text)",
                },
                "&[data-loading]": {
                  background:
                    "token(colors.button.hig.tinted.accent.loading.bg)",
                  borderColor:
                    "token(colors.button.hig.tinted.accent.loading.border)",
                },
              },
            },
            // tinted × neutral
            {
              variant: "tinted",
              tone: "neutral",
              css: {
                background:
                  "token(colors.button.hig.tinted.neutral.default.bg)",
                borderColor:
                  "token(colors.button.hig.tinted.neutral.default.border)",
                color: "token(colors.button.hig.tinted.neutral.default.text)",
                _hover: {
                  background:
                    "token(colors.button.hig.tinted.neutral.hover.bg)",
                  borderColor:
                    "token(colors.button.hig.tinted.neutral.hover.border)",
                },
                _active: {
                  background:
                    "token(colors.button.hig.tinted.neutral.active.bg)",
                  borderColor:
                    "token(colors.button.hig.tinted.neutral.active.border)",
                },
                _focusVisible: {
                  background:
                    "token(colors.button.hig.tinted.neutral.focus.bg)",
                  borderColor:
                    "token(colors.button.hig.tinted.neutral.focus.border)",
                },
                "&:disabled, &[disabled], &[aria-disabled='true']": {
                  background:
                    "token(colors.button.hig.tinted.neutral.disabled.bg)",
                  borderColor:
                    "token(colors.button.hig.tinted.neutral.disabled.border)",
                  color:
                    "token(colors.button.hig.tinted.neutral.disabled.text)",
                },
                "&[data-loading]": {
                  background:
                    "token(colors.button.hig.tinted.neutral.loading.bg)",
                  borderColor:
                    "token(colors.button.hig.tinted.neutral.loading.border)",
                },
              },
            },
            // tinted × destructive
            {
              variant: "tinted",
              tone: "destructive",
              css: {
                background:
                  "token(colors.button.hig.tinted.destructive.default.bg)",
                borderColor:
                  "token(colors.button.hig.tinted.destructive.default.border)",
                color:
                  "token(colors.button.hig.tinted.destructive.default.text)",
                _hover: {
                  background:
                    "token(colors.button.hig.tinted.destructive.hover.bg)",
                  borderColor:
                    "token(colors.button.hig.tinted.destructive.hover.border)",
                },
                _active: {
                  background:
                    "token(colors.button.hig.tinted.destructive.active.bg)",
                  borderColor:
                    "token(colors.button.hig.tinted.destructive.active.border)",
                },
                _focusVisible: {
                  background:
                    "token(colors.button.hig.tinted.destructive.focus.bg)",
                  borderColor:
                    "token(colors.button.hig.tinted.destructive.focus.border)",
                },
                "&:disabled, &[disabled], &[aria-disabled='true']": {
                  background:
                    "token(colors.button.hig.tinted.destructive.disabled.bg)",
                  borderColor:
                    "token(colors.button.hig.tinted.destructive.disabled.border)",
                  color:
                    "token(colors.button.hig.tinted.destructive.disabled.text)",
                },
                "&[data-loading]": {
                  background:
                    "token(colors.button.hig.tinted.destructive.loading.bg)",
                  borderColor:
                    "token(colors.button.hig.tinted.destructive.loading.border)",
                },
              },
            },

            // plain × accent
            {
              variant: "plain",
              tone: "accent",
              css: {
                background: "token(colors.button.hig.plain.accent.default.bg)",
                borderColor:
                  "token(colors.button.hig.plain.accent.default.border)",
                color: "token(colors.button.hig.plain.accent.default.text)",
                _hover: {
                  background: "token(colors.button.hig.plain.accent.hover.bg)",
                  borderColor:
                    "token(colors.button.hig.plain.accent.hover.border)",
                },
                _active: {
                  background: "token(colors.button.hig.plain.accent.active.bg)",
                  borderColor:
                    "token(colors.button.hig.plain.accent.active.border)",
                },
                _focusVisible: {
                  background: "token(colors.button.hig.plain.accent.focus.bg)",
                  borderColor:
                    "token(colors.button.hig.plain.accent.focus.border)",
                },
                "&:disabled, &[disabled], &[aria-disabled='true']": {
                  background:
                    "token(colors.button.hig.plain.accent.disabled.bg)",
                  borderColor:
                    "token(colors.button.hig.plain.accent.disabled.border)",
                  color: "token(colors.button.hig.plain.accent.disabled.text)",
                },
                "&[data-loading]": {
                  background:
                    "token(colors.button.hig.plain.accent.loading.bg)",
                  borderColor:
                    "token(colors.button.hig.plain.accent.loading.border)",
                },
              },
            },
            // plain × neutral
            {
              variant: "plain",
              tone: "neutral",
              css: {
                background: "token(colors.button.hig.plain.neutral.default.bg)",
                borderColor:
                  "token(colors.button.hig.plain.neutral.default.border)",
                color: "token(colors.button.hig.plain.neutral.default.text)",
                _hover: {
                  background: "token(colors.button.hig.plain.neutral.hover.bg)",
                  borderColor:
                    "token(colors.button.hig.plain.neutral.hover.border)",
                },
                _active: {
                  background:
                    "token(colors.button.hig.plain.neutral.active.bg)",
                  borderColor:
                    "token(colors.button.hig.plain.neutral.active.border)",
                },
                _focusVisible: {
                  background: "token(colors.button.hig.plain.neutral.focus.bg)",
                  borderColor:
                    "token(colors.button.hig.plain.neutral.focus.border)",
                },
                "&:disabled, &[disabled], &[aria-disabled='true']": {
                  background:
                    "token(colors.button.hig.plain.neutral.disabled.bg)",
                  borderColor:
                    "token(colors.button.hig.plain.neutral.disabled.border)",
                  color: "token(colors.button.hig.plain.neutral.disabled.text)",
                },
                "&[data-loading]": {
                  background:
                    "token(colors.button.hig.plain.neutral.loading.bg)",
                  borderColor:
                    "token(colors.button.hig.plain.neutral.loading.border)",
                },
              },
            },
            // plain × destructive
            {
              variant: "plain",
              tone: "destructive",
              css: {
                background:
                  "token(colors.button.hig.plain.destructive.default.bg)",
                borderColor:
                  "token(colors.button.hig.plain.destructive.default.border)",
                color:
                  "token(colors.button.hig.plain.destructive.default.text)",
                _hover: {
                  background:
                    "token(colors.button.hig.plain.destructive.hover.bg)",
                  borderColor:
                    "token(colors.button.hig.plain.destructive.hover.border)",
                },
                _active: {
                  background:
                    "token(colors.button.hig.plain.destructive.active.bg)",
                  borderColor:
                    "token(colors.button.hig.plain.destructive.active.border)",
                },
                _focusVisible: {
                  background:
                    "token(colors.button.hig.plain.destructive.focus.bg)",
                  borderColor:
                    "token(colors.button.hig.plain.destructive.focus.border)",
                },
                "&:disabled, &[disabled], &[aria-disabled='true']": {
                  background:
                    "token(colors.button.hig.plain.destructive.disabled.bg)",
                  borderColor:
                    "token(colors.button.hig.plain.destructive.disabled.border)",
                  color:
                    "token(colors.button.hig.plain.destructive.disabled.text)",
                },
                "&[data-loading]": {
                  background:
                    "token(colors.button.hig.plain.destructive.loading.bg)",
                  borderColor:
                    "token(colors.button.hig.plain.destructive.loading.border)",
                },
              },
            },
          ],

          defaultVariants: {
            // Keep legacy default for backward-compat; tone used by HIG variants
            variant: "primary",
            tone: "accent",
            size: "md",
          },
        },

        // Card – Apple HIG compliant card design
        card: {
          className: "card",
          base: {
            position: "relative",
            overflow: "hidden",
            borderRadius: "token(radii.roles.card)",
            border: "1px solid {colors.border.default}",
            background: "{colors.bg.surface}",
            transition:
              "transform .15s ease, border-color .15s ease, box-shadow .15s ease",
            _hover: {
              transform: "translateY(-2px)",
              borderColor: "{colors.glass.border}",
            },
          },
          variants: {
            variant: {
              solid: {},
              glass: {
                position: "relative",
                overflow: "hidden",
                background: "{colors.glass.bg}",
                border: "1px solid {colors.glass.border}",
                boxShadow: "token(shadows.glass.base)",
                backdropFilter: "blur(token(blurs.glass.md))",
                _before: {
                  content: '""',
                  position: "absolute",
                  inset: 0,
                  borderRadius: "inherit",
                  background: "{colors.glass.gradients.before}",
                  pointerEvents: "none",
                  zIndex: 1,
                },
                _after: {
                  content: '""',
                  position: "absolute",
                  top: "2px",
                  left: "2px",
                  right: "2px",
                  bottom: "2px",
                  borderRadius: "inherit",
                  background: "{colors.glass.gradients.after}",
                  pointerEvents: "none",
                  zIndex: 0,
                },
              },
              elevated: {
                boxShadow: "token(shadows.glass.hover)",
                background: "{colors.glass.bg}",
                border: "1px solid {colors.glass.border}",
                backdropFilter: "blur(token(blurs.glass.md))",
                _before: {
                  content: '""',
                  position: "absolute",
                  inset: 0,
                  borderRadius: "inherit",
                  background: "{colors.glass.gradients.before}",
                  pointerEvents: "none",
                  zIndex: 1,
                },
                _after: {
                  content: '""',
                  position: "absolute",
                  top: "2px",
                  left: "2px",
                  right: "2px",
                  bottom: "2px",
                  borderRadius: "inherit",
                  background: "{colors.glass.gradients.after}",
                  pointerEvents: "none",
                  zIndex: 0,
                },
              },
            },
            padded: { true: { padding: "14px" }, false: {} },
          },
          defaultVariants: { variant: "solid", padded: true },
        },

        // Badge / Pill – Apple HIG compliant badge design
        badge: {
          className: "badge",
          base: {
            position: "relative",
            overflow: "hidden",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "4px 8px",
            borderRadius: "token(radii.roles.pill)",
            border: "1px solid {colors.glass.border}",
            background: "{colors.glass.bg}",
            backdropFilter: "blur(token(blurs.glass.md))",
            fontWeight: "token(fontWeights.semibold)",
            fontSize: "token(fontSizes.caption1)",
            lineHeight: "token(lineHeights.snug)",
            _before: {
              content: '""',
              position: "absolute",
              inset: 0,
              borderRadius: "inherit",
              background: "{colors.glass.gradients.before}",
              pointerEvents: "none",
              zIndex: 1,
            },
            _after: {
              content: '""',
              position: "absolute",
              top: "1px",
              left: "1px",
              right: "1px",
              bottom: "1px",
              borderRadius: "inherit",
              background: "{colors.glass.gradients.after}",
              pointerEvents: "none",
              zIndex: 0,
            },
          },
          variants: {
            tone: {
              neutral: { color: "{colors.text.glass.primary}" },
              blue: {
                color: "white",
                background: "{colors.accent.dynamic}",
                border: "1px solid transparent",
              },
            },
          },
          defaultVariants: { tone: "neutral" },
        },

        // SymbolTile – Apple-like icon tile
        symbolTile: {
          className: "symbol",
          base: {
            position: "relative",
            overflow: "hidden",
            width: "48px",
            height: "48px",
            display: "grid",
            placeItems: "center",
            borderRadius: "token(radii.roles.card)",
            border: "1px solid {colors.glass.border}",
            background: "{colors.glass.bg}",
            backdropFilter: "blur(token(blurs.glass.md))",
            _before: {
              content: '""',
              position: "absolute",
              inset: 0,
              borderRadius: "inherit",
              background: "{colors.glass.gradients.before}",
              pointerEvents: "none",
              zIndex: 1,
            },
            _after: {
              content: '""',
              position: "absolute",
              top: "2px",
              left: "2px",
              right: "2px",
              bottom: "2px",
              borderRadius: "inherit",
              background: "{colors.glass.gradients.after}",
              pointerEvents: "none",
              zIndex: 0,
            },
          },
          variants: {
            tint: {
              gray: {},
              blue: {
                background:
                  "color-mix(in oklch, {colors.accent.dynamic} 20%, transparent)",
              },
              indigo: {
                background:
                  "color-mix(in oklch, var(--colors-indigo-500) 20%, transparent)",
              },
              teal: {
                background:
                  "color-mix(in oklch, var(--colors-teal-500) 20%, transparent)",
              },
            },
          },
          defaultVariants: { tint: "gray" },
        },

        // Input – Apple HIG compliant input fields
        input: {
          className: "field-input",
          base: {
            width: "100%",
            padding: "10px 12px",
            borderRadius: "token(radii.roles.field)",
            border: "1px solid {colors.border.default}",
            background: "{colors.bg.surface}",
            color: "{colors.text.glass.primary}",
            fontSize: "token(fontSizes.body)",
            lineHeight: "token(lineHeights.normal)",
            _placeholder: { color: "{colors.text.glass.muted}" },
            outline: "none",
            _focusVisible: {
              boxShadow:
                "0 0 0 3px color-mix(in oklch, {colors.accent.dynamic} 35%, transparent)",
              borderColor: "{colors.accent.dynamic}",
            },
          },
          variants: {
            variant: {
              solid: {},
              glass: {
                position: "relative",
                overflow: "hidden",
                background: "{colors.glass.bg}",
                border: "1px solid {colors.glass.border}",
                boxShadow: "token(shadows.glass.sm)",
                backdropFilter: "blur(token(blurs.glass.md))",
                _before: {
                  content: '""',
                  position: "absolute",
                  inset: 0,
                  borderRadius: "inherit",
                  background: "{colors.glass.gradients.before}",
                  pointerEvents: "none",
                  zIndex: 1,
                },
                _after: {
                  content: '""',
                  position: "absolute",
                  top: "1px",
                  left: "1px",
                  right: "1px",
                  bottom: "1px",
                  borderRadius: "inherit",
                  background: "{colors.glass.gradients.after}",
                  pointerEvents: "none",
                  zIndex: 0,
                },
              },
            },
            size: {
              sm: {
                fontSize: "token(fontSizes.footnote)",
                paddingBlock: "8px",
                borderRadius: "token(radii.roles.field)",
              },
              md: {
                fontSize: "token(fontSizes.body)",
                paddingBlock: "10px",
                borderRadius: "token(radii.roles.field)",
              },
              lg: {
                fontSize: "token(fontSizes.callout)",
                paddingBlock: "12px",
                borderRadius: "token(radii.roles.fieldLarge)",
              },
            },
          },
          defaultVariants: { variant: "solid", size: "md" },
        },

        // Avatar - Profile picture component
        avatar: {
          className: "avatar",
          jsx: ["Avatar"],
          base: {
            position: "relative",
            overflow: "hidden",
            background: "token(colors.glass.bg)",
            backdropFilter: "blur(token(blurs.glass.md))",
            border: "1px solid token(colors.glass.border)",
            boxShadow: "token(shadows.glass.base)",
            borderRadius: "token(radii.full)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            _before: {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: "inherit",
              background: "token(colors.glass.gradients.before)",
              pointerEvents: "none",
              zIndex: 1,
            },
          },
          variants: {
            size: {
              sm: { width: "32px", height: "32px", fontSize: "14px" },
              md: { width: "40px", height: "40px", fontSize: "16px" },
              lg: { width: "48px", height: "48px", fontSize: "18px" },
              xl: { width: "56px", height: "56px", fontSize: "20px" },
            },
          },
          defaultVariants: { size: "md" },
        },

        // Checkbox - Checkbox input component
        checkbox: {
          className: "checkbox",
          jsx: ["Checkbox"],
          base: {
            position: "relative",
            overflow: "hidden",
            background: "token(colors.glass.bg)",
            backdropFilter: "blur(token(blurs.glass.md))",
            border: "1px solid token(colors.glass.border)",
            boxShadow: "token(shadows.glass.base)",
            borderRadius: "token(radii.sm)",
            cursor: "pointer",
            _focusVisible: {
              outline: "none",
              boxShadow:
                "0 0 0 3px color-mix(in oklch, {colors.accent.dynamic} 35%, transparent)",
              borderColor: "token(colors.accent.dynamic)",
            },
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            _before: {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: "inherit",
              background: "token(colors.glass.gradients.before)",
              pointerEvents: "none",
              zIndex: 1,
            },
          },
          variants: {
            size: {
              sm: { width: "16px", height: "16px" },
              md: { width: "20px", height: "20px" },
              lg: { width: "24px", height: "24px" },
            },
          },
          defaultVariants: { size: "md" },
        },

        // Switch - Toggle switch component
        switchToggle: {
          className: "switch",
          jsx: ["Switch"],
          base: {
            position: "relative",
            overflow: "hidden",
            background: "token(colors.glass.bg)",
            backdropFilter: "blur(token(blurs.glass.md))",
            border: "1px solid token(colors.glass.border)",
            boxShadow: "token(shadows.glass.base)",
            borderRadius: "token(radii.full)",
            cursor: "pointer",
            _focusVisible: {
              outline: "none",
              boxShadow:
                "0 0 0 3px color-mix(in oklch, {colors.accent.dynamic} 35%, transparent)",
              borderColor: "token(colors.accent.dynamic)",
            },
            display: "inline-flex",
            alignItems: "center",
            padding: "2px",
            _before: {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: "inherit",
              background: "token(colors.glass.gradients.before)",
              pointerEvents: "none",
              zIndex: 1,
            },
          },
          variants: {
            size: {
              sm: { width: "36px", height: "20px" },
              md: { width: "44px", height: "24px" },
              lg: { width: "52px", height: "28px" },
            },
          },
          defaultVariants: { size: "md" },
        },

        // Slider - Range slider component
        slider: {
          className: "slider",
          jsx: ["Slider"],
          base: {
            position: "relative",
            overflow: "hidden",
            background: "token(colors.glass.bg)",
            backdropFilter: "blur(token(blurs.glass.md))",
            border: "1px solid token(colors.glass.border)",
            boxShadow: "token(shadows.glass.base)",
            borderRadius: "token(radii.full)",
            width: "100%",
            _before: {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: "inherit",
              background: "token(colors.glass.gradients.before)",
              pointerEvents: "none",
              zIndex: 1,
            },
          },
          variants: {
            size: {
              sm: { height: "4px" },
              md: { height: "6px" },
              lg: { height: "8px" },
            },
          },
          defaultVariants: { size: "md" },
        },

        // Progress - Progress bar component
        progress: {
          className: "progress",
          jsx: ["Progress"],
          base: {
            position: "relative",
            overflow: "hidden",
            background: "token(colors.glass.bg)",
            backdropFilter: "blur(token(blurs.glass.md))",
            border: "1px solid token(colors.glass.border)",
            boxShadow: "token(shadows.glass.base)",
            borderRadius: "token(radii.full)",
            width: "100%",
            _before: {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: "inherit",
              background: "token(colors.glass.gradients.before)",
              pointerEvents: "none",
              zIndex: 1,
            },
          },
          variants: {
            size: {
              sm: { height: "6px" },
              md: { height: "8px" },
              lg: { height: "12px" },
            },
          },
          defaultVariants: { size: "md" },
        },

        // ColorPicker - Color selection component
        colorPicker: {
          className: "color-picker",
          jsx: ["ColorPicker"],
          base: {
            position: "relative",
            overflow: "hidden",
            background: "token(colors.glass.bg)",
            backdropFilter: "blur(token(blurs.glass.md))",
            border: "1px solid token(colors.glass.border)",
            boxShadow: "token(shadows.glass.base)",
            borderRadius: "token(radii.roles.card)",
            cursor: "pointer",
            _focusVisible: {
              outline: "none",
              boxShadow:
                "0 0 0 3px color-mix(in oklch, {colors.accent.dynamic} 35%, transparent)",
              borderColor: "token(colors.accent.dynamic)",
            },
            _before: {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: "inherit",
              background: "token(colors.glass.gradients.before)",
              pointerEvents: "none",
              zIndex: 1,
            },
          },
          variants: {
            size: {
              sm: { width: "32px", height: "32px" },
              md: { width: "40px", height: "40px" },
              lg: { width: "48px", height: "48px" },
            },
          },
          defaultVariants: { size: "md" },
        },

        // PinInput - PIN/OTP input component
        pinInput: {
          className: "pin-input",
          jsx: ["PinInput"],
          base: {
            position: "relative",
            overflow: "hidden",
            background: "token(colors.glass.bg)",
            backdropFilter: "blur(token(blurs.glass.md))",
            border: "1px solid token(colors.glass.border)",
            boxShadow: "token(shadows.glass.base)",
            borderRadius: "token(radii.roles.field)",
            width: "48px",
            height: "48px",
            textAlign: "center",
            fontSize: "18px",
            fontWeight: "600",
            color: "token(colors.text.glass.primary)",
            _before: {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: "inherit",
              background: "token(colors.glass.gradients.before)",
              pointerEvents: "none",
              zIndex: 1,
            },
            _focusVisible: {
              outline: "none",
              boxShadow:
                "0 0 0 3px color-mix(in oklch, {colors.accent.dynamic} 35%, transparent)",
              borderColor: "token(colors.accent.dynamic)",
            },
          },
          variants: {
            size: {
              sm: { width: "32px", height: "32px", fontSize: "14px" },
              md: { width: "48px", height: "48px", fontSize: "18px" },
              lg: { width: "56px", height: "56px", fontSize: "20px" },
            },
          },
          defaultVariants: { size: "md" },
        },

        // RatingGroup - Star rating component
        ratingGroup: {
          className: "rating-group",
          jsx: ["RatingGroup"],
          base: {
            position: "relative",
            overflow: "hidden",
            background: "token(colors.glass.bg)",
            backdropFilter: "blur(token(blurs.glass.md))",
            border: "1px solid token(colors.glass.border)",
            boxShadow: "token(shadows.glass.base)",
            borderRadius: "token(radii.roles.control)",
            padding: "token(spacing.glass.sm)",
            display: "inline-flex",
            alignItems: "center",
            gap: "token(spacing.glass.xs)",
            _before: {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: "inherit",
              background: "token(colors.glass.gradients.before)",
              pointerEvents: "none",
              zIndex: 1,
            },
          },
          variants: {
            size: {
              sm: { fontSize: "16px", padding: "token(spacing.glass.xs)" },
              md: { fontSize: "20px", padding: "token(spacing.glass.sm)" },
              lg: { fontSize: "24px", padding: "token(spacing.glass.md)" },
            },
          },
          defaultVariants: { size: "md" },
        },

        // AngleSlider - Circular angle input component
        angleSlider: {
          className: "angle-slider",
          jsx: ["AngleSlider"],
          base: {
            position: "relative",
            overflow: "hidden",
            background: "token(colors.glass.bg)",
            backdropFilter: "blur(token(blurs.glass.md))",
            border: "1px solid token(colors.glass.border)",
            boxShadow: "token(shadows.glass.base)",
            borderRadius: "token(radii.full)",
            cursor: "pointer",
            _focusVisible: {
              outline: "none",
              boxShadow:
                "0 0 0 3px color-mix(in oklch, {colors.accent.dynamic} 35%, transparent)",
              borderColor: "token(colors.accent.dynamic)",
            },
            _before: {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: "inherit",
              background: "token(colors.glass.gradients.before)",
              pointerEvents: "none",
              zIndex: 1,
            },
          },
          variants: {
            size: {
              sm: { width: "80px", height: "80px" },
              md: { width: "120px", height: "120px" },
              lg: { width: "160px", height: "160px" },
            },
          },
          defaultVariants: { size: "md" },
        },

        // Clipboard - Copy to clipboard component
        clipboard: {
          className: "clipboard",
          jsx: ["Clipboard"],
          base: {
            position: "relative",
            overflow: "hidden",
            background: "token(colors.glass.bg)",
            backdropFilter: "blur(token(blurs.glass.md))",
            border: "1px solid token(colors.glass.border)",
            boxShadow: "token(shadows.glass.base)",
            borderRadius: "token(radii.roles.control)",
            cursor: "pointer",
            _focusVisible: {
              outline: "none",
              boxShadow:
                "0 0 0 3px color-mix(in oklch, {colors.accent.dynamic} 35%, transparent)",
              borderColor: "token(colors.accent.dynamic)",
            },
            display: "inline-flex",
            alignItems: "center",
            gap: "token(spacing.glass.sm)",
            padding: "token(spacing.glass.md) token(spacing.glass.lg)",
            color: "token(colors.text.glass.primary)",
            transition:
              "all token(durations.glass.flow) token(easings.glass.flow)",
            _before: {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: "inherit",
              background: "token(colors.glass.gradients.before)",
              pointerEvents: "none",
              zIndex: 1,
            },
            _hover: {
              transform: "translateY(-1px)",
              boxShadow: "token(shadows.glass.hover)",
            },
          },
        },

        // Collapsible - Collapsible content component
        collapsible: {
          className: "collapsible",
          jsx: ["Collapsible"],
          base: {
            position: "relative",
            overflow: "hidden",
            background: "token(colors.glass.bg)",
            backdropFilter: "blur(token(blurs.glass.md))",
            border: "1px solid token(colors.glass.border)",
            boxShadow: "token(shadows.glass.base)",
            borderRadius: "token(radii.roles.card)",
            _before: {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: "inherit",
              background: "token(colors.glass.gradients.before)",
              pointerEvents: "none",
              zIndex: 1,
            },
          },
        },

        // Editable - Inline editing component
        editable: {
          className: "editable",
          jsx: ["Editable"],
          base: {
            position: "relative",
            overflow: "hidden",
            background: "token(colors.glass.bg)",
            backdropFilter: "blur(token(blurs.glass.md))",
            border: "1px solid token(colors.glass.border)",
            boxShadow: "token(shadows.glass.base)",
            borderRadius: "token(radii.roles.field)",
            padding: "token(spacing.glass.md)",
            color: "token(colors.text.glass.primary)",
            _before: {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: "inherit",
              background: "token(colors.glass.gradients.before)",
              pointerEvents: "none",
              zIndex: 1,
            },
          },
        },

        // Field - Form field wrapper component
        field: {
          className: "field",
          jsx: ["Field"],
          base: {
            position: "relative",
            display: "flex",
            flexDirection: "column",
            gap: "token(spacing.glass.sm)",
            width: "100%",
          },
        },

        // Fieldset - Form fieldset component
        fieldset: {
          className: "fieldset",
          jsx: ["Fieldset"],
          base: {
            position: "relative",
            overflow: "hidden",
            background: "token(colors.glass.bg)",
            backdropFilter: "blur(token(blurs.glass.md))",
            border: "1px solid token(colors.glass.border)",
            boxShadow: "token(shadows.glass.base)",
            borderRadius: "token(radii.roles.card)",
            padding: "token(spacing.glass.lg)",
            _before: {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: "inherit",
              background: "token(colors.glass.gradients.before)",
              pointerEvents: "none",
              zIndex: 1,
            },
          },
        },

        // FloatingPanel - Floating draggable panel component
        floatingPanel: {
          className: "floating-panel",
          jsx: ["FloatingPanel"],
          base: {
            position: "relative",
            overflow: "hidden",
            background: "token(colors.glass.bg)",
            backdropFilter: "blur(token(blurs.glass.md))",
            border: "1px solid token(colors.glass.border)",
            boxShadow: "token(shadows.glass.base)",
            borderRadius: "token(radii.roles.card)",
            minWidth: "200px",
            minHeight: "100px",
            _before: {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: "inherit",
              background: "token(colors.glass.gradients.before)",
              pointerEvents: "none",
              zIndex: 1,
            },
          },
        },

        // HoverCard - Hover tooltip card component
        hoverCard: {
          className: "hover-card",
          jsx: ["HoverCard"],
          base: {
            position: "relative",
            overflow: "hidden",
            background: "token(colors.glass.bg)",
            backdropFilter: "blur(token(blurs.glass.md))",
            border: "1px solid token(colors.glass.border)",
            boxShadow: "token(shadows.glass.base)",
            borderRadius: "token(radii.roles.sheet)",
            padding: "token(spacing.glass.lg)",
            maxWidth: "300px",
            zIndex: 50,
            color: "token(colors.text.glass.primary)",
            _before: {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: "inherit",
              background: "token(colors.glass.gradients.before)",
              pointerEvents: "none",
              zIndex: 1,
            },
          },
        },

        // Listbox - Selectable list component
        listbox: {
          className: "listbox",
          jsx: ["Listbox"],
          base: {
            position: "relative",
            overflow: "hidden",
            background: "token(colors.glass.bg)",
            backdropFilter: "blur(token(blurs.glass.md))",
            border: "1px solid token(colors.glass.border)",
            boxShadow: "token(shadows.glass.base)",
            borderRadius: "token(radii.roles.sheet)",
            padding: "token(spacing.glass.sm)",
            maxHeight: "300px",
            overflowY: "auto",
            _before: {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: "inherit",
              background: "token(colors.glass.gradients.before)",
              pointerEvents: "none",
              zIndex: 1,
            },
          },
        },

        // PasswordInput - Password input with toggle component
        passwordInput: {
          className: "password-input",
          jsx: ["PasswordInput"],
          base: {
            position: "relative",
            overflow: "hidden",
            background: "token(colors.glass.bg)",
            backdropFilter: "blur(token(blurs.glass.md))",
            border: "1px solid token(colors.glass.border)",
            boxShadow: "token(shadows.glass.base)",
            borderRadius: "token(radii.roles.field)",
            display: "flex",
            alignItems: "center",
            _before: {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: "inherit",
              background: "token(colors.glass.gradients.before)",
              pointerEvents: "none",
              zIndex: 1,
            },
          },
        },

        // ProgressCircular - Circular progress component
        progressCircular: {
          className: "progress-circular",
          jsx: ["ProgressCircular"],
          base: {
            position: "relative",
            overflow: "hidden",
            background: "token(colors.glass.bg)",
            backdropFilter: "blur(token(blurs.glass.md))",
            border: "1px solid token(colors.glass.border)",
            boxShadow: "token(shadows.glass.base)",
            borderRadius: "token(radii.full)",
            _before: {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: "inherit",
              background: "token(colors.glass.gradients.before)",
              pointerEvents: "none",
              zIndex: 1,
            },
          },
          variants: {
            size: {
              sm: { width: "40px", height: "40px" },
              md: { width: "60px", height: "60px" },
              lg: { width: "80px", height: "80px" },
            },
          },
          defaultVariants: { size: "md" },
        },

        // ProgressLinear - Linear progress component
        progressLinear: {
          className: "progress-linear",
          jsx: ["ProgressLinear"],
          base: {
            position: "relative",
            overflow: "hidden",
            background: "token(colors.glass.bg)",
            backdropFilter: "blur(token(blurs.glass.md))",
            border: "1px solid token(colors.glass.border)",
            boxShadow: "token(shadows.glass.base)",
            borderRadius: "token(radii.full)",
            width: "100%",
            _before: {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: "inherit",
              background: "token(colors.glass.gradients.before)",
              pointerEvents: "none",
              zIndex: 1,
            },
          },
          variants: {
            size: {
              sm: { height: "4px" },
              md: { height: "8px" },
              lg: { height: "12px" },
            },
          },
          defaultVariants: { size: "md" },
        },

        // QrCode - QR code display component
        qrCode: {
          className: "qr-code",
          jsx: ["QrCode"],
          base: {
            position: "relative",
            overflow: "hidden",
            background: "token(colors.glass.bg)",
            backdropFilter: "blur(token(blurs.glass.md))",
            border: "1px solid token(colors.glass.border)",
            boxShadow: "token(shadows.glass.base)",
            borderRadius: "token(radii.roles.card)",
            padding: "token(spacing.glass.lg)",
            display: "inline-block",
            _before: {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: "inherit",
              background: "token(colors.glass.gradients.before)",
              pointerEvents: "none",
              zIndex: 1,
            },
          },
        },

        // ScrollArea - Custom scrollable area component
        scrollArea: {
          className: "scroll-area",
          jsx: ["ScrollArea"],
          base: {
            position: "relative",
            overflow: "hidden",
            background: "token(colors.glass.bg)",
            backdropFilter: "blur(token(blurs.glass.md))",
            border: "1px solid token(colors.glass.border)",
            boxShadow: "token(shadows.glass.base)",
            borderRadius: "token(radii.roles.card)",
            _before: {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: "inherit",
              background: "token(colors.glass.gradients.before)",
              pointerEvents: "none",
              zIndex: 1,
            },
          },
        },

        // SegmentGroup - Segmented control component
        segmentGroup: {
          className: "segment-group",
          jsx: ["SegmentGroup"],
          base: {
            position: "relative",
            overflow: "hidden",
            background: "token(colors.glass.bg)",
            backdropFilter: "blur(token(blurs.glass.md))",
            border: "1px solid token(colors.glass.border)",
            boxShadow: "token(shadows.glass.base)",
            borderRadius: "token(radii.roles.button)",
            display: "flex",
            padding: "token(spacing.glass.xs)",
            gap: "token(spacing.glass.xs)",
            _before: {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: "inherit",
              background: "token(colors.glass.gradients.before)",
              pointerEvents: "none",
              zIndex: 1,
            },
          },
        },

        // SignaturePad - Digital signature component
        signaturePad: {
          className: "signature-pad",
          jsx: ["SignaturePad"],
          base: {
            position: "relative",
            overflow: "hidden",
            background: "token(colors.glass.bg)",
            backdropFilter: "blur(token(blurs.glass.md))",
            border: "1px solid token(colors.glass.border)",
            boxShadow: "token(shadows.glass.base)",
            borderRadius: "token(radii.roles.card)",
            cursor: "crosshair",
            _before: {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: "inherit",
              background: "token(colors.glass.gradients.before)",
              pointerEvents: "none",
              zIndex: 1,
            },
          },
        },

        // Splitter - Resizable panels component
        splitter: {
          className: "splitter",
          jsx: ["Splitter"],
          base: {
            position: "relative",
            overflow: "hidden",
            background: "token(colors.glass.bg)",
            backdropFilter: "blur(token(blurs.glass.md))",
            border: "1px solid token(colors.glass.border)",
            boxShadow: "token(shadows.glass.base)",
            borderRadius: "token(radii.roles.card)",
            display: "flex",
            _before: {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: "inherit",
              background: "token(colors.glass.gradients.before)",
              pointerEvents: "none",
              zIndex: 1,
            },
          },
        },

        // Steps - Step indicator component
        steps: {
          className: "steps",
          jsx: ["Steps"],
          base: {
            position: "relative",
            overflow: "hidden",
            background: "token(colors.glass.bg)",
            backdropFilter: "blur(token(blurs.glass.md))",
            border: "1px solid token(colors.glass.border)",
            boxShadow: "token(shadows.glass.base)",
            borderRadius: "token(radii.roles.card)",
            padding: "token(spacing.glass.lg)",
            _before: {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: "inherit",
              background: "token(colors.glass.gradients.before)",
              pointerEvents: "none",
              zIndex: 1,
            },
          },
        },

        // TagsInput - Multi-tag input component
        tagsInput: {
          className: "tags-input",
          jsx: ["TagsInput"],
          base: {
            position: "relative",
            overflow: "hidden",
            background: "token(colors.glass.bg)",
            backdropFilter: "blur(token(blurs.glass.md))",
            border: "1px solid token(colors.glass.border)",
            boxShadow: "token(shadows.glass.base)",
            borderRadius: "token(radii.roles.field)",
            display: "flex",
            flexWrap: "wrap",
            gap: "token(spacing.glass.sm)",
            padding: "token(spacing.glass.md)",
            _before: {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: "inherit",
              background: "token(colors.glass.gradients.before)",
              pointerEvents: "none",
              zIndex: 1,
            },
          },
        },

        // Timer - Timer/countdown component
        timer: {
          className: "timer",
          jsx: ["Timer"],
          base: {
            position: "relative",
            overflow: "hidden",
            background: "token(colors.glass.bg)",
            backdropFilter: "blur(token(blurs.glass.md))",
            border: "1px solid token(colors.glass.border)",
            boxShadow: "token(shadows.glass.base)",
            borderRadius: "token(radii.roles.card)",
            padding: "token(spacing.glass.lg)",
            textAlign: "center",
            color: "token(colors.text.glass.primary)",
            _before: {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: "inherit",
              background: "token(colors.glass.gradients.before)",
              pointerEvents: "none",
              zIndex: 1,
            },
          },
        },

        // Toggle - Simple toggle component
        toggle: {
          className: "toggle",
          jsx: ["Toggle"],
          base: {
            position: "relative",
            overflow: "hidden",
            background: "token(colors.glass.bg)",
            backdropFilter: "blur(token(blurs.glass.md))",
            border: "1px solid token(colors.glass.border)",
            boxShadow: "token(shadows.glass.base)",
            borderRadius: "token(radii.roles.control)",
            cursor: "pointer",
            _focusVisible: {
              outline: "none",
              boxShadow:
                "0 0 0 3px color-mix(in oklch, {colors.accent.dynamic} 35%, transparent)",
              borderColor: "token(colors.accent.dynamic)",
            },
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "token(spacing.glass.md)",
            color: "token(colors.text.glass.primary)",
            transition:
              "all token(durations.glass.flow) token(easings.glass.flow)",
            _before: {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: "inherit",
              background: "token(colors.glass.gradients.before)",
              pointerEvents: "none",
              zIndex: 1,
            },
            _hover: {
              transform: "translateY(-1px)",
              boxShadow: "token(shadows.glass.hover)",
            },
            _pressed: {
              background: "token(colors.glass.medium.bg)",
            },
          },
        },

        // ToggleGroup - Toggle group component
        toggleGroup: {
          className: "toggle-group",
          jsx: ["ToggleGroup"],
          base: {
            position: "relative",
            overflow: "hidden",
            background: "token(colors.glass.bg)",
            backdropFilter: "blur(token(blurs.glass.md))",
            border: "1px solid token(colors.glass.border)",
            boxShadow: "token(shadows.glass.base)",
            borderRadius: "token(radii.roles.button)",
            display: "flex",
            padding: "token(spacing.glass.xs)",
            gap: "token(spacing.glass.xs)",
            _before: {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: "inherit",
              background: "token(colors.glass.gradients.before)",
              pointerEvents: "none",
              zIndex: 1,
            },
          },
        },

        // Tour - Guided tour component
        tour: {
          className: "tour",
          jsx: ["Tour"],
          base: {
            position: "relative",
            overflow: "hidden",
            background: "token(colors.glass.bg)",
            backdropFilter: "blur(token(blurs.glass.md))",
            border: "1px solid token(colors.glass.border)",
            boxShadow: "token(shadows.glass.base)",
            borderRadius: "token(radii.roles.sheet)",
            padding: "token(spacing.glass.lg)",
            maxWidth: "400px",
            zIndex: 100,
            _before: {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: "inherit",
              background: "token(colors.glass.gradients.before)",
              pointerEvents: "none",
              zIndex: 1,
            },
          },
        },

        // TreeView - Hierarchical tree component
        treeView: {
          className: "tree-view",
          jsx: ["TreeView"],
          base: {
            position: "relative",
            overflow: "hidden",
            background: "token(colors.glass.bg)",
            backdropFilter: "blur(token(blurs.glass.md))",
            border: "1px solid token(colors.glass.border)",
            boxShadow: "token(shadows.glass.base)",
            borderRadius: "token(radii.roles.card)",
            padding: "token(spacing.glass.md)",
            _before: {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: "inherit",
              background: "token(colors.glass.gradients.before)",
              pointerEvents: "none",
              zIndex: 1,
            },
          },
        },
      },
    },
  },

  globalCss: {
    "*": {
      boxSizing: "border-box",
      touchAction: "manipulation",
    },

    body: {
      fontFamily: '"SF Pro Display", sans-serif',
      margin: 0,
      padding: 0,
    },

    // Global liquid glass animation classes
    ".liquid-wobble-active": {
      animation:
        "liquidJiggle token(durations.glass.bounce) token(easings.glass.bounce)",
    },

    ".liquid-pressed": {
      transform: "translateY(1px) scale(0.96)",
      transition:
        "all token(durations.glass.instant) token(easings.glass.flow)",
    },

    ".liquid-flow": {
      animation:
        "liquidFlow token(durations.glass.flow) token(easings.glass.flow)",
    },

    // Add missing keyframes for spin animation
    "@keyframes spin": {
      "0%": { transform: "rotate(0deg)" },
      "100%": { transform: "rotate(360deg)" },
    },
  },

  // Extract static CSS for all recipe variants (essential for library builds)
  staticCss: {
    recipes: {
      // Generate CSS for all button variants
      button: [
        {
          variant: [
            "primary",
            "secondary",
            "ghost",
            "danger",
            "success",
            "warning",
          ],
        },
        { size: ["sm", "md", "lg", "xl"] },
      ],
      // Generate CSS for all other component recipes
      card: ["*"],
      badge: ["*"],
      symbolTile: ["*"],
      input: ["*"],
      dialog: ["*"],
      tabs: ["*"],
      checkbox: ["*"],
      switchToggle: ["*"],
      tooltip: ["*"],
      popover: ["*"],
      accordion: ["*"],
      avatar: ["*"],
      carousel: ["*"],
      clipboard: ["*"],
      collapsible: ["*"],
      colorPicker: ["*"],
      combobox: ["*"],
      datePicker: ["*"],
      editable: ["*"],
      field: ["*"],
      fieldset: ["*"],
      fileUpload: ["*"],
      floatingPanel: ["*"],
      hoverCard: ["*"],
      listbox: ["*"],
      menu: ["*"],
      numberInput: ["*"],
      pagination: ["*"],
      passwordInput: ["*"],
      pinInput: ["*"],
      progress: ["*"],
      progressCircular: ["*"],
      progressLinear: ["*"],
      qrCode: ["*"],
      radioGroup: ["*"],
      ratingGroup: ["*"],
      scrollArea: ["*"],
      segmentGroup: ["*"],
      select: ["*"],
      signaturePad: ["*"],
      slider: ["*"],
      splitter: ["*"],
      steps: ["*"],
      tagsInput: ["*"],
      timer: ["*"],
      toast: ["*"],
      toggle: ["*"],
      toggleGroup: ["*"],
      tour: ["*"],
      treeView: ["*"],
      angleSlider: ["*"],
      liquidGlass: ["*"],
    },
  },

  outdir: "styled-system",
  jsxFramework: "react",
});

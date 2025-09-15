// High‑fidelity Apple‑style token system for Panda CSS
import { defineConfig } from "@pandacss/dev";

export default defineConfig({
	preflight: true,
	jsxFramework: "react",
	// Generate only classes you actually use
	include: ["./src/**/*.{ts,tsx,astro,mdx}"],
	exclude: [],
	// Where Panda should emit the runtime helpers
	outdir: "styled-system",
	theme: {
		extend: {
			tokens: {
				colors: {
					// Core palette approximations (semantic tokens below switch per mode)
					// Use OKLCH friendly colors where possible in your real project
					blue: { 500: { value: "#0A84FF" } },
					indigo: { 500: { value: "#5E5CE6" } },
					teal: { 500: { value: "#64D2FF" } },
					green: { 500: { value: "#34C759" } },
					orange: { 500: { value: "#FF9F0A" } },
					pink: { 500: { value: "#FF375F" } },
					// Neutral bases
					gray: {
						50: { value: "#FBFBFD" },
						100: { value: "#F6F7F8" },
						200: { value: "#E2E4E8" },
						300: { value: "#C6C9D0" },
						600: { value: "#50545B" },
						700: { value: "#2A2B2E" },
						800: { value: "#1A1B1E" },
						900: { value: "#111214" },
					},
				},
				radii: {
					// Approximations tuned to match Apple surfaces
					xs: { value: "8px" },
					sm: { value: "10px" },
					md: { value: "12px" },
					lg: { value: "14px" }, // cards / dialogs
					xl: { value: "18px" }, // hero tiles
					full: { value: "9999px" },
				},
				blurs: {
					sm: { value: "8px" },
					md: { value: "14px" },
					lg: { value: "20px" },
				},
				shadows: {
					// Apple relies more on materials than shadows; keep subtle
					hairline: {
						value:
							"0 0 0 1px color-mix(in oklch, var(--colors-gray-700) 75%, transparent)",
					},
					sm: { value: "0 4px 18px rgba(0,0,0,.18)" },
				},
				fonts: {
					sans: {
						value:
							'-apple-system, system-ui, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Apple Color Emoji", "Segoe UI Emoji"',
					},
					mono: {
						value:
							'ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace',
					},
				},
			},
			textStyles: {
				// Apple-like hierarchy
				display: {
					value: {
						fontFamily: "sans",
						fontWeight: "700",
						letterSpacing: "-0.01em",
						lineHeight: "1.1",
						fontSize: { base: "clamp(36px, 2.5vw + 20px, 56px)" },
					},
				},
				title1: {
					value: {
						fontFamily: "sans",
						fontWeight: "700",
						letterSpacing: "-0.01em",
						fontSize: { base: "clamp(24px, 1vw + 16px, 32px)" },
						lineHeight: "1.2",
					},
				},
				title3: {
					value: {
						fontFamily: "sans",
						fontWeight: "600",
						letterSpacing: "-0.01em",
						fontSize: "18px",
						lineHeight: "1.25",
					},
				},
				body: {
					value: { fontFamily: "sans", fontSize: "16px", lineHeight: "1.6" },
				},
				caption: {
					value: { fontFamily: "sans", fontSize: "14px", lineHeight: "1.4" },
				},
			},
			semanticTokens: {
				colors: {
					// Foreground
					text: {
						value: { base: "{colors.gray.900}", _dark: "{colors.gray.50}" },
					},
					muted: { value: { base: "{colors.gray.600}", _dark: "#A7AAB0" } },
					// Background tiers
					"bg.canvas": {
						value: { base: "{colors.gray.50}", _dark: "{colors.gray.900}" },
					},
					"bg.surface": {
						value: { base: "{colors.gray.100}", _dark: "{colors.gray.800}" },
					},
					"bg.subtle": { value: { base: "#F2F3F5", _dark: "#0F1012" } },
					// Borders / hairlines
					"border.default": {
						value: { base: "{colors.gray.200}", _dark: "{colors.gray.700}" },
					},
					"border.hairline": {
						value: {
							base: "color-mix(in oklch, #000 10%, transparent)",
							_dark: "color-mix(in oklch, #fff 8%, transparent)",
						},
					},
					// Accents
					primary: {
						value: { base: "{colors.blue.500}", _dark: "{colors.blue.500}" },
					},
					success: {
						value: { base: "{colors.green.500}", _dark: "{colors.green.500}" },
					},
					info: {
						value: {
							base: "{colors.indigo.500}",
							_dark: "{colors.indigo.500}",
						},
					},
					warn: {
						value: {
							base: "{colors.orange.500}",
							_dark: "{colors.orange.500}",
						},
					},
					danger: {
						value: { base: "{colors.pink.500}", _dark: "{colors.pink.500}" },
					},
					// Glass tokens
					"glass.bg": {
						value: {
							base: "color-mix(in oklch, #ffffff 70%, transparent)",
							_dark: "color-mix(in oklch, #000000 55%, transparent)",
						},
					},
					"glass.border": {
						value: {
							base: "color-mix(in oklch, #000 12%, transparent)",
							_dark: "color-mix(in oklch, #fff 12%, transparent)",
						},
					},
					"glass.highlight": {
						value: {
							base: "linear-gradient(180deg, rgba(255,255,255,.14), transparent)",
							_dark:
								"linear-gradient(180deg, rgba(255,255,255,.08), transparent)",
						},
					},
				},
			},
			// Global CSS vars for effects
			layerStyles: {
				glass: {
					value: {
						backgroundColor: "var(--colors-glass-bg)",
						borderWidth: "1px",
						borderColor: "var(--colors-glass-border)",
						backdropFilter: "blur(18px)",
						backgroundImage: "{colors.glass.highlight}",
					},
				},
			},
		},
	},
});

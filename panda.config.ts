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
									border: { value: "{colors.accent.dynamic}" }
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
					},

					// Component Variants (Apple-inspired, token-driven)
					button: {
						// Primary actions use the Apple Blue accent, blended for glass context
							primary: {
								bg: {
									value:
										"linear-gradient(135deg, color-mix(in oklch, {colors.accent.dynamic} 30%, transparent) 0%, color-mix(in oklch, {colors.accent.dynamic} 30%, transparent) 100%)",
								},
								border: { value: "color-mix(in oklch, {colors.accent.dynamic} 50%, transparent)" },
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
              value:
                "color-mix(in oklch, #000 10%, transparent)",
            },
          },
				},

				// Apple-exact border radius system (matches iOS/macOS HIG)
				radii: {
					// Base radius values (Apple standard)
					none: { value: "0px" },
					xs: { value: "4px" },    // Small elements
					sm: { value: "6px" },    // Compact buttons, badges
					md: { value: "8px" },    // Standard buttons, controls
					lg: { value: "12px" },   // Cards, input fields
					xl: { value: "16px" },   // Large cards, sheets
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
					caption2: { value: "11px" },   // Caption 2
					caption1: { value: "12px" },   // Caption 1
					footnote: { value: "13px" },   // Footnote
					subheadline: { value: "15px" }, // Subheadline
					callout: { value: "16px" },    // Callout
					body: { value: "17px" },       // Body (default reading size)
					headline: { value: "17px" },   // Headline
					title3: { value: "20px" },     // Title 3
					title2: { value: "22px" },     // Title 2
					title1: { value: "28px" },     // Title 1
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
					tight: { value: "1.1" },     // For large titles
					snug: { value: "1.2" },      // For headlines
					normal: { value: "1.25" },   // For body text (Apple's preferred)
					relaxed: { value: "1.4" },   // For longer content
					loose: { value: "1.6" },     // For captions

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
					tighter: { value: "-0.02em" },
					tight: { value: "-0.01em" },
					normal: { value: "0" },
					wide: { value: "0.01em" },
					wider: { value: "0.02em" },
					widest: { value: "0.04em" },
				},
			},

			// Apple HIG Typography Styles
			textStyles: {
				display: {
					value: {
						fontFamily: 'token(fonts.display)',
						fontWeight: 'token(fontWeights.bold)',
						letterSpacing: 'token(letterSpacings.tight)',
						lineHeight: 'token(lineHeights.tight)',
						fontSize: { base: 'clamp(36px, 2.5vw + 20px, 56px)' },
					},
				},
				title1: {
					value: {
						fontFamily: 'token(fonts.display)',
						fontWeight: 'token(fontWeights.bold)',
						letterSpacing: 'token(letterSpacings.tight)',
						fontSize: { base: 'clamp(24px, 1vw + 16px, 32px)' },
						lineHeight: 'token(lineHeights.snug)',
					},
				},
				title3: {
					value: {
						fontFamily: 'token(fonts.display)',
						fontWeight: 'token(fontWeights.semibold)',
						letterSpacing: 'token(letterSpacings.tight)',
						fontSize: 'token(fontSizes.title3)',
						lineHeight: 'token(lineHeights.snug)',
					},
				},
				body: {
					value: {
						fontFamily: 'token(fonts.sans)',
						fontSize: 'token(fontSizes.body)',
						lineHeight: 'token(lineHeights.normal)'
					},
				},
				caption: {
					value: {
						fontFamily: 'token(fonts.sans)',
						fontSize: 'token(fontSizes.caption1)',
						lineHeight: 'token(lineHeights.loose)'
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

				// Complete Button recipe using only Panda tokens
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

						// Animations & Transitions
						transition:
							"all token(durations.glass.flow) token(easings.glass.flow)",
						transformOrigin: "center center",

						// Glass pseudo-elements
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

						// Hover effects
						_hover: {
							transform: "translateY(-2px)",
							borderColor: "rgba(255, 255, 255, 0.4)",
							boxShadow: "token(shadows.glass.hover)",
						},

						// Active/pressed state
						_active: {
							transform: "translateY(1px) scale(0.96)",
							transition:
								"all token(durations.glass.instant) token(easings.glass.flow)",
						},

						// Disabled state
						_disabled: {
							opacity: 0.5,
							cursor: "not-allowed",
							pointerEvents: "none",
						},
					},
					variants: {
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
						},
						size: {
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
					defaultVariants: {
						variant: "primary",
						size: "md", // Uses 16px border radius as default
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
              boxShadow: "0 0 0 3px color-mix(in oklch, {colors.accent.dynamic} 35%, transparent)",
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
						_focus: {
							borderColor: "token(colors.glass.accent.border)",
							boxShadow: "token(shadows.glass.hover)",
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

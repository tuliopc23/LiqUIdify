import type { Preview } from "@storybook/react";
import React from "react";
import { GlassUIProvider } from "../../../libs/components/src";
import "../../../libs/components/src/styles/tailwind.css";

// Import the built CSS file if available (for production builds)
if (typeof window !== "undefined") {
	// Try to load the built CSS file
	const link = document.createElement("link");
	link.rel = "stylesheet";
	link.href = "/liquidui.css";
	document.head.append(link);
}

// Add a flag to ensure single initialization
const isInitialized = false;

// Initialize CSS immediately for docs mode
if (typeof document !== "undefined") {
	// Add CSS for docs rendering
	const style = document.createElement("style");
	style.innerHTML = `
    .docs-story {
      background: transparent !important;
      padding: 1rem;
    }
    .sbdocs-preview {
      background: var(--glass-bg-canvas, #ffffff) !important;
      border-radius: 8px;
      overflow: hidden;
    }
    [data-theme="dark"] .sbdocs-preview {
      background: var(--glass-bg-canvas, #0a0a0a) !important;
    }
    /* Ensure canvas backgrounds for story frames */
    .sb-show-main {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
    }
    [data-theme="dark"] .sb-show-main {
      background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%) !important;
    }
    /* Fix for story canvas rendering */
    .sb-show-main .sb-story {
      background: transparent;
    }
    /* Ensure theme variables are available */
    :root {
      --storybook-theme-transition: all 0.3s ease;
    }
  `;
	document.head.append(style);
}

// Remove the problematic color contrast checker function
// This was causing issues in autodocs mode with invalid color arguments
// This function is no longer needed as theme provider handles CSS properties
// Keep for backward compatibility but make it a no-op
function setupCssProperties(theme: "light" | "dark" = "light"): void {
	// The ThemeProvider now handles all CSS custom properties
	console.log(`🎨 Legacy setupCssProperties called with theme: ${theme}`);
}

const preview: Preview = {
	parameters: {
		backgrounds: {
			default: "liquid-gradient",
			values: [
				{
					name: "liquid-gradient",
					value: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
				},
				{
					name: "apple-gradient",
					value:
						"linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
				},
				{
					name: "cosmic",
					value: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
				},
				{
					name: "image-bg",
					value:
						'url("https://images.unsplash.com/photo-1539635278303-d4002c07eae3?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NDk1Njc4NTB8&ixlib=rb-4.1.0&q=85") center/cover',
				},
				{ name: "light", value: "#ffffff" },
				{ name: "dark", value: "#0a0a0a" },
				{
					name: "glass-light",
					value: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
				},
				{
					name: "glass-dark",
					value: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
				},
			],
		},
		actions: {
			argTypesRegex: "^on[A-Z].*",
		},
		controls: {
			matchers: {
				color:
					/^(backgroundcolor|textcolor|bordercolor|fillcolor|strokecolor)$/i,
				date: /Date$/,
			},
			expanded: true,
			exclude: ["color"], // Exclude generic 'color' prop from automatic color control
		},
		docs: {
			theme: {
				brandTitle: "Liquid Glass UI",
				brandUrl: "https://liquidui.dev",
				brandImage: undefined,

				// Light theme configuration
				base: "light",
				colorPrimary: "#007AFF",
				colorSecondary: "#5856D6",

				// Typography
				fontBase: '"Inter", "SF Pro Display", system-ui, sans-serif',
				fontCode:
					'"SF Mono", "Monaco", "Inconsolata", "Roboto Mono", monospace',

				// Light theme colors - ensure good contrast
				textColor: "#1a1a1a",
				textInverseColor: "#ffffff",
				textMutedColor: "#666666",

				// App backgrounds - light theme
				appBg: "#f8fafc",
				appContentBg: "#ffffff",
				appBorderColor: "#e2e8f0",
				appBorderRadius: 8,

				// Toolbar colors - light theme
				barTextColor: "#475569",
				barSelectedColor: "#007AFF",
				barBg: "#ffffff",
				barHoverColor: "#f1f5f9",

				// Form colors - light theme
				inputBg: "#ffffff",
				inputBorder: "#e2e8f0",
				inputTextColor: "#1e293b",
				inputBorderRadius: 8,

				// Button colors
				buttonBg: "#ffffff",
				buttonBorder: "#e2e8f0",
				booleanBg: "#e2e8f0",
				booleanSelectedBg: "#007AFF",

				// Grid and layout
				gridCellSize: 8,
			},
			darkMode: {
				dark: {
					brandTitle: "Liquid Glass UI",
					brandUrl: "https://liquidui.dev",
					brandImage: undefined,

					// Dark theme configuration
					base: "dark",
					colorPrimary: "#0A84FF",
					colorSecondary: "#5E5CE6",

					// Typography - same as light
					fontBase: '"Inter", "SF Pro Display", system-ui, sans-serif',
					fontCode:
						'"SF Mono", "Monaco", "Inconsolata", "Roboto Mono", monospace',

					// Dark theme colors - ensure good contrast
					textColor: "#f1f5f9",
					textInverseColor: "#1e293b",
					textMutedColor: "#94a3b8",

					// App backgrounds - dark glass theme with tinted effect
					appBg: "rgba(15, 23, 42, 0.85)",
					appContentBg: "rgba(30, 41, 59, 0.75)",
					appBorderColor: "rgba(51, 65, 85, 0.6)",
					appBorderRadius: 8,

					// Toolbar colors - dark theme with glass effect
					barTextColor: "#cbd5e1",
					barSelectedColor: "#0A84FF",
					barBg: "rgba(30, 41, 59, 0.8)",
					barHoverColor: "rgba(51, 65, 85, 0.6)",

					// Form colors - dark theme with glass effect
					inputBg: "rgba(51, 65, 85, 0.7)",
					inputBorder: "rgba(71, 85, 105, 0.5)",
					inputTextColor: "#f1f5f9",
					inputBorderRadius: 8,

					// Button colors - dark theme with glass effect
					buttonBg: "rgba(51, 65, 85, 0.7)",
					buttonBorder: "rgba(71, 85, 105, 0.5)",
					booleanBg: "rgba(71, 85, 105, 0.6)",
					booleanSelectedBg: "#0A84FF",

					// Grid and layout
					gridCellSize: 8,
				},
			},
			toc: {
				contentsSelector: ".sbdocs-content",
				headingSelector: "h1, h2, h3",
				ignoreSelector: "#storybook-root",
				title: "Table of Contents",
				disable: false,
				unsafeTocbotOptions: {
					orderedList: false,
				},
			},
			autodocs: true,
			defaultName: "Docs",
			story: {
				inline: true,
				iframeHeight: "200px",
			},
		},
		viewport: {
			viewports: {
				mobile: {
					name: "Mobile",
					styles: { width: "375px", height: "667px" },
				},
				tablet: {
					name: "Tablet",
					styles: { width: "768px", height: "1024px" },
				},
				desktop: {
					name: "Desktop",
					styles: { width: "1440px", height: "900px" },
				},
			},
		},
	},
	globalTypes: {
		theme: {
			description: "Global theme for components",
			defaultValue: "light",
			toolbar: {
				title: "Theme",
				icon: "paintbrush",
				items: ["light", "dark"],
				dynamicTitle: true,
			},
		},
	},
	decorators: [
		(Story, context) => {
			const theme = context.globals.theme || "light";

			// Apply theme to document root
			React.useEffect(() => {
				if (typeof document !== "undefined") {
					const root = document.documentElement;
					root.dataset.theme = theme;
					root.classList.remove("light", "dark");
					root.classList.add(theme);

					// Apply theme-specific background with glass aesthetics
					const storybook = document.querySelector(
						".sb-show-main",
					) as HTMLElement;
					if (storybook) {
						if (theme === "dark") {
							storybook.style.background =
								"radial-gradient(ellipse at top, rgba(59, 130, 246, 0.15) 0%, rgba(15, 23, 42, 0.9) 35%, rgba(30, 41, 59, 0.95) 100%)";
							storybook.style.backdropFilter = "blur(20px) saturate(180%)";
							storybook.style.color = "#f1f5f9";
						} else {
							storybook.style.background =
								"radial-gradient(ellipse at top, rgba(59, 130, 246, 0.08) 0%, rgba(248, 250, 252, 0.95) 35%, rgba(226, 232, 240, 0.98) 100%)";
							storybook.style.backdropFilter = "blur(20px) saturate(120%)";
							storybook.style.color = "#1e293b";
						}
					}

					// Apply theme to docs container with glass effect
					const docsContainer = document.querySelector(
						".sbdocs",
					) as HTMLElement;
					if (docsContainer) {
						if (theme === "dark") {
							docsContainer.style.background = "rgba(15, 23, 42, 0.9)";
							docsContainer.style.backdropFilter = "blur(10px) saturate(150%)";
							docsContainer.style.color = "#f1f5f9";
						} else {
							docsContainer.style.background = "rgba(255, 255, 255, 0.95)";
							docsContainer.style.backdropFilter = "blur(10px) saturate(120%)";
							docsContainer.style.color = "#1e293b";
						}
					}
				}
			}, [theme]);

			// Wrap story in GlassUIProvider for all necessary context providers
			return React.createElement(
				GlassUIProvider,
				{ theme: theme },
				React.createElement(
					"div",
					{
						"data-theme": theme,
						className: `storybook-wrapper ${theme}`,
						style: {
							minHeight: "200px",
							padding: "1rem",
							background:
								theme === "dark"
									? "rgba(30, 41, 59, 0.3)"
									: "rgba(255, 255, 255, 0.4)",
							backdropFilter: "blur(8px) saturate(140%)",
							color: theme === "dark" ? "#f1f5f9" : "#1e293b",
							borderRadius: "8px",
							border:
								theme === "dark"
									? "1px solid rgba(255, 255, 255, 0.1)"
									: "1px solid rgba(0, 0, 0, 0.05)",
						},
					},
					React.createElement(Story),
				),
			);
		},
	],
};

export default preview;

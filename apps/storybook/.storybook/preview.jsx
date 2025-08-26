import React from "react";
// Use package CSS export to mirror consumer usage
import "liquidify/css";
// Load Tailwind utilities from the library's entry to enable utility classes
import "@/styles/tailwind.css";
// Wrap stories with the library's ThemeProvider so global theme toggle works
import { ThemeProvider } from "@/hooks/use-theme";
import { LiquidGlassDefs } from "liquidify";

// Standard backgrounds matching HTML preview design
const glassLightBg = `
  radial-gradient(80rem 60rem at 20% 20%, rgba(162, 210, 255, 0.3), transparent 60%),
  radial-gradient(80rem 60rem at 80% 30%, rgba(255, 183, 248, 0.28), transparent 60%),
  linear-gradient(135deg, #c9e7ff 0%, #d9d0ff 45%, #ffc9dc 100%)
`;

// Solid canvas colors that enhance glass effects (high contrast, low noise)
const glassCanvasLight = "#e9eef6"; // soft cool light for subtle shadows  
const glassCanvasDark = "#0b1220"; // deep midnight blue to make glass pop

// noinspection JSUnusedGlobalSymbols
export const parameters = {
  codesandbox: {
    apiToken: "csb_v1_TM4R_k01DU7Jg9Ct7aHqbbuZ57__kbVfbs6Uk6lhtsc",
    dependencies: {
      "@radix-ui/themes": "latest",
      "@myscope/mypackage": "1.0.0",
    },
    fallbackImport: "@radix-ui/themes",
  },
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: {
    theme: {
      base: "dark",
      colorPrimary: "var(--lg-primary, #007AFF)",
      colorSecondary: "var(--lg-primary-light, #5AC8FA)",
      appBg: "var(--glass-bg-canvas, #0d1117)",
      appContentBg: "var(--lg-bg-color, #0f1524)",
      textColor: "var(--lg-text, #ffffff)",
      brandTitle: "LiqUIdify",
      brandUrl: "https://liquidify.dev",
    },
  },
  backgrounds: {
    default: "glass-light",
    values: [
      { name: "glass-light", value: glassLightBg },
      { name: "glass-dark", value: glassCanvasDark },
      { name: "glass-canvas-light", value: glassCanvasLight },
      { name: "transparent", value: "transparent" },
    ],
  },
  viewport: {
    viewports: {
      mobile: {
        name: "Mobile",
        styles: {
          width: "375px",
          height: "667px",
        },
      },
      tablet: {
        name: "Tablet",
        styles: {
          width: "768px",
          height: "1024px",
        },
      },
      desktop: {
        name: "Desktop",
        styles: {
          width: "1200px",
          height: "800px",
        },
      },
    },
  },
  // Automated accessibility testing with axe-core
  a11y: {
    // Limit run to WCAG 2.0/2.1 A  AA rules for quicker feedback
    options: {
      runOnly: ["wcag2a", "wcag21a", "wcag2aa", "wcag21aa"],
    },
    // Fine-tune individual rules
    config: {
      rules: [
        // Keep color-contrast enabled (default) so we surface issues
        { id: "color-contrast", enabled: true },
        // Ensure scrollable regions are focusable
        { id: "scrollable-region-focusable", enabled: true },
      ],
    },
  },
};

// noinspection JSUnusedGlobalSymbols
export const globalTypes = {
  theme: {
    description: "Global theme for components",
    defaultValue: "light",
    toolbar: {
      title: "Theme",
      icon: "paintbrush",
      items: [
        { value: "light", title: "Light Mode" },
        { value: "dark", title: "Dark Mode" },
      ],
      dynamicTitle: true,
    },
  },
  canvasBg: {
    description: "Canvas background for the preview (gradients supported)",
    defaultValue: "glass-dark",
    toolbar: {
      title: "Canvas BG",
      icon: "photo",
      items: [
        { value: "glass-dark", title: "Glass Dark (solid)" },
        { value: "glass-light", title: "Glass Light (solid)" },
        { value: "light", title: "Light Gradient" },
        { value: "dark", title: "Dark Gradient" },
        { value: "transparent", title: "Transparent" },
      ],
      dynamicTitle: true,
    },
  },
};

// noinspection JSUnusedGlobalSymbols
export const decorators = [
  // 1) Canvas background controller: set a data attribute on the preview document
  (Story, context) => {
    const canvasBg = context.globals.canvasBg || "glass-dark";
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-canvas-bg", canvasBg);
    }
    return <Story />;
  },
  // 2) UI wrapper: theme provider and typography only (transparent wrapper)
  (Story, context) => {
    const theme = context.globals.theme || "light";
    return (
      <ThemeProvider defaultTheme="light">
        <LiquidGlassDefs />
        <div
          className={`${theme} min-h-screen p-4`}
          style={{
            fontFamily:
              "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            fontSize: "16px",
            lineHeight: "1.5",
            color: theme === "dark" ? "#ffffff" : "#000000",
          }}
        >
          <React.StrictMode>
            <Story />
          </React.StrictMode>
        </div>
      </ThemeProvider>
    );
  },
];

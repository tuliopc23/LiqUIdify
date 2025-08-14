import React from "react";
// Use package CSS export to mirror consumer usage
import "liquidify/css";
// Load Tailwind utilities from the library's entry to enable utility classes
import "@/styles/tailwind.css";
// Wrap stories with the library's ThemeProvider so global theme toggle works
import { ThemeProvider } from "@/hooks/use-theme";
import { LiquidGlassDefs } from "liquidify";

const lightBg = `
  radial-gradient(1200px 800px at 10% 10%, rgba(255,255,255,0.9), rgba(247,249,252,0.85) 30%, rgba(235,240,247,0.75) 60%, rgba(229,233,241,0.7) 100%),
  radial-gradient(1000px 600px at 80% 20%, rgba(102,126,234,0.25), transparent 60%),
  radial-gradient(900px 700px at 20% 80%, rgba(90,200,250,0.18), transparent 60%),
  linear-gradient(180deg, #eef2f7 0%, #e6ebf3 100%)
`;
const darkBg = `
  radial-gradient(1200px 800px at 10% 10%, rgba(14,18,28,0.98), rgba(14,18,28,0.92) 30%, rgba(18,22,34,0.9) 60%, rgba(20,24,33,0.9) 100%),
  radial-gradient(1000px 600px at 80% 20%, rgba(102,126,234,0.18), transparent 60%),
  radial-gradient(900px 700px at 20% 80%, rgba(90,200,250,0.14), transparent 60%),
  linear-gradient(180deg, #0d111a 0%, #121725 100%)
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
      colorPrimary: "#007AFF",
      colorSecondary: "#5AC8FA",
      appBg: "#0d1117",
      appContentBg: "#0f1524",
      textColor: "#ffffff",
      brandTitle: "LiqUIdify",
      brandUrl: "https://liquidify.dev",
    },
  },
  backgrounds: {
    default: "glass-dark",
    values: [
      { name: "glass-dark", value: glassCanvasDark },
      { name: "glass-light", value: glassCanvasLight },
      { name: "light", value: lightBg },
      { name: "dark", value: darkBg },
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
    // Limit run to WCAG 2.0/2.1 A & AA rules for quicker feedback
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
};

// noinspection JSUnusedGlobalSymbols
export const decorators = [
  (Story, context) => {
    const theme = context.globals.theme || "light";
    // Background is controlled by the Backgrounds addon; keep wrapper transparent

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

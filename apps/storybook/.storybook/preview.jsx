import React from "react";
// Use package CSS export to mirror consumer usage
import "liquidify/css";
// Load Tailwind utilities from the library's entry to enable utility classes
import "@/styles/tailwind.css";
// Wrap stories with the library's ThemeProvider so global theme toggle works
import { ThemeProvider } from "@/hooks/use-theme";
import { LiquidGlassDefs } from "liquidify";

// Modern gradient backgrounds with flowing colorful shapes
const lightGradientBg = `
  radial-gradient(ellipse 800px 600px at 10% 20%, rgba(255, 154, 88, 0.8) 0%, rgba(255, 88, 195, 0.8) 25%, rgba(139, 69, 255, 0.8) 50%, rgba(44, 158, 255, 0.8) 75%, transparent 100%),
  radial-gradient(ellipse 600px 800px at 90% 80%, rgba(154, 255, 88, 0.6) 0%, rgba(88, 255, 195, 0.6) 25%, rgba(88, 154, 255, 0.6) 50%, rgba(195, 88, 255, 0.6) 75%, transparent 100%),
  linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)
`;

const darkGradientBg = `
  radial-gradient(ellipse 800px 600px at 10% 20%, rgba(255, 88, 88, 0.4) 0%, rgba(255, 88, 195, 0.4) 25%, rgba(139, 69, 255, 0.6) 50%, transparent 100%),
  radial-gradient(ellipse 600px 800px at 90% 80%, rgba(255, 154, 88, 0.3) 0%, rgba(88, 195, 255, 0.4) 25%, rgba(195, 88, 255, 0.5) 50%, transparent 100%),
  linear-gradient(135deg, #0c0c0c 0%, #1a0a1a 50%, #0a0a1a 100%)
`;

// Image backgrounds (served from apps/storybook/public/backgrounds)
const greyImageBg = `url('/backgrounds/3cbf0e6a-09c8-4b47-9560-c3ff84130086.webp') center / cover no-repeat`;
const tahoeImageBg = `url('/backgrounds/Tahoe1x1.webp') center / cover no-repeat`;

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
    // Default canvas background
    default: "grey",
    values: [
      { name: "light", value: lightGradientBg },
      { name: "dark", value: darkGradientBg },
      { name: "grey", value: greyImageBg },
      { name: "tahoe", value: tahoeImageBg },
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
    defaultValue: "grey",
    toolbar: {
      title: "Canvas BG",
      icon: "photo",
      items: [
        { value: "light", title: "Light Gradient" },
        { value: "dark", title: "Dark Gradient" },
        { value: "grey", title: "Grey Image" },
        { value: "tahoe", title: "Tahoe Image" },
      ],
      dynamicTitle: true,
    },
  },
};

// noinspection JSUnusedGlobalSymbols
export const decorators = [
  // 1) Canvas background controller: set a data attribute on the preview document
  (Story, context) => {
    const canvasBg = context.globals.canvasBg || "light";
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

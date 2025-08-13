import React from "react";
// Use package CSS export to mirror consumer usage
import "liquidify/css";
// Wrap stories with the library's ThemeProvider so global theme toggle works
import { ThemeProvider } from "@/hooks/use-theme";
import { LiquidGlassDefs } from "liquidify";

const preview = {
  parameters: {
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
        colorPrimary: "#fb4268",
        colorSecondary: "#667eea",
        appBg: "#1a1a1a",
        appContentBg: "#2a2a2a",
        textColor: "#ffffff",
      },
    },
    backgrounds: {
      default: "light",
      values: [
        {
          name: "light",
          value: "#ffffff", // Pure white for light theme
        },
        {
          name: "dark",
          value: "#1a1a1a", // Subtle dark grey for dark theme
        },
        {
          name: "transparent",
          value: "transparent",
        },
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
  },
  globalTypes: {
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
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || "light";

      return (
        <ThemeProvider defaultTheme="light">
          <LiquidGlassDefs />
          <div
            className={`${theme} min-h-screen p-4`}
            style={{
              fontFamily: "system-ui, sans-serif",
              background: theme === "dark" ? "#1a1a1a" : "#ffffff",
            }}
          >
            <React.StrictMode>
              <Story />
            </React.StrictMode>
          </div>
        </ThemeProvider>
      );
    },
  ],
};

export default preview;

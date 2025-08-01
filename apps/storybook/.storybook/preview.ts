import type { Preview } from "@storybook/react";
import React from "react";
import { GlassUIProvider } from "../../../libs/components/src/providers/glass-ui-provider";
import { ThemeProvider } from "../../../libs/components/src/hooks/use-theme";

// Import CSS styles
import "../../../libs/components/src/styles/glass.css";
import "../../../libs/components/src/styles/glass-core.css";
import "../../../libs/components/src/styles/glass-themes.css";
import "../../../libs/components/src/styles/glass-animations.css";
import "../../../libs/components/src/styles/glass-utilities.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      expanded: true,
    },
    docs: {
      toc: true,
      canvas: { sourceState: "shown" },
    },
    backgrounds: {
      default: "glass",
      values: [
        {
          name: "glass",
          value: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        },
        {
          name: "light",
          value: "#ffffff",
        },
        {
          name: "dark",
          value: "#1a1a1a",
        },
      ],
    },
    viewport: {
      viewports: {
        mobile1: {
          name: "Small mobile",
          styles: { width: "320px", height: "568px" },
          type: "mobile",
        },
        mobile2: {
          name: "Large mobile",
          styles: { width: "414px", height: "896px" },
          type: "mobile",
        },
        tablet: {
          name: "Tablet",
          styles: { width: "768px", height: "1024px" },
          type: "tablet",
        },
        desktop: {
          name: "Desktop",
          styles: { width: "1440px", height: "900px" },
          type: "desktop",
        },
      },
    },
    a11y: {
      config: {
        rules: [
          {
            id: "color-contrast",
            enabled: true,
          },
          {
            id: "aria-roles",
            enabled: true,
          },
        ],
      },
    },
  },
  globalTypes: {
    theme: {
      name: "Theme",
      description: "Global theme for components",
      defaultValue: "light",
      toolbar: {
        icon: "paintbrush",
        items: [
          { value: "light", title: "Light", right: "☀️" },
          { value: "dark", title: "Dark", right: "🌙" },
        ],
        showName: true,
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme as "light" | "dark";

      // Apply theme to document element
      React.useEffect(() => {
        if (typeof document !== "undefined") {
          document.documentElement.setAttribute("data-theme", theme);
          document.body.className =
            document.body.className.replace(/theme-(light|dark)/g, "") +
            ` theme-${theme}`;
        }
      }, [theme]);

      try {
        return React.createElement(
          ThemeProvider,
          { defaultTheme: theme },
          React.createElement(
            GlassUIProvider,
            {
              config: {
                enableAnimations: true,
                enableGlassEffects: true,
                reducedMotion: false,
              },
            },
            React.createElement(
              "div",
              {
                style: {
                  padding: "1rem",
                  minHeight: "100vh",
                  background:
                    theme === "dark"
                      ? "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)"
                      : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                },
              },
              React.createElement(Story),
            ),
          ),
        );
      } catch (error) {
        console.error("Storybook decorator error:", error);
        return React.createElement(
          "div",
          { style: { padding: "1rem", color: "red" } },
          React.createElement("h3", null, "Story Error"),
          React.createElement(
            "p",
            null,
            "Failed to render story: ",
            error instanceof Error ? error.message : "Unknown error",
          ),
          React.createElement(
            "details",
            null,
            React.createElement("summary", null, "Error Details"),
            React.createElement(
              "pre",
              null,
              error instanceof Error ? error.stack : String(error),
            ),
          ),
        );
      }
    },
  ],
};

export default preview;

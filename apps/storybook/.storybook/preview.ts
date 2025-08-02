import type { Preview } from "@storybook/react-vite";
import React from "react";
import { GlassUIProvider } from "../../../libs/components/src/providers/glass-ui-provider";

// Import new Tailwind CSS
import "../../../libs/components/src/styles/index.css";

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
      default: "dark",
      values: [
        {
          name: "light",
          value: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        },
        {
          name: "dim",
          value: "linear-gradient(135deg, #2d3748 0%, #4a5568 100%)",
        },
        {
          name: "accent",
          value: "linear-gradient(135deg, #fb4268 0%, #ff6b9d 100%)",
        },
        {
          name: "dark",
          value: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
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
      toolbar: {
        icon: "paintbrush",
        items: [
          { value: "light", title: "Light" },
          { value: "dim", title: "Dim" },
          { value: "accent", title: "Accent" },
        ],
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme as "light" | "dim" | "accent";

      // Apply theme to document element and update CSS variables
      React.useEffect(() => {
        if (typeof document !== "undefined") {
          document.documentElement.setAttribute("data-theme", theme);
          document.body.className =
            document.body.className.replace(/theme-(light|dim|accent)/g, "") +
            ` theme-${theme}`;

          // Update CSS variables based on theme
          const themes = {
            light: { "--tw-bg-opacity": "0.25" },
            dim: { "--tw-bg-opacity": "0.15" },
            accent: { "--lg-accent": "#fb4268" },
          };

          const root = document.documentElement;
          Object.entries(themes[theme] || {}).forEach(([key, value]) => {
            root.style.setProperty(key, value);
          });
        }
      }, [theme]);

      // Add background animation class
      React.useEffect(() => {
        if (typeof document !== "undefined") {
          document.documentElement.classList.add("animate-bg-move", "bg-cover");
        }
      }, []);

      try {
        return React.createElement(
          "div",
          { className: "theme-provider-wrapper" },
          React.createElement(
            GlassUIProvider,
            null,
            React.createElement(
              "div",
              {
                className: "container flex flex-col gap-4 min-h-screen p-4",
                style: {
                  background:
                    context.parameters.backgrounds?.values?.find(
                      (bg: any) =>
                        bg.name === (context.globals.background || "dark"),
                    )?.value ||
                    "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
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
          { className: "p-4 text-red-500" },
          React.createElement(
            "h3",
            { className: "text-lg font-bold" },
            "Story Error",
          ),
          React.createElement(
            "p",
            { className: "mt-2" },
            "Failed to render story: ",
            error instanceof Error ? error.message : "Unknown error",
          ),
          React.createElement(
            "details",
            { className: "mt-4" },
            React.createElement(
              "summary",
              { className: "cursor-pointer font-medium" },
              "Error Details",
            ),
            React.createElement(
              "pre",
              {
                className: "mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto",
              },
              error instanceof Error ? error.stack : String(error),
            ),
          ),
        );
      }
    },
  ],
};

export default preview;

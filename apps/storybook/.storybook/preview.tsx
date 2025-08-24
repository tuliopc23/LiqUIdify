// Import high-fidelity liquid glass system
import "liquidify/styles";

import type { Preview } from "@storybook/react";

// High-fidelity backgrounds matching reference implementation
const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "Glass Dark",
      values: [
        {
          name: "Glass Dark",
          value: `radial-gradient(80rem 60rem at 20% 20%, rgba(162, 210, 255, 0.3), transparent 60%), radial-gradient(80rem 60rem at 80% 30%, rgba(255, 183, 248, 0.28), transparent 60%), linear-gradient(135deg, #c9e7ff 0%, #d9d0ff 45%, #ffc9dc 100%)`,
          class: "theme-dark",
        },
        {
          name: "Glass Light",
          value: `radial-gradient(80rem 60rem at 20% 20%, rgba(162, 210, 255, 0.15), transparent 60%), radial-gradient(80rem 60rem at 80% 30%, rgba(255, 183, 248, 0.12), transparent 60%), linear-gradient(135deg, #f0f9ff 0%, #f8fafc 45%, #fdf2f8 100%)`,
          class: "theme-light",
        },
        {
          name: "Dark Solid",
          value: "#1a1a1a",
          class: "theme-dark",
        },
        {
          name: "Light Solid",
          value: "#f8fafc",
          class: "theme-light",
        },
      ],
    },
    layout: "centered",
    docs: {
      theme: {
        base: "dark",
        brandTitle: "LiqUIdify",
        brandUrl: "https://docs.useliquidify.dev",
      },
    },
  },
  globalTypes: {
    liquidTheme: {
      description: "Liquid Glass Theme",
      defaultValue: "dark",
      toolbar: {
        title: "Theme",
        icon: "paintbrush",
        items: [
          { value: "light", title: "Light Theme", left: "☀️" },
          { value: "dark", title: "Dark Theme", left: "🌙" },
          { value: "auto", title: "Auto Theme", left: "🔄" },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const sel = context.globals.liquidTheme || "dark";
      const prefersDark =
        typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      const resolved = sel === "auto" ? (prefersDark ? "dark" : "light") : sel;
      const isDark = resolved === "dark";

      // Sync theme to the preview iframe root so Tailwind, CSS variables and preview-head rules all respond consistently.
      if (typeof document !== "undefined") {
        const html = document.documentElement;
        html.setAttribute("data-theme", isDark ? "dark" : "light");
        html.classList.toggle("dark", isDark); // Tailwind dark mode
        html.classList.remove(isDark ? "theme-light" : "theme-dark");
        html.classList.add(isDark ? "theme-dark" : "theme-light"); // CSS variable themes
      }

      return (
        <div
          className={`${isDark ? "theme-dark" : "theme-light"} ${isDark ? "text-white" : "text-gray-900"}`}
          style={{
            minHeight: "100vh",
            padding: "1rem",
            color: isDark
              ? "rgba(255, 255, 255, 0.9)"
              : "rgba(17, 24, 39, 0.9)",
          }}
        >
          <Story />
        </div>
      );
    },
  ],
};

export default preview;

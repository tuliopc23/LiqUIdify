import type { Preview } from "@storybook/react";
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
    },
    docs: {
      toc: true,
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
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
        ],
        showName: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme;
      document.documentElement.setAttribute("data-theme", theme);
      return Story();
    },
  ],
};

export default preview;

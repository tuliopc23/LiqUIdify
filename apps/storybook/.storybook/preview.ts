import type { Preview } from "@storybook/react";
import "../../../styled-system/css/reset.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "dark",
      values: [
        {
          name: "dark",
          value: "#000000",
        },
        {
          name: "light",
          value: "#ffffff",
        },
        {
          name: "liquid-glass",
          value: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
        },
      ],
    },
    docs: {
      theme: "dark",
    },
  },
};

export default preview;

import "../../docs/styles/liquid-glass.css";

import type { Preview } from "@storybook/react";

// Canvas backgrounds including the lighter gradient used in our previews
const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "Dark",
      values: [
        {
          name: "Dark",
          value: "#0f1220",
        },
        {
          name: "Light",
          value: "#f5f7fb",
        },
        {
          name: "Light Gradient",
          value:
            "radial-gradient(80rem 60rem at 20% 20%, rgba(162, 210, 255, 0.30), transparent 60%),\
             radial-gradient(80rem 60rem at 80% 30%, rgba(255, 183, 248, 0.28), transparent 60%),\
             linear-gradient(135deg, #c9e7ff 0%, #d9d0ff 45%, #ffc9dc 100%)",
        },
      ],
    },
    layout: "centered",
  },
};

export default preview;

// Import high-fidelity liquid glass system
import "liquidify/styles";

import type { Preview } from "@storybook/react";

// High-fidelity backgrounds matching reference implementation
const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "Glass Gradient",
      values: [
        {
          name: "Dark Theme",
          value: "#1a1a1a",
          class: "theme-dark",
        },
        {
          name: "Light Theme", 
          value: "#f8fafc",
          class: "theme-light",
        },
        {
          name: "Glass Gradient",
          value: `
            radial-gradient(80rem 60rem at 20% 20%, rgba(162, 210, 255, 0.3), transparent 60%),
            radial-gradient(80rem 60rem at 80% 30%, rgba(255, 183, 248, 0.28), transparent 60%), 
            linear-gradient(135deg, #c9e7ff 0%, #d9d0ff 45%, #ffc9dc 100%)
          `,
          class: "theme-dark",
        },
        {
          name: "Glass Light",
          value: `
            radial-gradient(80rem 60rem at 20% 20%, rgba(162, 210, 255, 0.15), transparent 60%),
            radial-gradient(80rem 60rem at 80% 30%, rgba(255, 183, 248, 0.12), transparent 60%),
            linear-gradient(135deg, #f0f9ff 0%, #f8fafc 45%, #fdf2f8 100%)
          `,
          class: "theme-light",
        },
      ],
    },
    layout: "centered",
    docs: {
      theme: {
        base: 'dark',
        brandTitle: 'LiqUIdify',
        brandUrl: 'https://docs.useliquidify.dev',
      },
    },
  },
  globalTypes: {
    liquidTheme: {
      description: 'Liquid Glass Theme',
      defaultValue: 'dark',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Light Theme', left: '☀️' },
          { value: 'dark', title: 'Dark Theme', left: '🌙' },
          { value: 'auto', title: 'Auto Theme', left: '🔄' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.liquidTheme || 'dark';
      const themeClass = theme === 'light' ? 'theme-light' : 'theme-dark';
      
      return (
        <div className={themeClass} style={{ minHeight: '100vh', padding: '1rem' }}>
          <Story />
        </div>
      );
    },
  ],
};

export default preview;

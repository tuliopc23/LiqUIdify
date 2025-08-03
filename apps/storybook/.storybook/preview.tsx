import type { Preview } from "@storybook/react";
import "../../../libs/components/src/styles/index.css";

const preview: Preview = {
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
        base: 'dark',
        colorPrimary: '#fb4268',
        colorSecondary: '#667eea',
        appBg: '#1a1a1a',
        appContentBg: '#2a2a2a',
        textColor: '#ffffff',
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff', // Pure white for light theme
        },
        {
          name: 'dark',
          value: '#1a1a1a', // Subtle dark grey for dark theme
        },
        {
          name: 'transparent',
          value: 'transparent',
        },
      ],
    },
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '375px',
            height: '667px',
          },
        },
        tablet: {
          name: 'Tablet',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
        desktop: {
          name: 'Desktop',
          styles: {
            width: '1200px',
            height: '800px',
          },
        },
      },
    },
  },
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Light Mode' },
          { value: 'dark', title: 'Dark Mode' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'light';

      return (
        <div
          className={`${theme} min-h-screen p-4`}
          style={{
            fontFamily: 'system-ui, sans-serif',
            background: theme === 'dark'
              ? '#1a1a1a'
              : '#ffffff',
          }}
        >
          <Story />
        </div>
      );
    },
  ],
};

export default preview;

import type { Preview } from '@storybook/react-vite'
import '../src/styles/glass.css'

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#0a0a0a' },
        { name: 'glass-light', value: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' },
        { name: 'glass-dark', value: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)' }
      ]
    },
    actions: { 
      argTypesRegex: '^on[A-Z].*' 
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      },
      expanded: true
    },
    docs: {
      theme: {
        brandTitle: 'Glass UI',
        brandUrl: 'https://glass-ui.dev',
        colorPrimary: '#007AFF',
        colorSecondary: '#5856D6'
      }
    },
    viewport: {
      viewports: {
        mobile: { 
          name: 'Mobile', 
          styles: { width: '375px', height: '667px' } 
        },
        tablet: { 
          name: 'Tablet', 
          styles: { width: '768px', height: '1024px' } 
        },
        desktop: { 
          name: 'Desktop', 
          styles: { width: '1440px', height: '900px' } 
        }
      }
    }
  },
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: ['light', 'dark'],
        dynamicTitle: true
      }
    }
  }
}

export default preview
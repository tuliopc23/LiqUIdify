import type { Preview } from '@storybook/react';
import React from 'react';
import { GlassUIProvider } from '../src';
import '../src/styles/tailwind.css';

// Single initialization flag to prevent duplicate setups
let isInitialized = false;

// Initialize base styles once
function initializeStyles() {
  if (isInitialized || typeof document === 'undefined') return;
  
  const style = document.createElement('style');
  style.id = 'storybook-glass-ui-styles';
  style.innerHTML = `
    /* Docs story styling */
    .docs-story {
      background: transparent !important;
      padding: 1rem;
    }
    
    .sbdocs-preview {
      background: var(--glass-bg-canvas, #ffffff) !important;
      border-radius: 8px;
      overflow: hidden;
    }
    
    [data-theme="dark"] .sbdocs-preview {
      background: var(--glass-bg-canvas, #0a0a0a) !important;
    }
    
    /* Story canvas backgrounds */
    .sb-show-main {
      transition: background 0.3s ease, backdrop-filter 0.3s ease;
    }
    
    .sb-show-main .sb-story {
      background: transparent;
    }
    
    /* Theme variables */
    :root {
      --storybook-theme-transition: all 0.3s ease;
    }
    
    /* Storybook wrapper styling */
    .storybook-wrapper {
      min-height: 200px;
      padding: 1rem;
      border-radius: 8px;
      transition: all 0.3s ease;
    }
    
    .storybook-wrapper.light {
      background: rgba(255, 255, 255, 0.4);
      backdrop-filter: blur(8px) saturate(140%);
      color: #1e293b;
      border: 1px solid rgba(0, 0, 0, 0.05);
    }
    
    .storybook-wrapper.dark {
      background: rgba(30, 41, 59, 0.3);
      backdrop-filter: blur(8px) saturate(140%);
      color: #f1f5f9;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
  `;
  
  document.head.appendChild(style);
  isInitialized = true;
}

// Apply theme to Storybook UI elements
function applyThemeToStorybook(theme: 'light' | 'dark') {
  if (typeof document === 'undefined') return;
  
  const root = document.documentElement;
  root.setAttribute('data-theme', theme);
  root.classList.remove('light', 'dark');
  root.classList.add(theme);

  // Apply theme to main story container
  const storybook = document.querySelector('.sb-show-main') as HTMLElement;
  if (storybook) {
    if (theme === 'dark') {
      storybook.style.background = 'radial-gradient(ellipse at top, rgba(59, 130, 246, 0.15) 0%, rgba(15, 23, 42, 0.9) 35%, rgba(30, 41, 59, 0.95) 100%)';
      storybook.style.backdropFilter = 'blur(20px) saturate(180%)';
      storybook.style.color = '#f1f5f9';
    } else {
      storybook.style.background = 'radial-gradient(ellipse at top, rgba(59, 130, 246, 0.08) 0%, rgba(248, 250, 252, 0.95) 35%, rgba(226, 232, 240, 0.98) 100%)';
      storybook.style.backdropFilter = 'blur(20px) saturate(120%)';
      storybook.style.color = '#1e293b';
    }
  }

  // Apply theme to docs container
  const docsContainer = document.querySelector('.sbdocs') as HTMLElement;
  if (docsContainer) {
    if (theme === 'dark') {
      docsContainer.style.background = 'rgba(15, 23, 42, 0.9)';
      docsContainer.style.backdropFilter = 'blur(10px) saturate(150%)';
      docsContainer.style.color = '#f1f5f9';
    } else {
      docsContainer.style.background = 'rgba(255, 255, 255, 0.95)';
      docsContainer.style.backdropFilter = 'blur(10px) saturate(120%)';
      docsContainer.style.color = '#1e293b';
    }
  }
}

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'liquid-gradient',
      values: [
        {
          name: 'liquid-gradient',
          value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        },
        {
          name: 'apple-gradient',
          value: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
        },
        {
          name: 'cosmic',
          value: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
        },
        {
          name: 'image-bg',
          value: 'url("https://images.unsplash.com/photo-1539635278303-d4002c07eae3?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NDk1Njc4NTB8&ixlib=rb-4.1.0&q=85") center/cover',
        },
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#0a0a0a' },
        {
          name: 'glass-light',
          value: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        },
        {
          name: 'glass-dark',
          value: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
        },
      ],
    },
    actions: {
      argTypesRegex: '^on[A-Z].*',
    },
    controls: {
      matchers: {
        color: /^(backgroundColor|textColor|borderColor|fillColor|strokeColor)$/i,
        date: /Date$/,
      },
      expanded: true,
      exclude: ['color'],
    },
    docs: {
      theme: {
        brandTitle: 'Liquid Glass UI',
        brandUrl: 'https://liquidui.dev',
        brandImage: undefined,
        base: 'light',
        colorPrimary: '#007AFF',
        colorSecondary: '#5856D6',
        fontBase: '"Inter", "SF Pro Display", system-ui, sans-serif',
        fontCode: '"SF Mono", "Monaco", "Inconsolata", "Roboto Mono", monospace',
        textColor: '#1a1a1a',
        textInverseColor: '#ffffff',
        textMutedColor: '#666666',
        appBg: '#f8fafc',
        appContentBg: '#ffffff',
        appBorderColor: '#e2e8f0',
        appBorderRadius: 8,
        barTextColor: '#475569',
        barSelectedColor: '#007AFF',
        barBg: '#ffffff',
        barHoverColor: '#f1f5f9',
        inputBg: '#ffffff',
        inputBorder: '#e2e8f0',
        inputTextColor: '#1e293b',
        inputBorderRadius: 8,
        buttonBg: '#ffffff',
        buttonBorder: '#e2e8f0',
        booleanBg: '#e2e8f0',
        booleanSelectedBg: '#007AFF',
        gridCellSize: 8,
      },
      darkMode: {
        dark: {
          brandTitle: 'Liquid Glass UI',
          brandUrl: 'https://liquidui.dev',
          brandImage: undefined,
          base: 'dark',
          colorPrimary: '#0A84FF',
          colorSecondary: '#5E5CE6',
          fontBase: '"Inter", "SF Pro Display", system-ui, sans-serif',
          fontCode: '"SF Mono", "Monaco", "Inconsolata", "Roboto Mono", monospace',
          textColor: '#f1f5f9',
          textInverseColor: '#1e293b',
          textMutedColor: '#94a3b8',
          appBg: 'rgba(15, 23, 42, 0.85)',
          appContentBg: 'rgba(30, 41, 59, 0.75)',
          appBorderColor: 'rgba(51, 65, 85, 0.6)',
          appBorderRadius: 8,
          barTextColor: '#cbd5e1',
          barSelectedColor: '#0A84FF',
          barBg: 'rgba(30, 41, 59, 0.8)',
          barHoverColor: 'rgba(51, 65, 85, 0.6)',
          inputBg: 'rgba(51, 65, 85, 0.7)',
          inputBorder: 'rgba(71, 85, 105, 0.5)',
          inputTextColor: '#f1f5f9',
          inputBorderRadius: 8,
          buttonBg: 'rgba(51, 65, 85, 0.7)',
          buttonBorder: 'rgba(71, 85, 105, 0.5)',
          booleanBg: 'rgba(71, 85, 105, 0.6)',
          booleanSelectedBg: '#0A84FF',
          gridCellSize: 8,
        },
      },
      toc: {
        contentsSelector: '.sbdocs-content',
        headingSelector: 'h1, h2, h3',
        ignoreSelector: '#storybook-root',
        title: 'Table of Contents',
        disable: false,
        unsafeTocbotOptions: {
          orderedList: false,
        },
      },
      autodocs: true,
      defaultName: 'Docs',
      story: {
        inline: true,
        iframeHeight: '200px',
      },
    },
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: { width: '375px', height: '667px' },
        },
        tablet: {
          name: 'Tablet',
          styles: { width: '768px', height: '1024px' },
        },
        desktop: {
          name: 'Desktop',
          styles: { width: '1440px', height: '900px' },
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
        items: ['light', 'dark'],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'light';

      // Initialize styles on first render
      React.useEffect(() => {
        initializeStyles();
      }, []);

      // Apply theme changes
      React.useEffect(() => {
        applyThemeToStorybook(theme);
      }, [theme]);

      return React.createElement(
        GlassUIProvider,
        { theme },
        React.createElement(
          'div',
          {
            'data-theme': theme,
            className: `storybook-wrapper ${theme}`,
          },
          React.createElement(Story)
        )
      );
    },
  ],
};

export default preview;

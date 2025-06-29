import type { Preview } from '@storybook/react'
import React from 'react'
import '../src/styles/glass.css'
import '../src/styles/enhanced-components.css'

// Add a flag to ensure single initialization
let isInitialized = false

// Initialize CSS immediately for docs mode
if (typeof document !== 'undefined') {
  // Add CSS for docs rendering
  const style = document.createElement('style')
  style.innerHTML = `
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
    /* Ensure canvas backgrounds for story frames */
    .sb-show-main {
      background: var(--glass-bg-canvas, #ffffff) !important;
    }
    [data-theme="dark"] .sb-show-main {
      background: var(--glass-bg-canvas, #0a0a0a) !important;
    }
  `
  document.head.appendChild(style)
}

// Remove the problematic color contrast checker function
// This was causing issues in autodocs mode with invalid color arguments
// This function is no longer needed as theme provider handles CSS properties
// Keep for backward compatibility but make it a no-op
function setupCssProperties(theme: 'light' | 'dark' = 'light'): void {
  // The ThemeProvider now handles all CSS custom properties
  console.log(`🎨 Legacy setupCssProperties called with theme: ${theme}`);
}

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
        color: /^(backgroundColor|textColor|borderColor|fillColor|strokeColor)$/i,
        date: /Date$/
      },
      expanded: true,
      exclude: ['color'] // Exclude generic 'color' prop from automatic color control
    },
    docs: {
      theme: {
        brandTitle: 'Liquid Glass UI',
        brandUrl: 'https://liquidui.dev',
        brandImage: undefined,
        colorPrimary: '#007AFF',
        colorSecondary: '#5856D6',
        
        // Typography
        fontBase: '"Inter", "SF Pro Display", system-ui, sans-serif',
        fontCode: '"SF Mono", "Monaco", "Inconsolata", "Roboto Mono", monospace',
        
        // Text colors
        textColor: '#1a1a1a',
        textInverseColor: '#ffffff',
        
        // Toolbar default and active colors
        barTextColor: '#999999',
        barSelectedColor: '#007AFF',
        barBg: '#ffffff',
        
        // Form colors
        inputBg: '#ffffff',
        inputBorder: '#e1e5e9',
        inputTextColor: '#1a1a1a',
        inputBorderRadius: 8,
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
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'light'
      
      // Apply theme to document root
      React.useEffect(() => {
        if (typeof document !== 'undefined') {
          const root = document.documentElement;
          root.setAttribute('data-theme', theme);
          root.classList.remove('light', 'dark');
          root.classList.add(theme);
        }
      }, [theme])

      return React.createElement(
        'div',
        {
          className: `storybook-wrapper ${theme}`,
          'data-theme': theme,
          style: {
            minHeight: '300px',
            padding: '2rem',
            background: theme === 'dark' 
              ? 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)'
              : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)',
            borderRadius: '8px'
          }
        },
        React.createElement(Story)
      )
    }
  ]
}

export default preview
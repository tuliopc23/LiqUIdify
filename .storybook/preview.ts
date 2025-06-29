import type { Preview } from '@storybook/react'
import { LiquidGlassProvider } from '../src/hooks/use-liquid-glass'
import { ThemeProvider } from '../src/hooks/use-theme'
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

// Color contrast checker utility for docs - enhanced with error handling
function checkColorContrast(color1: string, color2: string): number {
  const getLuminance = (color: string): number => {
    try {
      // Parse rgba/rgb color string with improved regex
      const rgbaMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d\.]+))?\)/) || 
                       color.match(/#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})/i)
      
      if (!rgbaMatch) {
        console.warn(`Failed to parse color: ${color}. Using fallback luminance.`)
        return 0.5 // Fallback luminance
      }
      
      let [, r, g, b] = rgbaMatch
      
      // Handle hex colors
      if (color.startsWith('#')) {
        r = parseInt(r, 16).toString()
        g = parseInt(g, 16).toString()
        b = parseInt(b, 16).toString()
      }
      
      const [rNum, gNum, bNum] = [r, g, b].map(Number)
      
      const toLinear = (val: number) => {
        const normalized = val / 255
        return normalized <= 0.03928 ? normalized / 12.92 : Math.pow((normalized + 0.055) / 1.055, 2.4)
      }
      
      return 0.2126 * toLinear(rNum) + 0.7152 * toLinear(gNum) + 0.0722 * toLinear(bNum)
    } catch (error) {
      console.warn(`Error calculating luminance for ${color}:`, error)
      return 0.5 // Fallback luminance
    }
  }
  
  try {
    const lum1 = getLuminance(color1)
    const lum2 = getLuminance(color2)
    const brightest = Math.max(lum1, lum2)
    const darkest = Math.min(lum1, lum2)
    
    return (brightest + 0.05) / (darkest + 0.05)
  } catch (error) {
    console.warn('Error calculating contrast ratio:', error)
    return 4.5 // Fallback to WCAG AA minimum
  }
}
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
        color: /(background|color)$/i,
        date: /Date$/
      },
      expanded: true
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
      
      // Force theme update when global changes
      React.useEffect(() => {
        if (typeof window !== 'undefined') {
          const root = document.documentElement;
          root.setAttribute('data-theme', theme);
          root.classList.remove('light', 'dark');
          root.classList.add(theme);
        }
      }, [theme])

      return React.createElement(
        ThemeProvider,
        { 
          defaultTheme: theme,
          storageKey: 'storybook-liquidui-theme'
        },
        React.createElement(
          LiquidGlassProvider,
          {
            config: {
              adaptToContent: true,
              specularHighlights: true,
              magneticHover: false
            }
          },
          React.createElement(
            'div',
            {
              className: `liquid-glass-container ${theme}`,
              'data-theme': theme,
              style: {
                minHeight: '400px',
                padding: '2rem',
                background: theme === 'dark' 
                  ? 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)'
                  : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)',
                transition: 'all 0.3s ease',
                borderRadius: '12px'
              }
            },
            React.createElement(Story)
          )
        )
      )
    }
  ]
}

export default preview
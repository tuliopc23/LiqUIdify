import type { Preview } from '@storybook/react-vite'
import { LiquidGlassProvider } from '../src/hooks/use-liquid-glass'
import { ThemeProvider } from '../src/hooks/use-theme'
import React from 'react'
import '../src/styles/glass.css'

// Initialize CSS custom properties for glass components
if (typeof document !== 'undefined') {
  const initializeGlassProperties = () => {
    const root = document.documentElement
    
    // Set default glass properties only if not already set
    if (!root.style.getPropertyValue('--glass-bg-primary')) {
      root.style.setProperty('--glass-bg-primary', 'rgba(255, 255, 255, 0.12)')
      root.style.setProperty('--glass-bg-secondary', 'rgba(248, 250, 252, 0.15)')
      root.style.setProperty('--glass-border-light', 'rgba(255, 255, 255, 0.15)')
      root.style.setProperty('--glass-blur-medium', 'blur(24px)')
      root.style.setProperty('--glass-primary', 'rgba(59, 130, 246, 0.8)')
      root.style.setProperty('--text-primary', 'rgba(0, 0, 0, 0.9)')
      root.style.setProperty('--text-secondary', 'rgba(0, 0, 0, 0.6)')
      
      // Add missing semantic color variables
      root.style.setProperty('--border', 'rgba(229, 231, 235, 1)')
      root.style.setProperty('--input', 'rgba(229, 231, 235, 1)')
      root.style.setProperty('--ring', 'rgba(59, 130, 246, 0.5)')
      root.style.setProperty('--background', 'rgba(255, 255, 255, 1)')
      root.style.setProperty('--foreground', 'rgba(0, 0, 0, 1)')
      root.style.setProperty('--primary', 'rgba(59, 130, 246, 1)')
      root.style.setProperty('--primary-foreground', 'rgba(255, 255, 255, 1)')
      root.style.setProperty('--secondary', 'rgba(243, 244, 246, 1)')
      root.style.setProperty('--secondary-foreground', 'rgba(0, 0, 0, 1)')
      root.style.setProperty('--destructive', 'rgba(239, 68, 68, 1)')
      root.style.setProperty('--destructive-foreground', 'rgba(255, 255, 255, 1)')
      root.style.setProperty('--muted', 'rgba(243, 244, 246, 1)')
      root.style.setProperty('--muted-foreground', 'rgba(107, 114, 128, 1)')
      root.style.setProperty('--accent', 'rgba(243, 244, 246, 1)')
      root.style.setProperty('--accent-foreground', 'rgba(0, 0, 0, 1)')
      root.style.setProperty('--popover', 'rgba(255, 255, 255, 1)')
      root.style.setProperty('--popover-foreground', 'rgba(0, 0, 0, 1)')
      root.style.setProperty('--card', 'rgba(255, 255, 255, 1)')
      root.style.setProperty('--card-foreground', 'rgba(0, 0, 0, 1)')
      root.style.setProperty('--radius', '0.5rem')
    }
  }
  
  // Initialize immediately if DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeGlassProperties)
  } else {
    initializeGlassProperties()
  }
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
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'light'
      
      return React.createElement(
        ThemeProvider,
        { 
          defaultTheme: theme,
          storageKey: 'storybook-glass-ui-theme'
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
              className: 'min-h-screen p-8',
              'data-theme': theme,
              style: {
                background: theme === 'dark' 
                  ? 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)'
                  : 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
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
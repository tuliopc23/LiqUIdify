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
      background: var(--glass-bg-canvas, #f5f5f5) !important;
      border-radius: 8px;
      overflow: hidden;
    }
    [data-theme="dark"] .sbdocs-preview {
      background: var(--glass-bg-canvas, #1a1a1a) !important;
    }
  `
  document.head.appendChild(style)
}

// Color contrast checker utility for docs
function checkColorContrast(color1: string, color2: string): number {
  const getLuminance = (color: string): number => {
    // Parse rgba/rgb color string
    const rgbaMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d\.]+))?\)/)
    if (!rgbaMatch) return 0
    
    const [, r, g, b] = rgbaMatch.map(Number)
    const toLinear = (val: number) => {
      const normalized = val / 255
      return normalized <= 0.03928 ? normalized / 12.92 : Math.pow((normalized + 0.055) / 1.055, 2.4)
    }
    
    return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b)
  }
  
  const lum1 = getLuminance(color1)
  const lum2 = getLuminance(color2)
  const brightest = Math.max(lum1, lum2)
  const darkest = Math.min(lum1, lum2)
  
  return (brightest + 0.05) / (darkest + 0.05)
}
// Setup CSS custom properties with all semantic variables
function setupCssProperties(theme: 'light' | 'dark' = 'light'): void {
  if (typeof document === 'undefined') return
  
  const root = document.documentElement
  
  // Clear existing theme classes
  root.classList.remove('light', 'dark')
  root.classList.add(theme)
  
  // Glass-specific properties
  const glassProperties = {
    '--glass-bg-primary': theme === 'dark' ? 'rgba(18, 18, 18, 0.25)' : 'rgba(255, 255, 255, 0.12)',
    '--glass-bg-secondary': theme === 'dark' ? 'rgba(30, 30, 30, 0.15)' : 'rgba(248, 250, 252, 0.15)',
    '--glass-bg-tertiary': theme === 'dark' ? 'rgba(38, 38, 40, 0.18)' : 'rgba(241, 245, 249, 0.18)',
    '--glass-bg-elevated': theme === 'dark' ? 'rgba(48, 48, 50, 0.22)' : 'rgba(255, 255, 255, 0.25)',
    '--glass-border-light': theme === 'dark' ? 'rgba(255, 255, 255, 0.20)' : 'rgba(255, 255, 255, 0.15)',
    '--glass-border-medium': theme === 'dark' ? 'rgba(255, 255, 255, 0.30)' : 'rgba(255, 255, 255, 0.25)',
    '--glass-border-strong': theme === 'dark' ? 'rgba(255, 255, 255, 0.45)' : 'rgba(255, 255, 255, 0.35)',
    '--glass-blur-medium': 'blur(24px)',
    '--glass-primary': theme === 'dark' ? 'rgba(96, 165, 250, 0.8)' : 'rgba(59, 130, 246, 0.8)',
    '--text-primary': theme === 'dark' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(0, 0, 0, 0.9)',
    '--text-secondary': theme === 'dark' ? 'rgba(255, 255, 255, 0.75)' : 'rgba(0, 0, 0, 0.6)',
    '--text-tertiary': theme === 'dark' ? 'rgba(255, 255, 255, 0.55)' : 'rgba(0, 0, 0, 0.4)'
  }
  
  // Semantic color variables with dark mode support
  const semanticProperties = {
    // Base colors
    '--background': theme === 'dark' ? 'rgba(10, 10, 10, 1)' : 'rgba(255, 255, 255, 1)',
    '--foreground': theme === 'dark' ? 'rgba(250, 250, 250, 1)' : 'rgba(0, 0, 0, 1)',
    
    // Primary colors
    '--primary': theme === 'dark' ? 'rgba(96, 165, 250, 1)' : 'rgba(59, 130, 246, 1)',
    '--primary-foreground': theme === 'dark' ? 'rgba(10, 10, 10, 1)' : 'rgba(255, 255, 255, 1)',
    
    // Secondary colors
    '--secondary': theme === 'dark' ? 'rgba(38, 38, 38, 1)' : 'rgba(243, 244, 246, 1)',
    '--secondary-foreground': theme === 'dark' ? 'rgba(250, 250, 250, 1)' : 'rgba(0, 0, 0, 1)',
    
    // Destructive colors
    '--destructive': theme === 'dark' ? 'rgba(248, 113, 113, 1)' : 'rgba(239, 68, 68, 1)',
    '--destructive-foreground': theme === 'dark' ? 'rgba(10, 10, 10, 1)' : 'rgba(255, 255, 255, 1)',
    
    // Muted colors
    '--muted': theme === 'dark' ? 'rgba(38, 38, 38, 1)' : 'rgba(243, 244, 246, 1)',
    '--muted-foreground': theme === 'dark' ? 'rgba(163, 163, 163, 1)' : 'rgba(107, 114, 128, 1)',
    
    // Accent colors
    '--accent': theme === 'dark' ? 'rgba(38, 38, 38, 1)' : 'rgba(243, 244, 246, 1)',
    '--accent-foreground': theme === 'dark' ? 'rgba(250, 250, 250, 1)' : 'rgba(0, 0, 0, 1)',
    
    // Card colors
    '--card': theme === 'dark' ? 'rgba(20, 20, 20, 1)' : 'rgba(255, 255, 255, 1)',
    '--card-foreground': theme === 'dark' ? 'rgba(250, 250, 250, 1)' : 'rgba(0, 0, 0, 1)',
    
    // Popover colors
    '--popover': theme === 'dark' ? 'rgba(20, 20, 20, 1)' : 'rgba(255, 255, 255, 1)',
    '--popover-foreground': theme === 'dark' ? 'rgba(250, 250, 250, 1)' : 'rgba(0, 0, 0, 1)',
    
    // Border and input colors
    '--border': theme === 'dark' ? 'rgba(64, 64, 64, 1)' : 'rgba(229, 231, 235, 1)',
    '--input': theme === 'dark' ? 'rgba(64, 64, 64, 1)' : 'rgba(229, 231, 235, 1)',
    '--ring': theme === 'dark' ? 'rgba(96, 165, 250, 0.5)' : 'rgba(59, 130, 246, 0.5)',
    
    // Radius
    '--radius': '0.5rem'
  }
  
  // Apply all properties
  const allProperties = { ...glassProperties, ...semanticProperties }
  Object.entries(allProperties).forEach(([property, value]) => {
    root.style.setProperty(property, value)
  })
  
  // Set data attribute for theme
  root.setAttribute('data-theme', theme)
  
  // Force theme update on body
  document.body.className = document.body.className.replace(/\b(light|dark)\b/g, '') + ` ${theme}`
  
  // Log theme application for debugging
  console.log(`✨ LiquidUI Theme Applied: ${theme}`, {
    properties: Object.keys(allProperties).length,
    dataTheme: root.getAttribute('data-theme'),
    bodyClass: document.body.className
  })
  
  // Log contrast ratios for accessibility in docs
  if (process.env.NODE_ENV === 'development') {
    const backgroundContrast = checkColorContrast(
      allProperties['--background'], 
      allProperties['--foreground']
    )
    const primaryContrast = checkColorContrast(
      allProperties['--primary'], 
      allProperties['--primary-foreground']
    )
    
    console.log(`🎨 Theme Contrast Check: ${theme}`, {
      backgroundContrast: backgroundContrast.toFixed(2),
      primaryContrast: primaryContrast.toFixed(2),
      wcagAA: backgroundContrast >= 4.5 && primaryContrast >= 4.5
    })
  }
  
  // Mark as initialized
  isInitialized = true
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
      
      // Initialize CSS properties on every render
      React.useEffect(() => {
        setupCssProperties(theme)
      }, [theme])
      
      // Initialize on mount if not already done
      React.useEffect(() => {
        if (!isInitialized) {
          setupCssProperties(theme)
        }
      }, [])

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
              magneticHover: false,
              performanceMode: 'balanced'
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
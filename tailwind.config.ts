import type { Config } from 'tailwindcss'
import { designTokens } from './src/tokens/design-tokens'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './.storybook/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  darkMode: ['class'],
  theme: {
    extend: {
      // Design System Colors
      colors: {
        // Semantic colors
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
          50: designTokens.colors.primary[50],
          100: designTokens.colors.primary[100],
          200: designTokens.colors.primary[200],
          300: designTokens.colors.primary[300],
          400: designTokens.colors.primary[400],
          500: designTokens.colors.primary[500],
          600: designTokens.colors.primary[600],
          700: designTokens.colors.primary[700],
          800: designTokens.colors.primary[800],
          900: designTokens.colors.primary[900],
          950: designTokens.colors.primary[950],
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)'
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)'
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)'
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)'
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)'
        },
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)'
        },
        
        // Glass-specific colors
        glass: {
          light: {
            primary: designTokens.colors.glass.light.primary,
            secondary: designTokens.colors.glass.light.secondary,
            tertiary: designTokens.colors.glass.light.tertiary,
            elevated: designTokens.colors.glass.light.elevated,
            floating: designTokens.colors.glass.light.floating,
            overlay: designTokens.colors.glass.light.overlay,
          },
          dark: {
            primary: designTokens.colors.glass.dark.primary,
            secondary: designTokens.colors.glass.dark.secondary,
            tertiary: designTokens.colors.glass.dark.tertiary,
            elevated: designTokens.colors.glass.dark.elevated,
            floating: designTokens.colors.glass.dark.floating,
            overlay: designTokens.colors.glass.dark.overlay,
          },
          states: {
            hover: designTokens.colors.glass.states.hover,
            active: designTokens.colors.glass.states.active,
            focus: designTokens.colors.glass.states.focus,
            pressed: designTokens.colors.glass.states.pressed,
          }
        },
        
        // Border colors
        'border-glass': {
          light: {
            subtle: designTokens.colors.border.light.subtle,
            light: designTokens.colors.border.light.light,
            medium: designTokens.colors.border.light.medium,
            strong: designTokens.colors.border.light.strong,
          },
          dark: {
            subtle: designTokens.colors.border.dark.subtle,
            light: designTokens.colors.border.dark.light,
            medium: designTokens.colors.border.dark.medium,
            strong: designTokens.colors.border.dark.strong,
          }
        }
      },

      // Typography from design tokens
      fontFamily: designTokens.typography.fontFamily,
      fontSize: designTokens.typography.fontSize,
      fontWeight: designTokens.typography.fontWeight,

      // Spacing from design tokens
      spacing: designTokens.spacing,

      // Border radius from design tokens
      borderRadius: {
        ...designTokens.borderRadius,
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },

      // Enhanced backdrop blur
      backdropBlur: {
        glass: '20px',
        whisper: '2px',
        ghost: '4px',
        subtle: '8px',
        light: '16px',
        medium: '24px',
        heavy: '32px',
        intense: '40px',
        extreme: '56px',
        ultra: '72px',
      },

      // Box shadows from design tokens
      boxShadow: {
        ...designTokens.shadows.glass,
        'focus-subtle': designTokens.shadows.focus.subtle,
        'focus-light': designTokens.shadows.focus.light,
        'focus-medium': designTokens.shadows.focus.medium,
        'focus-strong': designTokens.shadows.focus.strong,
      },

      // Z-index from design tokens
      zIndex: designTokens.zIndex,

      // Enhanced animations
      animation: {
        'glass-shimmer': 'glass-shimmer 2s ease-in-out infinite',
        'glass-float': 'glass-float 3s ease-in-out infinite',
        'glass-pulse': 'glass-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glass-slide-in': 'glass-slide-in 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        'glass-slide-out': 'glass-slide-out 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        'glass-scale-in': 'glass-scale-in 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'glass-fade-in': 'glass-fade-in 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        'glass-magnetic': 'glass-magnetic 0.25s cubic-bezier(0.2, 0, 0, 1.2)',
      },

      // Enhanced keyframes
      keyframes: {
        'glass-shimmer': {
          '0%, 100%': { transform: 'translateX(-100%)' },
          '50%': { transform: 'translateX(100%)' }
        },
        'glass-float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        'glass-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' }
        },
        'glass-slide-in': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'glass-slide-out': {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(-20px)' }
        },
        'glass-scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        },
        'glass-fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        'glass-magnetic': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' }
        }
      },

      // Transition timing functions from design tokens
      transitionTimingFunction: designTokens.animation.easing,
      transitionDuration: designTokens.animation.duration,

      // Breakpoints from design tokens
      screens: designTokens.breakpoints,
    }
  },
  plugins: [
    require('tailwindcss-animate'),
    // Custom plugin for glass utilities
    function({ addUtilities, theme }: any) {
      const glassUtilities = {
        '.glass-effect': {
          'backdrop-filter': 'blur(16px) saturate(150%)',
          '-webkit-backdrop-filter': 'blur(16px) saturate(150%)',
          'background': 'var(--glass-bg-primary, rgba(255, 255, 255, 0.12))',
          'border': '1px solid var(--glass-border-light, rgba(255, 255, 255, 0.15))',
          'box-shadow': theme('boxShadow.subtle'),
        },
        '.glass-effect-elevated': {
          'backdrop-filter': 'blur(24px) saturate(180%)',
          '-webkit-backdrop-filter': 'blur(24px) saturate(180%)',
          'background': 'var(--glass-bg-elevated, rgba(255, 255, 255, 0.25))',
          'border': '1px solid var(--glass-border-medium, rgba(255, 255, 255, 0.25))',
          'box-shadow': theme('boxShadow.medium'),
        },
        '.glass-hover': {
          'transition': 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            'background': 'var(--glass-bg-hover, rgba(255, 255, 255, 0.18))',
            'border-color': 'var(--glass-border-hover, rgba(255, 255, 255, 0.30))',
            'transform': 'translateY(-2px)',
            'box-shadow': theme('boxShadow.heavy'),
          }
        },
        '.focus-ring': {
          '&:focus-visible': {
            'outline': 'none',
            'box-shadow': theme('boxShadow.focus-medium'),
          }
        }
      };
      
      addUtilities(glassUtilities);
    }
  ]
}

export default config

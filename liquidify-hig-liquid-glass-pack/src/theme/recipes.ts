import { defineRecipe, defineSlotRecipe } from '@pandacss/dev'

// Apple-like button
export const button = defineRecipe({
  className: 'btn',
  description: 'Apple-like button with subtle depth and focus ring.',
  base: {
    fontFamily: 'sans',
    fontWeight: 600,
    borderRadius: 'md',
    borderWidth: '1px',
    borderColor: 'border.default',
    transition: 'background-color .15s ease, transform .05s ease, border-color .15s ease',
    _focusVisible: { outline: 'none', boxShadow: '0 0 0 3px rgba(10,132,255,.35)', borderColor: 'primary' },
    _active: { transform: 'translateY(1px)' }
  },
  variants: {
    intent: {
      primary: {
        color: 'white',
        backgroundColor: 'primary',
        _hover: { backgroundColor: 'color-mix(in oklch, var(--colors-primary) 92%, black 8%)' }
      },
      neutral: {
        color: 'text',
        backgroundColor: 'bg.surface',
        _hover: { backgroundColor: 'color-mix(in oklch, var(--colors-bg-surface) 92%, black 8%)' }
      },
      glass: {
        color: 'text',
        backgroundColor: 'glass.bg',
        borderColor: 'glass.border',
        backdropFilter: 'blur(18px)',
        backgroundImage: 'colors.glass.highlight',
        _hover: { backgroundColor: 'color-mix(in oklch, var(--colors-glass-bg) 100%, transparent)' }
      },
      link: { color: 'primary', backgroundColor: 'transparent', borderColor: 'transparent', _hover: { textDecoration: 'underline' } }
    },
    size: {
      sm: { px: '0.625rem', py: '0.375rem', fontSize: '14px', borderRadius: 'sm' },
      md: { px: '0.75rem', py: '0.5rem', fontSize: '15px' },
      lg: { px: '0.875rem', py: '0.625rem', fontSize: '16px', borderRadius: 'lg' }
    }
  },
  defaultVariants: { intent: 'neutral', size: 'md' }
})

// Card
export const card = defineRecipe({
  className: 'card',
  base: {
    borderRadius: 'lg',
    borderWidth: '1px',
    borderColor: 'border.default',
    backgroundColor: 'bg.surface',
    transition: 'transform .15s ease, border-color .15s ease, box-shadow .15s ease',
    _hover: { transform: 'translateY(-2px)', borderColor: 'glass.border' }
  },
  variants: {
    variant: {
      solid: {},
      glass: {
        backgroundColor: 'glass.bg',
        borderColor: 'glass.border',
        backdropFilter: 'blur(18px)',
        backgroundImage: 'colors.glass.highlight'
      },
      elevated: { boxShadow: 'sm' }
    },
    padded: { true: { p: '14px' }, false: {} }
  },
  defaultVariants: { variant: 'solid', padded: true }
})

// Badge / Pill
export const badge = defineRecipe({
  className: 'badge',
  base: {
    display: 'inline-flex', alignItems: 'center', gap: '8px',
    px: '12px', py: '6px',
    borderRadius: 'full',
    borderWidth: '1px', borderColor: 'glass.border',
    backgroundColor: 'glass.bg',
    backdropFilter: 'blur(14px)',
    backgroundImage: 'colors.glass.highlight',
    fontWeight: 600,
    fontSize: '14px'
  },
  variants: { tone: {
    neutral: { color: 'text' },
    blue: { color: 'white', backgroundColor: 'primary', borderColor: 'transparent' }
  }},
  defaultVariants: { tone: 'neutral' }
})

// Symbol Tile
export const symbolTile = defineRecipe({
  className: 'symbol',
  base: {
    w: '48px', h: '48px',
    display: 'grid', placeItems: 'center',
    borderRadius: 'md',
    borderWidth: '1px', borderColor: 'glass.border',
    backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,.12), transparent)',
  },
  variants: {
    tint: {
      gray: { backgroundColor: 'bg.surface' },
      blue: { backgroundColor: 'color-mix(in oklch, var(--colors-blue-500) 20%, transparent)' },
      indigo: { backgroundColor: 'color-mix(in oklch, var(--colors-indigo-500) 20%, transparent)' },
      teal: { backgroundColor: 'color-mix(in oklch, var(--colors-teal-500) 20%, transparent)' }
    }
  },
  defaultVariants: { tint: 'gray' }
})

// Navbar (glass on scroll)
export const navbar = defineRecipe({
  className: 'navbar',
  base: {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
    transition: 'background-color .25s ease, border-color .25s ease, backdrop-filter .25s ease',
    // Use a class toggle .is-scrolled in JS to apply glass
    _class: {
      '&.is-scrolled': {
        backgroundColor: 'glass.bg',
        borderBottomWidth: '1px', borderColor: 'border.default',
        backdropFilter: 'blur(18px)'
      }
    }
  }
})

// Input (Ark UI/HTML)
export const input = defineRecipe({
  className: 'field',
  base: {
    w: '100%',
    p: '10px 12px',
    borderRadius: 'md',
    borderWidth: '1px', borderColor: 'border.default',
    backgroundColor: 'bg.surface',
    color: 'text',
    _placeholder: { color: 'muted' },
    _focusVisible: { outline: 'none', boxShadow: '0 0 0 3px rgba(10,132,255,.35)', borderColor: 'primary' }
  },
  variants: {
    variant: {
      solid: {},
      glass: {
        backgroundColor: 'glass.bg', borderColor: 'glass.border', backdropFilter: 'blur(14px)', backgroundImage: 'colors.glass.highlight'
      }
    },
    size: {
      sm: { fontSize: '14px', py: '8px' },
      md: { fontSize: '15px' },
      lg: { fontSize: '16px', py: '12px' }
    }
  },
  defaultVariants: { variant: 'solid', size: 'md' }
})

// Segmented control using Ark UI Tabs
export const tabs = defineSlotRecipe({
  className: 'tabs',
  slots: ['root','list','trigger','content','indicator'],
  base: {
    root: { },
    list: {
      display: 'inline-flex',
      gap: '4px',
      borderRadius: 'md',
      p: '4px',
      backgroundColor: 'bg.subtle',
      borderWidth: '1px', borderColor: 'border.default'
    },
    trigger: {
      px: '10px', py: '6px',
      borderRadius: 'sm',
      fontWeight: 600,
      color: 'muted',
      transition: 'color .15s ease, background-color .15s ease',
      _hover: { color: 'text' },
      _selected: { color: 'text', backgroundColor: 'glass.bg', borderWidth: '1px', borderColor: 'glass.border', backdropFilter: 'blur(12px)' },
      _disabled: { opacity: 0.5, cursor: 'not-allowed' }
    },
    content: { mt: '12px' },
    indicator: { display: 'none' }
  }
})

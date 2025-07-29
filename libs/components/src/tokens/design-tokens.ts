/**
 * Glass UI Design Tokens
 * Comprehensive design system tokens for consistent theming
 */

export const designTokens = {
  // Spacing Scale (based on 4px grid)
  spacing: {
    0: '0px',
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    5: '20px',
    6: '24px',
    8: '32px',
    10: '40px',
    12: '48px',
    16: '64px',
    20: '80px',
    24: '96px',
    32: '128px',
    40: '160px',
    48: '192px',
    56: '224px',
    64: '256px',
  },

  // Typography Scale
  typography: {
    fontFamily: {
      sans: [
        'Inter',
        'SF Pro Display',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI Variable',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'sans-serif',
      ],
      mono: [
        'SF Mono',
        'Monaco',
        'Cascadia Code',
        'Inconsolata',
        'JetBrains Mono',
        'Roboto Mono',
        'Fira Code',
        'consolas',
        'monospace',
      ],
      display: [
        'SF Pro Display',
        'Inter',
        '-apple-system',
        'BlinkMacSystemFont',
        'system-ui',
        'sans-serif',
      ],
      body: [
        'SF Pro Text',
        'Inter',
        '-apple-system',
        'BlinkMacSystemFont',
        'system-ui',
        'sans-serif',
      ],
    },
    fontSize: {
      // Text sizes
      xs: [
        '12px',
        { lineHeight: '16px', letterSpacing: '0.025em', fontWeight: '400' },
      ],
      sm: [
        '14px',
        { lineHeight: '20px', letterSpacing: '0.025em', fontWeight: '400' },
      ],
      base: [
        '16px',
        { lineHeight: '24px', letterSpacing: '0em', fontWeight: '400' },
      ],
      lg: [
        '18px',
        { lineHeight: '28px', letterSpacing: '-0.010em', fontWeight: '400' },
      ],
      xl: [
        '20px',
        { lineHeight: '30px', letterSpacing: '-0.015em', fontWeight: '400' },
      ],

      // Display sizes
      '2xl': [
        '24px',
        { lineHeight: '32px', letterSpacing: '-0.020em', fontWeight: '600' },
      ],
      '3xl': [
        '30px',
        { lineHeight: '38px', letterSpacing: '-0.025em', fontWeight: '600' },
      ],
      '4xl': [
        '36px',
        { lineHeight: '44px', letterSpacing: '-0.030em', fontWeight: '700' },
      ],
      '5xl': [
        '48px',
        { lineHeight: '54px', letterSpacing: '-0.035em', fontWeight: '700' },
      ],
      '6xl': [
        '60px',
        { lineHeight: '66px', letterSpacing: '-0.040em', fontWeight: '700' },
      ],
      '7xl': [
        '72px',
        { lineHeight: '78px', letterSpacing: '-0.045em', fontWeight: '800' },
      ],
      '8xl': [
        '96px',
        { lineHeight: '102px', letterSpacing: '-0.050em', fontWeight: '800' },
      ],
      '9xl': [
        '128px',
        { lineHeight: '134px', letterSpacing: '-0.055em', fontWeight: '900' },
      ],

      // Semantic sizes
      caption: [
        '12px',
        { lineHeight: '16px', letterSpacing: '0.040em', fontWeight: '500' },
      ],
      footnote: [
        '13px',
        { lineHeight: '18px', letterSpacing: '0.030em', fontWeight: '400' },
      ],
      subheadline: [
        '15px',
        { lineHeight: '22px', letterSpacing: '0.020em', fontWeight: '500' },
      ],
      headline: [
        '17px',
        { lineHeight: '25px', letterSpacing: '-0.005em', fontWeight: '600' },
      ],
      body: [
        '16px',
        { lineHeight: '24px', letterSpacing: '0em', fontWeight: '400' },
      ],
      callout: [
        '16px',
        { lineHeight: '24px', letterSpacing: '0em', fontWeight: '500' },
      ],
      title1: [
        '28px',
        { lineHeight: '34px', letterSpacing: '-0.020em', fontWeight: '700' },
      ],
      title2: [
        '22px',
        { lineHeight: '28px', letterSpacing: '-0.015em', fontWeight: '700' },
      ],
      title3: [
        '20px',
        { lineHeight: '26px', letterSpacing: '-0.010em', fontWeight: '600' },
      ],
      largeTitle: [
        '34px',
        { lineHeight: '40px', letterSpacing: '-0.025em', fontWeight: '700' },
      ],
    },
    fontWeight: {
      thin: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
      // Semantic weights
      caption: '500',
      footnote: '400',
      subheadline: '500',
      headline: '600',
      body: '400',
      callout: '500',
      title: '700',
      largeTitle: '700',
      display: '800',
    },
    // Line heights
    lineHeight: {
      none: '1',
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2',
      // Semantic line heights
      caption: '1.33',
      footnote: '1.38',
      subheadline: '1.47',
      headline: '1.47',
      body: '1.5',
      callout: '1.5',
      title: '1.2',
      largeTitle: '1.18',
      display: '1.1',
    },
    // Letter spacing
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0em',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
      // Semantic letter spacing
      caption: '0.040em',
      footnote: '0.030em',
      subheadline: '0.020em',
      headline: '-0.005em',
      body: '0em',
      callout: '0em',
      title: '-0.015em',
      largeTitle: '-0.025em',
      display: '-0.030em',
    },
  },

  // Color System
  colors: {
    // Semantic Colors
    primary: {
      50: 'hsl(214, 100%, 97%)',
      100: 'hsl(214, 95%, 93%)',
      200: 'hsl(213, 97%, 87%)',
      300: 'hsl(212, 96%, 78%)',
      400: 'hsl(213, 94%, 68%)',
      500: 'hsl(217, 91%, 60%)',
      600: 'hsl(221, 83%, 53%)',
      700: 'hsl(224, 76%, 48%)',
      800: 'hsl(226, 71%, 40%)',
      900: 'hsl(224, 64%, 33%)',
      950: 'hsl(226, 55%, 21%)',
    },

    // Glass-specific colors
    glass: {
      // Light theme glass backgrounds
      light: {
        primary: 'rgba(255, 255, 255, 0.12)',
        secondary: 'rgba(248, 250, 252, 0.15)',
        tertiary: 'rgba(241, 245, 249, 0.18)',
        elevated: 'rgba(255, 255, 255, 0.25)',
        floating: 'rgba(255, 255, 255, 0.20)',
        overlay: 'rgba(255, 255, 255, 0.30)',
      },
      // Dark theme glass backgrounds
      dark: {
        primary: 'rgba(28, 28, 30, 0.15)',
        secondary: 'rgba(44, 44, 46, 0.18)',
        tertiary: 'rgba(58, 58, 60, 0.22)',
        elevated: 'rgba(72, 72, 74, 0.28)',
        floating: 'rgba(99, 99, 102, 0.25)',
        overlay: 'rgba(142, 142, 147, 0.35)',
      },
      // Interactive states
      states: {
        hover: 'rgba(255, 255, 255, 0.18)',
        active: 'rgba(255, 255, 255, 0.08)',
        focus: 'rgba(255, 255, 255, 0.22)',
        pressed: 'rgba(255, 255, 255, 0.06)',
      },
    },

    // Border colors
    border: {
      light: {
        subtle: 'rgba(255, 255, 255, 0.08)',
        light: 'rgba(255, 255, 255, 0.15)',
        medium: 'rgba(255, 255, 255, 0.25)',
        strong: 'rgba(255, 255, 255, 0.35)',
      },
      dark: {
        subtle: 'rgba(255, 255, 255, 0.05)',
        light: 'rgba(255, 255, 255, 0.10)',
        medium: 'rgba(255, 255, 255, 0.18)',
        strong: 'rgba(255, 255, 255, 0.25)',
      },
    },
  },

  // Border Radius
  borderRadius: {
    none: '0px',
    sm: '4px',
    base: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '32px',
    full: '9999px',
  },

  // Shadows
  shadows: {
    glass: {
      whisper: '0 1px 2px rgba(0, 0, 0, 0.02), 0 2px 4px rgba(0, 0, 0, 0.01)',
      subtle: '0 1px 3px rgba(0, 0, 0, 0.05), 0 4px 12px rgba(0, 0, 0, 0.03)',
      light: '0 2px 8px rgba(0, 0, 0, 0.08), 0 8px 24px rgba(0, 0, 0, 0.06)',
      medium: '0 4px 16px rgba(0, 0, 0, 0.12), 0 16px 40px rgba(0, 0, 0, 0.08)',
      heavy: '0 8px 32px rgba(0, 0, 0, 0.16), 0 24px 64px rgba(0, 0, 0, 0.12)',
      intense:
        '0 16px 48px rgba(0, 0, 0, 0.20), 0 32px 80px rgba(0, 0, 0, 0.15)',
    },
    focus: {
      subtle: '0 0 0 2px rgba(59, 130, 246, 0.08)',
      light: '0 0 0 3px rgba(59, 130, 246, 0.12)',
      medium: '0 0 0 4px rgba(59, 130, 246, 0.18)',
      strong: '0 0 0 5px rgba(59, 130, 246, 0.25)',
    },
  },

  // Backdrop Blur
  backdropBlur: {
    whisper: 'blur(2px)',
    ghost: 'blur(4px)',
    subtle: 'blur(8px)',
    light: 'blur(16px)',
    medium: 'blur(24px)',
    heavy: 'blur(32px)',
    intense: 'blur(40px)',
    extreme: 'blur(56px)',
    ultra: 'blur(72px)',
  },

  // Animation
  animation: {
    duration: {
      instant: '0.05s',
      fast: '0.15s',
      normal: '0.25s',
      smooth: '0.35s',
      slow: '0.5s',
    },
    easing: {
      glass: 'cubic-bezier(0.4, 0, 0.2, 1)',
      liquid: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      magnetic: 'cubic-bezier(0.2, 0, 0, 1.2)',
      hover: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },

  // Breakpoints
  breakpoints: {
    xs: '475px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // Z-Index Scale
  zIndex: {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800,
  },
} as const;

// Type exports for TypeScript support - Enhanced for Tailwind v4
export type DesignTokens = typeof designTokens;
export type SpacingToken = keyof typeof designTokens.spacing;
export type ColorToken = keyof typeof designTokens.colors;
export type TypographyToken = keyof typeof designTokens.typography.fontSize;
export type BorderRadiusToken = keyof typeof designTokens.borderRadius;
export type ShadowToken = keyof typeof designTokens.shadows.glass;
export type AnimationDurationToken =
  keyof typeof designTokens.animation.duration;
export type AnimationEasingToken = keyof typeof designTokens.animation.easing;
export type BreakpointToken = keyof typeof designTokens.breakpoints;
export type ZIndexToken = keyof typeof designTokens.zIndex;

// Tailwind v4 specific types
export type GlassColorToken = keyof typeof designTokens.colors.glass;
export type BorderColorToken = keyof typeof designTokens.colors.border;
export type FocusShadowToken = keyof typeof designTokens.shadows.focus;
export type FontFamilyToken = keyof typeof designTokens.typography.fontFamily;
export type FontWeightToken = keyof typeof designTokens.typography.fontWeight;

// CSS Custom Property generators for type safety
export const createCSSVar = (property: string): string => `var(--${property})`;
export const createGlassVar = (
  type: 'bg' | 'border',
  variant: string
): string => `var(--glass-${type}-${variant})`;

// Helper to get design token values with TypeScript safety
export const getDesignToken = {
  spacing: (token: SpacingToken) => designTokens.spacing[token],
  color: (category: keyof typeof designTokens.colors, token: string) => {
    const colorCategory = designTokens.colors[category];
    return colorCategory && typeof colorCategory === 'object' 
      ? (colorCategory as Record<string, string>)[token]
      : undefined;
  },
  typography: {
    fontSize: (token: TypographyToken) =>
      designTokens.typography.fontSize[token],
    fontWeight: (token: FontWeightToken) =>
      designTokens.typography.fontWeight[token],
    fontFamily: (token: FontFamilyToken) =>
      designTokens.typography.fontFamily[token],
  },
  borderRadius: (token: BorderRadiusToken) => designTokens.borderRadius[token],
  shadow: {
    glass: (token: ShadowToken) => designTokens.shadows.glass[token],
    focus: (token: FocusShadowToken) => designTokens.shadows.focus[token],
  },
  animation: {
    duration: (token: AnimationDurationToken) =>
      designTokens.animation.duration[token],
    easing: (token: AnimationEasingToken) =>
      designTokens.animation.easing[token],
  },
  breakpoint: (token: BreakpointToken) => designTokens.breakpoints[token],
  zIndex: (token: ZIndexToken) => designTokens.zIndex[token],
} as const;

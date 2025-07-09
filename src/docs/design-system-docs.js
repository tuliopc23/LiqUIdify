/**
 * Design System Documentation
 * Documentation for design tokens, patterns, and guidelines
 */
import { designTokens } from '@/tokens/design-tokens';
// Design system documentation generator
class DesignSystemDocGenerator {
  generateColorPalette() {
    return [
      {
        name: 'Primary Colors',
        description: 'Main brand colors used throughout the interface',
        colors: Object.entries(designTokens.colors.primary).map(
          ([name, value]) => ({
            name: `primary-${name}`,
            value,
            usage: this.getColorUsage('primary', name),
            contrast: this.calculateContrast(value),
          })
        ),
      },
      {
        name: 'Glass Colors - Light Theme',
        description:
          'Translucent colors for glass morphism effects in light theme',
        colors: Object.entries(designTokens.colors.glass.light).map(
          ([name, value]) => ({
            name: `glass-light-${name}`,
            value,
            usage: this.getGlassColorUsage('light', name),
          })
        ),
      },
      {
        name: 'Glass Colors - Dark Theme',
        description:
          'Translucent colors for glass morphism effects in dark theme',
        colors: Object.entries(designTokens.colors.glass.dark).map(
          ([name, value]) => ({
            name: `glass-dark-${name}`,
            value,
            usage: this.getGlassColorUsage('dark', name),
          })
        ),
      },
      {
        name: 'Border Colors',
        description: 'Subtle border colors for glass components',
        colors: [
          ...Object.entries(designTokens.colors.border.light).map(
            ([name, value]) => ({
              name: `border-light-${name}`,
              value,
              usage: this.getBorderColorUsage('light', name),
            })
          ),
          ...Object.entries(designTokens.colors.border.dark).map(
            ([name, value]) => ({
              name: `border-dark-${name}`,
              value,
              usage: this.getBorderColorUsage('dark', name),
            })
          ),
        ],
      },
    ];
  }
  generateTypographyScale() {
    return {
      name: 'Typography Scale',
      description:
        'Harmonious type scale with optimized line heights and letter spacing',
      scales: Object.entries(designTokens.typography.fontSize).map(
        ([name, [size, config]]) => ({
          name,
          size,
          lineHeight: typeof config === 'object' ? config.lineHeight : '1.5',
          letterSpacing:
            typeof config === 'object' ? config.letterSpacing : '0',
          usage: this.getTypographyUsage(name),
        })
      ),
    };
  }
  generateSpacingScale() {
    return {
      name: 'Spacing Scale',
      description: 'Consistent spacing system based on 4px grid',
      scale: Object.entries(designTokens.spacing).map(([name, value]) => ({
        name,
        value,
        pixels: value,
        usage: this.getSpacingUsage(name),
      })),
    };
  }
  getColorUsage(palette, shade) {
    const usageMap = {
      primary: {
        50: 'Very light backgrounds, subtle highlights',
        100: 'Light backgrounds, hover states',
        200: 'Disabled states, light borders',
        300: 'Subtle text, placeholder text',
        400: 'Secondary text, icons',
        500: 'Primary brand color, main actions',
        600: 'Hover states for primary actions',
        700: 'Active states, pressed buttons',
        800: 'High contrast text, important elements',
        900: 'Highest contrast, headings',
        950: 'Maximum contrast, critical elements',
      },
    };
    return usageMap[palette]?.[shade] || 'General purpose color';
  }
  getGlassColorUsage(theme, variant) {
    const usageMap = {
      primary: 'Main glass surfaces, cards, panels',
      secondary: 'Secondary surfaces, sidebars',
      tertiary: 'Subtle backgrounds, overlays',
      elevated: 'Elevated surfaces, modals, dropdowns',
      floating: 'Floating elements, tooltips, popovers',
      overlay: 'Modal backdrops, drawer overlays',
    };
    return usageMap[variant] || 'Glass morphism effect';
  }
  getBorderColorUsage(theme, variant) {
    const usageMap = {
      subtle: 'Very light borders, dividers',
      light: 'Standard borders, card outlines',
      medium: 'Prominent borders, focus states',
      strong: 'High contrast borders, active states',
    };
    return usageMap[variant] || 'Border styling';
  }
  getTypographyUsage(scale) {
    const usageMap = {
      xs: 'Captions, fine print, metadata',
      sm: 'Body text, descriptions, labels',
      base: 'Default body text, paragraphs',
      lg: 'Large body text, lead paragraphs',
      xl: 'Small headings, section titles',
      '2xl': 'Medium headings, card titles',
      '3xl': 'Large headings, page titles',
      '4xl': 'Extra large headings',
      '5xl': 'Display text, hero headings',
      '6xl': 'Large display text',
      '7xl': 'Extra large display text',
      '8xl': 'Massive display text',
      '9xl': 'Maximum display text',
    };
    return usageMap[scale] || 'Text content';
  }
  getSpacingUsage(scale) {
    const usageMap = {
      0: 'No spacing, reset margins/padding',
      1: 'Minimal spacing, tight layouts',
      2: 'Small spacing, compact elements',
      3: 'Medium-small spacing',
      4: 'Standard spacing, default gaps',
      5: 'Medium spacing',
      6: 'Large spacing, section gaps',
      8: 'Extra large spacing',
      10: 'Very large spacing',
      12: 'Huge spacing, major sections',
      16: 'Massive spacing, page sections',
      20: 'Extra massive spacing',
      24: 'Enormous spacing',
      32: 'Giant spacing, hero sections',
      40: 'Colossal spacing',
      48: 'Titanic spacing',
      56: 'Gargantuan spacing',
      64: 'Maximum spacing',
    };
    return usageMap[scale] || 'General spacing';
  }
  calculateContrast(_color) {
    // Simplified contrast calculation - would need proper implementation
    return { white: 4.5, black: 4.5 };
  }
}
// Design system sections
export const designSystemSections = [
  {
    id: 'overview',
    title: 'Design System Overview',
    description: 'Introduction to Glass UI design principles and philosophy',
    content: [
      {
        type: 'text',
        title: 'Philosophy',
        content: `Glass UI is built on the principles of clarity, depth, and accessibility. 
        Our design system emphasizes translucency and layering to create interfaces that feel 
        both modern and intuitive. Every component is designed with accessibility in mind, 
        ensuring that beautiful interfaces are also inclusive interfaces.`,
      },
      {
        type: 'text',
        title: 'Core Principles',
        content: `
        • **Clarity**: Clean, uncluttered interfaces that prioritize content
        • **Depth**: Layered visual hierarchy using glass morphism effects
        • **Consistency**: Unified design language across all components
        • **Accessibility**: WCAG 2.1 AA compliance as a baseline
        • **Performance**: Optimized for smooth animations and interactions
        `,
      },
    ],
  },
  {
    id: 'colors',
    title: 'Color System',
    description:
      'Comprehensive color palette with semantic meanings and usage guidelines',
    content: [
      {
        type: 'text',
        title: 'Color Philosophy',
        content: `Our color system is designed around the concept of translucency and depth. 
        We use carefully crafted alpha values to create glass-like effects while maintaining 
        excellent contrast ratios for accessibility.`,
      },
      {
        type: 'color-palette',
        title: 'Color Palettes',
        content: new DesignSystemDocGenerator().generateColorPalette(),
      },
    ],
  },
  {
    id: 'typography',
    title: 'Typography',
    description: 'Type scale, font families, and text styling guidelines',
    content: [
      {
        type: 'text',
        title: 'Typography Philosophy',
        content: `Typography in Glass UI prioritizes readability and hierarchy. 
        We use a modular scale to ensure consistent proportions and optimal 
        line heights for comfortable reading across all device sizes.`,
      },
      {
        type: 'typography-scale',
        title: 'Type Scale',
        content: new DesignSystemDocGenerator().generateTypographyScale(),
      },
    ],
  },
  {
    id: 'spacing',
    title: 'Spacing System',
    description: 'Consistent spacing scale based on 4px grid system',
    content: [
      {
        type: 'text',
        title: 'Spacing Philosophy',
        content: `Our spacing system is based on a 4px grid, providing consistent 
        rhythm and alignment throughout the interface. This creates visual harmony 
        and makes layouts feel more organized and professional.`,
      },
      {
        type: 'spacing-scale',
        title: 'Spacing Scale',
        content: new DesignSystemDocGenerator().generateSpacingScale(),
      },
    ],
  },
  {
    id: 'shadows',
    title: 'Shadow System',
    description: 'Elevation and depth through carefully crafted shadows',
    content: [
      {
        type: 'text',
        title: 'Shadow Philosophy',
        content: `Shadows in Glass UI create depth and hierarchy while maintaining 
        the translucent aesthetic. We use subtle, realistic shadows that enhance 
        the glass morphism effect without overwhelming the content.`,
      },
      {
        type: 'table',
        title: 'Shadow Tokens',
        content: {
          headers: ['Token', 'Value', 'Usage'],
          rows: Object.entries(designTokens.shadows.glass).map(
            ([name, value]) => [
              `shadows.glass.${name}`,
              value,
              getShadowUsage(name),
            ]
          ),
        },
      },
    ],
  },
  {
    id: 'animation',
    title: 'Animation System',
    description: 'Motion design principles and animation tokens',
    content: [
      {
        type: 'text',
        title: 'Animation Philosophy',
        content: `Animations in Glass UI are subtle and purposeful, enhancing 
        the user experience without being distracting. We use easing curves 
        that feel natural and durations that respect user preferences.`,
      },
      {
        type: 'table',
        title: 'Duration Tokens',
        content: {
          headers: ['Token', 'Value', 'Usage'],
          rows: Object.entries(designTokens.animation.duration).map(
            ([name, value]) => [
              `animation.duration.${name}`,
              value,
              getDurationUsage(name),
            ]
          ),
        },
      },
      {
        type: 'table',
        title: 'Easing Tokens',
        content: {
          headers: ['Token', 'Value', 'Usage'],
          rows: Object.entries(designTokens.animation.easing).map(
            ([name, value]) => [
              `animation.easing.${name}`,
              value,
              getEasingUsage(name),
            ]
          ),
        },
      },
    ],
  },
];
// Helper methods for usage descriptions
function getShadowUsage(name) {
  const usageMap = {
    whisper: 'Minimal elevation, subtle depth',
    subtle: 'Light elevation, cards and panels',
    light: 'Medium elevation, floating elements',
    medium: 'High elevation, modals and overlays',
    heavy: 'Very high elevation, important dialogs',
    intense: 'Maximum elevation, critical alerts',
  };
  return usageMap[name] || 'General shadow effect';
}
function getDurationUsage(name) {
  const usageMap = {
    instant: 'Immediate feedback, micro-interactions',
    fast: 'Quick transitions, hover effects',
    normal: 'Standard transitions, most animations',
    smooth: 'Smooth transitions, complex animations',
    slow: 'Deliberate transitions, important changes',
  };
  return usageMap[name] || 'General animation duration';
}
function getEasingUsage(name) {
  const usageMap = {
    glass: 'Standard glass UI easing, most transitions',
    liquid: 'Smooth, flowing animations',
    spring: 'Bouncy, playful interactions',
    magnetic: 'Magnetic attraction effects',
    hover: 'Hover state transitions',
  };
  return usageMap[name] || 'General easing function';
}
// Export the documentation generator
export const designSystemDocs = {
  sections: designSystemSections,
  generator: new DesignSystemDocGenerator(),
};

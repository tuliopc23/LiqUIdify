/**
 * CSS Variables System for Zero-Runtime Theming
 * Generates CSS custom properties from design tokens
 */

import { designTokens } from '../tokens/design-tokens';

/**
 * Converts design tokens to CSS custom properties
 */
export function generateCSSVariables() {
  const cssVariables: string[] = [];

  // Helper function to create CSS variable name
  const createVarName = (category: string, key: string, subKey?: string) => {
    const parts = [category, key, subKey].filter(Boolean);
    return `--liquid-${parts.join('-')}`;
  };

  // Generate spacing variables
  Object.entries(designTokens.spacing).forEach(([key, value]) => {
    cssVariables.push(`  ${createVarName('spacing', key)}: ${value};`);
  });

  // Generate color variables
  Object.entries(designTokens.colors.primary).forEach(([key, value]) => {
    cssVariables.push(`  ${createVarName('color', 'primary', key)}: ${value};`);
  });

  // Generate glass color variables
  Object.entries(designTokens.colors.glass.light).forEach(([key, value]) => {
    cssVariables.push(`  ${createVarName('glass', 'light', key)}: ${value};`);
  });

  Object.entries(designTokens.colors.glass.dark).forEach(([key, value]) => {
    cssVariables.push(`  ${createVarName('glass', 'dark', key)}: ${value};`);
  });

  Object.entries(designTokens.colors.glass.states).forEach(([key, value]) => {
    cssVariables.push(`  ${createVarName('glass', 'state', key)}: ${value};`);
  });

  // Generate border variables
  Object.entries(designTokens.colors.border.light).forEach(([key, value]) => {
    cssVariables.push(`  ${createVarName('border', 'light', key)}: ${value};`);
  });

  Object.entries(designTokens.colors.border.dark).forEach(([key, value]) => {
    cssVariables.push(`  ${createVarName('border', 'dark', key)}: ${value};`);
  });

  // Generate border radius variables
  Object.entries(designTokens.borderRadius).forEach(([key, value]) => {
    cssVariables.push(`  ${createVarName('radius', key)}: ${value};`);
  });

  // Generate shadow variables
  Object.entries(designTokens.shadows.glass).forEach(([key, value]) => {
    cssVariables.push(`  ${createVarName('shadow', 'glass', key)}: ${value};`);
  });

  Object.entries(designTokens.shadows.focus).forEach(([key, value]) => {
    cssVariables.push(`  ${createVarName('shadow', 'focus', key)}: ${value};`);
  });

  // Generate backdrop blur variables
  Object.entries(designTokens.backdropBlur).forEach(([key, value]) => {
    cssVariables.push(`  ${createVarName('blur', key)}: ${value};`);
  });

  // Generate animation variables
  Object.entries(designTokens.animation.duration).forEach(([key, value]) => {
    cssVariables.push(`  ${createVarName('duration', key)}: ${value};`);
  });

  Object.entries(designTokens.animation.easing).forEach(([key, value]) => {
    cssVariables.push(`  ${createVarName('easing', key)}: ${value};`);
  });

  // Generate typography variables
  Object.entries(designTokens.typography.fontSize).forEach(([key, value]) => {
    const [fontSize, config] = Array.isArray(value) ? value : [value, {}];
    cssVariables.push(`  ${createVarName('font', 'size', key)}: ${fontSize};`);
    
    if (typeof config === 'object' && config.lineHeight) {
      cssVariables.push(`  ${createVarName('line', 'height', key)}: ${config.lineHeight};`);
    }
    
    if (typeof config === 'object' && config.letterSpacing) {
      cssVariables.push(`  ${createVarName('letter', 'spacing', key)}: ${config.letterSpacing};`);
    }
    
    if (typeof config === 'object' && config.fontWeight) {
      cssVariables.push(`  ${createVarName('font', 'weight', key)}: ${config.fontWeight};`);
    }
  });

  // Generate z-index variables
  Object.entries(designTokens.zIndex).forEach(([key, value]) => {
    cssVariables.push(`  ${createVarName('z', key)}: ${value};`);
  });

  return cssVariables;
}

/**
 * Generate the complete CSS with variables
 */
export function generateThemeCSS() {
  const variables = generateCSSVariables();
  
  return `
:root {
${variables.join('\n')}
}

/* Dark theme overrides */
[data-theme="dark"] {
  /* Glass colors for dark theme */
  --liquid-glass-primary: var(--liquid-glass-dark-primary);
  --liquid-glass-secondary: var(--liquid-glass-dark-secondary);
  --liquid-glass-tertiary: var(--liquid-glass-dark-tertiary);
  --liquid-glass-elevated: var(--liquid-glass-dark-elevated);
  --liquid-glass-floating: var(--liquid-glass-dark-floating);
  --liquid-glass-overlay: var(--liquid-glass-dark-overlay);
  
  /* Border colors for dark theme */
  --liquid-border-subtle: var(--liquid-border-dark-subtle);
  --liquid-border-light: var(--liquid-border-dark-light);
  --liquid-border-medium: var(--liquid-border-dark-medium);
  --liquid-border-strong: var(--liquid-border-dark-strong);
}

/* Light theme (default) */
[data-theme="light"] {
  /* Glass colors for light theme */
  --liquid-glass-primary: var(--liquid-glass-light-primary);
  --liquid-glass-secondary: var(--liquid-glass-light-secondary);
  --liquid-glass-tertiary: var(--liquid-glass-light-tertiary);
  --liquid-glass-elevated: var(--liquid-glass-light-elevated);
  --liquid-glass-floating: var(--liquid-glass-light-floating);
  --liquid-glass-overlay: var(--liquid-glass-light-overlay);
  
  /* Border colors for light theme */
  --liquid-border-subtle: var(--liquid-border-light-subtle);
  --liquid-border-light: var(--liquid-border-light-light);
  --liquid-border-medium: var(--liquid-border-light-medium);
  --liquid-border-strong: var(--liquid-border-light-strong);
}
`;
}

/**
 * CSS-in-TS utilities for consuming variables
 */
export const cssVars = {
  // Spacing
  spacing: (key: keyof typeof designTokens.spacing) => `var(--liquid-spacing-${key})`,
  
  // Colors
  color: {
    primary: (shade: keyof typeof designTokens.colors.primary) => `var(--liquid-color-primary-${shade})`,
    glass: {
      primary: () => 'var(--liquid-glass-primary)',
      secondary: () => 'var(--liquid-glass-secondary)',
      tertiary: () => 'var(--liquid-glass-tertiary)',
      elevated: () => 'var(--liquid-glass-elevated)',
      floating: () => 'var(--liquid-glass-floating)',
      overlay: () => 'var(--liquid-glass-overlay)',
    },
    border: {
      subtle: () => 'var(--liquid-border-subtle)',
      light: () => 'var(--liquid-border-light)',
      medium: () => 'var(--liquid-border-medium)',
      strong: () => 'var(--liquid-border-strong)',
    }
  },
  
  // Border radius
  radius: (key: keyof typeof designTokens.borderRadius) => `var(--liquid-radius-${key})`,
  
  // Shadows
  shadow: {
    glass: (key: keyof typeof designTokens.shadows.glass) => `var(--liquid-shadow-glass-${key})`,
    focus: (key: keyof typeof designTokens.shadows.focus) => `var(--liquid-shadow-focus-${key})`,
  },
  
  // Backdrop blur
  blur: (key: keyof typeof designTokens.backdropBlur) => `var(--liquid-blur-${key})`,
  
  // Animation
  duration: (key: keyof typeof designTokens.animation.duration) => `var(--liquid-duration-${key})`,
  easing: (key: keyof typeof designTokens.animation.easing) => `var(--liquid-easing-${key})`,
  
  // Typography
  fontSize: (key: keyof typeof designTokens.typography.fontSize) => `var(--liquid-font-size-${key})`,
  lineHeight: (key: keyof typeof designTokens.typography.fontSize) => `var(--liquid-line-height-${key})`,
  letterSpacing: (key: keyof typeof designTokens.typography.fontSize) => `var(--liquid-letter-spacing-${key})`,
  fontWeight: (key: keyof typeof designTokens.typography.fontSize) => `var(--liquid-font-weight-${key})`,
  
  // Z-index
  z: (key: keyof typeof designTokens.zIndex) => `var(--liquid-z-${key})`,
} as const;

// Export type for CSS variable functions
export type CSSVars = typeof cssVars;

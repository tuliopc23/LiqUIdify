/**
 * LiqUIdify Development Helpers
 * Utilities for debugging and developing with the liquid glass system
 */

export const LIQUID_GLASS_DEBUG = process.env.NODE_ENV === 'development';

/**
 * Debug utility to log liquid glass component information
 */
export function debugLiquidGlass(componentName: string, props: any) {
  if (LIQUID_GLASS_DEBUG) {
    console.group(`🌊 LiquidGlass Debug: ${componentName}`);
    console.log('Props:', props);
    console.log('Has layered approach:', hasLayeredClasses(props.className));
    console.groupEnd();
  }
}

/**
 * Check if a className string contains layered liquid glass classes
 */
export function hasLayeredClasses(className?: string): boolean {
  if (!className) return false;
  
  const requiredClasses = [
    'liquid-glass-container',
    'liquid-glass-filter',
    'liquid-glass-overlay',
    'liquid-glass-specular'
  ];
  
  return requiredClasses.every(cls => className.includes(cls));
}

/**
 * Validate liquid glass component props
 */
export function validateLiquidGlassProps(props: any, componentName: string) {
  if (LIQUID_GLASS_DEBUG) {
    const warnings = [];
    
    if (props.interactive && !props.className?.includes('liquid-glass-interactive')) {
      warnings.push('Interactive prop is true but missing liquid-glass-interactive class');
    }
    
    if (props.layered && !hasLayeredClasses(props.className)) {
      warnings.push('Layered prop is true but missing layered classes');
    }
    
    if (warnings.length > 0) {
      console.warn(`⚠️ LiquidGlass warnings for ${componentName}:`, warnings);
    }
  }
}

/**
 * Generate liquid glass class names based on props
 */
export function generateLiquidGlassClasses(props: {
  size?: string;
  variant?: string;
  interactive?: boolean;
  layered?: boolean;
  className?: string;
}): string {
  const classes = [];
  
  if (props.layered) {
    classes.push('liquid-glass-container');
  } else {
    classes.push('liquid-glass');
  }
  
  if (props.size) {
    classes.push(`liquid-glass-${props.size}`);
  }
  
  if (props.interactive) {
    classes.push('liquid-glass-interactive');
  }
  
  if (props.className) {
    classes.push(props.className);
  }
  
  return classes.join(' ');
}

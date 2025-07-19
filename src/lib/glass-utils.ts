import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const glassVariants = {
  default: 'apple-glass apple-glass--depth-2 apple-glass--magnetic rounded-xl',
  hover:
    'apple-glass apple-glass--depth-2 apple-glass--magnetic apple-glass--shimmer rounded-xl',
  elevated:
    'apple-glass apple-glass--depth-3 apple-glass--magnetic apple-glass--glow rounded-xl',
  surface: 'apple-glass apple-glass--depth-1 rounded-lg',
  pressed: 'apple-glass apple-glass--depth-2 apple-glass--ripple rounded-xl',
  apple: 'apple-glass rounded-xl',
  'apple-subtle': 'apple-glass apple-glass--depth-1 rounded-lg',
  'apple-medium': 'apple-glass apple-glass--depth-2 rounded-xl',
  'apple-strong': 'apple-glass apple-glass--depth-3 rounded-2xl',
  'apple-interactive':
    'apple-glass apple-glass--depth-2 apple-glass--magnetic rounded-xl',
  'apple-shimmer':
    'apple-glass apple-glass--depth-2 apple-glass--shimmer rounded-xl',
  'apple-ripple':
    'apple-glass apple-glass--depth-2 apple-glass--ripple rounded-xl',
  'apple-glow': 'apple-glass apple-glass--depth-2 apple-glass--glow rounded-xl',
  // Legacy variants for backward compatibility
  'legacy-glass': 'liquid-glass rounded-xl',
  'legacy-elevated': 'liquid-glass-elevated liquid-interactive rounded-xl',
};

export function getGlassClass(variant: keyof typeof glassVariants = 'default') {
  return glassVariants[variant];
}

export const focusRing = 'focus-ring';

export const microInteraction = {
  gentle: 'transition-all duration-200 ease-out',
  smooth: 'transition-all duration-300 cubic-bezier(0.2, 0, 0, 1)',
  spring: 'transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1)',
  interactive: 'transition-all duration-250 cubic-bezier(0.4, 0, 0.2, 1)',
  bounce: 'transition-all duration-400 cubic-bezier(0.68, -0.55, 0.265, 1.55)',
};

// Responsive sizing utilities
export const responsiveSize = {
  xs: 'text-xs px-2 py-1 min-h-[28px] sm:px-2.5 sm:py-1.5 sm:min-h-[32px]',
  sm: 'text-sm px-3 py-1.5 min-h-[36px] sm:px-4 sm:py-2 sm:min-h-[40px]',
  md: 'text-sm px-4 py-2 min-h-[44px] sm:text-base sm:px-6 sm:py-3 sm:min-h-[48px]',
  lg: 'text-base px-6 py-3 min-h-[48px] sm:text-lg sm:px-8 sm:py-4 sm:min-h-[52px]',
  xl: 'text-lg px-8 py-4 min-h-[52px] sm:text-xl sm:px-10 sm:py-5 sm:min-h-[56px]',
};

// Touch-friendly targets for mobile
export const touchTarget = {
  minimum: 'min-h-[44px] min-w-[44px]', // iOS HIG minimum
  comfortable: 'min-h-[48px] min-w-[48px]', // Material Design
  spacious: 'min-h-[56px] min-w-[56px]', // Desktop comfortable
};

// Responsive glass effects
export const responsiveGlass = {
  mobile: 'backdrop-blur-md saturate-150',
  tablet: 'backdrop-blur-lg saturate-150',
  desktop: 'backdrop-blur-xl saturate-180',
};

// Animation states
export const animationState = {
  idle: 'scale-100 opacity-100',
  hover: 'scale-[1.02] opacity-90',
  active: 'scale-[0.98] opacity-95',
  loading: 'animate-pulse',
  disabled: 'opacity-50 cursor-not-allowed',
};

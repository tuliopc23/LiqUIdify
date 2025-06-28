// component-classes.ts

// Dynamic variant generators with type safety
type VariantGenerator = (variant: string) => string;

const createVariantGenerator = (baseClass: string): VariantGenerator => {
    return (variant: string) => `${baseClass}--${variant}`;
};

// Animation utilities with spring physics config
interface SpringConfig {
    stiffness: number;
    damping: number;
    mass: number;
}

const defaultSpringConfig: SpringConfig = {
    stiffness: 170,
    damping: 26,
    mass: 1,
};

const createSpringAnimation = (config: SpringConfig = defaultSpringConfig) => {
    return {
        type: 'spring',
        stiffness: config.stiffness,
        damping: config.damping,
        mass: config.mass,
    };
};

// Dark mode toggle class generator
const createDarkModeClass = (isDarkMode: boolean): string => {
    return isDarkMode ? 'dark-mode' : 'light-mode';
};

// Accessibility focus visibility states
const focusVisibleClass = 'focus-visible';
const createFocusVisibilityClass = (isVisible: boolean): string => {
    return isVisible ? focusVisibleClass : '';
};

// Breakpoint-aware responsive utilities
type Breakpoint = 'sm' | 'md' | 'lg' | 'xl';

interface ResponsiveClassConfig {
    baseClass: string;
    breakpoint?: Breakpoint;
}

const createResponsiveClass = ({ baseClass, breakpoint }: ResponsiveClassConfig): string => {
    return breakpoint ? `${baseClass}--${breakpoint}` : baseClass;
};

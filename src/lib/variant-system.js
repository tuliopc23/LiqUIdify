/**
 * Advanced Variant System for Glass UI
 * Type-safe component variants with better composition
 */
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
// Class variance authority (cva) alias
export { createVariants as cva };
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}
// Enhanced variant creator with better TypeScript support
export function createVariants(config) {
    return function variants(props) {
        const { class: className, className: classNameProp, ...variantProps } = props || {};
        // Start with base classes
        const classes = [config.base];
        // Add variant classes
        Object.entries(config.variants).forEach(([variantKey, variantValues]) => {
            const variantValue = variantProps[variantKey] ||
                config.defaultVariants?.[variantKey];
            if (variantValue && variantValues[variantValue]) {
                classes.push(variantValues[variantValue]);
            }
        });
        // Add compound variant classes
        config.compoundVariants?.forEach((compound) => {
            const { class: compoundClass, ...compoundVariants } = compound;
            const matches = Object.entries(compoundVariants).every(([key, value]) => {
                const propValue = variantProps[key] ||
                    config.defaultVariants?.[key];
                return propValue === value;
            });
            if (matches) {
                classes.push(compoundClass);
            }
        });
        return cn(classes, className, classNameProp);
    };
}
// Glass-specific variant presets
export const glassVariants = createVariants({
    base: "relative overflow-hidden transition-all duration-300 ease-out",
    variants: {
        variant: {
            default: "glass-effect",
            elevated: "glass-effect-elevated",
            floating: "backdrop-blur-heavy saturate-[180%] bg-glass-light-floating border border-border-glass-light-medium",
            overlay: "backdrop-blur-ultra saturate-[200%] bg-glass-light-overlay border border-border-glass-light-strong",
            surface: "backdrop-blur-light saturate-[150%] bg-glass-light-primary border border-border-glass-light-subtle",
            ghost: "backdrop-blur-ghost saturate-[120%] bg-transparent border border-transparent hover:bg-glass-light-primary",
            solid: "bg-primary text-primary-foreground border border-primary/20",
        },
        size: {
            xs: "text-xs px-2 py-1 min-h-[28px] rounded-sm",
            sm: "text-sm px-3 py-1.5 min-h-[36px] rounded",
            md: "text-sm px-4 py-2 min-h-[44px] rounded-md",
            lg: "text-base px-6 py-3 min-h-[48px] rounded-lg",
            xl: "text-lg px-8 py-4 min-h-[52px] rounded-xl",
        },
        state: {
            default: "",
            hover: "glass-hover",
            active: "scale-[0.98] opacity-95",
            disabled: "opacity-50 cursor-not-allowed pointer-events-none",
            loading: "animate-pulse cursor-wait",
        },
        interactive: {
            none: "",
            subtle: "hover:scale-[1.01] hover:shadow-light",
            moderate: "hover:scale-[1.02] hover:shadow-medium hover:-translate-y-0.5",
            strong: "hover:scale-[1.03] hover:shadow-heavy hover:-translate-y-1",
            magnetic: "hover:scale-[1.05] hover:shadow-intense hover:-translate-y-2 animate-glass-magnetic",
        },
        glow: {
            none: "",
            subtle: "shadow-[0_0_20px_rgba(59,130,246,0.08)]",
            moderate: "shadow-[0_0_30px_rgba(59,130,246,0.12)]",
            strong: "shadow-[0_0_40px_rgba(59,130,246,0.15)]",
            intense: "shadow-[0_0_60px_rgba(59,130,246,0.20)]",
        },
    },
    compoundVariants: [
        {
            variant: "elevated",
            interactive: "strong",
            class: "hover:shadow-intense hover:backdrop-blur-ultra",
        },
        {
            variant: "floating",
            glow: "moderate",
            class: "shadow-medium",
        },
        {
            size: "xs",
            interactive: "magnetic",
            class: "hover:scale-[1.08]",
        },
        {
            size: "xl",
            interactive: "magnetic",
            class: "hover:scale-[1.02]",
        },
        {
            state: "disabled",
            interactive: "none",
            class: "hover:scale-100 hover:shadow-none hover:translate-y-0",
        },
    ],
    defaultVariants: {
        variant: "default",
        size: "md",
        state: "default",
        interactive: "subtle",
        glow: "none",
    },
});
// Button-specific variants
export const buttonVariants = createVariants({
    base: "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    variants: {
        variant: {
            default: "glass-effect text-foreground hover:glass-hover",
            primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg",
            secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
            destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
            outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
            ghost: "hover:bg-accent hover:text-accent-foreground",
            link: "text-primary underline-offset-4 hover:underline",
            glass: "glass-effect glass-hover",
            "glass-primary": "glass-effect bg-primary/10 text-primary border-primary/20 hover:bg-primary/20",
            "glass-secondary": "glass-effect bg-secondary/10 text-secondary border-secondary/20 hover:bg-secondary/20",
        },
        size: {
            xs: "h-7 px-2 text-xs",
            sm: "h-9 px-3",
            md: "h-10 px-4 py-2",
            lg: "h-11 px-8",
            xl: "h-12 px-10 text-base",
            icon: "h-10 w-10",
        },
        interactive: {
            none: "",
            subtle: "hover:scale-[1.01]",
            moderate: "hover:scale-[1.02] hover:-translate-y-0.5",
            strong: "hover:scale-[1.03] hover:-translate-y-1",
        },
    },
    compoundVariants: [
        {
            variant: "glass",
            interactive: "strong",
            class: "hover:backdrop-blur-heavy hover:shadow-medium",
        },
        {
            variant: "primary",
            interactive: "moderate",
            class: "hover:shadow-lg active:scale-[0.98]",
        },
    ],
    defaultVariants: {
        variant: "default",
        size: "md",
        interactive: "subtle",
    },
});
// Card-specific variants
export const cardVariants = createVariants({
    base: "rounded-lg border bg-card text-card-foreground shadow-sm",
    variants: {
        variant: {
            default: "glass-effect",
            elevated: "glass-effect-elevated shadow-medium",
            floating: "backdrop-blur-heavy bg-glass-light-floating border-border-glass-light-medium shadow-light",
            outline: "border-2 bg-transparent",
            solid: "bg-background border-border",
            ghost: "border-transparent bg-transparent",
        },
        padding: {
            none: "",
            sm: "p-4",
            md: "p-6",
            lg: "p-8",
            xl: "p-10",
        },
        interactive: {
            none: "",
            subtle: "hover:shadow-md transition-shadow duration-200",
            moderate: "hover:shadow-lg hover:-translate-y-1 transition-all duration-200",
            strong: "hover:shadow-xl hover:-translate-y-2 transition-all duration-300",
        },
    },
    compoundVariants: [
        {
            variant: "elevated",
            interactive: "strong",
            class: "hover:shadow-intense hover:backdrop-blur-ultra",
        },
    ],
    defaultVariants: {
        variant: "default",
        padding: "md",
        interactive: "subtle",
    },
});
// Input-specific variants
export const inputVariants = createVariants({
    base: "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
    variants: {
        variant: {
            default: "glass-effect",
            outline: "border-2 bg-transparent",
            filled: "bg-muted border-transparent",
            ghost: "border-transparent bg-transparent hover:bg-muted/50",
            glass: "glass-effect backdrop-blur-light",
        },
        size: {
            sm: "h-9 px-2 text-xs",
            md: "h-10 px-3 text-sm",
            lg: "h-11 px-4 text-base",
        },
        state: {
            default: "",
            error: "border-destructive focus-visible:ring-destructive",
            success: "border-green-500 focus-visible:ring-green-500",
            warning: "border-yellow-500 focus-visible:ring-yellow-500",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "md",
        state: "default",
    },
});
// Utility functions for responsive variants
export function responsiveVariant(base, sm, md, lg, xl) {
    return cn(base, sm && `sm:${sm}`, md && `md:${md}`, lg && `lg:${lg}`, xl && `xl:${xl}`);
}
// Animation state utilities
export const animationStates = {
    idle: "scale-100 opacity-100",
    hover: "scale-[1.02] opacity-90",
    active: "scale-[0.98] opacity-95",
    loading: "animate-pulse",
    disabled: "opacity-50 cursor-not-allowed",
    focus: "ring-2 ring-ring ring-offset-2",
};
// Focus management utilities
export const focusRing = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";
// Touch target utilities (for mobile accessibility)
export const touchTarget = {
    minimum: "min-h-[44px] min-w-[44px]", // iOS HIG minimum
    comfortable: "min-h-[48px] min-w-[48px]", // Material Design
    spacious: "min-h-[56px] min-w-[56px]", // Desktop comfortable
};

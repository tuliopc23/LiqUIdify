import { ClassValue } from 'clsx';
export { createVariants as cva };
export declare function cn(...inputs: ClassValue[]): string;
export interface VariantConfig<T extends Record<string, Record<string, string>>> {
    base?: string;
    variants: T;
    compoundVariants?: Array<{
        [K in keyof T]?: keyof T[K];
    } & {
        class: string;
    }>;
    defaultVariants?: {
        [K in keyof T]?: keyof T[K];
    };
}
export type VariantProps<T extends VariantConfig<any>> = {
    [K in keyof T['variants']]?: keyof T['variants'][K];
} & {
    class?: string;
    className?: string;
};
export type InferVariantProps<T> = T extends (props?: infer P) => any ? P : never;
export declare function createVariants<T extends Record<string, Record<string, string>>>(config: VariantConfig<T>): (props?: VariantProps<VariantConfig<T>>) => string;
export declare const glassVariants: (props?: VariantProps<VariantConfig<{
    variant: {
        default: string;
        elevated: string;
        floating: string;
        overlay: string;
        surface: string;
        ghost: string;
        solid: string;
    };
    size: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
    };
    state: {
        default: string;
        hover: string;
        active: string;
        disabled: string;
        loading: string;
    };
    interactive: {
        none: string;
        subtle: string;
        moderate: string;
        strong: string;
        magnetic: string;
    };
    glow: {
        none: string;
        subtle: string;
        moderate: string;
        strong: string;
        intense: string;
    };
}>> | undefined) => string;
export declare const buttonVariants: (props?: VariantProps<VariantConfig<{
    variant: {
        default: string;
        primary: string;
        secondary: string;
        destructive: string;
        outline: string;
        ghost: string;
        link: string;
        glass: string;
        'glass-primary': string;
        'glass-secondary': string;
    };
    size: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
        icon: string;
    };
    interactive: {
        none: string;
        subtle: string;
        moderate: string;
        strong: string;
    };
}>> | undefined) => string;
export declare const cardVariants: (props?: VariantProps<VariantConfig<{
    variant: {
        default: string;
        elevated: string;
        floating: string;
        outline: string;
        solid: string;
        ghost: string;
    };
    padding: {
        none: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
    };
    interactive: {
        none: string;
        subtle: string;
        moderate: string;
        strong: string;
    };
}>> | undefined) => string;
export declare const inputVariants: (props?: VariantProps<VariantConfig<{
    variant: {
        default: string;
        outline: string;
        filled: string;
        ghost: string;
        glass: string;
    };
    size: {
        sm: string;
        md: string;
        lg: string;
    };
    state: {
        default: string;
        error: string;
        success: string;
        warning: string;
    };
}>> | undefined) => string;
export type GlassVariantProps = InferVariantProps<typeof glassVariants>;
export type ButtonVariantProps = InferVariantProps<typeof buttonVariants>;
export type CardVariantProps = InferVariantProps<typeof cardVariants>;
export type InputVariantProps = InferVariantProps<typeof inputVariants>;
export declare function responsiveVariant(base: string, sm?: string, md?: string, lg?: string, xl?: string): string;
export declare const animationStates: {
    readonly idle: "scale-100 opacity-100";
    readonly hover: "scale-[1.02] opacity-90";
    readonly active: "scale-[0.98] opacity-95";
    readonly loading: "animate-pulse";
    readonly disabled: "opacity-50 cursor-not-allowed";
    readonly focus: "ring-2 ring-ring ring-offset-2";
};
export declare const focusRing = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";
export declare const touchTarget: {
    readonly minimum: "min-h-[44px] min-w-[44px]";
    readonly comfortable: "min-h-[48px] min-w-[48px]";
    readonly spacious: "min-h-[56px] min-w-[56px]";
};
//# sourceMappingURL=variant-system.d.ts.map
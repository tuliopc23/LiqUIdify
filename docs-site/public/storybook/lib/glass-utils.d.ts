import { ClassValue } from 'clsx';
export declare function cn(...inputs: ClassValue[]): string;
export declare const glassVariants: {
    default: string;
    hover: string;
    elevated: string;
    surface: string;
    pressed: string;
};
export declare function getGlassClass(variant?: keyof typeof glassVariants): string;
export declare const focusRing = "focus-ring";
export declare const microInteraction: {
    gentle: string;
    smooth: string;
    spring: string;
    interactive: string;
    bounce: string;
};
export declare const responsiveSize: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
};
export declare const touchTarget: {
    minimum: string;
    comfortable: string;
    spacious: string;
};
export declare const responsiveGlass: {
    mobile: string;
    tablet: string;
    desktop: string;
};
export declare const animationState: {
    idle: string;
    hover: string;
    active: string;
    loading: string;
    disabled: string;
};
//# sourceMappingURL=glass-utils.d.ts.map
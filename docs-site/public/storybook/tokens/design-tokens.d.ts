/**
 * Glass UI Design Tokens
 * Comprehensive design system tokens for consistent theming
 */
export declare const designTokens: {
    readonly spacing: {
        readonly 0: "0px";
        readonly 1: "4px";
        readonly 2: "8px";
        readonly 3: "12px";
        readonly 4: "16px";
        readonly 5: "20px";
        readonly 6: "24px";
        readonly 8: "32px";
        readonly 10: "40px";
        readonly 12: "48px";
        readonly 16: "64px";
        readonly 20: "80px";
        readonly 24: "96px";
        readonly 32: "128px";
        readonly 40: "160px";
        readonly 48: "192px";
        readonly 56: "224px";
        readonly 64: "256px";
    };
    readonly typography: {
        readonly fontFamily: {
            readonly sans: readonly ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"];
            readonly mono: readonly ["SF Mono", "Monaco", "Inconsolata", "Roboto Mono", "monospace"];
        };
        readonly fontSize: {
            readonly xs: readonly ["12px", {
                readonly lineHeight: "16px";
                readonly letterSpacing: "0.025em";
            }];
            readonly sm: readonly ["14px", {
                readonly lineHeight: "20px";
                readonly letterSpacing: "0.025em";
            }];
            readonly base: readonly ["16px", {
                readonly lineHeight: "24px";
                readonly letterSpacing: "0em";
            }];
            readonly lg: readonly ["18px", {
                readonly lineHeight: "28px";
                readonly letterSpacing: "-0.025em";
            }];
            readonly xl: readonly ["20px", {
                readonly lineHeight: "28px";
                readonly letterSpacing: "-0.025em";
            }];
            readonly '2xl': readonly ["24px", {
                readonly lineHeight: "32px";
                readonly letterSpacing: "-0.025em";
            }];
            readonly '3xl': readonly ["30px", {
                readonly lineHeight: "36px";
                readonly letterSpacing: "-0.025em";
            }];
            readonly '4xl': readonly ["36px", {
                readonly lineHeight: "40px";
                readonly letterSpacing: "-0.025em";
            }];
            readonly '5xl': readonly ["48px", {
                readonly lineHeight: "1";
                readonly letterSpacing: "-0.025em";
            }];
            readonly '6xl': readonly ["60px", {
                readonly lineHeight: "1";
                readonly letterSpacing: "-0.025em";
            }];
            readonly '7xl': readonly ["72px", {
                readonly lineHeight: "1";
                readonly letterSpacing: "-0.025em";
            }];
            readonly '8xl': readonly ["96px", {
                readonly lineHeight: "1";
                readonly letterSpacing: "-0.025em";
            }];
            readonly '9xl': readonly ["128px", {
                readonly lineHeight: "1";
                readonly letterSpacing: "-0.025em";
            }];
        };
        readonly fontWeight: {
            readonly thin: "100";
            readonly extralight: "200";
            readonly light: "300";
            readonly normal: "400";
            readonly medium: "500";
            readonly semibold: "600";
            readonly bold: "700";
            readonly extrabold: "800";
            readonly black: "900";
        };
    };
    readonly colors: {
        readonly primary: {
            readonly 50: "hsl(214, 100%, 97%)";
            readonly 100: "hsl(214, 95%, 93%)";
            readonly 200: "hsl(213, 97%, 87%)";
            readonly 300: "hsl(212, 96%, 78%)";
            readonly 400: "hsl(213, 94%, 68%)";
            readonly 500: "hsl(217, 91%, 60%)";
            readonly 600: "hsl(221, 83%, 53%)";
            readonly 700: "hsl(224, 76%, 48%)";
            readonly 800: "hsl(226, 71%, 40%)";
            readonly 900: "hsl(224, 64%, 33%)";
            readonly 950: "hsl(226, 55%, 21%)";
        };
        readonly glass: {
            readonly light: {
                readonly primary: "rgba(255, 255, 255, 0.12)";
                readonly secondary: "rgba(248, 250, 252, 0.15)";
                readonly tertiary: "rgba(241, 245, 249, 0.18)";
                readonly elevated: "rgba(255, 255, 255, 0.25)";
                readonly floating: "rgba(255, 255, 255, 0.20)";
                readonly overlay: "rgba(255, 255, 255, 0.30)";
            };
            readonly dark: {
                readonly primary: "rgba(28, 28, 30, 0.15)";
                readonly secondary: "rgba(44, 44, 46, 0.18)";
                readonly tertiary: "rgba(58, 58, 60, 0.22)";
                readonly elevated: "rgba(72, 72, 74, 0.28)";
                readonly floating: "rgba(99, 99, 102, 0.25)";
                readonly overlay: "rgba(142, 142, 147, 0.35)";
            };
            readonly states: {
                readonly hover: "rgba(255, 255, 255, 0.18)";
                readonly active: "rgba(255, 255, 255, 0.08)";
                readonly focus: "rgba(255, 255, 255, 0.22)";
                readonly pressed: "rgba(255, 255, 255, 0.06)";
            };
        };
        readonly border: {
            readonly light: {
                readonly subtle: "rgba(255, 255, 255, 0.08)";
                readonly light: "rgba(255, 255, 255, 0.15)";
                readonly medium: "rgba(255, 255, 255, 0.25)";
                readonly strong: "rgba(255, 255, 255, 0.35)";
            };
            readonly dark: {
                readonly subtle: "rgba(255, 255, 255, 0.05)";
                readonly light: "rgba(255, 255, 255, 0.10)";
                readonly medium: "rgba(255, 255, 255, 0.18)";
                readonly strong: "rgba(255, 255, 255, 0.25)";
            };
        };
    };
    readonly borderRadius: {
        readonly none: "0px";
        readonly sm: "4px";
        readonly base: "8px";
        readonly md: "12px";
        readonly lg: "16px";
        readonly xl: "20px";
        readonly '2xl': "24px";
        readonly '3xl': "32px";
        readonly full: "9999px";
    };
    readonly shadows: {
        readonly glass: {
            readonly whisper: "0 1px 2px rgba(0, 0, 0, 0.02), 0 2px 4px rgba(0, 0, 0, 0.01)";
            readonly subtle: "0 1px 3px rgba(0, 0, 0, 0.05), 0 4px 12px rgba(0, 0, 0, 0.03)";
            readonly light: "0 2px 8px rgba(0, 0, 0, 0.08), 0 8px 24px rgba(0, 0, 0, 0.06)";
            readonly medium: "0 4px 16px rgba(0, 0, 0, 0.12), 0 16px 40px rgba(0, 0, 0, 0.08)";
            readonly heavy: "0 8px 32px rgba(0, 0, 0, 0.16), 0 24px 64px rgba(0, 0, 0, 0.12)";
            readonly intense: "0 16px 48px rgba(0, 0, 0, 0.20), 0 32px 80px rgba(0, 0, 0, 0.15)";
        };
        readonly focus: {
            readonly subtle: "0 0 0 2px rgba(59, 130, 246, 0.08)";
            readonly light: "0 0 0 3px rgba(59, 130, 246, 0.12)";
            readonly medium: "0 0 0 4px rgba(59, 130, 246, 0.18)";
            readonly strong: "0 0 0 5px rgba(59, 130, 246, 0.25)";
        };
    };
    readonly backdropBlur: {
        readonly whisper: "blur(2px)";
        readonly ghost: "blur(4px)";
        readonly subtle: "blur(8px)";
        readonly light: "blur(16px)";
        readonly medium: "blur(24px)";
        readonly heavy: "blur(32px)";
        readonly intense: "blur(40px)";
        readonly extreme: "blur(56px)";
        readonly ultra: "blur(72px)";
    };
    readonly animation: {
        readonly duration: {
            readonly instant: "0.05s";
            readonly fast: "0.15s";
            readonly normal: "0.25s";
            readonly smooth: "0.35s";
            readonly slow: "0.5s";
        };
        readonly easing: {
            readonly glass: "cubic-bezier(0.4, 0, 0.2, 1)";
            readonly liquid: "cubic-bezier(0.25, 0.46, 0.45, 0.94)";
            readonly spring: "cubic-bezier(0.34, 1.56, 0.64, 1)";
            readonly magnetic: "cubic-bezier(0.2, 0, 0, 1.2)";
            readonly hover: "cubic-bezier(0.4, 0, 0.2, 1)";
        };
    };
    readonly breakpoints: {
        readonly xs: "475px";
        readonly sm: "640px";
        readonly md: "768px";
        readonly lg: "1024px";
        readonly xl: "1280px";
        readonly '2xl': "1536px";
    };
    readonly zIndex: {
        readonly hide: -1;
        readonly auto: "auto";
        readonly base: 0;
        readonly docked: 10;
        readonly dropdown: 1000;
        readonly sticky: 1100;
        readonly banner: 1200;
        readonly overlay: 1300;
        readonly modal: 1400;
        readonly popover: 1500;
        readonly skipLink: 1600;
        readonly toast: 1700;
        readonly tooltip: 1800;
    };
};
export type DesignTokens = typeof designTokens;
export type SpacingToken = keyof typeof designTokens.spacing;
export type ColorToken = keyof typeof designTokens.colors;
export type TypographyToken = keyof typeof designTokens.typography.fontSize;
export type BorderRadiusToken = keyof typeof designTokens.borderRadius;
export type ShadowToken = keyof typeof designTokens.shadows.glass;
export type AnimationDurationToken = keyof typeof designTokens.animation.duration;
export type AnimationEasingToken = keyof typeof designTokens.animation.easing;
export type BreakpointToken = keyof typeof designTokens.breakpoints;
export type ZIndexToken = keyof typeof designTokens.zIndex;
//# sourceMappingURL=design-tokens.d.ts.map
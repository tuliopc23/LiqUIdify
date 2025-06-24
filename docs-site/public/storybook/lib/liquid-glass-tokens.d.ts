/**
 * Liquid Glass Design Tokens
 * Comprehensive design system tokens for Glass UI components
 * Based on Apple's Human Interface Guidelines and modern design principles
 */
export declare const liquidGlassTokens: {
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
                readonly letterSpacing: "0.016em";
            }];
            readonly base: readonly ["16px", {
                readonly lineHeight: "24px";
                readonly letterSpacing: "0.011em";
            }];
            readonly lg: readonly ["18px", {
                readonly lineHeight: "28px";
                readonly letterSpacing: "0.007em";
            }];
            readonly xl: readonly ["20px", {
                readonly lineHeight: "32px";
                readonly letterSpacing: "0.005em";
            }];
            readonly '2xl': readonly ["24px", {
                readonly lineHeight: "36px";
                readonly letterSpacing: "0.003em";
            }];
            readonly '3xl': readonly ["30px", {
                readonly lineHeight: "40px";
                readonly letterSpacing: "0.001em";
            }];
            readonly '4xl': readonly ["36px", {
                readonly lineHeight: "48px";
                readonly letterSpacing: "-0.002em";
            }];
            readonly '5xl': readonly ["48px", {
                readonly lineHeight: "56px";
                readonly letterSpacing: "-0.004em";
            }];
            readonly '6xl': readonly ["60px", {
                readonly lineHeight: "72px";
                readonly letterSpacing: "-0.006em";
            }];
            readonly '7xl': readonly ["72px", {
                readonly lineHeight: "80px";
                readonly letterSpacing: "-0.008em";
            }];
            readonly '8xl': readonly ["96px", {
                readonly lineHeight: "104px";
                readonly letterSpacing: "-0.01em";
            }];
            readonly '9xl': readonly ["128px", {
                readonly lineHeight: "136px";
                readonly letterSpacing: "-0.012em";
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
            readonly 50: "#eff6ff";
            readonly 100: "#dbeafe";
            readonly 200: "#bfdbfe";
            readonly 300: "#93c5fd";
            readonly 400: "#60a5fa";
            readonly 500: "#3b82f6";
            readonly 600: "#2563eb";
            readonly 700: "#1d4ed8";
            readonly 800: "#1e40af";
            readonly 900: "#1e3a8a";
            readonly 950: "#172554";
        };
        readonly glass: {
            readonly white: {
                readonly subtle: "rgba(255, 255, 255, 0.05)";
                readonly light: "rgba(255, 255, 255, 0.1)";
                readonly medium: "rgba(255, 255, 255, 0.15)";
                readonly strong: "rgba(255, 255, 255, 0.25)";
                readonly intense: "rgba(255, 255, 255, 0.4)";
            };
            readonly black: {
                readonly subtle: "rgba(0, 0, 0, 0.05)";
                readonly light: "rgba(0, 0, 0, 0.1)";
                readonly medium: "rgba(0, 0, 0, 0.15)";
                readonly strong: "rgba(0, 0, 0, 0.25)";
                readonly intense: "rgba(0, 0, 0, 0.4)";
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
            readonly subtle: "0 1px 3px rgba(0, 0, 0, 0.05), 0 4px 12px rgba(0, 0, 0, 0.03)";
            readonly light: "0 2px 8px rgba(0, 0, 0, 0.08), 0 8px 24px rgba(0, 0, 0, 0.06)";
            readonly medium: "0 4px 16px rgba(0, 0, 0, 0.12), 0 16px 40px rgba(0, 0, 0, 0.08)";
            readonly heavy: "0 8px 32px rgba(0, 0, 0, 0.16), 0 24px 64px rgba(0, 0, 0, 0.12)";
            readonly intense: "0 16px 48px rgba(0, 0, 0, 0.20), 0 32px 80px rgba(0, 0, 0, 0.15)";
        };
        readonly focus: {
            readonly subtle: "0 0 0 2px rgba(59, 130, 246, 0.08)";
            readonly medium: "0 0 0 3px rgba(59, 130, 246, 0.15)";
            readonly strong: "0 0 0 4px rgba(59, 130, 246, 0.25)";
        };
    };
    readonly animation: {
        readonly duration: {
            readonly instant: "50ms";
            readonly fast: "150ms";
            readonly normal: "250ms";
            readonly smooth: "350ms";
            readonly slow: "500ms";
        };
        readonly easing: {
            readonly glass: "cubic-bezier(0.4, 0, 0.2, 1)";
            readonly liquid: "cubic-bezier(0.25, 0.46, 0.45, 0.94)";
            readonly spring: "cubic-bezier(0.34, 1.56, 0.64, 1)";
            readonly magnetic: "cubic-bezier(0.2, 0, 0, 1.2)";
            readonly bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)";
        };
    };
    readonly blur: {
        readonly whisper: "2px";
        readonly ghost: "4px";
        readonly subtle: "8px";
        readonly light: "16px";
        readonly medium: "24px";
        readonly heavy: "32px";
        readonly intense: "40px";
        readonly extreme: "56px";
        readonly ultra: "72px";
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
    readonly breakpoints: {
        readonly xs: "475px";
        readonly sm: "640px";
        readonly md: "768px";
        readonly lg: "1024px";
        readonly xl: "1280px";
        readonly '2xl': "1536px";
    };
};
export declare const glassThemes: {
    readonly light: {
        readonly background: {
            readonly primary: "rgba(255, 255, 255, 0.12)";
            readonly secondary: "rgba(248, 250, 252, 0.15)";
            readonly elevated: "rgba(255, 255, 255, 0.25)";
            readonly overlay: "rgba(255, 255, 255, 0.30)";
        };
        readonly border: {
            readonly subtle: "rgba(255, 255, 255, 0.08)";
            readonly light: "rgba(255, 255, 255, 0.15)";
            readonly medium: "rgba(255, 255, 255, 0.25)";
            readonly strong: "rgba(255, 255, 255, 0.35)";
        };
        readonly text: {
            readonly primary: "rgba(0, 0, 0, 0.9)";
            readonly secondary: "rgba(0, 0, 0, 0.7)";
            readonly tertiary: "rgba(0, 0, 0, 0.5)";
            readonly quaternary: "rgba(0, 0, 0, 0.3)";
        };
    };
    readonly dark: {
        readonly background: {
            readonly primary: "rgba(28, 28, 30, 0.15)";
            readonly secondary: "rgba(44, 44, 46, 0.18)";
            readonly elevated: "rgba(58, 58, 60, 0.25)";
            readonly overlay: "rgba(72, 72, 74, 0.30)";
        };
        readonly border: {
            readonly subtle: "rgba(255, 255, 255, 0.06)";
            readonly light: "rgba(255, 255, 255, 0.12)";
            readonly medium: "rgba(255, 255, 255, 0.18)";
            readonly strong: "rgba(255, 255, 255, 0.25)";
        };
        readonly text: {
            readonly primary: "rgba(255, 255, 255, 0.95)";
            readonly secondary: "rgba(255, 255, 255, 0.8)";
            readonly tertiary: "rgba(255, 255, 255, 0.6)";
            readonly quaternary: "rgba(255, 255, 255, 0.4)";
        };
    };
};
export declare const componentTokens: {
    readonly button: {
        readonly height: {
            readonly xs: "28px";
            readonly sm: "32px";
            readonly md: "40px";
            readonly lg: "44px";
            readonly xl: "52px";
        };
        readonly padding: {
            readonly xs: "8px 10px";
            readonly sm: "10px 12px";
            readonly md: "12px 16px";
            readonly lg: "14px 20px";
            readonly xl: "16px 24px";
        };
    };
    readonly input: {
        readonly height: {
            readonly sm: "32px";
            readonly md: "40px";
            readonly lg: "44px";
        };
        readonly padding: {
            readonly sm: "8px 12px";
            readonly md: "10px 14px";
            readonly lg: "12px 16px";
        };
    };
    readonly card: {
        readonly padding: {
            readonly sm: "16px";
            readonly md: "20px";
            readonly lg: "24px";
            readonly xl: "32px";
        };
    };
};
export declare const getToken: (path: string) => any;
export declare const getThemeToken: (theme: "light" | "dark", path: string) => any;
export declare const generateCSSCustomProperties: (theme?: "light" | "dark") => Record<string, string>;
export type LiquidGlassTokens = typeof liquidGlassTokens;
export type GlassThemes = typeof glassThemes;
export type ComponentTokens = typeof componentTokens;
export type ThemeMode = keyof typeof glassThemes;
//# sourceMappingURL=liquid-glass-tokens.d.ts.map
/**
 * Liquid Glass Design Tokens
 * Core design system tokens for the Glass UI library
 */

export const liquidGlassTokens = {
  // Color tokens
  colors: {
    glass: {
      light: {
        primary: "rgba(255, 255, 255, 0.12)",
        secondary: "rgba(248, 250, 252, 0.15)",
        tertiary: "rgba(241, 245, 249, 0.18)",
        elevated: "rgba(255, 255, 255, 0.25)",
        floating: "rgba(255, 255, 255, 0.20)",
        overlay: "rgba(255, 255, 255, 0.30)",
        hover: "rgba(255, 255, 255, 0.18)",
        active: "rgba(255, 255, 255, 0.08)",
        focus: "rgba(255, 255, 255, 0.22)",
        pressed: "rgba(255, 255, 255, 0.06)",
      },
      dark: {
        primary: "rgba(28, 28, 30, 0.15)",
        secondary: "rgba(44, 44, 46, 0.18)",
        tertiary: "rgba(58, 58, 60, 0.22)",
        elevated: "rgba(72, 72, 74, 0.28)",
        floating: "rgba(44, 44, 46, 0.25)",
        overlay: "rgba(28, 28, 30, 0.35)",
        hover: "rgba(72, 72, 74, 0.25)",
        active: "rgba(28, 28, 30, 0.12)",
        focus: "rgba(72, 72, 74, 0.30)",
        pressed: "rgba(28, 28, 30, 0.08)",
      }
    },
    border: {
      light: {
        subtle: "rgba(255, 255, 255, 0.08)",
        light: "rgba(255, 255, 255, 0.15)",
        medium: "rgba(255, 255, 255, 0.25)",
        strong: "rgba(255, 255, 255, 0.35)",
        focus: "rgba(59, 130, 246, 0.40)",
        hover: "rgba(255, 255, 255, 0.30)",
      },
      dark: {
        subtle: "rgba(255, 255, 255, 0.06)",
        light: "rgba(255, 255, 255, 0.12)",
        medium: "rgba(255, 255, 255, 0.18)",
        strong: "rgba(255, 255, 255, 0.25)",
        focus: "rgba(59, 130, 246, 0.50)",
        hover: "rgba(255, 255, 255, 0.22)",
      }
    }
  },

  // Blur tokens
  blur: {
    whisper: "2px",
    ghost: "4px", 
    subtle: "8px",
    light: "16px",
    medium: "24px",
    heavy: "32px",
    intense: "40px",
    extreme: "56px",
    ultra: "72px"
  },

  // Saturation tokens
  saturation: {
    muted: "80%",
    normal: "120%",
    enhanced: "150%",
    vivid: "180%",
    intense: "200%"
  },

  // Brightness tokens
  brightness: {
    dim: "85%",
    normal: "100%",
    bright: "115%",
    brilliant: "130%"
  },

  // Contrast tokens
  contrast: {
    soft: "95%",
    normal: "100%",
    sharp: "110%",
    crisp: "125%"
  },

  // Shadow tokens
  shadows: {
    glass: {
      whisper: "0 1px 2px rgba(0, 0, 0, 0.02), 0 2px 4px rgba(0, 0, 0, 0.01)",
      subtle: "0 1px 3px rgba(0, 0, 0, 0.05), 0 4px 12px rgba(0, 0, 0, 0.03)",
      light: "0 2px 8px rgba(0, 0, 0, 0.08), 0 8px 24px rgba(0, 0, 0, 0.06)",
      medium: "0 4px 16px rgba(0, 0, 0, 0.12), 0 16px 40px rgba(0, 0, 0, 0.08)",
      heavy: "0 8px 32px rgba(0, 0, 0, 0.16), 0 24px 64px rgba(0, 0, 0, 0.12)",
      intense: "0 16px 48px rgba(0, 0, 0, 0.20), 0 32px 80px rgba(0, 0, 0, 0.15)",
      extreme: "0 24px 64px rgba(0, 0, 0, 0.25), 0 48px 120px rgba(0, 0, 0, 0.20)"
    },
    focus: {
      subtle: "0 0 0 2px rgba(59, 130, 246, 0.08)",
      light: "0 0 0 3px rgba(59, 130, 246, 0.12)",
      medium: "0 0 0 4px rgba(59, 130, 246, 0.18)",
      strong: "0 0 0 5px rgba(59, 130, 246, 0.25)"
    },
    glow: {
      subtle: "0 0 20px rgba(59, 130, 246, 0.08)",
      light: "0 0 30px rgba(59, 130, 246, 0.12)",
      medium: "0 0 40px rgba(59, 130, 246, 0.15)",
      intense: "0 0 60px rgba(59, 130, 246, 0.20)"
    }
  },

  // Timing tokens
  timing: {
    instant: "0.05s",
    fast: "0.15s",
    normal: "0.25s",
    smooth: "0.35s",
    slow: "0.5s"
  },

  // Easing tokens
  easing: {
    glass: "cubic-bezier(0.4, 0, 0.2, 1)",
    liquid: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    magnetic: "cubic-bezier(0.2, 0, 0, 1.2)",
    hover: "cubic-bezier(0.4, 0, 0.2, 1)"
  },

  // Radius tokens
  radius: {
    sm: "4px",
    md: "8px", 
    lg: "12px",
    xl: "16px",
    "2xl": "20px",
    "3xl": "24px",
    full: "9999px"
  },

  // Spacing tokens
  spacing: {
    xs: "0.5rem",
    sm: "0.75rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    "2xl": "3rem",
    "3xl": "4rem"
  }
};

// Semantic color tokens
export const semanticTokens = {
  accent: "rgba(59, 130, 246, 0.08)",
  success: "rgba(34, 197, 94, 0.08)",
  warning: "rgba(251, 191, 36, 0.08)",
  error: "rgba(239, 68, 68, 0.08)",
  info: "rgba(14, 165, 233, 0.08)"
};

// Brand color tokens
export const brandTokens = {
  brand: "rgba(99, 102, 241, 0.10)",
  premium: "rgba(147, 51, 234, 0.08)",
  luxury: "rgba(236, 72, 153, 0.08)"
};

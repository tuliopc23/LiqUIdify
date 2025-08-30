/**
 * Apple HIG Color System
 * Comprehensive color tokens following Apple's Human Interface Guidelines
 */

// iOS System Colors (Light Mode)
export const iOS_SYSTEM_COLORS = {
  blue: "#007AFF",
  green: "#34C759",
  indigo: "#5856D6",
  orange: "#FF9500",
  pink: "#FF2D92",
  purple: "#AF52DE",
  red: "#FF3B30",
  teal: "#5AC8FA",
  yellow: "#FFCC00",
  brown: "#A2845E",
  gray: "#8E8E93",
  gray2: "#AEAEB2",
  gray3: "#C7C7CC",
  gray4: "#D1D1D6",
  gray5: "#E5E5EA",
  gray6: "#F2F2F7",
};

// iOS System Colors (Dark Mode)
export const iOS_SYSTEM_COLORS_DARK = {
  blue: "#0A84FF",
  green: "#30D158",
  indigo: "#5E5CE6",
  orange: "#FF9F0A",
  pink: "#FF375F",
  purple: "#BF5AF2",
  red: "#FF453A",
  teal: "#64D2FF",
  yellow: "#FFD60A",
  brown: "#AC8E68",
  gray: "#8E8E93",
  gray2: "#636366",
  gray3: "#48484A",
  gray4: "#3A3A3C",
  gray5: "#2C2C2E",
  gray6: "#1C1C1E",
};

// Apple HIG Semantic Colors
export const APPLE_SEMANTIC_COLORS = {
  // Label Colors
  label: {
    primary: "#000000",
    secondary: "#3C3C43",
    tertiary: "#3C3C43",
    quaternary: "#3C3C43",
  },
  labelDark: {
    primary: "#FFFFFF",
    secondary: "#EBEBF5",
    tertiary: "#EBEBF5",
    quaternary: "#EBEBF5",
  },

  // Fill Colors
  fill: {
    primary: "#78788033",
    secondary: "#78788028",
    tertiary: "#7676801E",
    quaternary: "#74748014",
  },
  fillDark: {
    primary: "#78788052",
    secondary: "#78788047",
    tertiary: "#7676803D",
    quaternary: "#74748033",
  },

  // Background Colors
  background: {
    primary: "#FFFFFF",
    secondary: "#F2F2F7",
    tertiary: "#FFFFFF",
  },
  backgroundDark: {
    primary: "#000000",
    secondary: "#1C1C1E",
    tertiary: "#2C2C2E",
  },

  // Grouped Background Colors
  groupedBackground: {
    primary: "#F2F2F7",
    secondary: "#FFFFFF",
    tertiary: "#F2F2F7",
  },
  groupedBackgroundDark: {
    primary: "#000000",
    secondary: "#1C1C1E",
    tertiary: "#2C2C2E",
  },

  // Separator Colors
  separator: {
    opaque: "#C6C6C8",
    nonOpaque: "#3C3C4336",
  },
  separatorDark: {
    opaque: "#38383A",
    nonOpaque: "#54545899",
  },
};

// macOS System Colors
export const MACOS_SYSTEM_COLORS = {
  blue: "#007AFF",
  brown: "#8E6C42",
  cyan: "#55BEF0",
  green: "#28CD41",
  indigo: "#4B0082",
  mint: "#00C7BE",
  orange: "#FF8C00",
  pink: "#FF69B4",
  purple: "#AF52DE",
  red: "#FF3B30",
  teal: "#5AC8FA",
  yellow: "#FFD60A",
};

// Liquid Glass Color System (Extended Apple Colors)
export const LIQUID_GLASS_COLORS = {
  // Primary Liquid Colors with transparency
  liquidBlue: "rgba(0, 122, 255, 0.8)",
  liquidGreen: "rgba(52, 199, 89, 0.8)",
  liquidPurple: "rgba(175, 82, 222, 0.8)",
  liquidOrange: "rgba(255, 149, 0, 0.8)",
  liquidRed: "rgba(255, 59, 48, 0.8)",
  liquidTeal: "rgba(90, 200, 250, 0.8)",

  // Glass Surface Colors
  glassSurface: {
    light: "rgba(255, 255, 255, 0.8)",
    medium: "rgba(255, 255, 255, 0.6)",
    heavy: "rgba(255, 255, 255, 0.9)",
    ultraThin: "rgba(255, 255, 255, 0.3)",
  },
  glassSurfaceDark: {
    light: "rgba(0, 0, 0, 0.8)",
    medium: "rgba(0, 0, 0, 0.6)",
    heavy: "rgba(0, 0, 0, 0.9)",
    ultraThin: "rgba(0, 0, 0, 0.3)",
  },

  // Border Colors for Glass
  glassBorder: {
    light: "rgba(255, 255, 255, 0.2)",
    medium: "rgba(255, 255, 255, 0.3)",
    heavy: "rgba(255, 255, 255, 0.5)",
  },
  glassBorderDark: {
    light: "rgba(255, 255, 255, 0.1)",
    medium: "rgba(255, 255, 255, 0.2)",
    heavy: "rgba(255, 255, 255, 0.3)",
  },
};

// CSS Custom Properties Generator
export const generateAppleCSS = () => `
  :root {
    /* iOS System Colors */
    --ios-blue: ${iOS_SYSTEM_COLORS.blue};
    --ios-green: ${iOS_SYSTEM_COLORS.green};
    --ios-indigo: ${iOS_SYSTEM_COLORS.indigo};
    --ios-orange: ${iOS_SYSTEM_COLORS.orange};
    --ios-pink: ${iOS_SYSTEM_COLORS.pink};
    --ios-purple: ${iOS_SYSTEM_COLORS.purple};
    --ios-red: ${iOS_SYSTEM_COLORS.red};
    --ios-teal: ${iOS_SYSTEM_COLORS.teal};
    --ios-yellow: ${iOS_SYSTEM_COLORS.yellow};
    --ios-brown: ${iOS_SYSTEM_COLORS.brown};
    --ios-gray: ${iOS_SYSTEM_COLORS.gray};
    --ios-gray-2: ${iOS_SYSTEM_COLORS.gray2};
    --ios-gray-3: ${iOS_SYSTEM_COLORS.gray3};
    --ios-gray-4: ${iOS_SYSTEM_COLORS.gray4};
    --ios-gray-5: ${iOS_SYSTEM_COLORS.gray5};
    --ios-gray-6: ${iOS_SYSTEM_COLORS.gray6};
    
    /* Semantic Colors */
    --apple-label-primary: ${APPLE_SEMANTIC_COLORS.label.primary};
    --apple-label-secondary: ${APPLE_SEMANTIC_COLORS.label.secondary};
    --apple-label-tertiary: ${APPLE_SEMANTIC_COLORS.label.tertiary};
    --apple-background-primary: ${APPLE_SEMANTIC_COLORS.background.primary};
    --apple-background-secondary: ${APPLE_SEMANTIC_COLORS.background.secondary};
    --apple-separator: ${APPLE_SEMANTIC_COLORS.separator.opaque};
    
    /* Liquid Glass Colors */
    --liquid-blue: ${LIQUID_GLASS_COLORS.liquidBlue};
    --liquid-green: ${LIQUID_GLASS_COLORS.liquidGreen};
    --liquid-purple: ${LIQUID_GLASS_COLORS.liquidPurple};
    --liquid-surface-light: ${LIQUID_GLASS_COLORS.glassSurface.light};
    --liquid-surface-medium: ${LIQUID_GLASS_COLORS.glassSurface.medium};
    --liquid-surface-heavy: ${LIQUID_GLASS_COLORS.glassSurface.heavy};
    --liquid-border-light: ${LIQUID_GLASS_COLORS.glassBorder.light};
    --liquid-border-medium: ${LIQUID_GLASS_COLORS.glassBorder.medium};
    
    /* Glass Effects */
    --glass-blur: 20px;
    --glass-opacity: 0.8;
    --glass-border-width: 1px;
    --glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }
  
  @media (prefers-color-scheme: dark) {
    :root {
      /* iOS System Colors (Dark) */
      --ios-blue: ${iOS_SYSTEM_COLORS_DARK.blue};
      --ios-green: ${iOS_SYSTEM_COLORS_DARK.green};
      --ios-indigo: ${iOS_SYSTEM_COLORS_DARK.indigo};
      --ios-orange: ${iOS_SYSTEM_COLORS_DARK.orange};
      --ios-pink: ${iOS_SYSTEM_COLORS_DARK.pink};
      --ios-purple: ${iOS_SYSTEM_COLORS_DARK.purple};
      --ios-red: ${iOS_SYSTEM_COLORS_DARK.red};
      --ios-teal: ${iOS_SYSTEM_COLORS_DARK.teal};
      --ios-yellow: ${iOS_SYSTEM_COLORS_DARK.yellow};
      --ios-brown: ${iOS_SYSTEM_COLORS_DARK.brown};
      --ios-gray: ${iOS_SYSTEM_COLORS_DARK.gray};
      --ios-gray-2: ${iOS_SYSTEM_COLORS_DARK.gray2};
      --ios-gray-3: ${iOS_SYSTEM_COLORS_DARK.gray3};
      --ios-gray-4: ${iOS_SYSTEM_COLORS_DARK.gray4};
      --ios-gray-5: ${iOS_SYSTEM_COLORS_DARK.gray5};
      --ios-gray-6: ${iOS_SYSTEM_COLORS_DARK.gray6};
      
      /* Semantic Colors (Dark) */
      --apple-label-primary: ${APPLE_SEMANTIC_COLORS.labelDark.primary};
      --apple-label-secondary: ${APPLE_SEMANTIC_COLORS.labelDark.secondary};
      --apple-label-tertiary: ${APPLE_SEMANTIC_COLORS.labelDark.tertiary};
      --apple-background-primary: ${APPLE_SEMANTIC_COLORS.backgroundDark.primary};
      --apple-background-secondary: ${APPLE_SEMANTIC_COLORS.backgroundDark.secondary};
      --apple-separator: ${APPLE_SEMANTIC_COLORS.separatorDark.opaque};
      
      /* Liquid Glass Colors (Dark) */
      --liquid-surface-light: ${LIQUID_GLASS_COLORS.glassSurfaceDark.light};
      --liquid-surface-medium: ${LIQUID_GLASS_COLORS.glassSurfaceDark.medium};
      --liquid-surface-heavy: ${LIQUID_GLASS_COLORS.glassSurfaceDark.heavy};
      --liquid-border-light: ${LIQUID_GLASS_COLORS.glassBorderDark.light};
      --liquid-border-medium: ${LIQUID_GLASS_COLORS.glassBorderDark.medium};
      
      /* Glass Effects (Dark) */
      --glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    }
  }
  
  /* Apple Typography Scale */
  .text-large-title { font-size: 34px; font-weight: 400; line-height: 1.12; }
  .text-title-1 { font-size: 28px; font-weight: 400; line-height: 1.14; }
  .text-title-2 { font-size: 22px; font-weight: 400; line-height: 1.18; }
  .text-title-3 { font-size: 20px; font-weight: 400; line-height: 1.2; }
  .text-headline { font-size: 17px; font-weight: 600; line-height: 1.29; }
  .text-body { font-size: 17px; font-weight: 400; line-height: 1.29; }
  .text-callout { font-size: 16px; font-weight: 400; line-height: 1.31; }
  .text-subhead { font-size: 15px; font-weight: 400; line-height: 1.33; }
  .text-footnote { font-size: 13px; font-weight: 400; line-height: 1.38; }
  .text-caption-1 { font-size: 12px; font-weight: 400; line-height: 1.33; }
  .text-caption-2 { font-size: 11px; font-weight: 400; line-height: 1.36; }
  
  /* Glass Effect Utilities */
  .glass-surface {
    background: var(--liquid-surface-medium);
    backdrop-filter: blur(var(--glass-blur));
    border: var(--glass-border-width) solid var(--liquid-border-light);
    box-shadow: var(--glass-shadow);
  }
  
  .glass-elevated {
    background: var(--liquid-surface-light);
    backdrop-filter: blur(var(--glass-blur));
    border: var(--glass-border-width) solid var(--liquid-border-medium);
    box-shadow: var(--glass-shadow), 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  
  .glass-heavy {
    background: var(--liquid-surface-heavy);
    backdrop-filter: blur(calc(var(--glass-blur) * 1.5));
    border: var(--glass-border-width) solid var(--liquid-border-medium);
    box-shadow: var(--glass-shadow), 0 4px 16px rgba(0, 0, 0, 0.15);
  }
`;

export default {
  iOS_SYSTEM_COLORS,
  iOS_SYSTEM_COLORS_DARK,
  APPLE_SEMANTIC_COLORS,
  MACOS_SYSTEM_COLORS,
  LIQUID_GLASS_COLORS,
  generateAppleCSS,
};

import { defineRecipe, defineSlotRecipe } from "@pandacss/dev";

// Base liquid glass styles that all components inherit
const baseLiquidGlass = {
  position: "relative",
  overflow: "hidden",
  background: "token(colors.glass.bg)",
  backdropFilter: "blur(token(blurs.glass.md))",
  border: "1px solid token(colors.glass.border)",
  boxShadow: "token(shadows.glass.base)",
  borderRadius: "token(radii.md)",
  transition: "all token(durations.glass.flow) token(easings.glass.flow)",
  transformOrigin: "center center",

  _before: {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: "inherit",
    background: "token(colors.glass.gradients.before)",
    pointerEvents: "none",
    zIndex: 1,
  },
  _after: {
    content: '""',
    position: "absolute",
    top: "2px",
    left: "2px",
    right: "2px",
    bottom: "2px",
    borderRadius: "inherit",
    background: "token(colors.glass.gradients.after)",
    pointerEvents: "none",
    zIndex: 0,
  },

  _hover: {
    transform: "translateY(-1px)",
    boxShadow: "token(shadows.glass.hover)",
  },
} as const;

// Content styles for text inside glass components
const glassContent = {
  position: "relative",
  zIndex: 2,
  color: "token(colors.text.glass.primary)",
} as const;

// Interactive glass styles for clickable elements
const interactiveGlass = {
  ...baseLiquidGlass,
  cursor: "pointer",
  userSelect: "none",

  _active: {
    transform: "translateY(1px) scale(0.98)",
    transition: "all token(durations.glass.instant) token(easings.glass.flow)",
  },

  _disabled: {
    opacity: 0.5,
    cursor: "not-allowed",
    pointerEvents: "none",
  },
} as const;

//=============================================================================
// SINGLE COMPONENT RECIPES (Non-compound components)
//=============================================================================

export const avatarRecipe = defineRecipe({
  className: "avatar",
  description: "Liquid glass avatar component",
  jsx: ["Avatar"],
  base: {
    ...baseLiquidGlass,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "token(radii.full)",
    overflow: "hidden",
  },
  variants: {
    size: {
      sm: { width: "32px", height: "32px", fontSize: "14px" },
      md: { width: "40px", height: "40px", fontSize: "16px" },
      lg: { width: "48px", height: "48px", fontSize: "18px" },
      xl: { width: "56px", height: "56px", fontSize: "20px" },
    },
  },
  defaultVariants: { size: "md" },
});

export const checkboxRecipe = defineRecipe({
  className: "checkbox",
  description: "Liquid glass checkbox component",
  jsx: ["Checkbox"],
  base: {
    ...interactiveGlass,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "20px",
    height: "20px",
    borderRadius: "token(radii.sm)",
  },
  variants: {
    size: {
      sm: { width: "16px", height: "16px" },
      md: { width: "20px", height: "20px" },
      lg: { width: "24px", height: "24px" },
    },
  },
  defaultVariants: { size: "md" },
});

export const switchRecipe = defineRecipe({
  className: "switch",
  description: "Liquid glass switch component",
  jsx: ["Switch"],
  base: {
    ...interactiveGlass,
    display: "inline-flex",
    alignItems: "center",
    width: "44px",
    height: "24px",
    borderRadius: "token(radii.full)",
    padding: "2px",
  },
  variants: {
    size: {
      sm: { width: "36px", height: "20px" },
      md: { width: "44px", height: "24px" },
      lg: { width: "52px", height: "28px" },
    },
  },
  defaultVariants: { size: "md" },
});

export const sliderRecipe = defineRecipe({
  className: "slider",
  description: "Liquid glass slider component",
  jsx: ["Slider"],
  base: {
    ...baseLiquidGlass,
    width: "100%",
    height: "6px",
    borderRadius: "token(radii.full)",
  },
  variants: {
    size: {
      sm: { height: "4px" },
      md: { height: "6px" },
      lg: { height: "8px" },
    },
  },
  defaultVariants: { size: "md" },
});

export const progressRecipe = defineRecipe({
  className: "progress",
  description: "Liquid glass progress component",
  jsx: ["Progress"],
  base: {
    ...baseLiquidGlass,
    width: "100%",
    height: "8px",
    borderRadius: "token(radii.full)",
    overflow: "hidden",
  },
  variants: {
    size: {
      sm: { height: "6px" },
      md: { height: "8px" },
      lg: { height: "12px" },
    },
  },
  defaultVariants: { size: "md" },
});

//=============================================================================
// SLOT RECIPES (Multi-part components)
//=============================================================================

export const dialogRecipe = defineSlotRecipe({
  className: "dialog",
  description: "Liquid glass dialog component",
  jsx: ["Dialog"],
  slots: ["backdrop", "positioner", "content", "title", "description", "trigger", "closeTrigger"],
  base: {
    backdrop: {
      position: "fixed",
      inset: 0,
      zIndex: 50,
      background: "rgba(0, 0, 0, 0.5)",
      backdropFilter: "blur(4px)",
    },
    positioner: {
      position: "fixed",
      inset: 0,
      zIndex: 50,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "token(spacing.glass.lg)",
    },
    content: {
      ...baseLiquidGlass,
      maxWidth: "500px",
      width: "100%",
      maxHeight: "90vh",
      padding: "token(spacing.glass.2xl)",
      display: "flex",
      flexDirection: "column",
      gap: "token(spacing.glass.lg)",
    },
    title: {
      ...glassContent,
      fontSize: "20px",
      fontWeight: 600,
      lineHeight: 1.2,
    },
    description: {
      ...glassContent,
      fontSize: "16px",
      color: "token(colors.text.glass.secondary)",
      lineHeight: 1.5,
    },
    trigger: {
      ...interactiveGlass,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "token(spacing.glass.md) token(spacing.glass.lg)",
    },
    closeTrigger: {
      ...interactiveGlass,
      position: "absolute",
      top: "token(spacing.glass.md)",
      right: "token(spacing.glass.md)",
      width: "32px",
      height: "32px",
      borderRadius: "token(radii.sm)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  variants: {
    size: {
      sm: {
        content: { maxWidth: "400px", padding: "token(spacing.glass.lg)" },
      },
      md: {
        content: { maxWidth: "500px", padding: "token(spacing.glass.2xl)" },
      },
      lg: {
        content: { maxWidth: "700px", padding: "token(spacing.glass.3xl)" },
      },
    },
  },
  defaultVariants: { size: "md" },
});

export const accordionRecipe = defineSlotRecipe({
  className: "accordion",
  description: "Liquid glass accordion component",
  jsx: ["Accordion"],
  slots: ["root", "item", "itemTrigger", "itemContent", "itemIndicator"],
  base: {
    root: {
      ...baseLiquidGlass,
      width: "100%",
      overflow: "hidden",
    },
    item: {
      borderBottom: "1px solid token(colors.glass.border)",
      "&:last-child": {
        borderBottom: "none",
      },
    },
    itemTrigger: {
      ...interactiveGlass,
      width: "100%",
      padding: "token(spacing.glass.lg) token(spacing.glass.xl)",
      background: "transparent",
      border: "none",
      textAlign: "left",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      fontSize: "16px",
      fontWeight: 500,
    },
    itemContent: {
      ...glassContent,
      padding: "0 token(spacing.glass.xl) token(spacing.glass.lg)",
      fontSize: "16px",
      lineHeight: 1.6,
    },
    itemIndicator: {
      ...glassContent,
      transition: "transform token(durations.glass.quick)",
      "&[data-state=open]": {
        transform: "rotate(180deg)",
      },
    },
  },
  variants: {
    size: {
      sm: {
        itemTrigger: {
          padding: "token(spacing.glass.md) token(spacing.glass.lg)",
          fontSize: "14px",
        },
        itemContent: {
          padding: "0 token(spacing.glass.lg) token(spacing.glass.md)",
          fontSize: "14px",
        },
      },
      md: {
        itemTrigger: {
          padding: "token(spacing.glass.lg) token(spacing.glass.xl)",
          fontSize: "16px",
        },
        itemContent: {
          padding: "0 token(spacing.glass.xl) token(spacing.glass.lg)",
          fontSize: "16px",
        },
      },
      lg: {
        itemTrigger: {
          padding: "token(spacing.glass.xl) token(spacing.glass.2xl)",
          fontSize: "18px",
        },
        itemContent: {
          padding: "0 token(spacing.glass.2xl) token(spacing.glass.xl)",
          fontSize: "18px",
        },
      },
    },
  },
  defaultVariants: { size: "md" },
});

export const menuRecipe = defineSlotRecipe({
  className: "menu",
  description: "Liquid glass menu component",
  jsx: ["Menu"],
  slots: ["trigger", "positioner", "content", "item", "itemText", "separator", "itemIndicator"],
  base: {
    trigger: {
      ...interactiveGlass,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "token(spacing.glass.sm)",
      padding: "token(spacing.glass.md) token(spacing.glass.lg)",
    },
    positioner: {
      zIndex: 50,
    },
    content: {
      ...baseLiquidGlass,
      minWidth: "200px",
      padding: "token(spacing.glass.sm)",
      zIndex: 50,
    },
    item: {
      ...interactiveGlass,
      display: "flex",
      alignItems: "center",
      gap: "token(spacing.glass.sm)",
      padding: "token(spacing.glass.md) token(spacing.glass.lg)",
      borderRadius: "token(radii.sm)",
      fontSize: "14px",
      border: "none",
      background: "transparent",
      width: "100%",
      textAlign: "left",

      "&[data-highlighted]": {
        background: "token(colors.glass.subtle.bg)",
      },
    },
    itemText: {
      ...glassContent,
    },
    separator: {
      height: "1px",
      background: "token(colors.glass.border)",
      margin: "token(spacing.glass.sm) 0",
    },
    itemIndicator: {
      ...glassContent,
      marginLeft: "auto",
    },
  },
  variants: {
    size: {
      sm: {
        content: { minWidth: "160px", padding: "token(spacing.glass.xs)" },
        item: { padding: "token(spacing.glass.sm) token(spacing.glass.md)", fontSize: "12px" },
      },
      md: {
        content: { minWidth: "200px", padding: "token(spacing.glass.sm)" },
        item: { padding: "token(spacing.glass.md) token(spacing.glass.lg)", fontSize: "14px" },
      },
      lg: {
        content: { minWidth: "240px", padding: "token(spacing.glass.md)" },
        item: { padding: "token(spacing.glass.lg) token(spacing.glass.xl)", fontSize: "16px" },
      },
    },
  },
  defaultVariants: { size: "md" },
});

export const selectRecipe = defineSlotRecipe({
  className: "select",
  description: "Liquid glass select component",
  jsx: ["Select"],
  slots: ["trigger", "content", "item", "itemText", "positioner", "indicator", "clearTrigger"],
  base: {
    trigger: {
      ...interactiveGlass,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "token(spacing.glass.sm)",
      padding: "token(spacing.glass.md) token(spacing.glass.lg)",
      minHeight: "44px",
      width: "100%",
      textAlign: "left",
    },
    positioner: {
      zIndex: 50,
    },
    content: {
      ...baseLiquidGlass,
      minWidth: "var(--reference-width)",
      maxHeight: "300px",
      overflowY: "auto",
      padding: "token(spacing.glass.sm)",
      zIndex: 50,
    },
    item: {
      ...interactiveGlass,
      display: "flex",
      alignItems: "center",
      gap: "token(spacing.glass.sm)",
      padding: "token(spacing.glass.md) token(spacing.glass.lg)",
      borderRadius: "token(radii.sm)",
      fontSize: "14px",
      border: "none",
      background: "transparent",
      width: "100%",
      textAlign: "left",

      "&[data-highlighted]": {
        background: "token(colors.glass.subtle.bg)",
      },
      "&[data-state=checked]": {
        background: "token(colors.glass.medium.bg)",
      },
    },
    itemText: {
      ...glassContent,
    },
    indicator: {
      ...glassContent,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    clearTrigger: {
      ...interactiveGlass,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "24px",
      height: "24px",
      borderRadius: "token(radii.sm)",
    },
  },
  variants: {
    size: {
      sm: {
        trigger: {
          padding: "token(spacing.glass.sm) token(spacing.glass.md)",
          minHeight: "36px",
          fontSize: "14px",
        },
        item: { padding: "token(spacing.glass.sm) token(spacing.glass.md)", fontSize: "12px" },
      },
      md: {
        trigger: {
          padding: "token(spacing.glass.md) token(spacing.glass.lg)",
          minHeight: "44px",
          fontSize: "16px",
        },
        item: { padding: "token(spacing.glass.md) token(spacing.glass.lg)", fontSize: "14px" },
      },
      lg: {
        trigger: {
          padding: "token(spacing.glass.lg) token(spacing.glass.xl)",
          minHeight: "52px",
          fontSize: "18px",
        },
        item: { padding: "token(spacing.glass.lg) token(spacing.glass.xl)", fontSize: "16px" },
      },
    },
  },
  defaultVariants: { size: "md" },
});

export const tabsRecipe = defineSlotRecipe({
  className: "tabs",
  description: "Liquid glass tabs component",
  jsx: ["Tabs"],
  slots: ["root", "list", "trigger", "content", "indicator"],
  base: {
    root: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
    },
    list: {
      ...baseLiquidGlass,
      display: "flex",
      alignItems: "center",
      padding: "token(spacing.glass.xs)",
      gap: "token(spacing.glass.xs)",
    },
    trigger: {
      ...interactiveGlass,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "token(spacing.glass.md) token(spacing.glass.lg)",
      border: "none",
      background: "transparent",
      borderRadius: "token(radii.sm)",
      fontSize: "14px",
      fontWeight: 500,
      transition: "all token(durations.glass.quick) token(easings.glass.flow)",

      "&[data-state=active]": {
        background: "token(colors.glass.medium.bg)",
        color: "token(colors.text.glass.primary)",
      },
    },
    content: {
      ...glassContent,
      padding: "token(spacing.glass.lg) 0",
      outline: "none",
    },
    indicator: {
      position: "absolute",
      background: "token(colors.glass.medium.bg)",
      borderRadius: "token(radii.sm)",
      transition: "all token(durations.glass.quick) token(easings.glass.flow)",
    },
  },
  variants: {
    size: {
      sm: {
        trigger: { padding: "token(spacing.glass.sm) token(spacing.glass.md)", fontSize: "12px" },
        content: { padding: "token(spacing.glass.md) 0" },
      },
      md: {
        trigger: { padding: "token(spacing.glass.md) token(spacing.glass.lg)", fontSize: "14px" },
        content: { padding: "token(spacing.glass.lg) 0" },
      },
      lg: {
        trigger: { padding: "token(spacing.glass.lg) token(spacing.glass.xl)", fontSize: "16px" },
        content: { padding: "token(spacing.glass.xl) 0" },
      },
    },
    variant: {
      line: {
        list: {
          background: "transparent",
          borderBottom: "1px solid token(colors.glass.border)",
          borderRadius: "0",
        },
        trigger: {
          borderRadius: "0",
          borderBottom: "2px solid transparent",
          "&[data-state=active]": {
            background: "transparent",
            borderBottomColor: "token(colors.accent.primary)",
          },
        },
      },
      enclosed: {
        list: {
          background: "token(colors.glass.bg)",
        },
      },
    },
  },
  defaultVariants: { size: "md", variant: "enclosed" },
});

export const tooltipRecipe = defineSlotRecipe({
  className: "tooltip",
  description: "Liquid glass tooltip component",
  jsx: ["Tooltip"],
  slots: ["trigger", "positioner", "content", "arrow", "arrowTip"],
  base: {
    trigger: {
      display: "inline-flex",
    },
    positioner: {
      zIndex: 50,
    },
    content: {
      ...baseLiquidGlass,
      padding: "token(spacing.glass.sm) token(spacing.glass.md)",
      fontSize: "14px",
      maxWidth: "300px",
      zIndex: 50,
      borderRadius: "token(radii.sm)",
    },
    arrow: {
      "--arrow-size": "8px",
      "--arrow-background": "token(colors.glass.bg)",
    },
    arrowTip: {
      borderTopColor: "token(colors.glass.border)",
      borderLeftColor: "transparent",
      borderRightColor: "transparent",
    },
  },
  variants: {
    size: {
      sm: {
        content: { padding: "token(spacing.glass.xs) token(spacing.glass.sm)", fontSize: "12px" },
      },
      md: {
        content: { padding: "token(spacing.glass.sm) token(spacing.glass.md)", fontSize: "14px" },
      },
      lg: {
        content: { padding: "token(spacing.glass.md) token(spacing.glass.lg)", fontSize: "16px" },
      },
    },
  },
  defaultVariants: { size: "md" },
});

export const popoverRecipe = defineSlotRecipe({
  className: "popover",
  description: "Liquid glass popover component",
  jsx: ["Popover"],
  slots: [
    "trigger",
    "positioner",
    "content",
    "title",
    "description",
    "closeTrigger",
    "arrow",
    "arrowTip",
  ],
  base: {
    trigger: {
      ...interactiveGlass,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "token(spacing.glass.md) token(spacing.glass.lg)",
    },
    positioner: {
      zIndex: 50,
    },
    content: {
      ...baseLiquidGlass,
      minWidth: "300px",
      padding: "token(spacing.glass.lg)",
      zIndex: 50,
      display: "flex",
      flexDirection: "column",
      gap: "token(spacing.glass.md)",
    },
    title: {
      ...glassContent,
      fontSize: "16px",
      fontWeight: 600,
      lineHeight: 1.2,
    },
    description: {
      ...glassContent,
      fontSize: "14px",
      color: "token(colors.text.glass.secondary)",
      lineHeight: 1.5,
    },
    closeTrigger: {
      ...interactiveGlass,
      position: "absolute",
      top: "token(spacing.glass.sm)",
      right: "token(spacing.glass.sm)",
      width: "24px",
      height: "24px",
      borderRadius: "token(radii.sm)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    arrow: {
      "--arrow-size": "8px",
      "--arrow-background": "token(colors.glass.bg)",
    },
    arrowTip: {
      borderTopColor: "token(colors.glass.border)",
      borderLeftColor: "transparent",
      borderRightColor: "transparent",
    },
  },
  variants: {
    size: {
      sm: {
        content: { minWidth: "250px", padding: "token(spacing.glass.md)" },
        title: { fontSize: "14px" },
        description: { fontSize: "12px" },
      },
      md: {
        content: { minWidth: "300px", padding: "token(spacing.glass.lg)" },
        title: { fontSize: "16px" },
        description: { fontSize: "14px" },
      },
      lg: {
        content: { minWidth: "400px", padding: "token(spacing.glass.xl)" },
        title: { fontSize: "18px" },
        description: { fontSize: "16px" },
      },
    },
  },
  defaultVariants: { size: "md" },
});

// Toast recipe
export const toastRecipe = defineSlotRecipe({
  className: "toast",
  description: "Liquid glass toast component",
  jsx: ["Toast"],
  slots: ["root", "title", "description", "closeTrigger", "actionTrigger"],
  base: {
    root: {
      ...baseLiquidGlass,
      display: "flex",
      alignItems: "flex-start",
      gap: "token(spacing.glass.md)",
      padding: "token(spacing.glass.lg)",
      minWidth: "300px",
      maxWidth: "500px",
      position: "relative",
    },
    title: {
      ...glassContent,
      fontSize: "16px",
      fontWeight: 600,
      lineHeight: 1.2,
    },
    description: {
      ...glassContent,
      fontSize: "14px",
      color: "token(colors.text.glass.secondary)",
      lineHeight: 1.5,
    },
    closeTrigger: {
      ...interactiveGlass,
      width: "24px",
      height: "24px",
      borderRadius: "token(radii.sm)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginLeft: "auto",
    },
    actionTrigger: {
      ...interactiveGlass,
      padding: "token(spacing.glass.sm) token(spacing.glass.md)",
      borderRadius: "token(radii.sm)",
      fontSize: "14px",
      fontWeight: 500,
    },
  },
  variants: {
    status: {
      info: {
        root: {
          borderLeftColor: "token(colors.accent.primary)",
          borderLeftWidth: "4px",
        },
      },
      success: {
        root: {
          borderLeftColor: "token(colors.accent.success)",
          borderLeftWidth: "4px",
        },
      },
      warning: {
        root: {
          borderLeftColor: "token(colors.accent.warning)",
          borderLeftWidth: "4px",
        },
      },
      error: {
        root: {
          borderLeftColor: "token(colors.accent.danger)",
          borderLeftWidth: "4px",
        },
      },
    },
  },
  defaultVariants: { status: "info" },
});

// Add more component recipes here as needed...
export const hoverCardRecipe = defineSlotRecipe({
  className: "hoverCard",
  description: "Liquid glass hover card component",
  jsx: ["HoverCard"],
  slots: ["trigger", "positioner", "content", "arrow", "arrowTip"],
  base: {
    trigger: {
      display: "inline-flex",
      cursor: "pointer",
    },
    positioner: {
      zIndex: 50,
    },
    content: {
      ...baseLiquidGlass,
      padding: "token(spacing.glass.lg)",
      minWidth: "300px",
      maxWidth: "400px",
      zIndex: 50,
    },
    arrow: {
      "--arrow-size": "8px",
      "--arrow-background": "token(colors.glass.bg)",
    },
    arrowTip: {
      borderTopColor: "token(colors.glass.border)",
      borderLeftColor: "transparent",
      borderRightColor: "transparent",
    },
  },
  variants: {
    size: {
      sm: {
        content: { padding: "token(spacing.glass.md)", minWidth: "250px" },
      },
      md: {
        content: { padding: "token(spacing.glass.lg)", minWidth: "300px" },
      },
      lg: {
        content: { padding: "token(spacing.glass.xl)", minWidth: "400px" },
      },
    },
  },
  defaultVariants: { size: "md" },
});

// You can continue adding more recipes for other Ark UI components...
// This provides a solid foundation that demonstrates the mass auto-application pattern

// Main entry point for the LiqUIdify component library - Apple Design Language for Web
// Now powered by shadcn/ui with iOS Blue theming

// Import Apple-themed CSS system
import "./styles/new-design-system.css";

// shadcn/ui Components with Apple iOS Blue theming
export * from "./components/ui/button";
export * from "./components/ui/card";

// Liquid Glass Components
export * from "./components/liquid-glass";
export * from "./components/liquid-button";
export * from "./components/liquid-card";
export * from "./components/liquid-input";
export * from "./components/liquid-select";
export * from "./components/liquid-textarea";
export * from "./components/liquid-checkbox";
export * from "./components/liquid-radio";

// Navigation Components
export * from "./components/liquid-navbar";
export * from "./components/liquid-sidebar";
export * from "./components/liquid-tabs";
export * from "./components/liquid-breadcrumb";

// Feedback & Overlay Components
export * from "./components/liquid-modal";
export * from "./components/liquid-tooltip";
export * from "./components/liquid-popover";
export * from "./components/liquid-alert";
export * from "./components/liquid-toast";

// Data Display Components
export * from "./components/liquid-table";
export * from "./components/liquid-data-grid";
export * from "./components/liquid-list";
export * from "./components/liquid-pagination";
export * from "./components/liquid-accordion";

// Utilities
export { cn } from "./lib/utils";

// Hooks (preserving existing ones that might exist)
// export { useDeviceCapabilities } from "./hooks/use-device-capabilities";
// export type { DeviceCapabilities } from "./hooks/use-device-capabilities";

// Convenience aliases for compatibility
export { Button } from "./components/ui/button";
export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./components/ui/card";
export { LiquidGlass, liquidGlassVariants, type LiquidGlassProps } from "./components/liquid-glass";
export { LiquidButton, liquidButtonVariants, type LiquidButtonProps } from "./components/liquid-button";
export { 
  LiquidCard,
  LiquidCardHeader, 
  LiquidCardTitle,
  LiquidCardDescription,
  LiquidCardContent,
  LiquidCardFooter,
  liquidCardVariants,
  type LiquidCardProps 
} from "./components/liquid-card";
export { LiquidInput, liquidInputVariants, type LiquidInputProps } from "./components/liquid-input";
export { LiquidSelect, liquidSelectVariants, type LiquidSelectProps, type SelectOption } from "./components/liquid-select";
export { LiquidTextarea, liquidTextareaVariants, type LiquidTextareaProps } from "./components/liquid-textarea";
export { LiquidCheckbox, liquidCheckboxVariants, type LiquidCheckboxProps } from "./components/liquid-checkbox";
export { LiquidRadio, LiquidRadioGroup, liquidRadioVariants, type LiquidRadioProps, type LiquidRadioGroupProps } from "./components/liquid-radio";

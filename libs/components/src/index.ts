// Main entry point for the Liquidify component library

// Import new CSS system
import "./styles/new-design-system.css";

// Core components
export * from "./components/glass-accordion";
export * from "./components/glass-alert";
export * from "./components/glass-avatar";
export * from "./components/glass-badge";
export * from "./components/glass-banner";
export * from "./components/glass-button-refactored";
export * from "./components/glass-card-refactored";
export * from "./components/glass-checkbox";
export { GlassErrorBoundary } from "./components/glass-error-boundary";
export * from "./components/glass-input";
export * from "./components/glass-loading";
export * from "./components/glass-modal";
export * from "./components/glass-notification";
export * from "./components/glass-pagination";
export * from "./components/glass-popover";
export * from "./components/glass-portal";
export * from "./components/glass-progress";
export * from "./components/glass-responsive-button";
export * from "./components/glass-responsive-card";
export * from "./components/glass-skeleton";
export * from "./components/glass-slider";
export * from "./components/glass-spinner";
export * from "./components/glass-switch";
export * from "./components/glass-table";
export * from "./components/glass-tabs";
export * from "./components/glass-timeline";
export * from "./components/glass-toast";
export * from "./components/glass-tooltip";
export * from "./components/glass-tree-view";

// Navigation components
export * from "./components/glass-breadcrumbs";
export * from "./components/glass-mobile-nav";
export * from "./components/navbar";
export * from "./components/sidebar";

// Data visualization components
export * from "./components/glass-chart";

// Form components
export * from "./components/glass-combobox";
export * from "./components/glass-checkbox-group";
export * from "./components/glass-date-picker";
export * from "./components/glass-file-upload";
export * from "./components/glass-number-input";
export * from "./components/glass-textarea";
export * from "./components/glass-form-field";
export * from "./components/glass-radio-group";
export * from "./components/glass-search";
export * from "./components/glass-select";

// Layout components
export * from "./components/glass-drawer";
export * from "./components/glass-dropdown";

// Utility components
export * from "./components/glass-command";

// Accessibility components
export * from "./components/glass-focus-trap";
export * from "./components/glass-skip-navigation";

// Theme and styling components
export * from "./components/theme-provider";
export * from "./components/theme-toggle";

// Convenience alias exports for docs/snippets (Mintlify)
// These map simplified names used in examples to the actual Glass* exports.
export { GlassButton as Button } from "./components/glass-button-refactored";
export { GlassCard as Card } from "./components/glass-card-refactored";
export { GlassInput as Input } from "./components/glass-input";
export { GlassTabs as Tabs } from "./components/glass-tabs";
export { GlassTooltip as Tooltip } from "./components/glass-tooltip";
export { GlassToast as Toast } from "./components/glass-toast";
export { GlassModal as Modal } from "./components/glass-modal";
export { GlassSelect as Select } from "./components/glass-select";
export { GlassTextarea as Textarea } from "./components/glass-textarea";
export { GlassResponsiveButton as ResponsiveButton } from "./components/glass-responsive-button";

// Liquid Glass Hooks
export { useDeviceCapabilities } from "./hooks/use-device-capabilities";
export type { DeviceCapabilities } from "./hooks/use-device-capabilities";

// DEPRECATED: Legacy glass system exports (will be removed in v2.0.0)
export {
  UnifiedGlassProvider,
  LiquidGlassDefs,
  type LiquidGlassProps,
  type GlassVariant,
} from "./legacy/legacy-glass-stubs";

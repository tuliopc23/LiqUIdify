/**
 * Advanced Bundle - Complex Components (<8KB)
 * Data visualization, complex layouts, and specialized components
 * Lazy-loaded for applications that need advanced functionality
 */

// Advanced layout components
export * from "../components/glass-accordion";
export * from "../components/glass-breadcrumbs";
// Complex data components
export * from "../components/glass-chart";
// Complex form components
export * from "../components/glass-combobox";
export * from "../components/glass-command";
export * from "../components/glass-date-picker";
export * from "../components/glass-drawer";
// Navigation components
export * from "../components/glass-dropdown";
export * from "../components/glass-file-upload";
export * from "../components/glass-mobile-nav";
export * from "../components/glass-notification";
export * from "../components/glass-pagination";
// Developer tools

export * from "../components/glass-playground/glass-playground";
// Specialized components
export * from "../components/glass-responsive-button";
export * from "../components/glass-responsive-card";
export * from "../components/glass-skeleton";
export * from "../components/glass-table";
export * from "../components/glass-tabs";
// Advanced feedback components
export * from "../components/glass-toast";
export * from "../components/navbar";
export * from "../components/sidebar";

// Advanced providers

export * from "../providers/glass-performance-provider";

export * from "../providers/ssr-config-provider";

// Tree-shaking markers
export const ADVANCED_BUNDLE_MARKER = "liquidui-advanced" as const;

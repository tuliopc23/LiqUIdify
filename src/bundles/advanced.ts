/**
 * Advanced Bundle - Complex Components (<8KB)
 * Data visualization, complex layouts, and specialized components
 * Lazy-loaded for applications that need advanced functionality
 */

// Complex data components
export * from '../components/glass-chart';
export * from '../components/glass-table';
export * from '../components/glass-command';

// Advanced layout components
export * from '../components/glass-accordion';
export * from '../components/glass-drawer';
export * from '../components/glass-tabs';

// Complex form components
export * from '../components/glass-combobox';
export * from '../components/glass-date-picker';
export * from '../components/glass-file-upload';

// Navigation components
export * from '../components/glass-dropdown';
export * from '../components/glass-breadcrumbs';
export * from '../components/glass-pagination';
export * from '../components/glass-mobile-nav';
export * from '../components/navbar';
export * from '../components/sidebar';

// Advanced feedback components
export * from '../components/glass-toast';
export * from '../components/glass-notification';
export * from '../components/glass-skeleton';

// Specialized components
export * from '../components/glass-responsive-button';
export * from '../components/glass-responsive-card';

// Developer tools
export * from '../components/glass-playground/glass-playground';

// Advanced providers
export * from '../providers/glass-performance-provider';
export * from '../providers/ssr-config-provider';

// Tree-shaking markers
export const ADVANCED_BUNDLE_MARKER = 'liquidui-advanced' as const;

// Glass Components Library - Main Export File
// Import and re-export all glass components for easy use in projects

// Apple Liquid Glass Components - Enhanced with multi-layer structure
export {
  AppleLiquidGlass,
  AppleLiquidGlassCard,
  AppleLiquidGlassButton,
  AppleLiquidGlassNav,
  type AppleLiquidGlassComponentProps,
} from './apple-liquid-glass';
export {
  LiquidGlassSvgFilters,
  type LiquidGlassSvgFiltersProps,
} from './liquid-glass-svg-filters';

// Enhanced Apple Liquid Glass Components - Pixel-Perfect Multi-Layer System
export {
  EnhancedAppleLiquidGlass,
  EnhancedAppleLiquidGlassCard,
  EnhancedAppleLiquidGlassButton,
  EnhancedAppleLiquidGlassNav,
  EnhancedAppleLiquidGlassModal,
  EnhancedAppleLiquidGlassShowcase,
  type EnhancedAppleLiquidGlassProps,
} from './enhanced-apple-liquid-glass';

// Form Components
export { GlassButton, type GlassButtonProps } from './glass-button/index';
export { GlassInput, type GlassInputProps } from './glass-input/index';
export {
  GlassNumberInput,
  type GlassNumberInputProps,
} from './glass-number-input/index';
export { GlassTextarea, type GlassTextareaProps } from './glass-textarea/index';
export {
  GlassFileUpload,
  type GlassFileUploadProps,
} from './glass-file-upload/index';
export {
  GlassSelect,
  type GlassSelectProps,
  type GlassSelectOption,
} from './glass-select/index';
export { GlassCheckbox, type GlassCheckboxProps } from './glass-checkbox/index';
export { GlassSwitch, type GlassSwitchProps } from './glass-switch/index';
export { GlassSlider, type GlassSliderProps } from './glass-slider/index';
export {
  GlassFormField,
  type GlassFormFieldProps,
} from './glass-form-field/index';
export {
  GlassRadioGroup,
  GlassRadioItem,
  type GlassRadioGroupProps,
  type GlassRadioItemProps,
} from './glass-radio-group/index';
export {
  CheckboxGroup,
  type CheckboxGroupProps,
} from './glass-checkbox-group/index';
export {
  GlassBreadcrumbs,
  type GlassBreadcrumbsProps,
  type BreadcrumbItem,
} from './glass-breadcrumbs/index';
export {
  GlassPagination,
  type GlassPaginationProps,
} from './glass-pagination/index';
export {
  GlassDatePicker,
  type GlassDatePickerProps,
} from './glass-date-picker/index';
export {
  Accordion,
  GlassAccordion,
  GlassAccordionItem,
  GlassAccordionTrigger,
  GlassAccordionContent,
  type GlassAccordionProps,
  type GlassAccordionItemProps,
  type GlassAccordionTriggerProps,
  type GlassAccordionContentProps,
} from './glass-accordion/index';
export { GlassCombobox, type GlassComboboxProps } from './glass-combobox/index';
export {
  GlassSkeleton,
  SkeletonText,
  SkeletonCard,
  SkeletonTable,
  type GlassSkeletonProps,
} from './glass-skeleton/index';
export {
  GlassSpinner,
  PulseSpinner,
  DotsSpinner,
  RingSpinner,
  WaveSpinner,
  type GlassSpinnerProps,
} from './glass-spinner/index';
export {
  Drawer,
  GlassDrawer,
  GlassDrawerTrigger,
  GlassDrawerClose,
  GlassDrawerPortal,
  GlassDrawerOverlay,
  GlassDrawerContent,
  GlassDrawerHeader,
  GlassDrawerTitle,
  GlassDrawerDescription,
  GlassDrawerBody,
  GlassDrawerFooter,
  type GlassDrawerProps,
  type GlassDrawerContentProps,
  type GlassDrawerHeaderProps,
  type GlassDrawerTitleProps,
  type GlassDrawerDescriptionProps,
  type GlassDrawerBodyProps,
  type GlassDrawerFooterProps,
} from './glass-drawer/index';

// Layout Components
export { GlassCard, type GlassCardProps } from './glass-card/index';
export { GlassModal } from './glass-modal/index';
export { GlassTabs } from './glass-tabs/index';
export { GlassTable } from './glass-table/index';
export { GlassHeader, type GlassHeaderProps } from './glass-header';
export { GlassFooter, type GlassFooterProps } from './glass-footer';
export { GlassPortal, type GlassPortalProps } from './glass-portal/index';
export {
  GlassVisuallyHidden,
  type GlassVisuallyHiddenProps,
} from './glass-visually-hidden/index';

// Feedback Components
export { GlassBadge, type GlassBadgeProps } from './glass-badge/index';
export { GlassProgress, type GlassProgressProps } from './glass-progress/index';
export { GlassLoading, type GlassLoadingProps } from './glass-loading/index';
export { GlassTooltip, type GlassTooltipProps } from './glass-tooltip/index';
export { GlassPopover, type GlassPopoverProps } from './glass-popover/index';
export { ToastProvider, useToast, type Toast } from './glass-toast/index';

// Accessibility Components
export {
  GlassLiveRegion,
  GlassLiveRegionProvider,
  useAnnouncement,
  announcer,
  type GlassLiveRegionProps,
  type AriaLivePriority,
  type AriaRelevant,
  type AnnouncementPriority,
  type AnnouncementContext,
} from './glass-live-region/index';
export {
  GlassFocusTrap,
  type GlassFocusTrapProps,
} from './glass-focus-trap/index';
export {
  GlassSkipNavigation,
  useSkipNavigation,
  type GlassSkipNavigationProps,
  type SkipLink,
} from './glass-skip-navigation/index';

// Performance Monitoring
export {
  GlassPerformanceDashboard,
  type GlassPerformanceDashboardProps,
} from './glass-performance-dashboard/index';

// Navigation Components
export {
  GlassDropdown,
  type GlassDropdownProps,
  type DropdownItem,
} from './glass-dropdown/index';
export { GlassAvatar, type GlassAvatarProps } from './glass-avatar/index';
export {
  GlassSearch,
  type SearchSuggestion,
  type GlassSearchProps,
} from './glass-search/index';
export { GlassMobileNav } from './glass-mobile-nav/index';
export { Navbar as GlassNavbar } from './navbar/index';
export { Sidebar } from './sidebar/index';

// Advanced Components
export { CommandPalette, type CommandItem } from './glass-command/index';
export {
  NotificationCenter,
  type NotificationItem,
} from './glass-notification/index';
export {
  GlassPlayground,
  type PlaygroundProps,
  type PlaygroundTemplates,
} from './glass-playground/glass-playground';
export {
  LineChart,
  BarChart,
  DonutChart,
  type ChartDataPoint,
} from './glass-chart/index';
export { LineChart as GlassChart } from './glass-chart/index';
export { GlassToast } from './glass-toast/glass-toast';

// Theme System
export { ThemeProvider } from './theme-provider/index';
export { ThemeToggle } from './theme-toggle/index';
export { LiquidGlassProvider, useLiquidGlass } from '../hooks/use-liquid-glass';
export { useTheme } from '../hooks/use-theme';

// Showcase
export { ComponentShowcase } from './component-showcase/index';

// Website Building Components
export { GlassHero, type GlassHeroProps } from './glass-hero';
export {
  GlassFeatureShowcase,
  type GlassFeatureShowcaseProps,
  type FeatureItem,
} from './glass-feature-showcase';
export {
  GlassFloatingAction,
  type GlassFloatingActionProps,
  type FloatingAction,
} from './glass-floating-action';

// Responsive Components
export {
  GlassResponsiveButton,
  type GlassResponsiveButtonProps,
} from './glass-responsive-button/index';
export {
  GlassResponsiveCard,
  type GlassResponsiveCardProps,
} from './glass-responsive-card/index';

// Utility functions and constants
export {
  cn,
  glassVariants,
  getGlassClass,
  focusRing,
  microInteraction,
  responsiveSize,
  touchTarget,
  responsiveGlass,
  animationState,
} from '../lib/glass-utils';

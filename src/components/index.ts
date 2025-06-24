// Glass Components Library - Main Export File
// Import and re-export all glass components for easy use in projects

// Form Components
export { GlassButton, type GlassButtonProps } from './glass-button/index';
export { GlassInput, type GlassInputProps } from './glass-input/index';
export { GlassTextarea, type GlassTextareaProps } from './glass-textarea/index';
export {
  GlassSelect,
  type GlassSelectProps,
  type GlassSelectOption,
} from './glass-select/index';
export { GlassCheckbox, type GlassCheckboxProps } from './glass-checkbox/index';
export { GlassSwitch, type GlassSwitchProps } from './glass-switch/index';
export { GlassSlider, type GlassSliderProps } from './glass-slider/index';

// Layout Components
export { GlassCard, type GlassCardProps } from './glass-card/index';
export { GlassModal } from './glass-modal/index';
export { GlassTabs } from './glass-tabs/index';
export { GlassTable } from './glass-table/index';
export { GlassHeader, type GlassHeaderProps } from './glass-header';
export { GlassFooter, type GlassFooterProps } from './glass-footer';

// Feedback Components
export { GlassBadge, type GlassBadgeProps } from './glass-badge/index';
export { GlassProgress, type GlassProgressProps } from './glass-progress/index';
export { GlassLoading, type GlassLoadingProps } from './glass-loading/index';
export { GlassTooltip, type GlassTooltipProps } from './glass-tooltip/index';
export { GlassPopover, type GlassPopoverProps } from './glass-popover/index';
export { ToastProvider, useToast, type Toast } from './glass-toast/index';

// Navigation Components
export {
  GlassDropdown,
  type GlassDropdownProps,
  type DropdownItem,
} from './glass-dropdown/index';
export { GlassAvatar, type GlassAvatarProps } from './glass-avatar/index';
export { GlassSearch, type SearchSuggestion } from './glass-search/index';
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
export { LiquidGlassProvider, useLiquidGlass } from '@/hooks/use-liquid-glass';
export { useTheme } from '@/hooks/use-theme';

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
} from '@/lib/glass-utils';

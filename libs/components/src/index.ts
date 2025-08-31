// Main entry point for the LiqUIdify component library - Apple Design Language for Web
// Now powered by shadcn/ui with iOS Blue theming

// Import Apple-themed CSS system
import "./styles/new-design-system.css";

export * from "./components/liquid-accordion";
export * from "./components/liquid-alert";
export * from "./components/liquid-avatar";
export * from "./components/liquid-badge";
export * from "./components/liquid-breadcrumb";
export * from "./components/liquid-button";
export * from "./components/liquid-calendar";
export * from "./components/liquid-card";
export * from "./components/liquid-checkbox";
export * from "./components/liquid-collapsible";
export * from "./components/liquid-combobox";
// Missing shadcn/ui Components - Phase 7 Batch 2
export * from "./components/liquid-command";
export * from "./components/liquid-context-menu";
export * from "./components/liquid-data-grid";
// Liquid Glass Components
export * from "./components/liquid-glass";
// Missing shadcn/ui Components - Phase 7 Batch 1
export * from "./components/liquid-hover-card";
export * from "./components/liquid-input";
export * from "./components/liquid-label";
export * from "./components/liquid-list";
export * from "./components/liquid-menubar";
// Feedback & Overlay Components
export * from "./components/liquid-modal";
// Navigation Components
export * from "./components/liquid-navbar";
export * from "./components/liquid-navigation-menu";
export * from "./components/liquid-pagination";
export * from "./components/liquid-popover";
export * from "./components/liquid-progress";
export * from "./components/liquid-radio";
export * from "./components/liquid-scroll-area";
export * from "./components/liquid-select";
export * from "./components/liquid-separator";
export * from "./components/liquid-sheet";
export * from "./components/liquid-sidebar";
export * from "./components/liquid-skeleton";
export * from "./components/liquid-slider";
// Essential Components - Phase 6
export * from "./components/liquid-switch";
// Data Display Components
export * from "./components/liquid-table";
export * from "./components/liquid-tabs";
export * from "./components/liquid-textarea";
export * from "./components/liquid-toast";
export * from "./components/liquid-toggle";
export * from "./components/liquid-tooltip";
// shadcn/ui Components with Apple iOS Blue theming
export * from "./components/ui/button";
export * from "./components/ui/card";

// Utilities
export { cn } from "./lib/utils";

// Hooks (preserving existing ones that might exist)
// export { useDeviceCapabilities } from "./hooks/use-device-capabilities";
// export type { DeviceCapabilities } from "./hooks/use-device-capabilities";

// Final Components - Completing 100% shadcn/ui Coverage
export * from "./components/liquid-aspect-ratio";
// Final Component Exports with Types
export {
  LiquidAspectRatio,
  type LiquidAspectRatioProps,
  liquidAspectRatioVariants,
} from "./components/liquid-aspect-ratio";
export {
  avatarFallbackVariants,
  avatarGroupVariants,
  avatarImageVariants,
  LiquidAvatar,
  LiquidAvatarGroup,
  type LiquidAvatarProps,
  liquidAvatarVariants,
  statusIndicatorVariants,
} from "./components/liquid-avatar";
export {
  badgeDotVariants,
  badgeGroupVariants,
  badgeIconVariants,
  LiquidBadge,
  LiquidBadgeGroup,
  type LiquidBadgeProps,
  liquidBadgeVariants,
} from "./components/liquid-badge";
export {
  LiquidButton,
  type LiquidButtonProps,
  liquidButtonVariants,
} from "./components/liquid-button";
export {
  calendarDayVariants,
  calendarHeaderVariants,
  calendarNavButtonVariants,
  LiquidCalendar,
  type LiquidCalendarProps,
  liquidCalendarVariants,
} from "./components/liquid-calendar";
export {
  LiquidCard,
  LiquidCardContent,
  LiquidCardDescription,
  LiquidCardFooter,
  LiquidCardHeader,
  type LiquidCardProps,
  LiquidCardTitle,
  liquidCardVariants,
} from "./components/liquid-card";
export {
  LiquidCheckbox,
  type LiquidCheckboxProps,
  liquidCheckboxVariants,
} from "./components/liquid-checkbox";
export {
  collapsibleContentVariants,
  collapsibleTriggerVariants,
  LiquidAccordionItem,
  LiquidCollapsible,
  LiquidCollapsibleContent,
  type LiquidCollapsibleProps,
  LiquidCollapsibleTrigger,
  LiquidFAQItem,
  liquidCollapsibleVariants,
} from "./components/liquid-collapsible";
export {
  type ComboboxOption,
  comboboxContentVariants,
  comboboxItemVariants,
  comboboxTriggerVariants,
  LiquidCombobox,
  type LiquidComboboxProps,
  LiquidSimpleCombobox,
  liquidComboboxVariants,
} from "./components/liquid-combobox";
// Phase 7 Batch 2 Components
export {
  commandInputVariants,
  commandItemVariants,
  commandListVariants,
  LiquidCommand,
  LiquidCommandDialog,
  LiquidCommandEmpty,
  LiquidCommandGroup,
  LiquidCommandInput,
  LiquidCommandItem,
  LiquidCommandList,
  type LiquidCommandProps,
  LiquidCommandSeparator,
  LiquidCommandShortcut,
  liquidCommandVariants,
} from "./components/liquid-command";
export {
  contextMenuItemVariants,
  LiquidContextMenu,
  LiquidContextMenuCheckboxItem,
  LiquidContextMenuContent,
  LiquidContextMenuItem,
  LiquidContextMenuLabel,
  type LiquidContextMenuProps,
  LiquidContextMenuRadioGroup,
  LiquidContextMenuRadioItem,
  LiquidContextMenuSeparator,
  LiquidContextMenuShortcut,
  LiquidContextMenuTrigger,
  liquidContextMenuVariants,
} from "./components/liquid-context-menu";
export * from "./components/liquid-date-picker";
export {
  datePickerTriggerVariants,
  LiquidDatePicker,
  type LiquidDatePickerProps,
  LiquidDateRangePicker,
  liquidDatePickerVariants,
} from "./components/liquid-date-picker";
export * from "./components/liquid-drawer";
export {
  drawerOverlayVariants,
  LiquidControlledDrawer,
  LiquidDrawer,
  LiquidDrawerClose,
  LiquidDrawerContent,
  LiquidDrawerDescription,
  LiquidDrawerFooter,
  LiquidDrawerHeader,
  type LiquidDrawerProps,
  LiquidDrawerTitle,
  LiquidDrawerTrigger,
  liquidDrawerVariants,
} from "./components/liquid-drawer";
export * from "./components/liquid-dropdown-menu";
export {
  dropdownMenuItemVariants,
  LiquidDropdownMenu,
  LiquidDropdownMenuCheckboxItem,
  LiquidDropdownMenuContent,
  LiquidDropdownMenuItem,
  LiquidDropdownMenuLabel,
  type LiquidDropdownMenuProps,
  LiquidDropdownMenuRadioGroup,
  LiquidDropdownMenuRadioItem,
  LiquidDropdownMenuSeparator,
  LiquidDropdownMenuShortcut,
  LiquidDropdownMenuSub,
  LiquidDropdownMenuSubContent,
  LiquidDropdownMenuSubTrigger,
  LiquidDropdownMenuTrigger,
  liquidDropdownMenuVariants,
} from "./components/liquid-dropdown-menu";
export * from "./components/liquid-form";
export {
  type FieldError,
  formFieldVariants,
  formMessageVariants,
  LiquidForm,
  LiquidFormControl,
  LiquidFormDescription,
  LiquidFormField,
  LiquidFormMessage,
  type LiquidFormProps,
  liquidFormVariants,
  useForm,
  useFormContext,
  type ValidationRule,
} from "./components/liquid-form";
export { LiquidGlass, type LiquidGlassProps } from "./components/liquid-glass";
// Phase 7 Batch 1 Components
export {
  hoverCardContentVariants,
  LiquidHoverCard,
  type LiquidHoverCardProps,
  LiquidUserHoverCard,
  liquidHoverCardVariants,
} from "./components/liquid-hover-card";
export { LiquidInput, type LiquidInputProps, liquidInputVariants } from "./components/liquid-input";
export {
  fieldsetVariants,
  LiquidFieldset,
  LiquidLabel,
  type LiquidLabelProps,
  labelIndicatorVariants,
  legendVariants,
  liquidLabelVariants,
} from "./components/liquid-label";
export {
  LiquidMenubar,
  LiquidMenubarContent,
  LiquidMenubarItem,
  LiquidMenubarLabel,
  LiquidMenubarMenu,
  type LiquidMenubarProps,
  LiquidMenubarSeparator,
  LiquidMenubarShortcut,
  LiquidMenubarTrigger,
  liquidMenubarVariants,
  menubarContentVariants,
  menubarItemVariants,
  menubarTriggerVariants,
} from "./components/liquid-menubar";

export {
  LiquidNavigationMenu,
  LiquidNavigationMenuContent,
  LiquidNavigationMenuIndicator,
  LiquidNavigationMenuItem,
  LiquidNavigationMenuItemWithContent,
  LiquidNavigationMenuLink,
  LiquidNavigationMenuList,
  type LiquidNavigationMenuProps,
  LiquidNavigationMenuTrigger,
  LiquidNavigationMenuViewport,
  liquidNavigationMenuVariants,
  navigationMenuContentVariants,
  navigationMenuListVariants,
  navigationMenuTriggerVariants,
} from "./components/liquid-navigation-menu";
export {
  LiquidCircularProgress,
  LiquidProgress,
  type LiquidProgressProps,
  liquidProgressVariants,
  progressIndicatorVariants,
  progressLabelVariants,
} from "./components/liquid-progress";
export {
  LiquidRadio,
  LiquidRadioGroup,
  type LiquidRadioGroupProps,
  type LiquidRadioProps,
  liquidRadioVariants,
} from "./components/liquid-radio";
export * from "./components/liquid-resizable";
export {
  LiquidResizableHandle,
  LiquidResizablePanel,
  LiquidResizablePanelGroup,
  type LiquidResizablePanelGroupProps,
  LiquidThreeColumnLayout,
  LiquidTwoColumnLayout,
  liquidResizableVariants,
  resizableHandleVariants,
  resizablePanelVariants,
} from "./components/liquid-resizable";
export {
  LiquidScrollArea,
  type LiquidScrollAreaProps,
  LiquidSimpleScrollArea,
  liquidScrollAreaVariants,
  scrollbarThumbVariants,
  scrollbarVariants,
} from "./components/liquid-scroll-area";
export {
  LiquidSelect,
  type LiquidSelectProps,
  liquidSelectVariants,
  type SelectOption,
} from "./components/liquid-select";
export {
  LiquidSectionSeparator,
  LiquidSeparator,
  type LiquidSeparatorProps,
  liquidSeparatorVariants,
  sectionSeparatorVariants,
  separatorLabelVariants,
} from "./components/liquid-separator";
export {
  LiquidControlledSheet,
  LiquidSheet,
  LiquidSheetClose,
  LiquidSheetContent,
  LiquidSheetDescription,
  LiquidSheetFooter,
  LiquidSheetHeader,
  type LiquidSheetProps,
  LiquidSheetTitle,
  LiquidSheetTrigger,
  liquidSheetVariants,
  sheetOverlayVariants,
} from "./components/liquid-sheet";
export {
  LiquidAvatarSkeleton,
  LiquidButtonSkeleton,
  LiquidCardSkeleton,
  LiquidListSkeleton,
  LiquidSkeleton,
  type LiquidSkeletonProps,
  LiquidTableSkeleton,
  LiquidTextSkeleton,
  liquidSkeletonVariants,
} from "./components/liquid-skeleton";
export {
  LiquidSlider,
  type LiquidSliderProps,
  liquidSliderVariants,
  sliderRangeVariants,
  sliderThumbVariants,
  sliderTrackVariants,
} from "./components/liquid-slider";
// Phase 6 Essential Components
export {
  LiquidSwitch,
  type LiquidSwitchProps,
  liquidSwitchVariants,
  switchThumbVariants,
} from "./components/liquid-switch";
export {
  LiquidTextarea,
  type LiquidTextareaProps,
  liquidTextareaVariants,
} from "./components/liquid-textarea";
export {
  LiquidToggle,
  LiquidToggleGroup,
  LiquidToggleGroupItem,
  type LiquidToggleProps,
  liquidToggleVariants,
  toggleGroupVariants,
} from "./components/liquid-toggle";
// Convenience aliases for compatibility
export { Button } from "./components/ui/button";
export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";

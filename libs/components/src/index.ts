// Main entry point for the LiqUIdify component library - Apple Design Language for Web
// Now powered by Panda CSS with liquid glass effects

// Styles: trigger Panda CSS generation for tokens/recipes/utilities when building the library
import "./styles/panda.css";

// Core Components with Liquid Glass Styling
export * from "./components/button";
export * from "./components/accordion";
export * from "./components/liquid-glass";

// Mass Auto-Applied Ark UI Components with Liquid Glass (Slot Recipes)
export * from "./components/ark-ui/dialog/dialog";
export * from "./components/ark-ui/menu/menu";
export * from "./components/ark-ui/select/select";
export * from "./components/ark-ui/tabs/tabs";
export * from "./components/ark-ui/tooltip/tooltip";
export * from "./components/ark-ui/popover/popover";
export * from "./components/ark-ui/toast/toast";
export * from "./components/ark-ui/accordion/accordion";

// Batch 2 Slot Recipe Components (Auto-Styled)
export * from "./components/ark-ui/combobox/combobox";
export * from "./components/ark-ui/date-picker/date-picker";
export * from "./components/ark-ui/file-upload/file-upload";
export * from "./components/ark-ui/number-input/number-input";
export * from "./components/ark-ui/radio-group/radio-group";
export * from "./components/ark-ui/pagination/pagination";
export * from "./components/ark-ui/carousel/carousel";

// Simple Recipe Components (Auto-Styled)
export * from "./components/ark-ui/avatar/avatar";
export * from "./components/ark-ui/checkbox/checkbox";
export * from "./components/ark-ui/switch/switch";
export * from "./components/ark-ui/slider/slider";
export * from "./components/ark-ui/progress/progress";

// Batch 3 Simple Recipe Components (Auto-Styled)
export * from "./components/ark-ui/color-picker/color-picker";
export * from "./components/ark-ui/pin-input/pin-input";
export * from "./components/ark-ui/rating-group/rating-group";

// NEW: Complete Ark UI Coverage - All 25 Remaining Components
// Advanced Input & Control Components
export * from "./components/ark-ui/angle-slider/angle-slider";
export * from "./components/ark-ui/clipboard/clipboard";
export * from "./components/ark-ui/editable/editable";
export * from "./components/ark-ui/password-input/password-input";
export * from "./components/ark-ui/tags-input/tags-input";
export * from "./components/ark-ui/timer/timer";

// Layout & Structure Components
export * from "./components/ark-ui/collapsible/collapsible";
export * from "./components/ark-ui/field/field";
export * from "./components/ark-ui/fieldset/fieldset";
export * from "./components/ark-ui/floating-panel/floating-panel";
export * from "./components/ark-ui/splitter/splitter";

// Navigation & Feedback Components
export * from "./components/ark-ui/hover-card/hover-card";
export * from "./components/ark-ui/listbox/listbox";
export * from "./components/ark-ui/steps/steps";
export * from "./components/ark-ui/tour/tour";
export * from "./components/ark-ui/tree-view/tree-view";

// Data Display & Visual Components
export * from "./components/ark-ui/progress-circular/progress-circular";
export * from "./components/ark-ui/progress-linear/progress-linear";
export * from "./components/ark-ui/qr-code/qr-code";
export * from "./components/ark-ui/scroll-area/scroll-area";
export * from "./components/ark-ui/segment-group/segment-group";
export * from "./components/ark-ui/signature-pad/signature-pad";

// Interactive Control Components
export * from "./components/ark-ui/toggle/toggle";
export * from "./components/ark-ui/toggle-group/toggle-group";

// Demo Component
export * from "./components/demo/liquid-glass-demo";

// Utilities
export * from "./lib/css";
export * from "./core/utils/responsive";

// Hooks
export * from "./hooks/use-device-capabilities";
export * from "./hooks/use-ssr-safe";
export * from "./hooks/use-theme";

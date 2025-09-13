import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Download,
  Edit,
  Eye,
  EyeOff,
  File,
  Folder,
  Home,
  Info,
  LogIn,
  LogOut,
  type LucideProps,
  Mail,
  Menu,
  MessageCircle,
  Minus,
  Pause,
  Phone,
  Play,
  Plus,
  Search,
  Settings,
  Trash2,
  Upload,
  User,
  Users,
  Volume2,
  X,
  XCircle,
} from "lucide-react";
import { type ComponentType, forwardRef } from "react";

// SF Symbols-like icon mapping for common use cases
export type IconName =
  // Navigation
  | "home"
  | "chevron-left"
  | "chevron-right"
  | "arrow-left"
  | "arrow-right"
  | "menu"
  // Actions
  | "plus"
  | "minus"
  | "edit"
  | "trash-2"
  | "settings"
  | "search"
  // Status
  | "check"
  | "x"
  | "alert-circle"
  | "info"
  | "check-circle"
  | "x-circle"
  // Media
  | "play"
  | "pause"
  | "volume-2"
  | "eye"
  | "eye-off"
  // Files
  | "file"
  | "folder"
  | "download"
  | "upload"
  // Communication
  | "mail"
  | "phone"
  | "message-circle"
  // User
  | "user"
  | "users"
  | "log-in"
  | "log-out";

// Icon size mapping to match SF Symbols
export const iconSizes = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 28,
  "2xl": 32,
} as const;

export type IconSize = keyof typeof iconSizes;

// Eager icon map to avoid Suspense requirements
const iconMap: Record<IconName, ComponentType<LucideProps>> = {
  // Navigation
  home: Home,
  "chevron-left": ChevronLeft,
  "chevron-right": ChevronRight,
  "arrow-left": ArrowLeft,
  "arrow-right": ArrowRight,
  menu: Menu,

  // Actions
  plus: Plus,
  minus: Minus,
  edit: Edit,
  "trash-2": Trash2,
  settings: Settings,
  search: Search,

  // Status
  check: Check,
  x: X,
  "alert-circle": AlertCircle,
  info: Info,
  "check-circle": CheckCircle,
  "x-circle": XCircle,

  // Media
  play: Play,
  pause: Pause,
  "volume-2": Volume2,
  eye: Eye,
  "eye-off": EyeOff,

  // Files
  file: File,
  folder: Folder,
  download: Download,
  upload: Upload,

  // Communication
  mail: Mail,
  phone: Phone,
  "message-circle": MessageCircle,

  // User
  user: User,
  users: Users,
  "log-in": LogIn,
  "log-out": LogOut,
};

export interface IconProps extends Omit<LucideProps, "size"> {
  name: IconName;
  size?: IconSize | number;
  className?: string;
  title?: string;
}

export const Icon = forwardRef<SVGSVGElement, IconProps>(
  ({ name, size = "md", className, ...props }, ref) => {
    const IconComponent = iconMap[name];
    const iconSize = typeof size === "number" ? size : iconSizes[size];

    if (!IconComponent) {
      console.warn(`Icon "${name}" not found in iconMap`);
      return null;
    }

    const labelled = Boolean(props["aria-label"] ?? props["aria-labelledby"] ?? props.title);
    const hasAriaHiddenProp = Object.hasOwn(props, "aria-hidden");
    const defaultAriaHidden = labelled ? undefined : true;
    const extraAria = hasAriaHiddenProp ? {} : { "aria-hidden": defaultAriaHidden };

    return (
      <IconComponent ref={ref} size={iconSize} className={className} {...props} {...extraAria} />
    );
  }
);

Icon.displayName = "Icon";

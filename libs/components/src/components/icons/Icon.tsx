import type { LucideProps } from "lucide-react";
import { type ComponentType, forwardRef, lazy } from "react";

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

// Lazy load icons for better tree shaking
const iconMap: Record<IconName, ComponentType<LucideProps>> = {
  // Navigation
  home: lazy(() => import("lucide-react").then((m) => ({ default: m.Home }))),
  "chevron-left": lazy(() => import("lucide-react").then((m) => ({ default: m.ChevronLeft }))),
  "chevron-right": lazy(() => import("lucide-react").then((m) => ({ default: m.ChevronRight }))),
  "arrow-left": lazy(() => import("lucide-react").then((m) => ({ default: m.ArrowLeft }))),
  "arrow-right": lazy(() => import("lucide-react").then((m) => ({ default: m.ArrowRight }))),
  menu: lazy(() => import("lucide-react").then((m) => ({ default: m.Menu }))),

  // Actions
  plus: lazy(() => import("lucide-react").then((m) => ({ default: m.Plus }))),
  minus: lazy(() => import("lucide-react").then((m) => ({ default: m.Minus }))),
  edit: lazy(() => import("lucide-react").then((m) => ({ default: m.Edit }))),
  "trash-2": lazy(() => import("lucide-react").then((m) => ({ default: m.Trash2 }))),
  settings: lazy(() => import("lucide-react").then((m) => ({ default: m.Settings }))),
  search: lazy(() => import("lucide-react").then((m) => ({ default: m.Search }))),

  // Status
  check: lazy(() => import("lucide-react").then((m) => ({ default: m.Check }))),
  x: lazy(() => import("lucide-react").then((m) => ({ default: m.X }))),
  "alert-circle": lazy(() => import("lucide-react").then((m) => ({ default: m.AlertCircle }))),
  info: lazy(() => import("lucide-react").then((m) => ({ default: m.Info }))),
  "check-circle": lazy(() => import("lucide-react").then((m) => ({ default: m.CheckCircle }))),
  "x-circle": lazy(() => import("lucide-react").then((m) => ({ default: m.XCircle }))),

  // Media
  play: lazy(() => import("lucide-react").then((m) => ({ default: m.Play }))),
  pause: lazy(() => import("lucide-react").then((m) => ({ default: m.Pause }))),
  "volume-2": lazy(() => import("lucide-react").then((m) => ({ default: m.Volume2 }))),
  eye: lazy(() => import("lucide-react").then((m) => ({ default: m.Eye }))),
  "eye-off": lazy(() => import("lucide-react").then((m) => ({ default: m.EyeOff }))),

  // Files
  file: lazy(() => import("lucide-react").then((m) => ({ default: m.File }))),
  folder: lazy(() => import("lucide-react").then((m) => ({ default: m.Folder }))),
  download: lazy(() => import("lucide-react").then((m) => ({ default: m.Download }))),
  upload: lazy(() => import("lucide-react").then((m) => ({ default: m.Upload }))),

  // Communication
  mail: lazy(() => import("lucide-react").then((m) => ({ default: m.Mail }))),
  phone: lazy(() => import("lucide-react").then((m) => ({ default: m.Phone }))),
  "message-circle": lazy(() => import("lucide-react").then((m) => ({ default: m.MessageCircle }))),

  // User
  user: lazy(() => import("lucide-react").then((m) => ({ default: m.User }))),
  users: lazy(() => import("lucide-react").then((m) => ({ default: m.Users }))),
  "log-in": lazy(() => import("lucide-react").then((m) => ({ default: m.LogIn }))),
  "log-out": lazy(() => import("lucide-react").then((m) => ({ default: m.LogOut }))),
};

export interface IconProps extends Omit<LucideProps, "size"> {
  name: IconName;
  size?: IconSize | number;
  className?: string;
}

export const Icon = forwardRef<SVGSVGElement, IconProps>(
  ({ name, size = "md", className, ...props }, ref) => {
    const IconComponent = iconMap[name];
    const iconSize = typeof size === "number" ? size : iconSizes[size];

    if (!IconComponent) {
      console.warn(`Icon "${name}" not found in iconMap`);
      return null;
    }

    return <IconComponent ref={ref} size={iconSize} className={className} {...props} />;
  }
);

Icon.displayName = "Icon";

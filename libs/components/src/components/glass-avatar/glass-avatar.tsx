import { User } from "lucide-react";
import React from "react";

import { cn, getSurfaceClass } from "../../core/utils/classname";

interface GlassAvatarProps extends React.ComponentPropsWithoutRef<"div"> {
 src?: string;
 alt?: string;
 size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
 variant?: "circular" | "rounded" | "square";
 fallback?: string;
 className?: string;
 showBorder?: boolean;
 status?: "online" | "offline" | "away" | "busy";
}

export const GlassAvatar = React.memo(
 React.forwardRef<HTMLDivElement, GlassAvatarProps>(
 (
 {
 src,
 alt,
 size = "md",
 variant = "circular",
 fallback,
 className,
 showBorder = false,
 status,
 ...props
 },
 ref,
 ) => {
 const sizeClasses = {
 xs: "w-6 h-6 text-xs",
 sm: "w-8 h-8 text-sm",
 md: "w-10 h-10 text-base",
 lg: "w-12 h-12 text-lg",
 xl: "w-16 h-16 text-xl",
 "2xl": "w-20 h-20 text-2xl",
 };

 const variantClasses = {
 circular: "rounded-full",
 rounded: "rounded-lg",
 square: "rounded-none",
 };

 const statusColors = {
 online: "",
 offline: "/40",
 away: "",
 busy: "",
 };

 const statusSizes = {
 xs: "w-1.5 h-1.5",
 sm: "w-2 h-2",
 md: "w-2.5 h-2.5",
 lg: "w-3 h-3",
 xl: "w-3.5 h-3.5",
 "2xl": "w-4 h-4",
 };

 const getInitials = (name: string) => {
 return name
 .split(" ")
 .map((word) => word[0])
 .join("")
 .slice(0, 2)
 .toUpperCase();
 };

 return (
 <div
 ref={ref}
 className={cn(
 "",
 "relative inline-flex items-center justify-center",
 sizeClasses[size],
 variantClasses[variant],
 showBorder && getSurfaceClass("default"),
 showBorder && "border border-blue-300/20",
 "overflow-hidden",
 className,
 )}
 {...props}
 >
 {/* Liquid Glass Layers */}
 <div />
 <div />
 <div />
 <div >
 {src ? (
 <img
 src={src}
 alt={
 alt || (fallback ? `Avatar for ${fallback}` : "User avatar")
 }
 className={cn(
 "h-full w-full object-cover",
 variantClasses[variant],
 )}
 onError={(e) => {
 // Hide image on error, fallback will show
 (e.target as HTMLImageElement).style.display = "none";
 }}
 />
 ) : fallback ? (
 <span
 className={cn(
 "font-medium text-blue-900",
 "bg-gradient-to-br from-apple-blue-500 to-apple-blue-400 text-blue-900-inverse",
 )}
 >
 {getInitials(fallback)}
 </span>
 ) : (
 <User
 className={cn(
 "h-1/2 w-1/2 text-blue-900/60",
 "rounded-full /20 p-1",
 )}
 />
 )}

 {/* Status indicator */}
 {status && (
 <div
 className={cn(
 "absolute right-0 bottom-0 rounded-full border-2 border-blue-300/40",
 statusSizes[size],
 statusColors[status],
 )}
 />
 )}
 </div>
 </div>
 );
 },
 ),
);

GlassAvatar.displayName = "GlassAvatar";

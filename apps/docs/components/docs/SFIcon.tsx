import React from "react";

interface SFIconProps {
  name: string;
  size?: "sm" | "md" | "lg" | "xl";
  weight?:
    | "ultralight"
    | "thin"
    | "light"
    | "regular"
    | "medium"
    | "semibold"
    | "bold"
    | "heavy"
    | "black";
  className?: string;
  color?: string;
}

export default function SFIcon({
  name,
  size = "md",
  weight = "regular",
  className = "",
  color,
}: SFIconProps) {
  const iconClasses = [
    "sf-icon",
    `sf-icon-${size}`,
    `sf-icon-${weight}`,
    `sf-${name}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span
      className={iconClasses}
      style={color ? { color } : undefined}
      aria-hidden="true"
    />
  );
}

// Text with Icon Component
interface SFIconTextProps {
  icon: string;
  children: React.ReactNode;
  iconSize?: "sm" | "md" | "lg" | "xl";
  iconWeight?:
    | "ultralight"
    | "thin"
    | "light"
    | "regular"
    | "medium"
    | "semibold"
    | "bold"
    | "heavy"
    | "black";
  className?: string;
  iconColor?: string;
}

export function SFIconText({
  icon,
  children,
  iconSize = "md",
  iconWeight = "regular",
  className = "",
  iconColor,
}: SFIconTextProps) {
  return (
    <span className={`sf-icon-text ${className}`}>
      <SFIcon
        name={icon}
        size={iconSize}
        weight={iconWeight}
        color={iconColor}
      />
      <span>{children}</span>
    </span>
  );
}

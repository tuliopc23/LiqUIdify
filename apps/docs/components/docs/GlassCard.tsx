import type React from "react";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  title?: string;
  icon?: string;
}

export default function GlassCard({
  children,
  className = "",
  hover = true,
  title,
  icon,
}: GlassCardProps) {
  return (
    <div
      className={`glass-card ${hover ? "hover:transform hover:-translate-y-1" : ""} ${className}`}
    >
      {title && (
        <div className="mintlify-card-title">
          {icon && <span className={`sf-icon ${icon}`}></span>}
          {title}
        </div>
      )}
      <div className="mintlify-card-description">{children}</div>
    </div>
  );
}

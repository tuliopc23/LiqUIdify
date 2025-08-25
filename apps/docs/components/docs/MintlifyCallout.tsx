import React from "react";
import SFIcon from "./SFIcon";

interface MintlifyCalloutProps {
  type?: "info" | "warning" | "error" | "success";
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const calloutConfig = {
  info: { icon: 'info', iconColor: 'var(--liquid-primary)' },
  warning: { icon: 'exclamation', iconColor: 'var(--lg-warning)' },
  error: { icon: 'xmark', iconColor: 'var(--lg-error)' },
  success: { icon: 'checkmark', iconColor: 'var(--lg-success)' }
};

export default function MintlifyCallout({
  type = "info",
  title,
  children,
  className = "",
}: MintlifyCalloutProps) {
  const config = calloutConfig[type];

  return (
    <div className={`mintlify-callout mintlify-callout-${type} ${className}`}>
      <div className="mintlify-callout-icon">
        <SFIcon
          name={config.icon}
          size="lg"
          weight="medium"
          color={config.iconColor}
        />
      </div>
      <div className="mintlify-callout-content">
        {title && <div className="font-medium text-title3 mb-2">{title}</div>}
        <div>{children}</div>
      </div>
    </div>
  );
}

import React from "react";
import SFIcon from "./SFIcon";

interface MintlifyFrameProps {
  title?: string;
  icon?: string;
  children: React.ReactNode;
  className?: string;
  headerClassName?: string;
}

export default function MintlifyFrame({
  title,
  icon,
  children,
  className = "",
  headerClassName = "",
}: MintlifyFrameProps) {
  return (
    <div className={`mintlify-frame ${className}`}>
      {title && (
        <div className={`mintlify-frame-header ${headerClassName}`}>
          {icon && <SFIcon name={icon} size="sm" weight="medium" />}
          {title}
        </div>
      )}
      <div className="mintlify-frame-content">{children}</div>
    </div>
  );
}

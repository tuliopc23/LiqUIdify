import React from "react";
import { GlassButton } from "liquidify";
import { applyContrast, toggleContrast, ContrastMode } from "../../lib/theme";

export const ContrastToggle: React.FC = () => {
  const [mode, setMode] = React.useState<ContrastMode>(
    () => (document.documentElement.getAttribute("data-contrast") as ContrastMode) || "normal"
  );

  function onClick() {
    const next = toggleContrast(mode);
    setMode(next);
    applyContrast(next);
  }

  const label = mode === "normal" ? "Contrast: Normal" : "Contrast: Increased";

  return (
    <GlassButton aria-label="Toggle contrast" variant="secondary" size="small" onClick={onClick} className="button-lg">
      {label}
    </GlassButton>
  );
};

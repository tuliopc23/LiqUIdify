import React from "react";
import { GlassButton } from "liquidify";
import { applyTheme, nextTheme, ThemeMode } from "../../lib/theme";

export const ThemeToggle: React.FC = () => {
  const [mode, setMode] = React.useState<ThemeMode>(() =>
    (document.documentElement.getAttribute("data-theme") as ThemeMode) || "auto"
  );

  function onClick() {
    const next = nextTheme(mode);
    setMode(next);
    applyTheme(next);
  }

  const label = mode === "auto" ? "Theme: Auto" : mode === "light" ? "Theme: Light" : "Theme: Dark";

  return (
    <GlassButton aria-label="Toggle theme" variant="secondary" size="small" onClick={onClick} className="button-lg">
      {label}
    </GlassButton>
  );
};

import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { css, cx } from "../../../../styled-system/css";
import { Button } from "liquidify";

function applyReducedTransparency(enabled: boolean) {
  if (typeof document !== "undefined") {
    if (enabled) {
      document.documentElement.setAttribute("data-reduced-transparency", "true");
    } else {
      document.documentElement.removeAttribute("data-reduced-transparency");
    }
  }
}

export function GlassHeader() {
  const [reduced, setReduced] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    const saved = window.localStorage.getItem("reduced-transparency");
    if (saved != null) return saved === "true";
    // Default to system preference
    return window.matchMedia && window.matchMedia("(prefers-reduced-transparency: reduce)").matches;
  });

  useEffect(() => {
    applyReducedTransparency(reduced);
    try {
      window.localStorage.setItem("reduced-transparency", String(reduced));
    } catch {}
  }, [reduced]);

  const headerClass = css({
    position: "sticky",
    top: 0,
    display: "flex",
    alignItems: "center",
    gap: 4,
    px: 6,
    py: 4,
    bgColor: "colors.glass.subtle.bg",
    backdropFilter: "saturate(140%) blur(12px)",
    borderBottom: "1px solid",
    borderColor: "colors.glass.medium.border",
    boxShadow: "token(shadows.glass.sm)",
    zIndex: 10,
    // Fallbacks for browsers without backdrop-filter
    "@supports not ((-webkit-backdrop-filter: none) or (backdrop-filter: none))": {
      bgColor: "rgba(20,20,20,0.7)",
    },
    // Respect user preference
    '[data-reduced-transparency="true"] &': {
      backdropFilter: "none",
      bgColor: "rgba(20,20,20,0.85)",
    },
  });

  const brandClass = css({
    fontFamily: "token(fonts.display)",
    fontWeight: "token(fontWeights.semibold)",
    fontSize: "token(fontSizes.xl)",
    letterSpacing: "token(letterSpacings.tight)",
    mr: 2,
  });

  const navClass = css({
    display: "flex",
    alignItems: "center",
    gap: 4,
    "& a": {
      color: "white",
      textDecoration: "none",
      fontWeight: 500,
      opacity: 0.9,
      transition: "color 0.2s ease, opacity 0.2s ease",
      "&:hover": { opacity: 1 },
      "&.active": { color: "token(colors.accent.primary)" },
    },
    marginLeft: "auto",
  });

  return (
    <header className={headerClass}>
      <strong className={brandClass}>LiqUIdify</strong>
      <nav className={navClass}>
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/components">Components</NavLink>
        <Button
          variant="secondary"
          onClick={() => setReduced((v) => !v)}
          className={css({ ml: 4 })}
        >
          {reduced ? "Transparency Off" : "Transparency On"}
        </Button>
      </nav>
    </header>
  );
}

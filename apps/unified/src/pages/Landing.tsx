import { Button } from "liquidify";
import { css } from "../../../../styled-system/css";
import { usePageTitle } from "../hooks/usePageTitle";

export default function Landing() {
  usePageTitle("LiqUIdify — Home");

  const heroClass = css({
    minH: "calc(100dvh - 80px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    bgGradient: "linear(to-b, #0b0f1a, #0e1016)",
    px: 4,
  });

  const cardClass = css({
    w: "full",
    maxW: "lg",
    p: 8,
    borderRadius: "xl",
    color: "token(colors.text.glass.primary)",
    background: "token(colors.glass.bg)",
    backdropFilter: "blur(token(blurs.glass.md))",
    border: "1px solid token(colors.glass.border)",
    boxShadow: "token(shadows.glass.base)",
    // Fallback & accessibility
    '@supports not ((-webkit-backdrop-filter: none) or (backdrop-filter: none))': {
      backgroundColor: "rgba(20,20,20,0.7)",
    },
    '[data-reduced-transparency="true"] &': {
      backdropFilter: "none",
      backgroundColor: "rgba(20,20,20,0.85)",
    },
  });

  const kickerClass = css({ fontSize: "sm", color: "token(colors.text.glass.muted)", mb: 2 });
  const titleClass = css({ fontSize: "4xl", fontWeight: "bold", lineHeight: 1.2, mb: 4, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif" });
  const bodyClass = css({ fontSize: "md", color: "token(colors.text.glass.secondary)", mb: 6 });
  const actionsClass = css({ display: "flex", gap: 4, flexWrap: "wrap" });

  return (
    <main id="main-content" className={heroClass}>
      <div className={cardClass}>
        <p className={kickerClass}>New Release</p>
        <h1 className={titleClass}>Liquid Glass for the Web</h1>
        <p className={bodyClass}>
          A unified demo app featuring a marketing page and a live components gallery.
        </p>
        <div className={actionsClass}>
          <Button>Get Started</Button>
          <a href="/components" style={{ textDecoration: "none" }}>
            <Button variant="secondary">Explore Components</Button>
          </a>
        </div>
      </div>
    </main>
  );
}

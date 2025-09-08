import { Button, LiquidGlass } from "liquidify";
import { css } from "../../../../styled-system/css";
import { usePageTitle } from "../hooks/usePageTitle";

export default function NotFound() {
  usePageTitle("LiqUIdify — Page Not Found");

  const containerClass = css({
    minH: "calc(100dvh - 80px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    bgGradient: "linear(to-b, #0b0f1a, #0e1016)",
    px: 4,
  });

  const cardClass = css({
    w: "full",
    maxW: "md",
    p: 8,
    borderRadius: "xl",
    color: "token(colors.text.glass.primary)",
    textAlign: "center",
    // Fallback & accessibility
    '@supports not ((-webkit-backdrop-filter: none) or (backdrop-filter: none))': {
      backgroundColor: "rgba(20,20,20,0.7)",
    },
    '[data-reduced-transparency="true"] &': {
      backdropFilter: "none",
      backgroundColor: "rgba(20,20,20,0.85)",
    },
  });

  const errorCodeClass = css({ 
    fontSize: "6xl", 
    fontWeight: "bold", 
    lineHeight: 1, 
    mb: 4, 
    color: "token(colors.text.glass.muted)",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif" 
  });
  
  const titleClass = css({ 
    fontSize: "2xl", 
    fontWeight: "semibold", 
    lineHeight: 1.2, 
    mb: 4, 
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif" 
  });
  
  const bodyClass = css({ 
    fontSize: "md", 
    color: "token(colors.text.glass.secondary)", 
    mb: 6 
  });
  
  const actionsClass = css({ 
    display: "flex", 
    gap: 4, 
    justifyContent: "center", 
    flexWrap: "wrap" 
  });

  return (
    <main id="main-content" className={containerClass}>
      <LiquidGlass intensity="medium" className={cardClass}>
        <div className={errorCodeClass}>404</div>
        <h1 className={titleClass}>Page Not Found</h1>
        <p className={bodyClass}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className={actionsClass}>
          <a href="/" style={{ textDecoration: "none" }}>
            <Button>Go Home</Button>
          </a>
          <a href="/components" style={{ textDecoration: "none" }}>
            <Button variant="secondary">View Components</Button>
          </a>
        </div>
      </LiquidGlass>
    </main>
  );
}

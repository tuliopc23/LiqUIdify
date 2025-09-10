import { Button, Switch } from "liquidify";
import { css } from "../../../../styled-system/css";
import { usePageTitle } from "../hooks/usePageTitle";

export default function Components() {
  usePageTitle("LiqUIdify — Components");

  const pageClass = css({ px: 6, py: 6 });
  const titleClass = css({ mt: 0, mb: 6, fontSize: "3xl", fontWeight: "semibold" });
  const gridClass = css({
    display: "grid",
    gap: 6,
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  });
  const cardClass = css({
    p: 6,
    borderRadius: "xl",
    color: "token(colors.text.glass.primary)",
    background: "token(colors.glass.bg)",
    backdropFilter: "blur(token(blurs.glass.md))",
    border: "1px solid",
    borderColor: "token(colors.glass.border)",
    boxShadow: "token(shadows.glass.base)",
    '@supports not ((-webkit-backdrop-filter: none) or (backdrop-filter: none))': {
      backgroundColor: "rgba(20,20,20,0.7)",
    },
    '[data-reduced-transparency="true"] &': {
      backdropFilter: "none",
      backgroundColor: "rgba(20,20,20,0.85)",
    },
  });
  const h3Class = css({ fontSize: "xl", mb: 4, fontWeight: 600 });
  const rowClass = css({ display: "flex", gap: 3, flexWrap: "wrap" });

  return (
    <main id="main-content" className={pageClass}>
      <h2 className={titleClass}>Components Gallery</h2>
      <div className={gridClass}>
        <div className={cardClass}>
          <h3 className={h3Class}>Button</h3>
          <div className={rowClass}>
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
          </div>
        </div>
        <div className={cardClass}>
          <h3 className={h3Class}>Switch</h3>
          <Switch defaultChecked />
        </div>
      </div>
    </main>
  );
}

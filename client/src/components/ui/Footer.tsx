import React from "react";
import { ThemeToggle } from "./ThemeToggle";
import { ContrastToggle } from "./ContrastToggle";

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-grid" aria-label="Footer navigation">
          <nav aria-label="Product">
            <h3>Product</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li><a href="#showcase">Components</a></li>
              <li><a href="#install">Install</a></li>
              <li><a href="https://docs.useliquidify.dev" rel="noopener">Docs</a></li>
            </ul>
          </nav>
          <nav aria-label="Resources">
            <h3>Resources</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li><a href="https://liquidify-storybook.vercel.app" rel="noopener">Storybook</a></li>
              <li><a href="https://github.com/tuliopc23/LiqUIdify" rel="noopener">GitHub</a></li>
            </ul>
          </nav>
          <nav aria-label="Community">
            <h3>Community</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li><a href="https://x.com/tuliopc23" rel="noopener">Twitter</a></li>
              <li><a href="https://github.com/sponsors/tuliopc23" rel="noopener">Sponsor</a></li>
            </ul>
          </nav>
          <div>
            <h3>Preferences</h3>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <ThemeToggle />
              <ContrastToggle />
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "var(--space-8)" }}>
          <small>© {year} Liquidify. All rights reserved.</small>
          <small><a href="#home">Back to top</a></small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

export const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-grid" aria-label="Footer navigation">
          <nav aria-label="Product">
            <h3>Product</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li>
                <a href="#features">Components</a>
              </li>
              <li>
                <a href="#install">Install</a>
              </li>
              <li>
                <a href="https://docs.useliquidify.dev" rel="noopener">
                  Docs
                </a>
              </li>
            </ul>
          </nav>
          <nav aria-label="Resources">
            <h3>Resources</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li>
                <a href="https://liquidify-storybook.vercel.app" rel="noopener">
                  Storybook
                </a>
              </li>
              <li>
                <a href="https://github.com/tuliopc23/LiqUIdify" rel="noopener">
                  GitHub
                </a>
              </li>
            </ul>
          </nav>
          <nav aria-label="Community">
            <h3>Community</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li>
                <a href="https://x.com/tuliopc23" rel="noopener">
                  Twitter
                </a>
              </li>
              <li>
                <a href="https://github.com/sponsors/tuliopc23" rel="noopener">
                  Sponsor
                </a>
              </li>
            </ul>
          </nav>
          <div>
            <h3>About</h3>
            <p style={{ fontSize: "var(--font-size-sm)", lineHeight: 1.4 }}>
              A refined React component library inspired by Apple's latest
              design language.
            </p>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "var(--space-8)",
          }}
        >
          <small>© {year} Liquidify. All rights reserved.</small>
          <small>
            <a href="#home">Back to top</a>
          </small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

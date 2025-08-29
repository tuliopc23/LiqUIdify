export const Header = () => {
  return (
    <header className="glass-nav" role="banner">
      <nav className="container" aria-label="Primary">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 0",
          }}
        >
          <a
            href="#home"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: 8,
            }}
            aria-label="Liquidify home"
          >
            <span
              aria-hidden="true"
              style={{
                width: 24,
                height: 24,
                borderRadius: 8,
                background: "linear-gradient(135deg,#0a84ff,#5ac8fa)",
                boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.4)",
              }}
            />
            <strong
              style={{ color: "var(--color-text)", letterSpacing: "-0.01em" }}
            >
              Liquidify
            </strong>
          </a>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <a
              href="https://docs.useliquidify.dev"
              rel="noopener"
              className="nav-link"
            >
              Docs
            </a>
            <a
              href="https://liquidify-storybook.vercel.app"
              rel="noopener"
              className="nav-link"
            >
              Components
            </a>
            <a
              href="https://github.com/tuliopc23/LiqUIdify"
              rel="noopener"
              className="nav-link"
            >
              GitHub
            </a>
            <a href="#install" className="glass-button glass-button--primary">
              Install
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

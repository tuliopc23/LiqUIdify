export const Install = () => {
  return (
    <section id="install" className="section" aria-labelledby="install-heading">
      <div className="container">
        <h2 id="install-heading">Installation & Quick Start</h2>
        <div className="grid grid-2" style={{ marginTop: "var(--space-4)" }}>
          <div className="glass-surface" style={{ padding: "var(--space-6)" }}>
            <h3>Install</h3>
            <pre style={{ marginBottom: "var(--space-4)" }} aria-label="Install with bun">
              <code>bun add liquidify</code>
            </pre>
            <pre aria-label="Install with npm">
              <code>npm i liquidify</code>
            </pre>
          </div>
          <div className="glass-surface" style={{ padding: "var(--space-6)" }}>
            <h3>Usage</h3>
            <pre style={{ fontSize: "0.85rem", lineHeight: 1.4, overflow: "auto" }}>
              <code>{`import { GlassButton, ThemeProvider, LiquidGlassDefs } from 'liquidify';
import 'liquidify/css';

export function App() {
  return (
    <ThemeProvider>
      <LiquidGlassDefs />
      <GlassButton variant="primary">Hello</GlassButton>
    </ThemeProvider>
  );
}`}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Install;
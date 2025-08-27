import React from "react";
import Header from "../components/ui/Header";
import Hero from "../components/ui/Hero";
import Showcase from "../components/ui/Showcase";
import CTA from "../components/ui/CTA";
import Footer from "../components/ui/Footer";
import Card from "../components/ui/Card";

const highlights = [
  {
    title: "Liquid Glass Surfaces",
    description: "Build depth with translucent, tactile layers.",
    href: "#showcase",
    icon: <span aria-hidden>💧</span>,
  },
  {
    title: "Accessible by Design",
    description: "Meets contrast and motion-reduction best practices.",
    href: "#",
    icon: <span aria-hidden>♿</span>,
  },
  {
    title: "Light, Dark, High Contrast",
    description: "Theme tokens for every environment.",
    href: "#",
    icon: <span aria-hidden>🌗</span>,
  },
  {
    title: "Production‑Ready",
    description: "Strict TypeScript, tiny bundles, first‑class DX.",
    href: "#",
    icon: <span aria-hidden>⚡</span>,
  },
];

const Install: React.FC = () => {
  return (
    <section id="install" className="section" aria-labelledby="install-heading">
      <div className="container">
        <h2 id="install-heading">Installation & Quick Start</h2>
        <div className="grid grid-2" style={{ marginTop: "var(--space-4)" }}>
          <div>
            <h3>Install</h3>
            <pre aria-label="Install with bun"><code>bun add liquidify</code></pre>
            <pre aria-label="Install with npm"><code>npm i liquidify</code></pre>
          </div>
          <div>
            <h3>Usage</h3>
            <pre><code>{`import { GlassButton, UnifiedGlassProvider, LiquidGlassDefs } from 'liquidify';
import 'liquidify/css';

export function App() {
  return (
    <UnifiedGlassProvider>
      <LiquidGlassDefs />
      <GlassButton variant="primary">Hello</GlassButton>
    </UnifiedGlassProvider>
  );
}`}</code></pre>
          </div>
        </div>
      </div>
    </section>
  );
};

const Highlights: React.FC = () => {
  return (
    <section className="section" aria-labelledby="highlights-heading">
      <div className="container">
        <h2 id="highlights-heading">What’s New</h2>
        <div className="grid grid-2" style={{ marginTop: "var(--space-4)" }}>
          {highlights.map((h) => (
            <Card key={h.title} title={h.title} description={h.description} icon={h.icon} href={h.href} />
          ))}
        </div>
      </div>
    </section>
  );
};

const LandingPage: React.FC = () => {
  return (
    <main>
      <Header />
      <Hero />
      <Highlights />
      <Showcase />
      <Install />
      <CTA />
      <Footer />
    </main>
  );
};

export default LandingPage;

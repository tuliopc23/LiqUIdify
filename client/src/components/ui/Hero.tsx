import React from "react";
import { GlassButton, GlassSurface } from "liquidify";

export const Hero: React.FC = () => {
  return (
    <section id="home" className="section" style={{ position: "relative", minHeight: "80vh", display: "grid", placeItems: "center" }}>
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-orb hero-orb--1" />
        <div className="hero-orb hero-orb--2" />
      </div>
      <div className="container">
        <GlassSurface className="glass-surface" asChild>
          <div style={{ padding: "clamp(24px, 4vw, 48px)", textAlign: "center" }}>
            <h1>Liquidify — Apple-grade glass UI for the web</h1>
            <p style={{ maxWidth: 720, marginInline: "auto" }}>
              A refined React component library inspired by Apple’s latest design language.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: "var(--space-6)" }}>
              <GlassButton variant="primary" size="large" className="button-lg" asChild>
                <a href="#install">Get started</a>
              </GlassButton>
              <GlassButton variant="secondary" size="large" className="button-lg" asChild>
                <a href="#showcase">Explore components</a>
              </GlassButton>
            </div>
          </div>
        </GlassSurface>
      </div>
    </section>
  );
};

export default Hero;

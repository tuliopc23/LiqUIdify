import React from "react";
import { GlassButton, GlassSurface } from "liquidify";

export const CTA: React.FC = () => {
  return (
    <section className="section" aria-labelledby="cta-heading">
      <div className="container">
        <GlassSurface asChild className="glass-surface">
          <div className="cta-banner">
            <h2 id="cta-heading" style={{ marginBottom: "var(--space-4)" }}>Build faster with Liquidify</h2>
            <p style={{ margin: 0, opacity: 0.95 }}>Production-ready components with Apple-inspired glass aesthetics.</p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: "var(--space-6)" }}>
              <GlassButton asChild variant="primary" size="large" className="button-lg">
                <a href="#install">Install Now</a>
              </GlassButton>
            </div>
          </div>
        </GlassSurface>
      </div>
    </section>
  );
};

export default CTA;

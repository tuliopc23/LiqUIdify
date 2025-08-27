import React from "react";
import { GlassCard, GlassButton, GlassBadge, GlassSurface } from "liquidify";
import Tabs, { TabItem } from "./Tabs";

const categories: TabItem[] = [
  { id: "buttons", label: "Buttons" },
  { id: "cards", label: "Cards" },
  { id: "forms", label: "Forms" },
  { id: "overlays", label: "Overlays" },
  { id: "navigation", label: "Navigation" },
  { id: "utilities", label: "Utilities" },
];

export const Showcase: React.FC = () => {
  const [tab, setTab] = React.useState<string>(categories[0].id);

  return (
    <section id="showcase" className="section">
      <div className="container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-4)" }}>
          <h2 style={{ margin: 0 }}>Component Showcase</h2>
          <div style={{ display: "flex", gap: 8 }}>
            {/* Additional toggles could be placed here if desired */}
          </div>
        </div>

        <Tabs items={categories} value={tab} onChange={setTab} />

        <div className="grid grid-3" style={{ marginTop: "var(--space-6)" }}>
          {tab === "buttons" && (
            <>
              <GlassCard asChild className="glass-surface">
                <div style={{ padding: "var(--space-6)", display: "grid", gap: 12 }}>
                  <GlassButton variant="primary">Primary</GlassButton>
                  <GlassButton variant="secondary">Secondary</GlassButton>
                  <GlassButton variant="ghost">Ghost</GlassButton>
                </div>
              </GlassCard>
              <GlassCard asChild className="glass-surface">
                <div style={{ padding: "var(--space-6)", display: "grid", gap: 12 }}>
                  <GlassButton size="small">Small</GlassButton>
                  <GlassButton>Medium</GlassButton>
                  <GlassButton size="large" className="button-lg">Large</GlassButton>
                </div>
              </GlassCard>
              <GlassCard asChild className="glass-surface">
                <div style={{ padding: "var(--space-6)", display: "grid", gap: 12 }}>
                  <GlassButton disabled>Disabled</GlassButton>
                  <GlassButton loading>Loading</GlassButton>
                  <GlassButton leftIcon={<span aria-hidden>⌘</span>}>With Icon</GlassButton>
                </div>
              </GlassCard>
            </>
          )}

          {tab === "cards" && (
            <>
              {[1, 2, 3].map((i) => (
                <GlassCard key={i} asChild className="glass-surface">
                  <div style={{ padding: "var(--space-6)" }}>
                    <h3>GlassCard {i}</h3>
                    <p>Translucent surfaces with pleasant elevation and outline.</p>
                  </div>
                </GlassCard>
              ))}
            </>
          )}

          {tab === "utilities" && (
            <>
              <GlassCard asChild className="glass-surface">
                <div style={{ padding: "var(--space-6)", display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                  <GlassBadge color="blue">New</GlassBadge>
                  <GlassBadge color="green">Stable</GlassBadge>
                  <GlassBadge color="orange">Beta</GlassBadge>
                  <GlassBadge color="red">Deprecated</GlassBadge>
                </div>
              </GlassCard>
              <GlassSurface asChild className="glass-surface">
                <div style={{ padding: "var(--space-6)" }}>
                  <h3>GlassSurface</h3>
                  <p>Use surfaces for larger panels with consistent blur and outline.</p>
                </div>
              </GlassSurface>
              <GlassCard asChild className="glass-surface">
                <div style={{ padding: "var(--space-6)" }}>
                  <h3>Tokens</h3>
                  <p>Colors, spacing, and elevation are exposed via CSS variables.</p>
                </div>
              </GlassCard>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Showcase;

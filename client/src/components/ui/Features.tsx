const features = [
  {
    title: "Liquid Glass Surfaces",
    description: "Build depth with translucent, tactile layers.",
    icon: "💧",
  },
  {
    title: "Accessible by Design",
    description: "Meets contrast and motion-reduction best practices.",
    icon: "♿",
  },
  {
    title: "Light, Dark, High Contrast",
    description: "Theme tokens for every environment.",
    icon: "🌗",
  },
  {
    title: "Production‑Ready",
    description: "Strict TypeScript, tiny bundles, first‑class DX.",
    icon: "⚡",
  },
];

export const Features = () => {
  return (
    <section id="features" className="section" aria-labelledby="features-heading">
      <div className="container">
        <h2 id="features-heading">What's New</h2>
        <div className="grid grid-2" style={{ marginTop: "var(--space-4)" }}>
          {features.map((feature) => (
            <div key={feature.title} className="glass-surface" style={{ padding: "var(--space-6)" }}>
              <div aria-hidden style={{ marginBottom: "var(--space-4)", fontSize: "2rem" }}>
                {feature.icon}
              </div>
              <h3 style={{ marginBottom: "var(--space-2)", fontSize: "var(--font-size-h3)" }}>
                {feature.title}
              </h3>
              <p style={{ margin: 0 }}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
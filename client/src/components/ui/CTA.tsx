export const CTA = () => {
  return (
    <section className="section" aria-labelledby="cta-heading">
      <div className="container">
        <div className="glass-surface cta-banner">
          <h2 id="cta-heading" style={{ marginBottom: "var(--space-4)" }}>
            Build faster with Liquidify
          </h2>
          <p style={{ margin: 0, opacity: 0.95 }}>
            Production-ready components with Apple-inspired glass aesthetics.
          </p>
          <div
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "center",
              marginTop: "var(--space-6)",
            }}
          >
            <a
              href="#install"
              className="glass-button glass-button--primary glass-button--lg"
            >
              Install Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;

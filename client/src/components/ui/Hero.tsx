export const Hero = () => {
  return (
    <section 
      id="home" 
      className="section hero" 
      style={{ 
        position: "relative", 
        minHeight: "80vh", 
        display: "grid", 
        placeItems: "center" 
      }}
    >
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-orb hero-orb--1" />
        <div className="hero-orb hero-orb--2" />
      </div>
      <div className="container">
        <div className="glass-surface" style={{ padding: "clamp(24px, 4vw, 48px)", textAlign: "center" }}>
          <h1>Liquidify — Apple-grade glass UI for the web</h1>
          <p style={{ maxWidth: 720, marginInline: "auto" }}>
            A refined React component library inspired by Apple's latest design language.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: "var(--space-6)", flexWrap: "wrap" }}>
            <a href="#install" className="glass-button glass-button--primary glass-button--lg">
              Get started
            </a>
            <a href="#features" className="glass-button glass-button--secondary glass-button--lg">
              Explore components
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
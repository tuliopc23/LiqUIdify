import { Button } from "liquidify";

export default function Landing() {
  return (
    <main style={{
      minHeight: "calc(100dvh - 64px)",
      display: "grid",
      placeItems: "center",
      background: "linear-gradient(180deg, #0b0f1a 0%, #0e1016 100%)"
    }}>
      <div style={{
        position: "relative",
        padding: 32,
        width: "min(680px, 92vw)",
        borderRadius: 16,
        background: "rgba(255,255,255,0.08)",
        border: "1px solid rgba(255,255,255,0.18)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
        backdropFilter: "saturate(140%) blur(12px)",
        WebkitBackdropFilter: "saturate(140%) blur(12px)",
      }}>
        <h1 style={{margin: 0, fontSize: 40, lineHeight: 1.1}}>Liquid Glass for the Web</h1>
        <p style={{opacity: 0.85, marginTop: 12}}>
          A compact demo of LiqUIdify with a unified app: landing at <code>/</code> and a live
          components gallery at <code>/components</code>.
        </p>
        <div style={{display: "flex", gap: 12, marginTop: 16}}>
          <Button>Get Started</Button>
          <a href="/components" style={{textDecoration: "none"}}><Button variant="secondary">Explore Components</Button></a>
        </div>
      </div>
    </main>
  );
}

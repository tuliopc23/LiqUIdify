import { Button, Switch } from "liquidify";

export default function Components() {
  return (
    <main style={{padding: 24}}>
      <h2 style={{marginTop: 0}}>Components Gallery</h2>
      <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 16}}>
        <section style={{padding: 20, borderRadius: 16, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.18)", backdropFilter: "blur(10px)"}}>
          <h3>Button</h3>
          <div style={{display: "flex", gap: 8, flexWrap: "wrap"}}>
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
          </div>
        </section>
        <section style={{padding: 20, borderRadius: 16, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.18)", backdropFilter: "blur(10px)"}}>
          <h3>Switch</h3>
          <Switch defaultChecked />
        </section>
      </div>
    </main>
  );
}

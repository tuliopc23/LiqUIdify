import { LiquidGlassDefs, Button, Card } from "@liquidify/components";

export default function App() {
  return (
    <div
      className="liquidify-app"
      style={{ padding: "2rem", minHeight: "100vh" }}
    >
      <LiquidGlassDefs />
      <Card
        variant="elevated"
        style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}
      >
        <h1>LiqUIdify Landing Page</h1>
        <p>Testing basic component rendering...</p>
        <Button variant="primary" size="large">
          Get Started
        </Button>
      </Card>
    </div>
  );
}

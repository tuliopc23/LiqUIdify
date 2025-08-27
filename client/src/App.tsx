import LandingPage from "./pages/index";
import { LiquidGlassDefs } from "@liquidify/components";

export default function App() {
  return (
    <div className="liquidify-app">
      <LiquidGlassDefs />
      <LandingPage />
    </div>
  );
}
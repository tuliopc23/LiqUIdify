// client/src/App.tsx
import React from "react";
import LandingPage from "./pages/index";
import { UnifiedGlassProvider, LiquidGlassDefs } from "liquidify";

export default function App() {
  return (
    <UnifiedGlassProvider>
      {/* Injects SVG filter defs once so CSS filter:url(#...) works */}
      <LiquidGlassDefs />
      <LandingPage />
    </UnifiedGlassProvider>
  );
}

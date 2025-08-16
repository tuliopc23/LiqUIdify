// filepath: snippets/preview/ProviderWrapper.jsx
import React from "react";
// Import library styles (exported via "liquidify/styles")
import "liquidify/styles";

export default function ProviderWrapper({ children }) {
  // If a ThemeProvider is required later, wrap here.
  return <>{children}</>;
}

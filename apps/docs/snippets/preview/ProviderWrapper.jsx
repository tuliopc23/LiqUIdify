import React from "react";
import { ThemeProvider } from "liquidify";
import "liquidify/styles";

export default function ProviderWrapper({ children }) {
  return <ThemeProvider defaultTheme="system">{children}</ThemeProvider>;
}

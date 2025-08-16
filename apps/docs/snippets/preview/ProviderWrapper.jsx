import React from "/snippets/react";
import { ThemeProvider } from "/snippets/liquidify";
import "/snippets/liquidify-styles";

export default function ProviderWrapper({ children }) {
  return <ThemeProvider defaultTheme="system">{children}</ThemeProvider>;
}

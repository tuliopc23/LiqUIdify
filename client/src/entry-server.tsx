// client/src/entry-server.tsx
import React from "react";
import { renderToString } from "react-dom/server";
import App from "./App";

export function render(url: string): string {
  const html = renderToString(<App />);
  return html;
}

export function renderWithData(
  url: string,
  data: any,
): { html: string; data: any } {
  const html = renderToString(<App />);
  return { html, data };
}

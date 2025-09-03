import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
// Panda: generate tokens/recipes/utilities via PostCSS
import "./app.css";
// For dev alias, ensure library Panda CSS is present too
import "liquidify/styles";
// Initialize theme (persisted, with system fallback)
const html = document.documentElement;
const stored = typeof localStorage !== "undefined" ? localStorage.getItem("theme") : null;
if (!html.dataset.theme) {
  const initial = stored ?? (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  html.dataset.theme = initial as "dark" | "light";
}
// Library CSS export is optional here; components are Panda-styled via recipes.

const root = createRoot(document.getElementById("root")!);
root.render(<App />);

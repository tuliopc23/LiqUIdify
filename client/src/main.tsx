import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "liquidify/css";
import "./styles/tokens.css";
import "./styles/global.css";
import { initThemeFromStorage } from "./lib/theme";

initThemeFromStorage();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./app.css";
// Library CSS export is optional here; components are Panda-styled via recipes.

const root = createRoot(document.getElementById("root")!);
root.render(<App />);

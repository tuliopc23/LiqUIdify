import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Load Panda-generated styles via library alias
import "liquidify/styles";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

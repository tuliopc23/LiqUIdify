import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Landing from "./pages/Landing";
import Components from "./pages/Components";

export default function App() {
  return (
    <BrowserRouter>
      <header style={{
        position: "sticky", top: 0, display: "flex", gap: 16, padding: 16,
        backdropFilter: "saturate(140%) blur(10px)", WebkitBackdropFilter: "saturate(140%) blur(10px)",
        borderBottom: "1px solid rgba(255,255,255,0.18)"
      }}>
        <strong>LiqUIdify</strong>
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/components">Components</NavLink>
      </header>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/components" element={<Components />} />
      </Routes>
    </BrowserRouter>
  );
}

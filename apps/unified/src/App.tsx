import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Components from "./pages/Components";
import { GlassHeader } from "./components/GlassHeader";

export default function App() {
  return (
    <BrowserRouter>
      <GlassHeader />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/components" element={<Components />} />
      </Routes>
    </BrowserRouter>
  );
}

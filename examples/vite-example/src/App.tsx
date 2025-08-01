import { Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Components from "./pages/Components";
import Playground from "./pages/Playground";
import About from "./pages/About";

function App() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/components" element={<Components />} />
          <Route path="/playground" element={<Playground />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Layout>
    </motion.div>
  );
}

export default App;

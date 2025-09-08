import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { GlassHeader } from "./components/GlassHeader";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { SkipToContentLink } from "./components/SkipToContentLink";

// Lazy load pages for code splitting
const Landing = lazy(() => import("./pages/Landing"));
const Components = lazy(() => import("./pages/Components"));
const NotFound = lazy(() => import("./pages/NotFound"));

export default function App() {
  return (
    <BrowserRouter>
      <SkipToContentLink />
      <GlassHeader />
      <ErrorBoundary>
        <Suspense fallback={
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "50vh",
            fontSize: "18px",
            color: "#888"
          }}>
            Loading...
          </div>
        }>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/components" element={<Components />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

import { createContext, type ReactNode, useContext, useRef } from "react";

interface LiveRegionContextValue {
  announce: (message: string, priority?: "polite" | "assertive") => void;
}

const LiveRegionContext = createContext<LiveRegionContextValue | undefined>(undefined);

export const useLiveRegion = () => {
  const context = useContext(LiveRegionContext);
  if (!context) {
    throw new Error("useLiveRegion must be used within a GlassLiveRegionProvider");
  }
  return context;
};

interface GlassLiveRegionProviderProps {
  children: ReactNode;
}

export function _GlassLiveRegionProvider({ children }: GlassLiveRegionProviderProps) {
  const politeRef = useRef<HTMLDivElement>(null);
  const assertiveRef = useRef<HTMLDivElement>(null);

  const announce = (message: string, priority: "polite" | "assertive" = "polite") => {
    const region = priority === "assertive" ? assertiveRef.current : politeRef.current;
    if (region) {
      // Clear and set the message to ensure screen readers announce it
      region.textContent = "";
      setTimeout(() => {
        region.textContent = message;
      }, 100);
    }
  };

  return (
    <LiveRegionContext.Provider value={{ announce }}>
      {children}
      <div ref={politeRef} aria-live="polite" aria-atomic="true" className="sr-only" />
      <div ref={assertiveRef} aria-live="assertive" aria-atomic="true" className="sr-only" />
    </LiveRegionContext.Provider>
  );
}

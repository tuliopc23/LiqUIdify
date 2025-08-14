// Shared Sandpack defaults and helpers for docs showcase
export type Files = Record<
  string,
  string | { code: string; hidden?: boolean; active?: boolean }
>;

export const DEFAULT_DEPS: Record<string, string> = {
  react: "18",
  "react-dom": "18",
  liquidify: "1.3.3",
};

export const DEFAULT_CSS: string[] = [
  "/styles/liquid-glass.css",
  "/styles/visual-enhancements.css",
  "/styles/enhanced-typography.css",
  "/styles/theme-backgrounds.css",
];

// Custom Sandpack themes aligned with Liquid Glass brand (blue) and rounded UI
export const LIQUID_GLASS_LIGHT_THEME = {
  colors: {
    accent: "#007AFF",
    surface1: "#ffffff",
    surface2: "#f4f6fb",
    surface3: "#eef2f7",
    base: "#0d1117",
    clickable: "#0b66ff",
    hover: "#2b8cff",
    disabled: "#9aa4b2",
    error: "#FF9500",
  },
  syntax: {
    plain: "#0f172a",
    comment: { color: "#94a3b8", fontStyle: "italic" },
    keyword: "#7c3aed",
    tag: "#0ea5e9",
    punctuation: "#0f172a",
    definition: "#2563eb",
    property: "#2563eb",
    static: "#0284c7",
    string: "#059669",
  },
  font: {
    body: "Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
    mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    size: "13px",
    lineHeight: "1.5",
  },
} as const;

export const LIQUID_GLASS_DARK_THEME = {
  colors: {
    accent: "#5AC8FA",
    surface1: "#0d1117",
    surface2: "#0f1524",
    surface3: "#111827",
    base: "#e6edf3",
    clickable: "#77aaff",
    hover: "#a7c4ff",
    disabled: "#6b7280",
    error: "#FF9500",
  },
  syntax: {
    plain: "#e6edf3",
    comment: { color: "#94a3b8", fontStyle: "italic" },
    keyword: "#c084fc",
    tag: "#38bdf8",
    punctuation: "#cbd5e1",
    definition: "#93c5fd",
    property: "#93c5fd",
    static: "#7dd3fc",
    string: "#34d399",
  },
  font: {
    body: "Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
    mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    size: "13px",
    lineHeight: "1.5",
  },
} as const;

export function withBaseFiles(files: Files): Files {
  return {
    "/index.html": {
      code: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <style>html,body,#root{height:100%}</style>
  </head>
  <body>
    <svg aria-hidden="true" focusable="false" width="0" height="0" style="position:absolute;width:0;height:0;overflow:hidden" data-liquid-glass-defs>
      <defs>
        <filter id="liquid-glass-distortion">
          <feTurbulence type="turbulence" baseFrequency="0.01" numOctaves="2" seed="2" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="liquid-glass-refraction">
          <feTurbulence type="fractalNoise" baseFrequency="0.002" numOctaves="3" seed="7" result="f" />
          <feDisplacementMap in="SourceGraphic" in2="f" scale="4" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="liquid-glass-chromatic">
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" result="orig"/>
          <feGaussianBlur stdDeviation="0.6" in="orig" result="blur"/>
          <feBlend in="orig" in2="blur" mode="screen"/>
        </filter>
        <filter id="liquid-glass-edge">
          <feSpecularLighting result="spec" specularExponent="20" lighting-color="#ffffff">
            <fePointLight x="-5000" y="-10000" z="20000" />
          </feSpecularLighting>
          <feComposite in2="SourceAlpha" operator="in" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="liquid-glass-mobile">
          <feGaussianBlur stdDeviation="0.8" />
        </filter>
        <filter id="liquid-glass-ripple">
          <feTurbulence type="fractalNoise" baseFrequency="0.01 0.03" numOctaves="1" seed="3" result="noise"/>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="3"/>
        </filter>
        <filter id="liquid-glass-depth">
          <feDropShadow dx="0" dy="8" stdDeviation="8" flood-color="rgba(0,0,0,0.2)"/>
        </filter>
        <filter id="liquid-glass-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="1" stitchTiles="stitch"/>
          <feColorMatrix type="saturate" values="0"/>
          <feComponentTransfer>
            <feFuncA type="table" tableValues="0 0.04"/>
          </feComponentTransfer>
        </filter>
        <filter id="liquid-glass-specular">
          <feSpecularLighting surfaceScale="1" specularConstant="0.75" specularExponent="16" lighting-color="#ffffff">
            <fePointLight x="-200" y="-100" z="200" />
          </feSpecularLighting>
        </filter>
      </defs>
    </svg>
    <div id="root"></div>
  </body>
</html>`,
      hidden: true,
    },
    "/main.tsx": {
      code: `import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
createRoot(document.getElementById("root")!).render(<App />);`,
      hidden: true,
    },
    ...files,
  };
}

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import lightningcss from "vite-plugin-lightningcss";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  logLevel: "error",
  plugins: [
    react(),
    tsconfigPaths(),
    lightningcss({
      browserslist: ">0.5%, last 2 versions, not dead, not IE 11",
      cssModules: false,
      // Additional options not present in current type defs
    } as any),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "LiquidifyComponents",
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format === "es" ? "mjs" : "cjs"}`,
    },
    outDir: resolve(__dirname, "../../dist/libs/components"),
    cssCodeSplit: false,
    cssMinify: "lightningcss",
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        /^@radix-ui/,
        "clsx",
        "framer-motion",
        "lucide-react",
        "tailwind-merge",
      ],
      output: {
        preserveModules: true,
        preserveModulesRoot: resolve(__dirname, "src"),
        exports: "named",
      },
    },
    minify: "esbuild",
    sourcemap: true,
    emptyOutDir: false,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      liquidify: resolve(__dirname, "src/index.ts"),
    },
  },
  experimental: {
    renderBuiltUrl(filename) {
      return filename;
    },
  },
});

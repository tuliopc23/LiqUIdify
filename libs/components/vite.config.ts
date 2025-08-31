import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const Dirname = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  logLevel: "error",
  plugins: [react(), tsconfigPaths()],
  build: {
    lib: {
      entry: resolve(Dirname, "src/index.ts"),
      name: "LiquidifyComponents",
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format === "es" ? "mjs" : "cjs"}`,
    },
    outDir: resolve(Dirname, "../../dist/libs/components"),

    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        /^@radix-ui/,
        "clsx",
        "framer-motion",
        "lucide-react",
      ],
      output: [
        {
          format: "es",
          exports: "named",
          entryFileNames: "index.mjs",
          chunkFileNames: "chunks/[name]-[hash].mjs",
          assetFileNames: (assetInfo) => {
            if (assetInfo?.name?.endsWith(".css")) {
              return "new-design-system.css";
            }
            return "assets/[name]-[hash][extname]";
          },
        },
        {
          format: "cjs",
          exports: "named",
          entryFileNames: "index.cjs",
          chunkFileNames: "chunks/[name]-[hash].cjs",
          assetFileNames: (assetInfo) => {
            if (assetInfo?.name?.endsWith(".css")) {
              return "new-design-system.css";
            }
            return "assets/[name]-[hash][extname]";
          },
        },
      ],
    },
    minify: "esbuild",
    sourcemap: true,
    emptyOutDir: false,
  },
  resolve: {
    alias: {
      "@": resolve(Dirname, "src"),
      liquidify: resolve(Dirname, "src/index.ts"),
    },
  },
  experimental: {
    renderBuiltUrl(filename) {
      return filename;
    },
  },
});

import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vite";

// Resolve the library to source for local dev; production build can use dist.
export default defineConfig({
  root: __dirname,
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: [
      {
        find: "liquidify/styles",
        replacement: resolve(__dirname, "../../libs/components/src/styles/panda.css"),
      },
      { find: "liquidify", replacement: resolve(__dirname, "../../libs/components/src/index.ts") },
    ],
  },
  build: {
    outDir: resolve(__dirname, "../../dist/unified"),
    emptyOutDir: true,
    rollupOptions: {
      input: resolve(__dirname, "index.html"),
    },
  },
});

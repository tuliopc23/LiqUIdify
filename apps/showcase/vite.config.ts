import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// This app expects the library to be built so we can import `liquidify/styles`.
// Run `bun run build:lib` first, or switch aliases below to source files for dev.

export default defineConfig({
  root: __dirname,
  plugins: [react()],
  resolve: {
    alias: [
      // Point showcase to source library for reliable dev/preview.
      { find: "liquidify", replacement: resolve(__dirname, "../../libs/components/src/index.ts") },
    ],
  },
  build: {
    outDir: resolve(__dirname, "../../dist/showcase"),
    emptyOutDir: true,
    rollupOptions: {
      input: resolve(__dirname, "index.html"),
    },
  },
});

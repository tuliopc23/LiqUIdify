import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5175,
    host: true,
  },
  build: {
    outDir: "dist",
    target: "esnext",
    minify: "esbuild",
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          liquidify: ["@liquidify/components"],
        },
      },
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom", "@liquidify/components"],
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});

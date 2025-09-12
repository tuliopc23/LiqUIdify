import { resolve, relative, join } from "node:path";
import { readdirSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { viteStaticCopy } from "vite-plugin-static-copy";

const Dirname = fileURLToPath(new URL(".", import.meta.url));

function discoverEntries() {
  const entries: Record<string, string> = {
    index: resolve(Dirname, "src/index.ts"),
  };
  const base = resolve(Dirname, "src/components");

  function walk(dir: string) {
    for (const dirent of readdirSync(dir, { withFileTypes: true })) {
      if (dirent.isDirectory()) {
        const sub = join(dir, dirent.name);
        const idx = join(sub, "index.ts");
        if (existsSync(idx)) {
          const rel = relative(resolve(Dirname, "src"), idx).replace(/\\/g, "/");
          const entryName = rel.replace(/\.ts$/, ""); // e.g. components/button/index
          entries[entryName] = idx;
        }
        walk(sub);
      }
    }
  }

  if (existsSync(base)) walk(base);
  return entries;
}

export default defineConfig({
  logLevel: "error",
  plugins: [
    react(),
    tsconfigPaths(),
    viteStaticCopy({
      targets: [
        {
          src: "src/styles/panda.css",
          dest: ".",
        },
        {
          src: "../../styled-system/styles.css",
          dest: ".",
        },
      ],
    }),
  ],
  build: {
    lib: {
      entry: discoverEntries(),
      name: "LiquidifyComponents",
      formats: ["es", "cjs"],
    },
    outDir: resolve(Dirname, "../../dist/libs/components"),

    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "@ark-ui/react",
        "framer-motion",
        "lucide-react",
        // Mark styled-system as external to avoid bundling duplication
        /^\.\.\/\.\.\/\.\.\/styled-system/,
      ],
      output: [
        {
          format: "es",
          exports: "named",
          entryFileNames: (chunkInfo) =>
            chunkInfo.name === "index" ? "index.mjs" : `${chunkInfo.name}.mjs`,
          chunkFileNames: "chunks/[name]-[hash].mjs",
          assetFileNames: (assetInfo) => {
            if (assetInfo?.names?.[0]?.endsWith(".css")) {
              return "liquidify.css";
            }
            return "assets/[name]-[hash][extname]";
          },
        },
        {
          format: "cjs",
          exports: "named",
          entryFileNames: (chunkInfo) =>
            chunkInfo.name === "index" ? "index.cjs" : `${chunkInfo.name}.cjs`,
          chunkFileNames: "chunks/[name]-[hash].cjs",
          assetFileNames: (assetInfo) => {
            if (assetInfo?.names?.[0]?.endsWith(".css")) {
              return "liquidify.css";
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

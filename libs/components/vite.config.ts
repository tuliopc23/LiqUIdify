import { existsSync, readdirSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

import tsconfigPaths from "vite-tsconfig-paths";

const Dirname = fileURLToPath(new URL(".", import.meta.url));

const assetFileNameFn = (assetInfo: any) => {
	if (assetInfo?.names?.[0]?.endsWith(".css")) {
		return "liquidify.css";
	}
	return "assets/[name]-[hash][extname]";
};

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
					const rel = relative(resolve(Dirname, "src"), idx).replace(
						/\\/g,
						"/",
					);
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
	logLevel: "info",
	plugins: [react(), tsconfigPaths()],
	build: {
		lib: {
			entry: discoverEntries(),
			name: "LiquidifyComponents",
			formats: ["es", "cjs"],
		},
		outDir: resolve(Dirname, "../../dist/libs/components"),

		rollupOptions: {
			external: (source) => {
				// Keep core runtime deps external
				if (
					source === "react" ||
					source === "react-dom" ||
					source === "react/jsx-runtime" ||
					source === "@ark-ui/react" ||
					source === "framer-motion" ||
					source === "lucide-react"
				) {
					return true;
				}
				// Never externalize CSS files
				if (source.endsWith(".css")) {
					return false;
				}
				return false;
			},
			output: [
				{
					format: "es",
					exports: "named",
					entryFileNames: (chunkInfo) =>
						chunkInfo.name === "index" ? "index.mjs" : `${chunkInfo.name}.mjs`,
					chunkFileNames: "chunks/[name]-[hash].mjs",
					assetFileNames: assetFileNameFn,
				},
				{
					format: "cjs",
					exports: "named",
					entryFileNames: (chunkInfo) =>
						chunkInfo.name === "index" ? "index.cjs" : `${chunkInfo.name}.cjs`,
					chunkFileNames: "chunks/[name]-[hash].cjs",
					assetFileNames: assetFileNameFn,
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

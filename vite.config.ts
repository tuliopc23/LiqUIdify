// vite.config.ts

import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
	root: "client",
	plugins: [react()],
	resolve: {
		alias: [
			// Ensure the more specific alias resolves first
			{
				find: "liquidify",
				replacement: resolve(__dirname, "./libs/components/src/index.ts"),
			},
			{ find: "@", replacement: resolve(__dirname, "./client/src") },
			{ find: "@shared", replacement: resolve(__dirname, "./shared") },
			{ find: "@server", replacement: resolve(__dirname, "./server") },
		],
	},
	build: {
		outDir: "../dist/public",
		emptyOutDir: true,
		rollupOptions: {
			input: {
				main: resolve(__dirname, "client/index.html"),
			},
		},
	},
	server: {
		proxy: {
			"/api": {
				target: "http://localhost:3001",
				changeOrigin: true,
			},
		},
	},
	ssr: {
		format: "esm",
	},
});

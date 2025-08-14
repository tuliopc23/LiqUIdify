/**
 * Root PostCSS configuration
 *
 * Enables Tailwind CSS and Autoprefixer across:
 * - Storybook (apps/storybook) via Vite
 * - Library builds (libs/components) via Vite
 *
 * Tailwind v4 and v3-style configs are both supported. This file is ESM because
 * the repo sets `"type": "module"` in package.json.
 */

import tailwind from "@tailwindcss/postcss";
import autoprefixer from "autoprefixer";

export default {
  plugins: [
    // Tailwind utilities and @theme/@utility processing
    tailwind(),
    // Vendor prefixing based on the project's browserslist
    autoprefixer(),
  ],
};

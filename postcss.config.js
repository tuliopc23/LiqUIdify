/**
 * Root PostCSS configuration
 *
 * Enables Tailwind CSS and Autoprefixer across:
 * - Storybook (apps/storybook) via Vite
 * - Library builds (libs/components) via Vite
 *
 * Using Tailwind CSS v4 syntax.
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

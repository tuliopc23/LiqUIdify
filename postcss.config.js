/**
 * Root PostCSS configuration
 *
 * Enables Panda CSS and Autoprefixer across:
 * - Storybook (apps/storybook) via Vite
 * - Library builds (libs/components) via Vite
 *
 * Using Panda CSS for styling.
 */

import pandacss from "@pandacss/postcss";
import autoprefixer from "autoprefixer";

export default {
  plugins: [
    // Panda CSS utilities and token processing
    pandacss(),
    // Vendor prefixing based on the project's browserslist
    autoprefixer(),
  ],
};

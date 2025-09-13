/**
 * Shared global styles import for side effects.
 * Import this module once (e.g., from the library entry) to ensure all
 * Liquidify components are styled out of the box.
 *
 * Import order:
 * 1) Panda recipe overrides and glass-surface utilities
 * 2) Design system typography (SF Pro configuration as provided)
 * 3) Generated styled-system (reset, base, tokens, recipes, utilities)
 */

import "./panda.css";
import "./new-design-system.css";
import "../../../../styled-system/styles.css";

// Explicit export to ensure this file is treated as a module and
// to help bundlers preserve side-effectful CSS imports.

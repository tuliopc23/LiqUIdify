import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";
import "./custom.css";

// Import LiqUIdify styles
import "liquidify/styles";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // Register global components if needed
    // app.component('ComponentDemo', ComponentDemo)
  },
} satisfies Theme;

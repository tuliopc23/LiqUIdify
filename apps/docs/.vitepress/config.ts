import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "LiquidUI",
  description:
    "Production-ready React component library with glassmorphism design",
  base: "/",

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/logo.svg",

    nav: [
      { text: "Home", link: "/" },
      { text: "Guide", link: "/guide/" },
      { text: "Components", link: "/components/" },
      { text: "API", link: "/api/" },
    ],

    sidebar: [
      {
        text: "Guide",
        items: [
          { text: "Getting Started", link: "/guide/" },
          { text: "Installation", link: "/guide/installation" },
          { text: "Quick Start", link: "/guide/quick-start" },
          { text: "Framework Guides", link: "/guide/framework-guides" },
          { text: "Usage Examples", link: "/guide/usage-examples" },
        ],
      },
      {
        text: "Components",
        items: [
          { text: "Overview", link: "/components/" },
          { text: "Button", link: "/components/button" },
          // Add more components as they are documented
        ],
      },
      {
        text: "API Reference",
        items: [{ text: "Overview", link: "/api/" }],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/tuliopc23/LiqUIdify" },
    ],

    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2024 Tulio Pinheiro Cunha",
    },

    search: {
      provider: "local",
    },
  },

  markdown: {
    lineNumbers: true,
  },

  vite: {
    resolve: {
      alias: {
        "@": "/libs/components/src",
        "@liquidify/components": "/libs/components/src/index.ts",
      },
    },
  },
});

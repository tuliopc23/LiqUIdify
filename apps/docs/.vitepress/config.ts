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
          { text: "Design System", link: "/guide/design-system" },
          { text: "Theming", link: "/guide/theming" },
          { text: "Component Patterns", link: "/guide/patterns" },
        ],
      },
      {
        text: "Components",
        collapsed: false,
        items: [
          { text: "Overview", link: "/components/" },
          {
            text: "Core",
            collapsed: true,
            items: [
              { text: "Button", link: "/components/button" },
              { text: "Card", link: "/components/card" },
              { text: "Input", link: "/components/input" },
              { text: "Modal", link: "/components/modal" },
              { text: "Tooltip", link: "/components/tooltip" },
              { text: "Badge", link: "/components/badge" },
              { text: "Avatar", link: "/components/avatar" },
            ],
          },
          {
            text: "Form",
            collapsed: true,
            items: [
              { text: "Checkbox", link: "/components/checkbox" },
              { text: "Radio Group", link: "/components/radio-group" },
              { text: "Select", link: "/components/select" },
              { text: "Textarea", link: "/components/textarea" },
              { text: "Switch", link: "/components/switch" },
              { text: "Slider", link: "/components/slider" },
              { text: "Date Picker", link: "/components/date-picker" },
              { text: "File Upload", link: "/components/file-upload" },
              { text: "Combobox", link: "/components/combobox" },
              { text: "Number Input", link: "/components/number-input" },
            ],
          },
          {
            text: "Navigation",
            collapsed: true,
            items: [
              { text: "Breadcrumbs", link: "/components/breadcrumbs" },
              { text: "Tabs", link: "/components/tabs" },
              { text: "Pagination", link: "/components/pagination" },
              { text: "Navbar", link: "/components/navbar" },
              { text: "Sidebar", link: "/components/sidebar" },
              { text: "Mobile Nav", link: "/components/mobile-nav" },
            ],
          },
          {
            text: "Feedback",
            collapsed: true,
            items: [
              { text: "Alert", link: "/components/alert" },
              { text: "Toast", link: "/components/toast" },
              { text: "Notification", link: "/components/notification" },
              { text: "Banner", link: "/components/banner" },
              { text: "Progress", link: "/components/progress" },
              { text: "Spinner", link: "/components/spinner" },
              { text: "Loading", link: "/components/loading" },
              { text: "Skeleton", link: "/components/skeleton" },
            ],
          },
          {
            text: "Data Display",
            collapsed: true,
            items: [
              { text: "Table", link: "/components/table" },
              { text: "Accordion", link: "/components/accordion" },
              { text: "Timeline", link: "/components/timeline" },
              { text: "Tree View", link: "/components/tree-view" },
              { text: "Chart", link: "/components/chart" },
            ],
          },
          {
            text: "Layout",
            collapsed: true,
            items: [
              { text: "Drawer", link: "/components/drawer" },
              { text: "Dropdown", link: "/components/dropdown" },
              { text: "Popover", link: "/components/popover" },
              { text: "Portal", link: "/components/portal" },
            ],
          },
          {
            text: "Utility",
            collapsed: true,
            items: [
              { text: "Command", link: "/components/command" },
              { text: "Search", link: "/components/search" },
              { text: "Error Boundary", link: "/components/error-boundary" },
              { text: "Theme Provider", link: "/components/theme-provider" },
              { text: "Theme Toggle", link: "/components/theme-toggle" },
            ],
          },
          {
            text: "Accessibility",
            collapsed: true,
            items: [
              { text: "Focus Trap", link: "/components/focus-trap" },
              { text: "Live Region", link: "/components/live-region" },
              { text: "Skip Navigation", link: "/components/skip-navigation" },
              { text: "Visually Hidden", link: "/components/visually-hidden" },
            ],
          },
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

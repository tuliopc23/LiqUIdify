import { defineConfig } from 'vitepress'
import { resolve } from 'path'

export default defineConfig({
  title: 'LiqUIdify',
  description: 'Production-ready React component library with glassmorphism design and physics-based interactions',
  base: '/',
  
  // Theme configuration
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'Components', link: '/components/' },
      { text: 'API', link: '/api/' },
      { text: 'Playground', link: 'https://liquidify-storybook.vercel.app' }
    ],
    
    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'Introduction', link: '/guide/' },
          { text: 'Project Overview', link: '/guide/readme' },
          { text: 'Installation', link: '/guide/installation' },
          { text: 'Quick Start', link: '/guide/quick-start' },
          { text: 'Usage Examples', link: '/guide/usage-examples' },
          { text: 'Framework Guides', link: '/guide/framework-guides' },
          { text: 'Changelog', link: '/guide/changelog' }
        ]
      },
      {
        text: 'Core Concepts',
        items: [
          { text: 'Glassmorphism Design', link: '/guide/glassmorphism' },
          { text: 'Physics Engine', link: '/guide/physics' },
          { text: 'Animations', link: '/guide/animations' },
          { text: 'Theming', link: '/guide/theming' },
          { text: 'Accessibility', link: '/guide/accessibility' }
        ]
      },
      {
        text: 'Components',
        collapsed: false,
        items: [
          { text: 'Overview', link: '/components/' },
          { text: 'Core Components', items: [
            { text: 'Button', link: '/components/button' },
            { text: 'Card', link: '/components/card' },
            { text: 'Badge', link: '/components/badge' },
            { text: 'Avatar', link: '/components/avatar' }
          ]},
          { text: 'Form Components', items: [
            { text: 'Input', link: '/components/input' },
            { text: 'Select', link: '/components/select' },
            { text: 'Switch', link: '/components/switch' },
            { text: 'Checkbox', link: '/components/checkbox' },
            { text: 'Radio', link: '/components/radio' },
            { text: 'Slider', link: '/components/slider' },
            { text: 'Textarea', link: '/components/textarea' }
          ]},
          { text: 'Layout Components', items: [
            { text: 'Container', link: '/components/container' },
            { text: 'Grid', link: '/components/grid' },
            { text: 'Stack', link: '/components/stack' },
            { text: 'Divider', link: '/components/divider' }
          ]},
          { text: 'Feedback Components', items: [
            { text: 'Toast', link: '/components/toast' },
            { text: 'Alert', link: '/components/alert' },
            { text: 'Progress', link: '/components/progress' },
            { text: 'Skeleton', link: '/components/skeleton' },
            { text: 'Spinner', link: '/components/spinner' }
          ]},
          { text: 'Navigation Components', items: [
            { text: 'Tabs', link: '/components/tabs' },
            { text: 'Breadcrumb', link: '/components/breadcrumb' },
            { text: 'Pagination', link: '/components/pagination' },
            { text: 'Navigation', link: '/components/navigation' }
          ]},
          { text: 'Overlay Components', items: [
            { text: 'Modal', link: '/components/modal' },
            { text: 'Popover', link: '/components/popover' },
            { text: 'Tooltip', link: '/components/tooltip' },
            { text: 'Drawer', link: '/components/drawer' }
          ]},
          { text: 'Data Display', items: [
            { text: 'Table', link: '/components/table' },
            { text: 'DataTable', link: '/components/data-table' },
            { text: 'Chart', link: '/components/chart' },
            { text: 'Timeline', link: '/components/timeline' }
          ]}
        ]
      },
      {
        text: 'API Reference',
        items: [
          { text: 'Complete API', link: '/api/' },
          { text: 'Component Props', link: '/api/component-props' },
          { text: 'Hooks', link: '/api/hooks' },
          { text: 'Utilities', link: '/api/utilities' },
          { text: 'Types', link: '/api/types' },
          { text: 'CSS Variables', link: '/api/css-variables' }
        ]
      },
      {
        text: 'Advanced',
        items: [
          { text: 'Custom Themes', link: '/advanced/custom-themes' },
          { text: 'Performance', link: '/advanced/performance' },
          { text: 'Server Side Rendering', link: '/advanced/ssr' },
          { text: 'Tree Shaking', link: '/advanced/tree-shaking' },
          { text: 'Contributing', link: '/advanced/contributing' }
        ]
      }
    ],
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com/tuliopc23/LiqUIdify' }
    ],
    
    search: {
      provider: 'local'
    },
    
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025 Tulio Pinheiro Cunha'
    }
  },
  
  // Vite configuration
  vite: {
    resolve: {
      alias: {
        'liquidify': resolve(__dirname, '../../../libs/components/src'),
        '@': resolve(__dirname, '../src')
      }
    },
    optimizeDeps: {
      include: ['liquidify']
    }
  },
  
  // Markdown configuration
  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    }
  }
})
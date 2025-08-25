# Docs migration: enable live previews, load site CSS, and remove legacy preview stubs

Updated pages:

- components/tabs.mdx — wrapped `<TabsExample />` with `<PreviewCodeTabs>`
- components/toast.mdx — wrapped `<ToastExample />` with `<PreviewCodeTabs>`
- components/breadcrumbs.mdx — wrapped `<BreadcrumbsExample />` with `<PreviewCodeTabs>`

Removed/cleaned:

- apps/docs/components/Playground.tsx (legacy; unused)
- apps/docs/components/PlaygroundPreview.tsx (legacy; unused)
- apps/docs/components/PreviewWithToolbar.tsx (legacy; replaced by Preview/PreviewCodeTabs)

CSS changes:

- Added apps/docs/style.css with namespaced tokens and preview/tabs styles
- Kept selectors shallow; no resets of html/body/\*/pre/code

Notes:

- All snippet imports use absolute paths (/snippets/...)
- Preview components avoid using window/document outside event handlers

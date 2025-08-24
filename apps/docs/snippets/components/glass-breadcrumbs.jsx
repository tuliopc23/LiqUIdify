// docs-only: minimal GlassBreadcrumbs for Mintlify snippets

export const GlassBreadcrumbs = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex items-center gap-1 text-[var(--apple-text-secondary)]">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1">
            <button onClick={item.onClick} className="rounded px-1.5 py-0.5 hover:bg-black/5 dark:hover:bg-white/10">
              {item.label}
            </button>
            {i < items.length - 1 && <span className="opacity-50">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default GlassBreadcrumbs

// docs-only: minimal GlassTabs for Mintlify snippets

export const GlassTabs = ({ tabs, defaultTabId }) => {
  const [active, setActive] = useState(defaultTabId ?? tabs[0]?.id)
  const current = tabs.find(t => t.id === active) ?? tabs[0]
  return (
    <div>
      <div className="mb-2 flex gap-2">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActive(t.id)} className={`rounded-md px-3 py-1.5 text-sm ${t.id === active ? 'bg-blue-600 text-white' : 'bg-black/5 dark:bg-white/10'}`}>
            {t.label}
          </button>
        ))}
      </div>
      <div className="rounded-lg border border-black/10 p-3 dark:border-white/10">
        {current?.content}
      </div>
    </div>
  )
}

export default GlassTabs

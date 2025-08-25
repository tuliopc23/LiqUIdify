// docs-only: minimal GlassFormField for Mintlify snippets

export const GlassFormField = ({ label, children }) => {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-medium text-[var(--apple-text-primary)]">{label}</span>
      <div className="rounded-md border border-liquid-highlight/10 dark:border-liquid-highlight/10 bg-liquid-bg/70 dark:bg-liquid-bg/5 px-3 py-2 backdrop-blur">
        {children}
      </div>
    </label>
  )
}

export default GlassFormField

// docs-only: minimal GlassFormField for Mintlify snippets

export const GlassFormField = ({ label, children }) => {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{label}</span>
      <div className="rounded-md border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 px-3 py-2 backdrop-blur">
        {children}
      </div>
    </label>
  )
}

export default GlassFormField

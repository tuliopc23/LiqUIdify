// docs-only: minimal GlassCard for Mintlify snippets

export const GlassCard = ({ title, subtitle, variant, children }) => {
  const base = 'rounded-xl border border-black/10 dark:border-white/10 p-4 backdrop-blur bg-white/60 dark:bg-white/5 shadow-sm'
  const solid = 'bg-[#0A84FF] text-white border-transparent shadow-md'
  return (
    <div className={`${base} ${variant === 'solid' ? solid : ''}`}>
      {(title || subtitle) && (
        <div className="mb-2">
          {title && <h4 className="font-semibold">{title}</h4>}
          {subtitle && <p className="text-sm opacity-70">{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  )
}

export default GlassCard

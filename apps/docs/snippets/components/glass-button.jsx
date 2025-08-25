// docs-only: minimal GlassButton for Mintlify snippets

export const GlassButton = ({ variant = 'primary', iconOnly, loading, loadingText, leftIcon, children, className = '', ...props }) => {
  const base = 'inline-flex items-center gap-2 rounded-md px-3.5 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2'
  const variants = {
    primary: 'bg-liquid-accent text-liquid-text-inverse hover:bg-liquid-accent focus:ring-blue-500',
    ghost: 'bg-transparent text-liquid-accent hover:bg-liquid-accent focus:ring-blue-500',
    solid: 'bg-liquid-accent text-liquid-text-inverse hover:bg-liquid-accent focus:ring-blue-500',
    destructive: 'bg-liquid-accent text-liquid-text-inverse hover:bg-liquid-accent focus:ring-red-500',
  }
  const size = iconOnly ? 'p-2' : ''
  return (
    <button className={`${base} ${variants[variant] ?? variants.primary} ${size} ${className}`} {...props}>
      {loading ? (
        <span className="inline-flex items-center gap-2">
          <span className="h-3 w-3 animate-spin rounded-full border-2 border-liquid-highlight/40 border-t-white" />
          {loadingText ?? 'Loading...'}
        </span>
      ) : (
        <>
          {leftIcon}
          {children}
        </>
      )}
    </button>
  )
}

export default GlassButton

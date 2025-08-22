// docs-only: minimal GlassButton for Mintlify snippets

export const GlassButton = ({ variant = 'primary', iconOnly, loading, loadingText, leftIcon, children, className = '', ...props }) => {
  const base = 'inline-flex items-center gap-2 rounded-md px-3.5 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2'
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    ghost: 'bg-transparent text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
    solid: 'bg-gray-900 text-white hover:bg-black focus:ring-gray-700',
    destructive: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  }
  const size = iconOnly ? 'p-2' : ''
  return (
    <button className={`${base} ${variants[variant] ?? variants.primary} ${size} ${className}`} {...props}>
      {loading ? (
        <span className="inline-flex items-center gap-2">
          <span className="h-3 w-3 animate-spin rounded-full border-2 border-white/40 border-t-white" />
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

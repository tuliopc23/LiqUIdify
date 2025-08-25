// docs-only: minimal GlassModal for Mintlify snippets

export const GlassModal = ({ isOpen, open, onClose, onOpenChange, title, size = 'md', children, className = '', showCloseButton = true }) => {
  const visible = isOpen ?? open ?? false
  if (!visible) return null
  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-2xl',
    full: 'w-screen h-screen',
  }
  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-liquid-bg/40" onClick={() => { onClose?.(); onOpenChange?.(false) }} />
      <div className={`relative mx-4 w-full ${sizes[size]} rounded-xl border border-liquid-highlight/20 bg-liquid-bg/80 p-4 shadow-2xl backdrop-blur dark:bg-liquid-bg/10 ${className}`}>
        <div className="mb-3 flex items-center justify-between">
          {title && <h3 className="text-lg font-semibold">{title}</h3>}
          {showCloseButton && (
            <button aria-label="Close" className="rounded p-1 hover:bg-liquid-bg/5 dark:hover:bg-liquid-bg/10" onClick={() => { onClose?.(); onOpenChange?.(false) }}>×</button>
          )}
        </div>
        <div>{children}</div>
      </div>
    </div>
  )
}

export default GlassModal

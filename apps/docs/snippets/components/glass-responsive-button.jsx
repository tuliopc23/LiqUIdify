// docs-only: minimal GlassResponsiveButton for Mintlify snippets

export const GlassResponsiveButton = ({ 
  className = '', 
  variant = 'primary', 
  size = 'md', 
  loading = false, 
  fullWidth = false, 
  disabled, 
  children, 
  ...props 
}) => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 && 'ontouchstart' in window)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const baseClasses = [
    'inline-flex items-center justify-center gap-2 rounded-xl font-medium',
    'select-none disabled:cursor-not-allowed disabled:opacity-50',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30',
    'transition-all duration-200 touch-manipulation',
    fullWidth && 'w-full',
    !disabled && !loading && 'hover:shadow-lg active:scale-95'
  ].filter(Boolean).join(' ')

  const variantClasses = {
    primary: 'font-semibold text-white bg-gradient-to-b from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 border border-blue-400/30 shadow-lg shadow-blue-500/25',
    secondary: 'border border-gray-300 bg-white/80 backdrop-blur-sm text-gray-900 hover:bg-white/90 hover:border-blue-300 dark:border-gray-600 dark:bg-gray-800/80 dark:text-gray-100 dark:hover:bg-gray-800/90',
    tertiary: 'border border-transparent bg-transparent text-gray-900 hover:bg-gray-100/80 backdrop-blur-sm dark:text-gray-100 dark:hover:bg-gray-800/80',
    ghost: 'border border-transparent bg-transparent text-gray-600 hover:bg-gray-100/80 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800/80 dark:hover:text-gray-100',
    destructive: 'font-semibold text-white bg-gradient-to-b from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 border border-red-400/30 shadow-lg shadow-red-500/25'
  }

  const sizeClasses = {
    xs: isMobile ? 'px-3 py-2 text-xs min-h-[36px]' : 'px-2.5 py-1.5 text-xs min-h-[32px]',
    sm: isMobile ? 'px-4 py-2.5 text-sm min-h-[44px]' : 'px-3 py-2 text-sm min-h-[36px]',
    md: isMobile ? 'px-6 py-3 text-base min-h-[48px]' : 'px-4 py-2.5 text-sm min-h-[44px]',
    lg: isMobile ? 'px-8 py-4 text-lg min-h-[52px]' : 'px-6 py-3 text-base min-h-[48px]',
    xl: isMobile ? 'px-10 py-5 text-xl min-h-[56px]' : 'px-8 py-4 text-lg min-h-[52px]'
  }

  const buttonClasses = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className
  ].join(' ')

  return (
    <button
      className={buttonClasses}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-current/10">
          <div className="animate-spin rounded-full border-2 border-current border-t-transparent w-4 h-4" />
        </div>
      )}
      <span className={loading ? 'opacity-0' : ''}>{children}</span>
    </button>
  )
}

export default GlassResponsiveButton

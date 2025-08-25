// docs-only: minimal GlassTooltip for Mintlify snippets

export const GlassTooltip = ({ content, children }) => {
  const [open, setOpen] = useState(false)
  const timer = useRef(null)

  const show = () => {
    if (timer.current) window.clearTimeout(timer.current)
    setOpen(true)
  }
  const hide = () => {
    if (timer.current) window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setOpen(false), 80)
  }

  return (
    <span className="relative inline-block" onMouseEnter={show} onMouseLeave={hide} onFocus={show} onBlur={hide}>
      {children}
      {open && (
        <span role="tooltip" className="absolute left-1/2 z-50 mt-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-liquid-bg/80 px-2 py-1 text-xs text-liquid-text-inverse shadow-lg backdrop-blur">
          {content}
        </span>
      )}
    </span>
  )
}

export default GlassTooltip

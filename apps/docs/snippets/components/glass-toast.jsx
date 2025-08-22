// docs-only: minimal GlassToast for Mintlify snippets

const ToastContext = createContext(null)

export const GlassToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])
  const show = useCallback((t) => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, ...t }])
    setTimeout(() => setToasts((prev) => prev.filter((x) => x.id !== id)), 2500)
  }, [])

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 space-y-2">
        {toasts.map((t) => (
          <div key={t.id} className="min-w-[220px] rounded-md bg-black/80 px-3 py-2 text-white shadow-lg backdrop-blur">
            <div className="font-medium">{t.title}</div>
            {t.description && <div className="text-xs opacity-80">{t.description}</div>}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export const GlassToast = {
  show(payload) {
    const ctx = useContext(ToastContext)
    if (!ctx) throw new Error('GlassToast.show must be used within GlassToastProvider')
    ctx.show(payload)
  },
}

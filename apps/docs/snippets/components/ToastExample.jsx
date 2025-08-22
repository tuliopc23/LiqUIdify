import {GlassButton} from '/snippets/components/glass-button.jsx'
import {GlassToast, GlassToastProvider} from '/snippets/components/glass-toast.jsx'

export const ToastExample = () => (
  <div className="not-prose">
    <GlassToastProvider>
      <GlassButton onClick={() => GlassToast.show({ title: 'Saved', description: 'Your changes were saved.' })}>
        Show toast
      </GlassButton>
    </GlassToastProvider>
  </div>
)

export default ToastExample

import {GlassButton} from '/snippets/components/glass-button.jsx'
import {GlassModal} from '/snippets/components/glass-modal.jsx'

export const ModalExample = () => {
  const [open, setOpen] = useState(false)
  return (
    <div className="not-prose space-x-2">
      <GlassButton onClick={() => setOpen(true)}>Open modal</GlassButton>
      <GlassModal open={open} onOpenChange={setOpen} title="Example modal">
        <p className="text-sm text-muted-foreground">This is a simple modal example.</p>
      </GlassModal>
    </div>
  )
}

export default ModalExample

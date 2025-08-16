import React from 'react'
import { GlassButton, GlassModal } from 'liquidify'

export const ModalExample = () => {
  const [open, setOpen] = React.useState(false)
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

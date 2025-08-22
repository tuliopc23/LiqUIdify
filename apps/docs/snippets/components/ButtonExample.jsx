import {GlassButton} from '/snippets/components/glass-button.jsx'

export const ButtonExample = () => (
  <div className="not-prose flex gap-2">
    <GlassButton>Default</GlassButton>
    <GlassButton variant="solid">Solid</GlassButton>
    <GlassButton variant="ghost">Ghost</GlassButton>
  </div>
)

export default ButtonExample

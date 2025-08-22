import {GlassTooltip} from '/snippets/components/glass-tooltip.jsx'
import {GlassButton} from '/snippets/components/glass-button.jsx'

export const TooltipExample = () => (
  <div className="not-prose">
    <GlassTooltip content="Tooltip text">
      <GlassButton>Hover me</GlassButton>
    </GlassTooltip>
  </div>
)

export default TooltipExample

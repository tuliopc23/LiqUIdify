import {GlassCard} from '/snippets/components/glass-card.jsx'

export const CardExample = () => (
  <div className="not-prose grid grid-cols-1 gap-4 sm:grid-cols-2">
    <GlassCard title="Card title" subtitle="Optional subtitle">
      <p className="text-sm text-muted-foreground">Card content goes here.</p>
    </GlassCard>
    <GlassCard variant="solid" title="Solid card">
      <p className="text-sm">More content</p>
    </GlassCard>
  </div>
)

export default CardExample

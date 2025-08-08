import { describe, it, expect } from 'vitest'
import { render, screen } from '../../test/test-utils'
import { GlassCard } from './glass-card'

describe('GlassCard', () => {
  it('renders children content', () => {
    render(
      <GlassCard data-testid="test-card">
        <p>Card content</p>
      </GlassCard>
    )
    
    const card = screen.getByTestId('test-card')
    expect(card).toBeInTheDocument()
    expect(screen.getByText('Card content')).toBeInTheDocument()
  })

  it('applies variant classes correctly', () => {
    render(
      <GlassCard variant="elevated" data-testid="elevated-card">
        Content
      </GlassCard>
    )
    
    const card = screen.getByTestId('elevated-card')
    expect(card).toHaveClass('liquid-glass-container')
    expect(card).toHaveClass('liquid-glass-card')
  })

  it('supports interactive behavior when onClick provided', () => {
    const handleClick = () => {}
    render(
      <GlassCard onClick={handleClick} data-testid="clickable-card">
        Clickable content
      </GlassCard>
    )
    
    const card = screen.getByTestId('clickable-card')
    expect(card).toBeInTheDocument()
  })

  it('renders compound components (Header/Title) correctly', () => {
    render(
      <GlassCard data-testid="compound-card">
        <GlassCard.Header>
          <GlassCard.Title>Card Title</GlassCard.Title>
        </GlassCard.Header>
        <div>Body content</div>
      </GlassCard>
    )
    
    expect(screen.getByText('Card Title')).toBeInTheDocument()
    expect(screen.getByText('Body content')).toBeInTheDocument()
  })

  it('accepts custom className prop', () => {
    render(
      <GlassCard className="custom-class" data-testid="custom-card">
        Content
      </GlassCard>
    )
    
    const card = screen.getByTestId('custom-card')
    expect(card).toHaveClass('custom-class')
  })
})

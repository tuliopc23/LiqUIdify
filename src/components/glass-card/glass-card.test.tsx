import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { GlassCard, GlassCardHeader, GlassCardTitle, GlassCardContent } from './glass-card';

describe('GlassCard', () => {
  it('renders correctly with default props', () => {
    render(<GlassCard data-testid="glass-card">Card content</GlassCard>);
    const card = screen.getByTestId('glass-card');
    
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass('rounded-xl', 'p-6', 'glass-hover');
  });

  it('applies variant classes correctly', () => {
    render(<GlassCard variant="elevated" data-testid="elevated-card">Elevated</GlassCard>);
    const card = screen.getByTestId('elevated-card');
    expect(card).toHaveClass('apple-glass');
  });

  it('applies padding classes correctly', () => {
    render(<GlassCard padding="lg" data-testid="padded-card">Large padding</GlassCard>);
    const card = screen.getByTestId('padded-card');
    expect(card).toHaveClass('p-8');
  });

  it('disables hover when hover prop is false', () => {
    render(<GlassCard hover={false} data-testid="no-hover-card">No hover</GlassCard>);
    const card = screen.getByTestId('no-hover-card');
    expect(card).not.toHaveClass('glass-hover');
  });

  it('removes border when bordered is false', () => {
    render(<GlassCard bordered={false} data-testid="no-border-card">No border</GlassCard>);
    const card = screen.getByTestId('no-border-card');
    expect(card).not.toHaveClass('border');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    render(<GlassCard ref={ref}>Ref test</GlassCard>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe('GlassCard sub-components', () => {
  it('renders GlassCardHeader correctly', () => {
    render(<GlassCardHeader data-testid="card-header">Header</GlassCardHeader>);
    const header = screen.getByTestId('card-header');
    expect(header).toBeInTheDocument();
    expect(header).toHaveClass('mb-4');
  });

  it('renders GlassCardTitle correctly', () => {
    render(<GlassCardTitle data-testid="card-title">Title</GlassCardTitle>);
    const title = screen.getByTestId('card-title');
    expect(title).toBeInTheDocument();
    expect(title.tagName).toBe('H3');
    expect(title).toHaveClass('font-semibold', 'text-primary');
  });

  it('renders GlassCardContent correctly', () => {
    render(<GlassCardContent data-testid="card-content">Content</GlassCardContent>);
    const content = screen.getByTestId('card-content');
    expect(content).toBeInTheDocument();
  });
});
import { describe, it, expect } from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react';
import { GlassButton } from './glass-button';

describe('GlassButton', () => {
  it('renders correctly with default props', () => {
    render(<GlassButton>Click me</GlassButton>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('liquid-glass');
  });

  it('applies variant classes correctly', () => {
    render(<GlassButton variant="primary">Primary</GlassButton>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('text-white', 'font-semibold');
  });

  it('applies size classes correctly', () => {
    render(<GlassButton size="lg">Large</GlassButton>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('px-6', 'py-3', 'text-base', 'min-h-[44px]');
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<GlassButton onClick={handleClick}>Click me</GlassButton>);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('shows loading state correctly', () => {
    render(<GlassButton loading>Loading</GlassButton>);
    const button = screen.getByRole('button');
    
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(screen.getByText('Loading')).toHaveClass('opacity-0');
  });

  it('is disabled when disabled prop is true', () => {
    render(<GlassButton disabled>Disabled</GlassButton>);
    const button = screen.getByRole('button');
    
    expect(button).toBeDisabled();
    expect(button).toHaveClass('disabled:opacity-60');
  });

  it('renders left and right icons', () => {
    const LeftIcon = () => <span data-testid="left-icon">L</span>;
    const RightIcon = () => <span data-testid="right-icon">R</span>;
    
    render(
      <GlassButton leftIcon={<LeftIcon />} rightIcon={<RightIcon />}>
        With Icons
      </GlassButton>
    );
    
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    render(<GlassButton ref={ref}>Ref Test</GlassButton>);
    
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('renders as child component when asChild is true', () => {
    render(
      <GlassButton asChild>
        <a href="/test">Link Button</a>
      </GlassButton>
    );
    
    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveClass('liquid-glass');
  });
});
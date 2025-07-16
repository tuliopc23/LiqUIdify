import { describe, it, expect, vi } from 'vitest';
import { GlassButton } from './glass-button';
import { 
  renderWithProviders, 
  screen, 
  fireEvent, 
  waitFor,
  testA11y,
  createMockProps 
} from '@/test/utils';
import { Loader2, Plus } from 'lucide-react';

describe('GlassButton', () => {
  it('renders with children', () => {
    renderWithProviders(<GlassButton>Click me</GlassButton>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('renders with all variants', () => {
    const variants = ['primary', 'secondary', 'tertiary', 'ghost', 'destructive'] as const;
    
    variants.forEach(variant => {
      const { container } = renderWithProviders(
        <GlassButton variant={variant}>Button</GlassButton>
      );
      
      const button = container.querySelector('button');
      expect(button).toHaveClass(`glass-button-${variant}`);
    });
  });

  it('renders with all sizes', () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
    
    sizes.forEach(size => {
      const { container } = renderWithProviders(
        <GlassButton size={size}>Button</GlassButton>
      );
      
      const button = container.querySelector('button');
      expect(button).toHaveClass(`glass-button-${size}`);
    });
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    renderWithProviders(
      <GlassButton onClick={handleClick}>Click me</GlassButton>
    );
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('disables button when disabled prop is true', () => {
    const handleClick = vi.fn();
    renderWithProviders(
      <GlassButton disabled onClick={handleClick}>
        Disabled
      </GlassButton>
    );
    
    const button = screen.getByText('Disabled');
    expect(button).toBeDisabled();
    
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('shows loading state', () => {
    renderWithProviders(
      <GlassButton loading>Loading</GlassButton>
    );
    
    expect(screen.getByTestId('glass-button-spinner')).toBeInTheDocument();
    expect(screen.getByText('Loading')).toHaveClass('opacity-0');
  });

  it('disables button when loading', () => {
    const handleClick = vi.fn();
    renderWithProviders(
      <GlassButton loading onClick={handleClick}>
        Loading
      </GlassButton>
    );
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-busy', 'true');
    
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('renders with left icon', () => {
    renderWithProviders(
      <GlassButton leftIcon={<Plus data-testid="left-icon" />}>
        With Icon
      </GlassButton>
    );
    
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
  });

  it('renders with right icon', () => {
    renderWithProviders(
      <GlassButton rightIcon={<Plus data-testid="right-icon" />}>
        With Icon
      </GlassButton>
    );
    
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });

  it('handles keyboard interactions', () => {
    const handleClick = vi.fn();
    renderWithProviders(
      <GlassButton onClick={handleClick}>Press Enter</GlassButton>
    );
    
    const button = screen.getByText('Press Enter');
    button.focus();
    
    fireEvent.keyDown(button, { key: 'Enter' });
    expect(handleClick).toHaveBeenCalledTimes(1);
    
    fireEvent.keyDown(button, { key: ' ' });
    expect(handleClick).toHaveBeenCalledTimes(2);
  });

  it('applies custom className', () => {
    renderWithProviders(
      <GlassButton className="custom-class">Custom</GlassButton>
    );
    
    const button = screen.getByText('Custom');
    expect(button).toHaveClass('custom-class');
  });

  it('forwards ref', () => {
    const ref = vi.fn();
    renderWithProviders(
      <GlassButton ref={ref}>Ref Button</GlassButton>
    );
    
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLButtonElement));
  });

  it('supports fullWidth prop', () => {
    renderWithProviders(
      <GlassButton fullWidth>Full Width</GlassButton>
    );
    
    const button = screen.getByText('Full Width');
    expect(button).toHaveClass('w-full');
  });

  it('supports glass effect variations', () => {
    renderWithProviders(
      <GlassButton glassEffect="strong">Strong Glass</GlassButton>
    );
    
    const button = screen.getByText('Strong Glass');
    expect(button).toHaveClass('glass-effect-strong');
  });

  it('handles magnetic hover effect', async () => {
    renderWithProviders(
      <GlassButton magneticHover>Magnetic</GlassButton>
    );
    
    const button = screen.getByText('Magnetic');
    
    fireEvent.mouseEnter(button);
    await waitFor(() => {
      expect(button.parentElement).toHaveClass('magnetic-active');
    });
    
    fireEvent.mouseLeave(button);
    await waitFor(() => {
      expect(button.parentElement).not.toHaveClass('magnetic-active');
    });
  });

  it('supports haptic feedback', () => {
    const mockVibrate = vi.fn();
    Object.defineProperty(navigator, 'vibrate', {
      value: mockVibrate,
      writable: true,
    });
    
    renderWithProviders(
      <GlassButton haptic>Haptic</GlassButton>
    );
    
    fireEvent.click(screen.getByText('Haptic'));
    expect(mockVibrate).toHaveBeenCalled();
  });

  it('meets accessibility standards', async () => {
    const { container } = renderWithProviders(
      <GlassButton>Accessible Button</GlassButton>
    );
    
    await testA11y(container);
  });

  it('has proper ARIA attributes', () => {
    renderWithProviders(
      <GlassButton
        loading
        disabled
        aria-label="Custom label"
        aria-describedby="description"
      >
        ARIA Button
      </GlassButton>
    );
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(button).toHaveAttribute('aria-disabled', 'true');
    expect(button).toHaveAttribute('aria-label', 'Custom label');
    expect(button).toHaveAttribute('aria-describedby', 'description');
  });

  it('handles focus states correctly', () => {
    renderWithProviders(
      <GlassButton>Focus Me</GlassButton>
    );
    
    const button = screen.getByText('Focus Me');
    
    fireEvent.focus(button);
    expect(button).toHaveClass('focus:ring-2');
    
    fireEvent.blur(button);
    expect(document.activeElement).not.toBe(button);
  });

  it('preserves event handlers when disabled', () => {
    const handleMouseEnter = vi.fn();
    renderWithProviders(
      <GlassButton disabled onMouseEnter={handleMouseEnter}>
        Disabled Hover
      </GlassButton>
    );
    
    fireEvent.mouseEnter(screen.getByText('Disabled Hover'));
    expect(handleMouseEnter).toHaveBeenCalled();
  });
});
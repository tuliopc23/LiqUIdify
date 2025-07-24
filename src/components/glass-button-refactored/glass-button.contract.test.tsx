import { describe, it, expect } from 'bun:test';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { GlassButton } from './glass-button';

describe('GlassButton Contract Tests', () => {
  describe('Prop to DOM mapping', () => {
    it('renders children correctly', () => {
      render(<GlassButton>Click me</GlassButton>);
      expect(screen.getByText('Click me')).toBeTruthy();
    });

    it('applies variant classes correctly', () => {
      const { container } = render(<GlassButton variant="destructive">Delete</GlassButton>);
      const button = container.querySelector('button');
      expect(button?.className).toContain('destructive');
    });

    it('applies size classes correctly', () => {
      const { container } = render(<GlassButton size="lg">Large</GlassButton>);
      const button = container.querySelector('button');
      expect(button?.className).toContain('h-11');
    });

    it('disables button when disabled prop is true', () => {
      render(<GlassButton disabled>Disabled</GlassButton>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });

    it('shows loading state correctly', () => {
      render(<GlassButton loading>Loading</GlassButton>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button.getAttribute('aria-busy')).toBe('true');
    });

    it('applies fullWidth class when fullWidth is true', () => {
      const { container } = render(<GlassButton fullWidth>Full Width</GlassButton>);
      const button = container.querySelector('button');
      expect(button?.className).toContain('w-full');
    });

    it('applies custom className', () => {
      const { container } = render(<GlassButton className="custom-class">Custom</GlassButton>);
      const button = container.querySelector('button');
      expect(button?.className).toContain('custom-class');
    });

    it('renders as button element by default', () => {
      render(<GlassButton>Button</GlassButton>);
      const button = screen.getByRole('button');
      expect(button.tagName).toBe('BUTTON');
    });

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<GlassButton ref={ref}>Ref Button</GlassButton>);
      expect(ref.current).toBeTruthy();
      expect(ref.current?.tagName).toBe('BUTTON');
    });

    it('handles onClick events', () => {
      let clicked = false;
      render(<GlassButton onClick={() => clicked = true}>Click</GlassButton>);
      const button = screen.getByRole('button');
      button.click();
      expect(clicked).toBe(true);
    });
  });

  describe('Accessibility contracts', () => {
    it('has proper ARIA attributes when loading', () => {
      render(<GlassButton loading>Loading</GlassButton>);
      const button = screen.getByRole('button');
      expect(button.getAttribute('aria-busy')).toBe('true');
      expect(button.getAttribute('aria-disabled')).toBe('true');
    });

    it('is keyboard accessible', () => {
      render(<GlassButton>Keyboard</GlassButton>);
      const button = screen.getByRole('button');
      expect(button.getAttribute('tabindex')).not.toBe('-1');
    });

    it('has type="button" by default', () => {
      render(<GlassButton>Default Type</GlassButton>);
      const button = screen.getByRole('button');
      expect(button.getAttribute('type')).toBe('button');
    });
  });

  describe('Visual contracts', () => {
    it('applies glass effect classes by default', () => {
      const { container } = render(<GlassButton>Glass</GlassButton>);
      const button = container.querySelector('button');
      expect(button?.className).toContain('backdrop-blur');
    });

    it('removes glass effect when glassEffect is false', () => {
      const { container } = render(<GlassButton glassEffect={false}>No Glass</GlassButton>);
      const button = container.querySelector('button');
      expect(button?.className).not.toContain('backdrop-blur');
    });
  });
});
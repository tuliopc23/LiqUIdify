// @ts-expect-error TS(2307): Cannot find module 'bun:test' or its corresponding... Remove this comment to see the full error message
import { describe, it, expect } from 'bun:test';
import React from 'react';
import { render, screen } from '@testing-library/react';
// @ts-expect-error TS(6142): Module './glass-button' was resolved to '/Users/tu... Remove this comment to see the full error message
import { GlassButton } from './glass-button';

describe('GlassButton Contract Tests', () => {
  describe('Prop to DOM mapping', () => {
    it('renders children correctly', () => {
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      render(<GlassButton>Click me</GlassButton>);
      expect(screen.getByText('Click me')).toBeTruthy();
    });

    it('applies variant classes correctly', () => {
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      const { container } = render(<GlassButton variant="destructive">Delete</GlassButton>);
      const button = container.querySelector('button');
      expect(button?.className).toContain('destructive');
    });

    it('applies size classes correctly', () => {
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      const { container } = render(<GlassButton size="lg">Large</GlassButton>);
      const button = container.querySelector('button');
      expect(button?.className).toContain('h-11');
    });

    it('disables button when disabled prop is true', () => {
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      render(<GlassButton disabled>Disabled</GlassButton>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });

    it('shows loading state correctly', () => {
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      render(<GlassButton loading>Loading</GlassButton>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button.getAttribute('aria-busy')).toBe('true');
    });

    it('applies fullWidth class when fullWidth is true', () => {
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      const { container } = render(<GlassButton fullWidth>Full Width</GlassButton>);
      const button = container.querySelector('button');
      expect(button?.className).toContain('w-full');
    });

    it('applies custom className', () => {
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      const { container } = render(<GlassButton className="custom-class">Custom</GlassButton>);
      const button = container.querySelector('button');
      expect(button?.className).toContain('custom-class');
    });

    it('renders as button element by default', () => {
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      render(<GlassButton>Button</GlassButton>);
      const button = screen.getByRole('button');
      expect(button.tagName).toBe('BUTTON');
    });

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLButtonElement>();
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      render(<GlassButton ref={ref}>Ref Button</GlassButton>);
      expect(ref.current).toBeTruthy();
      expect(ref.current?.tagName).toBe('BUTTON');
    });

    it('handles onClick events', () => {
      let clicked = false;
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      render(<GlassButton onClick={() => clicked = true}>Click</GlassButton>);
      const button = screen.getByRole('button');
      button.click();
      expect(clicked).toBe(true);
    });
  });

  describe('Accessibility contracts', () => {
    it('has proper ARIA attributes when loading', () => {
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      render(<GlassButton loading>Loading</GlassButton>);
      const button = screen.getByRole('button');
      expect(button.getAttribute('aria-busy')).toBe('true');
      expect(button.getAttribute('aria-disabled')).toBe('true');
    });

    it('is keyboard accessible', () => {
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      render(<GlassButton>Keyboard</GlassButton>);
      const button = screen.getByRole('button');
      expect(button.getAttribute('tabindex')).not.toBe('-1');
    });

    it('has type="button" by default', () => {
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      render(<GlassButton>Default Type</GlassButton>);
      const button = screen.getByRole('button');
      expect(button.getAttribute('type')).toBe('button');
    });
  });

  describe('Visual contracts', () => {
    it('applies glass effect classes by default', () => {
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      const { container } = render(<GlassButton>Glass</GlassButton>);
      const button = container.querySelector('button');
      expect(button?.className).toContain('backdrop-blur');
    });

    it('removes glass effect when glassEffect is false', () => {
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      const { container } = render(<GlassButton glassEffect={false}>No Glass</GlassButton>);
      const button = container.querySelector('button');
      expect(button?.className).not.toContain('backdrop-blur');
    });
  });
});
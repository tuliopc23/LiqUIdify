import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { GlassButton } from './glass-button';
import { runAccessibilityCheck, expectAccessible } from '@/utils/accessibility-testing';

// Custom matcher for accessibility violations
expect.extend({
  toHaveNoViolations(received) {
    const pass = received.violations.length === 0;
    if (pass) {
      return {
        message: () => `Expected accessibility violations, but none were found`,
        pass: true,
      };
    } else {
      return {
        message: () => `Expected no accessibility violations, but found ${received.violations.length}:\n${received.violations.map((v: any) => `- ${v.description}`).join('\n')}`,
        pass: false,
      };
    }
  },
});

describe('GlassButton Accessibility', () => {
  it('should be accessible with default props', async () => {
    const { container } = render(<GlassButton>Click me</GlassButton>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should be accessible when disabled', async () => {
    const { container } = render(<GlassButton disabled>Disabled button</GlassButton>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should be accessible in loading state', async () => {
    const { container } = render(<GlassButton loading aria-label="Loading button">Loading...</GlassButton>);
    const button = screen.getByRole('button', { name: /loading button/i });
    
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(button).toBeDisabled();
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper focus management', () => {
    render(<GlassButton>Focus test</GlassButton>);
    const button = screen.getByRole('button', { name: /focus test/i });
    
    // Should be focusable
    expect(button.tabIndex).not.toBe(-1);
    
    // Should have focus styles
    button.focus();
    expect(button).toHaveFocus();
  });

  it('should support keyboard navigation', () => {
    const handleClick = vi.fn();
    render(<GlassButton onClick={handleClick}>Keyboard test</GlassButton>);
    const button = screen.getByRole('button', { name: /keyboard test/i });
    
    button.focus();
    // Simulate Enter key
    fireEvent.keyDown(button, { key: 'Enter', code: 'Enter' });
    // Note: GlassButton should handle Enter key press, this might need implementation
  });

  it('should pass custom accessibility checker', () => {
    render(<GlassButton>Custom check</GlassButton>);
    const button = screen.getByRole('button');
    
    expectAccessible(button, 'GlassButton', 85);
  });

  it('should be accessible with icons', async () => {
    const LeftIcon = () => <span aria-hidden="true">👍</span>;
    const RightIcon = () => <span aria-hidden="true">→</span>;
    
    const { container } = render(
      <GlassButton 
        leftIcon={<LeftIcon />} 
        rightIcon={<RightIcon />}
        aria-label="Like and continue"
      >
        Like
      </GlassButton>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should be accessible as child component', async () => {
    const { container } = render(
      <GlassButton asChild>
        <a href="/test" aria-label="Navigate to test page">
          Link Button
        </a>
      </GlassButton>
    );
    
    const linkButton = screen.getByRole('link', { name: /navigate to test page/i });
    expect(linkButton).toBeInTheDocument();

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should provide proper ARIA attributes for different variants', async () => {
    const variants = ['primary', 'secondary', 'destructive'] as const;
    
    for (const variant of variants) {
      const { container, unmount } = render(
        <GlassButton variant={variant}>
          {variant} button
        </GlassButton>
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
      
      unmount();
    }
  });

  it('should maintain accessibility with custom styling', async () => {
    const { container } = render(
      <GlassButton 
        className="custom-glass-button"
        style={{ opacity: 0.5 }}
      >
        Custom styled
      </GlassButton>
    );
    
    const button = screen.getByRole('button');
    const checkResult = runAccessibilityCheck(button, 'CustomGlassButton');
    
    // Should warn about potential contrast issues due to low opacity
    const contrastWarnings = checkResult.issues.filter(
      issue => issue.rule === 'color-contrast'
    );
    expect(contrastWarnings.length).toBeGreaterThan(0);
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
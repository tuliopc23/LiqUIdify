import { describe, it, expect, vi } from 'vitest';
import {
  render,
  screen,
  fireEvent,
  testAccessibility,
  getGlassComponentTestSuite,
  testCommonProps,
  testGlassPerformance,
} from '@/test-utils';
import { GlassInput } from './glass-input';

const testSuite = getGlassComponentTestSuite('GlassInput');

describe('GlassInput', () => {
  it(testSuite.shouldRender, () => {
    render(<GlassInput placeholder="Enter text" />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass('apple-glass');
  });

  it('applies size classes correctly', () => {
    render(<GlassInput size="lg" placeholder="Large input" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('px-4', 'py-3');
  });

  it('applies variant classes correctly', () => {
    const { rerender } = render(
      <GlassInput variant="default" placeholder="Default" />
    );
    let input = screen.getByRole('textbox');
    expect(input).toHaveClass('border-[var(--glass-border)]');

    rerender(<GlassInput variant="search" placeholder="Search" />);
    input = screen.getByRole('textbox');
    expect(input).toHaveClass('border-[var(--glass-border)]');
  });

  it('handles controlled input correctly', () => {
    const handleChange = vi.fn();
    const { rerender } = render(
      <GlassInput
        value="initial"
        onChange={handleChange}
        placeholder="Controlled"
      />
    );

    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('initial');

    fireEvent.change(input, { target: { value: 'updated' } });
    expect(handleChange).toHaveBeenCalledTimes(1);

    rerender(
      <GlassInput
        value="updated"
        onChange={handleChange}
        placeholder="Controlled"
      />
    );
    expect(input.value).toBe('updated');
  });

  it('handles uncontrolled input correctly', () => {
    render(<GlassInput defaultValue="default" placeholder="Uncontrolled" />);
    const input = screen.getByRole('textbox') as HTMLInputElement;

    expect(input.value).toBe('default');

    fireEvent.change(input, { target: { value: 'changed' } });
    expect(input.value).toBe('changed');
  });

  it(testSuite.shouldHandleDisabled, () => {
    render(<GlassInput disabled placeholder="Disabled input" />);
    const input = screen.getByRole('textbox');

    expect(input).toBeDisabled();
    expect(input).toHaveClass(
      'disabled:opacity-50',
      'disabled:cursor-not-allowed'
    );
  });

  it('shows error state correctly', () => {
    render(<GlassInput error={true} placeholder="Error input" />);
    const input = screen.getByRole('textbox');

    expect(input).toHaveClass('border-red-400/50');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('renders with left and right icons', () => {
    const LeftIcon = () => <span data-testid="left-icon">L</span>;
    const RightIcon = () => <span data-testid="right-icon">R</span>;

    render(
      <GlassInput
        leftIcon={<LeftIcon />}
        rightIcon={<RightIcon />}
        placeholder="With icons"
      />
    );

    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });

  it('supports different input types', () => {
    const { rerender } = render(
      <GlassInput type="email" placeholder="Email" />
    );
    let input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('type', 'email');

    rerender(<GlassInput type="password" placeholder="Password" />);
    input = screen.getByPlaceholderText('Password');
    expect(input).toHaveAttribute('type', 'password');

    rerender(<GlassInput type="number" placeholder="Number" />);
    input = screen.getByRole('spinbutton');
    expect(input).toHaveAttribute('type', 'number');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    render(<GlassInput ref={ref} placeholder="Ref test" />);

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('handles focus and blur events', () => {
    const handleFocus = vi.fn();
    const handleBlur = vi.fn();

    render(
      <GlassInput
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="Focus test"
      />
    );

    const input = screen.getByRole('textbox');

    fireEvent.focus(input);
    expect(handleFocus).toHaveBeenCalledTimes(1);

    fireEvent.blur(input);
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  // Common prop tests
  describe('Common Props', () => {
    it('applies custom className', () => {
      render(<GlassInput className="custom-class" placeholder="Test" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('custom-class');
    });

    it('applies custom style', () => {
      render(<GlassInput style={{ opacity: 0.5 }} placeholder="Test" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveStyle({ opacity: '0.5' });
    });

    it('supports data-testid', () => {
      render(<GlassInput data-testid="test-input" placeholder="Test" />);
      const input = screen.getByTestId('test-input');
      expect(input).toBeInTheDocument();
    });
  });

  // Performance test
  it(
    'renders performantly',
    testGlassPerformance((props: any) => (
      <GlassInput placeholder="Performance test" {...props} />
    ))
  );
});

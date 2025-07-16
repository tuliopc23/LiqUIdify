import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { GlassModal } from './glass-modal';
import { 
  renderWithProviders, 
  screen, 
  fireEvent, 
  waitFor,
  testA11y,
  createMockProps 
} from '@/test/utils';
import { announcer } from '@/components/glass-live-region';

// Mock the announcer and provider
vi.mock('@/components/glass-live-region', () => ({
  announcer: {
    announce: vi.fn(),
  },
  GlassLiveRegionProvider: ({ children }: { children: React.ReactNode }) => children,
}));

describe('GlassModal', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    children: <div>Modal content</div>,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    // Cleanup any body styles
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  });

  it('renders when open', () => {
    renderWithProviders(<GlassModal {...defaultProps} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Modal content')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    renderWithProviders(<GlassModal {...defaultProps} isOpen={false} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders with title', () => {
    renderWithProviders(
      <GlassModal {...defaultProps} title="Test Modal" />
    );
    
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-labelledby');
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn();
    renderWithProviders(
      <GlassModal {...defaultProps} onClose={onClose} title="Test Modal" />
    );
    
    fireEvent.click(screen.getByLabelText('Close modal'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when clicking backdrop', () => {
    const onClose = vi.fn();
    renderWithProviders(
      <GlassModal {...defaultProps} onClose={onClose} />
    );
    
    const backdrop = document.querySelector('.glass-modal-backdrop');
    fireEvent.click(backdrop!);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not close on backdrop click when disabled', () => {
    const onClose = vi.fn();
    renderWithProviders(
      <GlassModal 
        {...defaultProps} 
        onClose={onClose} 
        closeOnBackdropClick={false} 
      />
    );
    
    const backdrop = document.querySelector('.glass-modal-backdrop');
    fireEvent.click(backdrop!);
    expect(onClose).not.toHaveBeenCalled();
  });

  it('does not close when clicking modal content', () => {
    const onClose = vi.fn();
    renderWithProviders(
      <GlassModal {...defaultProps} onClose={onClose} />
    );
    
    fireEvent.click(screen.getByRole('dialog'));
    expect(onClose).not.toHaveBeenCalled();
  });

  it('locks body scroll when open', () => {
    renderWithProviders(<GlassModal {...defaultProps} />);
    
    expect(document.body.style.overflow).toBe('hidden');
    expect(document.body.style.paddingRight).toBeTruthy();
  });

  it('restores body scroll when closed', () => {
    const { rerender } = renderWithProviders(<GlassModal {...defaultProps} />);
    
    expect(document.body.style.overflow).toBe('hidden');
    
    rerender(<GlassModal {...defaultProps} isOpen={false} />);
    
    expect(document.body.style.overflow).toBe('');
    expect(document.body.style.paddingRight).toBe('');
  });

  it('applies custom className', () => {
    renderWithProviders(
      <GlassModal {...defaultProps} className="custom-modal" />
    );
    
    const modal = screen.getByRole('dialog');
    expect(modal).toHaveClass('custom-modal');
  });

  it('applies custom title className', () => {
    renderWithProviders(
      <GlassModal 
        {...defaultProps} 
        title="Custom Title" 
        titleClassName="custom-title" 
      />
    );
    
    expect(screen.getByText('Custom Title')).toHaveClass('custom-title');
  });

  it('applies custom content className', () => {
    renderWithProviders(
      <GlassModal {...defaultProps} contentClassName="custom-content" />
    );
    
    const content = document.querySelector('.glass-modal-content');
    expect(content).toHaveClass('custom-content');
  });

  it('handles escape key when enabled', () => {
    const onClose = vi.fn();
    renderWithProviders(
      <GlassModal {...defaultProps} onClose={onClose} />
    );
    
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not handle escape key when disabled', () => {
    const onClose = vi.fn();
    renderWithProviders(
      <GlassModal 
        {...defaultProps} 
        onClose={onClose} 
        closeOnEscape={false} 
      />
    );
    
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).not.toHaveBeenCalled();
  });

  it('announces when opened', () => {
    renderWithProviders(
      <GlassModal {...defaultProps} title="Announcement Test" />
    );
    
    expect(announcer.announce).toHaveBeenCalledWith(
      'Announcement Test opened',
      'polite'
    );
  });

  it('announces generic message when opened without title', () => {
    renderWithProviders(<GlassModal {...defaultProps} />);
    
    expect(announcer.announce).toHaveBeenCalledWith(
      'Dialog opened',
      'polite'
    );
  });

  it('meets accessibility standards', async () => {
    const { container } = renderWithProviders(
      <GlassModal {...defaultProps} title="Accessible Modal" />
    );
    
    await testA11y(container);
  });

  it('has proper ARIA attributes', () => {
    renderWithProviders(
      <GlassModal {...defaultProps} title="ARIA Test" />
    );
    
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-labelledby');
    expect(dialog).toHaveAttribute('aria-describedby');
  });

  it('focuses close button by default', async () => {
    renderWithProviders(
      <GlassModal {...defaultProps} title="Focus Test" />
    );
    
    await waitFor(() => {
      const closeButton = screen.getByLabelText('Close modal');
      expect(document.activeElement).toBe(closeButton);
    });
  });

  it('supports custom initial focus', async () => {
    const focusRef = { current: null } as React.RefObject<HTMLButtonElement>;
    
    renderWithProviders(
      <GlassModal {...defaultProps} initialFocus={focusRef}>
        <button ref={focusRef}>Focus me</button>
      </GlassModal>
    );
    
    await waitFor(() => {
      expect(document.activeElement).toBe(screen.getByText('Focus me'));
    });
  });

  it('renders in a custom portal target', () => {
    const portalTarget = document.createElement('div');
    portalTarget.id = 'custom-portal';
    document.body.appendChild(portalTarget);
    
    renderWithProviders(
      <GlassModal {...defaultProps} portalTarget={portalTarget} />
    );
    
    expect(portalTarget.querySelector('.glass-modal')).toBeInTheDocument();
    
    // Cleanup
    document.body.removeChild(portalTarget);
  });

  it('handles animation classes', () => {
    renderWithProviders(<GlassModal {...defaultProps} />);
    
    const modal = screen.getByRole('dialog');
    expect(modal).toHaveClass('animate-scale');
  });

  it('manages focus trap correctly', async () => {
    renderWithProviders(
      <GlassModal {...defaultProps} title="Focus Trap Test">
        <button>First button</button>
        <button>Second button</button>
        <button>Third button</button>
      </GlassModal>
    );
    
    const buttons = screen.getAllByRole('button');
    const closeButton = screen.getByLabelText('Close modal');
    
    // Initial focus should be on close button
    await waitFor(() => {
      expect(document.activeElement).toBe(closeButton);
    });
    
    // Tab should cycle through focusable elements
    fireEvent.keyDown(document, { key: 'Tab' });
    expect(document.activeElement).toBe(buttons[1]); // First content button
    
    fireEvent.keyDown(document, { key: 'Tab' });
    expect(document.activeElement).toBe(buttons[2]); // Second content button
  });

  it('stops event propagation on modal content click', () => {
    const onClose = vi.fn();
    const outerClick = vi.fn();
    
    renderWithProviders(
      <div onClick={outerClick}>
        <GlassModal {...defaultProps} onClose={onClose} />
      </div>
    );
    
    fireEvent.click(screen.getByRole('dialog'));
    expect(onClose).not.toHaveBeenCalled();
    expect(outerClick).not.toHaveBeenCalled();
  });

  it('cleans up body styles on unmount', () => {
    const { unmount } = renderWithProviders(<GlassModal {...defaultProps} />);
    
    expect(document.body.style.overflow).toBe('hidden');
    
    unmount();
    
    expect(document.body.style.overflow).toBe('');
    expect(document.body.style.paddingRight).toBe('');
  });
});
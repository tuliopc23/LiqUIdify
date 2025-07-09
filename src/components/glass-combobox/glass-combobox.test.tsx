import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { GlassCombobox } from './glass-combobox';

describe('GlassCombobox', () => {
  const mockOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  it('renders correctly', () => {
    render(
      <GlassCombobox 
        options={mockOptions} 
        placeholder="Select an option"
        onChange={vi.fn()}
      />
    );
    
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByText('Select an option')).toBeInTheDocument();
  });

  it('shows options when clicked', async () => {
    render(
      <GlassCombobox 
        options={mockOptions} 
        placeholder="Select an option"
        onChange={vi.fn()}
      />
    );
    
    const combobox = screen.getByRole('combobox');
    fireEvent.click(combobox);
    
    await waitFor(() => {
      expect(screen.getByText('Option 1')).toBeInTheDocument();
      expect(screen.getByText('Option 2')).toBeInTheDocument();
      expect(screen.getByText('Option 3')).toBeInTheDocument();
    });
  });

  it('filters options based on search input', async () => {
    render(
      <GlassCombobox 
        options={mockOptions} 
        placeholder="Select an option"
        onChange={vi.fn()}
      />
    );
    
    const combobox = screen.getByRole('combobox');
    fireEvent.click(combobox);
    
    const searchInput = screen.getByRole('textbox');
    fireEvent.change(searchInput, { target: { value: 'Option 1' } });
    
    await waitFor(() => {
      expect(screen.getByText('Option 1')).toBeInTheDocument();
      expect(screen.queryByText('Option 2')).not.toBeInTheDocument();
      expect(screen.queryByText('Option 3')).not.toBeInTheDocument();
    });
  });

  it('calls onValueChange when option is selected', async () => {
    const mockOnChange = vi.fn();
    
    render(
      <GlassCombobox 
        options={mockOptions} 
        placeholder="Select an option"
        onChange={mockOnChange}
      />
    );
    
    const combobox = screen.getByRole('combobox');
    fireEvent.click(combobox);
    
    await waitFor(() => {
      const option = screen.getByText('Option 1');
      fireEvent.click(option);
    });
    
    expect(mockOnChange).toHaveBeenCalledWith('option1');
  });

  it('displays selected value correctly', () => {
    render(
      <GlassCombobox 
        options={mockOptions} 
        placeholder="Select an option"
        value="option1"
        onChange={vi.fn()}
      />
    );
    
    expect(screen.getByText('Option 1')).toBeInTheDocument();
  });

  it('is disabled when disabled prop is true', () => {
    render(
      <GlassCombobox 
        options={mockOptions} 
        placeholder="Select an option"
        disabled
        onChange={vi.fn()}
      />
    );
    
    const combobox = screen.getByRole('combobox');
    expect(combobox).toBeDisabled();
  });

  it('shows clear button when clearable and has value', () => {
    render(
      <GlassCombobox 
        options={mockOptions} 
        placeholder="Select an option"
        value="option1"
        clearable
        onChange={vi.fn()}
      />
    );
    
    const clearButton = screen.getByRole('button', { name: /clear/i });
    expect(clearButton).toBeInTheDocument();
  });

  it('clears value when clear button is clicked', async () => {
    const mockOnChange = vi.fn();
    
    render(
      <GlassCombobox 
        options={mockOptions} 
        placeholder="Select an option"
        value="option1"
        clearable
        onChange={mockOnChange}
      />
    );
    
    const clearButton = screen.getByRole('button', { name: /clear/i });
    fireEvent.click(clearButton);
    
    expect(mockOnChange).toHaveBeenCalledWith('');
  });

  it('supports keyboard navigation', async () => {
    render(
      <GlassCombobox 
        options={mockOptions} 
        placeholder="Select an option"
        onChange={vi.fn()}
      />
    );
    
    const combobox = screen.getByRole('combobox');
    fireEvent.keyDown(combobox, { key: 'ArrowDown' });
    
    await waitFor(() => {
      expect(screen.getByText('Option 1')).toBeInTheDocument();
    });
  });

  it('shows empty state when no options match search', async () => {
    render(
      <GlassCombobox 
        options={mockOptions} 
        placeholder="Select an option"
        emptyMessage="No options found"
        onChange={vi.fn()}
      />
    );
    
    const combobox = screen.getByRole('combobox');
    fireEvent.click(combobox);
    
    const searchInput = screen.getByRole('textbox');
    fireEvent.change(searchInput, { target: { value: 'nonexistent' } });
    
    await waitFor(() => {
      expect(screen.getByText('No options found')).toBeInTheDocument();
    });
  });

  it('applies correct CSS classes for different sizes', () => {
    const { rerender } = render(
      <GlassCombobox 
        options={mockOptions} 
        placeholder="Select an option"
        size="sm"
        onChange={vi.fn()}
      />
    );
    
    let combobox = screen.getByRole('combobox');
    expect(combobox).toHaveClass('text-sm');
    
    rerender(
      <GlassCombobox 
        options={mockOptions} 
        placeholder="Select an option"
        size="lg"
        onChange={vi.fn()}
      />
    );
    
    combobox = screen.getByRole('combobox');
    expect(combobox).toHaveClass('text-lg');
  });

  it('shows loading state correctly', () => {
    render(
      <GlassCombobox 
        options={mockOptions} 
        placeholder="Select an option"
        loading
        onChange={vi.fn()}
      />
    );
    
    const combobox = screen.getByRole('combobox');
    fireEvent.click(combobox);
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});

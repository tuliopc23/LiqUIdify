import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, within } from '../../test/test-utils'
import { GlassCombobox, type ComboboxOption } from './glass-combobox'

const options: ComboboxOption[] = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
]

describe('GlassCombobox', () => {
  it('renders and opens on click', () => {
    render(<GlassCombobox options={options} placeholder="Search or select" />)

    const trigger = screen.getByRole('combobox')
    expect(trigger).toBeInTheDocument()
    expect(trigger).toHaveAttribute('aria-expanded', 'false')

    fireEvent.click(trigger)
    expect(screen.getByRole('listbox')).toBeInTheDocument()
  })

  it('filters options by typing and selects with Enter', () => {
    const onChange = vi.fn()
    render(
      <GlassCombobox options={options} onChange={onChange} placeholder="Search" />,
    )

    const trigger = screen.getByRole('combobox')
    fireEvent.click(trigger)

    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'ang' } })

    const listbox = screen.getByRole('listbox')
    const visible = within(listbox).getAllByRole('option')
    expect(visible).toHaveLength(1)
    expect(visible[0]).toHaveTextContent('Angular')

    // ArrowDown to highlight, Enter to select
    fireEvent.keyDown(input, { key: 'ArrowDown' })
    fireEvent.keyDown(input, { key: 'Enter' })

    expect(onChange).toHaveBeenCalledWith('angular')
    expect(screen.queryByRole('listbox')).toBeNull()
  })

  it('skips selecting when highlighted index is out of range', () => {
    const onChange = vi.fn()
    render(<GlassCombobox options={options} onChange={onChange} />)

    const trigger = screen.getByRole('combobox')
    fireEvent.click(trigger)

    const input = screen.getByRole('textbox')
    // Press Enter without moving highlight
    fireEvent.keyDown(input, { key: 'Enter' })
    expect(onChange).not.toHaveBeenCalled()
  })

  it('closes with Escape and clears highlight', () => {
    render(<GlassCombobox options={options} />)

    const trigger = screen.getByRole('combobox')
    fireEvent.click(trigger)
    expect(screen.getByRole('listbox')).toBeInTheDocument()

    const input = screen.getByRole('textbox')
    fireEvent.keyDown(input, { key: 'Escape' })

    expect(screen.queryByRole('listbox')).toBeNull()
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
  })

  it('passes a11y smoke checks', async () => {
    const { container } = render(<GlassCombobox options={options} />)
    const { getAxe } = await import('../../test/axe')
    const axe = getAxe(container as unknown as HTMLElement)
    await axe()
  })
})

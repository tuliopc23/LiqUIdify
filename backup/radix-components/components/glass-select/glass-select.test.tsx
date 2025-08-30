import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, within } from "../../test/test-utils";
import { GlassSelect, type GlassSelectOption } from "./glass-select";

const options: GlassSelectOption[] = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
];

const optionsWithDisabled: GlassSelectOption[] = [
  { value: "active1", label: "Active 1" },
  { value: "disabled1", label: "Disabled 1", disabled: true },
  { value: "active2", label: "Active 2" },
];

describe("GlassSelect", () => {
  beforeEach(() => {
    // Ensure document has focus
    (document.body as HTMLElement).focus();
  });

  it("renders placeholder and basic structure", () => {
    render(<GlassSelect options={options} placeholder="Select a framework" />);

    const combobox = screen.getByRole("combobox");
    expect(combobox).toBeInTheDocument();
    expect(combobox).toHaveAttribute("aria-haspopup", "listbox");
    expect(combobox).toHaveAttribute("aria-expanded", "false");
    expect(combobox).toHaveTextContent("Select a framework");
  });

  it("opens and closes the listbox by click", () => {
    render(<GlassSelect options={options} placeholder="Pick one" />);

    const trigger = screen.getByRole("combobox");
    fireEvent.click(trigger);

    const listbox = screen.getByRole("listbox");
    expect(listbox).toBeInTheDocument();

    // Close by clicking outside
    fireEvent.mouseDown(document.body);
    expect(screen.queryByRole("listbox")).toBeNull();
  });

  it("selects an option by click (single select)", () => {
    const onChange = vi.fn();
    render(
      <GlassSelect options={options} onChange={onChange} placeholder="Pick" />,
    );

    const trigger = screen.getByRole("combobox");
    fireEvent.click(trigger);

    const listbox = screen.getByRole("listbox");
    const option = within(listbox).getByRole("option", { name: "Vue" });
    fireEvent.click(option);

    expect(onChange).toHaveBeenCalledWith("vue");
    // List should be closed and selection visible on trigger
    expect(screen.queryByRole("listbox")).toBeNull();
    expect(trigger).toHaveTextContent("Vue");
  });

  it("does not select disabled options", () => {
    const onChange = vi.fn();
    render(<GlassSelect options={optionsWithDisabled} onChange={onChange} />);

    const trigger = screen.getByRole("combobox");
    fireEvent.click(trigger);

    const listbox = screen.getByRole("listbox");
    const disabledOption = within(listbox).getByRole("option", {
      name: "Disabled 1",
    });
    expect(disabledOption).toBeDisabled();

    fireEvent.click(disabledOption);
    expect(onChange).not.toHaveBeenCalled();
  });

  it("supports keyboard navigation and selection", () => {
    const onChange = vi.fn();
    render(
      <GlassSelect options={options} onChange={onChange} placeholder="Pick" />,
    );

    const trigger = screen.getByRole("combobox");

    // Open with Enter
    fireEvent.keyDown(trigger, { key: "Enter" });
    expect(screen.getByRole("listbox")).toBeInTheDocument();

    // ArrowDown to move focus, Enter to select
    fireEvent.keyDown(document, { key: "ArrowDown" });
    fireEvent.keyDown(document, { key: "Enter" });

    // Should select first option (React) by default navigation
    expect(onChange).toHaveBeenCalledWith("react");
    expect(screen.queryByRole("listbox")).toBeNull();
  });

  it("closes with Escape and resets focus state", () => {
    render(<GlassSelect options={options} />);

    const trigger = screen.getByRole("combobox");
    fireEvent.click(trigger);
    expect(screen.getByRole("listbox")).toBeInTheDocument();

    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("listbox")).toBeNull();
    // aria-expanded should reflect closed state
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("searchable variant filters options", () => {
    render(
      <GlassSelect options={options} searchable placeholder="Search..." />,
    );

    const trigger = screen.getByRole("combobox");
    fireEvent.click(trigger);

    // Type into the internal search input
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "sve" } });

    // Only Svelte should remain
    const listbox = screen.getByRole("listbox");
    const visibleOptions = within(listbox).getAllByRole("option");
    expect(visibleOptions).toHaveLength(1);
    expect(visibleOptions[0]).toHaveTextContent("Svelte");
  });

  it("exposes proper ARIA roles and selection state", () => {
    render(<GlassSelect options={options} />);

    const trigger = screen.getByRole("combobox");
    fireEvent.click(trigger);

    const listbox = screen.getByRole("listbox");
    const allOptions = within(listbox).getAllByRole("option");
    expect(allOptions.length).toBe(options.length);

    // None selected initially
    allOptions.forEach((el) => {
      expect(el).toHaveAttribute("aria-selected", "false");
    });
  });

  it("passes basic a11y smoke checks", async () => {
    const { container } = render(<GlassSelect options={options} searchable />);
    const { getAxe } = await import("../../test/axe");
    const axe = getAxe(container as unknown as HTMLElement);
    await axe();
  });
});

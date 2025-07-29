import { GlassCheckbox } from "../glass-checkbox";
import CheckboxGroup from "./glass-checkbox-group";
import "@/styles/apple-liquid-authentic.css";

export default {
  title: "Components/GlassCheckboxGroup",
  component: CheckboxGroup,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A group of checkboxes with Liquid Glass styling for consistent Apple-inspired UI.",
      },
    },
  },
};

export const Playground = () => (
  <div className="apple-glass mx-auto max-w-md p-8">
    <CheckboxGroup name="fruits">
      <GlassCheckbox label="Apple" name="fruits" value="apple" />
      <GlassCheckbox label="Banana" name="fruits" value="banana" />
      <GlassCheckbox label="Cherry" name="fruits" value="cherry" />
    </CheckboxGroup>
  </div>
);

export const EdgeCases = () => (
  <div className="apple-glass mx-auto max-w-md p-8">
    <CheckboxGroup name="empty-group">
      {/* No children: should render an empty group gracefully */}
    </CheckboxGroup>
    <div className="mt-6" />
    <CheckboxGroup name="long-labels">
      <GlassCheckbox
        label="A very long label that should wrap and not break the layout of the checkbox group in any way."
        name="long-labels"
        value="long1"
      />
      <GlassCheckbox label="Short" name="long-labels" value="short" />
    </CheckboxGroup>
  </div>
);

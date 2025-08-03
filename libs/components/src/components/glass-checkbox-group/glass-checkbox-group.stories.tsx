import { GlassCheckbox } from "../glass-checkbox";
import { GlassCheckboxGroup } from "./glass-checkbox-group";
import "@/styles/index.css";

export default {
  title: "Components/GlassCheckboxGroup",
  component: GlassCheckboxGroup,
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
    <GlassCheckboxGroup name="fruits">
      <GlassCheckbox label="Apple" name="fruits" value="apple" />
      <GlassCheckbox label="Banana" name="fruits" value="banana" />
      <GlassCheckbox label="Cherry" name="fruits" value="cherry" />
    </GlassCheckboxGroup>
  </div>
);

export const EdgeCases = () => (
  <div className="apple-glass mx-auto max-w-md p-8">
    <GlassCheckboxGroup name="empty-group">
      {/* No children: should render an empty group gracefully */}
    </GlassCheckboxGroup>
    <div className="mt-6" />
    <GlassCheckboxGroup name="long-labels">
      <GlassCheckbox
        label="A very long label that should wrap and not break the layout of the checkbox group in any way."
        name="long-labels"
        value="long1"
      />
      <GlassCheckbox label="Short" name="long-labels" value="short" />
    </GlassCheckboxGroup>
  </div>
);

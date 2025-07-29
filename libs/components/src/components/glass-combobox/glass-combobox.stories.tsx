import { GlassCombobox } from "./glass-combobox";
import "@/styles/apple-liquid-authentic.css";

const sampleOptions = [
  { value: "apple", label: "Apple", icon: "🍎" },
  { value: "banana", label: "Banana", icon: "🍌" },
  { value: "cherry", label: "Cherry", icon: "🍒" },
  { value: "dragonfruit", label: "Dragon Fruit", icon: "🐉" },
  { value: "elderberry", label: "Elderberry", icon: "🫐" },
];

const disabledOptions = [
  { value: "apple", label: "Apple", icon: "🍎" },
  { value: "banana", label: "Banana", icon: "🍌", disabled: true },
  { value: "cherry", label: "Cherry", icon: "🍒" },
  { value: "dragonfruit", label: "Dragon Fruit", icon: "🐉", disabled: true },
  { value: "elderberry", label: "Elderberry", icon: "🫐" },
];

export default {
  title: "Components/GlassCombobox",
  component: GlassCombobox,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A searchable dropdown component with Liquid Glass styling for consistent Apple-inspired UI.",
      },
    },
  },
};

export const Playground = () => (
  <div className="apple-glass mx-auto max-w-md p-8">
    <GlassCombobox
      options={sampleOptions}
      placeholder="Select a fruit..."
      searchable
      clearable
    />
  </div>
);

export const EdgeCases = () => (
  <div className="apple-glass mx-auto max-w-md space-y-6 p-8">
    <div>
      <h3 className="mb-2 text-white">Disabled Options</h3>
      <GlassCombobox
        options={disabledOptions}
        placeholder="Some options are disabled..."
        searchable
      />
    </div>
    <div>
      <h3 className="mb-2 text-white">Loading State</h3>
      <GlassCombobox
        options={sampleOptions}
        placeholder="Loading..."
        loading
        searchable
      />
    </div>
    <div>
      <h3 className="mb-2 text-white">Empty State</h3>
      <GlassCombobox
        options={[]}
        placeholder="No options available"
        emptyMessage="No fruits found"
        searchable
      />
    </div>
  </div>
);

export const Sizes = () => (
  <div className="apple-glass mx-auto max-w-md space-y-4 p-8">
    <GlassCombobox
      options={sampleOptions}
      placeholder="Small size..."
      size="sm"
      searchable
    />
    <GlassCombobox
      options={sampleOptions}
      placeholder="Medium size (default)..."
      size="md"
      searchable
    />
    <GlassCombobox
      options={sampleOptions}
      placeholder="Large size..."
      size="lg"
      searchable
    />
  </div>
);

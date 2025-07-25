import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { GlassSelect, GlassSelectOption } from "./glass-select";
import { Globe, Code, Palette, Cpu, User, Mail, Phone, Calendar } from "lucide-react";

const meta = {
  title: "Glass UI/GlassSelect",
  component: GlassSelect,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
## GlassSelect Component

A sophisticated select dropdown component featuring glassmorphic styling, smooth animations, and comprehensive keyboard navigation. The component supports disabled options, custom placeholders, and maintains visual consistency across light and dark themes.

### Key Features
- **Glassmorphic Design**: Translucent appearance with backdrop blur
- **Smooth Animations**: Rotate animation for chevron and fade-in dropdown
- **Accessible**: Full keyboard navigation and ARIA support
- **Flexible Options**: Support for disabled options and custom values
- **Theme Support**: Seamless light/dark mode transitions
- **Click Outside**: Automatic closure when clicking outside

### Usage

\`\`\`tsx
import { GlassSelect, GlassSelectOption } from '@/components/glass-select';

const options: GlassSelectOption[] = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2', disabled: true },
  { value: 'option3', label: 'Option 3' }
];

function MyComponent() {
  const [selectedValue, setSelectedValue] = useState('');
  
  return (
    <GlassSelect
      options={options}
      value={selectedValue}
      onChange={setSelectedValue}
      placeholder="Select an option"
    />
  );
}
\`\`\`
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    options: {
      control: "object",
      description: "Array of select options",
    },
    value: {
      control: "text",
      description: "Currently selected value",
    },
    onChange: {
      action: "changed",
      description: "Callback when selection changes",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text when no value is selected",
    },
    disabled: {
      control: "boolean",
      description: "Whether the select is disabled",
    },
    variant: {
      control: "select",
      options: ["default", "search"],
      description: "Visual variant of the select",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
} satisfies Meta<typeof GlassSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic options for examples
const basicOptions: GlassSelectOption[] = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
  { value: "solid", label: "Solid" },
];

// Country options for examples
const countryOptions: GlassSelectOption[] = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
  { value: "au", label: "Australia" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
  { value: "jp", label: "Japan" },
  { value: "kr", label: "South Korea" },
];

// Default Story
export const Default: Story = {
  args: {
    options: basicOptions,
    placeholder: "Select a framework",
  },
};

// Controlled Example
export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState("react");
    
    return (
      <div className="space-y-4">
        <GlassSelect
          {...args}
          value={value}
          onChange={setValue}
        />
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Selected: <span className="font-semibold">{value || "None"}</span>
        </p>
      </div>
    );
  },
  args: {
    options: basicOptions,
    placeholder: "Select a framework",
  },
};

// With Disabled Options
export const WithDisabledOptions: Story = {
  args: {
    options: [
      { value: "active1", label: "Active Option 1" },
      { value: "disabled1", label: "Disabled Option 1", disabled: true },
      { value: "active2", label: "Active Option 2" },
      { value: "disabled2", label: "Disabled Option 2", disabled: true },
      { value: "active3", label: "Active Option 3" },
    ],
    placeholder: "Select an option",
  },
};

// Disabled State
export const Disabled: Story = {
  args: {
    options: basicOptions,
    placeholder: "Select is disabled",
    disabled: true,
  },
};

// Long Options List
export const LongOptionsList: Story = {
  args: {
    options: Array.from({ length: 20 }, (_, i) => ({
      value: `option${i + 1}`,
      label: `Option ${i + 1}`,
      disabled: i % 5 === 0,
    })),
    placeholder: "Select from many options",
  },
};

// Custom Width
export const CustomWidth: Story = {
  render: (args) => {
    return (
      <div className="space-y-4">
        <GlassSelect {...args} className="w-64" />
        <GlassSelect {...args} className="w-96" />
        <GlassSelect {...args} className="w-full max-w-md" />
      </div>
    );
  },
  args: {
    options: basicOptions,
    placeholder: "Different widths",
  },
};

// Interactive Demo
export const InteractiveDemo: Story = {
  render: () => {
    const [country, setCountry] = useState("");
    const [framework, setFramework] = useState("");
    const [priority, setPriority] = useState("");
    
    const priorityOptions: GlassSelectOption[] = [
      { value: "low", label: "Low Priority" },
      { value: "medium", label: "Medium Priority" },
      { value: "high", label: "High Priority" },
      { value: "urgent", label: "Urgent", disabled: true },
    ];
    
    return (
      <div className="w-96 space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            Interactive Select Demo
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Country
              </label>
              <GlassSelect
                options={countryOptions}
                value={country}
                onChange={setCountry}
                placeholder="Select your country"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Preferred Framework
              </label>
              <GlassSelect
                options={basicOptions}
                value={framework}
                onChange={setFramework}
                placeholder="Select a framework"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Priority Level
              </label>
              <GlassSelect
                options={priorityOptions}
                value={priority}
                onChange={setPriority}
                placeholder="Select priority"
              />
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <h4 className="text-sm font-semibold mb-2 text-gray-900 dark:text-white">
              Current Selections:
            </h4>
            <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
              <p>Country: <span className="font-medium">{country || "None"}</span></p>
              <p>Framework: <span className="font-medium">{framework || "None"}</span></p>
              <p>Priority: <span className="font-medium">{priority || "None"}</span></p>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

// Form Integration Example
export const FormIntegration: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      role: "",
      department: "",
      experience: "",
    });
    
    const roleOptions: GlassSelectOption[] = [
      { value: "developer", label: "Developer" },
      { value: "designer", label: "Designer" },
      { value: "manager", label: "Project Manager" },
      { value: "analyst", label: "Business Analyst" },
    ];
    
    const departmentOptions: GlassSelectOption[] = [
      { value: "engineering", label: "Engineering" },
      { value: "design", label: "Design" },
      { value: "marketing", label: "Marketing" },
      { value: "sales", label: "Sales" },
      { value: "hr", label: "Human Resources" },
    ];
    
    const experienceOptions: GlassSelectOption[] = [
      { value: "0-2", label: "0-2 years" },
      { value: "3-5", label: "3-5 years" },
      { value: "6-10", label: "6-10 years" },
      { value: "10+", label: "10+ years" },
    ];
    
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      alert(JSON.stringify(formData, null, 2));
    };
    
    return (
      <form onSubmit={handleSubmit} className="w-96 space-y-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Employee Registration
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Role
            </label>
            <GlassSelect
              options={roleOptions}
              value={formData.role}
              onChange={(value) => setFormData({ ...formData, role: value })}
              placeholder="Select your role"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Department
            </label>
            <GlassSelect
              options={departmentOptions}
              value={formData.department}
              onChange={(value) => setFormData({ ...formData, department: value })}
              placeholder="Select department"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Experience
            </label>
            <GlassSelect
              options={experienceOptions}
              value={formData.experience}
              onChange={(value) => setFormData({ ...formData, experience: value })}
              placeholder="Select experience level"
            />
          </div>
        </div>
        
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          disabled={!formData.role || !formData.department || !formData.experience}
        >
          Submit Registration
        </button>
      </form>
    );
  },
};

// Accessibility Demo
export const AccessibilityDemo: Story = {
  render: () => {
    const [selectedValue, setSelectedValue] = useState("");
    
    const accessibilityOptions: GlassSelectOption[] = [
      { value: "screen-reader", label: "Screen Reader Compatible" },
      { value: "keyboard-nav", label: "Full Keyboard Navigation" },
      { value: "aria-labels", label: "ARIA Labels Support" },
      { value: "focus-trap", label: "Focus Management" },
    ];
    
    return (
      <div className="w-96 space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            Accessibility Features
          </h3>
          
          <div className="space-y-4">
            <GlassSelect
              options={accessibilityOptions}
              value={selectedValue}
              onChange={setSelectedValue}
              placeholder="Select a feature to learn more"
            />
            
            {selectedValue && (
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  {accessibilityOptions.find(opt => opt.value === selectedValue)?.label}
                </h4>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  {selectedValue === "screen-reader" && 
                    "The select component announces changes and states to screen readers using proper ARIA attributes."}
                  {selectedValue === "keyboard-nav" && 
                    "Navigate through options using arrow keys, select with Enter, and close with Escape."}
                  {selectedValue === "aria-labels" && 
                    "All interactive elements have appropriate ARIA labels for better accessibility."}
                  {selectedValue === "focus-trap" && 
                    "Focus is properly managed within the dropdown when open, preventing focus from escaping."}
                </p>
              </div>
            )}
          </div>
          
          <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <h4 className="text-sm font-semibold mb-2 text-gray-900 dark:text-white">
              Keyboard Shortcuts:
            </h4>
            <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
              <li>• <kbd>Tab</kbd> - Focus the select</li>
              <li>• <kbd>Space</kbd> or <kbd>Enter</kbd> - Open dropdown</li>
              <li>• <kbd>↑</kbd> <kbd>↓</kbd> - Navigate options</li>
              <li>• <kbd>Enter</kbd> - Select option</li>
              <li>• <kbd>Esc</kbd> - Close dropdown</li>
            </ul>
          </div>
        </div>
      </div>
    );
  },
};

// Theme Showcase
export const ThemeShowcase: Story = {
  render: () => {
    const [lightValue, setLightValue] = useState("");
    const [darkValue, setDarkValue] = useState("");
    
    const themeOptions: GlassSelectOption[] = [
      { value: "system", label: "System Default" },
      { value: "light", label: "Light Theme" },
      { value: "dark", label: "Dark Theme" },
      { value: "auto", label: "Auto (Time-based)" },
    ];
    
    return (
      <div className="space-y-8">
        <div className="p-6 bg-white rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">
            Light Theme
          </h3>
          <GlassSelect
            options={themeOptions}
            value={lightValue}
            onChange={setLightValue}
            placeholder="Select theme preference"
          />
        </div>
        
        <div className="p-6 bg-gray-900 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-white">
            Dark Theme
          </h3>
          <GlassSelect
            options={themeOptions}
            value={darkValue}
            onChange={setDarkValue}
            placeholder="Select theme preference"
          />
        </div>
      </div>
    );
  },
  parameters: {
    backgrounds: { default: "light" },
  },
};
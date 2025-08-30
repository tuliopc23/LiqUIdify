import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { LiquidSelect, type SelectOption } from "./liquid-select";

const meta = {
  title: "Forms/LiquidSelect",
  component: LiquidSelect,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A liquid glass select dropdown component with search, keyboard navigation, and comprehensive form states.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "filled", "ghost", "error"],
      description: "The visual style variant of the select"
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "The size of the select"
    },
    disabled: {
      control: "boolean",
      description: "Disable the select"
    },
    searchable: {
      control: "boolean",
      description: "Enable search functionality"
    },
    clearable: {
      control: "boolean",
      description: "Show clear button when option is selected"
    }
  },
  args: {
    placeholder: "Select an option...",
    variant: "default",
    size: "md",
    disabled: false,
    searchable: false,
    clearable: false,
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8 flex items-center justify-center">
        <div className="w-full max-w-md">
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof LiquidSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data
const basicOptions: SelectOption[] = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "orange", label: "Orange" },
  { value: "grape", label: "Grape" },
  { value: "pineapple", label: "Pineapple" },
];

const countryOptions: SelectOption[] = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
  { value: "au", label: "Australia" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
  { value: "jp", label: "Japan" },
  { value: "br", label: "Brazil" },
  { value: "in", label: "India" },
  { value: "cn", label: "China" },
];

const statusOptions: SelectOption[] = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "pending", label: "Pending" },
  { value: "suspended", label: "Suspended", disabled: true },
];

// Icons for stories
const GlobeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM2.04 4.326c.325 1.329 2.532 2.54 3.717 3.19.48.263.793.434.743.484-.08.08-.162.158-.242.234-.416.396-.787.749-.758 1.266.035.634.618.824 1.214 1.017.577.188 1.168.38 1.286.983.082.417-.075.988-.22 1.52-.215.782-.406 1.48.22 1.48 1.5-.5 3.798-3.186 4-5 .138-1.243-2-2-3.5-2.5-.478-.16-.755.081-.99.284-.172.15-.322.279-.51.216-.445-.148-2.5-2-1.5-2.5.78-.39.952-.171 1.227.182.078.1.125.484.924.484 1.395-.191 2.648-.824 2.648-2.52 0-.83-.067-1.643-.196-2.084A6.9 6.9 0 0 0 8 1c-1.872 0-3.574.711-4.96 1.326Z"/>
  </svg>
);

const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z"/>
  </svg>
);

const TagIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586V2zm3.5 4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
  </svg>
);

export const Default: Story = {
  render: (args) => (
    <LiquidSelect 
      {...args}
      options={basicOptions}
      label="Select Fruit"
    />
  ),
};

export const Variants: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Select Variants</h2>
        <div className="space-y-6">
          <LiquidSelect 
            variant="default" 
            label="Default Select"
            options={basicOptions}
            placeholder="Choose an option..."
          />
          <LiquidSelect 
            variant="filled" 
            label="Filled Select"
            options={basicOptions}
            placeholder="Choose an option..."
          />
          <LiquidSelect 
            variant="ghost" 
            label="Ghost Select"
            options={basicOptions}
            placeholder="Choose an option..."
          />
          <LiquidSelect 
            variant="error" 
            label="Error Select"
            options={basicOptions}
            placeholder="Choose an option..."
            errorMessage="Please select a valid option"
          />
        </div>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Select Sizes</h2>
        <div className="space-y-6">
          <LiquidSelect 
            size="sm" 
            label="Small Select"
            options={basicOptions}
            placeholder="Small size..."
          />
          <LiquidSelect 
            size="md" 
            label="Medium Select"
            options={basicOptions}
            placeholder="Medium size..."
          />
          <LiquidSelect 
            size="lg" 
            label="Large Select"
            options={basicOptions}
            placeholder="Large size..."
          />
        </div>
      </div>
    </div>
  ),
};

export const WithIcons: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Selects with Icons</h2>
        <div className="space-y-6">
          <LiquidSelect 
            label="Country"
            options={countryOptions}
            placeholder="Select country..."
            leftIcon={<GlobeIcon />}
          />
          <LiquidSelect 
            label="User Role"
            options={[
              { value: "admin", label: "Administrator" },
              { value: "user", label: "User" },
              { value: "guest", label: "Guest" },
            ]}
            placeholder="Select role..."
            leftIcon={<UserIcon />}
          />
          <LiquidSelect 
            label="Category"
            options={[
              { value: "tech", label: "Technology" },
              { value: "design", label: "Design" },
              { value: "marketing", label: "Marketing" },
            ]}
            placeholder="Select category..."
            leftIcon={<TagIcon />}
          />
        </div>
      </div>
    </div>
  ),
};

export const Interactive: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => {
    const [searchableValue, setSearchableValue] = useState("");
    const [clearableValue, setClearableValue] = useState("ca");

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Interactive Features</h2>
          <div className="space-y-6">
            <LiquidSelect 
              label="Searchable Select"
              options={countryOptions}
              placeholder="Search countries..."
              value={searchableValue}
              onChange={setSearchableValue}
              searchable
              helperText="Type to search countries"
            />
            <LiquidSelect 
              label="Clearable Select"
              options={countryOptions}
              placeholder="Select country..."
              value={clearableValue}
              onChange={setClearableValue}
              clearable
              onClear={() => setClearableValue("")}
              helperText="Click X to clear selection"
            />
            <LiquidSelect 
              label="Disabled Select"
              options={basicOptions}
              placeholder="I'm disabled..."
              disabled
              value="apple"
            />
            <LiquidSelect 
              label="With Disabled Options"
              options={statusOptions}
              placeholder="Select status..."
              helperText="Some options are disabled"
            />
          </div>
        </div>
      </div>
    );
  },
};

export const FormExample: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => {
    const [formData, setFormData] = useState({
      country: "",
      language: "",
      timezone: "",
      category: ""
    });

    const languageOptions: SelectOption[] = [
      { value: "en", label: "English" },
      { value: "es", label: "Spanish" },
      { value: "fr", label: "French" },
      { value: "de", label: "German" },
      { value: "zh", label: "Chinese" },
      { value: "ja", label: "Japanese" },
    ];

    const timezoneOptions: SelectOption[] = [
      { value: "utc", label: "UTC" },
      { value: "est", label: "Eastern Time" },
      { value: "pst", label: "Pacific Time" },
      { value: "gmt", label: "Greenwich Mean Time" },
      { value: "cet", label: "Central European Time" },
      { value: "jst", label: "Japan Standard Time" },
    ];

    const categoryOptions: SelectOption[] = [
      { value: "business", label: "Business" },
      { value: "personal", label: "Personal" },
      { value: "education", label: "Education" },
      { value: "nonprofit", label: "Non-profit" },
    ];

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Preferences</h2>
            <p className="text-white/70">Configure your account settings</p>
          </div>
          
          <form className="space-y-6">
            <LiquidSelect 
              label="Country"
              options={countryOptions}
              placeholder="Select your country..."
              value={formData.country}
              onChange={(value) => setFormData(prev => ({ ...prev, country: value }))}
              leftIcon={<GlobeIcon />}
              searchable
              clearable
              onClear={() => setFormData(prev => ({ ...prev, country: "" }))}
            />
            
            <LiquidSelect 
              label="Language"
              options={languageOptions}
              placeholder="Select language..."
              value={formData.language}
              onChange={(value) => setFormData(prev => ({ ...prev, language: value }))}
            />
            
            <LiquidSelect 
              label="Timezone"
              options={timezoneOptions}
              placeholder="Select timezone..."
              value={formData.timezone}
              onChange={(value) => setFormData(prev => ({ ...prev, timezone: value }))}
              variant="filled"
            />
            
            <LiquidSelect 
              label="Account Type"
              options={categoryOptions}
              placeholder="Select category..."
              value={formData.category}
              onChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
              leftIcon={<TagIcon />}
              helperText="This affects available features"
            />
            
            <button
              type="submit"
              className="w-full bg-white/20 hover:bg-white/30 text-white font-medium py-3 px-6 rounded-xl backdrop-blur-xl border border-white/30 transition-all duration-200"
            >
              Save Preferences
            </button>
          </form>
        </div>
      </div>
    );
  },
};
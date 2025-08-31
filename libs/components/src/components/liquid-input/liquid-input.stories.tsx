import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { LiquidInput } from "./liquid-input";

const meta = {
  title: "Forms/LiquidInput",
  component: LiquidInput,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A liquid glass input component with floating labels, icons, and comprehensive form states.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "filled", "ghost", "error"],
      description: "The visual style variant of the input",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "The size of the input",
    },
    labelStyle: {
      control: "select",
      options: ["default", "floating", "outside"],
      description: "The label positioning style",
    },
    disabled: {
      control: "boolean",
      description: "Disable the input",
    },
    clearable: {
      control: "boolean",
      description: "Show clear button when input has value",
    },
  },
  args: {
    placeholder: "Enter text...",
    variant: "default",
    size: "md",
    labelStyle: "default",
    disabled: false,
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
} satisfies Meta<typeof LiquidInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// Icons for stories
const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
  </svg>
);

const EmailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
    <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
  </svg>
);

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
  </svg>
);

const LockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2ZM6 5V3a3 3 0 0 1 6 0v2a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2Z" />
  </svg>
);

export const Default: Story = {};

export const Variants: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Input Variants</h2>
        <div className="space-y-6">
          <LiquidInput variant="default" label="Default Input" placeholder="Enter text..." />
          <LiquidInput variant="filled" label="Filled Input" placeholder="Enter text..." />
          <LiquidInput variant="ghost" label="Ghost Input" placeholder="Enter text..." />
          <LiquidInput
            variant="error"
            label="Error Input"
            placeholder="Enter text..."
            errorMessage="This field is required"
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
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Input Sizes</h2>
        <div className="space-y-6">
          <LiquidInput size="sm" label="Small Input" placeholder="Small size..." />
          <LiquidInput size="md" label="Medium Input" placeholder="Medium size..." />
          <LiquidInput size="lg" label="Large Input" placeholder="Large size..." />
        </div>
      </div>
    </div>
  ),
};

export const LabelStyles: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => {
    const [value1, setValue1] = useState("");
    const [value2, setValue2] = useState("");
    const [value3, setValue3] = useState("");

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Label Styles</h2>
          <div className="space-y-6">
            <LiquidInput
              labelStyle="default"
              label="Default Label"
              placeholder="Enter text..."
              value={value1}
              onChange={(e) => setValue1(e.target.value)}
            />
            <LiquidInput
              labelStyle="floating"
              label="Floating Label"
              placeholder="This is the placeholder"
              value={value2}
              onChange={(e) => setValue2(e.target.value)}
            />
            <LiquidInput
              labelStyle="outside"
              label="Outside Label"
              placeholder="Enter text..."
              value={value3}
              onChange={(e) => setValue3(e.target.value)}
            />
          </div>
        </div>
      </div>
    );
  },
};

export const WithIcons: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Inputs with Icons</h2>
        <div className="space-y-6">
          <LiquidInput label="Username" placeholder="Enter username..." leftIcon={<UserIcon />} />
          <LiquidInput
            label="Email"
            placeholder="Enter email..."
            leftIcon={<EmailIcon />}
            type="email"
          />
          <LiquidInput label="Search" placeholder="Search..." leftIcon={<SearchIcon />} clearable />
          <LiquidInput
            label="Password"
            placeholder="Enter password..."
            leftIcon={<LockIcon />}
            type="password"
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
    const [clearableValue, setClearableValue] = useState("Clear me!");
    const [floatingValue, setFloatingValue] = useState("");

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Interactive Features</h2>
          <div className="space-y-6">
            <LiquidInput
              label="Clearable Input"
              placeholder="Type something..."
              value={clearableValue}
              onChange={(e) => setClearableValue(e.target.value)}
              clearable
              onClear={() => setClearableValue("")}
              helperText="Click the X to clear"
            />
            <LiquidInput
              labelStyle="floating"
              label="Floating Label Animation"
              placeholder="Watch the label float"
              value={floatingValue}
              onChange={(e) => setFloatingValue(e.target.value)}
              leftIcon={<EmailIcon />}
            />
            <LiquidInput
              label="Disabled State"
              placeholder="I'm disabled..."
              disabled
              value="Disabled input"
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
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const newErrors: Record<string, string> = {};

      if (!formData.firstName) newErrors.firstName = "First name is required";
      if (!formData.lastName) newErrors.lastName = "Last name is required";
      if (!formData.email) newErrors.email = "Email is required";
      if (!formData.password) newErrors.password = "Password is required";
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords don't match";
      }

      setErrors(newErrors);
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
            <p className="text-white/70">Join us with your liquid glass form</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <LiquidInput
                label="First Name"
                placeholder="John"
                value={formData.firstName}
                onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
                errorMessage={errors.firstName}
              />
              <LiquidInput
                label="Last Name"
                placeholder="Doe"
                value={formData.lastName}
                onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))}
                errorMessage={errors.lastName}
              />
            </div>

            <LiquidInput
              label="Email"
              type="email"
              placeholder="john@example.com"
              leftIcon={<EmailIcon />}
              value={formData.email}
              onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              errorMessage={errors.email}
            />

            <LiquidInput
              label="Password"
              type="password"
              placeholder="Enter password"
              leftIcon={<LockIcon />}
              value={formData.password}
              onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
              errorMessage={errors.password}
            />

            <LiquidInput
              label="Confirm Password"
              type="password"
              placeholder="Confirm password"
              leftIcon={<LockIcon />}
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))
              }
              errorMessage={errors.confirmPassword}
            />

            <button
              type="submit"
              className="w-full bg-white/20 hover:bg-white/30 text-white font-medium py-3 px-6 rounded-xl backdrop-blur-xl border border-white/30 transition-all duration-200"
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    );
  },
};

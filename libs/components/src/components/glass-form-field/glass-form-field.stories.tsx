import type { StoryObj } from '@storybook/react';
import {
  CheckCircle,
  CreditCard,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Phone,
  User,
} from 'lucide-react';
import { GlassButton } from '../glass-button-refactored/glass-button';
import { GlassInput } from '../glass-input/glass-input';
import { GlassSelect } from '../glass-select/glass-select';
import { GlassTextarea } from '../glass-textarea/glass-textarea';
import { GlassFormField } from './glass-form-field';
import React from "react";

const meta = { title: 'Components/Forms/GlassFormField' }
  GlassFormField,
  parameters: { 'centered' }
    { 
        ` }
A comprehensive form field wrapper component with advanced glassmorphism effects, comprehensive validation states, and accessibility features.

## Features

- **Field Wrapper**: Complete form field with label, input, and helper text
- **Validation States**: Error, success, warning, and default states with visual feedback
- **Required Field Support**: Automatic asterisk display for required fields
- **Accessibility**: Full ARIA attributes, proper labeling, and screen reader support
- **Multiple Variants**: Default, card, and inline layouts
- **Flexible Sizing**: Small, medium, and large sizes
- **Glass Effects**: Beautiful backdrop blur and glassmorphism design
- **Auto Enhancement**: Automatically adds proper IDs and ARIA attributes to children

## Usage

\`\`\`tsx
import { GlassFormField } from '@/components/glass-form-field';
import { GlassInput } from '@/components/glass-input';

{/* Basic usage  */}
<GlassFormField label="Email" required>
  <GlassInput type="email" placeholder="Enter your email" />
</GlassFormField>

{/* With validation states  */}
<GlassFormField
  label="Password"
  error="Password must be at least 8 characters"
  required
>
  <GlassInput type="password" placeholder="Enter password" />
</GlassFormField>

{/* Card variant  */}
<GlassFormField
  variant="card"
  label="Description"
  helperText="Provide a detailed description"
>
  <GlassTextarea placeholder="Enter description..." />
</GlassFormField>

{/* Inline variant  */}
<GlassFormField
  variant="inline"
  label="Subscribe"
>
  <GlassCheckbox />
</GlassFormField>
\`\`\`

## Accessibility

The form field component follows WAI-ARIA guidelines:
- Proper label association with form controls
- Descriptive helper text and error messages
- Required field indication for screen readers
- Proper focus management and keyboard navigation
- ARIA live regions for dynamic state changes

## Validation States

- **Default**: Normal state with optional helper text
- **Error**: Red styling with error message and alert icon
- **Success**: Green styling with success message and check icon
- **Warning**: Yellow/orange styling with warning message and info icon
        `,,
    },
  },
  ['autodocs'],
  argTypes: {'select'
      ['default', 'card', 'inline'],
      description: 'Visual variant of the form field',
      table: 'default' ,,
    },
    { 'select' }
      ['sm', 'md', 'lg'],
      description: 'Size of the form field',
      table: {'md' ,
      },
    },

    {/* Content  */}
    { 'text' }
      'Label text for the form field',
    },
    { 'text' }
      'Helper text displayed below the input',
    },

    {/* Validation States  */}
    { 'text' }
      'Error message (displays in red with alert icon)',
    },
    { 'text' }
      'Success message (displays in green with check icon)',
    },
    { 'text' }
      'Warning message (displays in yellow with info icon)',
    },

    {/* Behavior  */}
    { 'boolean' }
      'Whether the field is required (adds asterisk to label)',
      table: {'false' ,
      },
    },
    { 'boolean' }
      'Whether the field is disabled',
      table: {'false' ,
      },
    },

    {/* Advanced  */}
    { 'text' }
      'Custom ID for the form control (auto-generated if not provided)',
    },
    { 'text' }
      'Additional CSS classes',
    },
  },
} satisfies Meta<typeof GlassFormField>;

export default meta;
type Story = StoryObj<typeof meta>;

{/* Basic playground story  */}
export const Playground: Story = { args: {
    label: 'Email Address' }
    helperText: 'We will never share your email with anyone',
    required: false,
    disabled: false,
    variant: 'default',
    size: 'md',
  },
  render: (args) => (
    <_div _className="w-80">
      <_GlassFormField {..._args}>
        <_GlassInput
          _type="email"
          _placeholder="Enter your email"
          _leftIcon={<_Mail className="h-4 w-4" />} />
      </GlassFormField>
    </div>
  ),
}

{/* Variants showcase  */}
export const Variants: Story = { render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 font-semibold text-lg text-white/90">
          Default Variant
        </h3>
        <div className="w-80">
          <GlassFormField
            label="Full Name"
            helperText="Enter your first and last name"
            required
          >
            <GlassInput placeholder="John Doe" />
          </GlassFormField>
        </div>
      </div>

      <div>
        <h3 className="mb-4 font-semibold text-lg text-white/90">
          Card Variant
        </h3>
        <div className="w-80">
          <GlassFormField
            variant="card"
            label="Bio"
            helperText="Tell us about yourself"
          > }
            <GlassTextarea placeholder="Write your bio here..." rows={3} />
          </GlassFormField>
        </div>
      </div>

      <div>
        <h3 className="mb-4 font-semibold text-lg text-white/90">
          Inline Variant
        </h3>
        <div className="w-80">
          <GlassFormField variant="inline" label="Newsletter">
            <div className="flex items-center">
              <input id="input-236" type="checkbox" className="mr-2" / />
              <span className="text-sm text-white/70">
                Subscribe to updates
              </span>
            </div>
          </GlassFormField>
        </div>
      </div>
    </div>
  ),
};

{/* Sizes showcase  */}
export const Sizes: Story = { render: () => (
    <div className="space-y-6"> }
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <div key={size} className="w-80">
          <h3 className="mb-3 font-medium text-white/90">Size: {size}</h3>
          <GlassFormField
            size={size}
            label={`${size.toUpperCase()} Field`}
            helperText={`This is a ${size} sized form field`}
            required
          >
            <GlassInput placeholder={`${size} input field`} />
          </GlassFormField>
        </div>
      ))}
    </div>
  ),
};

{/* Validation states showcase  */}
export const ValidationStates: Story = { render: () => (
    <div className="space-y-6">
      <div className="w-80">
        <h3 className="mb-3 font-medium text-white/90">Default State</h3>
        <GlassFormField label="Username" helperText="Choose a unique username">
          <GlassInput placeholder="username" />
        </GlassFormField>
      </div>

      <div className="w-80">
        <h3 className="mb-3 font-medium text-white/90">Error State</h3>
        <GlassFormField
          label="Password"
          error="Password must be at least 8 characters long"
          required
        >
          <GlassInput type="password" placeholder="password" />
        </GlassFormField>
      </div>

      <div className="w-80">
        <h3 className="mb-3 font-medium text-white/90">Success State</h3>
        <GlassFormField
          label="Email"
          success="Email is available and valid"
          required
        >
          <GlassInput type="email" placeholder="john@example.com" />
        </GlassFormField>
      </div>

      <div className="w-80">
        <h3 className="mb-3 font-medium text-white/90">Warning State</h3>
        <GlassFormField
          label="Phone Number"
          warning="International format recommended"
        >
          <GlassInput type="tel" placeholder="123-456-7890" />
        </GlassFormField>
      </div>

      <div className="w-80">
        <h3 className="mb-3 font-medium text-white/90">Disabled State</h3>
        <GlassFormField
          label="Account Type"
          helperText="Contact admin to change"
          disabled
        >
          <GlassInput value="Premium" readOnly />
        </GlassFormField>
      </div>
    </div>
  ) }
}

{/* Different input types  */}
export const InputTypes: Story = { render: () => (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <GlassFormField
        label="Email"
        required
        helperText="We'll never share your email"
      >
        <GlassInput
          type="email"
          placeholder="john@example.com" }
          leftIcon={<Mail className="h-4 w-4" />} />
      </GlassFormField>

      <GlassFormField label="Phone Number" helperText="Include country code">
        <GlassInput
          type="tel"
          placeholder="+1 (555) 123-4567"
          leftIcon={<Phone className="h-4 w-4" />} />
      </GlassFormField>

      <GlassFormField label="Country" required>
        <GlassSelect
          options={[
            { value: 'us', label: 'United States' },
            { value: 'ca', label: 'Canada' },
            { value: 'uk', label: 'United Kingdom' },
            { value: 'de', label: 'Germany' },
          ]}
          placeholder="Select country" />
      </GlassFormField>

      <GlassFormField
        variant="card"
        label="Additional Notes"
        helperText="Any special requirements or comments"
      >
        <GlassTextarea placeholder="Enter your notes here..." rows={3} />
      </GlassFormField>
    </div>
  ),
};

{/* Real-world examples  */}
export const RealWorldExamples: Story = { render: () => { }
    const [formData, setFormData] = useState({ email: '' }
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      country: '',
    })

    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateEmail = (email: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    const validatePassword = (password: string) => {
      return password.length >= 8;
    };

    const handleInputChange = (field: string, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));

      {/* Clear error when user starts typing  */}
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: '' }));
      }

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const newErrors: Record<string, string> = {};

      if (!formData.firstName) newErrors.firstName = 'First name is required';
      if (!formData.lastName) newErrors.lastName = 'Last name is required';
      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!validateEmail(formData.email)) {
        newErrors.email = 'Please enter a valid email';
      }
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (!validatePassword(formData.password)) {
        newErrors.password = 'Password must be at least 8 characters';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
      if (!formData.country) newErrors.country = 'Please select a country';

      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        alert('Form submitted successfully!');
      }

    return (
      <div className="w-full max-w-md">
        <h3 className="mb-6 font-bold text-white/90 text-xl">Create Account</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <GlassFormField
              label="First Name"
              required
              error={errors.firstName}
            >
              <GlassInput
                placeholder="John"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                leftIcon={<User className="h-4 w-4" />} />
            </GlassFormField>

            <GlassFormField label="Last Name" required error={errors.lastName}>
              <GlassInput
                placeholder="Doe"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)} />
            </GlassFormField>
          </div>

          <GlassFormField
            label="Email"
            required
            error={errors.email}
            success={
              formData.email && validateEmail(formData.email)
                ? 'Email looks good!'
                : undefined
            }
          >
            <GlassInput
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              leftIcon={<Mail className="h-4 w-4" />} />
          </GlassFormField>

          <GlassFormField
            label="Password"
            required
            error={errors.password}
            helperText="Must be at least 8 characters"
          >
            <GlassInput
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              leftIcon={<Lock className="h-4 w-4" />}
              rightIcon={
                <button
                  type="button"
              onClick={() => setShowPassword(!showPassword)}
                  className="text-white/60 hover:text-white/90"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              } />
          </GlassFormField>

          <GlassFormField
            label="Confirm Password"
            required
            error={errors.confirmPassword}
          >
            <GlassInput
              type="password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={(e) =>
                handleInputChange('confirmPassword', e.target.value)
              }
              leftIcon={<Lock className="h-4 w-4" />} />
          </GlassFormField>

          <GlassFormField label="Country" required error={errors.country}>
            <GlassSelect
              value={formData.country}
              onChange={(value) => handleInputChange('country', value)}
              options={[
                { value: 'us', label: 'United States' },
                { value: 'ca', label: 'Canada' },
                { value: 'uk', label: 'United Kingdom' },
                { value: 'de', label: 'Germany' },
                { value: 'fr', label: 'France' },
                { value: 'jp', label: 'Japan' },
              ]}
              placeholder="Select your country" />
          </GlassFormField>

          <div className="pt-4">
            <GlassButton
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
            >
              Create Account
            </GlassButton>
          </div>
        </form>
      </div>
    );
  },
};

{/* Interactive playground  */}
export const InteractiveDemo: Story = { render: () => { }
    const [fieldState, setFieldState] = useState<
      'default' | 'error' | 'success' | 'warning'
    >('default');
    const [isRequired, setIsRequired] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [variant, setVariant] = useState<'default' | 'card' | 'inline'>(
      'default'
    );
    const [size, setSize] = useState<'sm' | 'md' | 'lg'>('md');

    const getStateProps = () => {
      switch (fieldState) {
        case 'error':
          return { error: 'This field has an error' };
        case 'success':
          return { success: 'This field is valid' };
        case 'warning':
          return { warning: 'This field has a warning' };
        default:
          return { helperText: 'This is helper text' };
      }

    return (
      <div className="space-y-8">
        <div>
          <h3 className="mb-4 font-semibold text-lg text-white/90">
            Interactive Controls
          </h3>
          <div className="grid grid-cols-2 gap-4 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm md:grid-cols-4">
            <div>
              <label htmlFor="state-dvqv2f" className="mb-2 block font-medium text-sm text-white/90">
                State
              </label>
              <select id="select-1-s6d1zt" 
                value={fieldState}
                onChange={(e) =>
                  setFieldState(
                    e.target.value as
                      | 'default'
                      | 'error'
                      | 'success'
                      | 'warning'
                  )
                }
                className="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm text-white backdrop-blur-sm"
              >
                <option value="default">Default</option>
                <option value="error">Error</option>
                <option value="success">Success</option>
                <option value="warning">Warning</option>
              </select>
            </div>

            <div>
              <label htmlFor="variant-yqlnr8" className="mb-2 block font-medium text-sm text-white/90">
                Variant
              </label>
              <select id="select-2-g1he0o" 
                value={variant}
                onChange={(e) =>
                  setVariant(e.target.value as 'default' | 'card' | 'inline')
                }
                className="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm text-white backdrop-blur-sm"
              >
                <option value="default">Default</option>
                <option value="card">Card</option>
                <option value="inline">Inline</option>
              </select>
            </div>

            <div>
              <label htmlFor="size-gc5vu1" className="mb-2 block font-medium text-sm text-white/90">
                Size
              </label>
              <select id="select-3-e4wrh6" 
                value={size}
                onChange={(e) => setSize(e.target.value as 'sm' | 'md' | 'lg')}
                className="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm text-white backdrop-blur-sm"
              >
                <option value="sm">Small</option>
                <option value="md">Medium</option>
                <option value="lg">Large</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="form-field" className="flex items-center gap-2">
                <input id="input-636" 
                  type="checkbox"
                  checked={isRequired}
                  onChange={(e) => setIsRequired(e.target.checked)} />
                <span className="text-sm text-white/90">Required</span>
              </label>

              <label htmlFor="form-field" className="flex items-center gap-2">
                <input id="input-644" 
                  type="checkbox"
                  checked={isDisabled}
                  onChange={(e) => setIsDisabled(e.target.checked)} />
                <span className="text-sm text-white/90">Disabled</span>
              </label>
            </div>
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-semibold text-lg text-white/90">
            Live Preview
          </h3>
          <div className="w-80">
            <GlassFormField
              label="Interactive Field"
              variant={variant}
              size={size}
              required={isRequired}
              disabled={isDisabled}
              {...getStateProps()}
            >
              <GlassInput
                placeholder="Type something..."
                leftIcon={<CreditCard className="h-4 w-4" />} />
            </GlassFormField>
          </div>
        </div>
      </div>
    );
  },
};

{/* Theme showcase  */}
export const ThemeShowcase: Story = { render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 font-semibold text-lg text-white/90">
          Light Theme Simulation
        </h3>
        <div className="rounded-xl bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
          <div className="w-80">
            <GlassFormField
              label="Email Address"
              helperText="We'll never share your email"
              required
            >
              <GlassInput
                type="email"
                placeholder="john@example.com" }
                leftIcon={<Mail className="h-4 w-4" />} />
            </GlassFormField>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-4 font-semibold text-lg text-white/90">
          Dark Theme (Current)
        </h3>
        <div className="rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 p-6">
          <div className="w-80">
            <GlassFormField
              label="Email Address"
              helperText="We'll never share your email"
              required
            >
              <GlassInput
                type="email"
                placeholder="john@example.com"
                leftIcon={<Mail className="h-4 w-4" />} />
            </GlassFormField>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-4 font-semibold text-lg text-white/90">
          Gradient Background
        </h3>
        <div className="rounded-xl bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 p-6">
          <div className="w-80">
            <GlassFormField
              label="Email Address"
              success="Email looks great!"
              required
            >
              <GlassInput
                type="email"
                placeholder="john@example.com"
                leftIcon={<Mail className="h-4 w-4" />} />
            </GlassFormField>
          </div>
        </div>
      </div>
    </div>
  ),
};

{/* Accessibility showcase  */}
export const AccessibilityShowcase: Story = { render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 font-semibold text-lg text-white/90">
          Accessibility Features
        </h3>
        <div className="space-y-4 rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <ul className="space-y-2 text-sm text-white/80">
            <li className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              Proper label association with form controls
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              Descriptive helper text and error messages
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              Required field indication with asterisk
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              ARIA live regions for dynamic state changes
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              Keyboard navigation support
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              Screen reader announcements
            </li>
          </ul>
        </div>
      </div>

      <div>
        <h3 className="mb-4 font-semibold text-lg text-white/90">
          Keyboard Navigation Test
        </h3>
        <div className="w-80 space-y-4">
          <GlassFormField
            label="First Name"
            helperText="Use Tab to navigate between fields"
            required
          >
            <GlassInput placeholder="Focus me with Tab" />
          </GlassFormField>

          <GlassFormField label="Last Name" required>
            <GlassInput placeholder="Continue with Tab" />
          </GlassFormField>

          <GlassFormField
            label="Email"
            error="This field has an error announcement"
            required
          >
            <GlassInput
              type="email"
              placeholder="Error state for screen readers" />
          </GlassFormField>

          <GlassFormField label="Comments" helperText="Shift+Tab to go back">
            <GlassTextarea
              placeholder="Test keyboard navigation here..." }
              rows={3} />
          </GlassFormField>
        </div>
      </div>

      <div>
        <h3 className="mb-4 font-semibold text-lg text-white/90">
          Screen Reader Test
        </h3>
        <div className="w-80">
          <GlassFormField
            label="Screen Reader Friendly Field"
            helperText="This field has proper ARIA attributes for screen readers"
            required
          >
            <GlassInput
              placeholder="Try with a screen reader"
              aria-label="Screen reader friendly input field" />
          </GlassFormField>
        </div>
      </div>
    </div>
  ),
};

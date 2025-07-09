import type { Meta, StoryObj } from '@storybook/react';
import { GlassFormField } from './glass-form-field';
import { GlassInput } from '../glass-input/glass-input';
import { GlassTextarea } from '../glass-textarea/glass-textarea';
import { GlassSelect } from '../glass-select/glass-select';
import { GlassCheckbox } from '../glass-checkbox/glass-checkbox';
import { GlassSwitch } from '../glass-switch/glass-switch';

const meta: Meta<typeof GlassFormField> = {
  title: 'Components/Form/GlassFormField',
  component: GlassFormField,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A form field wrapper that provides labels, validation states, helper text, and accessibility features.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      description: 'Label text for the form field',
      control: 'text',
    },
    htmlFor: {
      description: 'ID of the form control this field wraps',
      control: 'text',
    },
    required: {
      description: 'Whether the field is required',
      control: 'boolean',
    },
    optional: {
      description: 'Whether to show optional indicator',
      control: 'boolean',
    },
    error: {
      description: 'Error message or boolean for error state',
      control: 'text',
    },
    success: {
      description: 'Success message or boolean for success state',
      control: 'text',
    },
    warning: {
      description: 'Warning message or boolean for warning state',
      control: 'text',
    },
    helperText: {
      description: 'Helper text shown below the field',
      control: 'text',
    },
    disabled: {
      description: 'Whether the field is disabled',
      control: 'boolean',
    },
    size: {
      description: 'Size variant of the field',
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      description: 'Visual variant of the field',
      control: 'select',
      options: ['default', 'secondary', 'outline'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Username',
    htmlFor: 'username',
    children: <GlassInput id="username" placeholder="Enter your username" />,
  },
};

export const Required: Story = {
  args: {
    label: 'Email',
    htmlFor: 'email',
    required: true,
    children: (
      <GlassInput id="email" type="email" placeholder="Enter your email" />
    ),
  },
};

export const Optional: Story = {
  args: {
    label: 'Phone Number',
    htmlFor: 'phone',
    optional: true,
    children: (
      <GlassInput id="phone" type="tel" placeholder="Enter your phone number" />
    ),
  },
};

export const WithHelper: Story = {
  args: {
    label: 'Password',
    htmlFor: 'password',
    helperText:
      'Must be at least 8 characters with uppercase, lowercase, and numbers',
    children: (
      <GlassInput
        id="password"
        type="password"
        placeholder="Enter your password"
      />
    ),
  },
};

export const ErrorState: Story = {
  args: {
    label: 'Email',
    htmlFor: 'email-error',
    error: 'Please enter a valid email address',
    children: (
      <GlassInput
        id="email-error"
        type="email"
        placeholder="Enter your email"
        error
      />
    ),
  },
};

export const SuccessState: Story = {
  args: {
    label: 'Username',
    htmlFor: 'username-success',
    success: 'Username is available',
    children: (
      <GlassInput
        id="username-success"
        placeholder="Enter your username"
        success
      />
    ),
  },
};

export const WarningState: Story = {
  args: {
    label: 'Password',
    htmlFor: 'password-warning',
    warning: 'Password strength is weak',
    children: (
      <GlassInput
        id="password-warning"
        type="password"
        placeholder="Enter your password"
      />
    ),
  },
};

export const Disabled: Story = {
  args: {
    label: 'Username',
    htmlFor: 'username-disabled',
    disabled: true,
    children: (
      <GlassInput
        id="username-disabled"
        placeholder="Enter your username"
        disabled
      />
    ),
  },
};

export const WithTextarea: Story = {
  args: {
    label: 'Message',
    htmlFor: 'message',
    helperText: 'Maximum 500 characters',
    children: (
      <GlassTextarea id="message" placeholder="Enter your message" rows={4} />
    ),
  },
};

export const WithSelect: Story = {
  args: {
    label: 'Country',
    htmlFor: 'country',
    required: true,
    children: (
      <GlassSelect id="country" placeholder="Select your country">
        <option value="us">United States</option>
        <option value="ca">Canada</option>
        <option value="uk">United Kingdom</option>
        <option value="au">Australia</option>
      </GlassSelect>
    ),
  },
};

export const WithCheckbox: Story = {
  args: {
    label: 'Preferences',
    children: (
      <div className="space-y-2">
        <GlassCheckbox id="newsletter" label="Subscribe to newsletter" />
        <GlassCheckbox id="updates" label="Receive product updates" />
        <GlassCheckbox id="marketing" label="Marketing communications" />
      </div>
    ),
  },
};

export const WithSwitch: Story = {
  args: {
    label: 'Notifications',
    children: (
      <div className="space-y-3">
        <GlassSwitch id="email-notifications" label="Email notifications" />
        <GlassSwitch id="push-notifications" label="Push notifications" />
        <GlassSwitch id="sms-notifications" label="SMS notifications" />
      </div>
    ),
  },
};

export const SmallSize: Story = {
  args: {
    label: 'Code',
    htmlFor: 'code-sm',
    size: 'sm',
    children: <GlassInput id="code-sm" placeholder="Enter code" size="sm" />,
  },
};

export const LargeSize: Story = {
  args: {
    label: 'Title',
    htmlFor: 'title-lg',
    size: 'lg',
    children: <GlassInput id="title-lg" placeholder="Enter title" size="lg" />,
  },
};

export const SecondaryVariant: Story = {
  args: {
    label: 'Description',
    htmlFor: 'description-secondary',
    variant: 'secondary',
    children: (
      <GlassInput
        id="description-secondary"
        placeholder="Enter description"
        variant="secondary"
      />
    ),
  },
};

export const OutlineVariant: Story = {
  args: {
    label: 'Notes',
    htmlFor: 'notes-outline',
    variant: 'outline',
    children: (
      <GlassInput
        id="notes-outline"
        placeholder="Enter notes"
        variant="outline"
      />
    ),
  },
};

export const ComplexForm: Story = {
  render: () => (
    <div className="space-y-6 w-96">
      <GlassFormField label="Full Name" htmlFor="fullname" required>
        <GlassInput id="fullname" placeholder="Enter your full name" />
      </GlassFormField>

      <GlassFormField
        label="Email Address"
        htmlFor="email-complex"
        required
        helperText="We'll never share your email with anyone else"
      >
        <GlassInput
          id="email-complex"
          type="email"
          placeholder="Enter your email"
        />
      </GlassFormField>

      <GlassFormField
        label="Phone Number"
        htmlFor="phone-complex"
        optional
        helperText="Include country code"
      >
        <GlassInput
          id="phone-complex"
          type="tel"
          placeholder="+1 (555) 123-4567"
        />
      </GlassFormField>

      <GlassFormField
        label="Message"
        htmlFor="message-complex"
        required
        helperText="Tell us how we can help you"
      >
        <GlassTextarea
          id="message-complex"
          placeholder="Enter your message"
          rows={4}
        />
      </GlassFormField>

      <GlassFormField label="Newsletter Subscription">
        <GlassCheckbox
          id="newsletter-complex"
          label="Subscribe to our newsletter"
        />
      </GlassFormField>
    </div>
  ),
};

export const ValidationStates: Story = {
  render: () => (
    <div className="space-y-6 w-96">
      <GlassFormField
        label="Valid Email"
        htmlFor="valid-email"
        success="Email is valid"
      >
        <GlassInput
          id="valid-email"
          type="email"
          value="user@example.com"
          success
        />
      </GlassFormField>

      <GlassFormField
        label="Invalid Email"
        htmlFor="invalid-email"
        error="Please enter a valid email address"
      >
        <GlassInput
          id="invalid-email"
          type="email"
          value="invalid-email"
          error
        />
      </GlassFormField>

      <GlassFormField
        label="Weak Password"
        htmlFor="weak-password"
        warning="Password is too weak"
        helperText="Use a mix of letters, numbers, and symbols"
      >
        <GlassInput id="weak-password" type="password" value="123" />
      </GlassFormField>

      <GlassFormField
        label="Strong Password"
        htmlFor="strong-password"
        success="Password is strong"
      >
        <GlassInput
          id="strong-password"
          type="password"
          value="MyStr0ngP@ssw0rd!"
          success
        />
      </GlassFormField>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-6 w-96">
      <GlassFormField
        label="Small Field"
        htmlFor="small-field"
        size="sm"
        helperText="This is a small form field"
      >
        <GlassInput id="small-field" placeholder="Small input" size="sm" />
      </GlassFormField>

      <GlassFormField
        label="Medium Field"
        htmlFor="medium-field"
        size="md"
        helperText="This is a medium form field"
      >
        <GlassInput id="medium-field" placeholder="Medium input" size="md" />
      </GlassFormField>

      <GlassFormField
        label="Large Field"
        htmlFor="large-field"
        size="lg"
        helperText="This is a large form field"
      >
        <GlassInput id="large-field" placeholder="Large input" size="lg" />
      </GlassFormField>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6 w-96">
      <GlassFormField
        label="Default Variant"
        htmlFor="default-variant"
        variant="default"
        helperText="Default form field styling"
      >
        <GlassInput
          id="default-variant"
          placeholder="Default input"
          variant="default"
        />
      </GlassFormField>

      <GlassFormField
        label="Secondary Variant"
        htmlFor="secondary-variant"
        variant="secondary"
        helperText="Secondary form field styling"
      >
        <GlassInput
          id="secondary-variant"
          placeholder="Secondary input"
          variant="secondary"
        />
      </GlassFormField>

      <GlassFormField
        label="Outline Variant"
        htmlFor="outline-variant"
        variant="outline"
        helperText="Outline form field styling"
      >
        <GlassInput
          id="outline-variant"
          placeholder="Outline input"
          variant="outline"
        />
      </GlassFormField>
    </div>
  ),
};

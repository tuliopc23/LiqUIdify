import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { GlassInput } from './glass-input';
import { Card } from '../glass-card-refactored/glass-card';
import { GlassButton } from '../glass-button-refactored/glass-button';
import { 
  Search,
  Mail,
  Lock,
  User,
  Phone,
  Calendar,
  CreditCard,
  DollarSign,
  Globe,
  Link,
  Hash,
  AtSign,
  MapPin,
  Home,
  Building,
  FileText,
  Edit,
  Bookmark,
  Star,
  Heart,
  Flag,
  Tag,
  Folder,
  File,
  Image,
  Video,
  Music,
  Mic,
  Camera,
  Wifi,
  Bluetooth,
  Battery,
  Clock,
  AlertCircle,
  Info,
  HelpCircle,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Shield,
  Key,
  Eye,
  EyeOff,
  Filter,
  Settings,
  Sliders,
  Package,
  ShoppingCart,
  Gift,
  Award,
  Zap,
  Activity,
  BarChart,
  PieChart,
  TrendingUp,
  Database,
  Server,
  Cpu,
  HardDrive,
  Monitor,
  Smartphone,
  Tablet,
  Headphones,
  Keyboard,
  Mouse,
  Printer,
  Code,
  Terminal,
  GitBranch,
  GitCommit,
  Github,
  Gitlab,
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Twitch,
  MessageCircle,
  Send,
  Bell,
  BellOff,
  Volume2,
  VolumeX,
  Sun,
  Moon,
  Cloud,
  CloudRain,
  CloudSnow,
  Wind,
  Droplets,
  Thermometer,
  Umbrella,
  Coffee,
  Pizza,
  Apple,
  Anchor,
  Aperture,
  Archive,
  ArrowRight,
  ArrowLeft,
  Download,
  Upload,
  RefreshCw,
  RotateCw,
  Save,
  Trash2,
  Copy,
  Clipboard,
  Check,
  X,
  Plus,
  Minus,
  ChevronRight,
  ChevronLeft,
  ChevronUp,
  ChevronDown,
  ChevronsRight,
  ChevronsLeft,
  ChevronsUp,
  ChevronsDown,
  Square,
  Circle,
  Triangle,
  Hexagon,
  Octagon,
  Command,
  Option,
  Delete
} from 'lucide-react';

const meta = {
  title: 'Components/Forms/GlassInput',
  component: GlassInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A versatile glassmorphic input component with multiple variants, icons, and comprehensive accessibility features.

## Features

- **Multiple Variants**: Default, search, password, and email variants
- **Icon Support**: Left and right icon slots with automatic padding
- **Clearable**: Optional clear button for quick input reset
- **Password Toggle**: Show/hide password functionality
- **Error States**: Built-in error styling and helper text
- **Glass Design**: Beautiful frosted glass appearance
- **Theme Support**: Automatic adaptation to light and dark themes
- **Accessibility**: Full keyboard navigation and ARIA attributes
- **Controlled/Uncontrolled**: Works in both controlled and uncontrolled modes
- **Auto-complete**: Native browser autocomplete support

## Usage

\`\`\`tsx
import { GlassInput } from '@/components/glass-input';

// Basic usage
<GlassInput placeholder="Enter text..." />

// With icons
<GlassInput 
  leftIcon={<User />}
  placeholder="Username"
/>

// Search variant
<GlassInput 
  variant="search"
  placeholder="Search..."
  clearable
/>

// Password variant
<GlassInput 
  variant="password"
  placeholder="Enter password"
/>

// With error
<GlassInput 
  error
  helperText="This field is required"
/>
\`\`\`

## Keyboard Shortcuts

- **Tab**: Navigate between inputs
- **Escape**: Clear input (when focused and clearable)
- **Enter**: Submit form (in form context)

## Accessibility

The input component follows WAI-ARIA guidelines:
- Proper labeling with htmlFor
- Error states with aria-invalid and aria-describedby
- Focus indicators
- Screen reader support
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    // Variant
    variant: {
      control: 'select',
      options: ['default', 'search', 'password', 'email'],
      description: 'Input variant',
      table: {
        type: { summary: 'default | search | password | email' },
        defaultValue: { summary: 'default' },
        category: 'Variant',
      },
    },
    
    // Content
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
      table: {
        type: { summary: 'string' },
        category: 'Content',
      },
    },
    value: {
      control: 'text',
      description: 'Input value (controlled)',
      table: {
        type: { summary: 'string' },
        category: 'Content',
      },
    },
    defaultValue: {
      control: 'text',
      description: 'Default value (uncontrolled)',
      table: {
        type: { summary: 'string' },
        category: 'Content',
      },
    },
    helperText: {
      control: 'text',
      description: 'Helper text below input',
      table: {
        type: { summary: 'string' },
        category: 'Content',
      },
    },
    
    // Icons
    leftIcon: {
      control: false,
      description: 'Icon on the left side',
      table: {
        type: { summary: 'React.ReactNode' },
        category: 'Icons',
      },
    },
    rightIcon: {
      control: false,
      description: 'Icon on the right side',
      table: {
        type: { summary: 'React.ReactNode' },
        category: 'Icons',
      },
    },
    
    // Features
    clearable: {
      control: 'boolean',
      description: 'Show clear button when input has value',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Features',
      },
    },
    error: {
      control: 'boolean',
      description: 'Error state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Features',
      },
    },
    
    // HTML Props
    type: {
      control: 'select',
      options: ['text', 'email', 'tel', 'url', 'number', 'date', 'time', 'datetime-local'],
      description: 'HTML input type',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'text' },
        category: 'HTML Props',
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'HTML Props',
      },
    },
    required: {
      control: 'boolean',
      description: 'Required field',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'HTML Props',
      },
    },
    readOnly: {
      control: 'boolean',
      description: 'Read-only state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'HTML Props',
      },
    },
    autoFocus: {
      control: 'boolean',
      description: 'Auto-focus on mount',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'HTML Props',
      },
    },
    autoComplete: {
      control: 'text',
      description: 'Autocomplete attribute',
      table: {
        type: { summary: 'string' },
        category: 'HTML Props',
      },
    },
    
    // Events
    onChange: {
      action: 'changed',
      description: 'Change event handler',
      table: {
        type: { summary: '(event: ChangeEvent<HTMLInputElement>) => void' },
        category: 'Events',
      },
    },
    onFocus: {
      action: 'focused',
      table: {
        category: 'Events',
      },
    },
    onBlur: {
      action: 'blurred',
      table: {
        category: 'Events',
      },
    },
  },
  args: {
    variant: 'default',
    clearable: false,
    error: false,
    disabled: false,
    required: false,
    readOnly: false,
    autoFocus: false,
  },
} satisfies Meta<typeof GlassInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story - Interactive playground
export const Playground: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

// Variants showcase
export const Variants: Story = {
  render: () => (
    <div className="space-y-6 w-full max-w-md">
      <div className="space-y-2">
        <label className="text-sm font-medium">Default</label>
        <GlassInput placeholder="Enter text..." />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Search</label>
        <GlassInput variant="search" placeholder="Search..." clearable />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Password</label>
        <GlassInput variant="password" placeholder="Enter password" />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Email</label>
        <GlassInput variant="email" type="email" placeholder="you@example.com" />
      </div>
    </div>
  ),
};

// With icons
export const WithIcons: Story = {
  render: () => (
    <div className="space-y-6 w-full max-w-md">
      <GlassInput 
        leftIcon={<User className="h-4 w-4" />}
        placeholder="Username"
      />
      
      <GlassInput 
        leftIcon={<Mail className="h-4 w-4" />}
        placeholder="Email address"
        type="email"
      />
      
      <GlassInput 
        leftIcon={<Phone className="h-4 w-4" />}
        placeholder="Phone number"
        type="tel"
      />
      
      <GlassInput 
        leftIcon={<CreditCard className="h-4 w-4" />}
        placeholder="Card number"
        rightIcon={<Shield className="h-4 w-4 text-green-500" />}
      />
      
      <GlassInput 
        leftIcon={<Calendar className="h-4 w-4" />}
        placeholder="Select date"
        type="date"
      />
      
      <GlassInput 
        leftIcon={<Link className="h-4 w-4" />}
        placeholder="Website URL"
        type="url"
      />
    </div>
  ),
};

// Features showcase
export const Features: Story = {
  render: () => (
    <div className="space-y-6 w-full max-w-md">
      <div className="space-y-2">
        <label className="text-sm font-medium">Clearable Input</label>
        <GlassInput 
          placeholder="Type something..."
          clearable
          defaultValue="Clear me!"
        />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">With Helper Text</label>
        <GlassInput 
          placeholder="Email"
          helperText="We'll never share your email"
          leftIcon={<Mail className="h-4 w-4" />}
        />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Error State</label>
        <GlassInput 
          placeholder="Required field"
          error
          helperText="This field is required"
          defaultValue="Invalid input"
        />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Disabled</label>
        <GlassInput 
          placeholder="Disabled input"
          disabled
          defaultValue="Cannot edit"
        />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Read Only</label>
        <GlassInput 
          placeholder="Read only"
          readOnly
          defaultValue="Read only value"
        />
      </div>
    </div>
  ),
};

// Form example
export const FormExample: Story = {
  render: () => {
    const [formData, setFormData] = React.useState({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    
    const [errors, setErrors] = React.useState<Record<string, string>>({});
    
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const newErrors: Record<string, string> = {};
      
      if (!formData.username) newErrors.username = 'Username is required';
      if (!formData.email) newErrors.email = 'Email is required';
      if (!formData.password) newErrors.password = 'Password is required';
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
      
      setErrors(newErrors);
      
      if (Object.keys(newErrors).length === 0) {
        alert('Form submitted successfully!');
      }
    };
    
    const handleChange = (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData(prev => ({ ...prev, [field]: e.target.value }));
      // Clear error when user types
      if (errors[field]) {
        setErrors(prev => ({ ...prev, [field]: '' }));
      }
    };
    
    return (
      <Card className="w-full max-w-md">
        <Card.Header>
          <Card.Title>Create Account</Card.Title>
          <Card.Description>Fill in your details to get started</Card.Description>
        </Card.Header>
        <Card.Content>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium">Username</label>
              <GlassInput
                id="username"
                placeholder="johndoe"
                leftIcon={<User className="h-4 w-4" />}
                value={formData.username}
                onChange={handleChange('username')}
                error={!!errors.username}
                helperText={errors.username}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <GlassInput
                id="email"
                type="email"
                placeholder="john@example.com"
                leftIcon={<Mail className="h-4 w-4" />}
                value={formData.email}
                onChange={handleChange('email')}
                error={!!errors.email}
                helperText={errors.email}
                required
                autoComplete="email"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">Password</label>
              <GlassInput
                id="password"
                variant="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange('password')}
                error={!!errors.password}
                helperText={errors.password || "Must be at least 8 characters"}
                required
                autoComplete="new-password"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</label>
              <GlassInput
                id="confirmPassword"
                variant="password"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange('confirmPassword')}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                required
                autoComplete="new-password"
              />
            </div>
            
            <GlassButton type="submit" variant="primary" fullWidth>
              Create Account
            </GlassButton>
          </form>
        </Card.Content>
      </Card>
    );
  },
};

// Real-world examples
export const RealWorldExamples: Story = {
  render: () => (
    <div className="space-y-8 max-w-6xl">
      {/* Search Examples */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Search Inputs</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <GlassInput
            variant="search"
            placeholder="Search products..."
            clearable
          />
          
          <GlassInput
            leftIcon={<Search className="h-4 w-4" />}
            rightIcon={<Filter className="h-4 w-4" />}
            placeholder="Search with filters"
          />
          
          <GlassInput
            variant="search"
            placeholder="Search by location"
            leftIcon={<MapPin className="h-4 w-4" />}
            clearable
          />
          
          <GlassInput
            leftIcon={<Globe className="h-4 w-4" />}
            placeholder="Search globally"
            rightIcon={
              <span className="text-xs text-gray-500">⌘K</span>
            }
          />
        </div>
      </div>
      
      {/* Payment Form */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Payment Information</h3>
        <Card className="max-w-md">
          <Card.Content className="space-y-4">
            <GlassInput
              leftIcon={<CreditCard className="h-4 w-4" />}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              autoComplete="cc-number"
            />
            
            <div className="grid grid-cols-2 gap-4">
              <GlassInput
                placeholder="MM/YY"
                maxLength={5}
                autoComplete="cc-exp"
              />
              <GlassInput
                placeholder="CVV"
                maxLength={4}
                rightIcon={<HelpCircle className="h-4 w-4" />}
                autoComplete="cc-csc"
              />
            </div>
            
            <GlassInput
              leftIcon={<User className="h-4 w-4" />}
              placeholder="Cardholder name"
              autoComplete="cc-name"
            />
          </Card.Content>
        </Card>
      </div>
      
      {/* Contact Form */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
          <GlassInput
            leftIcon={<User className="h-4 w-4" />}
            placeholder="First name"
            autoComplete="given-name"
          />
          <GlassInput
            leftIcon={<User className="h-4 w-4" />}
            placeholder="Last name"
            autoComplete="family-name"
          />
          <GlassInput
            leftIcon={<Mail className="h-4 w-4" />}
            placeholder="Email"
            type="email"
            autoComplete="email"
          />
          <GlassInput
            leftIcon={<Phone className="h-4 w-4" />}
            placeholder="Phone"
            type="tel"
            autoComplete="tel"
          />
          <GlassInput
            leftIcon={<Building className="h-4 w-4" />}
            placeholder="Company"
            autoComplete="organization"
          />
          <GlassInput
            leftIcon={<Globe className="h-4 w-4" />}
            placeholder="Website"
            type="url"
            autoComplete="url"
          />
        </div>
      </div>
      
      {/* Settings Inputs */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
          <GlassInput
            leftIcon={<AtSign className="h-4 w-4" />}
            placeholder="Username"
            helperText="This will be your public handle"
          />
          <GlassInput
            leftIcon={<Link className="h-4 w-4" />}
            placeholder="Profile URL"
            defaultValue="app.com/"
          />
          <GlassInput
            leftIcon={<Hash className="h-4 w-4" />}
            placeholder="API Key"
            type="password"
            rightIcon={<Copy className="h-4 w-4 cursor-pointer" />}
          />
          <GlassInput
            leftIcon={<Shield className="h-4 w-4" />}
            placeholder="Two-factor code"
            maxLength={6}
          />
        </div>
      </div>
    </div>
  ),
};

// Interactive demo
export const InteractiveDemo: Story = {
  render: () => {
    const [value, setValue] = React.useState('');
    const [searchTerm, setSearchTerm] = React.useState('');
    const [password, setPassword] = React.useState('');
    
    const passwordStrength = React.useMemo(() => {
      if (!password) return { strength: 0, label: '' };
      if (password.length < 6) return { strength: 1, label: 'Weak' };
      if (password.length < 10) return { strength: 2, label: 'Medium' };
      return { strength: 3, label: 'Strong' };
    }, [password]);
    
    return (
      <div className="space-y-8 w-full max-w-md">
        <Card>
          <Card.Header>
            <Card.Title>Controlled Input</Card.Title>
            <Card.Description>Character count: {value.length}/50</Card.Description>
          </Card.Header>
          <Card.Content>
            <GlassInput
              placeholder="Type something..."
              value={value}
              onChange={(e) => setValue(e.target.value)}
              maxLength={50}
              clearable
              helperText={`${50 - value.length} characters remaining`}
              error={value.length >= 50}
            />
          </Card.Content>
        </Card>
        
        <Card>
          <Card.Header>
            <Card.Title>Live Search</Card.Title>
          </Card.Header>
          <Card.Content className="space-y-4">
            <GlassInput
              variant="search"
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              clearable
            />
            {searchTerm && (
              <div className="space-y-2">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Searching for: "{searchTerm}"
                </p>
                <div className="space-y-1">
                  {['Apple', 'Banana', 'Orange', 'Grape', 'Mango']
                    .filter(item => item.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map(item => (
                      <div key={item} className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
                        {item}
                      </div>
                    ))}
                </div>
              </div>
            )}
          </Card.Content>
        </Card>
        
        <Card>
          <Card.Header>
            <Card.Title>Password Strength</Card.Title>
          </Card.Header>
          <Card.Content className="space-y-4">
            <GlassInput
              variant="password"
              placeholder="Create password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              helperText={passwordStrength.label}
            />
            {password && (
              <div className="space-y-2">
                <div className="flex gap-1">
                  {[1, 2, 3].map((level) => (
                    <div
                      key={level}
                      className={cn(
                        "h-2 flex-1 rounded transition-colors",
                        level <= passwordStrength.strength
                          ? level === 1 ? "bg-red-500"
                          : level === 2 ? "bg-yellow-500"
                          : "bg-green-500"
                          : "bg-gray-200 dark:bg-gray-700"
                      )}
                    />
                  ))}
                </div>
              </div>
            )}
          </Card.Content>
        </Card>
      </div>
    );
  },
};

// Theme showcase
export const ThemeShowcase: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4 p-6 rounded-xl bg-white/80 dark:bg-gray-900/80">
          <h3 className="text-lg font-semibold">Light Theme</h3>
          <div className="space-y-4">
            <GlassInput placeholder="Default input" />
            <GlassInput variant="search" placeholder="Search..." clearable />
            <GlassInput 
              placeholder="With icon"
              leftIcon={<Mail className="h-4 w-4" />}
            />
            <GlassInput 
              placeholder="Error state"
              error
              helperText="Something went wrong"
            />
          </div>
        </div>
        
        <div className="space-y-4 p-6 rounded-xl bg-gray-900/80 dark:bg-white/80">
          <h3 className="text-lg font-semibold text-white dark:text-gray-900">Dark Theme</h3>
          <div className="space-y-4">
            <GlassInput placeholder="Default input" />
            <GlassInput variant="search" placeholder="Search..." clearable />
            <GlassInput 
              placeholder="With icon"
              leftIcon={<Mail className="h-4 w-4" />}
            />
            <GlassInput 
              placeholder="Error state"
              error
              helperText="Something went wrong"
            />
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    backgrounds: { 
      default: 'liquid-gradient',
    },
  },
};

// Accessibility showcase
export const AccessibilityShowcase: Story = {
  render: () => (
    <div className="space-y-8 max-w-2xl">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Proper Labeling</h3>
        <Card>
          <Card.Content className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="accessible-input-1" className="text-sm font-medium">
                Email Address (with visible label)
              </label>
              <GlassInput
                id="accessible-input-1"
                type="email"
                placeholder="you@example.com"
                leftIcon={<Mail className="h-4 w-4" />}
                autoComplete="email"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="accessible-input-2" className="sr-only">
                Search
              </label>
              <GlassInput
                id="accessible-input-2"
                variant="search"
                placeholder="Search (with screen reader label)"
                aria-label="Search products"
              />
            </div>
          </Card.Content>
        </Card>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Error Handling</h3>
        <Card>
          <Card.Content className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="error-input" className="text-sm font-medium">
                Required Field
              </label>
              <GlassInput
                id="error-input"
                placeholder="This field has an error"
                error
                helperText="This field is required and must be filled"
                aria-invalid="true"
                aria-required="true"
              />
            </div>
          </Card.Content>
        </Card>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Focus Management</h3>
        <Card>
          <Card.Content className="space-y-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Tab through these inputs to see focus indicators
            </p>
            <GlassInput placeholder="First input" />
            <GlassInput placeholder="Second input" />
            <GlassInput placeholder="Third input" />
            <GlassButton>Submit Form</GlassButton>
          </Card.Content>
        </Card>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Autocomplete Support</h3>
        <Card>
          <Card.Content>
            <form className="space-y-4">
              <GlassInput
                placeholder="Full name"
                autoComplete="name"
                leftIcon={<User className="h-4 w-4" />}
              />
              <GlassInput
                placeholder="Email"
                type="email"
                autoComplete="email"
                leftIcon={<Mail className="h-4 w-4" />}
              />
              <GlassInput
                placeholder="Phone"
                type="tel"
                autoComplete="tel"
                leftIcon={<Phone className="h-4 w-4" />}
              />
              <GlassInput
                placeholder="Street address"
                autoComplete="street-address"
                leftIcon={<Home className="h-4 w-4" />}
              />
            </form>
          </Card.Content>
        </Card>
      </div>
    </div>
  ),
};
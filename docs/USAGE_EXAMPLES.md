# 🚀 LiqUIdify Usage Examples

> Real-world examples and implementation patterns for building beautiful applications with LiqUIdify.

## 📖 Table of Contents

- [Getting Started](#getting-started)
- [Dashboard Example](#dashboard-example)
- [Authentication Forms](#authentication-forms)
- [E-commerce Components](#e-commerce-components)
- [Data Visualization](#data-visualization)
- [Landing Page Components](#landing-page-components)
- [Admin Panel](#admin-panel)
- [Mobile-First Design](#mobile-first-design)
- [Advanced Patterns](#advanced-patterns)
- [Performance Optimization](#performance-optimization)

## 🌟 Getting Started

### Basic Setup

```tsx
// app/layout.tsx (Next.js 13+)
import { GlassUIProvider, ThemeProvider } from 'liquidify';
import 'liquidify/styles';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <GlassUIProvider>
          <ThemeProvider defaultTheme="system" storageKey="app-theme">
            {children}
          </ThemeProvider>
        </GlassUIProvider>
      </body>
    </html>
  );
}
```

### Your First Component

```tsx
// components/WelcomeCard.tsx
import { GlassCard, GlassButton } from 'liquidify';
import { Sparkles } from 'lucide-react';

export function WelcomeCard() {
  return (
    <GlassCard className="max-w-md p-6">
      <div className="flex items-center gap-3 mb-4">
        <Sparkles className="h-6 w-6 text-blue-400" />
        <h2 className="text-xl font-semibold text-white/90">
          Welcome to LiqUIdify
        </h2>
      </div>
      
      <p className="text-white/70 mb-6">
        Start building beautiful, accessible interfaces with glassmorphism
        effects and smooth animations.
      </p>
      
      <GlassButton variant="primary" className="w-full">
        Get Started
      </GlassButton>
    </GlassCard>
  );
}
```

---

## 📊 Dashboard Example

### Complete Dashboard Layout

```tsx
// components/Dashboard.tsx
import {
  GlassCard,
  GlassButton,
  GlassInput,
  GlassProgress,
  GlassChart,
  GlassBadge,
  GlassAvatar,
  useTheme
} from 'liquidify';
import {
  Search,
  Bell,
  Settings,
  TrendingUp,
  Users,
  DollarSign,
  Activity
} from 'lucide-react';

interface DashboardProps {
  user: {
    name: string;
    avatar: string;
    role: string;
  };
}

export function Dashboard({ user }: DashboardProps) {
  const { theme, setTheme } = useTheme();

  const stats = [
    {
      title: 'Total Revenue',
      value: '$54,239',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
    },
    {
      title: 'Active Users',
      value: '12,847',
      change: '+8.2%',
      trend: 'up',
      icon: Users,
    },
    {
      title: 'Conversion Rate',
      value: '3.24%',
      change: '-2.1%',
      trend: 'down',
      icon: TrendingUp,
    },
    {
      title: 'Server Load',
      value: '78%',
      change: '+5.3%',
      trend: 'up',
      icon: Activity,
    },
  ];

  const chartData = [
    { label: 'Jan', value: 65 },
    { label: 'Feb', value: 78 },
    { label: 'Mar', value: 82 },
    { label: 'Apr', value: 71 },
    { label: 'May', value: 89 },
    { label: 'Jun', value: 95 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-white/5 backdrop-blur-md">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-white/90">Dashboard</h1>
            <GlassInput
              placeholder="Search..."
              leftIcon={<Search className="h-4 w-4" />}
              className="w-64"
            />
          </div>
          
          <div className="flex items-center gap-4">
            <GlassButton
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              <Settings className="h-4 w-4" />
            </GlassButton>
            
            <GlassButton variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
            </GlassButton>
            
            <div className="flex items-center gap-3">
              <GlassAvatar src={user.avatar} alt={user.name} size="sm" />
              <div className="text-sm">
                <p className="font-medium text-white/90">{user.name}</p>
                <p className="text-white/60">{user.role}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <GlassCard key={stat.title} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/60">{stat.title}</p>
                  <p className="text-2xl font-bold text-white/90 mt-1">
                    {stat.value}
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    <GlassBadge
                      variant={stat.trend === 'up' ? 'success' : 'destructive'}
                      size="sm"
                    >
                      {stat.change}
                    </GlassBadge>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-white/10">
                  <stat.icon className="h-6 w-6 text-white/70" />
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <GlassCard className="p-6">
            <h3 className="text-lg font-semibold text-white/90 mb-4">
              Revenue Trend
            </h3>
            <LineChart
              data={chartData}
              height={300}
              colors={['#667eea', '#764ba2']}
              animated
              responsive
            />
          </GlassCard>

          <GlassCard className="p-6">
            <h3 className="text-lg font-semibold text-white/90 mb-4">
              Performance Metrics
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-white/70">CPU Usage</span>
                  <span className="text-sm text-white/90">72%</span>
                </div>
                <GlassProgress value={72} color="primary" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-white/70">Memory</span>
                  <span className="text-sm text-white/90">58%</span>
                </div>
                <GlassProgress value={58} color="success" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-white/70">Storage</span>
                  <span className="text-sm text-white/90">89%</span>
                </div>
                <GlassProgress value={89} color="warning" />
              </div>
            </div>
          </GlassCard>
        </div>
      </main>
    </div>
  );
}
```

---

## 🔐 Authentication Forms

### Login Form with Validation

```tsx
// components/LoginForm.tsx
import { useState } from 'react';
import {
  GlassCard,
  GlassFormField,
  GlassInput,
  GlassButton,
  GlassCheckbox,
  useToast
} from 'liquidify';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

interface LoginFormData {
  email: string;
  password: string;
  remember: boolean;
}

export function LoginForm() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    remember: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: 'Success!',
        description: 'You have been logged in successfully.',
        variant: 'success',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Invalid credentials. Please try again.',
        variant: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof LoginFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-4">
      <GlassCard className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white/90 mb-2">
            Welcome Back
          </h1>
          <p className="text-white/60">
            Sign in to your account to continue
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <GlassFormField
            label="Email Address"
            required
            error={errors.email}
          >
            <GlassInput
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              leftIcon={<Mail className="h-4 w-4" />}
              error={!!errors.email}
            />
          </GlassFormField>

          <GlassFormField
            label="Password"
            required
            error={errors.password}
          >
            <GlassInput
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              leftIcon={<Lock className="h-4 w-4" />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-white/60 hover:text-white/90 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              }
              error={!!errors.password}
            />
          </GlassFormField>

          <div className="flex items-center justify-between">
            <GlassCheckbox
              checked={formData.remember}
              onChange={(checked) => handleInputChange('remember', checked)}
              label="Remember me"
            />
            
            <GlassButton
              variant="ghost"
              size="sm"
              type="button"
              className="text-blue-400 hover:text-blue-300"
            >
              Forgot password?
            </GlassButton>
          </div>

          <GlassButton
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            loading={isLoading}
            loadingText="Signing in..."
          >
            Sign In
          </GlassButton>
        </form>

        <div className="mt-8 text-center">
          <p className="text-white/60">
            Don't have an account?{' '}
            <GlassButton
              variant="ghost"
              size="sm"
              className="text-blue-400 hover:text-blue-300 p-0 h-auto"
            >
              Sign up
            </GlassButton>
          </p>
        </div>
      </GlassCard>
    </div>
  );
}
```

### Registration Form with Multi-Step

```tsx
// components/RegistrationForm.tsx
import { useState } from 'react';
import {
  GlassCard,
  GlassFormField,
  GlassInput,
  GlassButton,
  GlassSelect,
  GlassProgress,
  GlassCheckbox,
  GlassBadge
} from 'liquidify';
import { User, Mail, Lock, Building, ArrowRight, ArrowLeft, Check } from 'lucide-react';

interface RegistrationData {
  // Step 1: Personal Info
  firstName: string;
  lastName: string;
  email: string;
  
  // Step 2: Account Details
  password: string;
  confirmPassword: string;
  
  // Step 3: Company Info
  company: string;
  role: string;
  teamSize: string;
  
  // Step 4: Preferences
  newsletter: boolean;
  terms: boolean;
}

export function RegistrationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<RegistrationData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: '',
    role: '',
    teamSize: '',
    newsletter: true,
    terms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const steps = [
    { title: 'Personal Info', description: 'Basic information' },
    { title: 'Account', description: 'Login credentials' },
    { title: 'Company', description: 'Organization details' },
    { title: 'Finish', description: 'Final preferences' },
  ];

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.firstName) newErrors.firstName = 'First name is required';
        if (!formData.lastName) newErrors.lastName = 'Last name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) 
          newErrors.email = 'Invalid email format';
        break;
        
      case 2:
        if (!formData.password) newErrors.password = 'Password is required';
        else if (formData.password.length < 8) 
          newErrors.password = 'Password must be at least 8 characters';
        if (formData.password !== formData.confirmPassword) 
          newErrors.confirmPassword = 'Passwords do not match';
        break;
        
      case 3:
        if (!formData.company) newErrors.company = 'Company name is required';
        if (!formData.role) newErrors.role = 'Role is required';
        if (!formData.teamSize) newErrors.teamSize = 'Team size is required';
        break;
        
      case 4:
        if (!formData.terms) newErrors.terms = 'You must accept the terms';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleInputChange = (field: keyof RegistrationData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
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
                  leftIcon={<User className="h-4 w-4" />}
                />
              </GlassFormField>
              
              <GlassFormField
                label="Last Name"
                required
                error={errors.lastName}
              >
                <GlassInput
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                />
              </GlassFormField>
            </div>
            
            <GlassFormField
              label="Email Address"
              required
              error={errors.email}
            >
              <GlassInput
                type="email"
                placeholder="john@company.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                leftIcon={<Mail className="h-4 w-4" />}
              />
            </GlassFormField>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-4">
            <GlassFormField
              label="Password"
              required
              error={errors.password}
              helperText="Must be at least 8 characters"
            >
              <GlassInput
                type="password"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                leftIcon={<Lock className="h-4 w-4" />}
              />
            </GlassFormField>
            
            <GlassFormField
              label="Confirm Password"
              required
              error={errors.confirmPassword}
            >
              <GlassInput
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                leftIcon={<Lock className="h-4 w-4" />}
              />
            </GlassFormField>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-4">
            <GlassFormField
              label="Company Name"
              required
              error={errors.company}
            >
              <GlassInput
                placeholder="Acme Inc."
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                leftIcon={<Building className="h-4 w-4" />}
              />
            </GlassFormField>
            
            <GlassFormField
              label="Your Role"
              required
              error={errors.role}
            >
              <GlassSelect
                value={formData.role}
                onChange={(value) => handleInputChange('role', value)}
                options={[
                  { value: 'developer', label: 'Developer' },
                  { value: 'designer', label: 'Designer' },
                  { value: 'manager', label: 'Manager' },
                  { value: 'founder', label: 'Founder/CEO' },
                  { value: 'other', label: 'Other' },
                ]}
                placeholder="Select your role"
              />
            </GlassFormField>
            
            <GlassFormField
              label="Team Size"
              required
              error={errors.teamSize}
            >
              <GlassSelect
                value={formData.teamSize}
                onChange={(value) => handleInputChange('teamSize', value)}
                options={[
                  { value: '1', label: 'Just me' },
                  { value: '2-10', label: '2-10 people' },
                  { value: '11-50', label: '11-50 people' },
                  { value: '51-200', label: '51-200 people' },
                  { value: '200+', label: '200+ people' },
                ]}
                placeholder="Select team size"
              />
            </GlassFormField>
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                <Check className="h-8 w-8 text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-white/90 mb-2">
                Almost Done!
              </h3>
              <p className="text-white/60">
                Just a few final preferences to complete your registration.
              </p>
            </div>
            
            <div className="space-y-4">
              <GlassCheckbox
                checked={formData.newsletter}
                onChange={(checked) => handleInputChange('newsletter', checked)}
                label="Send me product updates and newsletters"
                description="Get the latest features and tips delivered to your inbox"
              />
              
              <GlassFormField error={errors.terms}>
                <GlassCheckbox
                  checked={formData.terms}
                  onChange={(checked) => handleInputChange('terms', checked)}
                  label="I agree to the Terms of Service and Privacy Policy"
                  description="Required to create your account"
                />
              </GlassFormField>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-4">
      <GlassCard className="w-full max-w-md p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white/90 mb-2">
            Create Account
          </h1>
          <p className="text-white/60">
            Step {currentStep} of {totalSteps}: {steps[currentStep - 1].title}
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex items-center ${
                  index + 1 <= currentStep ? 'text-blue-400' : 'text-white/40'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-medium ${
                    index + 1 < currentStep
                      ? 'bg-blue-500 border-blue-500 text-white'
                      : index + 1 === currentStep
                      ? 'border-blue-400 text-blue-400'
                      : 'border-white/20 text-white/40'
                  }`}
                >
                  {index + 1 < currentStep ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    index + 1
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 ml-4 ${
                      index + 1 < currentStep ? 'bg-blue-500' : 'bg-white/20'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <GlassProgress value={progress} className="h-2" />
        </div>

        {/* Form Content */}
        <div className="mb-8">
          {renderStep()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <GlassButton
            variant="ghost"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            leftIcon={<ArrowLeft className="h-4 w-4" />}
          >
            Previous
          </GlassButton>
          
          {currentStep === totalSteps ? (
            <GlassButton
              variant="primary"
              onClick={() => console.log('Submit registration', formData)}
              disabled={!formData.terms}
            >
              Create Account
            </GlassButton>
          ) : (
            <GlassButton
              variant="primary"
              onClick={handleNext}
              rightIcon={<ArrowRight className="h-4 w-4" />}
            >
              Next
            </GlassButton>
          )}
        </div>
      </GlassCard>
    </div>
  );
}
```

---

## 🛒 E-commerce Components

### Product Card Grid

```tsx
// components/ProductGrid.tsx
import {
  GlassCard,
  GlassButton,
  GlassBadge,
  GlassProgress,
  useToast
} from 'liquidify';
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react';
import { useState } from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  inStock: boolean;
  isNew?: boolean;
  isSale?: boolean;
}

interface ProductGridProps {
  products: Product[];
  onAddToCart: (productId: string) => void;
  onToggleWishlist: (productId: string) => void;
  wishlistIds: string[];
}

export function ProductGrid({
  products,
  onAddToCart,
  onToggleWishlist,
  wishlistIds
}: ProductGridProps) {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  const handleAddToCart = async (product: Product) => {
    if (!product.inStock) return;

    setLoadingStates(prev => ({ ...prev, [product.id]: true }));
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      onAddToCart(product.id);
      
      toast({
        title: 'Added to cart!',
        description: `${product.name} has been added to your cart.`,
        variant: 'success',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add item to cart. Please try again.',
        variant: 'error',
      });
    } finally {
      setLoadingStates(prev => ({ ...prev, [product.id]: false }));
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-white/20'
        }`}
      />
    ));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => {
        const isWishlisted = wishlistIds.includes(product.id);
        const isLoading = loadingStates[product.id];
        const discountPercentage = product.originalPrice
          ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
          : 0;

        return (
          <GlassCard
            key={product.id}
            className="group overflow-hidden transition-all duration-300 hover:scale-105"
            hover
          >
            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              
              {/* Badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-2">
                {product.isNew && (
                  <GlassBadge variant="primary" size="sm">
                    New
                  </GlassBadge>
                )}
                {product.isSale && (
                  <GlassBadge variant="destructive" size="sm">
                    -{discountPercentage}%
                  </GlassBadge>
                )}
                {!product.inStock && (
                  <GlassBadge variant="secondary" size="sm">
                    Out of Stock
                  </GlassBadge>
                )}
              </div>

              {/* Actions */}
              <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <GlassButton
                  variant="ghost"
                  size="sm"
                  onClick={() => onToggleWishlist(product.id)}
                  className={`p-2 ${isWishlisted ? 'text-red-400' : 'text-white/60'}`}
                >
                  <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
                </GlassButton>
                
                <GlassButton
                  variant="ghost"
                  size="sm"
                  className="p-2"
                >
                  <Eye className="h-4 w-4" />
                </GlassButton>
              </div>

              {/* Quick Add Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <GlassButton
                  variant="primary"
                  onClick={() => handleAddToCart(product)}
                  disabled={!product.inStock || isLoading}
                  loading={isLoading}
                  loadingText="Adding..."
                  leftIcon={<ShoppingCart className="h-4 w-4" />}
                >
                  Add to Cart
                </GlassButton>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
              {/* Category */}
              <GlassBadge variant="secondary" size="sm">
                {product.category}
              </GlassBadge>

              {/* Title */}
              <h3 className="font-semibold text-white/90 line-clamp-2 group-hover:text-blue-400 transition-colors">
                {product.name}
              </h3>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex">
                  {renderStars(product.rating)}
                </div>
                <span className="text-sm text-white/60">
                  ({product.reviews})
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-white/90">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-white/50 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              {/* Stock Indicator */}
              {product.inStock && (
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-white/60">
                    <span>Stock Level</span>
                    <span>Good</span>
                  </div>
                  <GlassProgress value={75} size="sm" color="success" />
                </div>
              )}

              {/* Add to Cart Button */}
              <GlassButton
                variant={product.inStock ? 'primary' : 'ghost'}
                size="sm"
                className="w-full"
                onClick={() => handleAddToCart(product)}
                disabled={!product.inStock || isLoading}
                loading={isLoading}
                loadingText="Adding..."
                leftIcon={<ShoppingCart className="h-4 w-4" />}
              >
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </GlassButton>
            </div>
          </GlassCard>
        );
      })}
    </div>
  );
}
```

---

## 📊 Data Visualization

### Analytics Dashboard

```tsx
// components/AnalyticsDashboard.tsx
import {
  GlassCard,
  GlassSelect,
  GlassTabs,
  GlassButton,
  GlassBadge,
  LineChart,
  BarChart,
  DonutChart
} from 'liquidify';
import { TrendingUp, TrendingDown, Download, Filter } from 'lucide-react';

interface MetricData {
  title: string;
  value: string;
  change: number;
  trend: 'up' | 'down';
  data: Array<{ label: string; value: number }>;
}

export function AnalyticsDashboard() {
  const timeRanges = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 3 months' },
    { value: '1y', label: 'Last year' },
  ];

  const metrics: MetricData[] = [
    {
      title: 'Total Revenue',
      value: '$124,563',
      change: 12.5,
      trend: 'up',
      data: [
        { label: 'Mon', value: 2400 },
        { label: 'Tue', value: 1398 },
        { label: 'Wed', value: 9800 },
        { label: 'Thu', value: 3908 },
        { label: 'Fri', value: 4800 },
        { label: 'Sat', value: 3800 },
        { label: 'Sun', value: 4300 },
      ],
    },
    {
      title: 'Active Users',
      value: '48,293',
      change: -3.2,
      trend: 'down',
      data: [
        { label: 'Mon', value: 6400 },
        { label: 'Tue', value: 7398 },
        { label: 'Wed', value: 5800 },
        { label: 'Thu', value: 6908 },
        { label: 'Fri', value: 7800 },
        { label: 'Sat', value: 6800 },
        { label: 'Sun', value: 7300 },
      ],
    },
    {
      title: 'Conversion Rate',
      value: '3.24%',
      change: 8.1,
      trend: 'up',
      data: [
        { label: 'Mon', value: 24 },
        { label: 'Tue', value: 18 },
        { label: 'Wed', value: 32 },
        { label: 'Thu', value: 28 },
        { label: 'Fri', value: 35 },
        { label: 'Sat', value: 29 },
        { label: 'Sun', value: 31 },
      ],
    },
  ];

  const trafficSources = [
    { label: 'Organic Search', value: 45, color: '#667eea' },
    { label: 'Direct', value: 25, color: '#764ba2' },
    { label: 'Social Media', value: 15, color: '#f093fb' },
    { label: 'Email', value: 10, color: '#4facfe' },
    { label: 'Referral', value: 5, color: '#43e97b' },
  ];

  const deviceData = [
    { label: 'Desktop', value: 58 },
    { label: 'Mobile', value: 35 },
    { label: 'Tablet', value: 7 },
  ];

  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      content: (
        <div className="space-y-6">
          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {metrics.map((metric) => (
              <GlassCard key={metric.title} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-white/60">
                    {metric.title}
                  </h3>
                  <GlassBadge
                    variant={metric.trend === 'up' ? 'success' : 'destructive'}
                    size="sm"
                  >
                    {metric.trend === 'up' ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    {Math.abs(metric.change)}%
                  </GlassBadge>
                </div>
                
                <div className="mb-4">
                  <span className="text-2xl font-bold text-white/90">
                    {metric.value}
                  </span>
                </div>
                
                <div className="h-20">
                  <LineChart
                    data={metric.data}
                    height={80}
                    colors={[metric.trend === 'up' ? '#10b981' : '#ef4444']}
                    animated
                    responsive
                  />
                </div>
              </GlassCard>
            ))}
          </div>

          {/* Main Chart */}
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white/90">
                Revenue Overview
              </h3>
              <div className="flex gap-3">
                <GlassSelect
                  value="30d"
                  options={timeRanges}
                  className="w-40"
                />
                <GlassButton variant="ghost" size="sm">
                  <Filter className="h-4 w-4" />
                </GlassButton>
                <GlassButton variant="ghost" size="sm">
                  <Download className="h-4 w-4" />
                </GlassButton>
              </div>
            </div>
            
            <LineChart
              data={[
                { label: 'Jan', value: 65000 },
                { label: 'Feb', value: 78000 },
                { label: 'Mar', value: 82000 },
                { label: 'Apr', value: 71000 },
                { label: 'May', value: 89000 },
                { label: 'Jun', value: 95000 },
                { label: 'Jul', value: 88000 },
                { label: 'Aug', value: 92000 },
                { label: 'Sep', value: 87000 },
                { label: 'Oct', value: 96000 },
                { label: 'Nov', value: 104000 },
                { label: 'Dec', value: 124563 },
              ]}
              height={400}
              colors={['#667eea', '#764ba2']}
              animated
              responsive
              grid
              legend
            />
          </GlassCard>
        </div>
      ),
    },
    {
      id: 'traffic',
      label: 'Traffic',
      content: (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <GlassCard className="p-6">
            <h3 className="text-lg font-semibold text-white/90 mb-6">
              Traffic Sources
            </h3>
            <DonutChart
              data={trafficSources}
              height={300}
              animated
              legend
            />
          </GlassCard>

          <GlassCard className="p-6">
            <h3 className="text-lg font-semibold text-white/90 mb-6">
              Device Breakdown
            </h3>
            <BarChart
              data={deviceData}
              height={300}
              colors={['#667eea', '#764ba2', '#f093fb']}
              animated
              responsive
            />
          </GlassCard>
        </div>
      ),
    },
    {
      id: 'users',
      label: 'Users',
      content: (
        <div className="space-y-6">
          <GlassCard className="p-6">
            <h3 className="text-lg font-semibold text-white/90 mb-6">
              User Activity
            </h3>
            <LineChart
              data={[
                { label: '00:00', value: 45 },
                { label: '04:00', value: 23 },
                { label: '08:00', value: 78 },
                { label: '12:00', value: 95 },
                { label: '16:00', value: 87 },
                { label: '20:00', value: 65 },
              ]}
              height={300}
              colors={['#4facfe', '#00f2fe']}
              animated
              responsive
              grid
            />
          </GlassCard>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white/90">Analytics</h1>
          <p className="text-white/60 mt-1">
            Track your business performance and growth
          </p>
        </div>
        
        <div className="flex gap-3">
          <GlassSelect
            value="30d"
            options={timeRanges}
            className="w-40"
          />
          <GlassButton variant="primary">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </GlassButton>
        </div>
      </div>

      {/* Tabs */}
      <GlassTabs
        tabs={tabs}
        variant="pills"
        className="space-y-6"
      />
    </div>
  );
}
```

---

## 🏠 Landing Page Components

### Hero Section

```tsx
// components/HeroSection.tsx
import {
  GlassButton,
  GlassCard,
  GlassBadge,
  useTheme
} from 'liquidify';
import { ArrowRight, Play, Star, Check } from 'lucide-react';

export function HeroSection() {
  const { theme } = useTheme();

  const features = [
    'TypeScript First',
    'Accessibility Ready',
    'Dark Mode Support',
    '50+ Components'
  ];

  const stats = [
    { label: 'GitHub Stars', value: '2.4k' },
    { label: 'Weekly Downloads', value: '12k' },
    { label: 'Active Users', value: '500+' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        <div className="absolute inset-0 opacity-30">
          {/* Floating Glass Elements */}
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/5 backdrop-blur-md animate-float"
              style={{
                width: Math.random() * 100 + 50,
                height: Math.random() * 100 + 50,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        {/* Badge */}
        <div className="flex justify-center mb-8">
          <GlassBadge variant="primary" size="lg" className="animate-pulse">
            <Star className="h-4 w-4 mr-2 fill-current" />
            New v1.2.4 Released
          </GlassBadge>
        </div>

        {/* Headline */}
        <h1 className="text-6xl md:text-8xl font-bold text-white/90 mb-6 leading-tight">
          Beautiful
          <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Glassmorphism
          </span>
          Components
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-white/70 mb-8 max-w-3xl mx-auto leading-relaxed">
          Build stunning, accessible React applications with our comprehensive
          component library featuring glassmorphism effects and smooth animations.
        </p>

        {/* Features List */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {features.map((feature) => (
            <div key={feature} className="flex items-center gap-2">
              <Check className="h-5 w-5 text-green-400" />
              <span className="text-white/80 text-lg">{feature}</span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <GlassButton
            variant="primary"
            size="lg"
            className="text-lg px-8 py-4"
            rightIcon={<ArrowRight className="h-5 w-5" />}
          >
            Get Started Free
          </GlassButton>
          
          <GlassButton
            variant="ghost"
            size="lg"
            className="text-lg px-8 py-4"
            leftIcon={<Play className="h-5 w-5" />}
          >
            View Demo
          </GlassButton>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
          {stats.map((stat) => (
            <GlassCard key={stat.label} className="p-6 text-center">
              <div className="text-3xl font-bold text-white/90 mb-2">
                {stat.value}
              </div>
              <div className="text-white/60">{stat.label}</div>
            </GlassCard>
          ))}
        </div>

        {/* Code Preview */}
        <div className="mt-16 max-w-4xl mx-auto">
          <GlassCard className="p-8 text-left overflow-hidden">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-white/60 text-sm">App.tsx</span>
            </div>
            
            <pre className="text-sm text-white/80 font-mono overflow-x-auto">
              <code>{`import { GlassButton, GlassCard } from 'liquidify';

function App() {
  return (
    <GlassCard className="p-6">
      <h1>Beautiful Glassmorphism</h1>
      <GlassButton variant="primary">
        Click me
      </GlassButton>
    </GlassCard>
  );
}`}</code>
            </pre>
          </GlassCard>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full animate-bounce mt-2"></div>
        </div>
      </div>
    </section>
  );
}
```

---

## ⚡ Performance Optimization

### Lazy Loading Components

```tsx
// utils/lazyComponents.ts
import { lazy, Suspense } from 'react';
import { GlassLoading } from 'liquidify';

// Lazy load heavy components
export const LazyChart = lazy(() => 
  import('liquidify').then(module => ({ default: module.LineChart }))
);

export const LazyTable = lazy(() =>
  import('liquidify').then(module => ({ default: module.GlassTable }))
);

export const LazyPlayground = lazy(() =>
  import('liquidify').then(module => ({ default: module.GlassPlayground }))
);

// Wrapper component with loading fallback
export function LazyComponent({
  children,
  fallback
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  return (
    <Suspense
      fallback={
        fallback || (
          <div className="flex items-center justify-center p-8">
            <GlassLoading variant="spinner" size="lg" text="Loading component..." />
          </div>
        )
      }
    >
      {children}
    </Suspense>
  );
}

// Usage example
function MyDashboard() {
  return (
    <div>
      <LazyComponent>
        <LazyChart data={chartData} height={300} />
      </LazyComponent>
      
      <LazyComponent 
        fallback={<div className="h-64 bg-white/5 rounded-lg animate-pulse" />}
      >
        <LazyTable data={tableData} columns={columns} />
      </LazyComponent>
    </div>
  );
}
```

### Bundle Optimization

```tsx
// utils/bundleOptimization.ts
// Import only what you need from specific bundles

// ❌ Don't import everything
// import { GlassButton, GlassCard, GlassChart } from 'liquidify';

// ✅ Import from specific bundles
import { GlassButton, GlassCard } from 'liquidify/core';     // ~15KB
import { GlassInput, GlassSelect } from 'liquidify/forms';   // ~8KB
import { LineChart } from 'liquidify/advanced';             // ~12KB

// ✅ Or import individual components
import { GlassButton } from 'liquidify/button';             // ~3KB
import { GlassCard } from 'liquidify/card';                 // ~4KB

// Tree shaking configuration for bundlers
export const optimizedImports = {
  // For webpack
  resolve: {
    alias: {
      'liquidify': 'liquidify/core', // Default to core bundle
    }
  },
  
  // For vite
  optimizeDeps: {
    include: ['liquidify/core', 'liquidify/forms']
  }
};
```

### Virtualization Example

```tsx
// components/VirtualizedTable.tsx
import { useMemo } from 'react';
import { FixedSizeList as List } from 'react-window';
import { GlassCard, GlassInput } from 'liquidify/core';
import { Search } from 'lucide-react';

interface VirtualizedTableProps<T> {
  data: T[];
  itemHeight: number;
  height: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  searchable?: boolean;
  onSearch?: (query: string) => void;
}

export function VirtualizedTable<T>({
  data,
  itemHeight,
  height,
  renderItem,
  searchable = false,
  onSearch
}: VirtualizedTableProps<T>) {
  const itemCount = data.length;

  const ItemRenderer = ({ index, style }: { index: number; style: any }) => (
    <div style={style}>
      {renderItem(data[index], index)}
    </div>
  );

  return (
    <GlassCard className="overflow-hidden">
      {searchable && (
        <div className="p-4 border-b border-white/10">
          <GlassInput
            placeholder="Search..."
            leftIcon={<Search className="h-4 w-4" />}
            onChange={(e) => onSearch?.(e.target.value)}
          />
        </div>
      )}
      
      <List
        height={height}
        itemCount={itemCount}
        itemSize={itemHeight}
        width="100%"
      >
        {ItemRenderer}
      </List>
    </GlassCard>
  );
}

// Usage with 10,000+ items
function BigDataTable() {
  const bigData = useMemo(() => 
    Array.from({ length: 10000 }, (_, i) => ({
      id: i,
      name: `User ${i}`,
      email: `user${i}@example.com`
    }))
  , []);

  return (
    <VirtualizedTable
      data={bigData}
      height={600}
      itemHeight={60}
      searchable
      renderItem={(user, index) => (
        <div className="flex items-center justify-between p-4 border-b border-white/5">
          <div>
            <p className="font-medium text-white/90">{user.name}</p>
            <p className="text-sm text-white/60">{user.email}</p>
          </div>
          <span className="text-xs text-white/40">#{user.id}</span>
        </div>
      )}
    />
  );
}
```

---

This comprehensive usage guide covers real-world implementation patterns, from basic components to complex applications. Each example demonstrates best practices for performance, accessibility, and user experience using LiqUIdify components.

For more examples and live demos, visit our [Storybook documentation](https://liquidify-storybook.vercel.app).
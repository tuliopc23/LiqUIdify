# 💡 LiqUIdify Usage Examples

Real-world examples and patterns for using LiqUIdify components effectively.

## Basic Examples

### Simple Card with Button

```tsx
import { GlassCard, GlassButton } from 'liquidify/core';

function WelcomeCard() {
  return (
    <GlassCard className="p-6 max-w-md">
      <h2 className="text-xl font-semibold mb-4">Welcome!</h2>
      <p className="text-gray-600 mb-6">
        Get started with our amazing platform.
      </p>
      <GlassButton fullWidth>
        Get Started
      </GlassButton>
    </GlassCard>
  );
}
```

### Input with Validation

```tsx
import { useState } from 'react';
import { GlassInput, GlassButton } from 'liquidify/core';

function EmailForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = () => {
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    setError('');
    // Handle form submission
  };

  return (
    <div className="space-y-4">
      <GlassInput
        type="email"
        label="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={error}
        placeholder="Enter your email"
      />
      <GlassButton onClick={handleSubmit} fullWidth>
        Subscribe
      </GlassButton>
    </div>
  );
}
```

## Layout Patterns

### Responsive Grid Layout

```tsx
import { GlassGrid, GlassCard } from 'liquidify/layout';

function ProductGrid({ products }) {
  return (
    <GlassGrid 
      cols={{ base: 1, md: 2, lg: 3, xl: 4 }}
      gap={{ base: 4, md: 6 }}
      className="p-6"
    >
      {products.map((product) => (
        <GlassCard key={product.id} className="p-4" hover>
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <h3 className="font-semibold mb-2">{product.name}</h3>
          <p className="text-gray-600 text-sm mb-4">{product.description}</p>
          <div className="flex justify-between items-center">
            <span className="font-bold text-lg">${product.price}</span>
            <GlassButton size="sm">Add to Cart</GlassButton>
          </div>
        </GlassCard>
      ))}
    </GlassGrid>
  );
}
```

## Form Examples

### Contact Form

```tsx
import { useState } from 'react';
import { GlassCard, GlassInput, GlassButton } from 'liquidify/core';
import { GlassAlert } from 'liquidify/feedback';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Failed to send message');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <GlassCard className="max-w-2xl mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
      
      {success && (
        <GlassAlert
          variant="success"
          title="Message Sent!"
          description="We'll get back to you as soon as possible."
          className="mb-6"
        />
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <GlassInput
          label="Name"
          value={formData.name}
          onChange={handleChange('name')}
          required
        />
        
        <GlassInput
          label="Email"
          type="email"
          value={formData.email}
          onChange={handleChange('email')}
          required
        />
        
        <GlassInput
          label="Message"
          value={formData.message}
          onChange={handleChange('message')}
          required
        />
        
        <GlassButton
          type="submit"
          loading={isSubmitting}
          fullWidth
          size="lg"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </GlassButton>
      </form>
    </GlassCard>
  );
}
```

## Dashboard Components

### Stats Cards

```tsx
import { GlassCard } from 'liquidify/core';
import { GlassGrid } from 'liquidify/layout';

function StatCard({ title, value, change, trend, icon }) {
  return (
    <GlassCard className="p-6" hover>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
          <p className={`text-sm ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
            {trend === 'up' ? '↗' : '↘'} {change}
          </p>
        </div>
        <div className="text-3xl opacity-50">
          {icon}
        </div>
      </div>
    </GlassCard>
  );
}

function DashboardStats() {
  const stats = [
    { title: 'Total Revenue', value: '$45,231', change: '+20.1%', trend: 'up', icon: '💰' },
    { title: 'Active Users', value: '2,345', change: '+15.3%', trend: 'up', icon: '👥' },
    { title: 'Orders', value: '1,234', change: '-5.4%', trend: 'down', icon: '📦' },
    { title: 'Conversion Rate', value: '3.24%', change: '+8.2%', trend: 'up', icon: '📈' }
  ];

  return (
    <GlassGrid cols={{ base: 1, md: 2, lg: 4 }} gap={6}>
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </GlassGrid>
  );
}
```

## Navigation Patterns

### Header Navigation

```tsx
import { useState } from 'react';
import { GlassContainer } from 'liquidify/layout';
import { GlassButton } from 'liquidify/core';
import { useTheme } from 'liquidify';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/10 border-b border-white/20">
      <GlassContainer>
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg"></div>
            <span className="font-bold text-xl">LiqUIdify</span>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="hover:text-blue-500 transition-colors">Home</a>
            <a href="#" className="hover:text-blue-500 transition-colors">Components</a>
            <a href="#" className="hover:text-blue-500 transition-colors">Docs</a>
          </nav>

          <div className="flex items-center space-x-4">
            <GlassButton
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </GlassButton>
            
            <GlassButton size="sm">Get Started</GlassButton>
          </div>
        </div>
      </GlassContainer>
    </header>
  );
}
```

For more examples and detailed guides, visit our [documentation site](https://liquidify-docs.vercel.app).

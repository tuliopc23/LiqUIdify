import type { Meta, StoryObj } from '@storybook/react-vite';
import { GlassFeatureShowcase } from './glass-feature-showcase';
import {
  Zap,
  Shield,
  Palette,
  Smartphone,
  Layers,
  Code2,
  Gauge,
  Users,
  Globe,
  Rocket,
  Lock,
  Sparkles,
} from 'lucide-react';

const meta: Meta<typeof GlassFeatureShowcase> = {
  title: 'Glass/GlassFeatureShowcase',
  component: GlassFeatureShowcase,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A versatile feature showcase component with glass morphism effects, supporting grid, masonry, and stacked layouts with various visual styles.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    layout: {
      control: { type: 'select' },
      options: ['grid', 'masonry', 'carousel', 'stacked'],
      description: 'Layout style for displaying features',
    },
    columns: {
      control: { type: 'select' },
      options: [1, 2, 3, 4],
      description: 'Number of columns in grid layout',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'minimal', 'cards', 'floating'],
      description: 'Visual style variant',
    },
    enableMagnetic: {
      control: 'boolean',
      description: 'Enable magnetic hover effects',
    },
    enableParallax: {
      control: 'boolean',
      description: 'Enable parallax background animations',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic demo data
const basicFeatures = [
  {
    icon: <Zap className="w-6 h-6 text-blue-500" />,
    title: 'Lightning Fast',
    description:
      'Optimized performance with zero-cost abstractions and intelligent caching.',
    link: { label: 'Learn more', href: '#performance' },
  },
  {
    icon: <Shield className="w-6 h-6 text-green-500" />,
    title: 'Secure by Default',
    description:
      'Built-in security features with automatic sanitization and protection.',
    badge: 'Enterprise',
  },
  {
    icon: <Palette className="w-6 h-6 text-purple-500" />,
    title: 'Customizable',
    description:
      'Fully themeable with CSS variables and component composition.',
  },
];

// Grid Cards Variant
export const GridCards: Story = {
  args: {
    title: 'Why Choose Glass UI?',
    subtitle: 'Features',
    description:
      'Discover the powerful features that make Glass UI the perfect choice for modern applications.',
    features: basicFeatures,
    layout: 'grid',
    columns: 3,
    variant: 'cards',
    enableMagnetic: true,
    enableParallax: true,
  },
};

// Floating Variant with Images
const floatingFeatures = [
  {
    icon: <Smartphone className="w-8 h-8 text-blue-400" />,
    title: 'Mobile First',
    description:
      'Responsive design that works seamlessly across all devices and screen sizes.',
    image:
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=200&fit=crop',
    badge: 'Responsive',
    link: { label: 'View demo', onClick: () => console.log('Mobile demo') },
  },
  {
    icon: <Layers className="w-8 h-8 text-emerald-400" />,
    title: 'Component Library',
    description:
      '30+ pre-built components with glass morphism effects and smooth animations.',
    image:
      'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=200&fit=crop',
  },
];

export const FloatingWithImages: Story = {
  args: {
    features: floatingFeatures,
    layout: 'grid',
    columns: 2,
    variant: 'floating',
    enableParallax: true,
    enableMagnetic: false,
  },
};

// Minimal Stacked Layout
const minimalFeatures = [
  {
    icon: <Code2 className="w-6 h-6 text-gray-600" />,
    title: 'Developer Experience',
    description:
      'TypeScript support, comprehensive documentation, and excellent IDE integration.',
  },
  {
    icon: <Gauge className="w-6 h-6 text-gray-600" />,
    title: 'Performance Monitoring',
    description:
      'Built-in analytics and performance tracking for production applications.',
  },
  {
    icon: <Users className="w-6 h-6 text-gray-600" />,
    title: 'Community Driven',
    description:
      'Active community support with regular updates and feature requests.',
  },
  {
    icon: <Globe className="w-6 h-6 text-gray-600" />,
    title: 'Global CDN',
    description:
      'Fast delivery worldwide through our optimized content delivery network.',
  },
];

export const MinimalStacked: Story = {
  args: {
    title: 'Technical Excellence',
    features: minimalFeatures,
    layout: 'stacked',
    variant: 'minimal',
    enableParallax: false,
  },
};

// Single Column Showcase
const singleColumnFeatures = [
  {
    icon: <Rocket className="w-8 h-8 text-orange-500" />,
    title: 'Launch Ready',
    description:
      'Production-ready components with comprehensive testing and documentation. Build faster with pre-configured themes and accessibility features.',
    link: { label: 'Get started', href: '#getting-started' },
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=300&fit=crop',
  },
  {
    icon: <Lock className="w-8 h-8 text-red-500" />,
    title: 'Enterprise Security',
    description:
      'Bank-grade security with SOC 2 compliance, end-to-end encryption, and advanced threat protection. Trusted by Fortune 500 companies.',
    badge: 'SOC 2',
    image:
      'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=300&fit=crop',
  },
];

export const SingleColumn: Story = {
  args: {
    title: 'Enterprise Solutions',
    subtitle: 'Trusted by Industry Leaders',
    description:
      'Scalable solutions designed for enterprise-grade applications with the highest standards of security and performance.',
    features: singleColumnFeatures,
    layout: 'grid',
    columns: 1,
    variant: 'floating',
    enableMagnetic: true,
    enableParallax: true,
  },
};

// Four Column Grid
const fourColumnFeatures = [
  {
    icon: <Zap className="w-6 h-6 text-yellow-500" />,
    title: 'Speed',
    description: 'Lightning-fast rendering and optimized bundle size.',
  },
  {
    icon: <Shield className="w-6 h-6 text-blue-500" />,
    title: 'Security',
    description: 'Built with security best practices and regular audits.',
  },
  {
    icon: <Sparkles className="w-6 h-6 text-pink-500" />,
    title: 'Design',
    description: 'Beautiful glass morphism effects and smooth animations.',
  },
  {
    icon: <Code2 className="w-6 h-6 text-green-500" />,
    title: 'DX',
    description: 'Excellent developer experience with TypeScript support.',
  },
];

export const FourColumns: Story = {
  args: {
    features: fourColumnFeatures,
    layout: 'grid',
    columns: 4,
    variant: 'cards',
    enableMagnetic: false,
    enableParallax: true,
  },
};

// Default Variant
export const Default: Story = {
  args: {
    title: 'Default Showcase',
    features: basicFeatures,
    layout: 'grid',
    columns: 3,
    variant: 'default',
    enableMagnetic: false,
    enableParallax: true,
  },
};

// Without Header
export const WithoutHeader: Story = {
  args: {
    features: basicFeatures,
    layout: 'grid',
    columns: 3,
    variant: 'cards',
  },
};

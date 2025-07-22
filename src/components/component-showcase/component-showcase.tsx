import React, { useState, useCallback } from 'react';
import { GlassButton } from '../glass-button-refactored';
import { GlassInput } from '../glass-input';
import { GlassTextarea } from '../glass-textarea';
import { GlassSelect } from '../glass-select';
import { GlassSlider } from '../glass-slider';
import { GlassProgress } from '../glass-progress';
import { GlassLoading } from '../glass-loading';
import { GlassTooltip } from '../glass-tooltip';
import { GlassPopover } from '../glass-popover';
import { GlassDropdown } from '../glass-dropdown';
import { GlassAvatar } from '../glass-avatar';
import { useToast } from '../glass-toast';
import {
  GlassCard,
  GlassCardContent,
  GlassCardDescription,
  GlassCardFooter,
  GlassCardHeader,
  GlassCardTitle,
} from '../glass-card-refactored';
import { GlassCheckbox } from '../glass-checkbox';
import { GlassSwitch } from '../glass-switch';
import { GlassTabs } from '../glass-tabs';
import { GlassBadge } from '../glass-badge';
import { GlassModal } from '../glass-modal';
import { GlassTable } from '../glass-table';
import {
  ChevronDown,
  Download,
  Edit,
  Github,
  Heart,
  Keyboard,
  Layers,
  Mail,
  MapPin,
  MousePointer,
  Phone,
  Settings,
  Share,
  Trash,
  TrendingUp,
  User,
  Users,
} from 'lucide-react';

export interface ComponentShowcaseProps {
  activeSection: string;
}

export const ComponentShowcase = React.memo(function ComponentShowcase({ activeSection }: ComponentShowcaseProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Memoized event handlers
  const handleOpenModal = useCallback(() => setIsModalOpen(true), []);
  const handleCloseModal = useCallback(() => setIsModalOpen(false), []);

  const tableData = [
    {
      component: 'Button',
      category: 'Atom',
      status: 'Ready',
      usage: '847 times',
      icon: <MousePointer className="h-4 w-4 text-primary" />,
    },
    {
      component: 'Input',
      category: 'Atom',
      status: 'Ready',
      usage: '623 times',
      icon: <Keyboard className="h-4 w-4 text-primary" />,
    },
    {
      component: 'Modal',
      category: 'Organism',
      status: 'In Progress',
      usage: '234 times',
      icon: <Layers className="h-4 w-4 text-primary" />,
    },
  ];

  const tableColumns = [
    {
      key: 'component' as const,
      header: 'Component',
      render: (value: any, item: any) => (
        <div className="flex items-center">
          <div className="w-8 h-8 glass-effect rounded-lg flex items-center justify-center mr-3">
            {item.icon}
          </div>
          <span className="font-medium text-primary">{value}</span>
        </div>
      ),
    },
    {
      key: 'category' as const,
      header: 'Category',
      render: (value: any) => <span className="text-secondary">{value}</span>,
    },
    {
      key: 'status' as const,
      header: 'Status',
      render: (value: any) => (
        <GlassBadge variant={ 'Ready' === value ? 'success' : 'warning'}>
          {value}
        </GlassBadge>
      ),
    },
    {
      key: 'usage' as const,
      header: 'Usage',
      render: (value: any) => <span className="text-secondary">{value}</span>,
    },
  ];

  const tabsData = [
    {
      id: 'components',
      label: 'Components',
      content: (
        <div>
          <h4 className="font-semibold mb-3 text-primary">Component Library</h4>
          <p className="text-secondary mb-4">
            Explore our comprehensive collection of liquid glass components with
            Apple-inspired design. Each component is built with accessibility
            and performance in mind.
          </p>
          <div className="flex flex-wrap gap-2">
            <GlassBadge>Buttons</GlassBadge>
            <GlassBadge>Inputs</GlassBadge>
            <GlassBadge>Cards</GlassBadge>
            <GlassBadge>Modals</GlassBadge>
          </div>
        </div>
      ),
    },
    {
      id: 'documentation',
      label: 'Documentation',
      content: (
        <div>
          <h4 className="font-semibold mb-3 text-primary">Documentation</h4>
          <p className="text-secondary">
            Comprehensive guides and API references for all components in the
            library.
          </p>
        </div>
      ),
    },
    {
      id: 'examples',
      label: 'Examples',
      content: (
        <div>
          <h4 className="font-semibold mb-3 text-primary">Examples</h4>
          <p className="text-secondary">
            Real-world examples and use cases for implementing the components.
          </p>
        </div>
      ),
    },
  ];

  const renderSection = () => {
    switch (activeSection) {
      case 'introduction':
      default:
        return (
          <div>
            {/* Hero Section */}
            <div className="mb-12">
              <div className="glass-effect rounded-2xl p-8 mb-8">
                <h1 className="text-4xl font-bold mb-4 text-primary">
                  Liquid Glass Component Library
                </h1>
                <p className="text-xl mb-6 text-secondary">
                  A complete React component library with Apple-inspired design
                  and liquid glass aesthetic. Features comprehensive light/dark
                  mode support, smooth animations, and SwiftUI-like
                  micro-interactions.
                </p>
                <div className="flex flex-wrap gap-4">
                  <GlassButton variant="primary" leftIcon={<Download />}>
                    Get Started
                  </GlassButton>
                  <GlassButton variant="secondary" leftIcon={<Github />}>
                    View on GitHub
                  </GlassButton>
                </div>
              </div>
            </div>
          </div>
        );

      case 'button':
        return (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-primary">
              Button Components
            </h2>

            <div className="glass-effect rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4 text-primary">
                Button Variants
              </h3>
              <div className="component-preview rounded-lg p-6 mb-4">
                <div className="flex flex-wrap gap-4 items-center">
                  <GlassButton variant="primary">Primary</GlassButton>
                  <GlassButton variant="secondary">Secondary</GlassButton>
                  <GlassButton variant="tertiary">Tertiary</GlassButton>
                  <GlassButton variant="ghost">Ghost</GlassButton>
                  <GlassButton variant="primary" rightIcon={<Heart />}>
                    With Icon
                  </GlassButton>
                </div>
              </div>

              <div className="code-block rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <code className="text-primary">
                  {`<GlassButton variant="primary">Primary</GlassButton>
<GlassButton variant="secondary">Secondary</GlassButton>
<GlassButton variant="tertiary">Tertiary</GlassButton>
<GlassButton variant="ghost">Ghost</GlassButton>`}
                </code>
              </div>
            </div>

            <div className="glass-effect rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4 text-primary">
                Button Sizes
              </h3>
              <div className="component-preview rounded-lg p-6 mb-4">
                <div className="flex flex-wrap gap-4 items-center">
                  <GlassButton variant="primary" size="sm">
                    Small
                  </GlassButton>
                  <GlassButton variant="primary" size="md">
                    Medium
                  </GlassButton>
                  <GlassButton variant="primary" size="lg">
                    Large
                  </GlassButton>
                </div>
              </div>
            </div>
          </section>
        );

      case 'input':
        return (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-primary">
              Input Components
            </h2>

            <div className="glass-effect rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4 text-primary">
                Text Inputs
              </h3>
              <div className="component-preview rounded-lg p-6 mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="default-input" className="block text-sm font-medium mb-2 text-primary">
                      Default Input
                    </label>
                    <GlassInput id="default-input" placeholder="Enter text..." />
                  </div>
                  <div>
                    <label htmlFor="search-input" className="block text-sm font-medium mb-2 text-primary">
                      Search Input
                    </label>
                    <GlassInput id="search-input" variant="search" placeholder="Search..." />
                  </div>
                  <div>
                    <label htmlFor="password-input" className="block text-sm font-medium mb-2 text-primary">
                      Password Input
                    </label>
                    <GlassInput
                      id="password-input"
                      variant="password"
                      placeholder="Enter password..."
                    />
                  </div>
                  <div>
                    <label htmlFor="textarea" className="block text-sm font-medium mb-2 text-primary">
                      Textarea
                    </label>
                    <textarea
                      id="textarea"
                      placeholder="Enter message..."
                      rows={3}
                      className="w-full px-4 py-3 glass-effect rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-primary resize-none text-primary bg-glass placeholder:text-secondary"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        );

      case 'checkbox':
        return (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-primary">
              Form Controls
            </h2>

            <div className="glass-effect rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4 text-primary">
                Checkboxes & Switches
              </h3>
              <div className="component-preview rounded-lg p-6 mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="font-medium text-primary">Checkboxes</h4>
                    <GlassCheckbox label="Default checkbox" />
                    <GlassCheckbox label="Checked checkbox" defaultChecked />
                    <GlassCheckbox label="Disabled checkbox" disabled />
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium text-primary">Switches</h4>
                    <GlassSwitch label="Toggle switch" />
                    <GlassSwitch label="Active switch" checked />
                  </div>
                </div>
              </div>
            </div>
          </section>
        );

      case 'card':
        return (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-primary">
              Card Components
            </h2>

            <div className="glass-effect rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4 text-primary">
                Card Variants
              </h3>
              <div className="component-preview rounded-lg p-6 mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <GlassCard>
                    <GlassCardHeader>
                      <GlassCardTitle>Basic Card</GlassCardTitle>
                      <GlassCardDescription>
                        A simple card with glass morphism effect and subtle
                        hover animations.
                      </GlassCardDescription>
                    </GlassCardHeader>
                    <GlassCardFooter>
                      <GlassButton size="sm">
                        Learn More
                      </GlassButton>
                    </GlassCardFooter>
                  </GlassCard>

                  <GlassCard>
                    <GlassCardHeader>
                      <img
                        src="https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=400&h=200&fit=crop&crop=face"
                        alt="Professional headshot"
                        className="w-full h-32 object-cover rounded-lg mb-4 -mt-6 -mx-6"
                      />
                      <GlassCardTitle>Image Card</GlassCardTitle>
                      <GlassCardDescription>
                        Card with image header and glass effect content area.
                      </GlassCardDescription>
                    </GlassCardHeader>
                  </GlassCard>

                  <GlassCard>
                    <GlassCardHeader>
                      <div className="flex items-center justify-between mb-4">
                        <GlassCardTitle>Total Users</GlassCardTitle>
                        <Users className="h-8 w-8 text-primary" />
                      </div>
                      <div className="text-3xl font-bold mb-2 text-primary">
                        12,847
                      </div>
                      <div className="text-sm text-secondary">
                        <TrendingUp className="inline h-4 w-4 text-green-500 mr-1" />
                        <span className="text-green-500">+12%</span> from last
                        month
                      </div>
                    </GlassCardHeader>
                  </GlassCard>
                </div>
              </div>
            </div>
          </section>
        );

      case 'tabs':
        return (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-primary">
              Tab Components
            </h2>

            <div className="glass-effect rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4 text-primary">
                Interactive Tabs
              </h3>
              <div className="component-preview rounded-lg p-6">
                <GlassTabs tabs={tabsData} defaultTab="components" />
              </div>
            </div>
          </section>
        );

      case 'modal':
        return (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-primary">
              Modal Components
            </h2>

            <div className="glass-effect rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4 text-primary">
                Modal Example
              </h3>
              <div className="component-preview rounded-lg p-6 mb-4">
                <GlassButton onClick={handleOpenModal}>
                  Open Modal
                </GlassButton>
              </div>
            </div>

            <GlassModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              title="Modal Example"
            >
              <p className="mb-6 text-secondary">
                This is an example of a modal component with glass morphism
                effect and backdrop blur. The modal includes smooth animations
                and proper accessibility features.
              </p>
              <div className="flex space-x-3">
                <GlassButton
                  variant="primary"
                  className="flex-1"
                  onClick={handleCloseModal}
                >
                  Confirm
                </GlassButton>
                <GlassButton
                  variant="secondary"
                  className="flex-1"
                  onClick={handleCloseModal}
                >
                  Cancel
                </GlassButton>
              </div>
            </GlassModal>
          </section>
        );

      case 'data-table':
        return (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-primary">Data Table</h2>

            <div className="glass-effect rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4 text-primary">
                Interactive Data Table
              </h3>
              <div className="component-preview rounded-lg p-6">
                <GlassTable data={tableData} columns={tableColumns} />
              </div>
            </div>
          </section>
        );

      case 'textarea':
        return (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-primary">
              Textarea Component
            </h2>
            <div className="glass-effect rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4 text-primary">
                Textarea Variants
              </h3>
              <div className="component-preview rounded-lg p-6 mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="default-textarea" className="block text-sm font-medium mb-2 text-primary">
                      Default Textarea
                    </label>
                    <GlassTextarea id="default-textarea" placeholder="Enter your message..." />
                  </div>
                  <div>
                    <label htmlFor="minimal-variant" className="block text-sm font-medium mb-2 text-primary">
                      Minimal Variant
                    </label>
                    <GlassTextarea
                      id="minimal-variant"
                      variant="minimal"
                      placeholder="Minimal style..."
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        );

      case 'select':
        return (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-primary">
              Select Component
            </h2>
            <div className="glass-effect rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4 text-primary">
                Dropdown Selection
              </h3>
              <div className="component-preview rounded-lg p-6 mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="choose-framework" className="block text-sm font-medium mb-2 text-primary">
                      Choose Framework
                    </label>
                    <GlassSelect
                      options={[
                        { value: 'react', label: 'React' },
                        { value: 'vue', label: 'Vue.js' },
                        { value: 'angular', label: 'Angular' },
                        { value: 'svelte', label: 'Svelte' },
                      ]}
                      placeholder="Select framework..."
                    />
                  </div>
                  <div>
                    <label htmlFor="project-type" className="block text-sm font-medium mb-2 text-primary">
                      Project Type
                    </label>
                    <GlassSelect
                      options={[
                        { value: 'spa', label: 'Single Page App' },
                        { value: 'ssr', label: 'Server Side Rendered' },
                        { value: 'static', label: 'Static Site' },
                        {
                          value: 'mobile',
                          label: 'Mobile App',
                          disabled: true,
                        },
                      ]}
                      placeholder="Select type..."
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        );

      case 'slider':
        return (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-primary">
              Slider Component
            </h2>
            <div className="glass-effect rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4 text-primary">
                Range Controls
              </h3>
              <div className="component-preview rounded-lg p-6 mb-4">
                <div className="space-y-8">
                  <div>
                    <GlassSlider min={0} max={100} value={50} showValue />
                  </div>
                  <div>
                    <GlassSlider
                      min={0}
                      max={10}
                      step={0.5}
                      value={2.5}
                      variant="minimal"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        );

      case 'progress':
        return (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-primary">
              Progress Component
            </h2>
            <div className="glass-effect rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4 text-primary">
                Progress Indicators
              </h3>
              <div className="component-preview rounded-lg p-6 mb-4">
                <div className="space-y-6">
                  <GlassProgress value={75} showValue color="blue" />
                  <GlassProgress value={60} variant="gradient" color="green" />
                  <GlassProgress
                    value={40}
                    size="lg"
                    color="purple"
                    showValue
                  />
                </div>
              </div>
            </div>
          </section>
        );

      case 'loading':
        return (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-primary">
              Loading Component
            </h2>
            <div className="glass-effect rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4 text-primary">
                Loading States
              </h3>
              <div className="component-preview rounded-lg p-6 mb-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
                  <GlassLoading variant="spinner" size="md" text="Loading..." />
                  <GlassLoading variant="dots" size="lg" />
                  <GlassLoading variant="pulse" size="md" />
                  <GlassLoading variant="bars" size="sm" />
                </div>
              </div>
            </div>
          </section>
        );

      case 'avatar':
        return (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-primary">
              Avatar Component
            </h2>
            <div className="glass-effect rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4 text-primary">
                User Avatars
              </h3>
              <div className="component-preview rounded-lg p-6 mb-4">
                <div className="flex flex-wrap gap-6 items-center">
                  <GlassAvatar size="sm" fallback="JD" />
                  <GlassAvatar
                    size="md"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                  />
                  <GlassAvatar
                    size="lg"
                    fallback="AS"
                    status="online"
                    showBorder
                  />
                  <GlassAvatar
                    size="xl"
                    variant="rounded"
                    fallback="MR"
                    status="away"
                  />
                </div>
              </div>
            </div>
          </section>
        );

      case 'dropdown':
        return (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-primary">
              Dropdown Component
            </h2>
            <div className="glass-effect rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4 text-primary">
                Action Menus
              </h3>
              <div className="component-preview rounded-lg p-6 mb-4">
                <div className="flex gap-4">
                  <GlassDropdown
                    trigger={
                      <GlassButton
                        variant="secondary"
                        rightIcon={<ChevronDown className="h-4 w-4" />}
                      >
                        Options
                      </GlassButton>
                    }
                    items={[
                      {
                        label: 'Edit',
                        value: 'edit',
                        icon: <Edit className="h-4 w-4" />,
                      },
                      {
                        label: 'Share',
                        value: 'share',
                        icon: <Share className="h-4 w-4" />,
                      },
                      { label: '', value: 'separator', separator: true },
                      {
                        label: 'Delete',
                        value: 'delete',
                        icon: <Trash className="h-4 w-4" />,
                      },
                    ]}
                  />

                  <GlassDropdown
                    trigger={<GlassAvatar size="md" fallback="JD" />}
                    items={[
                      {
                        label: 'Profile',
                        value: 'profile',
                        icon: <User className="h-4 w-4" />,
                      },
                      {
                        label: 'Settings',
                        value: 'settings',
                        icon: <Settings className="h-4 w-4" />,
                      },
                      { label: '', value: 'separator', separator: true },
                      { label: 'Logout', value: 'logout' },
                    ]}
                  />
                </div>
              </div>
            </div>
          </section>
        );

      case 'tooltip':
        return (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-primary">
              Tooltip Component
            </h2>
            <div className="glass-effect rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4 text-primary">
                Hover Information
              </h3>
              <div className="component-preview rounded-lg p-6 mb-4">
                <div className="flex gap-6">
                  <GlassTooltip
                    content="This is a helpful tooltip"
                    position="top"
                  >
                    <GlassButton variant="secondary">
                      Hover me (Top)
                    </GlassButton>
                  </GlassTooltip>

                  <GlassTooltip
                    content="More detailed information can go here with multiple lines of text"
                    position="bottom"
                  >
                    <GlassButton variant="secondary">
                      Hover me (Bottom)
                    </GlassButton>
                  </GlassTooltip>

                  <GlassTooltip content="Left tooltip" position="left">
                    <GlassButton variant="secondary">Left</GlassButton>
                  </GlassTooltip>
                </div>
              </div>
            </div>
          </section>
        );

      case 'popover':
        return (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-primary">
              Popover Component
            </h2>
            <div className="glass-effect rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4 text-primary">
                Interactive Overlays
              </h3>
              <div className="component-preview rounded-lg p-6 mb-4">
                <div className="flex gap-4">
                  <GlassPopover
                    trigger={
                      <GlassButton variant="secondary">User Info</GlassButton>
                    }
                    content={
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <GlassAvatar size="md" fallback="JD" />
                          <div>
                            <h4 className="font-medium text-primary">
                              John Doe
                            </h4>
                            <p className="text-sm text-secondary">
                              Software Engineer
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <GlassButton
                            size="sm"
                            variant="primary"
                          >
                            Follow
                          </GlassButton>
                          <GlassButton
                            size="sm"
                            variant="secondary"
                          >
                            Message
                          </GlassButton>
                        </div>
                      </div>
                    }
                  />

                  <GlassPopover
                    trigger={
                      <GlassButton variant="secondary">Contact</GlassButton>
                    }
                    content={
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-primary" />
                          <span className="text-sm">john@example.com</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-primary" />
                          <span className="text-sm">+1 (555) 123-4567</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-primary" />
                          <span className="text-sm">San Francisco, CA</span>
                        </div>
                      </div>
                    }
                    position="bottom"
                  />
                </div>
              </div>
            </div>
          </section>
        );

      case 'toast': {
        const ToastDemo = React.memo(() => {
          const { addToast } = useToast();

          const handleShowSuccess = useCallback(() => {
            addToast({
              type: 'success',
              title: 'Success!',
              description: 'Your action completed successfully.',
            });
          }, [addToast]);

          const handleShowError = useCallback(() => {
            addToast({
              type: 'error',
              title: 'Error',
              description: 'Something went wrong. Please try again.',
            });
          }, [addToast]);

          return (
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-primary">
                Toast Component
              </h2>
              <div className="glass-effect rounded-xl p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4 text-primary">
                  Notifications
                </h3>
                <div className="component-preview rounded-lg p-6 mb-4">
                  <div className="flex flex-wrap gap-4">
                    <GlassButton
                      variant="primary"
                      onClick={handleShowSuccess}
                    >
                      Show Success
                    </GlassButton>

                    <GlassButton
                      variant="secondary"
                      onClick={handleShowError}
                      }
                    >
                      Show Error
                    </GlassButton>

                    <GlassButton
                      variant="tertiary"
                      onClick={() =>
                        addToast({
                          type: 'warning',
                          description: 'This is a warning message with action.',
                          action: {
                            label: 'Undo',
                            onClick: () => console.log('Undo clicked'),
                          },
                        })
                      }
                    >
                      Show Warning
                    </GlassButton>

                    <GlassButton
                      variant="ghost"
                      onClick={() =>
                        addToast({
                          type: 'info',
                          description:
                            'Here\'s some helpful information for you.',
                        })
                      }
                    >
                      Show Info
                    </GlassButton>
                  </div>
                </div>
              </div>
            </section>
          );
        });

        return <ToastDemo />;
      }

      case 'form-examples':
        return (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-primary">
              Complete Form Examples
            </h2>
            <div className="glass-effect rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4 text-primary">
                User Registration Form
              </h3>
              <div className="component-preview rounded-lg p-6 mb-4">
                <form className="space-y-6 max-w-2xl">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="first-name" className="block text-sm font-medium mb-2 text-primary">
                        First Name
                      </label>
                      <GlassInput id="first-name" placeholder="Enter first name..." />
                    </div>
                    <div>
                      <label htmlFor="last-name" className="block text-sm font-medium mb-2 text-primary">
                        Last Name
                      </label>
                      <GlassInput id="last-name" placeholder="Enter last name..." />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2 text-primary">
                      Email
                    </label>
                    <GlassInput id="email" type="email" placeholder="your@email.com" />
                  </div>

                  <div>
                    <label htmlFor="role" className="block text-sm font-medium mb-2 text-primary">
                      Role
                    </label>
                    <GlassSelect
                      options={[
                        { value: 'developer', label: 'Developer' },
                        { value: 'designer', label: 'Designer' },
                        { value: 'manager', label: 'Project Manager' },
                        { value: 'other', label: 'Other' },
                      ]}
                      placeholder="Select your role..."
                    />
                  </div>

                  <div>
                    <label htmlFor="experience-level" className="block text-sm font-medium mb-2 text-primary">
                      Experience Level
                    </label>
                    <GlassSlider min={0} max={10} value={5} showValue />
                  </div>

                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium mb-2 text-primary">
                      Bio
                    </label>
                    <GlassTextarea id="bio" placeholder="Tell us about yourself..." />
                  </div>

                  <div className="flex items-center space-x-6">
                    <GlassCheckbox label="Subscribe to newsletter" />
                    <GlassSwitch label="Make profile public" />
                  </div>

                  <div className="flex gap-4">
                    <GlassButton
                      variant="primary"
                      size="lg"
                    >
                      Create Account
                    </GlassButton>
                    <GlassButton
                      variant="secondary"
                      size="lg"
                    >
                      Cancel
                    </GlassButton>
                  </div>
                </form>
              </div>
            </div>
          </section>
        );

      case 'dashboard':
        return (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-primary">
              Dashboard Example
            </h2>
            <div className="glass-effect rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4 text-primary">
                Analytics Dashboard
              </h3>
              <div className="component-preview rounded-lg p-6 mb-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <GlassCard>
                    <GlassCardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-secondary">Total Users</p>
                          <p className="text-2xl font-bold text-primary">
                            12,847
                          </p>
                        </div>
                        <Users className="h-8 w-8 text-blue-500" />
                      </div>
                      <GlassProgress value={85} color="blue" className="mt-4" />
                    </GlassCardContent>
                  </GlassCard>

                  <GlassCard>
                    <GlassCardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-secondary">Revenue</p>
                          <p className="text-2xl font-bold text-primary">
                            $54,321
                          </p>
                        </div>
                        <TrendingUp className="h-8 w-8 text-green-500" />
                      </div>
                      <GlassProgress
                        value={72}
                        color="green"
                        className="mt-4"
                      />
                    </GlassCardContent>
                  </GlassCard>

                  <GlassCard>
                    <GlassCardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-secondary">Projects</p>
                          <p className="text-2xl font-bold text-primary">23</p>
                        </div>
                        <Layers className="h-8 w-8 text-purple-500" />
                      </div>
                      <GlassProgress
                        value={60}
                        color="purple"
                        className="mt-4"
                      />
                    </GlassCardContent>
                  </GlassCard>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-primary">
                    Recent Activity
                  </h4>
                  <GlassDropdown
                    trigger={
                      <GlassButton
                        variant="secondary"
                        rightIcon={<ChevronDown className="h-4 w-4" />}
                      >
                        Filter
                      </GlassButton>
                    }
                    items={[
                      { label: 'All Time', value: 'all' },
                      { label: 'Last Week', value: 'week' },
                      { label: 'Last Month', value: 'month' },
                    ]}
                  />
                </div>

                <GlassTable
                  data={[
                    {
                      user: 'John Doe',
                      action: 'Created project',
                      time: '2 hours ago',
                    },
                    {
                      user: 'Jane Smith',
                      action: 'Updated profile',
                      time: '4 hours ago',
                    },
                    {
                      user: 'Mike Johnson',
                      action: 'Completed task',
                      time: '1 day ago',
                    },
                  ]}
                  columns={[
                    { key: 'user', header: 'User' },
                    { key: 'action', header: 'Action' },
                    { key: 'time', header: 'Time' },
                  ]}
                />
              </div>
            </div>
          </section>
        );
    }
  };

  return <div>{renderSection()}</div>;
});

import type { Meta, StoryObj } from '@storybook/react-vite';
import { 
  GlassCard, 
  GlassCardHeader, 
  GlassCardTitle, 
  GlassCardDescription, 
  GlassCardContent, 
  GlassCardFooter 
} from './glass-card';
import { GlassButton } from '../glass-button/glass-button';

const meta: Meta<typeof GlassCard> = {
  title: 'Glass/GlassCard',
  component: GlassCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'elevated', 'outlined', 'pressed'],
    },
    padding: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg', 'xl'],
    },
    hover: {
      control: 'boolean',
    },
    bordered: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'default',
    children: (
      <>
        <GlassCardHeader>
          <GlassCardTitle>Card Title</GlassCardTitle>
          <GlassCardDescription>Card description goes here</GlassCardDescription>
        </GlassCardHeader>
        <GlassCardContent>
          <p>This is the main content of the card. It can contain any elements.</p>
        </GlassCardContent>
        <GlassCardFooter>
          <GlassButton size="sm">Action</GlassButton>
        </GlassCardFooter>
      </>
    ),
  },
};

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    children: (
      <>
        <GlassCardHeader>
          <GlassCardTitle>Elevated Card</GlassCardTitle>
          <GlassCardDescription>This card has more elevation</GlassCardDescription>
        </GlassCardHeader>
        <GlassCardContent>
          <p>Elevated cards stand out more from the background.</p>
        </GlassCardContent>
      </>
    ),
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: (
      <>
        <GlassCardHeader>
          <GlassCardTitle>Outlined Card</GlassCardTitle>
          <GlassCardDescription>This card has a prominent border</GlassCardDescription>
        </GlassCardHeader>
        <GlassCardContent>
          <p>Outlined cards use borders for definition instead of background blur.</p>
        </GlassCardContent>
      </>
    ),
  },
};

export const Pressed: Story = {
  args: {
    variant: 'pressed',
    children: (
      <>
        <GlassCardHeader>
          <GlassCardTitle>Pressed Card</GlassCardTitle>
          <GlassCardDescription>This card appears pressed or inset</GlassCardDescription>
        </GlassCardHeader>
        <GlassCardContent>
          <p>Pressed cards have an inset shadow effect.</p>
        </GlassCardContent>
      </>
    ),
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-full max-w-2xl">
      <GlassCard padding="sm">
        <GlassCardContent>Small padding card</GlassCardContent>
      </GlassCard>
      <GlassCard padding="md">
        <GlassCardContent>Medium padding card (default)</GlassCardContent>
      </GlassCard>
      <GlassCard padding="lg">
        <GlassCardContent>Large padding card</GlassCardContent>
      </GlassCard>
      <GlassCard padding="xl">
        <GlassCardContent>Extra large padding card</GlassCardContent>
      </GlassCard>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <GlassCard hover={true}>
        <GlassCardContent>Hoverable card</GlassCardContent>
      </GlassCard>
      <GlassCard hover={false}>
        <GlassCardContent>Non-hoverable card</GlassCardContent>
      </GlassCard>
      <GlassCard bordered={true}>
        <GlassCardContent>Card with border</GlassCardContent>
      </GlassCard>
      <GlassCard bordered={false}>
        <GlassCardContent>Card without border</GlassCardContent>
      </GlassCard>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 w-full max-w-4xl">
      <GlassCard variant="default">
        <GlassCardHeader>
          <GlassCardTitle>Default</GlassCardTitle>
        </GlassCardHeader>
        <GlassCardContent>Default glass card variant</GlassCardContent>
      </GlassCard>
      <GlassCard variant="elevated">
        <GlassCardHeader>
          <GlassCardTitle>Elevated</GlassCardTitle>
        </GlassCardHeader>
        <GlassCardContent>Elevated glass card variant</GlassCardContent>
      </GlassCard>
      <GlassCard variant="outlined">
        <GlassCardHeader>
          <GlassCardTitle>Outlined</GlassCardTitle>
        </GlassCardHeader>
        <GlassCardContent>Outlined glass card variant</GlassCardContent>
      </GlassCard>
      <GlassCard variant="pressed">
        <GlassCardHeader>
          <GlassCardTitle>Pressed</GlassCardTitle>
        </GlassCardHeader>
        <GlassCardContent>Pressed glass card variant</GlassCardContent>
      </GlassCard>
    </div>
  ),
};

// Comprehensive variant + padding permutations
export const AllPermutations: Story = {
  render: () => (
    <div className="space-y-8">
      {['default', 'elevated', 'outlined', 'pressed'].map((variant) => (
        <div key={variant} className="space-y-4">
          <h3 className="text-lg font-medium capitalize">{variant} Variant</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {['none', 'sm', 'md', 'lg', 'xl'].map((padding) => (
              <GlassCard
                key={`${variant}-${padding}`}
                variant={variant as any}
                padding={padding as any}
              >
                <GlassCardContent>
                  <div className="text-sm">
                    <strong>{variant}</strong><br />
                    padding: {padding}
                  </div>
                </GlassCardContent>
              </GlassCard>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

// Theme comparison with decorators
export const ThemeComparison: Story = {
  decorators: [
    (Story) => (
      <div className="grid grid-cols-2 gap-8">
        <div data-theme="light" className="p-6 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg">
          <h3 className="mb-4 text-sm font-medium">Light Theme</h3>
          <Story />
        </div>
        <div data-theme="dark" className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg">
          <h3 className="mb-4 text-sm font-medium text-white">Dark Theme</h3>
          <Story />
        </div>
      </div>
    ),
  ],
  render: () => (
    <div className="space-y-4 max-w-md">
      <GlassCard variant="default">
        <GlassCardHeader>
          <GlassCardTitle>Default Card</GlassCardTitle>
          <GlassCardDescription>Shows glass effect in both themes</GlassCardDescription>
        </GlassCardHeader>
        <GlassCardContent>
          <p>This card demonstrates how the glass effect adapts to different themes.</p>
        </GlassCardContent>
        <GlassCardFooter>
          <GlassButton size="sm" variant="primary">Action</GlassButton>
        </GlassCardFooter>
      </GlassCard>
      
      <GlassCard variant="elevated">
        <GlassCardHeader>
          <GlassCardTitle>Elevated Card</GlassCardTitle>
        </GlassCardHeader>
        <GlassCardContent>
          <p>More prominent in both light and dark themes.</p>
        </GlassCardContent>
      </GlassCard>
    </div>
  ),
};

// Interactive showcase
export const InteractiveShowcase: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
      <GlassCard hover={true} className="cursor-pointer transition-all duration-300">
        <GlassCardHeader>
          <GlassCardTitle>Interactive Card</GlassCardTitle>
          <GlassCardDescription>Hover to see the effect</GlassCardDescription>
        </GlassCardHeader>
        <GlassCardContent>
          <p>This card responds to mouse interactions with smooth transitions.</p>
        </GlassCardContent>
        <GlassCardFooter>
          <GlassButton variant="ghost" size="sm">Learn More</GlassButton>
        </GlassCardFooter>
      </GlassCard>

      <GlassCard variant="outlined" bordered={true}>
        <GlassCardHeader>
          <GlassCardTitle>Product Card</GlassCardTitle>
          <GlassCardDescription>$299.99</GlassCardDescription>
        </GlassCardHeader>
        <GlassCardContent>
          <div className="space-y-2">
            <div className="h-24 bg-gradient-to-r from-blue-400 to-purple-500 rounded-md"></div>
            <p className="text-sm">Premium glass component with advanced styling.</p>
          </div>
        </GlassCardContent>
        <GlassCardFooter className="flex gap-2">
          <GlassButton variant="primary" size="sm">Add to Cart</GlassButton>
          <GlassButton variant="secondary" size="sm">Wishlist</GlassButton>
        </GlassCardFooter>
      </GlassCard>
    </div>
  ),
};

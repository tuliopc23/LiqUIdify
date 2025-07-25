import { Heart, MessageCircle, Star } from 'lucide-react';
import { GlassResponsiveCard } from './glass-responsive-card';
import '@/styles/apple-liquid-authentic.css';

export default {
  title: 'Components/GlassResponsiveCard',
  component: GlassResponsiveCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A responsive card component with Liquid Glass styling for consistent Apple-inspired UI.',
      },
    },
  },
};

export const Playground = () => (
  <div className="apple-glass mx-auto max-w-md space-y-4 p-8">
    <GlassResponsiveCard variant="default">
      <h3 className="mb-2 font-semibold text-lg text-white">Default Card</h3>
      <p className="text-white/80">
        This is a default card with Liquid Glass styling.
      </p>
    </GlassResponsiveCard>
    <GlassResponsiveCard variant="elevated">
      <h3 className="mb-2 font-semibold text-lg text-white">Elevated Card</h3>
      <p className="text-white/80">
        This card has elevated styling for more prominence.
      </p>
    </GlassResponsiveCard>
    <GlassResponsiveCard variant="outlined">
      <h3 className="mb-2 font-semibold text-lg text-white">Outlined Card</h3>
      <p className="text-white/80">
        This card has a subtle outline for definition.
      </p>
    </GlassResponsiveCard>
    <GlassResponsiveCard variant="pressed">
      <h3 className="mb-2 font-semibold text-lg text-white">Pressed Card</h3>
      <p className="text-white/80">This card has a pressed appearance.</p>
    </GlassResponsiveCard>
  </div>
);

export const EdgeCases = () => (
  <div className="apple-glass mx-auto max-w-md space-y-6 p-8">
    <div>
      <h3 className="mb-2 text-white">No Hover Effect</h3>
      <GlassResponsiveCard hover={false}>
        <p className="text-white/80">This card has no hover effect.</p>
      </GlassResponsiveCard>
    </div>
    <div>
      <h3 className="mb-2 text-white">No Border</h3>
      <GlassResponsiveCard bordered={false}>
        <p className="text-white/80">This card has no border.</p>
      </GlassResponsiveCard>
    </div>
    <div>
      <h3 className="mb-2 text-white">No Padding</h3>
      <GlassResponsiveCard padding="none">
        <p className="text-white/80">This card has no padding.</p>
      </GlassResponsiveCard>
    </div>
    <div>
      <h3 className="mb-2 text-white">Stack on Mobile</h3>
      <GlassResponsiveCard stackOnMobile>
        <div className="flex items-center space-x-4">
          <Star className="h-5 w-5 text-yellow-400" />
          <div>
            <h4 className="font-medium text-white">Star Rating</h4>
            <p className="text-sm text-white/60">4.5 out of 5</p>
          </div>
        </div>
      </GlassResponsiveCard>
    </div>
  </div>
);

export const PaddingSizes = () => (
  <div className="apple-glass mx-auto max-w-md space-y-4 p-8">
    <GlassResponsiveCard padding="xs">
      <p className="text-white/80">Extra Small Padding</p>
    </GlassResponsiveCard>
    <GlassResponsiveCard padding="sm">
      <p className="text-white/80">Small Padding</p>
    </GlassResponsiveCard>
    <GlassResponsiveCard padding="md">
      <p className="text-white/80">Medium Padding (Default)</p>
    </GlassResponsiveCard>
    <GlassResponsiveCard padding="lg">
      <p className="text-white/80">Large Padding</p>
    </GlassResponsiveCard>
    <GlassResponsiveCard padding="xl">
      <p className="text-white/80">Extra Large Padding</p>
    </GlassResponsiveCard>
  </div>
);

export const ResponsiveBehavior = () => (
  <div className="apple-glass mx-auto max-w-md space-y-4 p-8">
    <GlassResponsiveCard responsive>
      <div className="flex items-center space-x-4">
        <Heart className="h-6 w-6 text-red-400" />
        <div>
          <h4 className="font-medium text-white">Responsive Card</h4>
          <p className="text-sm text-white/60">
            This card adapts to different screen sizes.
          </p>
        </div>
      </div>
    </GlassResponsiveCard>
    <GlassResponsiveCard responsive={false}>
      <div className="flex items-center space-x-4">
        <MessageCircle className="h-6 w-6 text-blue-400" />
        <div>
          <h4 className="font-medium text-white">Non-Responsive Card</h4>
          <p className="text-sm text-white/60">
            This card maintains fixed sizing.
          </p>
        </div>
      </div>
    </GlassResponsiveCard>
  </div>
);

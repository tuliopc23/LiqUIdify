import type { Meta, StoryObj } from '@storybook/react';
import { ResponsiveShowcase } from '../src/components/responsive-showcase';

const meta: Meta<typeof ResponsiveShowcase> = {
  title: 'Advanced/Responsive System',
  component: ResponsiveShowcase,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
The Responsive System is a comprehensive solution for creating adaptive user interfaces that work seamlessly across all device types and screen sizes.

## Key Features

### Adaptive Component Behavior
- **Automatic Size Adjustment**: Components automatically scale based on screen size and device type
- **Touch Optimization**: Enhanced touch targets and spacing on mobile devices
- **Density Adaptation**: Comfortable, normal, or compact layouts based on available space
- **Visibility Controls**: Show/hide components on specific breakpoints

### Professional Breakpoint System
- **6 Breakpoints**: xs (0-474px), sm (475-639px), md (640-767px), lg (768-1023px), xl (1024-1279px), 2xl (1280px+)
- **Device Detection**: Automatic mobile, tablet, and desktop categorization
- **Responsive Values**: Define different values for each breakpoint
- **Media Query Support**: Full CSS media query integration

### Typography & Spacing
- **Fluid Typography**: Text scales smoothly across breakpoints
- **Responsive Spacing**: Adaptive margins, padding, and gaps
- **Consistent Rhythm**: Maintained visual hierarchy at all sizes
- **Accessibility**: Minimum touch targets and readable text sizes

### Advanced Grid System
- **Adaptive Grids**: Automatic column adjustment based on screen size
- **Flexible Layouts**: CSS Grid and Flexbox responsive utilities
- **Container Queries**: Support for container-based responsive design
- **Fluid Layouts**: Smooth transitions between breakpoint changes

## Implementation

The responsive system integrates seamlessly with all LiquidiUI components:

\`\`\`tsx
// Adaptive component sizing
<GlassButton adaptiveSize responsive>
  Automatically sized for device
</GlassButton>

// Responsive values
const spacing = useResponsiveValue({
  xs: '0.5rem',
  md: '1rem', 
  xl: '1.5rem'
});

// Breakpoint-specific visibility
<GlassInput hideOn={['xs']} showOn={['sm', 'md', 'lg']} />
\`\`\`

## Performance

The responsive system is optimized for performance:
- Minimal JavaScript overhead
- CSS-first responsive utilities
- Efficient breakpoint detection
- Reduced motion support
- Server-side rendering compatible

## Browser Support

Full support for modern browsers with graceful degradation:
- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

Try resizing your browser window or using device emulation to see the responsive system in action!
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The complete responsive system showcase demonstrating adaptive layouts,
 * component behavior, typography scaling, and breakpoint management.
 * 
 * **Try resizing your browser window** to see how components automatically
 * adapt to different screen sizes and device types.
 */
export const Complete: Story = {
  args: {},
};

/**
 * Interactive demo showing how components adapt their size and behavior
 * based on the current breakpoint. Notice how buttons, inputs, and text
 * automatically scale for optimal usability.
 */
export const AdaptiveComponents: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: `
Components automatically adapt their size, spacing, and behavior:
- Touch targets increase on mobile devices
- Typography scales for readability
- Spacing adjusts for different screen densities
- Interactive elements optimize for device capabilities
        `,
      },
    },
  },
};

/**
 * Demonstration of the breakpoint system with real-time feedback.
 * The overlay shows current breakpoint, device type, and system state.
 */
export const BreakpointSystem: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: `
The breakpoint system provides:
- 6 semantic breakpoints (xs, sm, md, lg, xl, 2xl)
- Device categorization (mobile, tablet, desktop)
- Touch optimization detection
- Density adaptation (comfortable, normal, compact)
        `,
      },
    },
  },
};

/**
 * Typography scaling demonstration showing how text automatically
 * adjusts for optimal readability across different screen sizes.
 */
export const ResponsiveTypography: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: `
Typography features:
- Fluid scaling based on screen size
- Maintained visual hierarchy
- Readable text at all sizes
- Line height optimization
- Letter spacing adjustment
        `,
      },
    },
  },
};
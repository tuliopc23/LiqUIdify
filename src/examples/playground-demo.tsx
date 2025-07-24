/**
 * Interactive Playground Demo
 * Showcases the S-tier component playground functionality
 */

import {
  GlassCard,
  GlassCardDescription,
  GlassCardHeader,
  GlassCardTitle,

} from '@/components/glass-card-refactored';
import {
  GlassPlayground,
  PlaygroundTemplates,

} from '@/components/glass-playground';

export function PlaygroundDemo() {
  return (

    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8">

      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}

        <div className="text-center mb-12">

          <h1 className="text-4xl font-bold text-white mb-4">
            LiqUIdify Interactive Playground
          </h1>

          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Experiment with components in real-time. Edit the code and see
            instant updates.
          </p>
        </div>

        {/* Basic Button Example */}

        <GlassCard>

          <GlassCardHeader>

            <GlassCardTitle>Button Components</GlassCardTitle>

            <GlassCardDescription>
              Try changing the variant, adding props, or creating new buttons
            </GlassCardDescription>
          </GlassCardHeader>

          <GlassPlayground
            title="Glass Button Variants"
            code={PlaygroundTemplates.button}
            height={300}
          />
        </GlassCard>

        {/* Card Example */}

        <GlassCard>

          <GlassCardHeader>

            <GlassCardTitle>Card Components</GlassCardTitle>

            <GlassCardDescription>
              Modify the card content, add new sections, or style it differently
            </GlassCardDescription>
          </GlassCardHeader>

          <GlassPlayground
            title="Glass Card Example"
            code={PlaygroundTemplates.card}
            height={400}
          />
        </GlassCard>

        {/* Interactive Form Example */}

        <GlassCard>

          <GlassCardHeader>

            <GlassCardTitle>Interactive Form</GlassCardTitle>

            <GlassCardDescription>
              A complete form example with state management
            </GlassCardDescription>
          </GlassCardHeader>

          <GlassPlayground
            title="Form with Validation"
            code={PlaygroundTemplates.form}
            height={400}
            autoRun={false}
          />
        </GlassCard>

        {/* Custom Component Example */}

        <GlassCard>

          <GlassCardHeader>

            <GlassCardTitle>Build Your Own</GlassCardTitle>

            <GlassCardDescription>
              Start from scratch and build your own component composition
            </GlassCardDescription>
          </GlassCardHeader>

          <GlassPlayground
            title="Empty Canvas"
            code={`// Start building your component here!
// All LiqUIdify components are available in scope

<div className="p-4">
  <h2 className="text-2xl font-bold mb-4">
    Your Component Here
  </h2>
  
  {/* Add your code */}
</div>`}
            height={500}
          />
        </GlassCard>

        {/* Advanced Example with Animation */}

        <GlassCard>

          <GlassCardHeader>

            <GlassCardTitle>Advanced Animation</GlassCardTitle>

            <GlassCardDescription>
              Create animated components with physics-based interactions
            </GlassCardDescription>
          </GlassCardHeader>

          <GlassPlayground
            title="Animated Component"
            code={`function AnimatedCard() {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <GlassCard
      className="transition-all duration-300 transform cursor-pointer"
      style={{
        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <GlassCardHeader>
        <GlassCardTitle>
          {isHovered ? '✨ Hovered!' : 'Hover Me'}
        </GlassCardTitle>
      </GlassCardHeader>
      
      <GlassCardContent>
        <p>This card scales up when you hover over it.</p>
        <div className="mt-4 flex gap-2">
          <GlassButton 
            variant={isHovered ? 'primary' : 'secondary'}
            size="sm"
          >
            Dynamic Button
          </GlassButton>
        </div>
      </GlassCardContent>
    </GlassCard>
  );
}

render(<AnimatedCard />);`}
            height={400}
            autoRun={false}
          />
        </GlassCard>
      </div>
    </div>
  );
}

// Standalone playground for embedding
export function StandalonePlayground() {
  return (

    <GlassPlayground
      code={PlaygroundTemplates.button}
      height="100vh"
      className="h-screen"
    />
  );
}

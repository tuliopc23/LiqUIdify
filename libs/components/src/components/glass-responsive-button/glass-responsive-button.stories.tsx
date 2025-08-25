import { ArrowRight, Heart, Star, Zap } from "lucide-react";
import { GlassResponsiveButton } from "./glass-responsive-button";
import "@/styles/index.css";

export default {
  title: "Components/GlassResponsiveButton",
  component: GlassResponsiveButton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A responsive button component with Liquid Glass styling for consistent Apple-inspired UI.",
      },
    },
  },
};

export const Playground = () => (
  <div className="apple-glass mx-auto max-w-md space-y-4 p-8">
    <GlassResponsiveButton variant="primary">
      Primary Button
    </GlassResponsiveButton>
    <GlassResponsiveButton variant="secondary">
      Secondary Button
    </GlassResponsiveButton>
    <GlassResponsiveButton variant="tertiary">
      Tertiary Button
    </GlassResponsiveButton>
    <GlassResponsiveButton variant="ghost">Ghost Button</GlassResponsiveButton>
    <GlassResponsiveButton variant="destructive">
      Destructive Button
    </GlassResponsiveButton>
  </div>
);

export const EdgeCases = () => (
  <div className="apple-glass mx-auto max-w-md space-y-6 p-8">
    <div>
      <h3 className="mb-2 text-liquid-text-inverse">Loading State</h3>
      <GlassResponsiveButton variant="primary" loading>
        Loading...
      </GlassResponsiveButton>
    </div>
    <div>
      <h3 className="mb-2 text-liquid-text-inverse">Disabled State</h3>
      <GlassResponsiveButton variant="primary" disabled>
        Disabled Button
      </GlassResponsiveButton>
    </div>
    <div>
      <h3 className="mb-2 text-liquid-text-inverse">Full Width</h3>
      <GlassResponsiveButton variant="primary" fullWidth>
        Full Width Button
      </GlassResponsiveButton>
    </div>
    <div>
      <h3 className="mb-2 text-liquid-text-inverse">With Icons</h3>
      <GlassResponsiveButton
        variant="primary"
        leftIcon={<Heart className="h-4 w-4" />}
        rightIcon={<ArrowRight className="h-4 w-4" />}
      >
        With Icons
      </GlassResponsiveButton>
    </div>
  </div>
);

export const Sizes = () => (
  <div className="apple-glass mx-auto max-w-md space-y-4 p-8">
    <GlassResponsiveButton variant="primary" size="xs">
      Extra Small
    </GlassResponsiveButton>
    <GlassResponsiveButton variant="primary" size="sm">
      Small
    </GlassResponsiveButton>
    <GlassResponsiveButton variant="primary" size="md">
      Medium (Default)
    </GlassResponsiveButton>
    <GlassResponsiveButton variant="primary" size="lg">
      Large
    </GlassResponsiveButton>
    <GlassResponsiveButton variant="primary" size="xl">
      Extra Large
    </GlassResponsiveButton>
  </div>
);

export const ResponsiveBehavior = () => (
  <div className="apple-glass mx-auto max-w-md space-y-4 p-8">
    <GlassResponsiveButton
      variant="primary"
      responsive
      leftIcon={<Zap className="h-4 w-4" />}
    >
      Responsive Button
    </GlassResponsiveButton>
    <GlassResponsiveButton
      variant="secondary"
      responsive={false}
      leftIcon={<Star className="h-4 w-4" />}
    >
      Non-Responsive Button
    </GlassResponsiveButton>
  </div>
);

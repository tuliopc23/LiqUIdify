// filepath: snippets/components/ButtonExample.jsx

import { useState } from "react";
import ComponentFrame from "../preview/ComponentFrame";

const BASIC_USAGE = `import { GlassButton } from "liquidify";

export default function Example() {
  return (
    <GlassButton
      variant="primary"
      onClick={() => console.log("clicked")}
    >
      Get Started
    </GlassButton>
  );
}`;

const VARIANTS_USAGE = `import { GlassButton } from "liquidify";

export default function ButtonVariants() {
  return (
    <div className="flex gap-3 flex-wrap">
      <GlassButton variant="primary">Primary</GlassButton>
      <GlassButton variant="secondary">Secondary</GlassButton>
      <GlassButton variant="ghost">Ghost</GlassButton>
      <GlassButton variant="danger">Danger</GlassButton>
    </div>
  );
}`;

const SIZES_USAGE = `import { GlassButton } from "liquidify";

export default function ButtonSizes() {
  return (
    <div className="flex items-center gap-3">
      <GlassButton size="sm">Small</GlassButton>
      <GlassButton size="md">Medium</GlassButton>
      <GlassButton size="lg">Large</GlassButton>
    </div>
  );
}`;

export default function ButtonExample() {
  const [activeExample, setActiveExample] = useState("basic");

  const examples = {
    basic: {
      title: "Basic Glass Button",
      intro:
        "Primary action trigger with liquid glass effect and hover states following Apple HIG principles.",
      code: BASIC_USAGE,
      component: (
        <button className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 active:scale-95 transition-all duration-200 font-medium shadow-lg backdrop-blur-sm">
          Get Started
        </button>
      ),
    },
    variants: {
      title: "Button Variants",
      intro: "Different visual styles for various use cases and interaction hierarchies.",
      code: VARIANTS_USAGE,
      component: (
        <div className="flex gap-3 flex-wrap">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium">
            Primary
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition-colors font-medium">
            Secondary
          </button>
          <button className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium">
            Ghost
          </button>
          <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium">
            Danger
          </button>
        </div>
      ),
    },
    sizes: {
      title: "Button Sizes",
      intro: "Multiple sizes optimized for different interface contexts and touch targets.",
      code: SIZES_USAGE,
      component: (
        <div className="flex items-center gap-3">
          <button className="px-3 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm font-medium">
            Small
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium">
            Medium
          </button>
          <button className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors font-medium text-lg">
            Large
          </button>
        </div>
      ),
    },
  };

  const currentExample = examples[activeExample];

  return (
    <div className="space-y-4">
      {/* Example selector with Apple-style segmented control */}
      <div className="flex gap-1 p-1 bg-gray-100/50 dark:bg-gray-800/30 rounded-lg backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 w-fit">
        {Object.entries(examples).map(([key, _example]) => (
          <button
            key={key}
            onClick={() => setActiveExample(key)}
            className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
              activeExample === key
                ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm border border-gray-200/50 dark:border-gray-600/50"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50/50 dark:hover:bg-gray-700/30"
            }`}
          >
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </button>
        ))}
      </div>

      <ComponentFrame
        title={currentExample.title}
        intro={currentExample.intro}
        code={currentExample.code}
        variant="elevated"
      >
        {currentExample.component}
      </ComponentFrame>
    </div>
  );
}

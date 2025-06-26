/**
 * Comprehensive Guides for LiquidiUI
 * Step-by-step guides for implementation, customization, and best practices
 */

export interface Guide {
  id: string;
  title: string;
  description: string;
  category:
    | 'getting-started'
    | 'customization'
    | 'advanced'
    | 'best-practices'
    | 'migration';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  prerequisites: string[];
  sections: GuideSection[];
  relatedGuides: string[];
  lastUpdated: string;
}

export interface GuideSection {
  id: string;
  title: string;
  content: string;
  codeExamples?: CodeExample[];
  tips?: string[];
  warnings?: string[];
  nextSteps?: string[];
}

export interface CodeExample {
  title: string;
  description: string;
  language: 'tsx' | 'css' | 'json' | 'bash';
  code: string;
  filename?: string;
}

// Comprehensive guides collection
export const guides: Guide[] = [
  {
    id: 'installation-setup',
    title: 'Installation and Setup',
    description:
      'Complete guide to installing and setting up LiquidiUI in your project',
    category: 'getting-started',
    difficulty: 'beginner',
    estimatedTime: '15 minutes',
    prerequisites: [
      'Basic React knowledge',
      'Node.js installed',
      'Package manager (npm/yarn/pnpm)',
    ],
    lastUpdated: '2024-01-15',
    relatedGuides: ['first-component', 'theming-guide'],
    sections: [
      {
        id: 'installation',
        title: 'Installation',
        content: `LiquidiUI can be installed using your preferred package manager. We recommend using npm, yarn, or pnpm for the best experience.`,
        codeExamples: [
          {
            title: 'Install with npm',
            description: 'Install LiquidiUI and its dependencies using npm',
            language: 'bash',
            code: `npm install @liquidui/react @liquidui/tokens
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p`,
          },
          {
            title: 'Install with yarn',
            description: 'Install LiquidiUI and its dependencies using yarn',
            language: 'bash',
            code: `yarn add @liquidui/react @liquidui/tokens
yarn add -D tailwindcss postcss autoprefixer
npx tailwindcss init -p`,
          },
          {
            title: 'Install with pnpm',
            description: 'Install LiquidiUI and its dependencies using pnpm',
            language: 'bash',
            code: `pnpm add @liquidui/react @liquidui/tokens
pnpm add -D tailwindcss postcss autoprefixer
npx tailwindcss init -p`,
          },
        ],
      },

      {
        id: 'tailwind-config',
        title: 'Tailwind CSS Configuration',
        content: `Configure Tailwind CSS to work with LiquidiUI components and design tokens. This step is crucial for proper styling and theme support.`,
        codeExamples: [
          {
            title: 'tailwind.config.js',
            description: 'Configure Tailwind CSS with LiquidiUI preset',
            language: 'json',
            filename: 'tailwind.config.js',
            code: `/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './node_modules/@liquidui/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // LiquidiUI color tokens
        glass: {
          light: {
            primary: 'rgba(255, 255, 255, 0.25)',
            secondary: 'rgba(255, 255, 255, 0.18)',
            tertiary: 'rgba(255, 255, 255, 0.12)',
            elevated: 'rgba(255, 255, 255, 0.35)',
            floating: 'rgba(255, 255, 255, 0.45)',
            overlay: 'rgba(255, 255, 255, 0.65)',
          },
          dark: {
            primary: 'rgba(0, 0, 0, 0.25)',
            secondary: 'rgba(0, 0, 0, 0.18)',
            tertiary: 'rgba(0, 0, 0, 0.12)',
            elevated: 'rgba(0, 0, 0, 0.35)',
            floating: 'rgba(0, 0, 0, 0.45)',
            overlay: 'rgba(0, 0, 0, 0.65)',
          },
        },
        border: {
          glass: {
            light: {
              subtle: 'rgba(255, 255, 255, 0.1)',
              medium: 'rgba(255, 255, 255, 0.2)',
              strong: 'rgba(255, 255, 255, 0.3)',
            },
            dark: {
              subtle: 'rgba(0, 0, 0, 0.1)',
              medium: 'rgba(0, 0, 0, 0.2)',
              strong: 'rgba(0, 0, 0, 0.3)',
            },
          },
        },
      },
      backdropBlur: {
        'glass': '12px',
        'glass-light': '8px',
        'glass-heavy': '16px',
        'glass-ultra': '24px',
      },
      animation: {
        'glass-magnetic': 'glass-magnetic 0.3s ease-out',
        'glass-float': 'glass-float 3s ease-in-out infinite',
      },
      keyframes: {
        'glass-magnetic': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1.02)' },
        },
        'glass-float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@liquidui/tailwind-plugin"),
  ],
}`,
          },
        ],
        tips: [
          'Make sure to include the LiquidiUI plugin for additional utilities',
          'The content array should include paths to all files using LiquidiUI components',
          'Dark mode is configured using the "class" strategy for better control',
        ],
      },

      {
        id: 'css-setup',
        title: 'CSS Setup',
        content: `Add the necessary CSS imports and custom styles to enable LiquidiUI components and effects.`,
        codeExamples: [
          {
            title: 'globals.css',
            description: 'Add LiquidiUI styles to your global CSS file',
            language: 'css',
            filename: 'src/styles/globals.css',
            code: `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96%;
    --secondary-foreground: 222.2 84% 4.9%;
    --muted: 210 40% 96%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96%;
    --accent-foreground: 222.2 84% 4.9%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 221.2 83.2% 53.3%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 217.2 91.2% 59.8%;
    --primary-foreground: 222.2 84% 4.9%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 224.3 76.3% 94.1%;
  }
}

@layer components {
  /* Glass effect utilities */
  .glass-effect {
    @apply backdrop-blur-glass bg-glass-light-primary border border-border-glass-light-subtle;
  }
  
  .glass-effect-elevated {
    @apply backdrop-blur-glass-heavy bg-glass-light-elevated border border-border-glass-light-medium shadow-lg;
  }
  
  .glass-hover {
    @apply hover:bg-glass-light-secondary hover:border-border-glass-light-medium transition-all duration-200;
  }
  
  .dark .glass-effect {
    @apply bg-glass-dark-primary border-border-glass-dark-subtle;
  }
  
  .dark .glass-effect-elevated {
    @apply bg-glass-dark-elevated border-border-glass-dark-medium;
  }
  
  .dark .glass-hover {
    @apply hover:bg-glass-dark-secondary hover:border-border-glass-dark-medium;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}`,
          },
        ],
        tips: [
          'The CSS custom properties enable theme switching',
          'Glass effect utilities provide consistent styling across components',
          'Dark mode variants are automatically applied when the dark class is present',
        ],
      },

      {
        id: 'provider-setup',
        title: 'Provider Setup',
        content: `Wrap your application with the necessary providers to enable theming and LiquidiUI functionality.`,
        codeExamples: [
          {
            title: 'App.tsx',
            description: 'Set up providers in your main App component',
            language: 'tsx',
            filename: 'src/App.tsx',
            code: `import React from 'react';
import { ThemeProvider } from 'next-themes';
import { GlassUIProvider } from '@liquidui/react';
import './styles/globals.css';

function App() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <GlassUIProvider>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
          {/* Your app content */}
          <main>
            <h1 className="text-4xl font-bold text-center py-8">
              Welcome to LiquidiUI
            </h1>
          </main>
        </div>
      </GlassUIProvider>
    </ThemeProvider>
  );
}

export default App;`,
          },
          {
            title: 'Next.js App Router',
            description: 'Set up providers in Next.js 13+ App Router',
            language: 'tsx',
            filename: 'src/app/layout.tsx',
            code: `import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { GlassUIProvider } from '@liquidui/react';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <GlassUIProvider>
            {children}
          </GlassUIProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}`,
          },
        ],
        warnings: [
          'Make sure to import the CSS file before using any LiquidiUI components',
          'The suppressHydrationWarning prop is needed for Next.js to prevent hydration warnings with theme switching',
        ],
      },
    ],
  },

  {
    id: 'first-component',
    title: 'Creating Your First Component',
    description:
      'Learn how to create and customize your first LiquidiUI component',
    category: 'getting-started',
    difficulty: 'beginner',
    estimatedTime: '10 minutes',
    prerequisites: ['LiquidiUI installed and configured'],
    lastUpdated: '2024-01-15',
    relatedGuides: ['installation-setup', 'component-variants'],
    sections: [
      {
        id: 'basic-button',
        title: 'Basic Button Component',
        content: `Let's start by creating a simple button component using LiquidiUI. This will demonstrate the basic usage and styling capabilities.`,
        codeExamples: [
          {
            title: 'Basic Button',
            description: 'Create a simple glass button',
            language: 'tsx',
            code: `import { Button } from '@liquidui/react';

export function MyFirstButton() {
  return (
    <Button variant="glass" size="md">
      Click me!
    </Button>
  );
}`,
          },
          {
            title: 'Button with Icon',
            description: 'Add an icon to your button',
            language: 'tsx',
            code: `import { Button } from '@liquidui/react';
import { PlusIcon } from '@heroicons/react/24/outline';

export function ButtonWithIcon() {
  return (
    <Button variant="glass" size="md" className="gap-2">
      <PlusIcon className="h-4 w-4" />
      Add Item
    </Button>
  );
}`,
          },
        ],
        tips: [
          'Use the variant prop to change the button style',
          'The size prop controls the button dimensions',
          'Add custom classes with the className prop for additional styling',
        ],
      },

      {
        id: 'glass-card',
        title: 'Glass Card Component',
        content: `Cards are perfect for showcasing the glass morphism effect. Let's create a beautiful card component.`,
        codeExamples: [
          {
            title: 'Simple Card',
            description: 'Create a basic glass card',
            language: 'tsx',
            code: `import { Card, CardContent, CardHeader, CardTitle } from '@liquidui/react';

export function MyFirstCard() {
  return (
    <Card variant="glass" className="w-80">
      <CardHeader>
        <CardTitle>Glass Card</CardTitle>
      </CardHeader>
      <CardContent>
        <p>This is a beautiful glass morphism card with subtle transparency and depth.</p>
      </CardContent>
    </Card>
  );
}`,
          },
          {
            title: 'Interactive Card',
            description: 'Add hover effects and interactions',
            language: 'tsx',
            code: `import { Card, CardContent, CardHeader, CardTitle } from '@liquidui/react';
import { Button } from '@liquidui/react';

export function InteractiveCard() {
  return (
    <Card 
      variant="glass" 
      className="w-80 transition-all duration-300 hover:scale-105 hover:shadow-xl"
    >
      <CardHeader>
        <CardTitle>Interactive Card</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>This card responds to hover with smooth animations.</p>
        <Button variant="glass" size="sm" className="w-full">
          Learn More
        </Button>
      </CardContent>
    </Card>
  );
}`,
          },
        ],
        tips: [
          'Use hover: utilities for interactive effects',
          'Combine multiple cards in a grid for dashboard layouts',
          'Consider accessibility when adding hover effects',
        ],
      },
    ],
  },

  {
    id: 'theming-guide',
    title: 'Theming and Customization',
    description:
      'Complete guide to customizing LiquidiUI themes and creating your own design system',
    category: 'customization',
    difficulty: 'intermediate',
    estimatedTime: '30 minutes',
    prerequisites: [
      'Basic CSS knowledge',
      'Understanding of CSS custom properties',
    ],
    lastUpdated: '2024-01-15',
    relatedGuides: ['design-tokens', 'component-variants'],
    sections: [
      {
        id: 'theme-structure',
        title: 'Understanding Theme Structure',
        content: `LiquidiUI themes are built using CSS custom properties and design tokens. This allows for easy customization and theme switching.`,
        codeExamples: [
          {
            title: 'Custom Theme Configuration',
            description: 'Create a custom theme configuration',
            language: 'tsx',
            code: `import { createTheme } from '@liquidui/react';

export const customTheme = createTheme({
  colors: {
    glass: {
      light: {
        primary: 'rgba(59, 130, 246, 0.25)', // Blue glass
        secondary: 'rgba(59, 130, 246, 0.18)',
        elevated: 'rgba(59, 130, 246, 0.35)',
      },
      dark: {
        primary: 'rgba(30, 58, 138, 0.25)', // Dark blue glass
        secondary: 'rgba(30, 58, 138, 0.18)',
        elevated: 'rgba(30, 58, 138, 0.35)',
      },
    },
    primary: {
      50: '#eff6ff',
      500: '#3b82f6',
      900: '#1e3a8a',
    },
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
  },
  shadows: {
    glass: {
      subtle: '0 1px 3px rgba(59, 130, 246, 0.1)',
      medium: '0 4px 6px rgba(59, 130, 246, 0.15)',
      heavy: '0 10px 15px rgba(59, 130, 246, 0.2)',
    },
  },
});`,
          },
        ],
      },

      {
        id: 'applying-themes',
        title: 'Applying Custom Themes',
        content: `Learn how to apply your custom theme to your application and switch between different themes.`,
        codeExamples: [
          {
            title: 'Theme Provider Setup',
            description: 'Apply your custom theme using the theme provider',
            language: 'tsx',
            code: `import { GlassUIProvider } from '@liquidui/react';
import { customTheme } from './theme';

function App() {
  return (
    <GlassUIProvider theme={customTheme}>
      {/* Your app content */}
    </GlassUIProvider>
  );
}`,
          },
          {
            title: 'Dynamic Theme Switching',
            description: 'Implement dynamic theme switching',
            language: 'tsx',
            code: `import { useState } from 'react';
import { GlassUIProvider, Button } from '@liquidui/react';
import { lightTheme, darkTheme, customTheme } from './themes';

function App() {
  const [currentTheme, setCurrentTheme] = useState(lightTheme);
  
  const themes = {
    light: lightTheme,
    dark: darkTheme,
    custom: customTheme,
  };

  return (
    <GlassUIProvider theme={currentTheme}>
      <div className="p-4 space-x-2">
        {Object.entries(themes).map(([name, theme]) => (
          <Button
            key={name}
            variant="glass"
            onClick={() => setCurrentTheme(theme)}
            className={currentTheme === theme ? 'ring-2 ring-primary' : ''}
          >
            {name} Theme
          </Button>
        ))}
      </div>
      {/* Your app content */}
    </GlassUIProvider>
  );
}`,
          },
        ],
      },
    ],
  },

  {
    id: 'accessibility-guide',
    title: 'Accessibility Best Practices',
    description:
      'Comprehensive guide to building accessible interfaces with LiquidiUI',
    category: 'best-practices',
    difficulty: 'intermediate',
    estimatedTime: '45 minutes',
    prerequisites: [
      'Basic understanding of web accessibility',
      'WCAG guidelines knowledge',
    ],
    lastUpdated: '2024-01-15',
    relatedGuides: ['testing-guide', 'component-patterns'],
    sections: [
      {
        id: 'color-contrast',
        title: 'Color Contrast and Visibility',
        content: `Glass morphism effects can impact text readability. Learn how to maintain proper contrast ratios while preserving the aesthetic.`,
        codeExamples: [
          {
            title: 'High Contrast Text',
            description: 'Ensure text remains readable on glass backgrounds',
            language: 'tsx',
            code: `import { Card, CardContent } from '@liquidui/react';

export function AccessibleGlassCard() {
  return (
    <Card variant="glass" className="relative">
      {/* Background overlay for better contrast */}
      <div className="absolute inset-0 bg-white/20 dark:bg-black/20 rounded-lg" />
      
      <CardContent className="relative z-10">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          High Contrast Title
        </h3>
        <p className="text-gray-700 dark:text-gray-200 mt-2">
          This text maintains proper contrast ratios for accessibility.
        </p>
      </CardContent>
    </Card>
  );
}`,
          },
        ],
        tips: [
          'Always test contrast ratios with tools like WebAIM Contrast Checker',
          'Use background overlays to improve text readability on glass surfaces',
          'Consider providing a high contrast mode for users who need it',
        ],
      },

      {
        id: 'keyboard-navigation',
        title: 'Keyboard Navigation',
        content: `Ensure all interactive elements are accessible via keyboard navigation with proper focus management.`,
        codeExamples: [
          {
            title: 'Accessible Button Group',
            description: 'Create keyboard-navigable button groups',
            language: 'tsx',
            code: `import { Button } from '@liquidui/react';
import { useRef, KeyboardEvent } from 'react';

export function AccessibleButtonGroup() {
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (event: KeyboardEvent, index: number) => {
    const buttons = buttonsRef.current.filter(Boolean);
    
    switch (event.key) {
      case 'ArrowRight':
        event.preventDefault();
        const nextIndex = (index + 1) % buttons.length;
        buttons[nextIndex]?.focus();
        break;
      case 'ArrowLeft':
        event.preventDefault();
        const prevIndex = (index - 1 + buttons.length) % buttons.length;
        buttons[prevIndex]?.focus();
        break;
    }
  };

  const actions = ['Save', 'Cancel', 'Delete'];

  return (
    <div role="group" aria-label="Document actions" className="flex gap-2">
      {actions.map((action, index) => (
        <Button
          key={action}
          ref={(el) => (buttonsRef.current[index] = el)}
          variant="glass"
          onKeyDown={(e) => handleKeyDown(e, index)}
          className="focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          {action}
        </Button>
      ))}
    </div>
  );
}`,
          },
        ],
        tips: [
          'Use arrow keys for navigation within component groups',
          'Provide clear focus indicators that work with glass effects',
          'Test keyboard navigation with screen readers',
        ],
      },
    ],
  },
];

// Guide utilities
export class GuideManager {
  private guides = new Map<string, Guide>();

  constructor() {
    guides.forEach(guide => {
      this.guides.set(guide.id, guide);
    });
  }

  getGuide(id: string): Guide | undefined {
    return this.guides.get(id);
  }

  getGuidesByCategory(category: Guide['category']): Guide[] {
    return Array.from(this.guides.values()).filter(
      guide => guide.category === category
    );
  }

  getGuidesByDifficulty(difficulty: Guide['difficulty']): Guide[] {
    return Array.from(this.guides.values()).filter(
      guide => guide.difficulty === difficulty
    );
  }

  searchGuides(query: string): Guide[] {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.guides.values()).filter(
      guide =>
        guide.title.toLowerCase().includes(lowercaseQuery) ||
        guide.description.toLowerCase().includes(lowercaseQuery) ||
        guide.sections.some(
          section =>
            section.title.toLowerCase().includes(lowercaseQuery) ||
            section.content.toLowerCase().includes(lowercaseQuery)
        )
    );
  }

  getRelatedGuides(guideId: string): Guide[] {
    const guide = this.getGuide(guideId);
    if (!guide) return [];

    return guide.relatedGuides
      .map(id => this.getGuide(id))
      .filter(Boolean) as Guide[];
  }
}

// Export the guide manager instance
export const guideManager = new GuideManager();

// Guide utilities
export const guideUtils = {
  manager: guideManager,
  guides,
  categories: [
    'getting-started',
    'customization',
    'advanced',
    'best-practices',
    'migration',
  ] as const,
  difficulties: ['beginner', 'intermediate', 'advanced'] as const,
};

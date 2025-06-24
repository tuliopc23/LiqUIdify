/**
 * Interactive Examples for Glass UI Components
 * Comprehensive examples with code snippets and live previews
 */
import React from 'react';
// Example collections
export const exampleCollections = [
    {
        name: 'Getting Started',
        description: 'Basic examples to get you started with Glass UI',
        examples: [
            {
                id: 'basic-button',
                title: 'Basic Glass Button',
                description: 'A simple button with glass morphism effects',
                category: 'basic',
                difficulty: 'beginner',
                tags: ['button', 'glass', 'interactive'],
                code: {
                    tsx: `import { Button } from '@/components/ui/button';

export function BasicGlassButton() {
  return (
    <Button variant="glass" size="md">
      Click me
    </Button>
  );
}`,
                },
                preview: React.createElement('div', { className: 'p-4' }, 'Button Preview'),
                designTokens: [
                    'colors.glass.light.primary',
                    'borderRadius.md',
                    'shadows.glass.subtle',
                ],
                relatedExamples: ['interactive-button', 'button-variants'],
                accessibility: {
                    features: [
                        'Keyboard navigation support',
                        'Focus visible indicators',
                        'Screen reader compatible',
                    ],
                    testing: [
                        'Test with keyboard navigation',
                        'Verify focus indicators',
                        'Check with screen reader',
                    ],
                },
            },
            {
                id: 'glass-card',
                title: 'Glass Card Component',
                description: 'A translucent card with subtle shadows and borders',
                category: 'basic',
                difficulty: 'beginner',
                tags: ['card', 'container', 'glass'],
                code: {
                    tsx: `import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function GlassCard() {
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
                preview: React.createElement('div', { className: 'p-4' }, 'Card Preview'),
                designTokens: [
                    'colors.glass.light.primary',
                    'borderRadius.lg',
                    'shadows.glass.light',
                    'spacing.6',
                ],
                relatedExamples: ['elevated-card', 'interactive-card'],
            },
            {
                id: 'glass-input',
                title: 'Glass Input Field',
                description: 'A form input with glass styling and focus states',
                category: 'forms',
                difficulty: 'beginner',
                tags: ['input', 'form', 'glass'],
                code: {
                    tsx: `import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function GlassInput() {
  return (
    <div className="space-y-2">
      <Label htmlFor="email">Email</Label>
      <Input 
        id="email"
        type="email" 
        placeholder="Enter your email"
        variant="glass"
      />
    </div>
  );
}`,
                },
                preview: React.createElement('div', { className: 'p-4' }, 'Input Preview'),
                designTokens: [
                    'colors.glass.light.primary',
                    'borderRadius.base',
                    'shadows.focus.medium',
                ],
                relatedExamples: ['form-validation', 'input-variants'],
                accessibility: {
                    features: [
                        'Proper label association',
                        'Focus management',
                        'Error state indication',
                    ],
                    testing: [
                        'Test label-input association',
                        'Verify focus behavior',
                        'Check error states',
                    ],
                },
            },
        ],
    },
    {
        name: 'Advanced Components',
        description: 'Complex components showcasing advanced Glass UI features',
        examples: [
            {
                id: 'modal-dialog',
                title: 'Glass Modal Dialog',
                description: 'A modal with glass backdrop and focus management',
                category: 'advanced',
                difficulty: 'intermediate',
                tags: ['modal', 'dialog', 'overlay', 'focus-trap'],
                code: {
                    tsx: `import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export function GlassModal() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="glass">Open Modal</Button>
      </DialogTrigger>
      <DialogContent className="glass-effect-elevated">
        <DialogHeader>
          <DialogTitle>Glass Modal</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p>This modal demonstrates glass morphism with proper focus management.</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}`,
                },
                preview: React.createElement('div', { className: 'p-4' }, 'Modal Preview'),
                designTokens: [
                    'colors.glass.light.elevated',
                    'backdropBlur.heavy',
                    'zIndex.modal',
                    'animation.duration.smooth',
                ],
                relatedExamples: ['drawer-component', 'popover-menu'],
                accessibility: {
                    features: [
                        'Focus trap within modal',
                        'Escape key to close',
                        'Backdrop click to close',
                        'Proper ARIA attributes',
                    ],
                    testing: [
                        'Test focus trapping',
                        'Verify keyboard navigation',
                        'Check ARIA implementation',
                    ],
                },
            },
            {
                id: 'navigation-menu',
                title: 'Glass Navigation Menu',
                description: 'A responsive navigation with glass effects and animations',
                category: 'navigation',
                difficulty: 'advanced',
                tags: ['navigation', 'menu', 'responsive', 'animation'],
                code: {
                    tsx: `import { useState } from 'react';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu';

export function GlassNavigation() {
  return (
    <NavigationMenu className="glass-effect">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent className="glass-effect-elevated">
            <div className="grid gap-3 p-6 w-[400px]">
              <NavigationMenuLink href="/products/ui">
                <div className="text-sm font-medium">UI Components</div>
                <p className="text-sm text-muted-foreground">Beautiful, accessible components</p>
              </NavigationMenuLink>
              <NavigationMenuLink href="/products/templates">
                <div className="text-sm font-medium">Templates</div>
                <p className="text-sm text-muted-foreground">Pre-built page templates</p>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}`,
                },
                preview: React.createElement('div', { className: 'p-4' }, 'Navigation Preview'),
                designTokens: [
                    'colors.glass.light.primary',
                    'colors.glass.light.elevated',
                    'animation.duration.normal',
                    'shadows.glass.medium',
                ],
                relatedExamples: ['dropdown-menu', 'sidebar-navigation'],
            },
        ],
    },
    {
        name: 'Layout Patterns',
        description: 'Common layout patterns using Glass UI components',
        examples: [
            {
                id: 'dashboard-layout',
                title: 'Glass Dashboard Layout',
                description: 'A complete dashboard layout with glass components',
                category: 'layouts',
                difficulty: 'advanced',
                tags: ['dashboard', 'layout', 'sidebar', 'header'],
                code: {
                    tsx: `import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function GlassDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="glass-effect border-b border-border-glass-light-subtle p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Glass Dashboard</h1>
          <Button variant="glass" size="sm">Settings</Button>
        </div>
      </header>
      
      {/* Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 glass-effect-elevated m-4 rounded-lg p-4">
          <nav className="space-y-2">
            <Button variant="ghost" className="w-full justify-start">
              Dashboard
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Analytics
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Settings
            </Button>
          </nav>
        </aside>
        
        {/* Content Area */}
        <main className="flex-1 p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card variant="glass">
              <CardHeader>
                <CardTitle>Total Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">12,345</div>
              </CardContent>
            </Card>
            
            <Card variant="glass">
              <CardHeader>
                <CardTitle>Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">$45,678</div>
              </CardContent>
            </Card>
            
            <Card variant="glass">
              <CardHeader>
                <CardTitle>Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">+23%</div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}`,
                },
                preview: React.createElement('div', { className: 'p-4' }, 'Dashboard Preview'),
                designTokens: [
                    'colors.glass.light.primary',
                    'colors.glass.light.elevated',
                    'borderRadius.lg',
                    'spacing.4',
                    'shadows.glass.light',
                ],
                relatedExamples: ['admin-panel', 'analytics-dashboard'],
                notes: [
                    'Uses CSS Grid for responsive layout',
                    'Implements proper semantic HTML structure',
                    'Includes hover and focus states for interactive elements',
                ],
            },
        ],
    },
    {
        name: 'Form Patterns',
        description: 'Form layouts and validation patterns with Glass UI',
        examples: [
            {
                id: 'contact-form',
                title: 'Glass Contact Form',
                description: 'A complete contact form with validation and glass styling',
                category: 'forms',
                difficulty: 'intermediate',
                tags: ['form', 'validation', 'contact', 'glass'],
                code: {
                    tsx: `import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export function GlassContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <Card variant="glass" className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Contact Us</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              variant="glass"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              variant="glass"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              variant="glass"
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              required
            />
          </div>
          
          <Button type="submit" variant="glass" className="w-full">
            Send Message
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}`,
                },
                preview: React.createElement('div', { className: 'p-4' }, 'Contact Form Preview'),
                designTokens: [
                    'colors.glass.light.primary',
                    'borderRadius.lg',
                    'spacing.4',
                    'shadows.focus.medium',
                ],
                relatedExamples: ['login-form', 'registration-form'],
                accessibility: {
                    features: [
                        'Proper form labeling',
                        'Required field indication',
                        'Error message association',
                        'Keyboard navigation',
                    ],
                    testing: [
                        'Test form submission',
                        'Verify validation messages',
                        'Check keyboard navigation',
                        'Test with screen reader',
                    ],
                },
            },
        ],
    },
];
// Example utilities
export class ExampleManager {
    constructor() {
        Object.defineProperty(this, "examples", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Map()
        });
        // Register all examples
        exampleCollections.forEach(collection => {
            collection.examples.forEach(example => {
                this.examples.set(example.id, example);
            });
        });
    }
    getExample(id) {
        return this.examples.get(id);
    }
    getExamplesByCategory(category) {
        return Array.from(this.examples.values()).filter(example => example.category === category);
    }
    getExamplesByDifficulty(difficulty) {
        return Array.from(this.examples.values()).filter(example => example.difficulty === difficulty);
    }
    getExamplesByTag(tag) {
        return Array.from(this.examples.values()).filter(example => example.tags.includes(tag));
    }
    searchExamples(query) {
        const lowercaseQuery = query.toLowerCase();
        return Array.from(this.examples.values()).filter(example => example.title.toLowerCase().includes(lowercaseQuery) ||
            example.description.toLowerCase().includes(lowercaseQuery) ||
            example.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)));
    }
    getRelatedExamples(exampleId) {
        const example = this.getExample(exampleId);
        if (!example)
            return [];
        return example.relatedExamples
            .map(id => this.getExample(id))
            .filter(Boolean);
    }
}
// Export the example manager instance
export const exampleManager = new ExampleManager();
// Example code generators
export function generateExampleCode(example) {
    let code = example.code.tsx;
    if (example.code.css) {
        code += `

/* CSS */
${example.code.css}`;
    }
    if (example.code.config) {
        code += `

/* Configuration */
${example.code.config}`;
    }
    return code;
}
export function generateExampleMarkdown(example) {
    return `# ${example.title}

${example.description}

**Category:** ${example.category}  
**Difficulty:** ${example.difficulty}  
**Tags:** ${example.tags.join(', ')}

## Code

\`\`\`tsx
${example.code.tsx}
\`\`\`

## Design Tokens Used

${example.designTokens.map(token => `- \`${token}\``).join('\n')}

${example.accessibility ? `
## Accessibility Features

${example.accessibility.features.map(feature => `- ${feature}`).join('\n')}

## Testing Checklist

${example.accessibility.testing.map(test => `- [ ] ${test}`).join('\n')}
` : ''}

${example.notes ? `
## Notes

${example.notes.map(note => `- ${note}`).join('\n')}
` : ''}

## Related Examples

${example.relatedExamples.map(id => `- [${id}](#${id})`).join('\n')}
`;
}
// Export utilities
export const exampleUtils = {
    manager: exampleManager,
    collections: exampleCollections,
    generateCode: generateExampleCode,
    generateMarkdown: generateExampleMarkdown,
};

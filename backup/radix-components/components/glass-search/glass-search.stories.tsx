import type { Meta, StoryObj } from "@storybook/react";
import { Book, Clock, Search, TrendingUp, User } from "lucide-react";
import { useState } from "react";
import { GlassSearch, type SearchSuggestion } from "./glass-search";

const meta = {
  title: "Components/Forms/GlassSearch",
  component: GlassSearch,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A premium search component with advanced glassmorphism effects, intelligent suggestions, and fluid interactions.

## Features

- **Smart Suggestions**: Dynamic filtering with recent searches and trending items
- **Multiple Result Types**: Recent searches, suggestions, and trending results
- **Keyboard Navigation**: Full arrow key and keyboard shortcut support
- **Glass Effects**: Beautiful backdrop blur and glassmorphism design
- **Loading States**: Built-in loading indicators and empty states
- **Accessibility**: Full ARIA support and screen reader compatibility
- **Customizable**: Configurable suggestion limits and display options

## Usage

\`\`\`tsx
import { GlassSearch } from '@/components/glass-search';

// Basic usage
<GlassSearch
  placeholder="Search products..."
  onSearch={(query) => console.log('Search:', query)} />

// With suggestions and recent searches
<GlassSearch
  placeholder="Search..."
  suggestions={suggestions}
  recentSearches={recentSearches}
  onSearch={handleSearch}
  onSuggestionClick={handleSuggestionClick}
  maxSuggestions={8} />
\`\`\`

## Keyboard Shortcuts

- **Arrow Down/Up**: Navigate through suggestions
- **Enter**: Select current suggestion or search
- **Escape**: Close dropdown and blur input
- **Tab**: Navigate away from search

## Accessibility

The search component follows WAI-ARIA guidelines:
- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader announcements
- Focus management
- Result announcements
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    // Core Props
    placeholder: {
      control: "text",
      description: "Placeholder text for the search input",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "Search..." },
        category: "Core",
      },
    },
    onSearch: {
      action: "search performed",
      description: "Callback fired when search is performed",
      table: {
        type: { summary: "(query: string) => void" },
        category: "Core",
      },
    },
    onSuggestionClick: {
      action: "suggestion clicked",
      description: "Callback fired when a suggestion is clicked",
      table: {
        type: { summary: "(suggestion: SearchSuggestion) => void" },
        category: "Core",
      },
    },

    // Configuration
    maxSuggestions: {
      control: { type: "number", min: 1, max: 20, step: 1 },
      description: "Maximum number of suggestions to display",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "8" },
        category: "Configuration",
      },
    },
    showTrending: {
      control: "boolean",
      description: "Show trending suggestions",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
        category: "Configuration",
      },
    },

    // Data
    suggestions: {
      control: "object",
      description: "Array of search suggestions",
      table: {
        type: { summary: "Array<SearchSuggestion>" },
        category: "Data",
      },
    },
    recentSearches: {
      control: "object",
      description: "Array of recent search terms",
      table: {
        type: { summary: "Array<string>" },
        category: "Data",
      },
    },

    // HTML Props
    className: {
      control: "text",
      description: "Additional CSS classes",
      table: {
        type: { summary: "string" },
        category: "HTML Props",
      },
    },
  },
  args: {
    placeholder: "Search...",
    maxSuggestions: 8,
    showTrending: true,
    suggestions: [],
    recentSearches: [],
  },
} satisfies Meta<typeof GlassSearch>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data for stories
const sampleSuggestions: Array<SearchSuggestion> = [
  {
    id: "1",
    text: "React components",
    type: "suggestion",
    category: "Development",
    count: 1250,
  },
  {
    id: "2",
    text: "TypeScript tutorial",
    type: "suggestion",
    category: "Learning",
    count: 892,
  },
  {
    id: "3",
    text: "Tailwind CSS",
    type: "trending",
    category: "Styling",
    count: 2340,
  },
  {
    id: "4",
    text: "Next.js 15",
    type: "trending",
    category: "Framework",
    count: 1876,
  },
  {
    id: "5",
    text: "Storybook setup",
    type: "suggestion",
    category: "Tools",
    count: 567,
  },
  {
    id: "6",
    text: "Framer Motion",
    type: "suggestion",
    category: "Animation",
    count: 734,
  },
  {
    id: "7",
    text: "Glass morphism",
    type: "trending",
    category: "Design",
    count: 445,
  },
  {
    id: "8",
    text: "React hooks",
    type: "suggestion",
    category: "Development",
    count: 3210,
  },
  {
    id: "9",
    text: "CSS Grid",
    type: "suggestion",
    category: "Styling",
    count: 1567,
  },
  {
    id: "10",
    text: "JavaScript ES2024",
    type: "trending",
    category: "Language",
    count: 987,
  },
];

const sampleRecentSearches = [
  "React best practices",
  "TypeScript interfaces",
  "CSS animations",
  "Node.js API",
  "Git workflow",
];

// Default story - Interactive playground
export const Playground: Story = {
  args: {
    suggestions: sampleSuggestions,
    recentSearches: sampleRecentSearches,
  },
  render: (args) => (
    <div className="flex min-h-[400px] w-full max-w-md items-start justify-center pt-8">
      <GlassSearch {...args} />
    </div>
  ),
};

// Basic usage
export const BasicUsage: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="font-medium text-sm text-blue-900/80">
          Simple Search
        </h3>
        <GlassSearch
          placeholder="Type to search..."
          onSearch={(query) => console.log("Search:", query)}
        />
      </div>

      <div className="space-y-4">
        <h3 className="font-medium text-sm text-blue-900/80">
          With Recent Searches
        </h3>
        <GlassSearch
          placeholder="Search products..."
          recentSearches={["iPhone 15", "MacBook Pro", "AirPods"]}
          onSearch={(query) => console.log("Search:", query)}
        />
      </div>

      <div className="space-y-4">
        <h3 className="font-medium text-sm text-blue-900/80">
          With Suggestions
        </h3>
        <GlassSearch
          placeholder="Search documentation..."
          suggestions={sampleSuggestions.slice(0, 5)}
          onSearch={(query) => console.log("Search:", query)}
        />
      </div>
    </div>
  ),
  parameters: {
    backgrounds: {
      default: "glass-light",
      values: [
        {
          name: "glass-light",
          value:
            "radial-gradient(80rem 60rem at 20% 20%, rgba(162, 210, 255, 0.3), transparent 60%), radial-gradient(80rem 60rem at 80% 30%, rgba(255, 183, 248, 0.28), transparent 60%), linear-gradient(135deg, #c9e7ff 0%, #d9d0ff 45%, #ffc9dc 100%)",
        },
      ],
    },
  },
};

// Different suggestion types
export const SuggestionTypes: Story = {
  render: () => {
    const categorizedSuggestions: Array<SearchSuggestion> = [
      // Recent
      { id: "r1", text: "React components", type: "recent" },
      { id: "r2", text: "TypeScript guide", type: "recent" },

      // Trending
      {
        id: "t1",
        text: "AI and Machine Learning",
        type: "trending",
        category: "Technology",
        count: 5432,
      },
      {
        id: "t2",
        text: "Web3 Development",
        type: "trending",
        category: "Blockchain",
        count: 3210,
      },
      {
        id: "t3",
        text: "Sustainable Design",
        type: "trending",
        category: "Design",
        count: 2876,
      },

      // Regular suggestions
      {
        id: "s1",
        text: "JavaScript Frameworks",
        type: "suggestion",
        category: "Development",
        count: 4321,
      },
      {
        id: "s2",
        text: "UI/UX Best Practices",
        type: "suggestion",
        category: "Design",
        count: 2654,
      },
      {
        id: "s3",
        text: "Cloud Architecture",
        type: "suggestion",
        category: "Infrastructure",
        count: 1987,
      },
    ];

    return (
      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="font-medium text-sm text-blue-900/80">
            Mixed Suggestion Types
          </h3>
          <p className="text-sm text-blue-900/60">
            Shows recent searches, trending topics, and regular suggestions
          </p>
          <GlassSearch
            placeholder="Search topics..."
            suggestions={categorizedSuggestions}
            recentSearches={["React hooks", "CSS Grid"]}
            maxSuggestions={10}
          />
        </div>

        <div className="rounded-lg border border-blue-500 bg-blue-500 p-4 dark:border-blue-500 dark:bg-blue-500/20">
          <h4 className="mb-2 font-medium text-blue-900 dark:text-blue-900">
            Suggestion Types
          </h4>
          <ul className="space-y-1 text-blue-900 text-sm dark:text-blue-900">
            <li>
              <Clock className="mr-2 inline h-3 w-3" />
              Recent: Previously searched items
            </li>
            <li>
              <TrendingUp className="mr-2 inline h-3 w-3" />
              Trending: Popular current topics
            </li>
            <li>
              <Search className="mr-2 inline h-3 w-3" />
              Suggestions: Curated recommendations
            </li>
          </ul>
        </div>
      </div>
    );
  },
  parameters: {
    backgrounds: {
      default: "glass-light",
      values: [
        {
          name: "glass-light",
          value:
            "radial-gradient(80rem 60rem at 20% 20%, rgba(162, 210, 255, 0.3), transparent 60%), radial-gradient(80rem 60rem at 80% 30%, rgba(255, 183, 248, 0.28), transparent 60%), linear-gradient(135deg, #c9e7ff 0%, #d9d0ff 45%, #ffc9dc 100%)",
        },
      ],
    },
  },
};

// Loading and empty states
export const LoadingAndEmptyStates: Story = {
  render: () => {
    const [isLoading, setIsLoading] = useState(false);
    const [searchResults, setSearchResults] = useState<Array<SearchSuggestion>>(
      [],
    );

    const handleSearch = async (query: string) => {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        if (query.toLowerCase().includes("no results")) {
          setSearchResults([]);
        } else {
          setSearchResults(
            sampleSuggestions.filter((s) =>
              s.text.toLowerCase().includes(query.toLowerCase()),
            ),
          );
        }
        setIsLoading(false);
      }, 1000);
    };

    return (
      <div className="space-y-8">
        <div className="space-y-4">
          <h3 className="font-medium text-sm text-blue-900/80">
            Interactive Search
          </h3>
          <p className="text-sm text-blue-900/60">
            Try searching "React" or "no results" to see different states
          </p>
          <GlassSearch
            placeholder="Search with loading states..."
            suggestions={searchResults}
            onSearch={handleSearch}
            maxSuggestions={6}
          />
          {isLoading && (
            <div className="flex items-center gap-2 text-sm text-blue-900/60">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-300/20 border-t-white/60" />
              Searching...
            </div>
          )}
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-sm text-blue-900/80">
            Empty State
          </h3>
          <GlassSearch
            placeholder="Search for something that doesn't exist..."
            suggestions={[]}
            recentSearches={[]}
          />
        </div>
      </div>
    );
  },
  parameters: {
    backgrounds: {
      default: "glass-light",
      values: [
        {
          name: "glass-light",
          value:
            "radial-gradient(80rem 60rem at 20% 20%, rgba(162, 210, 255, 0.3), transparent 60%), radial-gradient(80rem 60rem at 80% 30%, rgba(255, 183, 248, 0.28), transparent 60%), linear-gradient(135deg, #c9e7ff 0%, #d9d0ff 45%, #ffc9dc 100%)",
        },
      ],
    },
  },
};

// Real-world examples
export const RealWorldExamples: Story = {
  render: () => {
    const ecommerceSuggestions: Array<SearchSuggestion> = [
      {
        id: "e1",
        text: "iPhone 15 Pro",
        type: "trending",
        category: "Electronics",
        count: 8765,
      },
      {
        id: "e2",
        text: "MacBook Air M3",
        type: "suggestion",
        category: "Computers",
        count: 5432,
      },
      {
        id: "e3",
        text: "AirPods Pro 2",
        type: "suggestion",
        category: "Audio",
        count: 4321,
      },
      {
        id: "e4",
        text: "iPad Pro 12.9",
        type: "trending",
        category: "Tablets",
        count: 3210,
      },
      {
        id: "e5",
        text: "Apple Watch Series 9",
        type: "suggestion",
        category: "Wearables",
        count: 2876,
      },
    ];

    const documentationSuggestions: Array<SearchSuggestion> = [
      {
        id: "d1",
        text: "Getting Started",
        type: "suggestion",
        category: "Guides",
      },
      {
        id: "d2",
        text: "API Reference",
        type: "suggestion",
        category: "Documentation",
      },
      {
        id: "d3",
        text: "Component Props",
        type: "trending",
        category: "Components",
      },
      {
        id: "d4",
        text: "Styling Guide",
        type: "suggestion",
        category: "Theming",
      },
      {
        id: "d5",
        text: "Migration Guide",
        type: "suggestion",
        category: "Guides",
      },
    ];

    const socialSuggestions: Array<SearchSuggestion> = [
      { id: "s1", text: "John Smith", type: "suggestion", category: "People" },
      {
        id: "s2",
        text: "#WebDevelopment",
        type: "trending",
        category: "Hashtags",
        count: 12540,
      },
      {
        id: "s3",
        text: "Tech Conference 2024",
        type: "trending",
        category: "Events",
        count: 8900,
      },
      {
        id: "s4",
        text: "Sarah Johnson",
        type: "suggestion",
        category: "People",
      },
      {
        id: "s5",
        text: "#JavaScript",
        type: "trending",
        category: "Hashtags",
        count: 45670,
      },
    ];

    return (
      <div className="space-y-12">
        <div className="space-y-4">
          <h3 className="font-medium text-sm text-blue-900/80">
            E-commerce Search
          </h3>
          <div className="rounded-xl border border-blue-300/10 bg-blue-100/5 p-6 backdrop-blur-sm">
            <div className="mb-4 flex items-center gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/20">
                <Search className="h-4 w-4 text-blue-900" />
              </div>
              <div>
                <div className="font-medium text-blue-900/90">
                  Product Search
                </div>
                <div className="text-sm text-blue-900/60">
                  Search millions of products
                </div>
              </div>
            </div>
            <GlassSearch
              placeholder="Search products, brands, categories..."
              suggestions={ecommerceSuggestions}
              recentSearches={["MacBook", "iPhone case", "wireless charger"]}
              maxSuggestions={6}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-sm text-blue-900/80">
            Documentation Search
          </h3>
          <div className="rounded-xl border border-blue-300/10 bg-blue-100/5 p-6 backdrop-blur-sm">
            <div className="mb-4 flex items-center gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/20">
                <Book className="h-4 w-4 text-blue-900" />
              </div>
              <div>
                <div className="font-medium text-blue-900/90">
                  Documentation
                </div>
                <div className="text-sm text-blue-900/60">
                  Find guides, APIs, and examples
                </div>
              </div>
            </div>
            <GlassSearch
              placeholder="Search documentation..."
              suggestions={documentationSuggestions}
              recentSearches={["installation", "hooks", "theming"]}
              maxSuggestions={8}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-sm text-blue-900/80">
            Social Platform Search
          </h3>
          <div className="rounded-xl border border-blue-300/10 bg-blue-100/5 p-6 backdrop-blur-sm">
            <div className="mb-4 flex items-center gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/20">
                <User className="h-4 w-4 text-blue-900" />
              </div>
              <div>
                <div className="font-medium text-blue-900/90">
                  Social Search
                </div>
                <div className="text-sm text-blue-900/60">
                  Find people, posts, and hashtags
                </div>
              </div>
            </div>
            <GlassSearch
              placeholder="Search people, hashtags, posts..."
              suggestions={socialSuggestions}
              recentSearches={["@username", "#react", "conference"]}
              maxSuggestions={7}
            />
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    backgrounds: {
      default: "glass-light",
      values: [
        {
          name: "glass-light",
          value:
            "radial-gradient(80rem 60rem at 20% 20%, rgba(162, 210, 255, 0.3), transparent 60%), radial-gradient(80rem 60rem at 80% 30%, rgba(255, 183, 248, 0.28), transparent 60%), linear-gradient(135deg, #c9e7ff 0%, #d9d0ff 45%, #ffc9dc 100%)",
        },
      ],
    },
  },
};

// Accessibility showcase
export const AccessibilityShowcase: Story = {
  render: () => {
    const [selectedSuggestion, setSelectedSuggestion] = useState<string>("");

    return (
      <div className="space-y-6">
        <div className="rounded-lg border border-blue-500 bg-blue-500 p-4 dark:border-blue-500 dark:bg-blue-500/20">
          <h4 className="mb-2 font-medium text-blue-900 dark:text-blue-900">
            Accessibility Features
          </h4>
          <ul className="space-y-1 text-blue-900 text-sm dark:text-blue-900">
            <li>• Full keyboard navigation (Arrow keys, Enter, Escape)</li>
            <li>• ARIA labels and roles for screen readers</li>
            <li>• Focus management and visible focus indicators</li>
            <li>• Search result announcements</li>
            <li>• Suggestion type indicators</li>
          </ul>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-blue-900/60">
            Try navigating with keyboard: Tab to focus, Arrow keys to navigate
            suggestions, Enter to select
          </p>
          <GlassSearch
            placeholder="Accessible search example..."
            suggestions={sampleSuggestions}
            recentSearches={sampleRecentSearches}
            onSuggestionClick={(suggestion) => {
              setSelectedSuggestion(suggestion.text);
            }}
            maxSuggestions={6}
          />
        </div>

        {selectedSuggestion && (
          <div className="rounded-lg border border-blue-500 bg-blue-500 p-4 dark:border-blue-500 dark:bg-blue-500/20">
            <h4 className="mb-1 font-medium text-blue-900 dark:text-blue-900">
              Selected Suggestion
            </h4>
            <p className="text-blue-900 text-sm dark:text-blue-900">
              You selected: "{selectedSuggestion}"
            </p>
          </div>
        )}

        <div className="rounded-lg border border-blue-200 bg-blue-100 p-4 dark:border-blue-200 dark:bg-blue-100">
          <h4 className="mb-2 font-medium text-blue-900 dark:text-blue-900">
            Screen Reader Support
          </h4>
          <div className="space-y-2 text-blue-900 text-sm dark:text-blue-900">
            <p>Search input: "Search suggestions, edit text"</p>
            <p>Suggestions: "X suggestions available"</p>
            <p>Navigation: "Suggestion X of Y, [suggestion text]"</p>
            <p>Selection: "[suggestion text] selected"</p>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    backgrounds: {
      default: "glass-light",
      values: [
        {
          name: "glass-light",
          value:
            "radial-gradient(80rem 60rem at 20% 20%, rgba(162, 210, 255, 0.3), transparent 60%), radial-gradient(80rem 60rem at 80% 30%, rgba(255, 183, 248, 0.28), transparent 60%), linear-gradient(135deg, #c9e7ff 0%, #d9d0ff 45%, #ffc9dc 100%)",
        },
      ],
    },
  },
};

// Theme showcase
export const ThemeShowcase: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="font-medium text-sm text-blue-900/80">
          Ocean Theme
        </h3>
        <div className="rounded-xl bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-500 p-8">
          <GlassSearch
            placeholder="Search the depths..."
            suggestions={sampleSuggestions.slice(0, 4)}
            recentSearches={["ocean life", "marine biology"]}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium text-sm text-blue-900/80">
          Sunset Theme
        </h3>
        <div className="rounded-xl bg-gradient-to-r from-orange-400 via-red-400 to-pink-500 p-8">
          <GlassSearch
            placeholder="Discover something new..."
            suggestions={sampleSuggestions.slice(2, 6)}
            recentSearches={["sunset photography", "golden hour"]}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium text-sm text-blue-900/80">
          Forest Theme
        </h3>
        <div className="rounded-xl bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 p-8">
          <GlassSearch
            placeholder="Explore nature..."
            suggestions={sampleSuggestions.slice(4, 8)}
            recentSearches={["forest trails", "wildlife"]}
          />
        </div>
      </div>
    </div>
  ),
};

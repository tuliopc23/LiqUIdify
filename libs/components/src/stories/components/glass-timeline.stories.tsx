import type { Meta, StoryObj } from '@storybook/react';
import { Code, Rocket, Star, Target, Trophy, Users } from 'lucide-react';
import React from 'react';
import { GlassButton } from '@/components/glass-button-refactored/glass-button';
import { GlassCard } from '@/components/glass-card-refactored/glass-card';
import {
  GlassTimeline,
  type TimelineItem,
} from '@/components/glass-timeline/glass-timeline';

const meta = {
  title: 'Components/Glass Timeline',
  component: GlassTimeline,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A timeline component for displaying chronological events with glassmorphism design. Supports vertical and horizontal layouts, alternating patterns, and custom content.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      description: 'Timeline orientation',
      control: { type: 'select' },
      options: ['vertical', 'horizontal'],
    },
    alternating: {
      description: 'Alternate item positions (vertical only)',
      control: { type: 'boolean' },
    },
    items: {
      description: 'Timeline items to display',
      control: false,
    },
  },
} satisfies Meta<typeof GlassTimeline>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleItems: TimelineItem[] = [
  {
    id: '1',
    title: 'Project Started',
    description: 'Initial planning and setup',
    date: 'January 2024',
    status: 'completed',
  },
  {
    id: '2',
    title: 'Development Phase',
    description: 'Core features implementation',
    date: 'March 2024',
    status: 'completed',
  },
  {
    id: '3',
    title: 'Beta Release',
    description: 'Testing with early adopters',
    date: 'June 2024',
    status: 'active',
  },
  {
    id: '4',
    title: 'Official Launch',
    description: 'Public release scheduled',
    date: 'September 2024',
    status: 'pending',
  },
];

export const Default: Story = {
  args: {
    items: sampleItems,
    orientation: 'vertical',
  },
};

export const HorizontalTimeline: Story = {
  args: {
    items: sampleItems,
    orientation: 'horizontal',
  },
  parameters: {
    docs: {
      description: {
        story: 'Timeline with horizontal layout, ideal for process flows',
      },
    },
  },
};

export const AlternatingLayout: Story = {
  args: {
    items: sampleItems,
    orientation: 'vertical',
    alternating: true,
  },
  render: (args) => (
    <div className="max-w-4xl mx-auto">
      <GlassTimeline {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Vertical timeline with alternating left/right positioning',
      },
    },
  },
};

export const WithCustomIcons: Story = {
  args: {
    items: [
      {
        id: '1',
        title: 'Ideation',
        description: 'Brainstorming and concept development',
        date: 'Week 1',
        status: 'completed',
        icon: <Rocket className="h-4 w-4" />,
      },
      {
        id: '2',
        title: 'Planning',
        description: 'Setting goals and milestones',
        date: 'Week 2-3',
        status: 'completed',
        icon: <Target className="h-4 w-4" />,
      },
      {
        id: '3',
        title: 'Execution',
        description: 'Building and iterating',
        date: 'Week 4-8',
        status: 'active',
        icon: <Code className="h-4 w-4" />,
      },
      {
        id: '4',
        title: 'Launch',
        description: 'Go live and celebrate',
        date: 'Week 10',
        status: 'pending',
        icon: <Trophy className="h-4 w-4" />,
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Timeline with custom icons for each milestone',
      },
    },
  },
};

export const WithRichContent: Story = {
  args: {
    items: [
      {
        id: '1',
        title: 'Q1 2024 Review',
        date: 'March 31, 2024',
        status: 'completed',
        content: (
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-[var(--text-secondary)]">
                Revenue
              </span>
              <span className="font-bold text-green-400">+25%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-[var(--text-secondary)]">
                Users
              </span>
              <span className="font-bold text-blue-400">10.5K</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-[var(--text-secondary)]">
                Engagement
              </span>
              <span className="font-bold text-purple-400">87%</span>
            </div>
          </div>
        ),
      },
      {
        id: '2',
        title: 'Product Update 2.0',
        date: 'April 15, 2024',
        status: 'completed',
        content: (
          <div className="space-y-2">
            <p className="text-sm text-[var(--text-secondary)]">
              Major features released:
            </p>
            <ul className="text-sm space-y-1">
              <li>• New dashboard UI</li>
              <li>• Advanced analytics</li>
              <li>• API v2 endpoints</li>
              <li>• Mobile app beta</li>
            </ul>
            <GlassButton size="sm" variant="primary" className="mt-3">
              View Release Notes
            </GlassButton>
          </div>
        ),
      },
      {
        id: '3',
        title: 'Team Expansion',
        date: 'May 1, 2024',
        status: 'active',
        icon: <Users className="h-4 w-4" />,
        content: (
          <div className="text-center py-4">
            <p className="text-3xl font-bold mb-2">15 → 25</p>
            <p className="text-sm text-[var(--text-secondary)]">Team members</p>
          </div>
        ),
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Timeline items with rich custom content',
      },
    },
  },
};

export const ProjectRoadmap: Story = {
  render: () => {
    const roadmapItems: TimelineItem[] = [
      {
        id: 'phase1',
        title: 'Foundation',
        description: 'Core infrastructure and basic features',
        date: 'Q1 2024',
        status: 'completed',
        icon: <Star className="h-4 w-4" />,
      },
      {
        id: 'phase2',
        title: 'Enhancement',
        description: 'Advanced features and optimizations',
        date: 'Q2 2024',
        status: 'completed',
      },
      {
        id: 'phase3',
        title: 'Expansion',
        description: 'New markets and integrations',
        date: 'Q3 2024',
        status: 'active',
      },
      {
        id: 'phase4',
        title: 'Innovation',
        description: 'AI features and automation',
        date: 'Q4 2024',
        status: 'pending',
      },
      {
        id: 'phase5',
        title: 'Scale',
        description: 'Global rollout and enterprise features',
        date: 'Q1 2025',
        status: 'pending',
      },
    ];

    return (
      <div className="space-y-6">
        <GlassCard className="p-6">
          <h2 className="text-2xl font-bold mb-2">Product Roadmap</h2>
          <p className="text-[var(--text-secondary)]">
            Our journey to building the future
          </p>
        </GlassCard>

        <GlassTimeline items={roadmapItems} alternating />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Product roadmap visualization using timeline',
      },
    },
  },
};

export const InteractiveTimeline: Story = {
  render: () => {
    const [selectedItem, setSelectedItem] = React.useState<string | null>(null);

    const interactiveItems: TimelineItem[] = sampleItems.map((item) => ({
      ...item,
      content: (
        <div
          className="cursor-pointer hover:bg-white/5 p-3 rounded-lg transition-colors"
          onClick={() => setSelectedItem(item.id)}
        >
          <p className="text-sm">Click for more details</p>
        </div>
      ),
    }));

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-bold mb-4">Timeline</h3>
          <GlassTimeline items={interactiveItems} />
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4">Details</h3>
          <GlassCard className="p-6">
            {selectedItem ? (
              <div>
                <h4 className="font-bold mb-2">
                  {sampleItems.find((i) => i.id === selectedItem)?.title}
                </h4>
                <p className="text-[var(--text-secondary)]">
                  {sampleItems.find((i) => i.id === selectedItem)?.description}
                </p>
                <p className="text-sm mt-4">
                  Date: {sampleItems.find((i) => i.id === selectedItem)?.date}
                </p>
              </div>
            ) : (
              <p className="text-[var(--text-secondary)]">
                Click a timeline item to view details
              </p>
            )}
          </GlassCard>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive timeline with click events',
      },
    },
  },
};

export const CompactTimeline: Story = {
  args: {
    items: [
      { id: '1', title: 'Started', status: 'completed' },
      { id: '2', title: 'In Progress', status: 'active' },
      { id: '3', title: 'Review', status: 'pending' },
      { id: '4', title: 'Complete', status: 'pending' },
    ],
    orientation: 'horizontal',
  },
  render: (args) => (
    <div className="max-w-md">
      <GlassTimeline {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Compact timeline for simple progress tracking',
      },
    },
  },
};

export const DarkModeTimeline: Story = {
  args: {
    items: sampleItems,
    alternating: true,
  },
  render: (args) => (
    <div className="dark min-h-[400px] bg-gray-900 p-8 rounded-lg">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">
        Dark Mode Timeline
      </h2>
      <GlassTimeline {...args} />
    </div>
  ),
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        story: 'Timeline component in dark mode',
      },
    },
  },
};

import type { Meta, StoryObj } from "@storybook/react";
import { GlassTimeline } from "./";

const meta: Meta<typeof GlassTimeline> = {
  title: "Components/GlassTimeline",
  component: GlassTimeline,
  tags: ["autodocs"],
};
export default meta;

export const Basic: StoryObj<typeof GlassTimeline> = {
  args: {
    items: [
      {
        id: "1",
        title: "Planning",
        description: "Initial planning phase",
        status: "completed",
      },
      {
        id: "2",
        title: "Design",
        description: "Design & prototyping",
        status: "active",
      },
      {
        id: "3",
        title: "Development",
        description: "Implementation stage",
        status: "pending",
      },
    ],
  },
};

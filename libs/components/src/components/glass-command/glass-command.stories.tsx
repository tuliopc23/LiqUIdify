import { FileText, Hash, Search, Settings, User, Zap } from "lucide-react";
import { CommandPalette } from "./glass-command";
import "@/styles/apple-liquid-authentic.css";

const sampleCommands = [
  {
    id: "settings",
    label: "Open Settings",
    description: "Access application settings and preferences",
    icon: <Settings className="h-4 w-4" />,
    shortcut: ["cmd", "s"],
    category: "System",
    action: () => console.log("Settings opened"),
    keywords: ["preferences", "config", "options"],
  },
  {
    id: "profile",
    label: "Edit Profile",
    description: "Update your user profile information",
    icon: <User className="h-4 w-4" />,
    shortcut: ["cmd", "p"],
    category: "User",
    action: () => console.log("Profile opened"),
    keywords: ["account", "avatar", "details"],
  },
  {
    id: "search",
    label: "Search Files",
    description: "Search through your files and documents",
    icon: <Search className="h-4 w-4" />,
    shortcut: ["cmd", "f"],
    category: "Files",
    action: () => console.log("Search opened"),
    keywords: ["find", "locate", "documents"],
  },
  {
    id: "new-file",
    label: "New File",
    description: "Create a new file or document",
    icon: <FileText className="h-4 w-4" />,
    shortcut: ["cmd", "n"],
    category: "Files",
    action: () => console.log("New file created"),
    keywords: ["create", "document", "blank"],
  },
  {
    id: "quick-actions",
    label: "Quick Actions",
    description: "Access frequently used actions",
    icon: <Zap className="h-4 w-4" />,
    shortcut: ["cmd", "q"],
    category: "System",
    action: () => console.log("Quick actions opened"),
    keywords: ["fast", "shortcut", "actions"],
  },
  {
    id: "hashtags",
    label: "Manage Hashtags",
    description: "Organize and manage your hashtags",
    icon: <Hash className="h-4 w-4" />,
    shortcut: ["cmd", "h"],
    category: "Content",
    action: () => console.log("Hashtags opened"),
    keywords: ["tags", "categories", "organize"],
  },
];

export default {
  title: "Components/GlassCommand",
  component: CommandPalette,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A command palette component with Liquid Glass styling for consistent Apple-inspired UI.",
      },
    },
  },
};

export const Playground = () => (
  <div className="apple-glass mx-auto max-w-md p-8">
    <CommandPalette items={sampleCommands} />
  </div>
);

export const EdgeCases = () => (
  <div className="apple-glass mx-auto max-w-md space-y-6 p-8">
    <div>
      <h3 className="mb-2 text-white">Empty Commands</h3>
      <CommandPalette items={[]} placeholder="No commands available..." />
    </div>
    <div>
      <h3 className="mb-2 text-white">Custom Shortcut</h3>
      <CommandPalette
        items={sampleCommands}
        shortcut={["ctrl", "shift", "p"]}
        placeholder="Custom shortcut: Ctrl+Shift+P"
      />
    </div>
  </div>
);

export const Categories = () => (
  <div className="apple-glass mx-auto max-w-md p-8">
    <CommandPalette
      items={sampleCommands}
      placeholder="Commands are organized by category..."
    />
  </div>
);

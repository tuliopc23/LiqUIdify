interface SidebarItem {
  id: string;
  label: string;
  category: string;
}

const sidebarItems: Array<SidebarItem> = [
  { id: 'introduction', label: 'Introduction', category: 'Getting Started' },
  { id: 'installation', label: 'Installation', category: 'Getting Started' },
  { id: 'theming', label: 'Theming', category: 'Getting Started' },

  // Form Components
  { id: 'button', label: 'Button', category: 'Form Controls' },
  { id: 'input', label: 'Input', category: 'Form Controls' },
  { id: 'textarea', label: 'Textarea', category: 'Form Controls' },
  { id: 'select', label: 'Select', category: 'Form Controls' },
  { id: 'checkbox', label: 'Checkbox', category: 'Form Controls' },
  { id: 'switch', label: 'Switch', category: 'Form Controls' },
  { id: 'slider', label: 'Slider', category: 'Form Controls' },

  // Display Components
  { id: 'badge', label: 'Badge', category: 'Display' },
  { id: 'avatar', label: 'Avatar', category: 'Display' },
  { id: 'progress', label: 'Progress', category: 'Display' },
  { id: 'loading', label: 'Loading', category: 'Display' },

  // Layout Components
  { id: 'card', label: 'Card', category: 'Layout' },
  { id: 'modal', label: 'Modal', category: 'Layout' },
  { id: 'tabs', label: 'Tabs', category: 'Layout' },
  { id: 'data-table', label: 'Data Table', category: 'Layout' },

  // Interactive Components
  { id: 'dropdown', label: 'Dropdown', category: 'Interactive' },
  { id: 'tooltip', label: 'Tooltip', category: 'Interactive' },
  { id: 'popover', label: 'Popover', category: 'Interactive' },
  { id: 'toast', label: 'Toast', category: 'Interactive' },

  // Examples
  { id: 'form-examples', label: 'Complete Forms', category: 'Examples' },
  { id: 'dashboard', label: 'Dashboard', category: 'Examples' },
  { id: 'portfolio', label: 'Portfolio Layout', category: 'Examples' },
];

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const categories = [...new Set(sidebarItems.map((item) => item.category))];

  return (
    <aside className="glass-effect fixed top-16 left-0 h-full w-64 overflow-y-auto border-glass border-r">
      <div className="p-6">
        <nav className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="mb-6">
              <h3 className="mb-3 font-semibold text-secondary text-xs uppercase tracking-wider">
                {category}
              </h3>

              <ul className="space-y-1">
                {sidebarItems
                  .filter((item) => item.category === category)
                  .map((item) => (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => onSectionChange(item.id)}
                        className={`sidebar-item block w-full rounded-md px-3 py-2 text-left text-sm transition-colors ${
                          activeSection === item.id ? 'active' : ''
                        }`}
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}

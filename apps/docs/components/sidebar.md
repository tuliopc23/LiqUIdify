# Sidebar

A flexible sidebar navigation component with glassmorphism effects, supporting nested navigation, collapsible sections, and multiple layout configurations.

## Overview

The `GlassSidebar` component provides a comprehensive navigation solution for complex applications, dashboards, and admin panels. It features collapsible sections, nested navigation, responsive behavior, and seamless theme integration.

## Installation

```bash
npm install liquidify
# or
bun add liquidify
```

## Basic Usage

```tsx
import { GlassSidebar } from 'liquidify';

function App() {
  return (
    <div className="flex h-screen">
      <GlassSidebar>
        <GlassSidebar.Header>
          <img src="/logo.svg" alt="Logo" className="h-8 w-8" />
          <span className="font-semibold">Dashboard</span>
        </GlassSidebar.Header>
        
        <GlassSidebar.Content>
          <GlassSidebar.Item href="/dashboard" active>
            <HomeIcon className="h-5 w-5" />
            Overview
          </GlassSidebar.Item>
          
          <GlassSidebar.Item href="/analytics">
            <ChartIcon className="h-5 w-5" />
            Analytics
          </GlassSidebar.Item>
          
          <GlassSidebar.Item href="/projects">
            <FolderIcon className="h-5 w-5" />
            Projects
          </GlassSidebar.Item>
          
          <GlassSidebar.Item href="/settings">
            <SettingsIcon className="h-5 w-5" />
            Settings
          </GlassSidebar.Item>
        </GlassSidebar.Content>
      </GlassSidebar>
      
      <main className="flex-1 p-6">
        {/* Main content */}
      </main>
    </div>
  );
}
```

## Collapsible Sidebar

```tsx
import { GlassSidebar } from 'liquidify';
import { useState } from 'react';

function CollapsibleSidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen">
      <GlassSidebar 
        collapsed={collapsed}
        width={collapsed ? "w-16" : "w-64"}
        className="transition-all duration-300"
      >
        <GlassSidebar.Header>
          <img src="/logo.svg" alt="Logo" className="h-8 w-8" />
          {!collapsed && (
            <span className="font-semibold">Dashboard</span>
          )}
          
          <GlassSidebar.CollapseToggle
            collapsed={collapsed}
            onToggle={() => setCollapsed(!collapsed)}
          />
        </GlassSidebar.Header>
        
        <GlassSidebar.Content>
          <GlassSidebar.Item href="/dashboard" active>
            <HomeIcon className="h-5 w-5" />
            {!collapsed && "Overview"}
          </GlassSidebar.Item>
          
          <GlassSidebar.Item href="/analytics">
            <ChartIcon className="h-5 w-5" />
            {!collapsed && "Analytics"}
          </GlassSidebar.Item>
        </GlassSidebar.Content>
      </GlassSidebar>
      
      <main className="flex-1">
        {/* Main content */}
      </main>
    </div>
  );
}
```

## Nested Navigation

```tsx
import { GlassSidebar } from 'liquidify';

function NestedSidebar() {
  return (
    <GlassSidebar>
      <GlassSidebar.Header>
        <span className="font-bold text-xl">Admin Panel</span>
      </GlassSidebar.Header>
      
      <GlassSidebar.Content>
        <GlassSidebar.Item href="/dashboard">
          <HomeIcon className="h-5 w-5" />
          Dashboard
        </GlassSidebar.Item>
        
        <GlassSidebar.Group>
          <GlassSidebar.GroupTitle>
            <UsersIcon className="h-5 w-5" />
            User Management
          </GlassSidebar.GroupTitle>
          
          <GlassSidebar.GroupContent>
            <GlassSidebar.Item href="/users" level={1}>
              All Users
            </GlassSidebar.Item>
            <GlassSidebar.Item href="/users/roles" level={1}>
              Roles & Permissions
            </GlassSidebar.Item>
            <GlassSidebar.Item href="/users/invitations" level={1}>
              Invitations
            </GlassSidebar.Item>
          </GlassSidebar.GroupContent>
        </GlassSidebar.Group>
        
        <GlassSidebar.Group>
          <GlassSidebar.GroupTitle>
            <CogIcon className="h-5 w-5" />
            Settings
          </GlassSidebar.GroupTitle>
          
          <GlassSidebar.GroupContent>
            <GlassSidebar.Item href="/settings/general" level={1}>
              General
            </GlassSidebar.Item>
            <GlassSidebar.Item href="/settings/security" level={1}>
              Security
            </GlassSidebar.Item>
            <GlassSidebar.Item href="/settings/billing" level={1}>
              Billing
            </GlassSidebar.Item>
          </GlassSidebar.GroupContent>
        </GlassSidebar.Group>
        
        <GlassSidebar.Separator />
        
        <GlassSidebar.Item href="/help">
          <QuestionMarkIcon className="h-5 w-5" />
          Help & Support
        </GlassSidebar.Item>
      </GlassSidebar.Content>
      
      <GlassSidebar.Footer>
        <GlassSidebar.Item href="/profile">
          <GlassAvatar src="/user.jpg" size="sm" />
          <div className="flex flex-col">
            <span className="text-sm font-medium">John Doe</span>
            <span className="text-xs text-gray-500">john@example.com</span>
          </div>
        </GlassSidebar.Item>
      </GlassSidebar.Footer>
    </GlassSidebar>
  );
}
```

## Mobile Responsive

```tsx
import { GlassSidebar, GlassOverlay } from 'liquidify';
import { useState, useEffect } from 'react';

function ResponsiveSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="flex h-screen">
      {/* Mobile Overlay */}
      {isMobile && mobileOpen && (
        <GlassOverlay
          isOpen={mobileOpen}
          onClose={() => setMobileOpen(false)}
        />
      )}
      
      {/* Mobile Menu Button */}
      {isMobile && (
        <button
          onClick={() => setMobileOpen(true)}
          className="fixed top-4 left-4 z-50 p-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg md:hidden"
        >
          <MenuIcon className="h-6 w-6" />
        </button>
      )}
      
      <GlassSidebar
        className={`
          ${isMobile 
            ? `fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 ${
                mobileOpen ? 'translate-x-0' : '-translate-x-full'
              }`
            : 'relative'
          }
        `}
      >
        <GlassSidebar.Header>
          <span className="font-bold">App</span>
          {isMobile && (
            <button
              onClick={() => setMobileOpen(false)}
              className="ml-auto p-2 hover:bg-gray-100 rounded-lg"
            >
              <XIcon className="h-5 w-5" />
            </button>
          )}
        </GlassSidebar.Header>
        
        <GlassSidebar.Content>
          <GlassSidebar.Item 
            href="/dashboard"
            onClick={() => isMobile && setMobileOpen(false)}
          >
            <HomeIcon className="h-5 w-5" />
            Dashboard
          </GlassSidebar.Item>
          
          <GlassSidebar.Item 
            href="/projects"
            onClick={() => isMobile && setMobileOpen(false)}
          >
            <FolderIcon className="h-5 w-5" />
            Projects
          </GlassSidebar.Item>
        </GlassSidebar.Content>
      </GlassSidebar>
      
      <main className={`flex-1 ${isMobile ? 'ml-0' : 'ml-64'}`}>
        {/* Main content */}
      </main>
    </div>
  );
}
```

## API Reference

### GlassSidebar

The main sidebar container component.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Sidebar content |
| `className` | `string` | - | Additional CSS classes |
| `width` | `string` | `'w-64'` | Sidebar width |
| `collapsed` | `boolean` | `false` | Collapsed state |
| `variant` | `'default' \| 'floating' \| 'transparent'` | `'default'` | Visual variant |
| `position` | `'fixed' \| 'sticky' \| 'relative'` | `'relative'` | Positioning type |

### GlassSidebar.Header

Header section of the sidebar.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Header content |
| `className` | `string` | - | Additional CSS classes |

### GlassSidebar.Content

Main content area of the sidebar.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Navigation content |
| `className` | `string` | - | Additional CSS classes |
| `scrollable` | `boolean` | `true` | Enable scrolling |

### GlassSidebar.Footer

Footer section of the sidebar.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Footer content |
| `className` | `string` | - | Additional CSS classes |

### GlassSidebar.Item

Individual navigation item.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Item content |
| `href` | `string` | - | Link URL |
| `as` | `ElementType` | `'a'` | Component element type |
| `active` | `boolean` | `false` | Active state |
| `disabled` | `boolean` | `false` | Disabled state |
| `level` | `number` | `0` | Nesting level |
| `className` | `string` | - | Additional CSS classes |
| `onClick` | `() => void` | - | Click handler |

### GlassSidebar.Group

Collapsible navigation group.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Group content |
| `defaultOpen` | `boolean` | `false` | Default open state |
| `className` | `string` | - | Additional CSS classes |

### GlassSidebar.GroupTitle

Title/trigger for navigation group.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Title content |
| `className` | `string` | - | Additional CSS classes |

### GlassSidebar.GroupContent

Collapsible content for navigation group.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Group items |
| `className` | `string` | - | Additional CSS classes |

### GlassSidebar.CollapseToggle

Toggle button for collapsing sidebar.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `collapsed` | `boolean` | `false` | Collapsed state |
| `onToggle` | `() => void` | - | Toggle handler |
| `className` | `string` | - | Additional CSS classes |

### GlassSidebar.Separator

Visual separator between navigation sections.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | Additional CSS classes |

## Styling

### CSS Variables

```css
.glass-sidebar {
  --sidebar-width: 16rem;
  --sidebar-width-collapsed: 4rem;
  --sidebar-background: rgba(255, 255, 255, 0.8);
  --sidebar-backdrop-blur: 12px;
  --sidebar-border-color: rgba(255, 255, 255, 0.2);
  --sidebar-item-hover: rgba(59, 130, 246, 0.1);
  --sidebar-item-active: rgba(59, 130, 246, 0.2);
  --sidebar-text-color: rgb(15, 23, 42);
  --sidebar-text-secondary: rgb(100, 116, 139);
}

[data-theme="dark"] .glass-sidebar {
  --sidebar-background: rgba(15, 23, 42, 0.8);
  --sidebar-border-color: rgba(255, 255, 255, 0.1);
  --sidebar-item-hover: rgba(59, 130, 246, 0.2);
  --sidebar-item-active: rgba(59, 130, 246, 0.3);
  --sidebar-text-color: rgb(248, 250, 252);
  --sidebar-text-secondary: rgb(148, 163, 184);
}
```

### Custom Styles

```tsx
// Custom width
<GlassSidebar 
  width="w-80"
  className="border-r-2 border-blue-200"
>
  {/* sidebar content */}
</GlassSidebar>

// Floating variant
<GlassSidebar 
  variant="floating"
  className="m-4 rounded-xl shadow-xl"
>
  {/* sidebar content */}
</GlassSidebar>

// Custom item styling
<GlassSidebar.Item 
  className="text-purple-600 hover:bg-purple-50 font-medium"
>
  Custom Item
</GlassSidebar.Item>
```

## Accessibility

The GlassSidebar component follows WAI-ARIA guidelines:

- **Keyboard Navigation**: Full keyboard support with Tab and arrow keys
- **Screen Readers**: Proper ARIA labels, roles, and landmarks
- **Focus Management**: Visible focus indicators and logical navigation
- **Expandable Groups**: Proper ARIA expanded states

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Tab` | Navigate between sidebar items |
| `Enter` / `Space` | Activate focused item or toggle group |
| `Arrow Up/Down` | Navigate within sidebar items |
| `Arrow Right` | Expand collapsed group |
| `Arrow Left` | Collapse expanded group |
| `Escape` | Close mobile sidebar |

## Examples

### Multi-level Navigation

```tsx
import { GlassSidebar } from 'liquidify';

function MultiLevelSidebar() {
  return (
    <GlassSidebar>
      <GlassSidebar.Header>
        <span className="font-bold">Admin</span>
      </GlassSidebar.Header>
      
      <GlassSidebar.Content>
        <GlassSidebar.Group defaultOpen>
          <GlassSidebar.GroupTitle>
            <ShoppingBagIcon className="h-5 w-5" />
            E-commerce
          </GlassSidebar.GroupTitle>
          
          <GlassSidebar.GroupContent>
            <GlassSidebar.Item href="/products" level={1}>
              Products
            </GlassSidebar.Item>
            
            <GlassSidebar.Group>
              <GlassSidebar.GroupTitle level={1}>
                <TagIcon className="h-4 w-4" />
                Categories
              </GlassSidebar.GroupTitle>
              
              <GlassSidebar.GroupContent>
                <GlassSidebar.Item href="/categories/electronics" level={2}>
                  Electronics
                </GlassSidebar.Item>
                <GlassSidebar.Item href="/categories/clothing" level={2}>
                  Clothing
                </GlassSidebar.Item>
                <GlassSidebar.Item href="/categories/books" level={2}>
                  Books
                </GlassSidebar.Item>
              </GlassSidebar.GroupContent>
            </GlassSidebar.Group>
            
            <GlassSidebar.Item href="/orders" level={1}>
              Orders
            </GlassSidebar.Item>
            <GlassSidebar.Item href="/customers" level={1}>
              Customers
            </GlassSidebar.Item>
          </GlassSidebar.GroupContent>
        </GlassSidebar.Group>
      </GlassSidebar.Content>
    </GlassSidebar>
  );
}
```

### With Search

```tsx
import { GlassSidebar, GlassInput } from 'liquidify';
import { useState, useMemo } from 'react';

function SearchableSidebar() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const allItems = [
    { title: 'Dashboard', href: '/dashboard', icon: HomeIcon },
    { title: 'Analytics', href: '/analytics', icon: ChartIcon },
    { title: 'Users', href: '/users', icon: UsersIcon },
    { title: 'Projects', href: '/projects', icon: FolderIcon },
    { title: 'Settings', href: '/settings', icon: CogIcon },
  ];
  
  const filteredItems = useMemo(() => {
    if (!searchQuery) return allItems;
    return allItems.filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <GlassSidebar>
      <GlassSidebar.Header>
        <span className="font-bold">Dashboard</span>
      </GlassSidebar.Header>
      
      <div className="p-4">
        <GlassInput
          placeholder="Search navigation..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          leftIcon={<SearchIcon className="h-4 w-4" />}
        />
      </div>
      
      <GlassSidebar.Content>
        {filteredItems.map((item) => (
          <GlassSidebar.Item key={item.href} href={item.href}>
            <item.icon className="h-5 w-5" />
            {item.title}
          </GlassSidebar.Item>
        ))}
        
        {filteredItems.length === 0 && (
          <div className="p-4 text-center text-gray-500">
            No results found
          </div>
        )}
      </GlassSidebar.Content>
    </GlassSidebar>
  );
}
```

## Best Practices

1. **Logical Grouping**: Group related items together
2. **Clear Hierarchy**: Use consistent nesting levels and visual indicators
3. **Icon Consistency**: Use a consistent icon set and sizing
4. **Mobile First**: Design for mobile and enhance for desktop
5. **Accessible Labels**: Provide clear, descriptive labels
6. **Performance**: Lazy load nested content when possible

## Related Components

- [Navbar](/components/navbar) - Horizontal navigation component
- [Breadcrumbs](/components/breadcrumbs) - Secondary navigation
- [Tabs](/components/tabs) - Content section navigation
- [Drawer](/components/drawer) - Slide-out panel component
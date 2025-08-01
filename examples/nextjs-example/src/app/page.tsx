'use client';

import { useState } from 'react';
import { 
  GlassButton, 
  GlassCard, 
  GlassInput, 
  GlassModal,
  GlassToast,
  GlassNavbar,
  GlassSidebar,
  GlassTable,
  GlassProgressBar,
  GlassSpinner,
  GlassTabs,
  GlassAccordion
} from 'liquidify';
import { 
  Bell, 
  Settings, 
  User, 
  Home, 
  BarChart3, 
  Folder,
  Search,
  Plus,
  Edit,
  Trash2,
  Download
} from 'lucide-react';

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  const tableData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive' },
  ];

  const accordionItems = [
    {
      title: 'Getting Started',
      content: 'Learn how to integrate LiqUIdify components into your Next.js application. This includes installation, basic setup, and your first component implementation.'
    },
    {
      title: 'Component Library',
      content: 'Explore our comprehensive collection of glassmorphism components including buttons, forms, navigation, and data display elements.'
    },
    {
      title: 'Advanced Usage',
      content: 'Discover advanced patterns, custom theming, performance optimization, and accessibility best practices for professional applications.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation Bar */}
      <GlassNavbar className="sticky top-0 z-50">
        <GlassNavbar.Brand href="/">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg"></div>
            <span className="font-bold text-xl">LiqUIdify</span>
          </div>
        </GlassNavbar.Brand>
        
        <GlassNavbar.Menu>
          <GlassNavbar.Item href="/" active>Dashboard</GlassNavbar.Item>
          <GlassNavbar.Item href="/analytics">Analytics</GlassNavbar.Item>
          <GlassNavbar.Item href="/projects">Projects</GlassNavbar.Item>
          <GlassNavbar.Item href="/team">Team</GlassNavbar.Item>
        </GlassNavbar.Menu>
        
        <GlassNavbar.Actions>
          <GlassButton variant="ghost" size="sm" onClick={() => setShowToast(true)}>
            <Bell className="h-4 w-4" />
          </GlassButton>
          <GlassButton variant="ghost" size="sm">
            <Settings className="h-4 w-4" />
          </GlassButton>
          <GlassButton variant="outline" size="sm">
            <User className="h-4 w-4" />
            <span className="ml-2">Profile</span>
          </GlassButton>
        </GlassNavbar.Actions>
      </GlassNavbar>

      <div className="flex">
        {/* Sidebar */}
        <GlassSidebar 
          className={`transition-all duration-300 ${sidebarCollapsed ? 'w-16' : 'w-64'}`}
          collapsed={sidebarCollapsed}
        >
          <GlassSidebar.Header>
            <h2 className={`font-semibold ${sidebarCollapsed ? 'hidden' : 'block'}`}>
              Navigation
            </h2>
            <GlassButton 
              variant="ghost" 
              size="sm"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
              ☰
            </GlassButton>
          </GlassSidebar.Header>
          
          <GlassSidebar.Content>
            <GlassSidebar.Item href="/dashboard" active>
              <Home className="h-5 w-5" />
              {!sidebarCollapsed && 'Dashboard'}
            </GlassSidebar.Item>
            
            <GlassSidebar.Item href="/analytics">
              <BarChart3 className="h-5 w-5" />
              {!sidebarCollapsed && 'Analytics'}
            </GlassSidebar.Item>
            
            <GlassSidebar.Item href="/projects">
              <Folder className="h-5 w-5" />
              {!sidebarCollapsed && 'Projects'}
            </GlassSidebar.Item>
            
            <GlassSidebar.Separator />
            
            <GlassSidebar.Group>
              <GlassSidebar.GroupTitle>
                <Settings className="h-5 w-5" />
                {!sidebarCollapsed && 'Settings'}
              </GlassSidebar.GroupTitle>
              
              <GlassSidebar.GroupContent>
                <GlassSidebar.Item href="/settings/general" level={1}>
                  {!sidebarCollapsed && 'General'}
                </GlassSidebar.Item>
                <GlassSidebar.Item href="/settings/security" level={1}>
                  {!sidebarCollapsed && 'Security'}
                </GlassSidebar.Item>
              </GlassSidebar.GroupContent>
            </GlassSidebar.Group>
          </GlassSidebar.Content>
        </GlassSidebar>

        {/* Main Content */}
        <main className="flex-1 p-6 space-y-6">
          {/* Hero Section */}
          <GlassCard className="p-8 text-center">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Welcome to LiqUIdify
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Beautiful glassmorphism components for modern web applications
            </p>
            <div className="flex justify-center space-x-4">
              <GlassButton 
                size="lg" 
                onClick={() => setIsModalOpen(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-600"
              >
                <Plus className="h-5 w-5 mr-2" />
                Get Started
              </GlassButton>
              <GlassButton variant="outline" size="lg">
                <Download className="h-5 w-5 mr-2" />
                View Documentation
              </GlassButton>
            </div>
          </GlassCard>

          {/* Search and Actions */}
          <div className="flex justify-between items-center">
            <div className="flex-1 max-w-md">
              <GlassInput
                placeholder="Search components..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search className="h-4 w-4" />}
              />
            </div>
            <div className="flex space-x-2">
              <GlassButton variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </GlassButton>
              <GlassButton variant="outline" color="red">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </GlassButton>
            </div>
          </div>

          {/* Tabs Section */}
          <GlassCard>
            <GlassTabs value={activeTab} onValueChange={setActiveTab}>
              <GlassTabs.List>
                <GlassTabs.Trigger value="overview">Overview</GlassTabs.Trigger>
                <GlassTabs.Trigger value="components">Components</GlassTabs.Trigger>
                <GlassTabs.Trigger value="examples">Examples</GlassTabs.Trigger>
              </GlassTabs.List>
              
              <GlassTabs.Content value="overview" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <GlassCard className="p-6">
                    <h3 className="text-lg font-semibold mb-2">Modern Design</h3>
                    <p className="text-gray-600">Glassmorphism effects with backdrop blur and transparency</p>
                    <GlassProgressBar value={85} className="mt-4" />
                  </GlassCard>
                  
                  <GlassCard className="p-6">
                    <h3 className="text-lg font-semibold mb-2">Accessibility</h3>
                    <p className="text-gray-600">WCAG 2.1 AA compliant with keyboard navigation</p>
                    <GlassProgressBar value={95} className="mt-4" />
                  </GlassCard>
                  
                  <GlassCard className="p-6">
                    <h3 className="text-lg font-semibold mb-2">Performance</h3>
                    <p className="text-gray-600">Optimized bundle size and runtime performance</p>
                    <GlassProgressBar value={90} className="mt-4" />
                  </GlassCard>
                </div>
              </GlassTabs.Content>
              
              <GlassTabs.Content value="components" className="mt-6">
                <GlassTable>
                  <GlassTable.Header>
                    <GlassTable.Row>
                      <GlassTable.Head>Name</GlassTable.Head>
                      <GlassTable.Head>Email</GlassTable.Head>
                      <GlassTable.Head>Role</GlassTable.Head>
                      <GlassTable.Head>Status</GlassTable.Head>
                      <GlassTable.Head>Actions</GlassTable.Head>
                    </GlassTable.Row>
                  </GlassTable.Header>
                  <GlassTable.Body>
                    {tableData.map((user) => (
                      <GlassTable.Row key={user.id}>
                        <GlassTable.Cell className="font-medium">{user.name}</GlassTable.Cell>
                        <GlassTable.Cell>{user.email}</GlassTable.Cell>
                        <GlassTable.Cell>{user.role}</GlassTable.Cell>
                        <GlassTable.Cell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            user.status === 'Active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {user.status}
                          </span>
                        </GlassTable.Cell>
                        <GlassTable.Cell>
                          <div className="flex space-x-2">
                            <GlassButton size="sm" variant="ghost">
                              <Edit className="h-3 w-3" />
                            </GlassButton>
                            <GlassButton size="sm" variant="ghost" color="red">
                              <Trash2 className="h-3 w-3" />
                            </GlassButton>
                          </div>
                        </GlassTable.Cell>
                      </GlassTable.Row>
                    ))}
                  </GlassTable.Body>
                </GlassTable>
              </GlassTabs.Content>
              
              <GlassTabs.Content value="examples" className="mt-6">
                <GlassAccordion>
                  {accordionItems.map((item, index) => (
                    <GlassAccordion.Item key={index} value={`item-${index}`}>
                      <GlassAccordion.Trigger>{item.title}</GlassAccordion.Trigger>
                      <GlassAccordion.Content>
                        <p className="text-gray-600">{item.content}</p>
                      </GlassAccordion.Content>
                    </GlassAccordion.Item>
                  ))}
                </GlassAccordion>
              </GlassTabs.Content>
            </GlassTabs>
          </GlassCard>

          {/* Loading States Demo */}
          <GlassCard className="p-6">
            <h3 className="text-lg font-semibold mb-4">Loading States</h3>
            <div className="flex items-center space-x-6">
              <GlassSpinner size="sm" />
              <GlassSpinner size="md" />
              <GlassSpinner size="lg" />
              <GlassButton loading>
                Loading Button
              </GlassButton>
            </div>
          </GlassCard>
        </main>
      </div>

      {/* Modal */}
      <GlassModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <GlassModal.Header>
          <h2 className="text-xl font-semibold">Welcome to LiqUIdify!</h2>
        </GlassModal.Header>
        
        <GlassModal.Body>
          <p className="mb-4">
            This is an example modal showcasing the beautiful glassmorphism effects 
            of LiqUIdify components. The modal features backdrop blur, transparency, 
            and smooth animations.
          </p>
          <div className="space-y-4">
            <GlassInput 
              label="Your Name"
              placeholder="Enter your name"
            />
            <GlassInput 
              label="Email"
              type="email"
              placeholder="Enter your email"
            />
          </div>
        </GlassModal.Body>
        
        <GlassModal.Footer>
          <GlassButton 
            variant="outline" 
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </GlassButton>
          <GlassButton 
            onClick={() => {
              setIsModalOpen(false);
              setShowToast(true);
            }}
          >
            Get Started
          </GlassButton>
        </GlassModal.Footer>
      </GlassModal>

      {/* Toast */}
      {showToast && (
        <GlassToast
          title="Welcome!"
          description="Thank you for trying LiqUIdify components."
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}
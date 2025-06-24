export default function ExamplesPage() {
    return (
        <div className="prose">
            <h1>Examples</h1>
            <p>
                Real-world examples and patterns for building beautiful applications with Glass UI.
                Each example includes complete code and demonstrates best practices for component usage.
            </p>

            <h2>🏗️ Layout Examples</h2>

            <h3>Dashboard Layout</h3>
            <div className="component-preview">
                <div className="min-h-64 bg-gradient-to-br from-blue-900 to-purple-900 rounded-lg p-4">
                    <div className="grid grid-cols-4 gap-4 h-full">
                        {/* Sidebar */}
                        <div className="liquid-glass rounded-lg p-4 border border-white/10">
                            <div className="space-y-3">
                                <div className="h-8 bg-white/20 rounded"></div>
                                <div className="space-y-2">
                                    <div className="h-6 bg-white/10 rounded"></div>
                                    <div className="h-6 bg-white/10 rounded"></div>
                                    <div className="h-6 bg-white/10 rounded"></div>
                                </div>
                            </div>
                        </div>
                        {/* Main Content */}
                        <div className="col-span-3 space-y-4">
                            <div className="liquid-glass rounded-lg p-4 border border-white/10 h-20"></div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="liquid-glass rounded-lg p-4 border border-white/10 h-32"></div>
                                <div className="liquid-glass rounded-lg p-4 border border-white/10 h-32"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="code-block">
                <div className="code-block-header">
                    <span className="code-block-title">Dashboard Layout</span>
                    <button className="copy-button">Copy</button>
                </div>
                <pre className="p-4 m-0"><code>{`import { GlassCard, Sidebar, GlassHeader } from 'glass-ui';

function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900">
      <div className="flex">
        <Sidebar className="w-64">
          <nav className="p-6 space-y-2">
            <GlassButton variant="ghost" className="w-full justify-start">
              📊 Dashboard
            </GlassButton>
            <GlassButton variant="ghost" className="w-full justify-start">
              👥 Users
            </GlassButton>
            <GlassButton variant="ghost" className="w-full justify-start">
              ⚙️ Settings
            </GlassButton>
          </nav>
        </Sidebar>
        
        <main className="flex-1 p-6">
          <GlassHeader className="mb-6">
            <h1 className="text-2xl font-bold">Dashboard</h1>
          </GlassHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <GlassCard className="p-6">
              <h3 className="font-semibold mb-2">Total Users</h3>
              <p className="text-3xl font-bold text-blue-400">1,234</p>
            </GlassCard>
            
            <GlassCard className="p-6">
              <h3 className="font-semibold mb-2">Revenue</h3>
              <p className="text-3xl font-bold text-green-400">$12,345</p>
            </GlassCard>
            
            <GlassCard className="p-6">
              <h3 className="font-semibold mb-2">Orders</h3>
              <p className="text-3xl font-bold text-purple-400">567</p>
            </GlassCard>
          </div>
        </main>
      </div>
    </div>
  );
}`}</code></pre>
            </div>

            <h2>📱 Interactive Examples</h2>

            <h3>Search with Live Results</h3>
            <div className="component-preview">
                <div className="max-w-md mx-auto">
                    <div className="liquid-glass rounded-xl p-4 border border-white/10">
                        <div className="flex items-center gap-3 mb-4">
                            <span>🔍</span>
                            <div className="flex-1 h-10 bg-white/10 rounded-lg border border-white/20"></div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5">
                                <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
                                <div className="flex-1">
                                    <div className="h-4 bg-white/20 rounded mb-1"></div>
                                    <div className="h-3 bg-white/10 rounded w-2/3"></div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5">
                                <div className="w-8 h-8 bg-purple-500 rounded-full"></div>
                                <div className="flex-1">
                                    <div className="h-4 bg-white/20 rounded mb-1"></div>
                                    <div className="h-3 bg-white/10 rounded w-1/2"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="code-block">
                <div className="code-block-header">
                    <span className="code-block-title">Live Search Component</span>
                    <button className="copy-button">Copy</button>
                </div>
                <pre className="p-4 m-0"><code>{`import { useState, useEffect } from 'react';
import { GlassInput, GlassCard } from 'glass-ui';

function LiveSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.length > 2) {
      setLoading(true);
      const timeoutId = setTimeout(() => {
        // Simulate API call
        setResults([
          { id: 1, name: 'John Doe', email: 'john@example.com' },
          { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
        ]);
        setLoading(false);
      }, 300);
      return () => clearTimeout(timeoutId);
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <GlassCard className="max-w-md mx-auto p-4">
      <GlassInput
        placeholder="Search users..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        leftIcon="🔍"
      />
      
      {loading && (
        <div className="mt-4 text-center">
          <GlassLoading size="sm" />
        </div>
      )}
      
      {results.length > 0 && (
        <div className="mt-4 space-y-2">
          {results.map((user) => (
            <div
              key={user.id}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer"
            >
              <GlassAvatar name={user.name} />
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-gray-400">{user.email}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </GlassCard>
  );
}`}</code></pre>
            </div>

            <h2>🎨 Animation Examples</h2>

            <h3>Magnetic Cards</h3>
            <div className="component-preview">
                <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className="liquid-glass rounded-xl p-6 border border-white/10 cursor-pointer transform transition-transform duration-200 hover:scale-105 hover:-translate-y-1"
                        >
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mb-4"></div>
                            <h3 className="font-semibold mb-2">Feature {i}</h3>
                            <p className="text-sm text-gray-400">Hover for magnetic effect</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="code-block">
                <div className="code-block-header">
                    <span className="code-block-title">Magnetic Cards</span>
                    <button className="copy-button">Copy</button>
                </div>
                <pre className="p-4 m-0"><code>{`import { useMagneticHover } from 'glass-ui';

function MagneticCard({ children }) {
  const { elementRef, transform, isHovered } = useMagneticHover(0.3, 120);
  
  return (
    <div
      ref={elementRef}
      className={cn(
        "liquid-glass rounded-xl p-6 cursor-pointer transition-all duration-300",
        isHovered && "shadow-2xl shadow-blue-500/25"
      )}
      style={{ transform }}
    >
      {children}
    </div>
  );
}

function FeatureGrid() {
  const features = [
    { title: "Fast", description: "Lightning fast performance" },
    { title: "Secure", description: "Enterprise-grade security" },
    { title: "Scalable", description: "Grows with your business" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <MagneticCard key={index}>
          <h3 className="font-semibold mb-2">{feature.title}</h3>
          <p className="text-gray-400">{feature.description}</p>
        </MagneticCard>
      ))}
    </div>
  );
}`}</code></pre>
            </div>

            <h2>📋 Form Examples</h2>

            <h3>Contact Form</h3>
            <div className="component-preview">
                <div className="max-w-md mx-auto">
                    <div className="liquid-glass rounded-xl p-6 border border-white/10">
                        <h3 className="text-xl font-semibold mb-6">Contact Us</h3>
                        <div className="space-y-4">
                            <div className="liquid-glass rounded-lg p-3 border border-white/20">
                                <input
                                    type="text"
                                    placeholder="Your name"
                                    className="w-full bg-transparent outline-none text-white placeholder-gray-400"
                                />
                            </div>
                            <div className="liquid-glass rounded-lg p-3 border border-white/20">
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    className="w-full bg-transparent outline-none text-white placeholder-gray-400"
                                />
                            </div>
                            <div className="liquid-glass rounded-lg p-3 border border-white/20">
                                <textarea
                                    placeholder="Your message..."
                                    rows={3}
                                    className="w-full bg-transparent outline-none text-white placeholder-gray-400 resize-none"
                                ></textarea>
                            </div>
                            <button className="w-full liquid-glass liquid-glass-interactive px-6 py-3 rounded-xl font-medium bg-blue-500/20 border border-blue-400/30 text-blue-300">
                                Send Message
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <h2>🎯 More Examples</h2>
            <div className="grid md:grid-cols-2 gap-4 not-prose mt-6">
                <a href="/examples/dashboard" className="liquid-glass rounded-lg p-4 border border-white/10 hover:border-blue-400/30 transition-colors no-underline">
                    <h4 className="font-semibold text-white mb-2">📊 Dashboard Examples</h4>
                    <p className="text-gray-400 text-sm">Complete dashboard layouts and components</p>
                </a>
                <a href="/examples/forms" className="liquid-glass rounded-lg p-4 border border-white/10 hover:border-purple-400/30 transition-colors no-underline">
                    <h4 className="font-semibold text-white mb-2">📝 Form Patterns</h4>
                    <p className="text-gray-400 text-sm">Complex forms with validation and state management</p>
                </a>
                <a href="/examples/animations" className="liquid-glass rounded-lg p-4 border border-white/10 hover:border-green-400/30 transition-colors no-underline">
                    <h4 className="font-semibold text-white mb-2">🎬 Animation Showcase</h4>
                    <p className="text-gray-400 text-sm">Interactive examples of all animation features</p>
                </a>
                <a href="/examples/landing" className="liquid-glass rounded-lg p-4 border border-white/10 hover:border-yellow-400/30 transition-colors no-underline">
                    <h4 className="font-semibold text-white mb-2">🚀 Landing Pages</h4>
                    <p className="text-gray-400 text-sm">Marketing page templates and components</p>
                </a>
            </div>
        </div>
    );
} 
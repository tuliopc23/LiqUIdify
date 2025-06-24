import Link from "next/link";
import "./globals.css";

const navigation = {
  "Getting Started": [
    { name: "Installation", href: "/guides/installation" },
    { name: "Quick Start", href: "/guides/quick-start" },
    { name: "Theming", href: "/guides/theming" },
    { name: "Migration", href: "/guides/migration" }
  ],
  "Components": [
    { name: "Overview", href: "/components" },
    { name: "Form", href: "/components/form" },
    { name: "Layout", href: "/components/layout" },
    { name: "Feedback", href: "/components/feedback" },
    { name: "Navigation", href: "/components/navigation" },
    { name: "Advanced", href: "/components/advanced" }
  ],
  "Guides": [
    { name: "Design Tokens", href: "/guides/design-tokens" },
    { name: "Animations", href: "/guides/animations" },
    { name: "Performance", href: "/guides/performance" },
    { name: "Accessibility", href: "/guides/accessibility" },
    { name: "Best Practices", href: "/guides/best-practices" }
  ],
  "API": [
    { name: "Component Props", href: "/api/props" },
    { name: "Hooks", href: "/api/hooks" },
    { name: "Utils", href: "/api/utils" },
    { name: "Tokens", href: "/api/tokens" }
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0a0a0a] text-white min-h-screen">
        {/* Mobile Header */}
        <div className="md:hidden bg-black/30 backdrop-blur-lg border-b border-white/10 p-4">
          <h1 className="text-xl font-bold">Glass UI Docs</h1>
        </div>

        <div className="flex min-h-screen">
          {/* Sidebar */}
          <aside className="hidden md:flex flex-col w-64 bg-black/30 backdrop-blur-lg border-r border-white/10 p-6 min-h-screen sticky top-0 overflow-y-auto">
            <Link href="/" className="mb-8">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Glass UI
              </h1>
              <p className="text-sm text-gray-400 mt-1">Documentation</p>
            </Link>

            <nav className="space-y-6">
              {Object.entries(navigation).map(([section, items]) => (
                <div key={section}>
                  <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3">
                    {section}
                  </h3>
                  <ul className="space-y-2">
                    {items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="block text-gray-400 hover:text-white hover:bg-white/5 px-3 py-2 rounded-lg transition-colors text-sm"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div className="pt-4 border-t border-white/10">
                <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3">
                  External
                </h3>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="/storybook"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-gray-400 hover:text-white hover:bg-white/5 px-3 py-2 rounded-lg transition-colors text-sm"
                    >
                      Storybook ↗
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/your-org/glass-ui"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-gray-400 hover:text-white hover:bg-white/5 px-3 py-2 rounded-lg transition-colors text-sm"
                    >
                      GitHub ↗
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <div className="max-w-4xl mx-auto px-6 py-8 md:px-8 md:py-12">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}

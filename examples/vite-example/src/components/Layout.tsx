import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { GlassNavbar, GlassButton, GlassDropdown, GlassToast } from "liquidify";
import {
  Home,
  Layers,
  Gamepad2,
  Info,
  Menu,
  X,
  Github,
  Moon,
  Sun,
  Settings,
  User,
} from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "Components", href: "/components", icon: Layers },
    { name: "Playground", href: "/playground", icon: Gamepad2 },
    { name: "About", href: "/about", icon: Info },
  ];

  const isActive = (path: string) => location.pathname === path;

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
    setShowToast(true);
  };

  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
      {/* Navigation */}
      <GlassNavbar className="sticky top-0 z-50 backdrop-blur-xl">
        <GlassNavbar.Brand>
          <Link to="/" className="flex items-center space-x-3">
            <motion.div
              whileHover={{ rotate: 180, scale: 1.1 }}
              transition={{ duration: 0.3 }}
              className="w-8 h-8 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-lg shadow-lg"
            />
            <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              LiqUIdify
            </span>
          </Link>
        </GlassNavbar.Brand>

        {/* Desktop Navigation */}
        <GlassNavbar.Menu className="hidden md:flex">
          {navigation.map((item) => (
            <GlassNavbar.Item
              key={item.name}
              as={Link}
              to={item.href}
              active={isActive(item.href)}
              className="flex items-center space-x-2"
            >
              <item.icon className="h-4 w-4" />
              <span>{item.name}</span>
            </GlassNavbar.Item>
          ))}
        </GlassNavbar.Menu>

        <GlassNavbar.Actions>
          {/* Theme Toggle */}
          <GlassButton
            variant="ghost"
            size="sm"
            onClick={toggleDarkMode}
            className="hidden sm:flex"
          >
            {darkMode ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </GlassButton>

          {/* GitHub Link */}
          <GlassButton
            variant="ghost"
            size="sm"
            as="a"
            href="https://github.com/liquidify/liquidify"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex"
          >
            <Github className="h-4 w-4" />
          </GlassButton>

          {/* User Menu */}
          <GlassDropdown>
            <GlassDropdown.Trigger asChild>
              <GlassButton variant="ghost" size="sm">
                <User className="h-4 w-4" />
              </GlassButton>
            </GlassDropdown.Trigger>
            <GlassDropdown.Content>
              <GlassDropdown.Item>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </GlassDropdown.Item>
              <GlassDropdown.Item onClick={toggleDarkMode}>
                {darkMode ? (
                  <Sun className="mr-2 h-4 w-4" />
                ) : (
                  <Moon className="mr-2 h-4 w-4" />
                )}
                {darkMode ? "Light Mode" : "Dark Mode"}
              </GlassDropdown.Item>
              <GlassDropdown.Separator />
              <GlassDropdown.Item
                as="a"
                href="https://github.com/liquidify/liquidify"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </GlassDropdown.Item>
            </GlassDropdown.Content>
          </GlassDropdown>

          {/* Mobile Menu Button */}
          <GlassButton
            variant="ghost"
            size="sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden"
          >
            {mobileMenuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </GlassButton>
        </GlassNavbar.Actions>

        {/* Mobile Menu */}
        <GlassNavbar.Collapse isOpen={mobileMenuOpen}>
          <GlassNavbar.Menu direction="vertical" className="mt-4 space-y-2">
            {navigation.map((item) => (
              <GlassNavbar.Item
                key={item.name}
                as={Link}
                to={item.href}
                active={isActive(item.href)}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-2 w-full"
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </GlassNavbar.Item>
            ))}

            <div className="border-t border-white/20 pt-4 mt-4">
              <GlassButton
                variant="ghost"
                size="sm"
                onClick={toggleDarkMode}
                className="w-full justify-start"
              >
                {darkMode ? (
                  <Sun className="mr-2 h-4 w-4" />
                ) : (
                  <Moon className="mr-2 h-4 w-4" />
                )}
                {darkMode ? "Light Mode" : "Dark Mode"}
              </GlassButton>

              <GlassButton
                variant="ghost"
                size="sm"
                as="a"
                href="https://github.com/liquidify/liquidify"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full justify-start mt-2"
              >
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </GlassButton>
            </div>
          </GlassNavbar.Menu>
        </GlassNavbar.Collapse>
      </GlassNavbar>

      {/* Main Content */}
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="flex-1"
      >
        {children}
      </motion.main>

      {/* Footer */}
      <footer className="mt-16 border-t border-white/20 backdrop-blur-xl bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded"></div>
              <span className="font-semibold text-white">LiqUIdify</span>
            </div>

            <div className="flex items-center space-x-6 text-sm text-white/70">
              <a
                href="https://liquidify.dev"
                className="hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Documentation
              </a>
              <a
                href="https://github.com/liquidify/liquidify"
                className="hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <span>Built with ❤️ and Vite</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Toast */}
      {showToast && (
        <GlassToast
          title={`${darkMode ? "Dark" : "Light"} mode activated`}
          description="Theme preference saved"
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}

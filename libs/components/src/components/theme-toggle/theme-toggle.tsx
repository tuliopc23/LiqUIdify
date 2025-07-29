import { Moon, Sun } from 'lucide-react';

import { useTheme } from '@/hooks/use-theme';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme('light' === theme ? 'dark' : 'light')}
      className="glass-effect btn-scale rounded-lg p-2 transition-all duration-200 hover:bg-opacity-80"
    >
      {'light' === theme ? (
        <Moon className="h-5 w-5 text-primary" />
      ) : (
        <Sun className="h-5 w-5 text-primary" />
      )}
    </button>
  );
}

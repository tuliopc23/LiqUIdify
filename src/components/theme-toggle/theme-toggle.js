import { jsx as _jsx } from "react/jsx-runtime";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    return (_jsx("button", { onClick: () => setTheme(theme === "light" ? "dark" : "light"), className: "glass-effect rounded-lg p-2 btn-scale hover:bg-opacity-80 transition-all duration-200", children: theme === "light" ? (_jsx(Moon, { className: "h-5 w-5 text-primary" })) : (_jsx(Sun, { className: "h-5 w-5 text-primary" })) }));
}

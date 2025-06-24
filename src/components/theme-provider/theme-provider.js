import { jsx as _jsx } from "react/jsx-runtime";
import { ThemeProvider as BaseThemeProvider } from "@/hooks/use-theme";
export function ThemeProvider({ children }) {
    return (_jsx(BaseThemeProvider, { defaultTheme: "light", storageKey: "glass-ui-theme", children: children }));
}

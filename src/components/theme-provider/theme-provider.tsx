import { ThemeProvider as BaseThemeProvider } from "@/hooks/use-theme";

interface ThemeProviderProps {
	children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
	return (
		<BaseThemeProvider defaultTheme="light" storageKey="glass-ui-theme">
			{children}
		</BaseThemeProvider>
	);
}

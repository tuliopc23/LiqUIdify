// Simple CSS utility for combining classes
export function css(...classes: (string | undefined | false)[]): string {
	return classes.filter(Boolean).join(" ");
}

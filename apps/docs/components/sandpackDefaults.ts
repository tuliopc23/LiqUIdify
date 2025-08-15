// Removed Sandpack defaults; the file is now a placeholder to avoid breaking imports.
export type Files = Record<string, any>;
export const DEFAULT_DEPS: Record<string, string> = {};
export const DEFAULT_CSS: string[] = [];
export const LIQUID_GLASS_LIGHT_THEME = {} as const;
export const LIQUID_GLASS_DARK_THEME = {} as const;
export function withBaseFiles(files: Files): Files { return files; }

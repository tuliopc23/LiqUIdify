// Main entry point for the LiqUIdify component library - Apple Design Language for Web
// Now powered by shadcn/ui with iOS Blue theming

// Import Apple-themed CSS system
import "./styles/new-design-system.css";

// shadcn/ui Components with Apple iOS Blue theming
export * from "./components/ui/button";
export * from "./components/ui/card";

// Utilities
export { cn } from "./lib/utils";

// Hooks (preserving existing ones that might exist)
// export { useDeviceCapabilities } from "./hooks/use-device-capabilities";
// export type { DeviceCapabilities } from "./hooks/use-device-capabilities";

// Convenience aliases for compatibility
export { Button } from "./components/ui/button";
export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./components/ui/card";

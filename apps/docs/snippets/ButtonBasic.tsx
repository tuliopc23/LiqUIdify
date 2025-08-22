import { GlassResponsiveButton, GlassUIProvider } from "liquidify";

export default function Example() {
  return (
    <GlassUIProvider>
      <GlassResponsiveButton variant="primary" size="md">
        Click me
      </GlassResponsiveButton>
    </GlassUIProvider>
  );
}

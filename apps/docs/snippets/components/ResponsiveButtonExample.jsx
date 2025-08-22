// useState is globally available in Mintlify
import {GlassResponsiveButton} from "/snippets/components/glass-responsive-button";

export default function ResponsiveButtonExample() {
  const [count, setCount] = useState(0);
  return (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", padding: 20 }}>
      <GlassResponsiveButton variant="primary" onClick={() => setCount((c) => c + 1)}>
        Clicked {count}x
      </GlassResponsiveButton>
      <GlassResponsiveButton variant="secondary">Secondary</GlassResponsiveButton>
      <GlassResponsiveButton variant="ghost">Ghost</GlassResponsiveButton>
      <GlassResponsiveButton variant="tertiary">Tertiary</GlassResponsiveButton>
      <GlassResponsiveButton variant="destructive">Delete</GlassResponsiveButton>
    </div>
  );
}

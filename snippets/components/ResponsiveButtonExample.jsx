// filepath: snippets/components/ResponsiveButtonExample.jsx

import { ResponsiveButton } from "liquidify";
import ComponentFrame from "../preview/ComponentFrame";

const USAGE = `import { ResponsiveButton } from "liquidify";

export default function Example() {
  return (
    <ResponsiveButton variant="primary">
      Tap or Click me
    </ResponsiveButton>
  );
}`;

export default function ResponsiveButtonExample() {
  return (
    <ComponentFrame
      title="Responsive Button"
      intro="Button that adapts its layout across breakpoints."
      code={USAGE}
    >
      <ResponsiveButton variant="primary">Tap or Click me</ResponsiveButton>
    </ComponentFrame>
  );
}

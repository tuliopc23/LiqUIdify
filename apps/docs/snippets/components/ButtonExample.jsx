import React from "react";
import ComponentFrame from "/snippets/preview/ComponentFrame";
import { GlassButton } from "liquidify";

const USAGE = `import "liquidify/styles";
import { GlassButton } from "liquidify";

export default function Example() {
  return (
    <GlassButton
      variant="primary"
      onClick={() => console.log("clicked")}
    >
      Click me
    </GlassButton>
  );
}`;

export default function ButtonExample() {
  return (
    <ComponentFrame
      title="Button"
      intro="Primary action trigger with hover, focus, and active states."
      code={USAGE}
    >
      <GlassButton variant="primary">Click me</GlassButton>
    </ComponentFrame>
  );
}

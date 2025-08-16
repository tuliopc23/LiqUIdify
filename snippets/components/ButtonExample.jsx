// filepath: snippets/components/ButtonExample.jsx
import React from "react";
import ComponentFrame from "../preview/ComponentFrame";
import { Button } from "liquidify";

const USAGE = `import { Button } from "liquidify";

export default function Example() {
  return (
    <Button
      variant="primary"
      onClick={() => console.log("clicked")}
    >
      Click me
    </Button>
  );
}`;

export default function ButtonExample() {
  return (
    <ComponentFrame
      title="Button"
      intro="Primary action trigger with hover, focus, and active states."
      code={USAGE}
    >
      <Button variant="primary">Click me</Button>
    </ComponentFrame>
  );
}

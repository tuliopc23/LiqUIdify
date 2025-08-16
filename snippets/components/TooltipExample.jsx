// filepath: snippets/components/TooltipExample.jsx
import React from "react";
import ComponentFrame from "../preview/ComponentFrame";
import { Tooltip, Button } from "liquidify";

const USAGE = `import { Tooltip, Button } from "liquidify";

export default function Example() {
  return (
    <Tooltip content="Helpful tip">
      <Button variant="secondary">Hover me</Button>
    </Tooltip>
  );
}`;

export default function TooltipExample() {
  return (
    <ComponentFrame
      title="Tooltip"
      intro="Contextual hint shown on hover or focus."
      code={USAGE}
    >
      <Tooltip content="Helpful tip">
        <Button variant="secondary">Hover me</Button>
      </Tooltip>
    </ComponentFrame>
  );
}

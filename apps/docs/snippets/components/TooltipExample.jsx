import React from "react";
import ComponentFrame from "../preview/ComponentFrame";
import { GlassTooltip, GlassButton } from "liquidify";

const USAGE = `import "liquidify/styles";
import { GlassTooltip, GlassButton } from "liquidify";

export default function Example() {
  return (
    <GlassTooltip content="Tooltip content">
      <GlassButton variant="ghost">Hover me</GlassButton>
    </GlassTooltip>
  );
}`;

export default function TooltipExample() {
  return (
    <ComponentFrame
      title="Tooltip"
      intro="Hover tooltip with smart positioning."
      code={USAGE}
    >
      <GlassTooltip content="Tooltip content">
        <GlassButton variant="ghost">Hover me</GlassButton>
      </GlassTooltip>
    </ComponentFrame>
  );
}

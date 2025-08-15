import React from "react";
import ComponentFrame from "../preview/ComponentFrame";
import { GlassResponsiveButton } from "liquidify";

const USAGE = `import "liquidify/styles";
import { GlassResponsiveButton } from "liquidify";

export default function Example() {
  return (
    <GlassResponsiveButton>
      Continue
    </GlassResponsiveButton>
  );
}`;

export default function ResponsiveButtonExample() {
  return (
    <ComponentFrame
      title="Responsive Button"
      intro="Button that adapts across breakpoints with fluid micro-interactions."
      code={USAGE}
    >
      <GlassResponsiveButton>Continue</GlassResponsiveButton>
    </ComponentFrame>
  );
}

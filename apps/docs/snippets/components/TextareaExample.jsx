import React from "/snippets/react";
import ComponentFrame from "/snippets/preview/ComponentFrame";
import { GlassTextarea } from "/snippets/liquidify";

const USAGE = `import "liquidify/styles";
import { GlassTextarea } from "liquidify";

export default function Example() {
  return (
    <GlassTextarea placeholder="Write your message" />
  );
}`;

export default function TextareaExample() {
  return (
    <ComponentFrame
      title="Textarea"
      intro="Multi-line text input with responsive focus styling."
      code={USAGE}
    >
      <GlassTextarea placeholder="Write your message" />
    </ComponentFrame>
  );
}

import React from "react";
import ComponentFrame from "/snippets/preview/ComponentFrame";
import { GlassInput } from "liquidify";

const USAGE = `import "liquidify/styles";
import { GlassInput } from "liquidify";

export default function Example() {
  return (
    <GlassInput placeholder="Enter your name" />
  );
}`;

export default function InputExample() {
  return (
    <ComponentFrame
      title="Input"
      intro="Text input with clear focus ring and subtle glass background."
      code={USAGE}
    >
      <GlassInput placeholder="Enter your name" />
    </ComponentFrame>
  );
}

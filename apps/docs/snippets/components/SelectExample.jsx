import React from "react";
import ComponentFrame from "/snippets/preview/ComponentFrame";
import { GlassSelect } from "liquidify";

const USAGE = `import "liquidify/styles";
import { GlassSelect } from "liquidify";

export default function Example() {
  return (
    <GlassSelect
      options={[
        { label: "Apple", value: "apple" },
        { label: "Banana", value: "banana" },
        { label: "Cherry", value: "cherry" },
      ]}
      placeholder="Choose a fruit"
    />
  );
}`;

export default function SelectExample() {
  return (
    <ComponentFrame
      title="Select"
      intro="Dropdown select with hover and focus styles."
      code={USAGE}
    >
      <GlassSelect
        options={[
          { label: "Apple", value: "apple" },
          { label: "Banana", value: "banana" },
          { label: "Cherry", value: "cherry" },
        ]}
        placeholder="Choose a fruit"
      />
    </ComponentFrame>
  );
}

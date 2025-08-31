// filepath: snippets/components/SelectExample.jsx

import { Select } from "liquidify";
import ComponentFrame from "../preview/ComponentFrame";

const USAGE = `import { Select } from "liquidify";

export default function Example() {
  return (
    <Select
      options={[
        { label: "Option A", value: "a" },
        { label: "Option B", value: "b" },
        { label: "Option C", value: "c" }
      ]}
      placeholder="Choose an option"
    />
  );
}`;

export default function SelectExample() {
  return (
    <ComponentFrame
      title="Select"
      intro="Single-select field with hover and focus states."
      code={USAGE}
    >
      <Select
        options={[
          { label: "Option A", value: "a" },
          { label: "Option B", value: "b" },
          { label: "Option C", value: "c" },
        ]}
        placeholder="Choose an option"
      />
    </ComponentFrame>
  );
}

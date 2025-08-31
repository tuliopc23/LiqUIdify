// filepath: snippets/components/InputExample.jsx

import { Input } from "liquidify";
import ComponentFrame from "../preview/ComponentFrame";

const USAGE = `import { Input } from "liquidify";

export default function Example() {
  return (
    <Input placeholder="Type here" />
  );
}`;

export default function InputExample() {
  return (
    <ComponentFrame title="Input" intro="Text input with focus and hover states." code={USAGE}>
      <Input placeholder="Type here" />
    </ComponentFrame>
  );
}

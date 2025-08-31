// filepath: snippets/components/TextareaExample.jsx

import { Textarea } from "liquidify";
import ComponentFrame from "../preview/ComponentFrame";

const USAGE = `import { Textarea } from "liquidify";

export default function Example() {
  return (
    <Textarea placeholder="Write something..." />
  );
}`;

export default function TextareaExample() {
  return (
    <ComponentFrame title="Textarea" intro="Multi-line text input with focus state." code={USAGE}>
      <Textarea placeholder="Write something..." />
    </ComponentFrame>
  );
}

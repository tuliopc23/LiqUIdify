// filepath: snippets/components/CardExample.jsx

import { Card } from "liquidify";
import ComponentFrame from "../preview/ComponentFrame";

const USAGE = `import { Card } from "liquidify";

export default function Example() {
  return (
    <Card title="Card title" subtitle="Subtitle">
      Content
    </Card>
  );
}`;

export default function CardExample() {
  return (
    <ComponentFrame title="Card" intro="Container for grouping related content." code={USAGE}>
      <Card title="Card title" subtitle="Subtitle">
        Content
      </Card>
    </ComponentFrame>
  );
}

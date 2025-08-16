// filepath: snippets/components/CardExample.jsx
import React from "react";
import ComponentFrame from "../preview/ComponentFrame";
import { Card } from "liquidify";

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
    <ComponentFrame
      title="Card"
      intro="Container for grouping related content."
      code={USAGE}
    >
      <Card title="Card title" subtitle="Subtitle">Content</Card>
    </ComponentFrame>
  );
}

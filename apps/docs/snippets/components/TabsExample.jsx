import React from "/snippets/react";
import ComponentFrame from "/snippets/preview/ComponentFrame";
import { GlassTabs } from "/snippets/liquidify";

const USAGE = `import "liquidify/styles";
import { GlassTabs } from "liquidify";

export default function Example() {
  return (
    <GlassTabs
      tabs={[
        { id: "tab1", label: "Tab One", content: "First" },
        { id: "tab2", label: "Tab Two", content: "Second" },
      ]}
    />
  );
}`;

export default function TabsExample() {
  return (
    <ComponentFrame
      title="Tabs"
      intro="Tabbed interface with animated active state."
      code={USAGE}
    >
      <GlassTabs
        tabs={[
          { id: "tab1", label: "Tab One", content: "First" },
          { id: "tab2", label: "Tab Two", content: "Second" },
        ]}
      />
    </ComponentFrame>
  );
}

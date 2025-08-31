// filepath: snippets/components/TabsExample.jsx

import { Tabs } from "liquidify";
import ComponentFrame from "../preview/ComponentFrame";

const USAGE = `import { Tabs } from "liquidify";

export default function Example() {
  return (
    <Tabs
      tabs={[
        { id: "tab1", label: "Tab One", content: <div>Content One</div> },
        { id: "tab2", label: "Tab Two", content: <div>Content Two</div> },
        { id: "tab3", label: "Tab Three", content: <div>Content Three</div> }
      ]}
      initialTabId="tab1"
    />
  );
}`;

export default function TabsExample() {
  return (
    <ComponentFrame title="Tabs" intro="Switch between content sections." code={USAGE}>
      <Tabs
        tabs={[
          { id: "tab1", label: "Tab One", content: <div>Content One</div> },
          { id: "tab2", label: "Tab Two", content: <div>Content Two</div> },
          { id: "tab3", label: "Tab Three", content: <div>Content Three</div> },
        ]}
        initialTabId="tab1"
      />
    </ComponentFrame>
  );
}

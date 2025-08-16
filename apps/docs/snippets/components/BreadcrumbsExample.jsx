import React from "/snippets/react";
import ComponentFrame from "/snippets/preview/ComponentFrame";
import { GlassBreadcrumbs } from "/snippets/liquidify";

const USAGE = `import "liquidify/styles";
import { GlassBreadcrumbs } from "liquidify";

export default function Example() {
  return (
    <GlassBreadcrumbs
      items={[
        { label: "Home", href: "/" },
        { label: "Library", href: "/library" },
        { label: "Data" },
      ]}
    />
  );
}`;

export default function BreadcrumbsExample() {
  return (
    <ComponentFrame
      title="Breadcrumbs"
      intro="Navigation trail with separators and hover states."
      code={USAGE}
    >
      <GlassBreadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Library", href: "/library" },
          { label: "Data" },
        ]}
      />
    </ComponentFrame>
  );
}

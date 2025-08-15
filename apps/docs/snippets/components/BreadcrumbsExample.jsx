import React from "react";
import ComponentFrame from "../preview/ComponentFrame";
import { GlassBreadcrumbs } from "liquidify";

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

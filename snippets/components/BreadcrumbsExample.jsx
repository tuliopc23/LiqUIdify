// filepath: snippets/components/BreadcrumbsExample.jsx
import React from "react";
import ComponentFrame from "../preview/ComponentFrame.jsx";
import ProviderWrapper from "../preview/ProviderWrapper.jsx";
import { GlassBreadcrumbs } from "liquidify";

export default function BreadcrumbsExample() {
  const items = [
    { label: "Docs", onClick: () => console.log("Docs") },
    { label: "Components", onClick: () => console.log("Components") },
    { label: "Breadcrumbs" },
  ];

  return (
    <ProviderWrapper>
      <ComponentFrame title="Breadcrumbs" intro="Navigation trail with separators and home option.">
        <div className="p-4">
          <GlassBreadcrumbs items={items} />
        </div>
      </ComponentFrame>
    </ProviderWrapper>
  );
}

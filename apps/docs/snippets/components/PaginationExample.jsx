import React from "react";
import ComponentFrame from "../preview/ComponentFrame";
import { GlassPagination } from "liquidify";

const USAGE = `import "liquidify/styles";
import { GlassPagination } from "liquidify";

export default function Example() {
  return (
    <GlassPagination totalPages={10} currentPage={3} onPageChange={() => {}} />
  );
}`;

export default function PaginationExample() {
  return (
    <ComponentFrame
      title="Pagination"
      intro="Pagination with hoverable controls and active state."
      code={USAGE}
    >
      <GlassPagination totalPages={10} currentPage={3} onPageChange={() => {}} />
    </ComponentFrame>
  );
}

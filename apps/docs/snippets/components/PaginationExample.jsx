import React from "/snippets/react";
import ComponentFrame from "/snippets/preview/ComponentFrame";
import { GlassPagination } from "/snippets/liquidify";

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

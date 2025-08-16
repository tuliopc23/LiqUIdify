// filepath: snippets/components/PaginationExample.jsx
import React from "react";
import ComponentFrame from "../preview/ComponentFrame.jsx";
import ProviderWrapper from "../preview/ProviderWrapper.jsx";
import { GlassPagination } from "liquidify";

export default function PaginationExample() {
  const [page, setPage] = React.useState(3);

  return (
    <ProviderWrapper>
      <ComponentFrame title="Pagination" intro="Page navigation with first/last and range.">
        <div className="p-4">
          <GlassPagination
            page={page}
            total={10}
            onChange={setPage}
            showFirstLast
          />
        </div>
      </ComponentFrame>
    </ProviderWrapper>
  );
}

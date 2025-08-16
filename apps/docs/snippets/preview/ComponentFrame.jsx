import React from "/snippets/react";
import ProviderWrapper from "/snippets/preview/ProviderWrapper";

export default function ComponentFrame({ title, intro, code, children }) {
  return (
    <ProviderWrapper>
      <section className="space-y-3 not-prose">
        <h2 className="text-xl font-semibold">{title}</h2>
        {intro ? (
          <p className="text-sm text-gray-600 dark:text-gray-300">{intro}</p>
        ) : null}

        <div className="border rounded-lg p-4 bg-white/60 dark:bg-black/40">
          {children}
        </div>

        <pre className="mt-3 text-xs overflow-auto rounded-md border p-3">
{code}
        </pre>
      </section>
    </ProviderWrapper>
  );
}

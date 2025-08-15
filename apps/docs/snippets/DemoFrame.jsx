/*
  Neutral, consistent container for interactive demos.
  - Prevent prose styles from affecting demos
  - Provide padding, border, and spacing
  - Keep footprint small for sidebar pinning
*/

export function DemoFrame({ children }) {
  return (
    <div className="not-prose">
      <div
        className="rounded-xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur p-4 md:p-5 shadow-sm"
        style={{
          WebkitBackdropFilter: "blur(8px)",
          backdropFilter: "blur(8px)",
        }}
      >
        <div className="flex flex-col gap-3">{children}</div>
      </div>
    </div>
  );
}

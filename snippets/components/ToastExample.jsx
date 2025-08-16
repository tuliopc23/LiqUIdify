// filepath: snippets/components/ToastExample.jsx
import React from "react";
import ComponentFrame from "../preview/ComponentFrame";
import { Toast, Button } from "liquidify";

const USAGE = `import { Toast, Button } from "liquidify";

export default function Example() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Show toast</Button>
      <Toast open={open} onOpenChange={setOpen} title="Saved" description="Your changes have been saved." />
    </>
  );
}`;

export default function ToastExample() {
  const [open, setOpen] = React.useState(false);
  return (
    <ComponentFrame
      title="Toast"
      intro="Transient notification with message and optional description."
      code={USAGE}
    >
      <div className="flex items-center gap-3">
        <Button onClick={() => setOpen(true)}>Show toast</Button>
        <Toast open={open} onOpenChange={setOpen} title="Saved" description="Your changes have been saved." />
      </div>
    </ComponentFrame>
  );
}

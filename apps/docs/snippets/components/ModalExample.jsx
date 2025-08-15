import React, { useState } from "react";
import ComponentFrame from "/snippets/preview/ComponentFrame";
import { GlassModal, GlassButton } from "liquidify";

const USAGE = `import "liquidify/styles";
import { GlassModal, GlassButton } from "liquidify";

export default function Example() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <GlassButton onClick={() => setOpen(true)}>Open modal</GlassButton>
      <GlassModal open={open} onOpenChange={setOpen} title="Welcome">
        <p>Hello from modal</p>
      </GlassModal>
    </>
  );
}`;

export default function ModalExample() {
  const [open, setOpen] = useState(false);
  return (
    <ComponentFrame
      title="Modal"
      intro="Accessible dialog with backdrop blur and keyboard interactions."
      code={USAGE}
    >
      <GlassButton onClick={() => setOpen(true)}>Open modal</GlassButton>
      <GlassModal open={open} onOpenChange={setOpen} title="Welcome">
        <p>Hello from modal</p>
      </GlassModal>
    </ComponentFrame>
  );
}

// filepath: snippets/components/ModalExample.jsx

import { Button, Modal } from "liquidify";
import React from "react";
import ComponentFrame from "../preview/ComponentFrame";

const USAGE = `import { Modal, Button } from "liquidify";

export default function Example() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button variant="primary" onClick={() => setOpen(true)}>Open modal</Button>
      <Modal open={open} onOpenChange={setOpen} title="Modal title">
        <p>Modal content</p>
      </Modal>
    </>
  );
}`;

export default function ModalExample() {
  const [open, setOpen] = React.useState(false);
  return (
    <ComponentFrame
      title="Modal"
      intro="Overlay dialog with accessible focus management."
      code={USAGE}
    >
      <div className="flex items-center gap-3">
        <Button variant="primary" onClick={() => setOpen(true)}>
          Open modal
        </Button>
        <Modal open={open} onOpenChange={setOpen} title="Modal title">
          <p>Modal content</p>
        </Modal>
      </div>
    </ComponentFrame>
  );
}

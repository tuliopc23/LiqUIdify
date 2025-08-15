import React from "react";
import ComponentFrame from "../preview/ComponentFrame";
import { ToastProvider, useToast, GlassButton } from "liquidify";

const USAGE = `import "liquidify/styles";
import { ToastProvider, useToast, GlassButton } from "liquidify";

function Demo() {
  const { addToast } = useToast();
  return (
    <GlassButton onClick={() => addToast({ title: "Saved", description: "Your changes were saved", type: "success" })}>
      Show toast
    </GlassButton>
  );
}

export default function Example() {
  return (
    <ToastProvider>
      <Demo />
    </ToastProvider>
  );
}`;

function Inner() {
  const { addToast } = useToast();
  return (
    <GlassButton onClick={() => addToast({ title: "Saved", description: "Your changes were saved", type: "success" })}>
      Show toast
    </GlassButton>
  );
}

export default function ToastExample() {
  return (
    <ComponentFrame
      title="Toast"
      intro="Toast system with provider and convenient hook."
      code={USAGE}
    >
      <ToastProvider>
        <Inner />
      </ToastProvider>
    </ComponentFrame>
  );
}

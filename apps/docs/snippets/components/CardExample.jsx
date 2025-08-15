import React from "react";
import ComponentFrame from "../preview/ComponentFrame";
import { GlassCard, GlassButton } from "liquidify";

const USAGE = `import "liquidify/styles";
import { GlassCard, GlassButton } from "liquidify";

export default function Example() {
  return (
    <GlassCard className="max-w-sm">
      <GlassCard.Header>
        <GlassCard.Title>Glass Card</GlassCard.Title>
        <GlassCard.Description>Standard glass effect</GlassCard.Description>
      </GlassCard.Header>
      <GlassCard.Content>
        <p>Content</p>
      </GlassCard.Content>
      <GlassCard.Actions>
        <GlassButton variant="primary">Action</GlassButton>
      </GlassCard.Actions>
    </GlassCard>
  );
}`;

export default function CardExample() {
  return (
    <ComponentFrame
      title="Card"
      intro="Container with glass layering and subtle depth."
      code={USAGE}
    >
      <GlassCard className="max-w-sm">
        <GlassCard.Header>
          <GlassCard.Title>Glass Card</GlassCard.Title>
          <GlassCard.Description>Standard glass effect</GlassCard.Description>
        </GlassCard.Header>
        <GlassCard.Content>
          <p>Content</p>
        </GlassCard.Content>
        <GlassCard.Actions>
          <GlassButton variant="primary">Action</GlassButton>
        </GlassCard.Actions>
      </GlassCard>
    </ComponentFrame>
  );
}

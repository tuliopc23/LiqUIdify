"use client";

import { Dialog } from "../ark-ui/dialog/dialog";
import { Tabs } from "../ark-ui/tabs/tabs";

export function LiquidGlassDemo() {
  return (
    <div className="p-8 space-y-8 min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <h1 className="text-4xl font-bold text-white mb-8">LiqUIdify Mass Auto-Application Demo</h1>

      {/* Dialog Demo */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">Dialog Component</h2>
        <Dialog.Root>
          <Dialog.Trigger>Open Liquid Glass Dialog</Dialog.Trigger>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Title>Liquid Glass Dialog</Dialog.Title>
              <Dialog.Description>
                This dialog automatically has liquid glass styling applied through mass
                auto-application. Notice the beautiful glass effects, blur backdrop, and smooth
                animations.
              </Dialog.Description>
              <Dialog.CloseTrigger>×</Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Dialog.Root>
      </div>

      {/* Tabs Demo */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">Tabs Component</h2>
        <Tabs.Root defaultValue="tab1">
          <Tabs.List>
            <Tabs.Trigger value="tab1">Mass Auto-Application</Tabs.Trigger>
            <Tabs.Trigger value="tab2">Liquid Glass Styling</Tabs.Trigger>
            <Tabs.Trigger value="tab3">Zero Configuration</Tabs.Trigger>
            <Tabs.Indicator />
          </Tabs.List>
          <Tabs.Content value="tab1">
            <div className="p-6 text-white space-y-4">
              <h3 className="text-xl font-semibold">Mass Auto-Application Success!</h3>
              <p className="text-white/80 leading-relaxed">
                🎉 All styling is automatically applied via Panda CSS slot recipes and JSX tracking.
                No manual className props needed - the liquid glass aesthetic is inherited
                automatically.
              </p>
              <ul className="text-white/70 space-y-2">
                <li>• 14 slot recipes for multi-part components</li>
                <li>• 5 simple recipes for single components</li>
                <li>• Auto-tracking via jsx: ["ComponentName"] arrays</li>
                <li>• JIT CSS generation - only used variants generate CSS</li>
              </ul>
            </div>
          </Tabs.Content>
          <Tabs.Content value="tab2">
            <div className="p-6 text-white space-y-4">
              <h3 className="text-xl font-semibold">Liquid Glass Design System</h3>
              <p className="text-white/80 leading-relaxed">
                Every component inherits the complete liquid glass design system including:
              </p>
              <ul className="text-white/70 space-y-2">
                <li>• Glass background with backdrop blur</li>
                <li>• Complex shadow system with inset highlights</li>
                <li>• Pseudo-element gradients for depth</li>
                <li>• Smooth animations and transitions</li>
                <li>• Consistent 16px border radius standard</li>
              </ul>
            </div>
          </Tabs.Content>
          <Tabs.Content value="tab3">
            <div className="p-6 text-white space-y-4">
              <h3 className="text-xl font-semibold">Zero Configuration Required</h3>
              <p className="text-white/80 leading-relaxed">
                Import any Ark UI component and it automatically receives liquid glass styling:
              </p>
              <div className="bg-black/20 p-4 rounded-lg font-mono text-sm text-white/60">
                <code>
                  {`import { Dialog } from "./ark-ui/dialog/dialog";

// Automatically styled with liquid glass
<Dialog.Root>
  <Dialog.Trigger>Click me</Dialog.Trigger>
  <Dialog.Content>Beautiful!</Dialog.Content>
</Dialog.Root>`}
                </code>
              </div>
            </div>
          </Tabs.Content>
        </Tabs.Root>
      </div>

      <div className="mt-12 p-6 text-center">
        <h3 className="text-2xl font-semibold text-white mb-4">Mass Auto-Application Complete!</h3>
        <p className="text-white/70 text-lg">
          🚀 All Ark UI components now inherit the liquid glass design system automatically.
        </p>
      </div>
    </div>
  );
}

import{j as e}from"./iframe-BrIAL86F.js";import{G as a}from"./glass-textarea-DjYDkN9f.js";import"./glass-utils-B_l5-kDT.js";const c={title:"Glass/GlassTextarea",component:a,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{variant:{control:{type:"select"},options:["default","minimal"]},resize:{control:{type:"select"},options:["none","vertical","horizontal","both"]},disabled:{control:"boolean"},placeholder:{control:"text"}}},s={args:{placeholder:"Enter your message..."}},l={args:{variant:"minimal",placeholder:"Minimal textarea"}},r={args:{defaultValue:"This is some sample text in the textarea.",placeholder:"Enter your message..."}},t={render:()=>e.jsxs("div",{className:"space-y-4 w-full max-w-md",children:[e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium mb-2",children:"No Resize"}),e.jsx(a,{resize:"none",placeholder:"Cannot be resized"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium mb-2",children:"Vertical Resize"}),e.jsx(a,{resize:"vertical",placeholder:"Can be resized vertically"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium mb-2",children:"Horizontal Resize"}),e.jsx(a,{resize:"horizontal",placeholder:"Can be resized horizontally"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium mb-2",children:"Both Directions"}),e.jsx(a,{resize:"both",placeholder:"Can be resized in both directions"})]})]})},o={render:()=>e.jsxs("div",{className:"space-y-4 w-full max-w-md",children:[e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium mb-2",children:"Normal"}),e.jsx(a,{placeholder:"Normal textarea"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium mb-2",children:"Disabled"}),e.jsx(a,{disabled:!0,placeholder:"Disabled textarea"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium mb-2",children:"With Value"}),e.jsx(a,{defaultValue:"This textarea has some initial content that demonstrates how text appears in the component."})]})]})},i={render:()=>e.jsxs("div",{className:"w-full max-w-md space-y-4",children:[e.jsxs("div",{children:[e.jsx("label",{htmlFor:"message",className:"block text-sm font-medium mb-2",children:"Message"}),e.jsx(a,{id:"message",placeholder:"Write your message here...",rows:4})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"feedback",className:"block text-sm font-medium mb-2",children:"Feedback (Minimal)"}),e.jsx(a,{id:"feedback",variant:"minimal",placeholder:"Your feedback...",rows:3})]})]})};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    placeholder: 'Enter your message...'
  }
}`,...s.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'minimal',
    placeholder: 'Minimal textarea'
  }
}`,...l.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    defaultValue: 'This is some sample text in the textarea.',
    placeholder: 'Enter your message...'
  }
}`,...r.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => <div className="space-y-4 w-full max-w-md">
      <div>
        <label className="block text-sm font-medium mb-2">No Resize</label>
        <GlassTextarea resize="none" placeholder="Cannot be resized" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Vertical Resize</label>
        <GlassTextarea resize="vertical" placeholder="Can be resized vertically" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Horizontal Resize</label>
        <GlassTextarea resize="horizontal" placeholder="Can be resized horizontally" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Both Directions</label>
        <GlassTextarea resize="both" placeholder="Can be resized in both directions" />
      </div>
    </div>
}`,...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => <div className="space-y-4 w-full max-w-md">
      <div>
        <label className="block text-sm font-medium mb-2">Normal</label>
        <GlassTextarea placeholder="Normal textarea" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Disabled</label>
        <GlassTextarea disabled placeholder="Disabled textarea" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">With Value</label>
        <GlassTextarea defaultValue="This textarea has some initial content that demonstrates how text appears in the component." />
      </div>
    </div>
}`,...o.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-full max-w-md space-y-4">
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Message
        </label>
        <GlassTextarea id="message" placeholder="Write your message here..." rows={4} />
      </div>
      <div>
        <label htmlFor="feedback" className="block text-sm font-medium mb-2">
          Feedback (Minimal)
        </label>
        <GlassTextarea id="feedback" variant="minimal" placeholder="Your feedback..." rows={3} />
      </div>
    </div>
}`,...i.parameters?.docs?.source}}};const b=["Default","Minimal","WithValue","ResizeOptions","States","FormExample"];export{s as Default,i as FormExample,l as Minimal,t as ResizeOptions,o as States,r as WithValue,b as __namedExportsOrder,c as default};

import{j as e}from"./iframe-BrIAL86F.js";import{G as s}from"./glass-progress-CgUPGv-M.js";import"./glass-utils-B_l5-kDT.js";const i={title:"Glass/GlassProgress",component:s,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{value:{control:{type:"range",min:0,max:100,step:1}},max:{control:{type:"number"}},size:{control:{type:"select"},options:["sm","md","lg"]},variant:{control:{type:"select"},options:["default","gradient","minimal"]},color:{control:{type:"select"},options:["blue","green","purple","red","yellow"]},showValue:{control:"boolean"}}},l={args:{value:60,showValue:!0}},a={render:()=>e.jsxs("div",{className:"space-y-4 w-full max-w-md",children:[e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium mb-2",children:"Small"}),e.jsx(s,{value:40,size:"sm",showValue:!0})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium mb-2",children:"Medium"}),e.jsx(s,{value:60,size:"md",showValue:!0})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium mb-2",children:"Large"}),e.jsx(s,{value:80,size:"lg",showValue:!0})]})]})},r={render:()=>e.jsxs("div",{className:"space-y-4 w-full max-w-md",children:[e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium mb-2",children:"Default"}),e.jsx(s,{value:70,variant:"default",showValue:!0})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium mb-2",children:"Gradient"}),e.jsx(s,{value:70,variant:"gradient",showValue:!0})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium mb-2",children:"Minimal"}),e.jsx(s,{value:70,variant:"minimal",showValue:!0})]})]})},o={render:()=>e.jsxs("div",{className:"space-y-4 w-full max-w-md",children:[e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium mb-2",children:"Blue"}),e.jsx(s,{value:60,color:"blue",showValue:!0})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium mb-2",children:"Green"}),e.jsx(s,{value:60,color:"green",showValue:!0})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium mb-2",children:"Purple"}),e.jsx(s,{value:60,color:"purple",showValue:!0})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium mb-2",children:"Red"}),e.jsx(s,{value:60,color:"red",showValue:!0})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium mb-2",children:"Yellow"}),e.jsx(s,{value:60,color:"yellow",showValue:!0})]})]})},m={render:()=>e.jsxs("div",{className:"space-y-4 w-full max-w-md",children:[e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium mb-2",children:"Empty"}),e.jsx(s,{value:0,showValue:!0})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium mb-2",children:"In Progress"}),e.jsx(s,{value:45,showValue:!0})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium mb-2",children:"Almost Complete"}),e.jsx(s,{value:85,showValue:!0})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium mb-2",children:"Complete"}),e.jsx(s,{value:100,color:"green",showValue:!0})]})]})},n={render:()=>e.jsxs("div",{className:"space-y-3 w-full max-w-md",children:[e.jsx(s,{value:25,color:"red"}),e.jsx(s,{value:50,color:"yellow"}),e.jsx(s,{value:75,color:"blue"}),e.jsx(s,{value:100,color:"green"})]})};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    value: 60,
    showValue: true
  }
}`,...l.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => <div className="space-y-4 w-full max-w-md">
      <div>
        <label className="block text-sm font-medium mb-2">Small</label>
        <GlassProgress value={40} size="sm" showValue />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Medium</label>
        <GlassProgress value={60} size="md" showValue />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Large</label>
        <GlassProgress value={80} size="lg" showValue />
      </div>
    </div>
}`,...a.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => <div className="space-y-4 w-full max-w-md">
      <div>
        <label className="block text-sm font-medium mb-2">Default</label>
        <GlassProgress value={70} variant="default" showValue />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Gradient</label>
        <GlassProgress value={70} variant="gradient" showValue />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Minimal</label>
        <GlassProgress value={70} variant="minimal" showValue />
      </div>
    </div>
}`,...r.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => <div className="space-y-4 w-full max-w-md">
      <div>
        <label className="block text-sm font-medium mb-2">Blue</label>
        <GlassProgress value={60} color="blue" showValue />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Green</label>
        <GlassProgress value={60} color="green" showValue />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Purple</label>
        <GlassProgress value={60} color="purple" showValue />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Red</label>
        <GlassProgress value={60} color="red" showValue />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Yellow</label>
        <GlassProgress value={60} color="yellow" showValue />
      </div>
    </div>
}`,...o.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <div className="space-y-4 w-full max-w-md">
      <div>
        <label className="block text-sm font-medium mb-2">Empty</label>
        <GlassProgress value={0} showValue />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">In Progress</label>
        <GlassProgress value={45} showValue />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Almost Complete</label>
        <GlassProgress value={85} showValue />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Complete</label>
        <GlassProgress value={100} color="green" showValue />
      </div>
    </div>
}`,...m.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => <div className="space-y-3 w-full max-w-md">
      <GlassProgress value={25} color="red" />
      <GlassProgress value={50} color="yellow" />
      <GlassProgress value={75} color="blue" />
      <GlassProgress value={100} color="green" />
    </div>
}`,...n.parameters?.docs?.source}}};const u=["Default","Sizes","Variants","Colors","ProgressStates","WithoutLabels"];export{o as Colors,l as Default,m as ProgressStates,a as Sizes,r as Variants,n as WithoutLabels,u as __namedExportsOrder,i as default};

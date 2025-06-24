import{j as e}from"./iframe-BrIAL86F.js";import{G as s}from"./glass-select-DJw3U6gT.js";import"./glass-utils-B_l5-kDT.js";import"./createLucideIcon-DQ-sB9u0.js";const i={title:"Glass/GlassSelect",component:s,parameters:{layout:"centered"},tags:["autodocs"]},a={args:{children:"GlassSelect Component"}},r={args:{variant:"secondary",children:"Secondary GlassSelect"}},l={render:()=>e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(s,{size:"sm",children:"Small"}),e.jsx(s,{size:"md",children:"Medium"}),e.jsx(s,{size:"lg",children:"Large"})]})},c={render:()=>e.jsx("div",{className:"flex flex-col gap-4",children:e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(s,{children:"Normal"}),e.jsx(s,{disabled:!0,children:"Disabled"})]})})};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'GlassSelect Component'
  }
}`,...a.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'secondary',
    children: 'Secondary GlassSelect'
  }
}`,...r.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-4">
      <GlassSelect size="sm">Small</GlassSelect>
      <GlassSelect size="md">Medium</GlassSelect>
      <GlassSelect size="lg">Large</GlassSelect>
    </div>
}`,...l.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <GlassSelect>Normal</GlassSelect>
        <GlassSelect disabled>Disabled</GlassSelect>
      </div>
    </div>
}`,...c.parameters?.docs?.source}}};const m=["Primary","Secondary","Sizes","States"];export{a as Primary,r as Secondary,l as Sizes,c as States,m as __namedExportsOrder,i as default};

import{j as e}from"./iframe-BrIAL86F.js";import{G as s}from"./glass-popover-DrClWKlm.js";import"./index-BtLXlZrX.js";import"./glass-utils-B_l5-kDT.js";const t={title:"Glass/GlassPopover",component:s,parameters:{layout:"centered"},tags:["autodocs"]},r={args:{children:"GlassPopover Component"}},a={args:{variant:"secondary",children:"Secondary GlassPopover"}},o={render:()=>e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(s,{size:"sm",children:"Small"}),e.jsx(s,{size:"md",children:"Medium"}),e.jsx(s,{size:"lg",children:"Large"})]})},n={render:()=>e.jsx("div",{className:"flex flex-col gap-4",children:e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(s,{children:"Normal"}),e.jsx(s,{disabled:!0,children:"Disabled"})]})})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'GlassPopover Component'
  }
}`,...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'secondary',
    children: 'Secondary GlassPopover'
  }
}`,...a.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-4">
      <GlassPopover size="sm">Small</GlassPopover>
      <GlassPopover size="md">Medium</GlassPopover>
      <GlassPopover size="lg">Large</GlassPopover>
    </div>
}`,...o.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <GlassPopover>Normal</GlassPopover>
        <GlassPopover disabled>Disabled</GlassPopover>
      </div>
    </div>
}`,...n.parameters?.docs?.source}}};const m=["Primary","Secondary","Sizes","States"];export{r as Primary,a as Secondary,o as Sizes,n as States,m as __namedExportsOrder,t as default};

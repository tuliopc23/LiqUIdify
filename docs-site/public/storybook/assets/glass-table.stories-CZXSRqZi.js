import{j as e}from"./iframe-BrIAL86F.js";import{G as s}from"./glass-table-DDKE3x4o.js";import"./glass-utils-B_l5-kDT.js";const i={title:"Glass/GlassTable",component:s,parameters:{layout:"centered"},tags:["autodocs"]},a={args:{children:"GlassTable Component"}},r={args:{variant:"secondary",children:"Secondary GlassTable"}},l={render:()=>e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(s,{size:"sm",children:"Small"}),e.jsx(s,{size:"md",children:"Medium"}),e.jsx(s,{size:"lg",children:"Large"})]})},n={render:()=>e.jsx("div",{className:"flex flex-col gap-4",children:e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(s,{children:"Normal"}),e.jsx(s,{disabled:!0,children:"Disabled"})]})})};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'GlassTable Component'
  }
}`,...a.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'secondary',
    children: 'Secondary GlassTable'
  }
}`,...r.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-4">
      <GlassTable size="sm">Small</GlassTable>
      <GlassTable size="md">Medium</GlassTable>
      <GlassTable size="lg">Large</GlassTable>
    </div>
}`,...l.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <GlassTable>Normal</GlassTable>
        <GlassTable disabled>Disabled</GlassTable>
      </div>
    </div>
}`,...n.parameters?.docs?.source}}};const t=["Primary","Secondary","Sizes","States"];export{a as Primary,r as Secondary,l as Sizes,n as States,t as __namedExportsOrder,i as default};

import{j as s}from"./iframe-BtRd3yP4.js";import{G as e}from"./glass-tabs-CGat6KeO.js";import"./glass-utils-B_l5-kDT.js";const i={title:"Glass/GlassTabs",component:e,parameters:{layout:"centered"},tags:["autodocs"]},a={args:{children:"GlassTabs Component"}},r={args:{variant:"secondary",children:"Secondary GlassTabs"}},n={render:()=>s.jsxs("div",{className:"flex items-center gap-4",children:[s.jsx(e,{size:"sm",children:"Small"}),s.jsx(e,{size:"md",children:"Medium"}),s.jsx(e,{size:"lg",children:"Large"})]})},l={render:()=>s.jsx("div",{className:"flex flex-col gap-4",children:s.jsxs("div",{className:"flex items-center gap-4",children:[s.jsx(e,{children:"Normal"}),s.jsx(e,{disabled:!0,children:"Disabled"})]})})};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'GlassTabs Component'
  }
}`,...a.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'secondary',
    children: 'Secondary GlassTabs'
  }
}`,...r.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-4">
      <GlassTabs size="sm">Small</GlassTabs>
      <GlassTabs size="md">Medium</GlassTabs>
      <GlassTabs size="lg">Large</GlassTabs>
    </div>
}`,...n.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <GlassTabs>Normal</GlassTabs>
        <GlassTabs disabled>Disabled</GlassTabs>
      </div>
    </div>
}`,...l.parameters?.docs?.source}}};const t=["Primary","Secondary","Sizes","States"];export{a as Primary,r as Secondary,n as Sizes,l as States,t as __namedExportsOrder,i as default};

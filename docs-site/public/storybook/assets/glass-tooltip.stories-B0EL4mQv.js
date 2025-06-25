import{j as s}from"./iframe-BtRd3yP4.js";import{G as e}from"./glass-tooltip-BOIub7-V.js";import"./index-DwirsH3u.js";import"./glass-utils-B_l5-kDT.js";const d={title:"Glass/GlassTooltip",component:e,parameters:{layout:"centered"},tags:["autodocs"]},a={args:{children:"GlassTooltip Component"}},r={args:{variant:"secondary",children:"Secondary GlassTooltip"}},o={render:()=>s.jsxs("div",{className:"flex items-center gap-4",children:[s.jsx(e,{size:"sm",children:"Small"}),s.jsx(e,{size:"md",children:"Medium"}),s.jsx(e,{size:"lg",children:"Large"})]})},l={render:()=>s.jsx("div",{className:"flex flex-col gap-4",children:s.jsxs("div",{className:"flex items-center gap-4",children:[s.jsx(e,{children:"Normal"}),s.jsx(e,{disabled:!0,children:"Disabled"})]})})};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'GlassTooltip Component'
  }
}`,...a.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'secondary',
    children: 'Secondary GlassTooltip'
  }
}`,...r.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-4">
      <GlassTooltip size="sm">Small</GlassTooltip>
      <GlassTooltip size="md">Medium</GlassTooltip>
      <GlassTooltip size="lg">Large</GlassTooltip>
    </div>
}`,...o.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <GlassTooltip>Normal</GlassTooltip>
        <GlassTooltip disabled>Disabled</GlassTooltip>
      </div>
    </div>
}`,...l.parameters?.docs?.source}}};const m=["Primary","Secondary","Sizes","States"];export{a as Primary,r as Secondary,o as Sizes,l as States,m as __namedExportsOrder,d as default};

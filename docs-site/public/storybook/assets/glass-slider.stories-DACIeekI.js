import{j as e}from"./iframe-BrIAL86F.js";import{G as s}from"./glass-slider-D_Dtyvuf.js";import"./glass-utils-B_l5-kDT.js";const o={title:"Glass/GlassSlider",component:s,parameters:{layout:"centered"},tags:["autodocs"]},r={args:{children:"GlassSlider Component"}},a={args:{variant:"secondary",children:"Secondary GlassSlider"}},l={render:()=>e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(s,{size:"sm",children:"Small"}),e.jsx(s,{size:"md",children:"Medium"}),e.jsx(s,{size:"lg",children:"Large"})]})},d={render:()=>e.jsx("div",{className:"flex flex-col gap-4",children:e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(s,{children:"Normal"}),e.jsx(s,{disabled:!0,children:"Disabled"})]})})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'GlassSlider Component'
  }
}`,...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'secondary',
    children: 'Secondary GlassSlider'
  }
}`,...a.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-4">
      <GlassSlider size="sm">Small</GlassSlider>
      <GlassSlider size="md">Medium</GlassSlider>
      <GlassSlider size="lg">Large</GlassSlider>
    </div>
}`,...l.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <GlassSlider>Normal</GlassSlider>
        <GlassSlider disabled>Disabled</GlassSlider>
      </div>
    </div>
}`,...d.parameters?.docs?.source}}};const t=["Primary","Secondary","Sizes","States"];export{r as Primary,a as Secondary,l as Sizes,d as States,t as __namedExportsOrder,o as default};

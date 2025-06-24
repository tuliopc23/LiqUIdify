import{j as e}from"./iframe-BrIAL86F.js";import{T as r}from"./glass-toast-OzgTTdmd.js";import"./index-BtLXlZrX.js";import"./glass-utils-B_l5-kDT.js";import"./triangle-alert-vnzB3gUG.js";import"./createLucideIcon-DQ-sB9u0.js";import"./x-D5S6uNnZ.js";const v={title:"Glass/ToastProvider",component:r,parameters:{layout:"centered"},tags:["autodocs"]},s={args:{children:"ToastProvider Component"}},a={args:{variant:"secondary",children:"Secondary ToastProvider"}},o={render:()=>e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(r,{size:"sm",children:"Small"}),e.jsx(r,{size:"md",children:"Medium"}),e.jsx(r,{size:"lg",children:"Large"})]})},i={render:()=>e.jsx("div",{className:"flex flex-col gap-4",children:e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(r,{children:"Normal"}),e.jsx(r,{disabled:!0,children:"Disabled"})]})})};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'ToastProvider Component'
  }
}`,...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'secondary',
    children: 'Secondary ToastProvider'
  }
}`,...a.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-4">
      <ToastProvider size="sm">Small</ToastProvider>
      <ToastProvider size="md">Medium</ToastProvider>
      <ToastProvider size="lg">Large</ToastProvider>
    </div>
}`,...o.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <ToastProvider>Normal</ToastProvider>
        <ToastProvider disabled>Disabled</ToastProvider>
      </div>
    </div>
}`,...i.parameters?.docs?.source}}};const x=["Primary","Secondary","Sizes","States"];export{s as Primary,a as Secondary,o as Sizes,i as States,x as __namedExportsOrder,v as default};

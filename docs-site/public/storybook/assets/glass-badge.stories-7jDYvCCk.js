import{j as a}from"./iframe-BrIAL86F.js";import{G as e}from"./glass-badge-CR-CfAUU.js";import"./glass-utils-B_l5-kDT.js";const g={title:"Glass/GlassBadge",component:e,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{variant:{control:{type:"select"},options:["default","success","warning","error"]}}},r={args:{children:"Default Badge"}},s={args:{variant:"success",children:"Success Badge"}},n={args:{variant:"warning",children:"Warning Badge"}},c={args:{variant:"error",children:"Error Badge"}},i={render:()=>a.jsxs("div",{className:"flex items-center gap-4",children:[a.jsx(e,{variant:"default",children:"Default"}),a.jsx(e,{variant:"success",children:"Success"}),a.jsx(e,{variant:"warning",children:"Warning"}),a.jsx(e,{variant:"error",children:"Error"})]})},t={render:()=>a.jsxs("div",{className:"flex flex-col gap-4",children:[a.jsxs("div",{className:"flex items-center gap-4",children:[a.jsx(e,{children:"New"}),a.jsx(e,{variant:"success",children:"Available"}),a.jsx(e,{variant:"warning",children:"Pending"}),a.jsx(e,{variant:"error",children:"Sold Out"})]}),a.jsxs("div",{className:"flex items-center gap-4",children:[a.jsx(e,{children:"Draft"}),a.jsx(e,{variant:"success",children:"Published"}),a.jsx(e,{variant:"warning",children:"Review"}),a.jsx(e,{variant:"error",children:"Rejected"})]})]})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Default Badge'
  }
}`,...r.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'success',
    children: 'Success Badge'
  }
}`,...s.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'warning',
    children: 'Warning Badge'
  }
}`,...n.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'error',
    children: 'Error Badge'
  }
}`,...c.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-4">
      <GlassBadge variant="default">Default</GlassBadge>
      <GlassBadge variant="success">Success</GlassBadge>
      <GlassBadge variant="warning">Warning</GlassBadge>
      <GlassBadge variant="error">Error</GlassBadge>
    </div>
}`,...i.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <GlassBadge>New</GlassBadge>
        <GlassBadge variant="success">Available</GlassBadge>
        <GlassBadge variant="warning">Pending</GlassBadge>
        <GlassBadge variant="error">Sold Out</GlassBadge>
      </div>
      <div className="flex items-center gap-4">
        <GlassBadge>Draft</GlassBadge>
        <GlassBadge variant="success">Published</GlassBadge>
        <GlassBadge variant="warning">Review</GlassBadge>
        <GlassBadge variant="error">Rejected</GlassBadge>
      </div>
    </div>
}`,...t.parameters?.docs?.source}}};const m=["Default","Success","Warning","Error","AllVariants","Examples"];export{i as AllVariants,r as Default,c as Error,t as Examples,s as Success,n as Warning,m as __namedExportsOrder,g as default};

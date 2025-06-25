import{j as a}from"./iframe-BtRd3yP4.js";import{G as s}from"./glass-avatar-rHUrxiQJ.js";import"./glass-utils-B_l5-kDT.js";import"./user-CpDW9Sh_.js";import"./createLucideIcon-DipG8eAf.js";const m={title:"Glass/GlassAvatar",component:s,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{size:{control:{type:"select"},options:["xs","sm","md","lg","xl","2xl"]},variant:{control:{type:"select"},options:["circular","rounded","square"]},showBorder:{control:"boolean"},status:{control:{type:"select"},options:["online","offline","away","busy"]}}},t={args:{src:"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",alt:"User Avatar",size:"md"}},r={args:{alt:"John Doe",fallback:"JD",size:"md"}},e={render:()=>a.jsxs("div",{className:"flex items-center gap-4",children:[a.jsx(s,{src:"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",alt:"Small Avatar",size:"sm"}),a.jsx(s,{src:"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",alt:"Medium Avatar",size:"md"}),a.jsx(s,{src:"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",alt:"Large Avatar",size:"lg"}),a.jsx(s,{src:"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",alt:"Extra Large Avatar",size:"xl"})]})},o={render:()=>a.jsxs("div",{className:"flex items-center gap-4",children:[a.jsx(s,{src:"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",alt:"Circular Avatar",variant:"circular"}),a.jsx(s,{src:"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",alt:"Rounded Avatar",variant:"rounded"}),a.jsx(s,{src:"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",alt:"Square Avatar",variant:"square"})]})},c={render:()=>a.jsxs("div",{className:"flex items-center gap-4",children:[a.jsx(s,{src:"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",alt:"Avatar without border",showBorder:!1}),a.jsx(s,{src:"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",alt:"Avatar with border",showBorder:!0})]})},p={render:()=>a.jsxs("div",{className:"flex items-center gap-4",children:[a.jsx(s,{src:"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",alt:"Online",status:"online"}),a.jsx(s,{src:"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",alt:"Away",status:"away"}),a.jsx(s,{src:"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",alt:"Busy",status:"busy"}),a.jsx(s,{src:"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",alt:"Offline",status:"offline"})]})};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    alt: 'User Avatar',
    size: 'md'
  }
}`,...t.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    alt: 'John Doe',
    fallback: 'JD',
    size: 'md'
  }
}`,...r.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-4">
      <GlassAvatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" alt="Small Avatar" size="sm" />
      <GlassAvatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" alt="Medium Avatar" size="md" />
      <GlassAvatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" alt="Large Avatar" size="lg" />
      <GlassAvatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" alt="Extra Large Avatar" size="xl" />
    </div>
}`,...e.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-4">
      <GlassAvatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" alt="Circular Avatar" variant="circular" />
      <GlassAvatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" alt="Rounded Avatar" variant="rounded" />
      <GlassAvatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" alt="Square Avatar" variant="square" />
    </div>
}`,...o.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-4">
      <GlassAvatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" alt="Avatar without border" showBorder={false} />
      <GlassAvatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" alt="Avatar with border" showBorder={true} />
    </div>
}`,...c.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-4">
      <GlassAvatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" alt="Online" status="online" />
      <GlassAvatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" alt="Away" status="away" />
      <GlassAvatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" alt="Busy" status="busy" />
      <GlassAvatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" alt="Offline" status="offline" />
    </div>
}`,...p.parameters?.docs?.source}}};const u=["Default","WithFallback","Sizes","Variants","WithBorder","WithStatus"];export{t as Default,e as Sizes,o as Variants,c as WithBorder,r as WithFallback,p as WithStatus,u as __namedExportsOrder,m as default};

import{j as a}from"./iframe-BrIAL86F.js";import{G as s}from"./glass-loading-WSVnK3M9.js";import"./glass-utils-B_l5-kDT.js";const m={title:"Glass/GlassLoading",component:s,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{size:{control:{type:"select"},options:["sm","md","lg","xl"]},variant:{control:{type:"select"},options:["dots","spinner","pulse","bars"]},text:{control:"text"}}},e={args:{variant:"spinner"}},r={args:{variant:"dots"}},n={args:{variant:"pulse"}},t={args:{variant:"bars"}},i={args:{variant:"spinner",text:"Loading..."}},o={render:()=>a.jsxs("div",{className:"flex items-center gap-8",children:[a.jsx(s,{size:"sm",variant:"spinner",text:"Small"}),a.jsx(s,{size:"md",variant:"spinner",text:"Medium"}),a.jsx(s,{size:"lg",variant:"spinner",text:"Large"}),a.jsx(s,{size:"xl",variant:"spinner",text:"Extra Large"})]})},c={render:()=>a.jsxs("div",{className:"grid grid-cols-2 gap-8",children:[a.jsx(s,{variant:"spinner",text:"Spinner"}),a.jsx(s,{variant:"dots",text:"Dots"}),a.jsx(s,{variant:"pulse",text:"Pulse"}),a.jsx(s,{variant:"bars",text:"Bars"})]})},d={render:()=>a.jsxs("div",{className:"flex flex-col gap-6",children:[a.jsx(s,{variant:"spinner",text:"Connecting..."}),a.jsx(s,{variant:"dots",text:"Processing request..."}),a.jsx(s,{variant:"pulse",text:"Uploading files..."}),a.jsx(s,{variant:"bars",text:"Analyzing data..."})]})};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'spinner'
  }
}`,...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'dots'
  }
}`,...r.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'pulse'
  }
}`,...n.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'bars'
  }
}`,...t.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'spinner',
    text: 'Loading...'
  }
}`,...i.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-8">
      <GlassLoading size="sm" variant="spinner" text="Small" />
      <GlassLoading size="md" variant="spinner" text="Medium" />
      <GlassLoading size="lg" variant="spinner" text="Large" />
      <GlassLoading size="xl" variant="spinner" text="Extra Large" />
    </div>
}`,...o.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <div className="grid grid-cols-2 gap-8">
      <GlassLoading variant="spinner" text="Spinner" />
      <GlassLoading variant="dots" text="Dots" />
      <GlassLoading variant="pulse" text="Pulse" />
      <GlassLoading variant="bars" text="Bars" />
    </div>
}`,...c.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-6">
      <GlassLoading variant="spinner" text="Connecting..." />
      <GlassLoading variant="dots" text="Processing request..." />
      <GlassLoading variant="pulse" text="Uploading files..." />
      <GlassLoading variant="bars" text="Analyzing data..." />
    </div>
}`,...d.parameters?.docs?.source}}};const x=["Spinner","Dots","Pulse","Bars","WithText","Sizes","AllVariants","LoadingStates"];export{c as AllVariants,t as Bars,r as Dots,d as LoadingStates,n as Pulse,o as Sizes,e as Spinner,i as WithText,x as __namedExportsOrder,m as default};

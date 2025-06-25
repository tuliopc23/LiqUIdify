import{j as e}from"./iframe-BtRd3yP4.js";import{G as a}from"./glass-input-DibvJdMD.js";import{M as d}from"./mail-Jq4SwurS.js";import{S as p}from"./search-WRVFA5uT.js";import{c as i}from"./createLucideIcon-DipG8eAf.js";import"./glass-utils-B_l5-kDT.js";import"./x-BHbH8HHI.js";/**
 * @license lucide-react v0.522.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m=[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]],n=i("lock",m),j={title:"Glass/GlassInput",component:a,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{variant:{control:{type:"select"},options:["default","search","password","email"]},clearable:{control:"boolean"},error:{control:"boolean"},disabled:{control:"boolean"}}},r={args:{placeholder:"Enter text..."}},s={args:{variant:"search",placeholder:"Search..."}},o={args:{variant:"password",placeholder:"Enter password..."}},l={args:{variant:"email",placeholder:"Enter email...",leftIcon:e.jsx(d,{className:"h-4 w-4"})}},t={render:()=>e.jsxs("div",{className:"flex flex-col gap-4 w-80",children:[e.jsx(a,{placeholder:"With left icon",leftIcon:e.jsx(p,{className:"h-4 w-4"})}),e.jsx(a,{placeholder:"With right icon",rightIcon:e.jsx(n,{className:"h-4 w-4"})}),e.jsx(a,{placeholder:"With both icons",leftIcon:e.jsx(d,{className:"h-4 w-4"}),rightIcon:e.jsx(n,{className:"h-4 w-4"})})]})},c={render:()=>e.jsxs("div",{className:"flex flex-col gap-4 w-80",children:[e.jsx(a,{placeholder:"Normal state"}),e.jsx(a,{placeholder:"Disabled state",disabled:!0}),e.jsx(a,{placeholder:"Error state",error:!0}),e.jsx(a,{placeholder:"With value",defaultValue:"Some text"}),e.jsx(a,{placeholder:"Clearable",clearable:!0,defaultValue:"Clear me"})]})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    placeholder: 'Enter text...'
  }
}`,...r.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'search',
    placeholder: 'Search...'
  }
}`,...s.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'password',
    placeholder: 'Enter password...'
  }
}`,...o.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'email',
    placeholder: 'Enter email...',
    leftIcon: <Mail className="h-4 w-4" />
  }
}`,...l.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4 w-80">
      <GlassInput placeholder="With left icon" leftIcon={<SearchIcon className="h-4 w-4" />} />
      <GlassInput placeholder="With right icon" rightIcon={<Lock className="h-4 w-4" />} />
      <GlassInput placeholder="With both icons" leftIcon={<Mail className="h-4 w-4" />} rightIcon={<Lock className="h-4 w-4" />} />
    </div>
}`,...t.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4 w-80">
      <GlassInput placeholder="Normal state" />
      <GlassInput placeholder="Disabled state" disabled />
      <GlassInput placeholder="Error state" error />
      <GlassInput placeholder="With value" defaultValue="Some text" />
      <GlassInput placeholder="Clearable" clearable defaultValue="Clear me" />
    </div>
}`,...c.parameters?.docs?.source}}};const v=["Primary","Search","Password","Email","WithIcons","States"];export{l as Email,o as Password,r as Primary,s as Search,c as States,t as WithIcons,v as __namedExportsOrder,j as default};

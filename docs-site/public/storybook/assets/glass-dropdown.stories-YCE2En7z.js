import{j as e}from"./iframe-BrIAL86F.js";import{G as c}from"./glass-dropdown-W2ao22UP.js";import{G as t}from"./glass-button-LMZZlTMc.js";import{U as i}from"./user-CwfmRcx4.js";import{S as m}from"./settings-QPJeAMwQ.js";import{c as g}from"./createLucideIcon-DQ-sB9u0.js";import"./glass-utils-B_l5-kDT.js";import"./index-CR92cGio.js";/**
 * @license lucide-react v0.522.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",key:"1u773s"}],["path",{d:"M12 17h.01",key:"p32p05"}]],u=g("circle-question-mark",p);/**
 * @license lucide-react v0.522.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v=[["path",{d:"m16 17 5-5-5-5",key:"1bji2h"}],["path",{d:"M21 12H9",key:"dn1m92"}],["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}]],d=g("log-out",v),N={title:"Glass/GlassDropdown",component:c,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{align:{control:{type:"select"},options:["start","center","end"]},sideOffset:{control:{type:"number"}}}},a=[{label:"Profile",value:"profile",icon:e.jsx(i,{className:"w-4 h-4"})},{label:"Settings",value:"settings",icon:e.jsx(m,{className:"w-4 h-4"})},{label:"Help",value:"help",icon:e.jsx(u,{className:"w-4 h-4"})},{label:"Separator",value:"sep",separator:!0},{label:"Sign out",value:"signout",icon:e.jsx(d,{className:"w-4 h-4"})}],l={args:{trigger:e.jsx(t,{variant:"secondary",children:"Open Menu"}),items:a,onSelect:s=>console.log("Selected:",s)}},r={args:{trigger:e.jsx(t,{variant:"secondary",children:"Menu with Disabled Items"}),items:[{label:"Profile",value:"profile",icon:e.jsx(i,{className:"w-4 h-4"})},{label:"Settings",value:"settings",icon:e.jsx(m,{className:"w-4 h-4"}),disabled:!0},{label:"Help",value:"help",icon:e.jsx(u,{className:"w-4 h-4"})},{label:"Sign out",value:"signout",icon:e.jsx(d,{className:"w-4 h-4"})}],onSelect:s=>console.log("Selected:",s)}},o={render:()=>e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(c,{trigger:e.jsx(t,{variant:"secondary",children:"Start Align"}),items:a,align:"start",onSelect:s=>console.log("Selected:",s)}),e.jsx(c,{trigger:e.jsx(t,{variant:"secondary",children:"Center Align"}),items:a,align:"center",onSelect:s=>console.log("Selected:",s)}),e.jsx(c,{trigger:e.jsx(t,{variant:"secondary",children:"End Align"}),items:a,align:"end",onSelect:s=>console.log("Selected:",s)})]})},n={args:{trigger:e.jsx("div",{className:"w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center cursor-pointer",children:e.jsx(i,{className:"w-5 h-5 text-white"})}),items:a,onSelect:s=>console.log("Selected:",s)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    trigger: <GlassButton variant="secondary">Open Menu</GlassButton>,
    items: sampleItems,
    onSelect: value => console.log('Selected:', value)
  }
}`,...l.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    trigger: <GlassButton variant="secondary">Menu with Disabled Items</GlassButton>,
    items: [{
      label: 'Profile',
      value: 'profile',
      icon: <User className="w-4 h-4" />
    }, {
      label: 'Settings',
      value: 'settings',
      icon: <Settings className="w-4 h-4" />,
      disabled: true
    }, {
      label: 'Help',
      value: 'help',
      icon: <HelpCircle className="w-4 h-4" />
    }, {
      label: 'Sign out',
      value: 'signout',
      icon: <LogOut className="w-4 h-4" />
    }],
    onSelect: value => console.log('Selected:', value)
  }
}`,...r.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-4">
      <GlassDropdown trigger={<GlassButton variant="secondary">Start Align</GlassButton>} items={sampleItems} align="start" onSelect={value => console.log('Selected:', value)} />
      <GlassDropdown trigger={<GlassButton variant="secondary">Center Align</GlassButton>} items={sampleItems} align="center" onSelect={value => console.log('Selected:', value)} />
      <GlassDropdown trigger={<GlassButton variant="secondary">End Align</GlassButton>} items={sampleItems} align="end" onSelect={value => console.log('Selected:', value)} />
    </div>
}`,...o.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    trigger: <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center cursor-pointer">
        <User className="w-5 h-5 text-white" />
      </div>,
    items: sampleItems,
    onSelect: value => console.log('Selected:', value)
  }
}`,...n.parameters?.docs?.source}}};const G=["Default","WithDisabledItems","Alignment","CustomTrigger"];export{o as Alignment,n as CustomTrigger,l as Default,r as WithDisabledItems,G as __namedExportsOrder,N as default};

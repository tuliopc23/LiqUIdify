import{j as e}from"./iframe-BrIAL86F.js";import{G as a}from"./glass-switch-BF76PCIe.js";import"./glass-utils-B_l5-kDT.js";const d={title:"Glass/GlassSwitch",component:a,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{disabled:{control:"boolean"},checked:{control:"boolean"},label:{control:"text"}}},s={args:{label:"Enable notifications"}},l={args:{label:"Auto-save enabled",checked:!0}},t={args:{}},c={render:()=>e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsx(a,{label:"Normal switch"}),e.jsx(a,{label:"Checked switch",checked:!0}),e.jsx(a,{label:"Disabled switch",disabled:!0}),e.jsx(a,{label:"Disabled checked switch",disabled:!0,checked:!0})]})},r={render:()=>e.jsxs("div",{className:"flex flex-col gap-3",children:[e.jsx("h3",{className:"text-lg font-medium",children:"Settings"}),e.jsx(a,{label:"Dark mode"}),e.jsx(a,{label:"Email notifications",checked:!0}),e.jsx(a,{label:"Push notifications"}),e.jsx(a,{label:"Auto-save",checked:!0}),e.jsx(a,{label:"Analytics tracking",disabled:!0})]})};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Enable notifications'
  }
}`,...s.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Auto-save enabled',
    checked: true
  }
}`,...l.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {}
}`,...t.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4">
      <GlassSwitch label="Normal switch" />
      <GlassSwitch label="Checked switch" checked={true} />
      <GlassSwitch label="Disabled switch" disabled />
      <GlassSwitch label="Disabled checked switch" disabled checked={true} />
    </div>
}`,...c.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-3">
      <h3 className="text-lg font-medium">Settings</h3>
      <GlassSwitch label="Dark mode" />
      <GlassSwitch label="Email notifications" checked={true} />
      <GlassSwitch label="Push notifications" />
      <GlassSwitch label="Auto-save" checked={true} />
      <GlassSwitch label="Analytics tracking" disabled />
    </div>
}`,...r.parameters?.docs?.source}}};const m=["Default","Checked","WithoutLabel","States","Examples"];export{l as Checked,s as Default,r as Examples,c as States,t as WithoutLabel,m as __namedExportsOrder,d as default};

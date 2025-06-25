import{j as e}from"./iframe-BtRd3yP4.js";import{G as a}from"./glass-checkbox-BYkHGaoR.js";import"./glass-utils-B_l5-kDT.js";const i={title:"Glass/GlassCheckbox",component:a,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{disabled:{control:"boolean"},checked:{control:"boolean"},defaultChecked:{control:"boolean"}}},s={args:{label:"Accept terms and conditions"}},l={args:{label:"Pre-checked checkbox",defaultChecked:!0}},c={args:{}},r={render:()=>e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsx(a,{label:"Normal checkbox"}),e.jsx(a,{label:"Checked checkbox",defaultChecked:!0}),e.jsx(a,{label:"Disabled checkbox",disabled:!0}),e.jsx(a,{label:"Disabled checked checkbox",disabled:!0,defaultChecked:!0})]})},o={render:()=>e.jsxs("div",{className:"flex flex-col gap-3",children:[e.jsx("h3",{className:"text-lg font-medium",children:"Select your preferences:"}),e.jsx(a,{label:"Email notifications"}),e.jsx(a,{label:"SMS notifications"}),e.jsx(a,{label:"Push notifications",defaultChecked:!0}),e.jsx(a,{label:"Marketing emails"}),e.jsx(a,{label:"Security updates",defaultChecked:!0,disabled:!0})]})};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Accept terms and conditions'
  }
}`,...s.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Pre-checked checkbox',
    defaultChecked: true
  }
}`,...l.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {}
}`,...c.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4">
      <GlassCheckbox label="Normal checkbox" />
      <GlassCheckbox label="Checked checkbox" defaultChecked={true} />
      <GlassCheckbox label="Disabled checkbox" disabled />
      <GlassCheckbox label="Disabled checked checkbox" disabled defaultChecked={true} />
    </div>
}`,...r.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-3">
      <h3 className="text-lg font-medium">Select your preferences:</h3>
      <GlassCheckbox label="Email notifications" />
      <GlassCheckbox label="SMS notifications" />
      <GlassCheckbox label="Push notifications" defaultChecked={true} />
      <GlassCheckbox label="Marketing emails" />
      <GlassCheckbox label="Security updates" defaultChecked={true} disabled />
    </div>
}`,...o.parameters?.docs?.source}}};const b=["Default","Checked","WithoutLabel","States","MultipleOptions"];export{l as Checked,s as Default,o as MultipleOptions,r as States,c as WithoutLabel,b as __namedExportsOrder,i as default};

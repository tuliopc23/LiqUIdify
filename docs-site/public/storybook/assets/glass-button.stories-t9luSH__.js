import{j as e}from"./iframe-BtRd3yP4.js";import{G as a}from"./glass-button-CIpajFbv.js";import{T as f}from"./trash-C3Fq6Wk2.js";import{c as v}from"./createLucideIcon-DipG8eAf.js";import"./glass-utils-B_l5-kDT.js";import"./index-pFbBbV_8.js";/**
 * @license lucide-react v0.522.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B=[["polygon",{points:"6 3 20 12 6 21 6 3",key:"1oa8hb"}]],y=v("play",B);/**
 * @license lucide-react v0.522.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const G=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]],x=v("plus",G),P={title:"Glass/GlassButton",component:a,parameters:{layout:"centered",docs:{description:{component:"A premium glass-effect button component with advanced visual effects including glass morphism, magnetic hover, and haptic feedback."}}},tags:["autodocs"],argTypes:{variant:{control:{type:"select"},options:["primary","secondary","tertiary","ghost","destructive"],description:"Visual style variant of the button",table:{type:{summary:"string"},defaultValue:{summary:"primary"}}},size:{control:{type:"select"},options:["xs","sm","md","lg","xl"],description:"Size of the button",table:{type:{summary:"string"},defaultValue:{summary:"md"}}},loading:{control:"boolean",description:"Show loading spinner",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},disabled:{control:"boolean",description:"Disable the button",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},leftIcon:{description:"Icon to display on the left side",table:{type:{summary:"ReactNode"}}},rightIcon:{description:"Icon to display on the right side",table:{type:{summary:"ReactNode"}}}}},r={args:{variant:"primary",children:"Primary Button"}},t={args:{variant:"secondary",children:"Secondary Button"}},n={args:{variant:"tertiary",children:"Tertiary Button"}},i={args:{variant:"ghost",children:"Ghost Button"}},o={args:{variant:"destructive",children:"Delete Item",leftIcon:e.jsx(f,{})}},l={render:()=>e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(a,{size:"xs",children:"Extra Small"}),e.jsx(a,{size:"sm",children:"Small"}),e.jsx(a,{size:"md",children:"Medium"}),e.jsx(a,{size:"lg",children:"Large"}),e.jsx(a,{size:"xl",children:"Extra Large"})]})},c={render:()=>e.jsx("div",{className:"flex flex-col gap-4",children:e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(a,{leftIcon:e.jsx(y,{}),children:"Play Video"}),e.jsx(a,{rightIcon:e.jsx(x,{}),children:"Add Item"}),e.jsx(a,{leftIcon:e.jsx(y,{}),rightIcon:e.jsx(x,{}),children:"Both Icons"})]})})},d={render:()=>e.jsx("div",{className:"flex flex-col gap-4",children:e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(a,{children:"Normal"}),e.jsx(a,{loading:!0,children:"Loading"}),e.jsx(a,{disabled:!0,children:"Disabled"})]})})},m={render:()=>e.jsx("div",{className:"flex flex-col gap-4",children:e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(a,{variant:"primary",children:"Primary"}),e.jsx(a,{variant:"secondary",children:"Secondary"}),e.jsx(a,{variant:"tertiary",children:"Tertiary"}),e.jsx(a,{variant:"ghost",children:"Ghost"}),e.jsx(a,{variant:"destructive",children:"Destructive"})]})})},u={render:()=>e.jsx("div",{className:"space-y-6",children:["primary","secondary","tertiary","ghost","destructive"].map(s=>e.jsxs("div",{className:"space-y-2",children:[e.jsx("h3",{className:"text-sm font-medium capitalize",children:s}),e.jsx("div",{className:"flex items-center gap-4 flex-wrap",children:["xs","sm","md","lg","xl"].map(g=>e.jsxs(a,{variant:s,size:g,children:[s," ",g]},`${s}-${g}`))})]},s))})},p={decorators:[s=>e.jsxs("div",{className:"grid grid-cols-2 gap-8",children:[e.jsxs("div",{"data-theme":"light",className:"p-6 bg-white rounded-lg border",children:[e.jsx("h3",{className:"mb-4 text-sm font-medium",children:"Light Theme"}),e.jsx(s,{})]}),e.jsxs("div",{"data-theme":"dark",className:"p-6 bg-gray-900 rounded-lg border border-gray-700",children:[e.jsx("h3",{className:"mb-4 text-sm font-medium text-white",children:"Dark Theme"}),e.jsx(s,{})]})]})],render:()=>e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(a,{variant:"primary",children:"Primary"}),e.jsx(a,{variant:"secondary",children:"Secondary"}),e.jsx(a,{variant:"tertiary",children:"Tertiary"})]}),e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(a,{variant:"primary",leftIcon:e.jsx(y,{}),children:"With Icon"}),e.jsx(a,{variant:"secondary",loading:!0,children:"Loading"}),e.jsx(a,{variant:"tertiary",disabled:!0,children:"Disabled"})]})]})},h={render:s=>e.jsx(a,{...s}),args:{children:"Interactive Button",variant:"primary",size:"md",loading:!1,disabled:!1}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    children: 'Primary Button'
  }
}`,...r.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'secondary',
    children: 'Secondary Button'
  }
}`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'tertiary',
    children: 'Tertiary Button'
  }
}`,...n.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'ghost',
    children: 'Ghost Button'
  }
}`,...i.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'destructive',
    children: 'Delete Item',
    leftIcon: <TrashIcon />
  }
}`,...o.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-4">
      <GlassButton size="xs">Extra Small</GlassButton>
      <GlassButton size="sm">Small</GlassButton>
      <GlassButton size="md">Medium</GlassButton>
      <GlassButton size="lg">Large</GlassButton>
      <GlassButton size="xl">Extra Large</GlassButton>
    </div>
}`,...l.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <GlassButton leftIcon={<PlayIcon />}>Play Video</GlassButton>
        <GlassButton rightIcon={<PlusIcon />}>Add Item</GlassButton>
        <GlassButton leftIcon={<PlayIcon />} rightIcon={<PlusIcon />}>
          Both Icons
        </GlassButton>
      </div>
    </div>
}`,...c.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <GlassButton>Normal</GlassButton>
        <GlassButton loading>Loading</GlassButton>
        <GlassButton disabled>Disabled</GlassButton>
      </div>
    </div>
}`,...d.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <GlassButton variant="primary">Primary</GlassButton>
        <GlassButton variant="secondary">Secondary</GlassButton>
        <GlassButton variant="tertiary">Tertiary</GlassButton>
        <GlassButton variant="ghost">Ghost</GlassButton>
        <GlassButton variant="destructive">Destructive</GlassButton>
      </div>
    </div>
}`,...m.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => <div className="space-y-6">
      {['primary', 'secondary', 'tertiary', 'ghost', 'destructive'].map(variant => <div key={variant} className="space-y-2">
          <h3 className="text-sm font-medium capitalize">{variant}</h3>
          <div className="flex items-center gap-4 flex-wrap">
            {['xs', 'sm', 'md', 'lg', 'xl'].map(size => <GlassButton key={\`\${variant}-\${size}\`} variant={variant as any} size={size as any}>
                {variant} {size}
              </GlassButton>)}
          </div>
        </div>)}
    </div>
}`,...u.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  decorators: [Story => <div className="grid grid-cols-2 gap-8">
        <div data-theme="light" className="p-6 bg-white rounded-lg border">
          <h3 className="mb-4 text-sm font-medium">Light Theme</h3>
          <Story />
        </div>
        <div data-theme="dark" className="p-6 bg-gray-900 rounded-lg border border-gray-700">
          <h3 className="mb-4 text-sm font-medium text-white">Dark Theme</h3>
          <Story />
        </div>
      </div>],
  render: () => <div className="space-y-4">
      <div className="flex items-center gap-4">
        <GlassButton variant="primary">Primary</GlassButton>
        <GlassButton variant="secondary">Secondary</GlassButton>
        <GlassButton variant="tertiary">Tertiary</GlassButton>
      </div>
      <div className="flex items-center gap-4">
        <GlassButton variant="primary" leftIcon={<PlayIcon />}>With Icon</GlassButton>
        <GlassButton variant="secondary" loading>Loading</GlassButton>
        <GlassButton variant="tertiary" disabled>Disabled</GlassButton>
      </div>
    </div>
}`,...p.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: args => <GlassButton {...args} />,
  args: {
    children: 'Interactive Button',
    variant: 'primary',
    size: 'md',
    loading: false,
    disabled: false
  }
}`,...h.parameters?.docs?.source}}};const T=["Primary","Secondary","Tertiary","Ghost","Destructive","Sizes","WithIcons","States","AllVariants","AllPermutations","ThemeComparison","Playground"];export{u as AllPermutations,m as AllVariants,o as Destructive,i as Ghost,h as Playground,r as Primary,t as Secondary,l as Sizes,d as States,n as Tertiary,p as ThemeComparison,c as WithIcons,T as __namedExportsOrder,P as default};

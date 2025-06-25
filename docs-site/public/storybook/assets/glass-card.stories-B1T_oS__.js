import{j as a}from"./iframe-BtRd3yP4.js";import{G as e,b as r,c as d,d as t,a as s,e as u}from"./glass-card-D4w8jubJ.js";import{G as l}from"./glass-button-CIpajFbv.js";import"./glass-utils-B_l5-kDT.js";import"./index-pFbBbV_8.js";const w={title:"Glass/GlassCard",component:e,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{variant:{control:{type:"select"},options:["default","elevated","outlined","pressed"]},padding:{control:{type:"select"},options:["none","sm","md","lg","xl"]},hover:{control:"boolean"},bordered:{control:"boolean"}}},i={args:{variant:"default",children:a.jsxs(a.Fragment,{children:[a.jsxs(r,{children:[a.jsx(d,{children:"Card Title"}),a.jsx(t,{children:"Card description goes here"})]}),a.jsx(s,{children:a.jsx("p",{children:"This is the main content of the card. It can contain any elements."})}),a.jsx(u,{children:a.jsx(l,{size:"sm",children:"Action"})})]})}},o={args:{variant:"elevated",children:a.jsxs(a.Fragment,{children:[a.jsxs(r,{children:[a.jsx(d,{children:"Elevated Card"}),a.jsx(t,{children:"This card has more elevation"})]}),a.jsx(s,{children:a.jsx("p",{children:"Elevated cards stand out more from the background."})})]})}},c={args:{variant:"outlined",children:a.jsxs(a.Fragment,{children:[a.jsxs(r,{children:[a.jsx(d,{children:"Outlined Card"}),a.jsx(t,{children:"This card has a prominent border"})]}),a.jsx(s,{children:a.jsx("p",{children:"Outlined cards use borders for definition instead of background blur."})})]})}},m={args:{variant:"pressed",children:a.jsxs(a.Fragment,{children:[a.jsxs(r,{children:[a.jsx(d,{children:"Pressed Card"}),a.jsx(t,{children:"This card appears pressed or inset"})]}),a.jsx(s,{children:a.jsx("p",{children:"Pressed cards have an inset shadow effect."})})]})}},C={render:()=>a.jsxs("div",{className:"flex flex-col gap-6 w-full max-w-2xl",children:[a.jsx(e,{padding:"sm",children:a.jsx(s,{children:"Small padding card"})}),a.jsx(e,{padding:"md",children:a.jsx(s,{children:"Medium padding card (default)"})}),a.jsx(e,{padding:"lg",children:a.jsx(s,{children:"Large padding card"})}),a.jsx(e,{padding:"xl",children:a.jsx(s,{children:"Extra large padding card"})})]})},h={render:()=>a.jsxs("div",{className:"flex flex-col gap-4 w-full max-w-md",children:[a.jsx(e,{hover:!0,children:a.jsx(s,{children:"Hoverable card"})}),a.jsx(e,{hover:!1,children:a.jsx(s,{children:"Non-hoverable card"})}),a.jsx(e,{bordered:!0,children:a.jsx(s,{children:"Card with border"})}),a.jsx(e,{bordered:!1,children:a.jsx(s,{children:"Card without border"})})]})},p={render:()=>a.jsxs("div",{className:"grid grid-cols-2 gap-4 w-full max-w-4xl",children:[a.jsxs(e,{variant:"default",children:[a.jsx(r,{children:a.jsx(d,{children:"Default"})}),a.jsx(s,{children:"Default glass card variant"})]}),a.jsxs(e,{variant:"elevated",children:[a.jsx(r,{children:a.jsx(d,{children:"Elevated"})}),a.jsx(s,{children:"Elevated glass card variant"})]}),a.jsxs(e,{variant:"outlined",children:[a.jsx(r,{children:a.jsx(d,{children:"Outlined"})}),a.jsx(s,{children:"Outlined glass card variant"})]}),a.jsxs(e,{variant:"pressed",children:[a.jsx(r,{children:a.jsx(d,{children:"Pressed"})}),a.jsx(s,{children:"Pressed glass card variant"})]})]})},G={render:()=>a.jsx("div",{className:"space-y-8",children:["default","elevated","outlined","pressed"].map(n=>a.jsxs("div",{className:"space-y-4",children:[a.jsxs("h3",{className:"text-lg font-medium capitalize",children:[n," Variant"]}),a.jsx("div",{className:"grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4",children:["none","sm","md","lg","xl"].map(v=>a.jsx(e,{variant:n,padding:v,children:a.jsx(s,{children:a.jsxs("div",{className:"text-sm",children:[a.jsx("strong",{children:n}),a.jsx("br",{}),"padding: ",v]})})},`${n}-${v}`))})]},n))})},x={decorators:[n=>a.jsxs("div",{className:"grid grid-cols-2 gap-8",children:[a.jsxs("div",{"data-theme":"light",className:"p-6 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg",children:[a.jsx("h3",{className:"mb-4 text-sm font-medium",children:"Light Theme"}),a.jsx(n,{})]}),a.jsxs("div",{"data-theme":"dark",className:"p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg",children:[a.jsx("h3",{className:"mb-4 text-sm font-medium text-white",children:"Dark Theme"}),a.jsx(n,{})]})]})],render:()=>a.jsxs("div",{className:"space-y-4 max-w-md",children:[a.jsxs(e,{variant:"default",children:[a.jsxs(r,{children:[a.jsx(d,{children:"Default Card"}),a.jsx(t,{children:"Shows glass effect in both themes"})]}),a.jsx(s,{children:a.jsx("p",{children:"This card demonstrates how the glass effect adapts to different themes."})}),a.jsx(u,{children:a.jsx(l,{size:"sm",variant:"primary",children:"Action"})})]}),a.jsxs(e,{variant:"elevated",children:[a.jsx(r,{children:a.jsx(d,{children:"Elevated Card"})}),a.jsx(s,{children:a.jsx("p",{children:"More prominent in both light and dark themes."})})]})]})},g={render:()=>a.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl",children:[a.jsxs(e,{hover:!0,className:"cursor-pointer transition-all duration-300",children:[a.jsxs(r,{children:[a.jsx(d,{children:"Interactive Card"}),a.jsx(t,{children:"Hover to see the effect"})]}),a.jsx(s,{children:a.jsx("p",{children:"This card responds to mouse interactions with smooth transitions."})}),a.jsx(u,{children:a.jsx(l,{variant:"ghost",size:"sm",children:"Learn More"})})]}),a.jsxs(e,{variant:"outlined",bordered:!0,children:[a.jsxs(r,{children:[a.jsx(d,{children:"Product Card"}),a.jsx(t,{children:"$299.99"})]}),a.jsx(s,{children:a.jsxs("div",{className:"space-y-2",children:[a.jsx("div",{className:"h-24 bg-gradient-to-r from-blue-400 to-purple-500 rounded-md"}),a.jsx("p",{className:"text-sm",children:"Premium glass component with advanced styling."})]})}),a.jsxs(u,{className:"flex gap-2",children:[a.jsx(l,{variant:"primary",size:"sm",children:"Add to Cart"}),a.jsx(l,{variant:"secondary",size:"sm",children:"Wishlist"})]})]})]})};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'default',
    children: <>
        <GlassCardHeader>
          <GlassCardTitle>Card Title</GlassCardTitle>
          <GlassCardDescription>Card description goes here</GlassCardDescription>
        </GlassCardHeader>
        <GlassCardContent>
          <p>This is the main content of the card. It can contain any elements.</p>
        </GlassCardContent>
        <GlassCardFooter>
          <GlassButton size="sm">Action</GlassButton>
        </GlassCardFooter>
      </>
  }
}`,...i.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'elevated',
    children: <>
        <GlassCardHeader>
          <GlassCardTitle>Elevated Card</GlassCardTitle>
          <GlassCardDescription>This card has more elevation</GlassCardDescription>
        </GlassCardHeader>
        <GlassCardContent>
          <p>Elevated cards stand out more from the background.</p>
        </GlassCardContent>
      </>
  }
}`,...o.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'outlined',
    children: <>
        <GlassCardHeader>
          <GlassCardTitle>Outlined Card</GlassCardTitle>
          <GlassCardDescription>This card has a prominent border</GlassCardDescription>
        </GlassCardHeader>
        <GlassCardContent>
          <p>Outlined cards use borders for definition instead of background blur.</p>
        </GlassCardContent>
      </>
  }
}`,...c.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'pressed',
    children: <>
        <GlassCardHeader>
          <GlassCardTitle>Pressed Card</GlassCardTitle>
          <GlassCardDescription>This card appears pressed or inset</GlassCardDescription>
        </GlassCardHeader>
        <GlassCardContent>
          <p>Pressed cards have an inset shadow effect.</p>
        </GlassCardContent>
      </>
  }
}`,...m.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-6 w-full max-w-2xl">
      <GlassCard padding="sm">
        <GlassCardContent>Small padding card</GlassCardContent>
      </GlassCard>
      <GlassCard padding="md">
        <GlassCardContent>Medium padding card (default)</GlassCardContent>
      </GlassCard>
      <GlassCard padding="lg">
        <GlassCardContent>Large padding card</GlassCardContent>
      </GlassCard>
      <GlassCard padding="xl">
        <GlassCardContent>Extra large padding card</GlassCardContent>
      </GlassCard>
    </div>
}`,...C.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4 w-full max-w-md">
      <GlassCard hover={true}>
        <GlassCardContent>Hoverable card</GlassCardContent>
      </GlassCard>
      <GlassCard hover={false}>
        <GlassCardContent>Non-hoverable card</GlassCardContent>
      </GlassCard>
      <GlassCard bordered={true}>
        <GlassCardContent>Card with border</GlassCardContent>
      </GlassCard>
      <GlassCard bordered={false}>
        <GlassCardContent>Card without border</GlassCardContent>
      </GlassCard>
    </div>
}`,...h.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <div className="grid grid-cols-2 gap-4 w-full max-w-4xl">
      <GlassCard variant="default">
        <GlassCardHeader>
          <GlassCardTitle>Default</GlassCardTitle>
        </GlassCardHeader>
        <GlassCardContent>Default glass card variant</GlassCardContent>
      </GlassCard>
      <GlassCard variant="elevated">
        <GlassCardHeader>
          <GlassCardTitle>Elevated</GlassCardTitle>
        </GlassCardHeader>
        <GlassCardContent>Elevated glass card variant</GlassCardContent>
      </GlassCard>
      <GlassCard variant="outlined">
        <GlassCardHeader>
          <GlassCardTitle>Outlined</GlassCardTitle>
        </GlassCardHeader>
        <GlassCardContent>Outlined glass card variant</GlassCardContent>
      </GlassCard>
      <GlassCard variant="pressed">
        <GlassCardHeader>
          <GlassCardTitle>Pressed</GlassCardTitle>
        </GlassCardHeader>
        <GlassCardContent>Pressed glass card variant</GlassCardContent>
      </GlassCard>
    </div>
}`,...p.parameters?.docs?.source}}};G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  render: () => <div className="space-y-8">
      {['default', 'elevated', 'outlined', 'pressed'].map(variant => <div key={variant} className="space-y-4">
          <h3 className="text-lg font-medium capitalize">{variant} Variant</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {['none', 'sm', 'md', 'lg', 'xl'].map(padding => <GlassCard key={\`\${variant}-\${padding}\`} variant={variant as any} padding={padding as any}>
                <GlassCardContent>
                  <div className="text-sm">
                    <strong>{variant}</strong><br />
                    padding: {padding}
                  </div>
                </GlassCardContent>
              </GlassCard>)}
          </div>
        </div>)}
    </div>
}`,...G.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  decorators: [Story => <div className="grid grid-cols-2 gap-8">
        <div data-theme="light" className="p-6 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg">
          <h3 className="mb-4 text-sm font-medium">Light Theme</h3>
          <Story />
        </div>
        <div data-theme="dark" className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg">
          <h3 className="mb-4 text-sm font-medium text-white">Dark Theme</h3>
          <Story />
        </div>
      </div>],
  render: () => <div className="space-y-4 max-w-md">
      <GlassCard variant="default">
        <GlassCardHeader>
          <GlassCardTitle>Default Card</GlassCardTitle>
          <GlassCardDescription>Shows glass effect in both themes</GlassCardDescription>
        </GlassCardHeader>
        <GlassCardContent>
          <p>This card demonstrates how the glass effect adapts to different themes.</p>
        </GlassCardContent>
        <GlassCardFooter>
          <GlassButton size="sm" variant="primary">Action</GlassButton>
        </GlassCardFooter>
      </GlassCard>
      
      <GlassCard variant="elevated">
        <GlassCardHeader>
          <GlassCardTitle>Elevated Card</GlassCardTitle>
        </GlassCardHeader>
        <GlassCardContent>
          <p>More prominent in both light and dark themes.</p>
        </GlassCardContent>
      </GlassCard>
    </div>
}`,...x.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
      <GlassCard hover={true} className="cursor-pointer transition-all duration-300">
        <GlassCardHeader>
          <GlassCardTitle>Interactive Card</GlassCardTitle>
          <GlassCardDescription>Hover to see the effect</GlassCardDescription>
        </GlassCardHeader>
        <GlassCardContent>
          <p>This card responds to mouse interactions with smooth transitions.</p>
        </GlassCardContent>
        <GlassCardFooter>
          <GlassButton variant="ghost" size="sm">Learn More</GlassButton>
        </GlassCardFooter>
      </GlassCard>

      <GlassCard variant="outlined" bordered={true}>
        <GlassCardHeader>
          <GlassCardTitle>Product Card</GlassCardTitle>
          <GlassCardDescription>$299.99</GlassCardDescription>
        </GlassCardHeader>
        <GlassCardContent>
          <div className="space-y-2">
            <div className="h-24 bg-gradient-to-r from-blue-400 to-purple-500 rounded-md"></div>
            <p className="text-sm">Premium glass component with advanced styling.</p>
          </div>
        </GlassCardContent>
        <GlassCardFooter className="flex gap-2">
          <GlassButton variant="primary" size="sm">Add to Cart</GlassButton>
          <GlassButton variant="secondary" size="sm">Wishlist</GlassButton>
        </GlassCardFooter>
      </GlassCard>
    </div>
}`,...g.parameters?.docs?.source}}};const y=["Primary","Elevated","Outlined","Pressed","Sizes","States","AllVariants","AllPermutations","ThemeComparison","InteractiveShowcase"];export{G as AllPermutations,p as AllVariants,o as Elevated,g as InteractiveShowcase,c as Outlined,m as Pressed,i as Primary,C as Sizes,h as States,x as ThemeComparison,y as __namedExportsOrder,w as default};

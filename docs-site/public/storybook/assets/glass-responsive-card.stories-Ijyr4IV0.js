import{r as R,j as e}from"./iframe-BtRd3yP4.js";import{c as l,g as o,m as y}from"./glass-utils-B_l5-kDT.js";const s=R.forwardRef(({className:i,variant:t="default",hover:c=!0,bordered:m=!0,padding:u="md",responsive:p=!0,stackOnMobile:v=!1,children:f,...g},x)=>{const C={default:o("default"),elevated:o("elevated"),outlined:"bg-transparent border-2 border-[var(--glass-border)]",pressed:l(o("pressed"),"shadow-inner")},b=p?{none:"",xs:"p-2 sm:p-3",sm:"p-3 sm:p-4",md:"p-4 sm:p-6",lg:"p-6 sm:p-8",xl:"p-8 sm:p-12"}:{none:"",xs:"p-2",sm:"p-3",md:"p-6",lg:"p-8",xl:"p-12"},G=l("rounded-xl overflow-hidden",C[t],b[u],m&&t!=="outlined"&&"border border-[var(--glass-border)]",c&&"glass-interactive cursor-pointer",y.smooth,"will-change-transform",p&&["text-sm sm:text-base",v&&"flex flex-col sm:flex-row sm:items-center"]);return e.jsx("div",{ref:x,className:l(G,i),...g,children:f})});s.displayName="GlassResponsiveCard";try{s.displayName="GlassResponsiveCard",s.__docgenInfo={description:"",displayName:"GlassResponsiveCard",props:{variant:{defaultValue:{value:"default"},description:"",name:"variant",required:!1,type:{name:"enum",value:[{value:"undefined"},{value:'"default"'},{value:'"elevated"'},{value:'"outlined"'},{value:'"pressed"'}]}},hover:{defaultValue:{value:"true"},description:"",name:"hover",required:!1,type:{name:"boolean | undefined"}},bordered:{defaultValue:{value:"true"},description:"",name:"bordered",required:!1,type:{name:"boolean | undefined"}},padding:{defaultValue:{value:"md"},description:"",name:"padding",required:!1,type:{name:"enum",value:[{value:"undefined"},{value:'"xs"'},{value:'"sm"'},{value:'"md"'},{value:'"lg"'},{value:'"xl"'},{value:'"none"'}]}},responsive:{defaultValue:{value:"true"},description:"",name:"responsive",required:!1,type:{name:"boolean | undefined"}},stackOnMobile:{defaultValue:{value:"false"},description:"",name:"stackOnMobile",required:!1,type:{name:"boolean | undefined"}}}}}catch{}const N={title:"Glass/GlassResponsiveCard",component:s,parameters:{layout:"centered"},tags:["autodocs"]},a={args:{children:"GlassResponsiveCard Component"}},r={args:{variant:"secondary",children:"Secondary GlassResponsiveCard"}},n={render:()=>e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(s,{size:"sm",children:"Small"}),e.jsx(s,{size:"md",children:"Medium"}),e.jsx(s,{size:"lg",children:"Large"})]})},d={render:()=>e.jsx("div",{className:"flex flex-col gap-4",children:e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(s,{children:"Normal"}),e.jsx(s,{disabled:!0,children:"Disabled"})]})})};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'GlassResponsiveCard Component'
  }
}`,...a.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'secondary',
    children: 'Secondary GlassResponsiveCard'
  }
}`,...r.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-4">
      <GlassResponsiveCard size="sm">Small</GlassResponsiveCard>
      <GlassResponsiveCard size="md">Medium</GlassResponsiveCard>
      <GlassResponsiveCard size="lg">Large</GlassResponsiveCard>
    </div>
}`,...n.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <GlassResponsiveCard>Normal</GlassResponsiveCard>
        <GlassResponsiveCard disabled>Disabled</GlassResponsiveCard>
      </div>
    </div>
}`,...d.parameters?.docs?.source}}};const j=["Primary","Secondary","Sizes","States"];export{a as Primary,r as Secondary,n as Sizes,d as States,j as __namedExportsOrder,N as default};

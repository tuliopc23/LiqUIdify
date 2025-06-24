import{r as b,j as e}from"./iframe-BrIAL86F.js";import{c as d,g as o,m as h}from"./glass-utils-B_l5-kDT.js";const s=b.forwardRef(({className:m,variant:t="default",hover:p=!0,bordered:c=!0,padding:u="md",responsive:i=!0,stackOnMobile:v=!1,children:f,...x},g)=>{const C={default:o("default"),elevated:o("elevated"),outlined:"bg-transparent border-2 border-[var(--glass-border)]",pressed:d(o("pressed"),"shadow-inner")},G=i?{none:"",xs:"p-2 sm:p-3",sm:"p-3 sm:p-4",md:"p-4 sm:p-6",lg:"p-6 sm:p-8",xl:"p-8 sm:p-12"}:{none:"",xs:"p-2",sm:"p-3",md:"p-6",lg:"p-8",xl:"p-12"},R=d("rounded-xl overflow-hidden",C[t],G[u],c&&t!=="outlined"&&"border border-[var(--glass-border)]",p&&"glass-interactive cursor-pointer",h.smooth,"will-change-transform",i&&["text-sm sm:text-base",v&&"flex flex-col sm:flex-row sm:items-center"]);return e.jsx("div",{ref:g,className:d(R,m),...x,children:f})});s.displayName="GlassResponsiveCard";s.__docgenInfo={description:"",methods:[],displayName:"GlassResponsiveCard",props:{variant:{required:!1,tsType:{name:"union",raw:'"default" | "elevated" | "outlined" | "pressed"',elements:[{name:"literal",value:'"default"'},{name:"literal",value:'"elevated"'},{name:"literal",value:'"outlined"'},{name:"literal",value:'"pressed"'}]},description:"",defaultValue:{value:'"default"',computed:!1}},hover:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},bordered:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},padding:{required:!1,tsType:{name:"union",raw:'"none" | "xs" | "sm" | "md" | "lg" | "xl"',elements:[{name:"literal",value:'"none"'},{name:"literal",value:'"xs"'},{name:"literal",value:'"sm"'},{name:"literal",value:'"md"'},{name:"literal",value:'"lg"'},{name:"literal",value:'"xl"'}]},description:"",defaultValue:{value:'"md"',computed:!1}},responsive:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},stackOnMobile:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const j={title:"Glass/GlassResponsiveCard",component:s,parameters:{layout:"centered"},tags:["autodocs"]},a={args:{children:"GlassResponsiveCard Component"}},r={args:{variant:"secondary",children:"Secondary GlassResponsiveCard"}},l={render:()=>e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(s,{size:"sm",children:"Small"}),e.jsx(s,{size:"md",children:"Medium"}),e.jsx(s,{size:"lg",children:"Large"})]})},n={render:()=>e.jsx("div",{className:"flex flex-col gap-4",children:e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(s,{children:"Normal"}),e.jsx(s,{disabled:!0,children:"Disabled"})]})})};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'GlassResponsiveCard Component'
  }
}`,...a.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'secondary',
    children: 'Secondary GlassResponsiveCard'
  }
}`,...r.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-4">
      <GlassResponsiveCard size="sm">Small</GlassResponsiveCard>
      <GlassResponsiveCard size="md">Medium</GlassResponsiveCard>
      <GlassResponsiveCard size="lg">Large</GlassResponsiveCard>
    </div>
}`,...l.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <GlassResponsiveCard>Normal</GlassResponsiveCard>
        <GlassResponsiveCard disabled>Disabled</GlassResponsiveCard>
      </div>
    </div>
}`,...n.parameters?.docs?.source}}};const N=["Primary","Secondary","Sizes","States"];export{a as Primary,r as Secondary,l as Sizes,n as States,N as __namedExportsOrder,j as default};

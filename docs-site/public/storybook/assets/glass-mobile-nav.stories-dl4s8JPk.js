import{r as m,j as e}from"./iframe-BrIAL86F.js";import{r as G}from"./index-BtLXlZrX.js";import{c as n,m as x,g}from"./glass-utils-B_l5-kDT.js";import{X as h}from"./x-D5S6uNnZ.js";import{c as b}from"./createLucideIcon-DQ-sB9u0.js";/**
 * @license lucide-react v0.522.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S=[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]],k=b("chevron-right",S);/**
 * @license lucide-react v0.522.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I=[["path",{d:"M4 12h16",key:"1lakjw"}],["path",{d:"M4 18h16",key:"19g7jn"}],["path",{d:"M4 6h16",key:"1o0s65"}]],C=b("menu",I),a=({items:N,className:f,onItemClick:y})=>{const[r,t]=m.useState(!1),[d,j]=m.useState(null);m.useEffect(()=>(r?document.body.style.overflow="hidden":document.body.style.overflow="",()=>{document.body.style.overflow=""}),[r]);const M=s=>{s.children?.length?j(d===s.id?null:s.id):(s.action&&s.action(),y?.(s),t(!1))},v=()=>e.jsx("button",{onClick:()=>t(!r),className:n("p-3 rounded-xl",g("default"),"hover:bg-[var(--glass-bg-elevated)]",x.interactive,"focus:outline-none focus:ring-2 focus:ring-blue-500/30","md:hidden",f),"aria-label":"Toggle navigation menu",children:r?e.jsx(h,{className:"w-5 h-5 text-[var(--text-primary)]"}):e.jsx(C,{className:"w-5 h-5 text-[var(--text-primary)]"})}),p=(s,u=0)=>e.jsxs("div",{className:"w-full",children:[e.jsxs("button",{onClick:()=>M(s),className:n("w-full flex items-center justify-between p-4 text-left","hover:bg-[var(--glass-bg)] active:bg-[var(--glass-bg-pressed)]",x.gentle,u>0&&"pl-8 border-l-2 border-[var(--glass-border)]"),children:[e.jsxs("div",{className:"flex items-center gap-3",children:[s.icon&&e.jsx("span",{className:"w-5 h-5 text-[var(--text-secondary)]",children:s.icon}),e.jsx("span",{className:"text-[var(--text-primary)] font-medium",children:s.label})]}),s.children?.length&&e.jsx(k,{className:n("w-4 h-4 text-[var(--text-secondary)] transition-transform duration-200",d===s.id&&"rotate-90")})]}),s.children?.length&&d===s.id&&e.jsx("div",{className:"border-t border-[var(--glass-border)]",children:s.children.map(w=>p(w,u+1))})]},s.id);return r?e.jsxs(e.Fragment,{children:[e.jsx(v,{}),G.createPortal(e.jsxs("div",{className:"fixed inset-0 z-50 md:hidden",children:[e.jsx("div",{className:"absolute inset-0 bg-black/20 backdrop-blur-sm",onClick:()=>t(!1)}),e.jsxs("div",{className:n("absolute right-0 top-0 h-full w-80 max-w-[85vw]",g("elevated"),"border-l border-[var(--glass-border)]","animate-in slide-in-from-right duration-300"),children:[e.jsxs("div",{className:"flex items-center justify-between p-4 border-b border-[var(--glass-border)]",children:[e.jsx("h2",{className:"text-lg font-semibold text-[var(--text-primary)]",children:"Navigation"}),e.jsx("button",{onClick:()=>t(!1),className:"p-2 rounded-lg hover:bg-[var(--glass-bg)] text-[var(--text-secondary)]",children:e.jsx(h,{className:"w-5 h-5"})})]}),e.jsx("div",{className:"flex flex-col overflow-y-auto h-[calc(100%-80px)]",children:N.map(s=>p(s))})]})]}),document.body)]}):e.jsx(v,{})};a.__docgenInfo={description:"",methods:[],displayName:"GlassMobileNav",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"NavItem"}],raw:"NavItem[]"},description:""},className:{required:!1,tsType:{name:"string"},description:""},onItemClick:{required:!1,tsType:{name:"signature",type:"function",raw:"(item: NavItem) => void",signature:{arguments:[{type:{name:"NavItem"},name:"item"}],return:{name:"void"}}},description:""}}};const D={title:"Glass/GlassMobileNav",component:a,parameters:{layout:"centered"},tags:["autodocs"]},l={args:{children:"GlassMobileNav Component"}},o={args:{variant:"secondary",children:"Secondary GlassMobileNav"}},i={render:()=>e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(a,{size:"sm",children:"Small"}),e.jsx(a,{size:"md",children:"Medium"}),e.jsx(a,{size:"lg",children:"Large"})]})},c={render:()=>e.jsx("div",{className:"flex flex-col gap-4",children:e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(a,{children:"Normal"}),e.jsx(a,{disabled:!0,children:"Disabled"})]})})};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'GlassMobileNav Component'
  }
}`,...l.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'secondary',
    children: 'Secondary GlassMobileNav'
  }
}`,...o.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-4">
      <GlassMobileNav size="sm">Small</GlassMobileNav>
      <GlassMobileNav size="md">Medium</GlassMobileNav>
      <GlassMobileNav size="lg">Large</GlassMobileNav>
    </div>
}`,...i.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <GlassMobileNav>Normal</GlassMobileNav>
        <GlassMobileNav disabled>Disabled</GlassMobileNav>
      </div>
    </div>
}`,...c.parameters?.docs?.source}}};const L=["Primary","Secondary","Sizes","States"];export{l as Primary,o as Secondary,i as Sizes,c as States,L as __namedExportsOrder,D as default};

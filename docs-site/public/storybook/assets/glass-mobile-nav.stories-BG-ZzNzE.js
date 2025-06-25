import{r as m,j as e}from"./iframe-BtRd3yP4.js";import{r as w}from"./index-DwirsH3u.js";import{c as n,m as b,g as h}from"./glass-utils-B_l5-kDT.js";import{X as g}from"./x-BHbH8HHI.js";import{c as f}from"./createLucideIcon-DipG8eAf.js";/**
 * @license lucide-react v0.522.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S=[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]],k=f("chevron-right",S);/**
 * @license lucide-react v0.522.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _=[["path",{d:"M4 12h16",key:"1lakjw"}],["path",{d:"M4 18h16",key:"19g7jn"}],["path",{d:"M4 6h16",key:"1o0s65"}]],C=f("menu",_),a=({items:u,className:N,onItemClick:y})=>{const[r,l]=m.useState(!1),[d,j]=m.useState(null);m.useEffect(()=>(r?document.body.style.overflow="hidden":document.body.style.overflow="",()=>{document.body.style.overflow=""}),[r]);const M=s=>{s.children?.length?j(d===s.id?null:s.id):(s.action&&s.action(),y?.(s),l(!1))},p=()=>e.jsx("button",{onClick:()=>l(!r),className:n("p-3 rounded-xl",h("default"),"hover:bg-[var(--glass-bg-elevated)]",b.interactive,"focus:outline-none focus:ring-2 focus:ring-blue-500/30","md:hidden",N),"aria-label":"Toggle navigation menu",children:r?e.jsx(g,{className:"w-5 h-5 text-[var(--text-primary)]"}):e.jsx(C,{className:"w-5 h-5 text-[var(--text-primary)]"})}),v=(s,x=0)=>e.jsxs("div",{className:"w-full",children:[e.jsxs("button",{onClick:()=>M(s),className:n("w-full flex items-center justify-between p-4 text-left","hover:bg-[var(--glass-bg)] active:bg-[var(--glass-bg-pressed)]",b.gentle,x>0&&"pl-8 border-l-2 border-[var(--glass-border)]"),children:[e.jsxs("div",{className:"flex items-center gap-3",children:[s.icon&&e.jsx("span",{className:"w-5 h-5 text-[var(--text-secondary)]",children:s.icon}),e.jsx("span",{className:"text-[var(--text-primary)] font-medium",children:s.label})]}),s.children?.length&&e.jsx(k,{className:n("w-4 h-4 text-[var(--text-secondary)] transition-transform duration-200",d===s.id&&"rotate-90")})]}),s.children?.length&&d===s.id&&e.jsx("div",{className:"border-t border-[var(--glass-border)]",children:s.children.map(G=>v(G,x+1))})]},s.id);return r?e.jsxs(e.Fragment,{children:[e.jsx(p,{}),w.createPortal(e.jsxs("div",{className:"fixed inset-0 z-50 md:hidden",children:[e.jsx("div",{className:"absolute inset-0 bg-black/20 backdrop-blur-sm",onClick:()=>l(!1)}),e.jsxs("div",{className:n("absolute right-0 top-0 h-full w-80 max-w-[85vw]",h("elevated"),"border-l border-[var(--glass-border)]","animate-in slide-in-from-right duration-300"),children:[e.jsxs("div",{className:"flex items-center justify-between p-4 border-b border-[var(--glass-border)]",children:[e.jsx("h2",{className:"text-lg font-semibold text-[var(--text-primary)]",children:"Navigation"}),e.jsx("button",{onClick:()=>l(!1),className:"p-2 rounded-lg hover:bg-[var(--glass-bg)] text-[var(--text-secondary)]",children:e.jsx(g,{className:"w-5 h-5"})})]}),e.jsx("div",{className:"flex flex-col overflow-y-auto h-[calc(100%-80px)]",children:u.map(s=>v(s))})]})]}),document.body)]}):e.jsx(p,{})};try{a.displayName="GlassMobileNav",a.__docgenInfo={description:"",displayName:"GlassMobileNav",props:{items:{defaultValue:null,description:"",name:"items",required:!0,type:{name:"NavItem[]"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string | undefined"}},onItemClick:{defaultValue:null,description:"",name:"onItemClick",required:!1,type:{name:"((item: NavItem) => void) | undefined"}}}}}catch{}const L={title:"Glass/GlassMobileNav",component:a,parameters:{layout:"centered"},tags:["autodocs"]},t={args:{children:"GlassMobileNav Component"}},o={args:{variant:"secondary",children:"Secondary GlassMobileNav"}},i={render:()=>e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(a,{size:"sm",children:"Small"}),e.jsx(a,{size:"md",children:"Medium"}),e.jsx(a,{size:"lg",children:"Large"})]})},c={render:()=>e.jsx("div",{className:"flex flex-col gap-4",children:e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(a,{children:"Normal"}),e.jsx(a,{disabled:!0,children:"Disabled"})]})})};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'GlassMobileNav Component'
  }
}`,...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
}`,...c.parameters?.docs?.source}}};const O=["Primary","Secondary","Sizes","States"];export{t as Primary,o as Secondary,i as Sizes,c as States,O as __namedExportsOrder,L as default};

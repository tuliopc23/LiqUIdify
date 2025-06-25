import{r,j as e}from"./iframe-BtRd3yP4.js";import{r as q}from"./index-DwirsH3u.js";import{c as m,m as _,g as M}from"./glass-utils-B_l5-kDT.js";import{S as g}from"./search-WRVFA5uT.js";import{A as I}from"./arrow-right-BvAKQTDV.js";import{c as o}from"./createLucideIcon-DipG8eAf.js";import{S as E}from"./settings-CEug4zAV.js";import{U as H}from"./user-CpDW9Sh_.js";import{M as L}from"./mail-Jq4SwurS.js";/**
 * @license lucide-react v0.522.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const G=[["path",{d:"m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z",key:"1fy3hk"}]],R=o("bookmark",G);/**
 * @license lucide-react v0.522.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const U=[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]],W=o("calendar",U);/**
 * @license lucide-react v0.522.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const K=[["path",{d:"M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3",key:"11bfej"}]],Q=o("command",K);/**
 * @license lucide-react v0.522.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B=[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]],F=o("file-text",B);/**
 * @license lucide-react v0.522.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Z=[["line",{x1:"4",x2:"20",y1:"9",y2:"9",key:"4lhtct"}],["line",{x1:"4",x2:"20",y1:"15",y2:"15",key:"vyu0kd"}],["line",{x1:"10",x2:"8",y1:"3",y2:"21",key:"1ggp8o"}],["line",{x1:"16",x2:"14",y1:"3",y2:"21",key:"weycgp"}]],J=o("hash",Z);/**
 * @license lucide-react v0.522.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const X=[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",key:"5wwlr5"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"1d0kgt"}]],Y=o("house",X);/**
 * @license lucide-react v0.522.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ee=[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",key:"1xq2db"}]],ae=o("zap",ee),y=({items:j,placeholder:V="Type a command or search...",shortcut:A=["cmd","k"],className:D})=>{const[n,f]=r.useState(!1),[b,N]=r.useState(""),[l,i]=r.useState(0),v=r.useRef(null),O=r.useRef(null),w=j.filter(a=>{const t=b.toLowerCase().split(" "),s=`${a.label} ${a.description||""} ${a.keywords?.join(" ")||""}`.toLowerCase();return t.every(S=>s.includes(S))}).reduce((a,t)=>{const s=t.category||"General";return a[s]||(a[s]=[]),a[s].push(t),a},{}),c=Object.values(w).flat();r.useEffect(()=>{const a=t=>{if((t.metaKey||t.ctrlKey)&&t.key==="k"){t.preventDefault(),f(!0);return}if(n)switch(t.key){case"ArrowDown":t.preventDefault(),i(s=>Math.min(s+1,c.length-1));break;case"ArrowUp":t.preventDefault(),i(s=>Math.max(s-1,0));break;case"Enter":t.preventDefault(),c[l]&&(c[l].action(),d());break;case"Escape":t.preventDefault(),d();break}};return document.addEventListener("keydown",a),()=>document.removeEventListener("keydown",a)},[n,l,c]),r.useEffect(()=>{n&&v.current&&v.current.focus()},[n]),r.useEffect(()=>{i(0)},[b]);const d=r.useCallback(()=>{f(!1),N(""),i(0)},[]),C=a=>a.map(t=>{switch(t.toLowerCase()){case"cmd":case"command":return"⌘";case"ctrl":return"^";case"shift":return"⇧";case"alt":case"option":return"⌥";case"enter":return"↵";case"escape":return"⎋";case"backspace":return"⌫";case"delete":return"⌦";case"tab":return"⇥";case"space":return"␣";default:return t.toUpperCase()}}).join(""),z=a=>{switch(a.toLowerCase()){case"navigation":return e.jsx(I,{className:"w-4 h-4"});case"user":return e.jsx(H,{className:"w-4 h-4"});case"settings":return e.jsx(E,{className:"w-4 h-4"});case"content":return e.jsx(F,{className:"w-4 h-4"});case"actions":return e.jsx(ae,{className:"w-4 h-4"});default:return e.jsx(J,{className:"w-4 h-4"})}};return n?q.createPortal(e.jsxs("div",{className:"fixed inset-0 z-50 flex items-start justify-center pt-[20vh]",children:[e.jsx("div",{className:"absolute inset-0 bg-black/20 backdrop-blur-sm",onClick:d}),e.jsxs("div",{ref:O,className:m("relative w-full max-w-2xl mx-4 rounded-2xl border overflow-hidden",M("elevated"),"border-[var(--glass-border)]","animate-in fade-in-0 zoom-in-95 duration-200"),children:[e.jsxs("div",{className:"flex items-center gap-3 p-4 border-b border-[var(--glass-border)]",children:[e.jsx(g,{className:"w-5 h-5 text-[var(--text-secondary)] flex-shrink-0"}),e.jsx("input",{ref:v,type:"text",value:b,onChange:a=>N(a.target.value),placeholder:V,className:m("flex-1 bg-transparent border-none outline-none","text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]","text-lg")}),e.jsx("kbd",{className:"px-2 py-1 text-xs rounded bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[var(--text-tertiary)]",children:"ESC"})]}),e.jsx("div",{className:"max-h-96 overflow-y-auto",children:Object.entries(w).length===0?e.jsxs("div",{className:"p-8 text-center",children:[e.jsx(g,{className:"w-8 h-8 text-[var(--text-tertiary)] mx-auto mb-2"}),e.jsx("p",{className:"text-[var(--text-secondary)]",children:"No results found"}),e.jsx("p",{className:"text-[var(--text-tertiary)] text-sm mt-1",children:"Try a different search term"})]}):Object.entries(w).map(([a,t])=>e.jsxs("div",{className:"py-2",children:[e.jsxs("div",{className:"flex items-center gap-2 px-4 py-2 text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider",children:[z(a),a]}),t.map(s=>{const P=c.indexOf(s)===l;return e.jsxs("button",{onClick:()=>{s.action(),d()},className:m("w-full flex items-center gap-3 px-4 py-3 text-left","hover:bg-[var(--glass-bg)]",P&&"bg-[var(--glass-bg)]",_.gentle),children:[s.icon&&e.jsx("div",{className:"w-8 h-8 flex items-center justify-center rounded-lg bg-[var(--glass-bg)] text-[var(--text-secondary)]",children:s.icon}),e.jsxs("div",{className:"flex-1 min-w-0",children:[e.jsx("div",{className:"font-medium text-[var(--text-primary)] truncate",children:s.label}),s.description&&e.jsx("div",{className:"text-sm text-[var(--text-secondary)] truncate",children:s.description})]}),s.shortcut&&e.jsx("div",{className:"flex items-center gap-1",children:s.shortcut.map((T,$)=>e.jsx("kbd",{className:"px-1.5 py-0.5 text-xs rounded bg-[var(--glass-bg)] border border-[var(--glass-border)]",children:C([T])},$))}),e.jsx(I,{className:"w-4 h-4 text-[var(--text-tertiary)]"})]},s.id)})]},a))}),e.jsxs("div",{className:"flex items-center justify-between px-4 py-3 border-t border-[var(--glass-border)] text-xs text-[var(--text-tertiary)]",children:[e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx("span",{children:"Navigate with ↑↓"}),e.jsx("span",{children:"Select with ↵"})]}),e.jsxs("div",{className:"flex items-center gap-1",children:[e.jsx(Q,{className:"w-3 h-3"}),e.jsx("span",{children:"Command Palette"})]})]})]})]}),document.body):e.jsxs("button",{onClick:()=>f(!0),className:m("flex items-center gap-2 px-3 py-2 rounded-lg",M("default"),"hover:bg-[var(--glass-bg-elevated)]","text-[var(--text-secondary)] text-sm",_.gentle,D),children:[e.jsx(g,{className:"w-4 h-4"}),e.jsx("span",{children:"Search..."}),e.jsx("div",{className:"ml-auto flex items-center gap-1",children:A.map((a,t)=>e.jsx("kbd",{className:"px-1.5 py-0.5 text-xs rounded bg-[var(--glass-bg)] border border-[var(--glass-border)]",children:C([a])},t))})]})};try{y.displayName="CommandPalette",y.__docgenInfo={description:"",displayName:"CommandPalette",props:{items:{defaultValue:null,description:"",name:"items",required:!0,type:{name:"CommandItem[]"}},placeholder:{defaultValue:{value:"Type a command or search..."},description:"",name:"placeholder",required:!1,type:{name:"string | undefined"}},shortcut:{defaultValue:{value:'["cmd", "k"]'},description:"",name:"shortcut",required:!1,type:{name:"string[] | undefined"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string | undefined"}}}}}catch{}const pe={title:"Glass/CommandPalette",component:y,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{placeholder:{control:"text"},shortcut:{control:"object"}}},k=[{id:"home",label:"Go to Home",description:"Navigate to the home page",icon:e.jsx(Y,{className:"w-4 h-4"}),category:"Navigation",action:()=>console.log("Navigate to home"),keywords:["dashboard","main"]},{id:"settings",label:"Open Settings",description:"Configure application settings",icon:e.jsx(E,{className:"w-4 h-4"}),category:"Settings",shortcut:["cmd","comma"],action:()=>console.log("Open settings"),keywords:["preferences","config"]},{id:"profile",label:"View Profile",description:"View and edit your profile",icon:e.jsx(H,{className:"w-4 h-4"}),category:"User",action:()=>console.log("View profile"),keywords:["account","user"]},{id:"search",label:"Search Documents",description:"Search through all documents",icon:e.jsx(g,{className:"w-4 h-4"}),category:"Content",shortcut:["cmd","f"],action:()=>console.log("Search documents"),keywords:["find","lookup"]},{id:"bookmarks",label:"Manage Bookmarks",description:"View and organize bookmarks",icon:e.jsx(R,{className:"w-4 h-4"}),category:"Content",action:()=>console.log("Manage bookmarks"),keywords:["favorites","saved"]},{id:"mail",label:"Compose Email",description:"Create a new email message",icon:e.jsx(L,{className:"w-4 h-4"}),category:"Actions",shortcut:["cmd","n"],action:()=>console.log("Compose email"),keywords:["write","message"]},{id:"calendar",label:"Open Calendar",description:"View your calendar and appointments",icon:e.jsx(W,{className:"w-4 h-4"}),category:"Actions",action:()=>console.log("Open calendar"),keywords:["schedule","appointments"]}],p={args:{items:k,placeholder:"Type a command or search...",shortcut:["cmd","k"]}},u={args:{items:k,placeholder:"What would you like to do?",shortcut:["ctrl","space"]}},h={args:{items:[{id:"home",label:"Home",action:()=>console.log("Go home")},{id:"about",label:"About",action:()=>console.log("Show about")},{id:"help",label:"Help",action:()=>console.log("Show help")}],placeholder:"Quick actions..."}},x={render:()=>e.jsx("div",{className:"w-full max-w-2xl",children:e.jsx(y,{items:k,placeholder:"Search commands by category...",shortcut:["cmd","p"]})})};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    items: sampleCommands,
    placeholder: 'Type a command or search...',
    shortcut: ['cmd', 'k']
  }
}`,...p.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    items: sampleCommands,
    placeholder: 'What would you like to do?',
    shortcut: ['ctrl', 'space']
  }
}`,...u.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    items: [{
      id: 'home',
      label: 'Home',
      action: () => console.log('Go home')
    }, {
      id: 'about',
      label: 'About',
      action: () => console.log('Show about')
    }, {
      id: 'help',
      label: 'Help',
      action: () => console.log('Show help')
    }],
    placeholder: 'Quick actions...'
  }
}`,...h.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-full max-w-2xl">
      <CommandPalette items={sampleCommands} placeholder="Search commands by category..." shortcut={['cmd', 'p']} />
    </div>
}`,...x.parameters?.docs?.source}}};const ue=["Default","CustomPlaceholder","MinimalCommands","WithCategories"];export{u as CustomPlaceholder,p as Default,h as MinimalCommands,x as WithCategories,ue as __namedExportsOrder,pe as default};

import{j as e}from"./iframe-BrIAL86F.js";import{T as t}from"./theme-toggle-hQDeYFwa.js";import"./createLucideIcon-DQ-sB9u0.js";const l={title:"Utilities/ThemeToggle",component:t,parameters:{layout:"centered"},tags:["autodocs"]},r={render:()=>e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(t,{}),e.jsx("span",{className:"text-sm text-gray-600 dark:text-gray-300",children:"Click to toggle between light and dark themes"})]})},a={render:()=>e.jsx("div",{className:"w-full max-w-md",children:e.jsxs("nav",{className:"flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700",children:[e.jsx("h1",{className:"text-lg font-semibold",children:"App Title"}),e.jsx(t,{})]})})},s={render:()=>e.jsx("div",{className:"p-8 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 rounded-xl",children:e.jsx("div",{className:"glass-effect p-6 rounded-xl border border-white/20 dark:border-white/10",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"text-lg font-semibold mb-1",children:"Settings"}),e.jsx("p",{className:"text-sm text-gray-600 dark:text-gray-300",children:"Customize your theme preference"})]}),e.jsx(t,{})]})})})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-4">
      <ThemeToggle />
      <span className="text-sm text-gray-600 dark:text-gray-300">
        Click to toggle between light and dark themes
      </span>
    </div>
}`,...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-full max-w-md">
      <nav className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <h1 className="text-lg font-semibold">App Title</h1>
        <ThemeToggle />
      </nav>
    </div>
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <div className="p-8 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 rounded-xl">
      <div className="glass-effect p-6 rounded-xl border border-white/20 dark:border-white/10">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-1">Settings</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Customize your theme preference
            </p>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </div>
}`,...s.parameters?.docs?.source}}};const i=["Default","InNavBar","WithGlassEffect"];export{r as Default,a as InNavBar,s as WithGlassEffect,i as __namedExportsOrder,l as default};

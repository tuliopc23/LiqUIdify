import{j as e,T as d}from"./iframe-BtRd3yP4.js";function t({children:s}){return e.jsx(d,{defaultTheme:"light",storageKey:"glass-ui-theme",children:s})}try{t.displayName="ThemeProvider",t.__docgenInfo={description:"",displayName:"ThemeProvider",props:{}}}catch{}const n={title:"Utilities/ThemeProvider",component:t,parameters:{layout:"centered"},tags:["autodocs"]},a={args:{children:e.jsxs("div",{className:"p-6 space-y-4",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"Theme Provider Example"}),e.jsx("p",{className:"text-gray-600 dark:text-gray-300",children:"This content is wrapped in a ThemeProvider that manages light/dark theme state."}),e.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[e.jsxs("div",{className:"p-4 bg-white dark:bg-gray-800 rounded-lg border",children:[e.jsx("h3",{className:"font-semibold mb-2",children:"Light Mode"}),e.jsx("p",{className:"text-sm text-gray-600 dark:text-gray-300",children:"Default theme with light backgrounds"})]}),e.jsxs("div",{className:"p-4 bg-gray-100 dark:bg-gray-700 rounded-lg border",children:[e.jsx("h3",{className:"font-semibold mb-2",children:"Adapts to Dark Mode"}),e.jsx("p",{className:"text-sm text-gray-600 dark:text-gray-300",children:"Automatically adjusts colors in dark mode"})]})]})]})}},r={render:()=>e.jsx(t,{children:e.jsxs("div",{className:"p-6 space-y-4 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 min-h-96",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"Glass UI Components in Theme Provider"}),e.jsx("p",{className:"text-gray-600 dark:text-gray-300 mb-6",children:"All Glass UI components work seamlessly with the theme provider."}),e.jsxs("div",{className:"glass-effect p-4 rounded-xl border border-white/20 dark:border-white/10",children:[e.jsx("h3",{className:"font-semibold mb-2",children:"Glass Effect Card"}),e.jsx("p",{className:"text-sm text-gray-600 dark:text-gray-300",children:"This card uses glass effects that adapt to the current theme."})]}),e.jsxs("div",{className:"flex gap-3",children:[e.jsx("button",{className:"px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors",children:"Primary Button"}),e.jsx("button",{className:"px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors",children:"Secondary Button"})]})]})})};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    children: <div className="p-6 space-y-4">
        <h2 className="text-2xl font-bold">Theme Provider Example</h2>
        <p className="text-gray-600 dark:text-gray-300">
          This content is wrapped in a ThemeProvider that manages light/dark theme state.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border">
            <h3 className="font-semibold mb-2">Light Mode</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Default theme with light backgrounds
            </p>
          </div>
          <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg border">
            <h3 className="font-semibold mb-2">Adapts to Dark Mode</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Automatically adjusts colors in dark mode
            </p>
          </div>
        </div>
      </div>
  }
}`,...a.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => <ThemeProvider>
      <div className="p-6 space-y-4 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 min-h-96">
        <h2 className="text-2xl font-bold">Glass UI Components in Theme Provider</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          All Glass UI components work seamlessly with the theme provider.
        </p>
        
        <div className="glass-effect p-4 rounded-xl border border-white/20 dark:border-white/10">
          <h3 className="font-semibold mb-2">Glass Effect Card</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            This card uses glass effects that adapt to the current theme.
          </p>
        </div>

        <div className="flex gap-3">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            Primary Button
          </button>
          <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
            Secondary Button
          </button>
        </div>
      </div>
    </ThemeProvider>
}`,...r.parameters?.docs?.source}}};const l=["Default","WithGlassComponents"];export{a as Default,r as WithGlassComponents,l as __namedExportsOrder,n as default};

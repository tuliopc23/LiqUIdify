import{j as e,r as y}from"./iframe-BrIAL86F.js";import{G as d}from"./glass-modal-D9bxFN7b.js";import{G as a}from"./glass-button-LMZZlTMc.js";import"./glass-utils-B_l5-kDT.js";import"./x-D5S6uNnZ.js";import"./createLucideIcon-DQ-sB9u0.js";import"./index-CR92cGio.js";const q={title:"Glass/GlassModal",component:d,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{isOpen:{control:"boolean"},title:{control:"text"}}},o=({title:c,children:m,className:u,titleClassName:p,contentClassName:x})=>{const[g,l]=y.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(a,{onClick:()=>l(!0),children:"Open Modal"}),e.jsx(d,{isOpen:g,onClose:()=>l(!1),title:c,className:u,titleClassName:p,contentClassName:x,children:m})]})},t={render:()=>e.jsxs(o,{title:"Confirmation",children:[e.jsx("p",{className:"text-gray-600 dark:text-gray-300 mb-4",children:"Are you sure you want to delete this item? This action cannot be undone."}),e.jsxs("div",{className:"flex gap-3 justify-end",children:[e.jsx(a,{variant:"secondary",size:"sm",children:"Cancel"}),e.jsx(a,{variant:"destructive",size:"sm",children:"Delete"})]})]})},r={render:()=>e.jsx(o,{children:e.jsxs("div",{className:"text-center",children:[e.jsx("h2",{className:"text-xl font-semibold text-gray-900 dark:text-white mb-2",children:"Welcome!"}),e.jsx("p",{className:"text-gray-600 dark:text-gray-300 mb-4",children:"This modal doesn't have a title in the header."}),e.jsx(a,{children:"Get Started"})]})})},s={render:()=>e.jsx(o,{title:"Create New Item",children:e.jsxs("form",{className:"space-y-4",children:[e.jsxs("div",{children:[e.jsx("label",{htmlFor:"name",className:"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1",children:"Name"}),e.jsx("input",{type:"text",id:"name",className:"w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white",placeholder:"Enter item name"})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"description",className:"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1",children:"Description"}),e.jsx("textarea",{id:"description",rows:3,className:"w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white",placeholder:"Enter description"})]}),e.jsxs("div",{className:"flex gap-3 justify-end pt-4",children:[e.jsx(a,{variant:"secondary",size:"sm",children:"Cancel"}),e.jsx(a,{variant:"primary",size:"sm",children:"Create"})]})]})})},n={render:()=>e.jsxs(o,{title:"Terms and Conditions",className:"max-w-2xl",children:[e.jsxs("div",{className:"max-h-96 overflow-y-auto pr-2 space-y-4",children:[e.jsx("p",{className:"text-gray-600 dark:text-gray-300",children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}),e.jsx("p",{className:"text-gray-600 dark:text-gray-300",children:"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}),e.jsx("p",{className:"text-gray-600 dark:text-gray-300",children:"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."}),e.jsx("p",{className:"text-gray-600 dark:text-gray-300",children:"Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."})]}),e.jsxs("div",{className:"flex gap-3 justify-end pt-4 border-t border-gray-200 dark:border-gray-700",children:[e.jsx(a,{variant:"secondary",size:"sm",children:"Decline"}),e.jsx(a,{variant:"primary",size:"sm",children:"Accept"})]})]})},i={args:{isOpen:!0,onClose:()=>console.log("Modal close requested"),title:"Example Modal",children:e.jsxs("div",{children:[e.jsx("p",{className:"text-gray-600 dark:text-gray-300 mb-4",children:"This modal is always open for demonstration purposes."}),e.jsx(a,{children:"Action Button"})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => <ModalWrapper title="Confirmation">
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        Are you sure you want to delete this item? This action cannot be undone.
      </p>
      <div className="flex gap-3 justify-end">
        <GlassButton variant="secondary" size="sm">
          Cancel
        </GlassButton>
        <GlassButton variant="destructive" size="sm">
          Delete
        </GlassButton>
      </div>
    </ModalWrapper>
}`,...t.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => <ModalWrapper>
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Welcome!
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          This modal doesn't have a title in the header.
        </p>
        <GlassButton>Get Started</GlassButton>
      </div>
    </ModalWrapper>
}`,...r.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <ModalWrapper title="Create New Item">
      <form className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Name
          </label>
          <input type="text" id="name" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white" placeholder="Enter item name" />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description
          </label>
          <textarea id="description" rows={3} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white" placeholder="Enter description" />
        </div>
        <div className="flex gap-3 justify-end pt-4">
          <GlassButton variant="secondary" size="sm">
            Cancel
          </GlassButton>
          <GlassButton variant="primary" size="sm">
            Create
          </GlassButton>
        </div>
      </form>
    </ModalWrapper>
}`,...s.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => <ModalWrapper title="Terms and Conditions" className="max-w-2xl">
      <div className="max-h-96 overflow-y-auto pr-2 space-y-4">
        <p className="text-gray-600 dark:text-gray-300">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
        </p>
      </div>
      <div className="flex gap-3 justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
        <GlassButton variant="secondary" size="sm">
          Decline
        </GlassButton>
        <GlassButton variant="primary" size="sm">
          Accept
        </GlassButton>
      </div>
    </ModalWrapper>
}`,...n.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    isOpen: true,
    onClose: () => console.log('Modal close requested'),
    title: 'Example Modal',
    children: <div>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          This modal is always open for demonstration purposes.
        </p>
        <GlassButton>Action Button</GlassButton>
      </div>
  }
}`,...i.parameters?.docs?.source}}};const w=["Default","WithoutTitle","Form","LongContent","AlwaysOpen"];export{i as AlwaysOpen,t as Default,s as Form,n as LongContent,r as WithoutTitle,w as __namedExportsOrder,q as default};

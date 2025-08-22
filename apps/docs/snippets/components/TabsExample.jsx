import {GlassTabs} from '/snippets/components/glass-tabs.jsx'

export const TabsExample = () => (
  <div className="not-prose">
    <GlassTabs
      tabs={[
        { id: 'one', label: 'Tab One', content: <div>Content one</div> },
        { id: 'two', label: 'Tab Two', content: <div>Content two</div> },
      ]}
      defaultTabId="one"
    />
  </div>
)

export default TabsExample

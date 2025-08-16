import { ResponsiveButton } from 'liquidify'

export const ResponsiveButtonExample = () => (
  <div className="not-prose flex flex-wrap gap-2">
    <ResponsiveButton>Default</ResponsiveButton>
    <ResponsiveButton intent="primary">Primary</ResponsiveButton>
    <ResponsiveButton intent="danger">Danger</ResponsiveButton>
  </div>
)

export default ResponsiveButtonExample

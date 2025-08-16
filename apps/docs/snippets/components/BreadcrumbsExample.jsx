import { GlassBreadcrumbs } from 'liquidify'

export const BreadcrumbsExample = () => {
  const items = [
    { label: 'Home', onClick: () => console.log('Home') },
    { label: 'Components', onClick: () => console.log('Components') },
    { label: 'Breadcrumbs' },
  ]
  return (
    <div className="not-prose">
      <GlassBreadcrumbs items={items} />
    </div>
  )
}

export default BreadcrumbsExample

import React from 'react'
import { button } from '../theme/recipes'

export function ButtonDemo() {
  return (
    <div style={{ display: 'flex', gap: 12 }}>
      <button className={button({ intent: 'primary' })}>Primary</button>
      <button className={button({ intent: 'neutral' })}>Neutral</button>
      <button className={button({ intent: 'glass' })}>Glass</button>
      <button className={button({ intent: 'link' })}>Link</button>
    </div>
  )
}

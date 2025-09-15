import React from 'react'
import { input, badge } from '../theme/recipes'

export function FieldDemo() {
  return (
    <div style={{ display: 'grid', gap: 12, maxWidth: 480 }}>
      <label>
        <span className={badge({ tone: 'neutral' })} style={{ marginBottom: 6, display: 'inline-flex' }}>
          <span style={{ width: 8, height: 8, borderRadius: 999, background: 'var(--colors-blue-500)' }} />
          Search
        </span>
        <input className={input({ variant: 'glass' })} placeholder="Type to search..." />
      </label>
    </div>
  )
}

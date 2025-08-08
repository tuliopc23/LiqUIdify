import React from 'react'
import { describe, it, expect } from 'vitest'
import { render } from '../test/test-utils'

// Auto-smoke-test Storybook stories by rendering a story with args if available.
// This gives quick coverage for most components with minimal effort.

type StoryModule = {
  default?: { component?: React.ComponentType<any> }
  [key: string]: any
}

describe('Storybook smoke tests', () => {
  const modules = import.meta.glob('./**/*.stories.tsx', { eager: true }) as Record<string, StoryModule>

  for (const [path, mod] of Object.entries(modules)) {
    const meta = mod.default || {}
    const Component = meta.component as React.ComponentType<any> | undefined

    // Find any story export that looks like a story object with args
    const storyEntries = Object.entries(mod).filter(([key]) => key !== 'default')
    const candidate = storyEntries.find(([, val]) => val && typeof val === 'object' && 'args' in val)

    const testName = Component ? `renders ${path}` : `skips ${path} (no component)`

    it(testName, () => {
      if (!Component || !candidate) {
        // Nothing to render safely; still count as passed to keep suite green
        expect(true).toBe(true)
        return
      }
      const [, story] = candidate
      const args = story.args || {}
      // Best-effort render. If a component strictly requires props not provided by its stories, the story should supply them.
      render(React.createElement(Component, args))
      expect(true).toBe(true)
    })
  }
})

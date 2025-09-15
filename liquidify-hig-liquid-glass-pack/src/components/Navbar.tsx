import React, { useEffect, useState } from 'react'
import { css, cx } from '../../styled-system/css'
import { button } from '../theme/recipes'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={cx(css({ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50 }), scrolled ? 'navbar is-scrolled' : 'navbar')}>
      <div className={css({ maxW: '1100px', mx: 'auto', px: '24px', py: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' })}>
        <a href="/" className={css({ fontFamily: 'sans', fontWeight: 700, letterSpacing: '-0.01em' })}>Liquidify</a>
        <div className={css({ display: 'flex', gap: '12px', alignItems: 'center' })}>
          <a href="/docs" className={css({ color: 'muted', _hover: { color: 'text' } })}>Docs</a>
          <a href="/blog" className={css({ color: 'muted', _hover: { color: 'text' } })}>Blog</a>
          <button className={button({ intent: 'neutral', size: 'sm' })} data-theme-toggle>Theme</button>
        </div>
      </div>
    </nav>
  )
}

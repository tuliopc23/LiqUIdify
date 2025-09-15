import React from 'react'
import { Navbar } from '../components/Navbar'
import { SegmentedTabs } from '../components/SegmentedTabs'
import { ButtonDemo } from '../components/ButtonDemo'
import { FieldDemo } from '../components/FieldDemo'
import { css } from '../../styled-system/css'
import { card, symbolTile } from '../theme/recipes'

export default function DemoPage() {
  return (
    <div>
      <Navbar />
      <main className={css({ mt: '70px', maxW: '1100px', mx: 'auto', px: '24px', pb: '64px' })}>
        <header className={css({ textAlign: 'center', mb: '24px' })}>
          <div className="badge"><span className="badge__dot" /> Liquid Glass ready</div>
          <h1 className={css({ textStyle: 'display', color: 'text', mt: '8px' })}>Apple‑like components for the web</h1>
          <p className={css({ color: 'muted' })}>Built with Ark UI + Panda.</p>
        </header>

        <section className={css({ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' })}>
          <a className={card()} href="#">
            <span className={symbolTile({ tint: 'blue' })} aria-hidden="true"></span>
            <div className={css({ mt: '10px', fontWeight: 600 })}>Cards</div>
            <p className={css({ color: 'muted' })}>Hairline borders, soft glass, hover lift.</p>
          </a>
          <a className={card()} href="#">
            <span className={symbolTile({ tint: 'indigo' })}></span>
            <div className={css({ mt: '10px', fontWeight: 600 })}>Typography</div>
            <p className={css({ color: 'muted' })}>Display/title/body scale, system stack.</p>
          </a>
          <a className={card()} href="#">
            <span className={symbolTile({ tint: 'teal' })}></span>
            <div className={css({ mt: '10px', fontWeight: 600 })}>Glass</div>
            <p className={css({ color: 'muted' })}>Translucent surfaces with crisp hairlines.</p>
          </a>
        </section>

        <section className={css({ mt: '32px' })}>
          <SegmentedTabs />
        </section>

        <section className={css({ mt: '24px', display: 'flex', gap: '16px', alignItems: 'center' })}>
          <ButtonDemo />
          <FieldDemo />
        </section>
      </main>
    </div>
  )
}

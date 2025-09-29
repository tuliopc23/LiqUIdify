import React from 'react'
import './App.css'

// Import components from the library
import { Button } from '../../libs/components/src/components/button'
import { Card } from '../../libs/components/src/components/card'
import { Badge } from '../../libs/components/src/components/badge'

// Import styles
import '../../libs/components/src/styles/panda.css'
import '../../libs/components/src/styles/new-design-system.css'
import '../../styled-system/styles.css'

function App() {
  return (
    <div className="demo-container">
      <header className="demo-header">
        <h1 className="demo-title">LiqUIdify Component Library</h1>
        <p className="demo-subtitle">Apple Design Language for Web - React Components</p>
      </header>

      <main className="demo-main">
        <section className="demo-section">
          <h2>Buttons</h2>
          <div className="component-grid">
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="ghost">Ghost Button</Button>
            <Button variant="danger">Danger Button</Button>
          </div>
        </section>

        <section className="demo-section">
          <h2>Cards</h2>
          <div className="component-grid">
            <Card className="demo-card">
              <h3>Sample Card</h3>
              <p>This is a glassmorphism card component with beautiful translucent effects.</p>
              <Button variant="primary">Learn More</Button>
            </Card>
            <Card className="demo-card">
              <h3>Another Card</h3>
              <p>Cards support various content types and maintain the liquid glass aesthetic.</p>
              <Button variant="secondary">Explore</Button>
            </Card>
          </div>
        </section>

        <section className="demo-section">
          <h2>Badges</h2>
          <div className="component-grid">
            <Badge tone="neutral">Neutral</Badge>
            <Badge tone="blue">Blue</Badge>
            <Badge>Default</Badge>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
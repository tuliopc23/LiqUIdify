import React, { useEffect, useRef } from 'react'

/**
 * LiquidBackdrop
 * A decorative, low-contrast animated effect that simulates subtle "liquid glass"
 * caustics. Keep opacity low; use behind hero or headers.
 */
export function LiquidBackdrop({ opacity = 0.06 }: { opacity?: number }) {
  const ref = useRef<SVGFEturbulenceElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let t = 0
    let raf = 0
    const loop = () => {
      t += 0.003
      // Gentle animation across time — keep subtle
      const base = 0.005 + Math.abs(Math.sin(t)) * 0.004
      el.setAttribute('baseFrequency', `${base} ${base * 1.3}`)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <svg aria-hidden="true" width="0" height="0" style={{ position: 'absolute' }}>
      <filter id="liquid-warp">
        <feTurbulence ref={ref} type="fractalNoise" numOctaves="1" seed="2" baseFrequency="0.006 0.008" />
        <feDisplacementMap in="SourceGraphic" scale="8" />
      </filter>
      <defs>
        <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,1)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>
      {/* Place this rect using filter via CSS on the target container */}
      <rect width="0" height="0" fill="none" />
      <style>{`
        .liquid-warp { filter: url(#liquid-warp); }
      `}</style>
    </svg>
  )
}

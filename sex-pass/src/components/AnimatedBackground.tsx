import React, { useMemo } from 'react'

export default function AnimatedBackground() {
  const particles = useMemo(() => {
    const arr: { left: string; top: string; size: number; opacity: number }[] = []
    for (let i = 0; i < 36; i++) {
      arr.push({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.06 + 0.02,
      })
    }
    return arr
  }, [])

  return (
    <>
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="particles" aria-hidden>
        {particles.map((p, i) => (
          <div
            key={i}
            className="particle"
            style={{ left: p.left, top: p.top, width: p.size, height: p.size, opacity: p.opacity }}
          />
        ))}
      </div>
      <div className="vignette" />
    </>
  )
}

import React, { useRef, useState, useEffect } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import PassFront from './PassFront'
import PassBack from './PassBack'

export default function PassCard({ onFlipped, name, code, issuer }: { onFlipped?: (flipped: boolean) => void; name?: string; code?: string; issuer?: string }) {
  const [flipped, setFlipped] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rx = useTransform(y, [-50, 50], [6, -6])
  const ry = useTransform(x, [-50, 50], [-6, 6])

  const container = useRef<HTMLDivElement | null>(null)

  useEffect(() => { if (onFlipped) onFlipped(flipped) }, [flipped])

  const reduce = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  function handleMove(e: React.MouseEvent) {
    if (reduce) return
    const rect = container.current?.getBoundingClientRect()
    if (!rect) return
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = e.clientX - cx
    const dy = e.clientY - cy
    x.set(dx / 8)
    y.set(dy / 8)
  }

  return (
    <div ref={container} className="w-full max-w-md mx-auto" onMouseMove={handleMove} onMouseLeave={() => { x.set(0); y.set(0) }}>
      <motion.div
        style={{ rotateX: rx, rotateY: ry, perspective: 1000 }}
        transition={{ type: 'spring', stiffness: 120, damping: 12 }}
      >
        <motion.div
          onClick={() => setFlipped((s) => !s)}
          initial={false}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: reduce ? 0 : 0.8, ease: [0.16, 0.84, 0.24, 1] }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div style={{ backfaceVisibility: 'hidden' }}>
            <div className="glass-card rounded-2xl p-6" style={{ minHeight: 220, border: '1px solid rgba(255,255,255,0.06)', background: 'linear-gradient(180deg, rgba(10,8,10,0.98), rgba(18,8,10,0.96))', boxShadow: 'inset 0 6px 18px rgba(0,0,0,0.6)' }}>
              <PassFront name={name} code={code} issuer={issuer} />
            </div>
          </div>

          <div style={{ position: 'absolute', left: 0, right: 0, top: 0, transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}>
            <div className="glass-card rounded-2xl p-6" style={{ minHeight: 220, border: '1px solid rgba(255,255,255,0.04)', background: 'linear-gradient(180deg, rgba(8,8,8,0.98), rgba(18,10,10,0.96))' }}>
              <PassBack />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function PassReveal({ onComplete }: { onComplete?: () => void }) {
  const [stage, setStage] = useState(0)

  useEffect(() => {
    const timers: number[] = []
    timers.push(window.setTimeout(() => setStage(1), 200))
    timers.push(window.setTimeout(() => setStage(2), 520))
    timers.push(window.setTimeout(() => setStage(3), 920))
    timers.push(window.setTimeout(() => setStage(4), 1320))
    timers.push(window.setTimeout(() => setStage(5), 1760))
    timers.push(window.setTimeout(() => { setStage(6); if (onComplete) onComplete() }, 2200))
    return () => timers.forEach((t) => clearTimeout(t))
  }, [])

  return (
    <div className="w-full flex justify-center items-center mt-6 mb-6">
      <div style={{ width: 320, height: 220, position: 'relative' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.3 }}
          animate={stage >= 1 ? { opacity: 1, scale: 1 } : { opacity: 0 }}
          transition={{ duration: 0.28 }}
          style={{ width: 10, height: 10, borderRadius: 999, background: 'rgba(179,18,53,0.95)', margin: '0 auto', boxShadow: '0 8px 24px rgba(179,18,53,0.18)' }}
        />

        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={stage >= 2 ? { height: 120, opacity: 0.18 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.44 }}
          style={{ width: 2, background: 'rgba(179,18,53,0.95)', margin: '8px auto', borderRadius: 2, position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: 20 }}
        />

        <motion.div
          initial={{ scaleX: 0.02, opacity: 0 }}
          animate={stage >= 3 ? { scaleX: 1, opacity: 1 } : { scaleX: 0.02, opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: 40, width: 300, height: 180, borderRadius: 18, border: '1px solid rgba(255,255,255,0.06)', boxShadow: 'inset 0 6px 24px rgba(0,0,0,0.6)' }}
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={stage >= 4 ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
          style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: 48, width: 288, height: 164 }}
        >
          <div className="glass-card rounded-2xl p-4" style={{ width: '100%', height: '100%', background: 'linear-gradient(180deg, rgba(6,6,6,0.98), rgba(18,6,6,0.96))' }} />
        </motion.div>

      </div>
    </div>
  )
}

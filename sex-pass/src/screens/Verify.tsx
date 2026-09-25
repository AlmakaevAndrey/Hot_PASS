import React, { useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Verify({ go }: { go: (s: any) => void }) {
  useEffect(() => {
    const seq = async () => {
      await new Promise((r) => setTimeout(r, 700))
      // first message shown
      await new Promise((r) => setTimeout(r, 900))
      // identity
      await new Promise((r) => setTimeout(r, 900))
      go('final')
    }
    seq()
  }, [go])

  return (
    <div className="w-full max-w-md text-center px-4 relative">
      <div className="glitch scanline">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          <div className="text-sm text-white/50 mb-6">ПРОВЕРКА</div>

          <motion.div className="serif text-4xl font-bold mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>ПРОВЕРЯЕМ...</motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="text-sm text-white/60 mb-6">ЛИЧНОСТЬ ПОДТВЕРЖДЕНА</motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.6 }} className="serif text-2xl font-semibold">ДОСТУП ПРЕДОСТАВЛЕН</motion.div>

          <div className="mt-6">
            <div style={{ height: 6, background: 'linear-gradient(90deg, rgba(255,255,255,0.02), rgba(179,18,53,0.12))', borderRadius: 4, overflow: 'hidden' }}>
              <motion.div initial={{ width: '0%' }} animate={{ width: '100%' }} transition={{ duration: 2.6, ease: 'linear' }} style={{ height: '100%', background: 'linear-gradient(90deg, rgba(179,18,53,0.9), rgba(255,255,255,0.12))' }} />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

import React from 'react'
import { motion } from 'framer-motion'
import Button from '../components/Button'

const seq = {
  hidden: { opacity: 0, y: 6, scale: 0.998 },
  show: (i = 1) => ({ opacity: 1, y: 0, scale: 1, transition: { delay: i * 0.2, duration: 0.7, ease: [0.16, 0.84, 0.24, 1] } }),
}

export default function Intro({ go }: { go: (s: any) => void }) {
  return (
    <div className="w-full max-w-md text-center px-4">
      <motion.div initial="hidden" animate="show">
        <motion.div custom={0} variants={seq} className="text-xs ui-sans text-white/60 mb-6 tracking-widest">
          ПРИВАТНОЕ ПРИГЛАШЕНИЕ
        </motion.div>

        <motion.h1 custom={1} variants={seq} className="serif text-6xl md:text-8xl font-black tracking-tight mb-6">
          ДОСТУП
        </motion.h1>

        <motion.div custom={2} variants={seq} className="serif text-2xl mb-8 text-white/80">
          ПРЕДОСТАВЛЕН?
        </motion.div>

        <motion.div custom={3} variants={seq} className="mt-6">
          <Button onClick={() => go('attract')} className="w-full pass-card">ВХОД</Button>
        </motion.div>
      </motion.div>
    </div>
  )
}

import React, { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import AnimatedBackground from './components/AnimatedBackground'
import Progress from './components/Progress'
import Intro from './screens/Intro'
import Attract from './screens/Attract'
import Tension from './screens/Tension'
import Choice from './screens/Choice'
import Confirm from './screens/Confirm'
import Verify from './screens/Verify'
// removed Pass screen — final contains cinematic pass reveal
import Final from './screens/Final'

export type Step =
  | 'intro'
  | 'attract'
  | 'tension'
  | 'choice'
  | 'confirm'
  | 'verify'
  | 'final'

const pageVariant = {
  enter: { opacity: 0, scale: 1.03, filter: 'blur(8px)' },
  center: { opacity: 1, scale: 1, filter: 'blur(0px)' },
  exit: { opacity: 0, scale: 0.98, filter: 'blur(8px)' },
}

export default function App() {
  const [step, setStep] = useState<Step>(() => {
    try {
      const raw = localStorage.getItem('sexpass_state')
      if (raw) return (JSON.parse(raw).step as Step) || 'intro'
    } catch (e) {}
    return 'intro'
  })

  const [ctx, setCtx] = useState<Record<string, any>>(() => {
    try {
      const raw = localStorage.getItem('sexpass_state')
      if (raw) return (JSON.parse(raw).ctx as Record<string, any>) || {}
    } catch (e) {}
    return {}
  })

  const common = { go: setStep, ctx, setCtx }

  const stepIndex = (s: Step) => {
    const order: Step[] = ['intro', 'attract', 'tension', 'choice', 'confirm', 'verify', 'final']
    return order.indexOf(s) + 1
  }

  // persist
  useEffect(() => {
    try {
      localStorage.setItem('sexpass_state', JSON.stringify({ step, ctx }))
    } catch (e) {}
  }, [step, ctx])

  // keyboard navigation
  useEffect(() => {
    const order: Step[] = ['intro', 'attract', 'tension', 'choice', 'confirm', 'verify', 'final']
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowLeft') {
        const i = order.indexOf(step)
        if (i > 0) setStep(order[i - 1])
      }
      if (e.key === 'ArrowRight' || e.key === 'Enter') {
        const i = order.indexOf(step)
        if (i < order.length - 1) setStep(order[i + 1])
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [step])

  return (
    <div className="min-h-screen text-cream antialiased mobile-font">
      <AnimatedBackground />

      <div className="min-h-screen flex items-center justify-center p-6 scene">
        <div style={{ width: '100%' }}>
          <Progress step={stepIndex(step)} total={7} />

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={step}
              variants={pageVariant}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.75, ease: [0.16, 0.84, 0.24, 1] }}
            >
              {step === 'intro' && <Intro {...common} />}
              {step === 'attract' && <Attract {...common} />}
              {step === 'tension' && <Tension {...common} />}
              {step === 'choice' && <Choice {...common} />}
              {step === 'confirm' && <Confirm {...common} />}
              {step === 'verify' && <Verify {...common} />}
              {/* pass rendering moved into Final (step 'final') */}
              {step === 'final' && <Final {...common} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

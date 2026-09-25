import React, { useMemo, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Button from '../components/Button'
import { passConfig } from '../config/passConfig'

function PassCard({ name, code, onFlip }: { name: string; code: string; onFlip: () => void }) {
  return (
    <div className="pass-card mx-auto">
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 0.84, 0.24, 1] }}
        className="glass-card rounded-2xl p-6"
        style={{ border: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-xs text-white/60">ПРИВАТНОЕ</div>
            <div className="serif text-2xl font-bold tracking-tight">ПРОПУСК</div>
          </div>
          <div className="text-right text-xs text-white/60">18+</div>
        </div>

        <div className="bg-white/3 rounded-lg p-4 mb-4">
          <div className="text-sm text-white/60">Владелец</div>
          <div className="text-xl font-semibold">{name}</div>
          <div className="text-xs text-white/50 mt-2">ID ПРОПУСКА: {code}</div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="text-xs text-white/60">УРОВЕНЬ ДОСТУПА: ПРИВАТНЫЙ</div>
          <button onClick={onFlip} className="text-xs text-white/80 underline">Правила</button>
        </div>
      </motion.div>
    </div>
  )
}

export default function Pass({ go, ctx }: any) {
  const name = ctx?.name ?? '—'
  const code = useMemo(() => passConfig.passId(), [])
  const [flipped, setFlipped] = useState(false)
  const [stage, setStage] = useState<number>(0)

  useEffect(() => {
    // reveal sequence: dot -> line -> outline -> content
    const timers: number[] = []
    timers.push(window.setTimeout(() => setStage(1), 160))
    timers.push(window.setTimeout(() => setStage(2), 520))
    timers.push(window.setTimeout(() => setStage(3), 960))
    timers.push(window.setTimeout(() => setStage(4), 1400))
    return () => timers.forEach((t) => clearTimeout(t))
  }, [])

  return (
    <div className="w-full flex flex-col items-center">
      <div style={{ perspective: 1000 }}>
        <motion.div
          onClick={() => setFlipped((s) => !s)}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.8, ease: [0.16, 0.84, 0.24, 1] }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div style={{ backfaceVisibility: 'hidden' }}>
            {/* outline / card reveal */}
            <div className="pass-card mx-auto" style={{ perspective: 800 }}>
              <motion.div
                className="glass-card rounded-2xl p-6"
                style={{ border: '1px solid rgba(255,255,255,0.06)', minHeight: 180, overflow: 'hidden' }}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={stage >= 3 ? { opacity: 1, scale: 1 } : { opacity: 0.0, scale: 0.96 }}
                transition={{ duration: 0.6, ease: [0.16, 0.84, 0.24, 1] }}
              >
                {/* content will appear after stage 4 */}
                <motion.div initial={{ opacity: 0, y: 6 }} animate={stage >= 4 ? { opacity: 1, y: 0 } : { opacity: 0 }} transition={{ delay: 0.08 }}>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-xs text-white/60">PRIVATE</div>
                      <div className="serif text-2xl font-bold tracking-tight">SEX PASS</div>
                    </div>
                    <div className="text-right text-xs text-white/60">18+</div>
                  </div>

                  <div className="bg-white/3 rounded-lg p-4 mb-4">
                    <div className="text-sm text-white/60">HOLDER</div>
                    <div className="text-xl font-semibold">{name}</div>
                    <div className="text-xs text-white/50 mt-2">PASS ID: {code}</div>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="text-xs text-white/60">ISSUED BY: {passConfig.issuerName}</div>
                    <div className="text-xs text-white/60">ACCESS: PRIVATE</div>
                  </div>
                </motion.div>
              </motion.div>

              {/* reveal primitives: dot and vertical line */}
              <div style={{ position: 'relative', marginTop: -180, height: 0 }} aria-hidden>
                <motion.div
                  initial={{ opacity: 0, scale: 0.4 }}
                  animate={stage >= 1 ? { opacity: 1, scale: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.28 }}
                  style={{ width: 8, height: 8, borderRadius: 999, background: 'rgba(179,18,53,0.95)', margin: '0 auto', boxShadow: '0 8px 24px rgba(179,18,53,0.18)' }}
                />

                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={stage >= 2 ? { height: 120, opacity: 0.18 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.44 }}
                  style={{ width: 2, background: 'rgba(179,18,53,0.95)', margin: '8px auto', borderRadius: 2 }}
                />
              </div>
            </div>
          </div>

          <div style={{ position: 'absolute', left: 0, right: 0, top: 0, backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
            <div className="pass-card mx-auto">
              <div className="glass-card rounded-2xl p-6">
                <div className="serif text-xl font-bold mb-4">ПРАВИЛА</div>
                <ol className="text-sm list-decimal ml-5 space-y-2">
                  <li>Химия — обоюдная.</li>
                  <li>Без давления.</li>
                  <li>Любой может остановиться в любой момент.</li>
                </ol>
                <div className="text-xs text-white/60 mt-4">ДЕЙСТВИТЕЛЕН ТОЛЬКО МЕЖДУ ДВУМЯ ЛЮДЬМИ</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="w-full max-w-md mt-12 flex gap-3 justify-between items-center">
        <div className="shrink-0">
          <Button variant="ghost" onClick={() => go('confirm')}>Редактировать</Button>
        </div>
        <div className="flex-1">
          <Button onClick={() => go('final')} className="w-full">Сохранить и поделиться</Button>
        </div>
      </div>
    </div>
  )
}

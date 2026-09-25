import React, { useState, useEffect } from 'react'
import { passConfig } from '../config/passConfig'
import PassReveal from '../components/PassReveal'
import AccessGranted from '../components/AccessGranted'
import PassCard from '../components/PassCard'
import PassActivation from '../components/PassActivation'
import TelegramCTA from '../components/TelegramCTA'
import { motion } from 'framer-motion'

export default function Final({ go, ctx, setCtx }: any) {
  const [showGranted, setShowGranted] = useState(true)
  const [revealed, setRevealed] = useState(false)
  const [flipped, setFlipped] = useState(false)
  const [activated, setActivated] = useState(false)

  // ensure pass id and holderName exist in ctx
  useEffect(() => {
    try {
      if (!ctx) return
      if (!ctx.passId) {
        const id = awaitPassId()
        setCtx({ ...ctx, passId: id, holderName: ctx.name ?? passConfig.holderName })
      }
    } catch (e) {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function awaitPassId() {
    // generate simple id here synchronously (no dependency on passConfig to avoid import cycle)
    return `SP-2026-${Math.random().toString(36).slice(2, 8).toUpperCase()}`
  }

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6">
      {showGranted ? (
        <AccessGranted onComplete={() => setShowGranted(false)} />
      ) : !revealed ? (
        <>
          <PassReveal onComplete={() => setRevealed(true)} />
          <div className="text-sm text-white/60 mt-2">Последовательность раскрытия инициирована.</div>
        </>
      ) : (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <PassCard onFlipped={(f) => setFlipped(f)} name={ctx?.name ?? passConfig.holderName} code={ctx?.passId ?? '—'} issuer={passConfig.issuerName} />
            {!flipped ? (
              <div className="text-center mt-4 text-sm text-white/60">Нажми на пропуск, чтобы перевернуть и прочитать условия</div>
            ) : (
              <>
                <div className="mt-6">
                  <PassActivation onComplete={() => setActivated(true)} />
                </div>
                {activated ? (
                  <div className="mt-6"><TelegramCTA onOpen={() => { try { localStorage.removeItem('sexpass_state') } catch (e) {} }} /></div>
                ) : null}
              </>
            )}
          </motion.div>
        </>
      )}
    </div>
  )
}

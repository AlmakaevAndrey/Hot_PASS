import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { passConfig } from '../config/passConfig'

export default function PassActivation({ onComplete }: { onComplete?: () => void }) {
  const [stage, setStage] = useState<null | 'activating' | 'activated'>(null)
  const [finalMsg, setFinalMsg] = useState<string | null>(null)

  function activate() {
    setStage('activating')
    setTimeout(() => {
      setStage('activated')
      setTimeout(() => {
        setFinalMsg('Итак...\nкогда мы этим воспользуемся?')
        if (onComplete) onComplete()
      }, 900)
    }, 1200)
  }

  return (
    <div className="w-full max-w-md mx-auto mt-6 text-center">
      {stage === null ? (
        <>
          <div className="text-sm text-white/70 mb-2">Осталось только активировать приглашение.</div>
          <button onClick={activate} className="mt-4 inline-flex items-center gap-3 bg-rose-600 text-cream px-6 py-3 rounded-lg">АКТИВИРОВАТЬ PASS →</button>
        </>
      ) : stage === 'activating' ? (
        <div className="text-sm text-white/60">АКТИВАЦИЯ...</div>
      ) : (
        <>
          <div className="text-lg font-semibold text-cream">PASS АКТИВИРОВАН</div>
          {finalMsg ? <div className="mt-3 text-sm text-white/60 whitespace-pre-line">{finalMsg}</div> : null}
        </>
      )}
    </div>
  )
}

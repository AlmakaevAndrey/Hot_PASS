import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { passConfig } from '../config/passConfig'

export default function TelegramCTA({ onOpen }: { onOpen?: () => void }) {
  const [waitingMsg, setWaitingMsg] = useState<string | null>(null)
  const [animState, setAnimState] = useState<'idle' | 'danger' | 'remember'>('idle')

  function openTelegram() {
    window.open(passConfig.telegramUrl, '_blank', 'noopener')
    if (onOpen) onOpen()
  }

  function makeMeWait() {
    // start dramatic "wrong answer" animation
    setAnimState('danger')
    setWaitingMsg('Неверный выбор...')

    // longer dramatic sequence
    setTimeout(() => {
      setWaitingMsg('...Запомню это.')
      setAnimState('remember')
    }, 2200)

    // clear message after a while
    setTimeout(() => {
      setWaitingMsg(null)
      setAnimState('idle')
    }, 4200)
  }

  return (
    <div className="w-full max-w-md mx-auto mt-6 text-center space-y-3">
      {waitingMsg ? <div className="text-sm text-rose-400">{waitingMsg}</div> : null}

      <motion.button
        onClick={openTelegram}
        className="w-full inline-flex justify-center items-center gap-3 bg-rose-600 text-cream px-6 py-3 rounded-lg"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        aria-label="Открыть Telegram"
      >
        ДАВАЙ УЗНАЕМ 😈
      </motion.button>

      <motion.button
        onClick={makeMeWait}
        className="w-full inline-flex justify-center items-center gap-3 bg-transparent border border-white/6 text-cream px-4 py-2 rounded-lg"
        animate={animState === 'danger' ? { x: [0, -8, 8, -6, 6, 0], boxShadow: ['0 0 0 rgba(0,0,0,0)', '0 8px 30px rgba(179,18,53,0.18)'] } : animState === 'remember' ? { scale: [1, 1.02, 1] } : { x: 0 }}
        transition={animState === 'danger' ? { duration: 0.9, ease: 'easeInOut' } : { duration: 0.4 }}
        aria-label="Заставь меня ждать"
      >
        ЗАСТАВЬ МЕНЯ ЖДАТЬ
      </motion.button>
    </div>
  )
}

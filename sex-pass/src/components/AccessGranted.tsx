import React, { useEffect } from 'react'
import { motion } from 'framer-motion'

type Props = { onComplete: () => void }

export default function AccessGranted({ onComplete }: Props) {
  useEffect(() => {
    const t1 = setTimeout(() => {}, 0)
    return () => clearTimeout(t1)
  }, [])

  const items = ['ПРОВЕРКА...', 'ЛИЧНОСТЬ ПОДТВЕРЖДЕНА', 'ДОСТУП РАЗРЕШЁН']

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center pointer-events-none">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

      <div className="relative z-50 w-full max-w-md px-6 py-10 text-center pointer-events-auto">
        <div className="text-xs text-white/40 mb-6">СИСТЕМА АВТОРИЗАЦИИ · ПРОЦЕСС</div>
        {items.map((t, i) => (
          <motion.div
            key={t}
            initial={{ opacity: 0, filter: 'blur(6px)', y: 8 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            transition={{ delay: i * 0.9, duration: 0.6 }}
            className="mb-4"
          >
              <div className="serif text-2xl font-bold tracking-widest text-cream">{t}</div>
            {i === 0 ? (
              <div className="h-2 bg-white/6 rounded mt-2 overflow-hidden">
                <motion.div initial={{ width: '0%' }} animate={{ width: '100%' }} transition={{ delay: 0.2, duration: 0.9 }} className="h-2 bg-gradient-to-r from-rose-700 via-rose-600 to-rose-400" />
              </div>
            ) : null}
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: items.length * 0.9 + 0.5 }}
        >
          <div className="text-sm text-white/60">Идентификация пройдена.</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: items.length * 0.9 + 1.5 }}
        >
          <button
            onClick={onComplete}
            className="mt-8 inline-flex items-center gap-3 bg-rose-700/10 border border-white/6 text-cream px-5 py-3 rounded-lg"
          >
            Продолжить
          </button>
        </motion.div>
      </div>
    </div>
  )
}

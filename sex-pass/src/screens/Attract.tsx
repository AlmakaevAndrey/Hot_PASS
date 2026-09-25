import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Button from '../components/Button'
import Card from '../components/Card'

const options = [
  'То, что ты задумал 🫢',
  'Мне просто стало интересно 😏',
  'Я уже знаю, чем это закончится ❤️‍🔥'
]

const reactions = [
  'Интересно... 🫢',
  'Любопытно. 😏',
  "Похоже, всё становится серьёзнее.❤️‍🔥"
]

export default function Attract({ go, setCtx, ctx }: any) {
  const [sel, setSel] = useState<number | null>(null)
  const [reactText, setReactText] = useState<string | null>(null)

  function select(i: number) {
    setSel(i)
    setCtx({ ...ctx, attract: options[i] })
    setReactText(reactions[i] || 'Interesting.')

    // auto-advance after short pause
    setTimeout(() => {
      go('tension')
    }, 900)
  }

  return (
    <Card>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h2 className="serif text-2xl font-bold mb-2">Давай проверим, подходишь ли ты.</h2>
        <p className="text-sm text-white/70 mb-4">Первый тест. Отвечай честно.</p>

        <div className="space-y-3 mb-4">
          {options.map((o, i) => (
            <motion.button
              key={o}
              onClick={() => select(i)}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06 * i }}
              className={`w-full text-left p-3 rounded-lg transition-all ripple ${
                sel === i ? 'scale-102 bg-deepred/60 ring-1 ring-gold' : 'bg-white/2'
              }`}
            >
              {o}
            </motion.button>
          ))}
        </div>

        {reactText ? <div className="text-sm text-white/60 mb-4">{reactText}</div> : null}

        <div className="flex gap-3">
          <Button variant="ghost" onClick={() => go('intro')}>Назад</Button>
          <Button onClick={() => go('tension')} className="flex-1" disabled={sel === null}>Продолжить</Button>
        </div>
      </motion.div>
    </Card>
  )
}


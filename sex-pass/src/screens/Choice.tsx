import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Button from '../components/Button'
import Card from '../components/Card'

export default function Choice({ go, setCtx, ctx }: any) {
  const [reactText, setReactText] = useState<string | null>(null)

  function choose(mode: string) {
    setCtx({ ...ctx, choice: mode })
    setReactText(mode === 'mystery' ? 'Это становится интригующе.' : mode === 'bold' ? 'Ну вот это серьёзно.' : 'Ммм, дразняще.')
    setTimeout(() => go('confirm'), 800)
  }

  return (
    <Card>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h2 className="serif text-2xl font-bold mb-2">Сделай свой ход</h2>
        <p className="text-sm text-white/70 mb-4">Выбери один вариант.</p>

        <div className="space-y-3 mb-4">
          <button onClick={() => choose('soft')} className="w-full p-3 rounded-lg bg-white/2">Мягко и дразняще</button>
          <button onClick={() => choose('bold')} className="w-full p-3 rounded-lg bg-white/2">Смело и прямо</button>
          <button onClick={() => choose('mystery')} className="w-full p-3 rounded-lg bg-white/2">Пусть остаётся тайной</button>
        </div>

        {reactText ? <div className="text-sm text-white/60 mb-4">{reactText}</div> : null}

        <div className="flex gap-3">
          <Button variant="ghost" onClick={() => go('tension')}>Назад</Button>
        </div>
      </motion.div>
    </Card>
  )
}

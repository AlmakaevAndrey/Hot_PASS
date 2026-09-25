import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Button from '../components/Button'
import Card from '../components/Card'

function DangerLabel({ v }: { v: number }) {
  if (v < 25) return <div className="text-sm text-white/60">Нежно и невинно.</div>
  if (v < 50) return <div className="text-sm text-white/60">Игриво, начинает щекотать.</div>
  if (v < 75) return <div className="text-sm text-white/60">Напряжение растёт.</div>
  if (v < 90) return <div className="text-sm text-white/60">Почти на пределе.</div>
  return <div className="text-sm text-white/60">Полный разрыв правил.</div>
}

export default function Tension({ go, setCtx, ctx }: any) {
  const [val, setVal] = useState<number>(42)
  const [desc, setDesc] = useState<string>('Прокрути ползунок, чтобы почувствовать напряжение.')

  return (
    <Card>
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="serif text-2xl font-bold mb-2">Насколько ты рискованна?</h2>
        <p className="text-sm text-white/70 mb-4">Прокрути ползунок, чтобы настроить степень напряжения.</p>
        <p className="text-sm text-white/60 mb-4">{desc}</p>

        <div className="mb-3 text-center text-3xl">{val >= 90 ? '🔥' : val >= 50 ? '😏' : '😇'}</div>

        <div className="w-full px-2">
          <div className="w-full h-1 rounded-full bg-white/6 relative" style={{ overflow: 'hidden' }}>
            <div style={{ width: `${val}%`, height: '100%', background: 'linear-gradient(90deg, rgba(179,18,53,0.95), rgba(74,7,20,0.6))', transition: 'width 220ms linear' }} />
            <div style={{ position: 'absolute', left: `calc(${val}% - 10px)`, top: -6 }}>
              <div className="w-4 h-4 rounded-full" style={{ background: 'rgba(179,18,53,0.95)', boxShadow: '0 6px 22px rgba(179,18,53,0.18)' }} />
            </div>
          </div>

          <input
            aria-label="tension"
            type="range"
            min={0}
            max={100}
            value={val}
            onChange={(e) => {
              const v = Number(e.target.value)
              setVal(v)
              if (v < 25) setDesc('Мягкое предвкушение. Всё только начинается.')
              else if (v < 50) setDesc('Флирт усиливается, лёгкая провокация.')
              else if (v < 75) setDesc('Напряжение растёт — всё острее.')
              else if (v < 90) setDesc('Пик ожидания — дыхание учащается.')
              else setDesc('Границы размыты. Полный разрыв правил.')
            }}
            className="w-full appearance-none bg-transparent mt-4"
            style={{ WebkitAppearance: 'none' }}
          />
        </div>

        <div className="mt-3 text-center"><DangerLabel v={val} /></div>

        <div className="flex gap-3 mt-6">
          <Button variant="ghost" onClick={() => go('attract')}>Назад</Button>
          <Button
            onClick={() => {
              setCtx({ ...ctx, tension: val })
              go('choice')
            }}
            className="flex-1"
          >
            Продолжить
          </Button>
        </div>
      </motion.div>
    </Card>
  )
}

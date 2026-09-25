import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Button from '../components/Button'
import Card from '../components/Card'

function Check({ checked, onToggle, label }: { checked: boolean; onToggle: () => void; label: string }) {
  return (
    <button
      onClick={onToggle}
      role="checkbox"
      aria-checked={checked}
      className="w-full flex items-center gap-3 p-3 bg-white/3 rounded-lg"
    >
      <div style={{ width: 22, height: 22, borderRadius: 999, border: '1px solid rgba(255,255,255,0.08)', display: 'grid', placeItems: 'center' }}>
        {checked ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
        ) : null}
      </div>
      <div className="text-sm text-white/80">{label}</div>
    </button>
  )
}

export default function Confirm({ go, setCtx, ctx }: any) {
  const [name, setName] = useState<string>(ctx?.name ?? '')
  const [checks, setChecks] = useState([false, false, false])
  const [hint, setHint] = useState<string>('')

  function toggle(i: number) {
    setChecks((s) => s.map((v, idx) => (idx === i ? !v : v)))
  }

  function generate() {
    // require all confirmations before generating
    const all = checks.every(Boolean)
    if (!all) {
      setHint('Сначала отметь все пункты — тогда доступ будет открыт.')
      window.setTimeout(() => setHint(''), 3500)
      return
    }

    // set fixed recipient name (for Diane) and save confirmations
    setCtx({ ...ctx, name: 'Диана', confirmations: checks })
    go('verify')
  }

  const all = checks.every(Boolean)

  return (
    <Card>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h2 className="serif text-2xl font-bold mb-2">Ещё одно</h2>
        <p className="text-sm text-white/70 mb-4">Перед тем как дать доступ...</p>

        {/* Получатель скрыт по запросу — имя ставится при генерации пропуска. */}

        <div className="space-y-3 mb-4">
          <Check checked={checks[0]} onToggle={() => toggle(0)} label="Мне действительно хочется провести с тобой время." />
          <Check checked={checks[1]} onToggle={() => toggle(1)} label="Я понимаю, что это приглашение, а не обязательство." />
          <Check checked={checks[2]} onToggle={() => toggle(2)} label={'В любой момент я могу сказать "нет".'} />
        </div>

        <div className="flex gap-3">
          <Button variant="ghost" onClick={() => go('choice')}>Назад</Button>
          <Button
            onClick={generate}
            className={`flex-1 ${!all ? 'opacity-60' : ''}`}
            aria-disabled={!all}
          >
            РАЗБЛОКИРОВАТЬ PASS
          </Button>
        </div>
        {hint ? <div className="text-sm text-rose-400 mt-3">{hint}</div> : null}
      </motion.div>
    </Card>
  )
}

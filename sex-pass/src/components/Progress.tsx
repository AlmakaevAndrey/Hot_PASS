import React from 'react'

export default function Progress({ step = 1, total = 5 }: { step?: number; total?: number }) {
  const pct = Math.max(0, Math.min(1, (step - 1) / (total - 1)))
  return (
    <div className="w-full max-w-md mb-6">
      <div className="flex items-center justify-between mb-2 progress-track">
        <div className="uppercase text-xs">{String(step).padStart(2, '0')} — {String(total).padStart(2, '0')}</div>
        <div className="text-xs">Scene</div>
      </div>
      <div className="w-full bg-transparent progress-line rounded-full" style={{ height: 4 }}>
        <div style={{ width: `${pct * 100}%`, height: 4, background: 'linear-gradient(90deg, rgba(179,18,53,0.9), rgba(255,255,255,0.12))', borderRadius: 2 }} />
      </div>
    </div>
  )
}

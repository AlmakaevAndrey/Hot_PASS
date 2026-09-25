import React from 'react'

export default function PassFront({ name, code, issuer }: any) {
  return (
    <div className="w-full h-full flex flex-col justify-between" style={{ minHeight: 200 }}>
      <div>
        <div className="text-xs text-white/60">PRIVATE CLUB</div>
        <div className="serif text-3xl font-bold tracking-tight mt-1">18+ ПРОПУСК</div>
      </div>

      <div className="text-center mt-4">
        <div className="text-xs text-white/60">ВЛАДЕЛЕЦ</div>
        <div className="text-2xl font-semibold mt-1">{name}</div>
        <div className="text-xs text-white/50 mt-2">ПРОПУСК № {code}</div>
      </div>

      <div className="flex items-center justify-between text-xs text-white/60 mt-6">
        <div>
          <div className="font-semibold">ОДОБРЕНО ✓</div>
          <div className="mt-1">ВЫДАНО<br/>{issuer}</div>
        </div>
        <div className="text-right">
          <div className="text-xs">УРОВЕНЬ ДОСТУПА</div>
          <div className="font-semibold">ПРИВАТНЫЙ</div>
        </div>
      </div>

      <div className="mt-6 text-center text-xs text-white/50">НЕ ПЕРЕДАЁТСЯ · УПОЛНОМОЧЕНО · 18+</div>
      <div className="mt-4 h-8 bg-white/6 rounded" />
    </div>
  )
}

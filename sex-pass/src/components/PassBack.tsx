import React from 'react'

export default function PassBack() {
  return (
    <div className="w-full h-full p-4" style={{ minHeight: 200 }}>
      <div className="serif text-xl font-bold mb-3">УСЛОВИЯ ДОСТУПА</div>
      <ol className="text-sm list-decimal ml-5 space-y-2">
        <li>Химия — обоюдная.</li>
        <li>Без давления.</li>
        <li>Любой может остановиться в любой момент.</li>
        <li>Хорошие решения важнее оправданий.</li>
      </ol>

      <div className="mt-6 text-xs text-white/60">УПОЛНОМОЧЕНО: ANDREY</div>
      <div className="text-sm font-semibold mt-2">✓ ПРОВЕРЕНО</div>
      <div className="text-xs text-white/50 mt-4">ДЕЙСТВИТЕЛЕН ТОЛЬКО МЕЖДУ ДВУМЯ ЛЮДЬМИ</div>
    </div>
  )
}

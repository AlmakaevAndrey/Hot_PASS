import React from 'react'

export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-md bg-white/3 backdrop-blur-md border border-white/6 rounded-2xl p-6 shadow-glow">
      {children}
    </div>
  )
}

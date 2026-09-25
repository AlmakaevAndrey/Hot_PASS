import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost'
}

export default function Button({ variant = 'primary', className = '', children, ...props }: Props) {
  const base = 'inline-flex items-center gap-3 justify-center rounded-lg px-5 py-3 font-semibold select-none'
  const variants: Record<string, string> = {
    primary: 'glass-card text-cream border border-white/6',
    ghost: 'bg-transparent text-cream border border-white/6'
  }

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      whileHover={{ y: -2, boxShadow: '0 8px 30px rgba(179,18,53,0.08)' }}
      transition={{ duration: 0.28, ease: [0.16, 0.84, 0.24, 1] }}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      <span className="ui-sans">{children}</span>
      <ArrowRight size={16} className="opacity-80" />
    </motion.button>
  )
}

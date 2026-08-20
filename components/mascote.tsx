'use client'

import { useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'

const FRASES_ACORDADO = ['Au au!', '$ pet dog.exe', 'zzz... quem chamou?', 'café ☕ pra acordar']

export function Mascote({ ativo }: { ativo: boolean }) {
  const [acordado, setAcordado] = useState(false)
  const [frase, setFrase] = useState(FRASES_ACORDADO[0])
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const reduceMotion = useReducedMotion()

  if (!ativo) return null

  function acordar() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setFrase(FRASES_ACORDADO[Math.floor(Math.random() * FRASES_ACORDADO.length)])
    setAcordado(true)
    timeoutRef.current = setTimeout(() => setAcordado(false), 2000)
  }

  return (
    <div className="fixed bottom-4 right-4 z-30 !w-fit select-none">
      <motion.button
        type="button"
        onClick={acordar}
        aria-label="Cutucar o mascote"
        animate={acordado && !reduceMotion ? { rotate: [0, -8, 8, -5, 5, 0] } : { rotate: 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="block cursor-pointer"
      >
        <Image
          src="/img/mascote-cachorro.svg"
          alt=""
          aria-hidden
          width={64}
          height={116}
          priority
          className="!h-[116px] !w-16"
        />
      </motion.button>

      <div className="pointer-events-none absolute top-2 right-8 rounded-2xl border border-hairline bg-card px-2 py-1 font-mono text-[10px] text-foreground/80 shadow-sm">
        {acordado ? frase : 'ZZZZ'}
      </div>

      {acordado ? (
        <span className="pointer-events-none absolute top-9 right-9 h-2 w-2 rotate-45 border-b border-r border-hairline bg-card" />
      ) : (
        <>
          <span className="pointer-events-none absolute top-9 right-9 h-2 w-2 rounded-full border border-hairline bg-card" />
          <span className="pointer-events-none absolute top-6 right-7 h-1.5 w-1.5 rounded-full border border-hairline bg-card" />
        </>
      )}
    </div>
  )
}

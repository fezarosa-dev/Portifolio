'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useReduceMotion } from '@/components/reduce-motion-provider'

const JOKE_API_URL = 'https://api.chucknorris.io/jokes/random?category=dev'
const FRASES_FALLBACK = ['Au au!', '$ pet dog.exe', 'zzz... quem chamou?', 'café ☕ pra acordar']

export function Mascote({ ativo }: { ativo: boolean }) {
  const [acordado, setAcordado] = useState(false)
  const [frase, setFrase] = useState('...')
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const requestIdRef = useRef(0)
  const { enabled: reduceMotion } = useReduceMotion()

  if (!ativo) return null

  function acordar() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    const requestId = ++requestIdRef.current
    setFrase('...')
    setAcordado(true)
    timeoutRef.current = setTimeout(() => setAcordado(false), 6000)

    fetch(JOKE_API_URL)
      .then((res) => res.json())
      .then((data) => {
        if (requestId !== requestIdRef.current) return
        if (typeof data.value !== 'string') throw new Error('sem piada')
        setFrase(data.value.length > 140 ? `${data.value.slice(0, 140)}…` : data.value)
      })
      .catch(() => {
        if (requestId !== requestIdRef.current) return
        setFrase(FRASES_FALLBACK[Math.floor(Math.random() * FRASES_FALLBACK.length)])
      })
  }

  return (
    <div className="fixed bottom-0 right-4 z-30 !w-fit origin-bottom-right scale-75 select-none sm:bottom-4 sm:scale-100">
      <motion.button
        type="button"
        onClick={acordar}
        aria-label="Cutucar o mascote"
        animate={acordado && !reduceMotion ? { rotate: [0, -8, 8, -5, 5, 0] } : { rotate: 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="block cursor-pointer"
      >
        <Image
          src={acordado ? '/img/mascote-cachorro-acordado.svg' : '/img/mascote-cachorro.svg'}
          alt=""
          aria-hidden
          width={64}
          height={116}
          priority
          className="!h-[116px] !w-16"
        />
      </motion.button>

      <div className="pointer-events-none absolute right-8 bottom-[108px] w-max max-w-[220px] rounded-2xl border border-hairline bg-card px-2 py-1 font-mono text-[10px] leading-snug break-words text-foreground/80 shadow-sm">
        {acordado ? frase : 'ZZZZ'}
      </div>

      {!acordado && (
        <>
          <span className="pointer-events-none absolute top-6 right-9 h-2 w-2 rounded-full border border-hairline bg-card" />
          <span className="pointer-events-none absolute top-4 right-7 h-1.5 w-1.5 rounded-full border border-hairline bg-card" />
        </>
      )}
    </div>
  )
}

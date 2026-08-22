'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useReduceMotion } from '@/components/reduce-motion-provider'
import { RickrollPlayer } from '@/components/rickroll-player'

const JOKE_API_URL = 'https://api.chucknorris.io/jokes/random?category=dev'
const FRASES_FALLBACK = ['Au au!', '$ pet dog.exe', 'zzz... quem chamou?', 'café ☕ pra acordar']
const RICKROLL_CLICKS = 3
const RICKROLL_WINDOW_MS = 900

export function Mascote({ ativo, rickrollVideoId }: { ativo: boolean; rickrollVideoId: string | null }) {
  const [acordado, setAcordado] = useState(false)
  const [frase, setFrase] = useState('...')
  const [rickrollOpen, setRickrollOpen] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const requestIdRef = useRef(0)
  const clickTimestampsRef = useRef<number[]>([])
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

  function handleClick() {
    acordar()
    if (!rickrollVideoId) return

    const now = Date.now()
    const recent = clickTimestampsRef.current.filter((t) => now - t < RICKROLL_WINDOW_MS)
    recent.push(now)
    clickTimestampsRef.current = recent

    if (recent.length >= RICKROLL_CLICKS) {
      clickTimestampsRef.current = []
      setRickrollOpen(true)
    }
  }

  return (
    <div className="fixed bottom-0 right-4 z-30 !w-fit origin-bottom-right scale-75 select-none sm:bottom-4 sm:scale-100">
      <motion.button
        type="button"
        onClick={handleClick}
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

      {rickrollOpen && rickrollVideoId && (
        <RickrollPlayer
          videoUrl={`/api/drive-video/${rickrollVideoId}`}
          onClose={() => setRickrollOpen(false)}
        />
      )}
    </div>
  )
}

'use client'

// achou um easter egg vasculhando o código? tem mais: components/sudo-easter-egg.tsx
// e components/spin-easter-egg.tsx. este aqui: ↑ ↑ ↓ ↓ ← → ← → B A com o menu de
// configurações do site aberto.
import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useReduceMotion } from '@/components/reduce-motion-provider'

const SEQUENCE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
]
const MAX_GAP_MS = 700

const NUDGE: Record<string, { axis: 'X' | 'Y'; sign: 1 | -1 }> = {
  ArrowUp: { axis: 'Y', sign: -1 },
  ArrowDown: { axis: 'Y', sign: 1 },
  ArrowLeft: { axis: 'X', sign: -1 },
  ArrowRight: { axis: 'X', sign: 1 },
}

export function KonamiAdmin({ active }: { active: boolean }) {
  const router = useRouter()
  const { enabled: reduceMotion } = useReduceMotion()
  const progressRef = useRef(0)
  const lastTimeRef = useRef(0)

  useEffect(() => {
    if (!active) {
      progressRef.current = 0
      return
    }

    function nudge(key: string) {
      if (reduceMotion) return
      const dir = NUDGE[key]
      if (!dir) return
      const offset = dir.sign * 14
      const to = dir.axis === 'X' ? `translateX(${offset}px)` : `translateY(${offset}px)`
      const settle = dir.axis === 'X' ? `translateX(${-offset * 0.15}px)` : `translateY(${-offset * 0.15}px)`
      document.body.animate(
        [{ transform: 'translate(0, 0)' }, { transform: to, offset: 0.3 }, { transform: settle, offset: 0.6 }, { transform: 'translate(0, 0)' }],
        { duration: 350, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }
      )
    }

    function handleKeyDown(e: KeyboardEvent) {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key
      const now = Date.now()
      if (now - lastTimeRef.current > MAX_GAP_MS) progressRef.current = 0
      lastTimeRef.current = now

      const expected = SEQUENCE[progressRef.current]
      if (key !== expected) {
        progressRef.current = key === SEQUENCE[0] ? 1 : 0
        return
      }

      nudge(key)

      progressRef.current += 1
      if (progressRef.current === SEQUENCE.length) {
        progressRef.current = 0
        router.push('/admin/login')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [active, reduceMotion, router])

  return null
}

'use client'

// oi, dev curioso. digite "sudo" em qualquer lugar da página (fora de um
// campo de texto) pra ver o que acontece. tem mais easter eggs escondidos
// em konami-admin.tsx e spin-easter-egg.tsx.
import { useEffect, useRef, useState } from 'react'
import { useReduceMotion } from '@/components/reduce-motion-provider'
import type { Locale } from '@/lib/i18n/dictionaries'

const SEQUENCE = ['s', 'u', 'd', 'o']
const MAX_GAP_MS = 1500
const VISIBLE_MS = 2500

function isTypingTarget(el: Element | null): boolean {
  if (!el) return false
  const tag = el.tagName
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || (el as HTMLElement).isContentEditable
}

export function SudoEasterEgg({ locale }: { locale: Locale }) {
  const { enabled: reduceMotion } = useReduceMotion()
  const [visible, setVisible] = useState(false)
  const progressRef = useRef(0)
  const lastTimeRef = useRef(0)
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const isEn = locale === 'en'
    console.log('%c$ whoami', 'color:#F2661D;font-family:monospace;font-size:13px;font-weight:bold')
    console.log(
      '%cFelipe Zanoni da Rosa — Software Engineer',
      'font-family:monospace;font-size:20px;font-weight:bold'
    )
    console.log(
      isEn
        ? '%cYou opened the console. I recognize a dev when I see one.'
        : '%cVocê abriu o console. Reconheço um dev quando vejo um.',
      'font-family:monospace;color:#6b7280;font-size:12px'
    )
    console.log(
      `%c${isEn ? 'Curious how this site was built?' : 'Curioso sobre como esse site foi feito?'} %chttps://github.com/fezarosa-dev/portfolio`,
      'font-family:monospace;color:#6b7280;font-size:12px',
      'font-family:monospace;color:#F2661D;font-size:12px'
    )
    console.log(
      `%c${isEn ? "Let's talk" : 'Bora conversar'} → mailto:fezarosa@gmail.com`,
      'font-family:monospace;color:#6b7280;font-size:12px'
    )
  }, [locale])

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (isTypingTarget(document.activeElement)) return
      const key = e.key.toLowerCase()
      const now = Date.now()
      if (now - lastTimeRef.current > MAX_GAP_MS) progressRef.current = 0
      lastTimeRef.current = now

      const expected = SEQUENCE[progressRef.current]
      if (key !== expected) {
        progressRef.current = key === SEQUENCE[0] ? 1 : 0
        return
      }

      progressRef.current += 1
      if (progressRef.current === SEQUENCE.length) {
        progressRef.current = 0
        setVisible(true)
        if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
        hideTimerRef.current = setTimeout(() => setVisible(false), VISIBLE_MS)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
    }
  }, [])

  if (!visible) return null

  const message = locale === 'en' ? 'NOW YOU ARE A GOD' : 'AGORA VOCÊ É UM DEUS'

  return (
    <div
      className={`fixed inset-0 z-[60] flex items-center justify-center bg-black/80 px-6 text-center ${reduceMotion ? '' : 'animate-in fade-in-0 duration-200'}`}
    >
      <p className="font-mono text-4xl font-bold tracking-tight text-signal sm:text-6xl">{message}</p>
    </div>
  )
}

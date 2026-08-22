'use client'

import { useEffect, useRef } from 'react'
import { useReduceMotion } from '@/components/reduce-motion-provider'

const WORDS = ['girar', 'spin']
const MAX_GAP_MS = 1500

function isTypingTarget(el: Element | null): boolean {
  if (!el) return false
  const tag = el.tagName
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || (el as HTMLElement).isContentEditable
}

export function SpinEasterEgg() {
  const { enabled: reduceMotion } = useReduceMotion()
  const progressRef = useRef<number[]>(WORDS.map(() => 0))
  const lastTimeRef = useRef(0)

  useEffect(() => {
    function spin() {
      if (reduceMotion) return
      const prevOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      const animation = document.body.animate(
        [{ transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' }],
        { duration: 1000, easing: 'cubic-bezier(0.65, 0, 0.35, 1)' }
      )
      animation.onfinish = () => {
        document.body.style.overflow = prevOverflow
      }
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (isTypingTarget(document.activeElement)) return
      if (e.key.length !== 1) return
      const key = e.key.toLowerCase()
      const now = Date.now()
      const progress = progressRef.current
      if (now - lastTimeRef.current > MAX_GAP_MS) progress.fill(0)
      lastTimeRef.current = now

      for (let i = 0; i < WORDS.length; i++) {
        const word = WORDS[i]
        if (key === word[progress[i]]) {
          progress[i] += 1
          if (progress[i] === word.length) {
            progress.fill(0)
            spin()
            return
          }
        } else {
          progress[i] = key === word[0] ? 1 : 0
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [reduceMotion])

  return null
}

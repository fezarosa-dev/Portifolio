'use client'

import { useEffect, useMemo, useState } from 'react'
import { buildTypingScript } from '@/lib/typewriter-script'

export function Typewriter({
  text,
  startDelay = 0,
  speed = 65,
}: {
  text: string
  startDelay?: number
  speed?: number
}) {
  const steps = useMemo(() => buildTypingScript(text), [text])
  const [stepIndex, setStepIndex] = useState(0)
  const [display, setDisplay] = useState('')
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    setReduceMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  useEffect(() => {
    if (reduceMotion) {
      setDisplay(text)
      setStepIndex(steps.length)
      return
    }
    if (stepIndex >= steps.length) return

    const step = steps[stepIndex]
    const delay = stepIndex === 0 ? startDelay : step.kind === 'pause' ? step.ms : speed

    const timer = setTimeout(() => {
      if (step.kind === 'type') setDisplay((d) => d + step.char)
      if (step.kind === 'delete') setDisplay((d) => d.slice(0, -1))
      setStepIndex((i) => i + 1)
    }, delay)

    return () => clearTimeout(timer)
  }, [stepIndex, steps, text, startDelay, speed, reduceMotion])

  const done = stepIndex >= steps.length

  return (
    <span>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {display}
        <span
          className={`ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.15em] bg-current ${
            reduceMotion ? 'hidden' : done ? 'animate-blink' : ''
          }`}
        />
      </span>
    </span>
  )
}

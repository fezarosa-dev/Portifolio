'use client'

import { useEffect, useState } from 'react'

export function Typewriter({
  text,
  startDelay = 0,
  speed = 35,
}: {
  text: string
  startDelay?: number
  speed?: number
}) {
  const [count, setCount] = useState(0)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    setReduceMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  useEffect(() => {
    if (reduceMotion) {
      setCount(text.length)
      return
    }
    if (count >= text.length) return

    const delay = count === 0 ? startDelay : speed
    const timer = setTimeout(() => setCount((c) => c + 1), delay)
    return () => clearTimeout(timer)
  }, [count, text, startDelay, speed, reduceMotion])

  const done = count >= text.length

  return (
    <span>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.slice(0, count)}
        <span
          className={`ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.15em] bg-current ${
            reduceMotion ? 'hidden' : done ? 'animate-blink' : ''
          }`}
        />
      </span>
    </span>
  )
}

'use client'

import { useState } from 'react'

export function ThemeToggle({ initialDark }: { initialDark: boolean }) {
  const [dark, setDark] = useState(initialDark)

  function toggle() {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    document.cookie = `theme=${next ? 'dark' : 'light'}; path=/; max-age=${60 * 60 * 24 * 365}`
  }

  return (
    <label className="inline-flex shrink-0 cursor-pointer items-center" aria-label="Dark mode">
      <input type="checkbox" checked={dark} onChange={toggle} className="peer sr-only" />
      <span
        className={`
          relative h-4 w-8 rounded border border-black bg-background
          shadow-[2px_2px_0_#000] transition-colors
          peer-checked:border-signal
          before:absolute before:top-0.5 before:left-0.5 before:h-2.5 before:w-2.5
          before:rounded-sm before:border before:border-black before:bg-background
          before:shadow-[1px_1px_0_#000] before:transition-transform before:content-['']
          peer-checked:before:translate-x-4 peer-checked:before:border-signal peer-checked:before:bg-signal
        `}
      />
    </label>
  )
}

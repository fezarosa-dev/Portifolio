'use client'

import { useEffect, useState } from 'react'
import type { Locale } from '@/lib/i18n/dictionaries'

export function ThemeToggle({ initialDark, locale }: { initialDark: boolean; locale: Locale }) {
  const [dark, setDark] = useState(initialDark)

  useEffect(() => {
    // syncs with the beforeInteractive script that applies prefers-color-scheme
    // when there's no theme cookie yet, so the caption/checkbox match the real class
    const actual = document.documentElement.classList.contains('dark')
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (actual !== dark) setDark(actual)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const label = locale === 'en' ? 'Toggle dark mode' : 'Alternar modo escuro'
  const captionOn = locale === 'en' ? 'dark' : 'escuro'
  const captionOff = locale === 'en' ? 'light' : 'claro'

  function toggle() {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    document.cookie = `theme=${next ? 'dark' : 'light'}; path=/; max-age=${60 * 60 * 24 * 365}`
  }

  return (
    <label
      className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 font-mono text-xs"
      title={label}
      aria-label={label}
    >
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
      <span className="text-steel">{dark ? captionOn : captionOff}</span>
    </label>
  )
}

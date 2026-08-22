'use client'

import { useReduceMotion } from '@/components/reduce-motion-provider'
import type { Locale } from '@/lib/i18n/dictionaries'

export function ReduceMotionToggle({ locale }: { locale: Locale }) {
  const { enabled, toggle } = useReduceMotion()
  const label = locale === 'en' ? 'Reduce animations' : 'Reduzir animações'
  const captionOn = locale === 'en' ? 'reduced' : 'reduzidas'
  const captionOff = locale === 'en' ? 'full' : 'completas'

  return (
    <label
      className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 font-mono text-xs"
      title={label}
      aria-label={label}
    >
      <input type="checkbox" checked={enabled} onChange={toggle} className="peer sr-only" />
      <span
        className={`
          relative h-4 w-8 rounded border border-black bg-background
          shadow-[2px_2px_0_#000] transition-colors
          dark:not-peer-checked:border-white dark:not-peer-checked:shadow-[2px_2px_0_#fff]
          peer-checked:border-signal
          before:absolute before:top-0.5 before:left-0.5 before:h-2.5 before:w-2.5
          before:rounded-sm before:border before:border-black before:bg-background
          before:shadow-[1px_1px_0_#000] before:transition-transform before:content-['']
          dark:not-peer-checked:before:border-white dark:not-peer-checked:before:shadow-[1px_1px_0_#fff]
          peer-checked:before:translate-x-4 peer-checked:before:border-signal peer-checked:before:bg-signal
        `}
      />
      <span className="text-steel">{enabled ? captionOn : captionOff}</span>
    </label>
  )
}

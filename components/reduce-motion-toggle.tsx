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
      <input type="checkbox" checked={enabled} onChange={toggle} className="sr-only" />
      <svg
        strokeWidth={0}
        stroke="currentColor"
        fill="currentColor"
        viewBox="0 0 18 18"
        height={18}
        width={18}
        className={`shrink-0 transition-colors ${enabled ? 'text-signal' : 'text-steel'}`}
      >
        <mask id="reduceMotionLineMask">
          <rect fill="white" height={18} width={18} />
          <rect fill="black" style={{ rotate: '30deg' }} height={16} width="4.1" y={-5} x="9.807" />
        </mask>
        <rect
          style={{ rotate: '30deg' }}
          height={13}
          width="1.3"
          y="-3.3"
          x="11.3"
          className={`origin-center transition-transform duration-200 ${enabled ? 'scale-y-100' : 'scale-y-0'}`}
        />
        <g mask="url(#reduceMotionLineMask)">
          <circle
            fill="none"
            strokeWidth=".1"
            r="2.95"
            cy={9}
            cx="3.24"
            className={`transition-opacity duration-200 ${enabled ? 'opacity-0' : 'opacity-100'}`}
          />
          <circle
            fill="none"
            strokeWidth=".2"
            r="2.9"
            cy={9}
            cx={6}
            className={`transition-opacity duration-200 ${enabled ? 'opacity-0' : 'opacity-100'}`}
          />
          <circle
            fill="none"
            strokeWidth=".3"
            r="2.8"
            cy={9}
            cx={9}
            className={`transition-opacity duration-200 ${enabled ? 'opacity-0' : 'opacity-100'}`}
          />
          <circle
            fill="none"
            strokeWidth=".4"
            r="2.75"
            cy={9}
            cx="11.75"
            className={`transition-opacity duration-200 ${enabled ? 'opacity-0' : 'opacity-100'}`}
          />
          <circle
            r={3}
            cy={9}
            cx="14.7"
            className={`origin-center transition-transform duration-200 ${enabled ? '-translate-x-[5.7px]' : ''}`}
          />
        </g>
      </svg>
      <span className="text-steel">{enabled ? captionOn : captionOff}</span>
    </label>
  )
}

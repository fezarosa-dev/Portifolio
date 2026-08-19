'use client'

import { useTransition } from 'react'
import { setLocale } from '@/lib/i18n-actions'
import type { Locale } from '@/lib/i18n/dictionaries'

export function LanguageSwitch({ locale }: { locale: Locale }) {
  const [isPending, startTransition] = useTransition()

  function select(next: Locale) {
    if (next === locale || isPending) return
    startTransition(() => {
      setLocale(next)
    })
  }

  return (
    <div className="flex items-center gap-1 font-mono text-xs">
      <button
        type="button"
        onClick={() => select('pt')}
        aria-current={locale === 'pt'}
        className={`transition-colors ${locale === 'pt' ? 'text-signal' : 'text-steel hover:text-foreground'}`}
      >
        PT
      </button>
      <span className="text-hairline" aria-hidden>
        /
      </span>
      <button
        type="button"
        onClick={() => select('en')}
        aria-current={locale === 'en'}
        className={locale === 'en' ? 'text-signal' : 'text-steel hover:text-foreground'}
      >
        EN
      </button>
    </div>
  )
}

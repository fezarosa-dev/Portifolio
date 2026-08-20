'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { Locale } from '@/lib/i18n/dictionaries'

function pathFor(pathname: string, target: Locale) {
  const rest = pathname.replace(/^\/(pt|en)/, '')
  return `/${target}${rest}`
}

export function LanguageSwitch({ locale }: { locale: Locale }) {
  const pathname = usePathname()

  function remember(target: Locale) {
    document.cookie = `locale=${target}; path=/; max-age=${60 * 60 * 24 * 365}`
  }

  return (
    <div className="flex items-center gap-1 font-mono text-xs">
      <Link
        href={pathFor(pathname, 'pt')}
        onClick={() => remember('pt')}
        aria-current={locale === 'pt'}
        className={`transition-colors ${locale === 'pt' ? 'text-signal' : 'text-steel hover:text-foreground'}`}
      >
        PT
      </Link>
      <span className="text-hairline" aria-hidden>
        /
      </span>
      <Link
        href={pathFor(pathname, 'en')}
        onClick={() => remember('en')}
        aria-current={locale === 'en'}
        className={locale === 'en' ? 'text-signal' : 'text-steel hover:text-foreground'}
      >
        EN
      </Link>
    </div>
  )
}

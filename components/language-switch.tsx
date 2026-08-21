'use client'

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
      {/* <a> nativo em vez de next/link: como o idioma é decidido por
          middleware rewrite (mesma rota interna pras duas), o router cache
          do Next às vezes reaproveita o conteúdo do idioma anterior num
          soft-navigation — <a> força um carregamento completo, sem cache */}
      <a
        href={pathFor(pathname, 'pt')}
        onClick={() => remember('pt')}
        aria-current={locale === 'pt'}
        className={`transition-colors ${locale === 'pt' ? 'text-signal' : 'text-steel hover:text-foreground'}`}
      >
        PT
      </a>
      <span className="text-hairline" aria-hidden>
        /
      </span>
      <a
        href={pathFor(pathname, 'en')}
        onClick={() => remember('en')}
        aria-current={locale === 'en'}
        className={locale === 'en' ? 'text-signal' : 'text-steel hover:text-foreground'}
      >
        EN
      </a>
    </div>
  )
}

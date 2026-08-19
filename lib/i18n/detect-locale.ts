import type { Locale } from './dictionaries'

export function detectLocaleFromAcceptLanguage(acceptLanguage: string): Locale {
  const languages = acceptLanguage
    .split(',')
    .map((entry) => entry.trim().split(';')[0]?.toLowerCase() ?? '')

  for (const lang of languages) {
    if (lang.startsWith('pt')) return 'pt'
    if (lang.startsWith('en')) return 'en'
  }

  return 'pt'
}

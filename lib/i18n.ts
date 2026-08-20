import { headers } from 'next/headers'
import { dictionaries, type Locale } from '@/lib/i18n/dictionaries'
import { detectLocaleFromAcceptLanguage } from '@/lib/i18n/detect-locale'

export type { Locale, Dictionary } from '@/lib/i18n/dictionaries'
export { detectLocaleFromAcceptLanguage }

export async function getLocale(): Promise<Locale> {
  const headerList = await headers()
  const headerLocale = headerList.get('x-locale')
  if (headerLocale === 'pt' || headerLocale === 'en') return headerLocale

  return detectLocaleFromAcceptLanguage(headerList.get('accept-language') ?? '')
}

export async function getDictionary() {
  const locale = await getLocale()
  return { locale, dict: dictionaries[locale] }
}

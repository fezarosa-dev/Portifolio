import { cookies, headers } from 'next/headers'
import { dictionaries, type Locale } from '@/lib/i18n/dictionaries'
import { detectLocaleFromAcceptLanguage } from '@/lib/i18n/detect-locale'

export type { Locale, Dictionary } from '@/lib/i18n/dictionaries'
export { detectLocaleFromAcceptLanguage }

export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies()
  const cookieLocale = cookieStore.get('locale')?.value
  if (cookieLocale === 'pt' || cookieLocale === 'en') return cookieLocale

  const headerList = await headers()
  return detectLocaleFromAcceptLanguage(headerList.get('accept-language') ?? '')
}

export async function getDictionary() {
  const locale = await getLocale()
  return { locale, dict: dictionaries[locale] }
}

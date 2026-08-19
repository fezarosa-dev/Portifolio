'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import type { Locale } from '@/lib/i18n/dictionaries'

export async function setLocale(locale: Locale) {
  const cookieStore = await cookies()
  cookieStore.set('locale', locale, { path: '/', maxAge: 60 * 60 * 24 * 365 })
  revalidatePath('/', 'layout')
}

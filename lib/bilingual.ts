import type { Locale } from '@/lib/i18n/dictionaries'

/**
 * pt é sempre o texto base. en é null quando ainda não foi traduzido (cai pro pt),
 * ou string (inclusive '') quando foi definido explicitamente — nesse caso vale como está,
 * mesmo vazia (ex: admin marcou "sem tradução" de propósito).
 */
export function resolveText(pt: string, en: string | null | undefined, locale: Locale): string {
  if (locale !== 'en') return pt
  return en ?? pt
}

/**
 * Lê o valor de um BilingualField (name/_en/_en_blank) de um FormData de admin.
 * Texto preenchido -> usa ele. Vazio + checkbox "sem tradução" -> string vazia
 * (mostra em branco de propósito). Vazio sem o checkbox -> null (cai pro pt).
 */
export function parseBilingualField(formData: FormData, name: string): string | null {
  const enValue = String(formData.get(`${name}_en`) ?? '').trim()
  if (enValue) return enValue
  return formData.get(`${name}_en_blank`) === 'true' ? '' : null
}

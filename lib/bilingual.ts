import type { Locale } from '@/lib/i18n/dictionaries'

/**
 * Fallback nos dois sentidos: se o idioma da vez estiver vazio, usa o outro
 * (dá pra escrever só em en e deixar pt em branco, ou vice-versa).
 *
 * en é null quando ainda não foi decidido -> cai pro pt normalmente.
 * en é string (inclusive '') quando foi definido explicitamente no admin —
 * nesse caso vale como está, mesmo vazia (checkbox "sem tradução").
 */
export function resolveText(pt: string, en: string | null | undefined, locale: Locale): string {
  if (locale === 'en') {
    if (en !== null && en !== undefined) return en
    return pt
  }
  return pt || (en ?? '')
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

'use server'

import { revalidatePath } from 'next/cache'
import { upsertSiteContent, deleteSiteContentKey } from '@/lib/supabase/admin-queries'
import { parseBilingualField } from '@/lib/bilingual'

const KEYS = [
  'site_icon',
  'hero_title',
  'hero_subtitle',
  'sobre_texto',
  'sobre_foto',
  'servicos_texto',
  'contato_email',
  'contato_telefone',
  'drive_folder_url',
  'status_text',
  'status_color',
  'link_github',
  'link_linkedin',
] as const

const BILINGUAL_KEYS = ['hero_title', 'hero_subtitle', 'sobre_texto', 'servicos_texto', 'status_text'] as const

export async function saveSiteContent(formData: FormData) {
  await Promise.all([
    ...KEYS.map((key) => upsertSiteContent(key, String(formData.get(key) ?? ''))),
    ...BILINGUAL_KEYS.map(async (key) => {
      const enValue = parseBilingualField(formData, key)
      if (enValue === null) await deleteSiteContentKey(`${key}_en`)
      else await upsertSiteContent(`${key}_en`, enValue)
    }),
  ])
  revalidatePath('/admin/personalizacao')
  revalidatePath('/', 'layout')
}

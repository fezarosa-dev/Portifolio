'use server'

import { revalidatePath } from 'next/cache'
import { upsertSiteContent } from '@/lib/supabase/admin-queries'

const KEYS = [
  'hero_title',
  'hero_subtitle',
  'sobre_texto',
  'sobre_foto',
  'servicos_texto',
  'contato_email',
  'contato_telefone',
  'drive_folder_url',
] as const

export async function saveSiteContent(formData: FormData) {
  await Promise.all(
    KEYS.map((key) => upsertSiteContent(key, String(formData.get(key) ?? '')))
  )
  revalidatePath('/admin/personalizacao')
  revalidatePath('/', 'layout')
}

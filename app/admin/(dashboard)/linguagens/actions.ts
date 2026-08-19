'use server'

import { revalidatePath } from 'next/cache'
import { addLanguage, deleteLanguage } from '@/lib/supabase/admin-queries'

export async function saveLanguage(formData: FormData) {
  const name = String(formData.get('name') ?? '').trim()
  if (!name) return

  await addLanguage(name)
  revalidatePath('/admin/linguagens')
  revalidatePath('/')
}

export async function removeLanguage(id: string) {
  await deleteLanguage(id)
  revalidatePath('/admin/linguagens')
  revalidatePath('/')
}

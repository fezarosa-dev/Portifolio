'use server'

import { revalidatePath } from 'next/cache'
import {
  addLanguage,
  deleteLanguage,
  updateLanguage,
  setLanguagesOrder,
} from '@/lib/supabase/admin-queries'

export async function saveLanguage(formData: FormData) {
  const name = String(formData.get('name') ?? '').trim()
  if (!name) return

  await addLanguage(name)
  revalidatePath('/admin/tecnologias')
  revalidatePath('/')
}

export async function editLanguage(id: string, formData: FormData) {
  const name = String(formData.get('name') ?? '').trim()
  if (!name) return

  await updateLanguage(id, name)
  revalidatePath('/admin/tecnologias')
  revalidatePath('/')
}

export async function removeLanguage(id: string) {
  await deleteLanguage(id)
  revalidatePath('/admin/tecnologias')
  revalidatePath('/')
}

export async function saveLanguagesOrder(orderedIds: string[]) {
  await setLanguagesOrder(orderedIds)
  revalidatePath('/admin/tecnologias')
  revalidatePath('/')
}

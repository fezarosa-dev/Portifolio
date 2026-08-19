'use server'

import { revalidatePath } from 'next/cache'
import {
  addLanguage,
  deleteLanguage,
  updateLanguage,
  reorderLanguage,
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

export async function moveLanguage(id: string, direction: 'up' | 'down') {
  await reorderLanguage(id, direction)
  revalidatePath('/admin/tecnologias')
  revalidatePath('/')
}

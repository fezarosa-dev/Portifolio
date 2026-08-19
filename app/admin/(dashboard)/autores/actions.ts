'use server'

import { revalidatePath } from 'next/cache'
import { addAuthor, deleteAuthor, updateAuthor } from '@/lib/supabase/admin-queries'

export async function saveAuthor(formData: FormData) {
  const name = String(formData.get('name') ?? '').trim()
  if (!name) return

  await addAuthor(name)
  revalidatePath('/admin/autores')
  revalidatePath('/projetos')
}

export async function editAuthor(id: string, formData: FormData) {
  const name = String(formData.get('name') ?? '').trim()
  if (!name) return

  await updateAuthor(id, name)
  revalidatePath('/admin/autores')
  revalidatePath('/projetos')
}

export async function removeAuthor(id: string) {
  await deleteAuthor(id)
  revalidatePath('/admin/autores')
  revalidatePath('/projetos')
}

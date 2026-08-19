'use server'

import { revalidatePath } from 'next/cache'
import {
  upsertResume,
  addResumeLink,
  updateResumeLink,
  deleteResumeLink,
  setResumeLinksOrder,
} from '@/lib/supabase/admin-queries'

export async function saveResume(formData: FormData) {
  await upsertResume(String(formData.get('content_md') ?? ''))
  revalidatePath('/admin/curriculo')
  revalidatePath('/curriculo')
}

export async function saveResumeLink(formData: FormData) {
  const label = String(formData.get('label') ?? '').trim()
  const url = String(formData.get('url') ?? '').trim()
  if (!label || !url) return

  await addResumeLink(label, url)
  revalidatePath('/admin/curriculo')
  revalidatePath('/curriculo')
}

export async function editResumeLink(id: string, formData: FormData) {
  const label = String(formData.get('label') ?? '').trim()
  const url = String(formData.get('url') ?? '').trim()
  if (!label || !url) return

  await updateResumeLink(id, label, url)
  revalidatePath('/admin/curriculo')
  revalidatePath('/curriculo')
}

export async function removeResumeLink(id: string) {
  await deleteResumeLink(id)
  revalidatePath('/admin/curriculo')
  revalidatePath('/curriculo')
}

export async function saveResumeLinksOrder(orderedIds: string[]) {
  await setResumeLinksOrder(orderedIds)
  revalidatePath('/admin/curriculo')
  revalidatePath('/curriculo')
}

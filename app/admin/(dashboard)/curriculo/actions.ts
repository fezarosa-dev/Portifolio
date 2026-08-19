'use server'

import { revalidatePath } from 'next/cache'
import { upsertResume } from '@/lib/supabase/admin-queries'

export async function saveResume(formData: FormData) {
  await upsertResume(String(formData.get('content_md') ?? ''))
  revalidatePath('/admin/curriculo')
  revalidatePath('/curriculo')
}

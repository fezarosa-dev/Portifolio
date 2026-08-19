'use server'

import { revalidatePath } from 'next/cache'
import { markMessageRead, deleteMessage } from '@/lib/supabase/admin-queries'

export async function toggleRead(id: string, read: boolean) {
  await markMessageRead(id, read)
  revalidatePath('/admin/mensagens')
}

export async function removeMessage(id: string) {
  await deleteMessage(id)
  revalidatePath('/admin/mensagens')
}

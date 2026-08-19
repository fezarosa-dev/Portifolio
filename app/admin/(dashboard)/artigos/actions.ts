'use server'

import { revalidatePath } from 'next/cache'
import {
  upsertArticle,
  deleteArticle,
  setArticleVisibility,
  upsertSiteContent,
} from '@/lib/supabase/admin-queries'

export async function saveArticle(formData: FormData) {
  const id = formData.get('id')
  await upsertArticle({
    id: id ? String(id) : undefined,
    title: String(formData.get('title')),
    summary: String(formData.get('summary') ?? ''),
    content_md: String(formData.get('content_md') ?? ''),
    position: Number(formData.get('position') ?? 0),
    visible: formData.get('visible') === 'true',
  })
  revalidatePath('/admin/artigos')
  revalidatePath('/artigos')
}

export async function removeArticle(id: string) {
  await deleteArticle(id)
  revalidatePath('/admin/artigos')
  revalidatePath('/artigos')
}

export async function toggleArticleVisibility(id: string, visible: boolean) {
  await setArticleVisibility(id, visible)
  revalidatePath('/admin/artigos')
  revalidatePath('/artigos')
}

export async function toggleArtigosAtivo(ativo: boolean) {
  await upsertSiteContent('artigos_ativo', ativo ? 'true' : 'false')
  revalidatePath('/admin/artigos')
  revalidatePath('/', 'layout')
}

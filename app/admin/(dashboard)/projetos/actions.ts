'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import {
  upsertProject,
  deleteProject,
  setProjectVisibility,
  setProjectLanguages,
  setProjectAuthors,
} from '@/lib/supabase/admin-queries'

export async function saveProject(formData: FormData) {
  const id = formData.get('id')
  const project = await upsertProject({
    id: id ? String(id) : undefined,
    title: String(formData.get('title')),
    summary: String(formData.get('summary') ?? ''),
    content_md: String(formData.get('content_md') ?? ''),
    repo_url: String(formData.get('repo_url') ?? '') || null,
    site_url: String(formData.get('site_url') ?? '') || null,
    click_mode: formData.get('click_mode') === 'link' ? 'link' : 'detail',
    click_url: String(formData.get('click_url') ?? '') || null,
    position: Number(formData.get('position') ?? 0),
    visible: formData.get('visible') === 'true',
  })
  await setProjectLanguages(project.id, formData.getAll('language_ids').map(String))
  await setProjectAuthors(project.id, formData.getAll('author_ids').map(String))
  revalidatePath('/admin/projetos')
  revalidatePath('/projetos')
  redirect('/admin/projetos')
}

export async function removeProject(id: string) {
  await deleteProject(id)
  revalidatePath('/admin/projetos')
  revalidatePath('/projetos')
}

export async function toggleVisibility(id: string, visible: boolean) {
  await setProjectVisibility(id, visible)
  revalidatePath('/admin/projetos')
  revalidatePath('/projetos')
}

import { createClient } from '@/lib/supabase/server'
import type { Project, Language, ProjectRow } from '@/lib/supabase/queries'
import { PROJECT_SELECT, mapProjectRow } from '@/lib/supabase/queries'
import { findDeviconIcon } from '@/lib/devicon'

export async function addLanguage(name: string): Promise<Language> {
  const icon = findDeviconIcon(name)
  const supabase = await createClient()

  const { count } = await supabase
    .from('languages')
    .select('*', { count: 'exact', head: true })

  const { data, error } = await supabase
    .from('languages')
    .insert({
      name: name.trim(),
      devicon_slug: icon?.slug ?? null,
      devicon_variant: icon?.variant ?? null,
      position: count ?? 0,
    })
    .select()
    .single()
  if (error) throw error
  return data as Language
}

export async function reorderLanguage(id: string, direction: 'up' | 'down'): Promise<void> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('languages')
    .select('id, position')
    .order('position', { ascending: true })
    .order('created_at', { ascending: true })
  if (error) throw error

  const index = data.findIndex((row) => row.id === id)
  const swapIndex = direction === 'up' ? index - 1 : index + 1
  if (index === -1 || swapIndex < 0 || swapIndex >= data.length) return

  const current = data[index]
  const swap = data[swapIndex]

  const [res1, res2] = await Promise.all([
    supabase.from('languages').update({ position: swap.position }).eq('id', current.id),
    supabase.from('languages').update({ position: current.position }).eq('id', swap.id),
  ])
  if (res1.error) throw res1.error
  if (res2.error) throw res2.error
}

export async function deleteLanguage(id: string): Promise<void> {
  const supabase = await createClient()
  const { error } = await supabase.from('languages').delete().eq('id', id)
  if (error) throw error
}

export async function updateLanguage(id: string, name: string): Promise<Language> {
  const icon = findDeviconIcon(name)
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('languages')
    .update({
      name: name.trim(),
      devicon_slug: icon?.slug ?? null,
      devicon_variant: icon?.variant ?? null,
    })
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data as Language
}

export async function getAllProjects(): Promise<Project[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('projects')
    .select(PROJECT_SELECT)
    .order('position', { ascending: true })
  if (error) throw error
  return (data as unknown as ProjectRow[]).map(mapProjectRow)
}

export async function upsertProject(
  input: Partial<Omit<Project, 'languages'>> & { id?: string }
): Promise<Omit<Project, 'languages'>> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('projects')
    .upsert(input)
    .select()
    .single()
  if (error) throw error
  return data as Omit<Project, 'languages'>
}

export async function setProjectLanguages(projectId: string, languageIds: string[]): Promise<void> {
  const supabase = await createClient()
  const del = await supabase.from('project_languages').delete().eq('project_id', projectId)
  if (del.error) throw del.error
  if (languageIds.length === 0) return

  const rows = languageIds.map((language_id) => ({ project_id: projectId, language_id }))
  const { error } = await supabase.from('project_languages').insert(rows)
  if (error) throw error
}

export async function deleteProject(id: string): Promise<void> {
  const supabase = await createClient()
  const { error } = await supabase.from('projects').delete().eq('id', id)
  if (error) throw error
}

export async function setProjectVisibility(id: string, visible: boolean): Promise<void> {
  const supabase = await createClient()
  const { error } = await supabase.from('projects').update({ visible }).eq('id', id)
  if (error) throw error
}

export async function upsertSiteContent(key: string, value: string): Promise<void> {
  const supabase = await createClient()
  const { error } = await supabase.from('site_content').upsert({ key, value })
  if (error) throw error
}

export async function upsertResume(content_md: string): Promise<void> {
  const supabase = await createClient()
  const { error } = await supabase
    .from('resume')
    .update({ content_md, updated_at: new Date().toISOString() })
    .eq('id', '00000000-0000-0000-0000-000000000001')
  if (error) throw error
}

export async function listMessages() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function markMessageRead(id: string, read: boolean): Promise<void> {
  const supabase = await createClient()
  const { error } = await supabase.from('messages').update({ read }).eq('id', id)
  if (error) throw error
}

export async function deleteMessage(id: string): Promise<void> {
  const supabase = await createClient()
  const { error } = await supabase.from('messages').delete().eq('id', id)
  if (error) throw error
}

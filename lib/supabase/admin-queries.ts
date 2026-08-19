import { createClient } from '@/lib/supabase/server'
import type { Project, Language, Author, ProjectRow, ResumeLink } from '@/lib/supabase/queries'
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

export async function setLanguagesOrder(orderedIds: string[]): Promise<void> {
  const supabase = await createClient()
  const results = await Promise.all(
    orderedIds.map((id, position) =>
      supabase.from('languages').update({ position }).eq('id', id)
    )
  )
  for (const result of results) {
    if (result.error) throw result.error
  }
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
  input: Partial<Omit<Project, 'languages' | 'authors'>> & { id?: string }
): Promise<Omit<Project, 'languages' | 'authors'>> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('projects')
    .upsert(input)
    .select()
    .single()
  if (error) throw error
  return data as Omit<Project, 'languages' | 'authors'>
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

export async function setProjectAuthors(projectId: string, authorIds: string[]): Promise<void> {
  const supabase = await createClient()
  const del = await supabase.from('project_authors').delete().eq('project_id', projectId)
  if (del.error) throw del.error
  if (authorIds.length === 0) return

  const rows = authorIds.map((author_id) => ({ project_id: projectId, author_id }))
  const { error } = await supabase.from('project_authors').insert(rows)
  if (error) throw error
}

export async function addAuthor(name: string): Promise<Author> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('authors')
    .insert({ name: name.trim() })
    .select()
    .single()
  if (error) throw error
  return data as Author
}

export async function updateAuthor(id: string, name: string): Promise<Author> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('authors')
    .update({ name: name.trim() })
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data as Author
}

export async function deleteAuthor(id: string): Promise<void> {
  const supabase = await createClient()
  const { error } = await supabase.from('authors').delete().eq('id', id)
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

export async function addResumeLink(label: string, url: string): Promise<ResumeLink> {
  const supabase = await createClient()

  const { count } = await supabase
    .from('resume_links')
    .select('*', { count: 'exact', head: true })

  const { data, error } = await supabase
    .from('resume_links')
    .insert({ label: label.trim(), url: url.trim(), position: count ?? 0 })
    .select()
    .single()
  if (error) throw error
  return data as ResumeLink
}

export async function updateResumeLink(id: string, label: string, url: string): Promise<ResumeLink> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('resume_links')
    .update({ label: label.trim(), url: url.trim() })
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data as ResumeLink
}

export async function deleteResumeLink(id: string): Promise<void> {
  const supabase = await createClient()
  const { error } = await supabase.from('resume_links').delete().eq('id', id)
  if (error) throw error
}

export async function setResumeLinksOrder(orderedIds: string[]): Promise<void> {
  const supabase = await createClient()
  const results = await Promise.all(
    orderedIds.map((id, position) =>
      supabase.from('resume_links').update({ position }).eq('id', id)
    )
  )
  for (const result of results) {
    if (result.error) throw result.error
  }
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

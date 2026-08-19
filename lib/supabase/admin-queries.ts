import { createClient } from '@/lib/supabase/server'
import type { Project } from '@/lib/supabase/queries'

export async function getAllProjects(): Promise<Project[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('position', { ascending: true })
  if (error) throw error
  return data as Project[]
}

export async function upsertProject(
  input: Partial<Project> & { id?: string }
): Promise<Project> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('projects')
    .upsert(input)
    .select()
    .single()
  if (error) throw error
  return data as Project
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

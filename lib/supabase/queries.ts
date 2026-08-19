import { createClient } from '@/lib/supabase/server'

export type Project = {
  id: string
  title: string
  summary: string
  content_md: string
  repo_url: string | null
  site_url: string | null
  click_mode: 'detail' | 'link'
  click_url: string | null
  visible: boolean
  position: number
}

export type Language = {
  id: string
  name: string
  devicon_slug: string | null
  devicon_variant: string | null
  position: number
}

export async function getLanguages(): Promise<Language[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('languages')
    .select('*')
    .order('position', { ascending: true })
    .order('created_at', { ascending: true })

  if (error) throw error
  return data as Language[]
}

export async function getVisibleProjects(): Promise<Project[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('visible', true)
    .order('position', { ascending: true })

  if (error) throw error
  return data as Project[]
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export async function getProjectById(id: string): Promise<Project | null> {
  if (!UUID_RE.test(id)) return null

  const supabase = await createClient()
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .eq('visible', true)
    .maybeSingle()

  if (error) throw error
  return data as Project | null
}

export async function getSiteContent(): Promise<Record<string, string>> {
  const supabase = await createClient()
  const { data, error } = await supabase.from('site_content').select('key, value')
  if (error) throw error
  return Object.fromEntries(data.map((row) => [row.key, row.value]))
}

export async function getResume(): Promise<string> {
  const supabase = await createClient()
  const { data, error } = await supabase.from('resume').select('content_md').limit(1).maybeSingle()
  if (error) throw error
  return data?.content_md ?? ''
}

export async function insertMessage(input: {
  name: string
  email: string
  message: string
}): Promise<void> {
  const supabase = await createClient()
  const { error } = await supabase.from('messages').insert(input)
  if (error) throw error

}

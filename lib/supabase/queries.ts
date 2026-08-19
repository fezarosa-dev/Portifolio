import { createClient } from '@/lib/supabase/server'

export type Language = {
  id: string
  name: string
  devicon_slug: string | null
  devicon_variant: string | null
  position: number
}

export type Author = {
  id: string
  name: string
}

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
  show_on_home: boolean
  position: number
  created_at: string
  languages: Language[]
  authors: Author[]
}

export const PROJECT_SELECT =
  '*, project_languages(languages(*)), project_authors(authors(*))'

export type ProjectRow = Omit<Project, 'languages' | 'authors'> & {
  project_languages: { languages: Language }[]
  project_authors: { authors: Author }[]
}

export function mapProjectRow(row: ProjectRow): Project {
  const { project_languages, project_authors, ...rest } = row
  return {
    ...rest,
    languages: project_languages.map((pl) => pl.languages),
    authors: project_authors.map((pa) => pa.authors),
  }
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

export async function getAuthors(): Promise<Author[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('authors')
    .select('*')
    .order('created_at', { ascending: true })

  if (error) throw error
  return data as Author[]
}

export async function getVisibleProjects(): Promise<Project[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('projects')
    .select(PROJECT_SELECT)
    .eq('visible', true)
    .order('position', { ascending: true })

  if (error) throw error
  return (data as unknown as ProjectRow[]).map(mapProjectRow)
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export async function getProjectById(id: string): Promise<Project | null> {
  if (!UUID_RE.test(id)) return null

  const supabase = await createClient()
  const { data, error } = await supabase
    .from('projects')
    .select(PROJECT_SELECT)
    .eq('id', id)
    .eq('visible', true)
    .maybeSingle()

  if (error) throw error
  return data ? mapProjectRow(data as unknown as ProjectRow) : null
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

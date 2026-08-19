'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { deviconIconUrl } from '@/lib/devicon'
import type { Project, Language, Author } from '@/lib/supabase/queries'

export function ProjectForm({
  project,
  availableLanguages,
  availableAuthors,
  action,
}: {
  project: Project | null
  availableLanguages: Language[]
  availableAuthors: Author[]
  action: (formData: FormData) => Promise<void>
}) {
  const [clickMode, setClickMode] = useState<'detail' | 'link'>(project?.click_mode ?? 'detail')
  const [visible, setVisible] = useState(project?.visible ?? true)
  const selectedLanguageIds = new Set(project?.languages.map((l) => l.id) ?? [])
  const selectedAuthorIds = new Set(project?.authors.map((a) => a.id) ?? [])

  return (
    <form action={action} className="flex flex-col gap-4">
      {project && <input type="hidden" name="id" value={project.id} />}

      <div>
        <Label htmlFor="title">Título</Label>
        <Input id="title" name="title" defaultValue={project?.title} required />
      </div>

      <div>
        <Label htmlFor="summary">Resumo</Label>
        <Textarea id="summary" name="summary" defaultValue={project?.summary} rows={2} />
      </div>

      <div>
        <Label htmlFor="content_md">Conteúdo (Markdown)</Label>
        <Textarea id="content_md" name="content_md" defaultValue={project?.content_md} rows={12} />
      </div>

      <div>
        <Label>Tecnologias</Label>
        {availableLanguages.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Nenhuma cadastrada ainda — adicione em Tecnologias.
          </p>
        ) : (
          <div className="flex flex-wrap gap-3 rounded-md border p-3">
            {availableLanguages.map((lang) => (
              <label key={lang.id} className="flex items-center gap-1.5 text-sm">
                <input
                  type="checkbox"
                  name="language_ids"
                  value={lang.id}
                  defaultChecked={selectedLanguageIds.has(lang.id)}
                />
                {lang.devicon_slug && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={deviconIconUrl(lang.devicon_slug, lang.devicon_variant ?? 'plain')}
                    alt=""
                    className="h-4 w-4"
                  />
                )}
                {lang.name}
              </label>
            ))}
          </div>
        )}
      </div>

      <div>
        <Label>Autores</Label>
        {availableAuthors.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Nenhum cadastrado ainda — adicione em Autores.
          </p>
        ) : (
          <div className="flex flex-wrap gap-3 rounded-md border p-3">
            {availableAuthors.map((author) => (
              <label key={author.id} className="flex items-center gap-1.5 text-sm">
                <input
                  type="checkbox"
                  name="author_ids"
                  value={author.id}
                  defaultChecked={selectedAuthorIds.has(author.id)}
                />
                {author.name}
              </label>
            ))}
          </div>
        )}
      </div>

      <div>
        <Label htmlFor="repo_url">Link do repositório</Label>
        <Input id="repo_url" name="repo_url" defaultValue={project?.repo_url ?? ''} />
      </div>

      <div>
        <Label htmlFor="site_url">Link do site</Label>
        <Input id="site_url" name="site_url" defaultValue={project?.site_url ?? ''} />
      </div>

      <div>
        <Label htmlFor="click_mode">Ao clicar, abrir</Label>
        <select
          id="click_mode"
          name="click_mode"
          value={clickMode}
          onChange={(e) => setClickMode(e.target.value as 'detail' | 'link')}
          className="w-full rounded border p-2"
        >
          <option value="detail">Página do projeto (Markdown)</option>
          <option value="link">Link externo</option>
        </select>
      </div>

      {clickMode === 'link' && (
        <div>
          <Label htmlFor="click_url">Link de destino</Label>
          <Input id="click_url" name="click_url" defaultValue={project?.click_url ?? ''} required />
        </div>
      )}

      <div>
        <Label htmlFor="position">Ordem</Label>
        <Input id="position" name="position" type="number" defaultValue={project?.position ?? 0} />
      </div>

      <div className="flex items-center gap-2">
        <Switch id="visible" checked={visible} onCheckedChange={setVisible} />
        <input type="hidden" name="visible" value={visible ? 'true' : 'false'} />
        <Label htmlFor="visible">Visível no site</Label>
      </div>

      <Button type="submit">Salvar</Button>
    </form>
  )
}

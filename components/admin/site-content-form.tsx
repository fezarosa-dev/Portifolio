'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { DriveImagePicker } from '@/components/drive-image-picker'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-lg border border-hairline bg-card p-6">
      <h2 className="font-mono text-xs tracking-wide text-signal">// {title}</h2>
      <div className="mt-4 flex flex-col gap-4">{children}</div>
    </section>
  )
}

export function SiteContentForm({
  content,
  action,
}: {
  content: Record<string, string>
  action: (formData: FormData) => Promise<void>
}) {
  const [sobreFoto, setSobreFoto] = useState(content.sobre_foto ?? '')

  async function handleSubmit(formData: FormData) {
    try {
      await action(formData)
      toast.success('Personalização salva')
    } catch {
      toast.error('Não deu pra salvar. Tenta de novo.')
    }
  }

  return (
    <form action={handleSubmit} className="flex max-w-2xl flex-col gap-6">
      <Section title="hero">
        <div>
          <Label htmlFor="hero_title">Título</Label>
          <Input id="hero_title" name="hero_title" defaultValue={content.hero_title} />
        </div>
        <div>
          <Label htmlFor="hero_subtitle">Subtítulo</Label>
          <Input id="hero_subtitle" name="hero_subtitle" defaultValue={content.hero_subtitle} />
        </div>
      </Section>

      <Section title="sobre-mim">
        <div>
          <Label htmlFor="sobre_texto">Texto</Label>
          <Textarea id="sobre_texto" name="sobre_texto" defaultValue={content.sobre_texto} rows={6} />
        </div>
        <div>
          <Label>Foto</Label>
          <input type="hidden" name="sobre_foto" value={sobreFoto} />
          <DriveImagePicker value={sobreFoto} onChange={setSobreFoto} />
        </div>
      </Section>

      <Section title="serviços">
        <div>
          <Label htmlFor="servicos_texto">Texto</Label>
          <Textarea
            id="servicos_texto"
            name="servicos_texto"
            defaultValue={content.servicos_texto}
            rows={6}
          />
        </div>
      </Section>

      <Section title="contato">
        <div>
          <Label htmlFor="contato_email">E-mail</Label>
          <Input id="contato_email" name="contato_email" defaultValue={content.contato_email} />
        </div>
        <div>
          <Label htmlFor="contato_telefone">Telefone</Label>
          <Input
            id="contato_telefone"
            name="contato_telefone"
            defaultValue={content.contato_telefone}
          />
        </div>
      </Section>

      <Section title="redes">
        <div>
          <Label htmlFor="link_github">GitHub</Label>
          <Input id="link_github" name="link_github" defaultValue={content.link_github} />
        </div>
        <div>
          <Label htmlFor="link_linkedin">LinkedIn</Label>
          <Input id="link_linkedin" name="link_linkedin" defaultValue={content.link_linkedin} />
        </div>
      </Section>

      <Section title="status (faixa no topo do site)">
        <div>
          <Label htmlFor="status_text">Texto</Label>
          <Input
            id="status_text"
            name="status_text"
            defaultValue={content.status_text}
            placeholder="disponível para novos projetos — Itajubá, BR"
          />
        </div>
        <div>
          <Label htmlFor="status_color">Cor da bolinha</Label>
          <select
            id="status_color"
            name="status_color"
            defaultValue={content.status_color || 'green'}
            className="w-full rounded-md border bg-background px-3 py-2 text-sm"
          >
            <option value="green">Verde — disponível</option>
            <option value="amber">Âmbar — ocupado</option>
            <option value="red">Vermelho — indisponível</option>
            <option value="gray">Cinza — neutro</option>
          </select>
        </div>
      </Section>

      <Section title="avançado">
        <div>
          <Label htmlFor="drive_folder_url">Drive URL (pasta de imagens do site)</Label>
          <Input
            id="drive_folder_url"
            name="drive_folder_url"
            defaultValue={content.drive_folder_url}
          />
        </div>
      </Section>

      <Button type="submit" className="w-fit">
        Salvar
      </Button>
    </form>
  )
}

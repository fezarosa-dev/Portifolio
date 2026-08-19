import { getSiteContent } from '@/lib/supabase/queries'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { saveSiteContent } from './actions'

export default async function PersonalizacaoPage() {
  const content = await getSiteContent()

  return (
    <form action={saveSiteContent} className="flex max-w-2xl flex-col gap-6">
      <h1 className="text-2xl font-semibold">Personalização</h1>

      <div>
        <Label htmlFor="hero_title">Título do Hero</Label>
        <Input id="hero_title" name="hero_title" defaultValue={content.hero_title} />
      </div>
      <div>
        <Label htmlFor="hero_subtitle">Subtítulo do Hero</Label>
        <Input id="hero_subtitle" name="hero_subtitle" defaultValue={content.hero_subtitle} />
      </div>
      <div>
        <Label htmlFor="sobre_texto">Texto — Sobre mim</Label>
        <Textarea id="sobre_texto" name="sobre_texto" defaultValue={content.sobre_texto} rows={6} />
      </div>
      <div>
        <Label htmlFor="servicos_texto">Texto — Serviços</Label>
        <Textarea id="servicos_texto" name="servicos_texto" defaultValue={content.servicos_texto} rows={6} />
      </div>
      <div>
        <Label htmlFor="contato_email">E-mail de contato</Label>
        <Input id="contato_email" name="contato_email" defaultValue={content.contato_email} />
      </div>
      <div>
        <Label htmlFor="contato_telefone">Telefone de contato</Label>
        <Input id="contato_telefone" name="contato_telefone" defaultValue={content.contato_telefone} />
      </div>
      <div>
        <Label htmlFor="drive_folder_url">Drive URL (pasta de imagens do site)</Label>
        <Input id="drive_folder_url" name="drive_folder_url" defaultValue={content.drive_folder_url} />
      </div>
      <div>
        <Label htmlFor="status_text">Texto da faixa de status (topo do site)</Label>
        <Input
          id="status_text"
          name="status_text"
          defaultValue={content.status_text}
          placeholder="disponível para novos projetos — Itajubá, BR"
        />
      </div>
      <div>
        <Label htmlFor="status_color">Cor da bolinha de status</Label>
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

      <Button type="submit">Salvar</Button>
    </form>
  )
}

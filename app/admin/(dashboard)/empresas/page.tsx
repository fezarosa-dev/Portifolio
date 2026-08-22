import { getCompanies } from '@/lib/supabase/queries'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ToastForm } from '@/components/admin/toast-form'
import { saveCompany, removeCompany, editCompany } from './actions'

export default async function EmpresasPage() {
  const companies = await getCompanies()

  return (
    <div>
      <h1 className="mb-2 text-2xl font-semibold">Empresas</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        Empresas onde você já trabalhou — depois é só selecionar qual delas fez cada projeto na
        aba Projetos. &quot;Freelancer&quot; e &quot;Projeto pessoal&quot; já vêm cadastrados.
        Preencha nome em PT, em EN, ou os dois: se preencher só um lado, esse nome aparece no site
        independente do idioma da página; se preencher os dois, cada idioma mostra o seu.
      </p>

      <ToastForm
        action={saveCompany}
        successMessage="Empresa adicionada"
        className="mb-8 flex max-w-sm flex-wrap gap-2"
      >
        <Input name="name" placeholder="Nome (PT)" />
        <Input name="name_en" placeholder="Nome (EN)" />
        <Input name="url" placeholder="Link (site da empresa...)" />
        <Button type="submit">Adicionar</Button>
      </ToastForm>

      {companies.length === 0 ? (
        <p className="text-sm text-muted-foreground">Nenhuma empresa ainda.</p>
      ) : (
        <ul className="flex max-w-md flex-col gap-2">
          {companies.map((company) => (
            <li key={company.id} className="flex items-center gap-2 rounded-md border px-3 py-2">
              <ToastForm
                action={editCompany.bind(null, company.id)}
                successMessage="Empresa atualizada"
                className="flex flex-1 flex-wrap gap-2"
              >
                <Input name="name" defaultValue={company.name ?? ''} placeholder="Nome (PT)" className="h-8" />
                <Input
                  name="name_en"
                  defaultValue={company.name_en ?? ''}
                  placeholder="Nome (EN)"
                  className="h-8"
                />
                <Input
                  name="url"
                  defaultValue={company.url ?? ''}
                  placeholder="Link (site da empresa...)"
                  className="h-8"
                />
                <Button type="submit" variant="outline" size="sm">
                  Salvar
                </Button>
              </ToastForm>
              <ToastForm action={removeCompany.bind(null, company.id)} successMessage="Empresa removida">
                <button type="submit" className="px-1 text-muted-foreground hover:text-destructive">
                  ×
                </button>
              </ToastForm>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

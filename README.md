# Portfólio — Felipe Zanoni da Rosa

Site pessoal e portfólio, construído com Next.js (App Router) e Supabase. Inclui um painel administrativo em `/admin` para gerenciar projetos, artigos, currículo, mensagens de contato e os textos/imagens do site, sem precisar mexer em código.

## Stack

- [Next.js](https://nextjs.org/) (App Router, TypeScript)
- [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- [Framer Motion](https://www.framer.com/motion/) para animações
- [Supabase](https://supabase.com/) (Postgres + Auth) como backend
- [react-markdown](https://github.com/remarkjs/react-markdown) para o conteúdo em Markdown do site
- Google Drive API (somente leitura) para hospedar as imagens do site

## Rodando localmente

```bash
npm install
npm run dev
```

### Variáveis de ambiente

Crie um `.env.local` na raiz do projeto:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
GOOGLE_DRIVE_API_KEY=
```

### Supabase

1. Crie um projeto em [supabase.com](https://supabase.com) e copie a URL e a chave anônima das configurações.
2. Aplique as migrações em `supabase/migrations/` (em ordem) pelo SQL Editor do projeto.
3. Crie o usuário administrador em **Authentication → Users**.

### Google Drive

1. Crie um projeto no [Google Cloud Console](https://console.cloud.google.com/), ative a **Google Drive API** e gere uma **API Key** restrita a essa API.
2. A pasta do Drive usada para as imagens do site precisa estar com permissão "qualquer pessoa com o link pode visualizar".
3. Configure a URL da pasta pelo painel admin, em Personalização.

### Deploy

O projeto está preparado para deploy na [Vercel](https://vercel.com/): conecte o repositório, configure as três variáveis de ambiente acima e o deploy roda automaticamente a cada push na branch principal.

## Licença

Distribuído sob a licença MIT — veja [LICENSE](./LICENSE).

# Portfólio — Felipe Zanoni da Rosa

[![CI](https://github.com/fezarosa-dev/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/fezarosa-dev/portfolio/actions/workflows/ci.yml)
[![Licença MIT](https://img.shields.io/badge/licença-MIT-blue.svg)](./LICENSE)

Site pessoal e portfólio, construído com Next.js (App Router) e Supabase. Inclui um painel administrativo em `/admin` para gerenciar projetos, artigos, currículo, mensagens de contato e os textos/imagens do site, sem precisar mexer em código.

🔗 [zanoni.dev.br](https://www.zanoni.dev.br)

## Funcionalidades

- Conteúdo bilíngue (PT/EN) em todo o site, com rotas indexáveis separadamente (`/pt`, `/en`) e `hreflang` pro SEO.
- Modo claro/escuro, seguindo o sistema operacional até o visitante escolher explicitamente.
- Preferência de "reduzir animações" (acessibilidade), respeitada por todos os componentes com movimento.
- Painel administrativo (`/admin`) com CRUD de projetos, empresas, tecnologias, artigos, currículo e conteúdo geral do site.
- Exportação dos dados do portfólio em JSON (`/api`).
- Grid de projetos em masonry, com busca por tecnologia, empresa e coautor.

## Stack

- [Next.js](https://nextjs.org/) (App Router, TypeScript)
- [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- [Framer Motion](https://www.framer.com/motion/) para animações
- [Supabase](https://supabase.com/) (Postgres + Auth) como backend
- [react-markdown](https://github.com/remarkjs/react-markdown) para o conteúdo em Markdown do site
- Google Drive API (somente leitura) para hospedar as imagens do site

## Rodando localmente

Requer Node 24+ (veja `.nvmrc`).

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

## Testes e qualidade

```bash
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
npm test           # testes unitários (test runner nativo do Node)
```

O workflow em `.github/workflows/ci.yml` roda essas três checagens e o build de produção em toda PR e a cada push. A branch `main` é protegida: só aceita merge com os checks passando, sem force-push nem deleção.

## Estrutura

```
app/          rotas e páginas (App Router)
components/   componentes React
lib/          lógica pura (ícones, SEO, etc.) — coberta por testes em lib/*.test.ts
supabase/     migrações do banco
```

## Fluxo de trabalho

Desenvolvimento acontece na branch `dev`; mudanças vão pra `main` (produção, com deploy automático na Vercel) via pull request, depois que o CI passa.

### Padrão de commits

Toda mensagem de commit segue `tipo: descrição` (ex: `feat: adiciona busca por empresa nos projetos`). Tipos aceitos: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `build`, `ci`, `revert`.

`npm install` já configura um hook local (`.githooks/commit-msg`) que rejeita commits fora do padrão; o CI faz a mesma checagem em toda PR, então não dá pra burlar com `--no-verify`.

## Deploy

O projeto está preparado para deploy na [Vercel](https://vercel.com/): conecte o repositório, configure as três variáveis de ambiente acima e o deploy roda automaticamente a cada push na branch principal.

## Segurança

Encontrou uma vulnerabilidade? Veja [SECURITY.md](./SECURITY.md) antes de reportar.

## Licença

Distribuído sob a licença MIT — veja [LICENSE](./LICENSE).

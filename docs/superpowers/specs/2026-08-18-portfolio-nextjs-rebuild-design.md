# Reconstrução do Portfólio em Next.js — Design

Data: 2026-08-18
Branch de trabalho: `dev`

## Objetivo

Substituir o site estático atual (HTML/CSS/JS em `portiflio/`) por uma aplicação Next.js responsiva (celular, tablet, desktop, TV), com efeitos de scroll estilo Apple na Home, hospedada na Vercel, com dados em Supabase (Postgres + Auth) e imagens servidas a partir de uma pasta do Google Drive do usuário. O site ganha um dashboard administrativo oculto em `/admin` para gerenciar todo o conteúdo sem precisar editar código.

## Stack

- Next.js (App Router, TypeScript)
- Tailwind CSS
- shadcn/ui para formulários/tabelas do dashboard
- Framer Motion para os efeitos de scroll
- react-markdown + plugin remark customizado (resolve nome de arquivo do Drive em vez de URL)
- Supabase: Postgres (dados) + Auth (login do admin) — **sem** Supabase Storage
- Google Drive API (API key, pasta pública por link) — hospedagem de todas as imagens do site
- Deploy: Vercel

## Rotas

Site público:
- `/` (Home/Hero)
- `/sobre`
- `/servicos`
- `/projetos` (lista)
- `/projetos/[slug]` (página de conteúdo em Markdown do projeto — só existe esse destino quando o projeto está no modo "detail")
- `/contato`
- `/curriculo`

Admin (protegido por middleware checando sessão Supabase; não aparece em nenhum menu do site):
- `/admin/login`
- `/admin/projetos`
- `/admin/mensagens`
- `/admin/personalizacao`
- `/admin/curriculo`
- `/admin/imagens`

## Autenticação

Supabase Auth (e-mail/senha), uma única conta de admin criada manualmente no painel do Supabase — sem cadastro público. Middleware do Next.js valida a sessão em toda rota `/admin/*` e redireciona para `/admin/login` se não autenticado.

## Modelo de dados (Supabase Postgres)

```
projects
  id            uuid pk
  title         text
  summary       text            -- descrição curta usada na listagem
  content_md    text            -- conteúdo completo em Markdown (página /projetos/[slug])
  cover_image   text            -- nome do arquivo na pasta do Drive
  repo_url      text nullable
  site_url      text nullable
  click_mode    text            -- 'detail' | 'link'
  click_url     text nullable   -- usado só quando click_mode = 'link'
  visible       boolean default true
  position      int             -- ordem de exibição
  created_at    timestamptz

site_content
  key    text pk        -- ex: 'hero_title', 'hero_subtitle', 'sobre_texto', 'sobre_foto',
                         --     'servicos_texto', 'contato_email', 'contato_telefone', 'drive_folder_url', ...
  value  text

resume
  id          uuid pk (linha única)
  content_md  text
  updated_at  timestamptz

messages
  id          uuid pk
  name        text
  email       text
  message     text
  read        boolean default false
  created_at  timestamptz
```

RLS:
- `projects` (`visible = true`), `site_content`, `resume`: leitura pública, escrita só autenticado.
- `messages`: inserção pública (formulário de contato), leitura/atualização/exclusão só autenticado.

Não há tabela de imagens — a pasta do Google Drive é a fonte de verdade para nomes e arquivos de imagem.

## Integração com Google Drive (imagens)

- O admin cola o link da pasta compartilhada no campo **"Drive URL"** (aba Personalização), salvo em `site_content.drive_folder_url`. A pasta precisa estar como "qualquer pessoa com o link pode visualizar" (assim como os arquivos dentro dela).
- O ID da pasta é extraído da URL (`/folders/<ID>`).
- Autenticação com a Drive API via **API key** (sem OAuth, sem service account — suficiente para recursos com link público). A key fica só no servidor (`GOOGLE_DRIVE_API_KEY`), nunca exposta ao client.
- Route Handler `GET /api/drive/list` — lista os arquivos de imagem da pasta (`files.list` filtrado por `parents` e `mimeType contains 'image/'`), retornando `{ id, name, thumbnailLink }`. Cacheado por poucos minutos (revalidate) para não estourar cota da API.
- Route Handler `GET /api/drive-image/[fileId]` — faz proxy do arquivo (`files.get` com `alt=media`) e serve como imagem estática com `Cache-Control` longo, evitando depender de links diretos do Drive (que quebram/mudam sem aviso).
- Plugin remark customizado: quando o `src` de uma imagem em Markdown não é uma URL absoluta, trata como nome de arquivo e resolve contra a listagem cacheada da pasta, gerando `/api/drive-image/{id}`.
- Todo campo de foto do dashboard (capa de projeto, fotos de seção em Personalização, imagens dentro de `.md`) usa um **seletor** que busca ao vivo os arquivos da pasta (miniatura + nome) via `/api/drive/list`, em vez de upload ou digitação manual de nome.

## Aba "Imagens" do dashboard

Não é upload — é uma galeria somente-leitura que consome `/api/drive/list` e mostra miniatura + nome de cada arquivo da pasta configurada, servindo de referência para saber qual nome usar nos textos em Markdown.

## Comportamento de clique no projeto

Cada projeto tem `click_mode`:
- `detail` (padrão): o card do projeto linka para `/projetos/[slug]`, que renderiza `content_md`.
- `link`: o card do projeto linka direto para `click_url` (campo de texto livre no formulário do admin, preenchido independente de `repo_url`/`site_url`).

## Personalização

Aba do dashboard que edita `site_content`: textos de Home/Hero, Sobre, Serviços, Contato, além do campo `drive_folder_url`. Cada seção de texto tem, quando aplicável, um seletor de foto (Drive) associado.

## Currículo

Aba dedicada com editor de Markdown ligado à tabela `resume` (linha única), podendo referenciar imagens da pasta do Drive do mesmo jeito que os projetos.

## Mensagens

Formulário de contato público grava em `messages` (via Route Handler, validado no client e no server). Aba do dashboard lista as mensagens, permite marcar como lida.

## Efeitos de scroll

Framer Motion, concentrados na Home (hero, transição para "Sobre mim", destaque de projetos) — fade/parallax de entrada ao rolar, no estilo Apple. Páginas internas e dashboard usam transições simples, sem scroll storytelling.

## Conteúdo inicial (seed)

Textos e imagens do site atual (`sobre.html`, `servicos.html`, etc.) migram como dado inicial: textos viram linhas de `site_content`/`projects`, imagens atuais (`portiflio/image/*`) precisam ser reenviadas manualmente pelo usuário para a pasta do Drive antes do primeiro deploy (não há upload automático de arquivos locais para o Drive nesse projeto).

## Erros e validação

Formulário de contato validado no client e no Route Handler. Toda mutação do dashboard (projetos, personalização, currículo) passa por Route Handlers autenticados — nunca escrita direto do client sem checar sessão. Falha ao buscar a listagem do Drive (pasta não configurada, API key inválida, arquivo não encontrado) deve degradar para um placeholder de imagem, não quebrar a página.

## Testes

Sem framework de teste automatizado dedicado. Verificação manual via navegador (skills `run` / `webapp-testing`) a cada etapa concluída: fluxo de contato, login admin, CRUD de projeto, resolução de imagem por nome vinda do Drive, comportamento `detail` vs `link` no clique do projeto — antes de considerar a etapa pronta (skill `verification-before-completion`).

## Git

Branch `dev` criada a partir de `main`. Commits pequenos e incrementais por etapa concluída (setup do projeto, schema Supabase, integração Drive, site público, dashboard) — autorizados pelo usuário para esta tarefa. Sem push e sem mexer em `main` em nenhum momento.

## Fora de escopo

- Upload de arquivo de imagem pelo dashboard (fica manual, direto na pasta do Drive).
- Múltiplos usuários admin.
- Exportação de currículo em PDF.
- Testes automatizados (unit/e2e).

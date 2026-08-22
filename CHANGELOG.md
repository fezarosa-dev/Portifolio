# Changelog

Formato baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/). Este projeto não segue versionamento semântico formal (é um site com deploy contínuo, não um pacote com releases) — o changelog começa a ser mantido a partir daqui pra frente, sem reconstrução retroativa do histórico completo (esse fica no `git log`).

## [Não lançado]

### Adicionado

- Suíte de testes unitários (`lib/*.test.ts`) e workflow de CI no GitHub Actions (lint, typecheck, testes e build em toda PR/push).
- `SECURITY.md` com política de divulgação de vulnerabilidades.
- Proteção da branch `main`: bloqueio de force-push e deleção, checks de CI obrigatórios antes de merge.
- Arquivos padrão de repositório: `.editorconfig`, `.nvmrc`, `engines` no `package.json`, template de pull request, `dependabot.yml`, `CODE_OF_CONDUCT.md`, `CODEOWNERS`, templates de issue.
- Fluxo de trabalho em duas branches: desenvolvimento em `dev`, produção em `main` via pull request.

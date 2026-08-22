# Política de Segurança

Este é o site pessoal e portfólio de Felipe Zanoni da Rosa. Não é um pacote versionado nem uma biblioteca de terceiros — é uma aplicação Next.js com backend em Supabase, então relatos de segurança se aplicam sempre à versão em produção (branch `main`), não a versões antigas.

## Reportando uma vulnerabilidade

Se você encontrar uma vulnerabilidade de segurança (XSS, exposição de dados, bypass de autenticação no painel `/admin`, falha de RLS no banco, etc.), **não abra uma issue pública no GitHub**. Reporte diretamente por e-mail:

**fezarosa@gmail.com**

Inclua, se possível:

- Descrição do problema e impacto potencial.
- Passos para reproduzir (URL, payload, request).
- Se aplicável, uma sugestão de correção.

Como é um projeto pessoal mantido fora do horário comercial, não há um SLA formal, mas o objetivo é confirmar o recebimento em até 72 horas e corrigir vulnerabilidades reais o quanto antes.

## Escopo

Está dentro do escopo:

- O código deste repositório.
- O site em produção (zanoni.dev.br) e o painel administrativo em `/admin`.
- A API interna do projeto (rotas em `app/api/`).

Fora do escopo:

- Serviços de terceiros usados como infraestrutura (Supabase, Vercel, Google Drive API) — reporte diretamente a eles.
- Ataques de negação de serviço (DoS/DDoS) ou testes de carga.
- Engenharia social contra mim ou qualquer outra pessoa.

## Boas práticas já em uso

- Autenticação do painel admin via Supabase Auth, com Row Level Security (RLS) no banco.
- Cookies de sessão protegidos por `Secure` + `SameSite=Lax`.
- Validação e rate limiting no formulário de contato.
- Segredos (chaves de API, tokens) nunca ficam versionados no repositório — apenas em variáveis de ambiente.

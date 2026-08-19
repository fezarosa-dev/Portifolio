
# Meu portifolio
Esses codigos são referentes ao meu portifolio(https://fezarosa.netlify.app/) No momento ele está:[![Netlify Status](https://api.netlify.com/api/v1/badges/e912ec9a-508d-4dbd-8559-f90585f7b7fc/deploy-status)](https://app.netlify.com/sites/fezarosa-portifolio/deploys)

## Licença

**Licença Proibitiva Personalizad**

Versão 1.0, Data de Vigência: 13 de junho de 2023

Esta licença proíbe expressamente qualquer uso do software e código-fonte associado (doravante referidos como "o Software"). Nenhuma pessoa está autorizada a usar, copiar, modificar, mesclar, publicar, distribuir, sublicenciar e/ou vender cópias do Software, seja para fins comerciais ou não comerciais.

Esta licença proíbe também a modificação, alteração, remoção ou supressão de qualquer parte do Software, bem como a redistribuição ou publicação do Software, seja em formato original ou modificado.

O Software é fornecido "como está", sem garantias de qualquer tipo, expressas ou implícitas, incluindo, mas não se limitando a, garantias de comercialização, adequação a uma finalidade específica e não violação dos direitos de terceiros.

Em nenhuma circunstância, os detentores dos direitos autorais serão responsabilizados por quaisquer danos diretos, indiretos, incidentais, especiais, exemplares ou consequenciais (incluindo, mas não se limitando a, perda de uso, dados ou lucros; ou interrupção de negócios) decorrentes do uso ou incapacidade de uso do Software, mesmo que os detentores dos direitos autorais tenham sido informados sobre a possibilidade de tais danos.

Ao adquirir, acessar ou utilizar o Software, você concorda em cumprir estritamente os termos desta licença e reconhece que qualquer violação constitui uma violação dos direitos autorais dos detentores do Software.

[Seção de Contato]
Detentor dos direitos autorais: Felipe Zanoni da Rosa
Endereço: Salto, SP, Brasil
E-mail de Contato: fezarosa@gmail.com

Este documento é uma tradução da licença original em inglês. Em caso de conflito ou divergência entre a versão em inglês e a versão traduzida, a versão em inglês prevalecerá.

Nota: Esta licença é altamente restritiva e proíbe explicitamente qualquer uso do Software. Recomenda-se que você consulte um advogado para garantir que esta licença atenda às suas necessidades e intenções antes de utilizá-la.
## Autores

- [@Felipe-Zanoni-da-Rosa](https://github.com/Felipe-Zanoni-da-Rosa)


# Meu portifolio
Esses codigos são referentes ao meu portifolio(https://fezarosa.netlify.app/) No momento ele está:
[![Netlify Status](https://api.netlify.com/api/v1/badges/e912ec9a-508d-4dbd-8559-f90585f7b7fc/deploy-status)](https://app.netlify.com/sites/fezarosa-portifolio/deploys)

## Setup e Deploy

### Configuração de Variáveis de Ambiente

O projeto utiliza 3 variáveis de ambiente obrigatórias. Crie um arquivo `.env.local` na raiz do projeto (ou configure na Vercel):

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
GOOGLE_DRIVE_API_KEY=
```

### Supabase

1. **Criar um projeto Supabase**
   - Acesse https://supabase.com e faça login ou crie uma conta
   - Crie um novo projeto
   - Copie a `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` das configurações do projeto

2. **Aplicar as migrações**
   - Acesse o SQL Editor do seu projeto Supabase
   - Execute o arquivo `supabase/migrations/0001_init.sql` para criar as tabelas e políticas RLS

3. **Criar usuário admin**
   - Vá para a aba **Authentication → Users** no painel Supabase
   - Crie um novo usuário com um email válido e defina uma senha

### Google Drive API

1. **Criar credenciais**
   - Acesse https://console.cloud.google.com/
   - Crie um novo projeto (ou use um existente)
   - Ative a **Google Drive API**
   - Vá para **Credentials** → **Create Credentials** → **API Key**
   - Copie a chave gerada

2. **Restringir a chave (segurança)**
   - Na página de credenciais, clique na chave criada
   - Em **API restrictions**, selecione apenas **Google Drive API**
   - Salve as alterações

3. **Configurar a variável**
   - Use a chave gerada como `GOOGLE_DRIVE_API_KEY` no arquivo `.env.local` ou nas variáveis de ambiente da Vercel

### Permissões do Google Drive

- A pasta do Drive que contém os arquivos deve estar configurada como **"Qualquer pessoa com o link pode visualizar"**
- Certifique-se de que todos os arquivos na pasta têm permissões herdadas ou estão configurados com acesso público ao link

### Deploy na Vercel

1. **Conectar repositório**
   - Acesse https://vercel.com/dashboard
   - Clique em **Add New** → **Project**
   - Selecione este repositório

2. **Configurar variáveis de ambiente**
   - Vá para **Project Settings** → **Environment Variables**
   - Adicione as 3 variáveis obrigatórias:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `GOOGLE_DRIVE_API_KEY`
   - Certifique-se de marcar `NEXT_PUBLIC_*` como disponível no navegador

3. **Deploy**
   - O deploy automático acontecerá quando você fizer push para o branch principal
   - Acompanhe os logs de build na aba **Deployments**

# LowBudgetFlix

## Resumo:
O **LowBudgetFlix** é um clone simplificado de plataforma de streaming de vídeos. A aplicação conta com um backend servindo como uma API REST unificada para dois frontends independentes: uma interface Web voltada e um aplicativo Mobile nativo. O sistema conta ainda com um motor de recomendações baseado em preferências e comportamento dos usuários.

## Funcionalidades:

### Autenticação & Segurança:
* Cadastro e login de usuários com validação de credenciais.
* Usuários com diferentes permissões.
* Autenticação via Token (JWT) para proteção e controle de acesso às rotas da API.

### Gestão de Catálogo:
* Cadastro, edição e remoção de filmes e séries categorizados por gênero.
* Cadastro de atores, diretores, e suas participações nos filmes.

### Exibição:
* Reprodutor de vídeo (Player) integrado tanto no frontend Web quanto no Mobile.
* Informações adicionais dos filmes como sinopse, elenco, direção, roteiro, data de lançamento e avaliações.

### Interação:
* Adicionar filmes a "minha lista".
* Avaliar filmes.

### Mecanismos de Busca:
* Busca por título, gênero, elenco, direção e avaliações.

### Sistema de Recomendação:
* Registro automático do histórico de visualização do usuário.
* **Recomendação por Gênero:** Sugestão de novos títulos com base nos gêneros mais assistidos pelo usuário no histórico.
* **Filtragem Colaborativa:** Algoritmo que identifica usuários com gostos semelhantes para recomendar conteúdos assistidos por perfis de padrão parecido.

### Interface:
* Seções de "continuar assistindo", "recomendado para você", "novos títulos" e dos gêneros mais assistidos.
* Seção de "minha lista".

## Executar a API

### Pré-requisitos

* Node.js e npm instalados.
* Um banco PostgreSQL criado e acessível pela máquina onde a API será executada. O usuário da conexão precisa ter permissão para criar tipos e tabelas, pois as migrações preparam o schema.
* O servidor PostgreSQL precisa aceitar conexões SSL/TLS: a API e o comando de migração conectam usando SSL.

### Configuração

No diretório `backend`, crie um arquivo `.env` com as configurações da aplicação:

```env
DATABASE_URL=postgresql://usuario:senha@host:5432/lowbudgetflix
JWT_SECRET=gere-uma-chave-secreta-forte
PORT=3000
```

Substitua `usuario`, `senha` e `host` pelos dados do seu banco. Se a senha tiver caracteres especiais, codifique-os para uso em uma URL. `DATABASE_URL` é obrigatória para as migrações e para acessar dados; o PostgreSQL precisa estar em execução, acessível e aceitar SSL/TLS. A conexão usa SSL, mas atualmente não valida o certificado do servidor.

`JWT_SECRET` é usado para assinar os tokens e é necessário para autenticação. Defina uma chave aleatória e forte. `PORT` é opcional e, se omitido, a API usa a porta `3000`. Não compartilhe nem versione o arquivo `.env`.

### Instalação e inicialização

No terminal, execute:

```bash
git clone https://github.com/CArrudajoaopedro/LowBudgetFlix.git
cd backend
npm install
npm exec tsx -- migrate.ts
npm exec tsx -- src/app.ts
```

O comando de migração prepara as tabelas do banco de dados. Depois de iniciar o servidor, a API estará disponível em `http://localhost:<PORT>` e a documentação interativa do Swagger em `http://localhost:<PORT>/api-docs`.

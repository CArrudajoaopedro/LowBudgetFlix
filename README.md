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

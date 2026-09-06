# Atividade 1 - LowBudgetFlix

**1. Quais tabelas você definiu inicialmente?**

As tabelas definidas para a estrutura inicial do banco de dados foram:
* `users`
* `categories`
* `contents`
* `episodes`
* `audio_tracks`
* `subtitles`
* `watch_history`

---

**2. Você utilizou migrations? Se sim, quantas migrations? Descreva em uma frase o que cada uma faz.**

Sim, foram utilizadas 6 migrations incrementais executadas pelo arquivo `./backend/migrate.cpp`:

* **`001_create_users.sql`:** Cria a tabela `users` para armazenar o cadastro, e-mail e credenciais dos usuários.
* **`002_create_categories.sql`:** Cria a tabela `categories` para a organização dos conteúdos por gêneros.
* **`003_create_contents.sql`:** Cria a tabela `contents` para armazenar os metadados de filmes e séries.
* **`004_create_episodes.sql`:** Cria a tabela `episodes` para gerenciar os vídeos vinculados aos conteúdos.
* **`005_create_media_tracks.sql`:** Cria as tabelas `audio_tracks` e `subtitles` para mapear os arquivos de áudio e legendas associados aos episódios.
* **`006_create_watch_history.sql`:** Cria a tabela `watch_history` para registrar o histórico e progresso de reprodução dos episódios pelos usuários.

---

**3. Qual o caminho do arquivo que gera a seed do seu banco?**

`./backend/seed.sql`

---

**4. Quais os endpoints que você irá implementar inicialmente? Cada endpoint deve ser um método e um path. Explique em um parágrafo por que você resolveu priorizar a implementação desses endpoints.**

* `POST /auth/login`
* `GET /contents`
* `GET /contents/:id`
* `GET /episodes/:id`
* `GET /episodes/:id/play`
* `GET /audio_track/:id/play`
* `GET /subtitles/:id/play`

A priorização desses endpoints foi definida para cobrir o fluxo principal de um MVP de uma plataforma de streaming. O fluxo inicia com a autenticação do usuário (`POST /auth/login`), passa pela descoberta e consulta do catálogo (`GET /contents`), depois para a visualização das informações do filme ou série e opções de episódios disponíveis caso haja mais de uma (`GET /contents/:id`), depois vai para seleção do episódio e visualização das faixas de audio e legendas disponíveis para ele (`GET /episodes/:id`) e culmina na obtenção das URLs de streaming e faixas de mídia para o player de vídeo (`GET /episodes/:id/play`, `GET /audio_track/:id/play`, `GET /subtitles/:id/play`).

---

**5. Você está usando algum framework para escrever os endpoints da sua API? Se sim, qual?**

Sim, o framework **Crow** para C++.
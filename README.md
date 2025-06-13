# Documentação

## Descrição

Backend de plataforma de blogging para docentes da rede pública, desenvolvido com Node.js, Express e PostgreSQL (sem ORM), seguindo arquitetura MVC. Inclui testes automatizados com Jest e Supertest, conteinerização via Docker, CI/CD com GitHub Actions e suporte a deploy automatizado no Render.

## Estrutura de Pastas

```
tech-challenge-fase-2/
├── src/
│   ├── app.js                # Configuração e inicialização do Express
│   ├── server.js             # Inicialização do servidor HTTP
│   ├── config/
│   │   └── database.js       # Conexão e setup do banco PostgreSQL
│   ├── controllers/
│   │   └── postController.js # Funções dos endpoints de postagens
│   ├── models/
│   │   └── Post.js           # Model e queries SQL para postagens
│   └── routes/
│       └── postRoutes.js     # Definição das rotas REST de postagens
├── tests/                    # Testes unitários (Jest + Supertest)
├── .github/workflows         # Pipeline CI/CD (GitHub Actions)
├── Dockerfile                # Build da imagem Docker da API
├── docker-compose.yml        # Orquestração local (API + banco)
├── insomnia_tech_challenge_api.json # Requests para Insomnia
```

## Como Rodar a Aplicação

### 1. Ambiente Local com Docker Compose

- Execute tudo com um só comando:
  ```sh
  docker-compose up --build
  ```
- Isso irá iniciar a API e o banco de dados PostgreSQL automaticamente.
- Para acessar a API: http://localhost:3000
- As variáveis de ambiente já estão configuradas no `docker-compose.yml`.

### 2. Deploy no Render (produção e CI/CD)

- Crie um banco PostgreSQL gerenciado no Render e copie a Internal Database URL.
- Crie um serviço Web no Render configurado para buscar a imagem Docker do GHCR (`ghcr.io/SEU_USUARIO/SEU_REPOSITORIO:latest`).
  - **Importante:** Certifique-se de que a pipeline do GitHub Actions já rodou ao menos uma vez (mesmo sem deploy no Render) para que a imagem seja publicada no GHCR. Só após esse build inicial a imagem estará disponível para o Render puxar.
- No painel do Render, defina as variáveis de ambiente:
  - `DATABASE_URL` (cole a Internal Database URL do banco)
  - `PORT=3000`
- Gere e cadastre o Deploy Hook do Render como segredo `RENDER_DEPLOY_HOOK_URL` no GitHub.
- Ao fazer push na branch principal, a pipeline irá:
  1. Rodar os testes
  2. Buildar e publicar a imagem Docker no GHCR
  3. Acionar o Deploy Hook do Render para atualizar a API
- **Importante:** O banco de dados deve estar ativo antes de subir a API. A aplicação cria as tabelas automaticamente ao iniciar, caso não existam.
- Para detalhes do workflow, consulte o arquivo `.github/workflows/ci.yml`.

---

## Endpoints REST

### Listar todos os posts

- **GET /posts**
- **Resposta:**
  ```json
  [
    {
      "id": 1,
      "titulo": "Primeiro post",
      "conteudo": "Conteúdo do post",
      "autor": "Nome do autor",
      "created_at": "2025-06-11T12:00:00.000Z",
      "updated_at": "2025-06-11T12:00:00.000Z"
    }
  ]
  ```

### Detalhar um post

- **GET /posts/:id**
  - Substitua `:id` pelo ID do post desejado.
- **Resposta:**
  ```json
  {
    "id": 1,
    "titulo": "Primeiro post",
    "conteudo": "Conteúdo do post",
    "autor": "Nome do autor",
    "created_at": "2025-06-11T12:00:00.000Z",
    "updated_at": "2025-06-11T12:00:00.000Z"
  }
  ```

### Criar um post

- **POST /posts**
- **Body (JSON):**
  ```json
  {
    "titulo": "Novo post",
    "conteudo": "Conteúdo do novo post",
    "autor": "Nome do autor"
  }
  ```
- **Resposta:**
  ```json
  {
    "id": 2,
    "titulo": "Novo post",
    "conteudo": "Conteúdo do novo post",
    "autor": "Nome do autor"
  }
  ```

### Editar um post

- **PUT /posts/:id**
  - Substitua `:id` pelo ID do post a ser editado.
- **Body (JSON):**
  ```json
  {
    "titulo": "Título editado",
    "conteudo": "Conteúdo editado",
    "autor": "Novo autor"
  }
  ```
- **Resposta:**
  ```json
  {
    "id": 2,
    "titulo": "Título editado",
    "conteudo": "Conteúdo editado",
    "autor": "Novo autor"
  }
  ```

### Remover um post

- **DELETE /posts/:id**
  - Substitua `:id` pelo ID do post a ser removido.
- **Resposta:**
  - **204 No Content**

### Buscar posts por termo

- **GET /posts/search?q=palavra**
  - Passe o termo de busca no parâmetro `q` da query string.
- **Resposta:**
  ```json
  [
    {
      "id": 1,
      "titulo": "Primeiro post",
      "conteudo": "Conteúdo do post",
      "autor": "Nome do autor"
    }
  ]
  ```

## Testes

- Rode `npm test` localmente para executar todos os testes unitários (com mocks, sem necessidade de banco real).
- Para testar manualmente, importe o arquivo `insomnia_tech_challenge_api.json` no Insomnia para ter todos os endpoints e exemplos prontos para uso. Basta modificar o valor da variável `base_url` para apontar para a URL desejada (por exemplo, `http://localhost:3000` ou a URL de produção).

---

## Relatório de Experiência

O maior desafio foi escolher a stack ideal, diante das inúmeras opções de bibliotecas, frameworks e bancos de dados disponíveis no ecossistema Node.js. A decisão sobre qual banco utilizar também exigiu análise cuidadosa para atender os requisitos do projeto. No mais, a experiência foi proveitosa e o resultado final atendeu plenamente as expectativas.

**Autor:** RM362474

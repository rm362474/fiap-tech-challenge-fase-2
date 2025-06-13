const request = require("supertest");
const app = require("../src/app");

jest.mock("../src/models/Post");
const Post = require("../src/models/Post");

describe("POSTS API", () => {
  afterEach(() => jest.clearAllMocks());

  it("GET /posts deve retornar todos os posts", async () => {
    const mockPosts = [
      { id: 1, titulo: "Teste", conteudo: "Conteúdo", autor: "Autor" },
    ];
    Post.getAll.mockImplementation((cb) => cb(null, mockPosts));
    const res = await request(app).get("/posts");
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockPosts);
  });

  it("GET /posts/:id deve retornar um post", async () => {
    const mockPost = {
      id: 1,
      titulo: "Teste",
      conteudo: "Conteúdo",
      autor: "Autor",
    };
    Post.getById.mockImplementation((id, cb) => cb(null, mockPost));
    const res = await request(app).get("/posts/1");
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockPost);
  });

  it("POST /posts deve criar um post", async () => {
    const newPost = { titulo: "Novo", conteudo: "Conteúdo", autor: "Autor" };
    Post.create.mockImplementation((data, cb) => cb(null, { id: 2, ...data }));
    const res = await request(app).post("/posts").send(newPost);
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject(newPost);
  });

  it("PUT /posts/:id deve atualizar um post", async () => {
    const updated = { titulo: "Atualizado", conteudo: "Novo", autor: "Autor" };
    Post.update.mockImplementation((id, data, cb) => cb(null, { id, ...data }));
    const res = await request(app).put("/posts/1").send(updated);
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject(updated);
  });

  it("PUT /posts/:id deve retornar 404 se o post não existir", async () => {
    const updated = { titulo: "Atualizado", conteudo: "Novo", autor: "Autor" };
    Post.update.mockImplementation((id, data, cb) => cb(null, null));
    const res = await request(app).put("/posts/999").send(updated);
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("error");
  });

  it("DELETE /posts/:id deve deletar um post", async () => {
    Post.delete.mockImplementation((id, cb) => cb(null));
    const res = await request(app).delete("/posts/1");
    expect(res.status).toBe(204);
  });

  it("GET /posts/search?q=Teste deve buscar posts", async () => {
    const mockPosts = [
      { id: 1, titulo: "Teste", conteudo: "Conteúdo", autor: "Autor" },
    ];
    Post.search.mockImplementation((q, cb) => cb(null, mockPosts));
    const res = await request(app).get("/posts/search?q=Teste");
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockPosts);
  });

  it("GET /posts deve retornar erro 500 se o model falhar", async () => {
    Post.getAll.mockImplementation((cb) => cb(new Error("erro")));
    const res = await request(app).get("/posts");
    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty("error");
  });

  it("GET /posts/:id deve retornar erro 500 se o model falhar", async () => {
    Post.getById.mockImplementation((id, cb) => cb(new Error("erro")));
    const res = await request(app).get("/posts/1");
    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty("error");
  });

  it("POST /posts deve retornar erro 500 se o model falhar", async () => {
    const newPost = { titulo: "Novo", conteudo: "Conteúdo", autor: "Autor" };
    Post.create.mockImplementation((data, cb) => cb(new Error("erro")));
    const res = await request(app).post("/posts").send(newPost);
    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty("error");
  });

  it("PUT /posts/:id deve retornar erro 500 se o model falhar", async () => {
    const updated = { titulo: "Atualizado", conteudo: "Novo", autor: "Autor" };
    Post.update.mockImplementation((id, data, cb) => cb(new Error("erro")));
    const res = await request(app).put("/posts/1").send(updated);
    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty("error");
  });

  it("DELETE /posts/:id deve retornar erro 500 se o model falhar", async () => {
    Post.delete.mockImplementation((id, cb) => cb(new Error("erro")));
    const res = await request(app).delete("/posts/1");
    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty("error");
  });

  it("POST /posts deve retornar 400 se faltar campo obrigatório", async () => {
    const res = await request(app).post("/posts").send({ titulo: "Faltando" });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
  });

  it("GET /posts/search deve retornar 400 se faltar termo de busca", async () => {
    const res = await request(app).get("/posts/search");
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
  });
});

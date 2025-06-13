const Post = require("../src/models/Post");

describe("Post Model", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve buscar todos os posts", (done) => {
    const mockPosts = [
      { id: 1, titulo: "Teste", conteudo: "Conteúdo", autor: "Autor" },
    ];
    jest.spyOn(Post, "getAll").mockImplementation((cb) => cb(null, mockPosts));
    Post.getAll((err, posts) => {
      expect(err).toBeNull();
      expect(posts).toEqual(mockPosts);
      done();
    });
  });

  it("deve buscar um post por id", (done) => {
    const mockPost = {
      id: 1,
      titulo: "Teste",
      conteudo: "Conteúdo",
      autor: "Autor",
    };
    jest
      .spyOn(Post, "getById")
      .mockImplementation((id, cb) => cb(null, mockPost));
    Post.getById(1, (err, post) => {
      expect(err).toBeNull();
      expect(post).toEqual(mockPost);
      done();
    });
  });

  it("deve criar um post", (done) => {
    const newPost = { titulo: "Novo", conteudo: "Conteúdo", autor: "Autor" };
    jest
      .spyOn(Post, "create")
      .mockImplementation((data, cb) => cb(null, { id: 2, ...data }));
    Post.create(newPost, (err, post) => {
      expect(err).toBeNull();
      expect(post).toMatchObject(newPost);
      done();
    });
  });

  it("deve atualizar um post", (done) => {
    const updated = { titulo: "Atualizado", conteudo: "Novo", autor: "Autor" };
    jest
      .spyOn(Post, "update")
      .mockImplementation((id, data, cb) => cb(null, { id, ...data }));
    Post.update(1, updated, (err, post) => {
      expect(err).toBeNull();
      expect(post).toMatchObject(updated);
      done();
    });
  });

  it("deve retornar null ao tentar atualizar um post inexistente", (done) => {
    jest
      .spyOn(Post, "update")
      .mockImplementation((id, data, cb) => cb(null, null));
    const updated = { titulo: "Novo", conteudo: "Novo", autor: "Novo" };
    Post.update(999, updated, (err, post) => {
      expect(err).toBeNull();
      expect(post).toBeNull();
      done();
    });
  });

  it("deve deletar um post", (done) => {
    jest.spyOn(Post, "delete").mockImplementation((id, cb) => cb(null));
    Post.delete(1, (err) => {
      expect(err).toBeNull();
      done();
    });
  });
});

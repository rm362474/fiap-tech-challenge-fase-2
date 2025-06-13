const Post = require("../models/Post");

const postController = {
  getAll: (req, res) => {
    Post.getAll((err, posts) => {
      if (err) return res.status(500).json({ error: "Erro ao buscar posts" });
      res.json(posts);
    });
  },

  getById: (req, res) => {
    Post.getById(req.params.id, (err, post) => {
      if (err) return res.status(500).json({ error: "Erro ao buscar post" });
      if (!post) return res.status(404).json({ error: "Post não encontrado" });
      res.json(post);
    });
  },

  create: (req, res) => {
    const { titulo, conteudo, autor } = req.body;
    if (!titulo || !conteudo || !autor) {
      return res
        .status(400)
        .json({ error: "Título, conteúdo e autor são obrigatórios" });
    }
    Post.create({ titulo, conteudo, autor }, (err, post) => {
      if (err) return res.status(500).json({ error: "Erro ao criar post" });
      res.status(201).json(post);
    });
  },

  update: (req, res) => {
    const { titulo, conteudo, autor } = req.body;
    Post.update(req.params.id, { titulo, conteudo, autor }, (err, post) => {
      if (err) return res.status(500).json({ error: "Erro ao atualizar post" });
      if (!post) return res.status(404).json({ error: "Post não encontrado" });
      res.json(post);
    });
  },

  delete: (req, res) => {
    Post.delete(req.params.id, (err) => {
      if (err) return res.status(500).json({ error: "Erro ao deletar post" });
      res.status(204).send();
    });
  },

  search: (req, res) => {
    const { q } = req.query;
    if (!q)
      return res.status(400).json({ error: "Termo de busca não informado" });
    Post.search(q, (err, posts) => {
      if (err) return res.status(500).json({ error: "Erro na busca" });
      res.json(posts);
    });
  },
};

module.exports = postController;

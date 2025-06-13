const pool = require("../config/database");

class Post {
  static getAll(callback) {
    pool.query(
      "SELECT * FROM posts ORDER BY created_at DESC",
      [],
      (err, result) => {
        if (err) return callback(err);
        callback(null, result.rows);
      }
    );
  }

  static getById(id, callback) {
    pool.query("SELECT * FROM posts WHERE id = $1", [id], (err, result) => {
      if (err) return callback(err);
      callback(null, result.rows[0]);
    });
  }

  static create({ titulo, conteudo, autor }, callback) {
    const sql =
      "INSERT INTO posts (titulo, conteudo, autor) VALUES ($1, $2, $3) RETURNING *";
    pool.query(sql, [titulo, conteudo, autor], (err, result) => {
      if (err) return callback(err);
      callback(null, result.rows[0]);
    });
  }

  static update(id, { titulo, conteudo, autor }, callback) {
    const sql = `UPDATE posts SET titulo = $1, conteudo = $2, autor = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING *`;
    pool.query(sql, [titulo, conteudo, autor, id], (err, result) => {
      if (err) return callback(err);
      if (result.rowCount === 0) return callback(null, null);
      callback(null, result.rows[0]);
    });
  }

  static delete(id, callback) {
    pool.query("DELETE FROM posts WHERE id = $1", [id], (err, result) => {
      callback(err);
    });
  }

  static search(term, callback) {
    const sql = `SELECT * FROM posts WHERE titulo ILIKE $1 OR conteudo ILIKE $1 ORDER BY created_at DESC`;
    const likeTerm = `%${term}%`;
    pool.query(sql, [likeTerm], (err, result) => {
      if (err) return callback(err);
      callback(null, result.rows);
    });
  }
}

module.exports = Post;

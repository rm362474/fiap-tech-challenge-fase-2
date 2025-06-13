const dbUrl = process.env.DATABASE_URL;
const isTest = process.env.NODE_ENV === "test";

let pool = null;
if (!isTest) {
  const { Pool } = require("pg");
  pool = new Pool({
    connectionString: dbUrl,
    ssl:
      dbUrl && dbUrl.includes("render.com")
        ? { rejectUnauthorized: false }
        : false,
  });

  const createPostsTable = `
  CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    titulo TEXT NOT NULL,
    conteudo TEXT NOT NULL,
    autor TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
  );
  `;

  (async () => {
    try {
      await pool.query(createPostsTable);
      console.log(
        "Conectado ao banco de dados PostgreSQL e tabela verificada."
      );
    } catch (err) {
      console.error("Erro ao conectar/criar tabela no banco de dados:", err);
    }
  })();
}

module.exports = pool;

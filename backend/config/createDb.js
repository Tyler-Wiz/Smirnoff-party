const { Client } = require("pg");

(async () => {
  const createTablesQueries = `CREATE TABLE IF NOT EXISTS users (
    user_id          SERIAL PRIMARY KEY,
    name             VARCHAR(50) NOT NULL,
    email            VARCHAR(100) UNIQUE NOT NULL,
    instagram        VARCHAR(100) NOT NULL,
    created_at       DATE DEFAULT CURRENT_TIMESTAMP,
    is_admin         BOOLEAN 
    );`;

  try {
    const client = new Client({
      connectionString: process.env.DB_CONNECTION_STRING,
    });

    await client.connect();

    await client.query(createTablesQueries);

    await client.end();
  } catch (error) {
    console.error("Error creating tables:", error);
  }
})();

const Pool = require("pg").Pool;

const pool = new Pool({
  connectionString: process.env.DB_CONNECTION_STRING,
});

const query = (text, params, callback) => {
  return pool.query(text, params, callback);
};

module.exports = { query };

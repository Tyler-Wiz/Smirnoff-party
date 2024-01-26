const db = require("./index");

class UserModel {
  // Create new user
  async create(name, email) {
    try {
      // Generate SQL statement
      const statement = `INSERT INTO users(name,email) VALUES ($1, $2) RETURNING *`;
      const values = [name, email];
      // Send SQL Statement to Database and Await Response
      const result = await db.query(statement, values);
      // Check and return new user added
      if (result.rows?.length) {
        // Return the first row that matches
        return result.rows[0];
      }
      return null;
    } catch (error) {
      throw new Error(error);
    }
  }
  async createAdmin(name, email, is_admin) {
    try {
      // Generate SQL statement
      const statement = `INSERT INTO users(name,email,is_admin) VALUES ($1, $2, $3) RETURNING *`;
      const values = [name, email, is_admin];
      // Send SQL Statement to Database and Await Response
      const result = await db.query(statement, values);
      // Check and return new user added
      if (result.rows?.length) {
        // Return the first row that matches
        return result.rows[0];
      }
      return null;
    } catch (error) {
      throw new Error(error);
    }
  }
  async findOneByEmail(email) {
    try {
      // Generate SQL statement
      const statement = `SELECT * FROM users WHERE email = $1`;
      const values = [email];
      // Await Response from Database
      const result = await db.query(statement, values);
      if (result.rows?.length) {
        // Return the first row that matches
        return result.rows[0];
      }
      return null;
    } catch (err) {
      throw new Error(err);
    }
  }

  async findManyByDay(since) {
    try {
      // Generate SQL statement
      const statement = `SELECT u.name, u.email
                         FROM users u
                         WHERE created_at >= $1
                         `;
      const values = [since];
      // Await Response from Database
      const result = await db.query(statement, values);
      if (result.rows?.length) {
        // Return the first row that matches
        return result.rows;
      }
      return null;
    } catch (err) {
      throw new Error(err);
    }
  }

  async findMany() {
    try {
      // Generate SQL statement
      const statement = `SELECT u.name, u.email
                         FROM users u
                         `;
      const values = [];
      // Await Response from Database
      const result = await db.query(statement, values);
      if (result.rows?.length) {
        // Return the first row that matches
        return result.rows;
      }
      return null;
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = new UserModel();

const pool = require('./db');

const User = {
  async create(username, email, password) {
    try {
      const result = await pool.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *', [username, email, password]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },
  async findByEmail(email) {
    try {
      const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },
  async getUserLinks(userId) {
    try {
      const result = await pool.query('SELECT * FROM links WHERE user_id = $1', [userId]);
      return result.rows;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = User;

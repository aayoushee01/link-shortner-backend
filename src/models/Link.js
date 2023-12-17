const pool = require('./db');

const Link = {
  async create(userId, bigUrl, shortUrl) {
    try {
      const currentTimestamp = new Date();
      const expiryTimestamp = new Date(currentTimestamp.getTime() + (48 * 60 * 60 * 1000));
      const result = await pool.query('INSERT INTO links (user_id, big_url, short_url, expiry_at) VALUES ($1, $2, $3, $4) RETURNING *', [userId, bigUrl, shortUrl, expiryTimestamp]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },
  async findByShortUrl(shortUrl) {
    try {
      const result = await pool.query('SELECT * FROM links WHERE short_url = $1', [shortUrl]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },
  async updateClicks(shortUrl) {
    try {
      await pool.query('UPDATE links SET clicks = clicks + 1 WHERE short_url = $1', [shortUrl]);
    } catch (error) {
      throw error;
    }
  },
  async updateErrorRates(shortUrl) {
    try {
      await pool.query('UPDATE links SET error_rates = error_rates + 1 WHERE short_url = $1', [shortUrl]);
    } catch (error) {
      throw error;
    }
  },
  async  addEventLog(eventType, linkId) {
    const query = 'INSERT INTO event_logs (event_type, link_id) VALUES ($1, $2)';
    const values = [eventType, linkId];
    
    try {
      await pool.query(query, values);
      console.log('Event log added successfully.');
    } catch (error) {
      console.error('Error adding event log:', error);
      throw error;
    }
  }
};

module.exports = Link;

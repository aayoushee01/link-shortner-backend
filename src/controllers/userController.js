const pool = require('../models/db');
const userController = {
  async getUserDeails(req, res) {
    const user = req.user;
    try {
      res.json(user);
    } catch (error) {
      console.error('Error while getting user details', error);
      res.status(500).json({ error: 'Error while getting user details' });
    }
  },
  async getAllUrls(req, res) {
    const user = req.user;

    try {
      const result = await pool.query('SELECT * FROM links WHERE user_id = $1', [user.userId]);

      res.json(result.rows);
    } catch (error) {
      console.error('Error getting all urls:', error);
      res.status(500).json({ error: 'Error getting urls' });
    }
  },
  async getErrorData(req, res) {
    const { linkId, startTime, endTime } = req.query;
    const intervals = calculateIntervals(startTime, endTime, 8);
    try {
      const results = [];
      for (let i = 0; i < intervals.length; i++) {
        const interval = intervals[i];
        const { start, end } = interval;

        const result = await pool.query('SELECT COUNT(*) FROM event_logs WHERE link_id = $1 AND event_type = $2 AND event_timestamp >= $3 AND event_timestamp < $4', [linkId, "error", start, end]);
        
        const hour = `${start}`;
        const error = result.rows[0].count;
        results.push({ hour, error });
      }

      res.json(results);
    } catch (error) {
      console.error('Error getting error data:', error);
      res.status(500).json({ error: 'Error getting error data' });
    }
  },

}
function calculateIntervals(startTime, endTime, parts) {
  const startTimestamp = new Date(startTime).getTime();
  const endTimestamp = new Date(endTime).getTime();
  const interval = (endTimestamp - startTimestamp) / parts;

  const intervals = [];
  let current = startTimestamp;
  for (let i = 0; i < parts; i++) {
    const next = current + interval;
    intervals.push({
      start: new Date(current).toISOString(),
      end: new Date(next).toISOString()
    });
    current = next;
  }
  return intervals;
}
module.exports = userController;
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.ELEPHANTSQL_URL,
  ssl: {
    
  }
});

module.exports = pool;

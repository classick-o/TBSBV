const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// Temporary: includes DB debug info — remove after DB is working
router.get('/', async (req, res) => {
  const config = {
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD_LENGTH: (process.env.DB_PASSWORD || '').length,
    DB_PASSWORD_FIRST3: (process.env.DB_PASSWORD || '').substring(0, 3) + '***',
    DB_NAME: process.env.DB_NAME,
  };

  try {
    const [rows] = await pool.query('SELECT 1 AS connected');
    res.json({ status: 'ok', db: 'connected', config, timestamp: new Date().toISOString() });
  } catch (err) {
    res.json({ status: 'ok', db: 'error', config, error: err.message, timestamp: new Date().toISOString() });
  }
});

module.exports = router;

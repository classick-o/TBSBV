const pool = require('../config/database');

class Lead {
  static async create({ name, email, phone_code, phone, company, message, source, ip_address, user_agent }) {
    const [result] = await pool.execute(
      `INSERT INTO leads (name, email, phone_code, phone, company, message, source, ip_address, user_agent)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, email, phone_code || null, phone || null, company || null, message, source || 'website_contact_form', ip_address || null, user_agent || null]
    );
    return result.insertId;
  }
}

module.exports = Lead;

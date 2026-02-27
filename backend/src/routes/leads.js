const express = require('express');
const router = express.Router();
const validateLead = require('../middleware/validateLead');
const { leadLimiter } = require('../middleware/rateLimiter');
const Lead = require('../models/Lead');
const { sendNewLeadNotification, sendLeadConfirmation } = require('../services/emailService');

router.post('/', leadLimiter, validateLead, async (req, res, next) => {
  try {
    const { name, email, phone_code, phone, company, message } = req.body;

    const leadId = await Lead.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone_code: phone_code || null,
      phone: phone ? phone.trim() : null,
      company: company ? company.trim() : null,
      message: message.trim(),
      source: 'website_contact_form',
      ip_address: req.ip,
      user_agent: req.get('User-Agent'),
    });

    // Send emails (fire-and-forget, won't block response)
    sendNewLeadNotification({ name, email, phone_code, phone, company, message, leadId })
      .catch(err => console.error('Email notification failed:', err.message));
    sendLeadConfirmation({ name, email })
      .catch(err => console.error('Confirmation email failed:', err.message));

    res.status(201).json({
      success: true,
      message: 'Your message has been received. We will contact you within 24 hours.',
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

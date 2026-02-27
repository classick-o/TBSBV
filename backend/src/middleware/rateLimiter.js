const rateLimit = require('express-rate-limit');

const leadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many submissions. Please try again in 15 minutes.',
  },
});

module.exports = { leadLimiter };

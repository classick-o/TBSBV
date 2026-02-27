function validateLead(req, res, next) {
  // Honeypot check — bots fill hidden fields
  if (req.body._honey) {
    return res.status(200).json({ success: true, message: 'Message received.' });
  }

  const errors = [];
  const { name, email, message } = req.body;

  if (!name || typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 200) {
    errors.push({ field: 'name', message: 'Full name is required (2-200 characters).' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.push({ field: 'email', message: 'A valid email address is required.' });
  }

  if (!message || typeof message !== 'string' || message.trim().length < 10 || message.trim().length > 5000) {
    errors.push({ field: 'message', message: 'Message is required (10-5000 characters).' });
  }

  if (req.body.phone && !/^[\d\s\-().+]+$/.test(req.body.phone)) {
    errors.push({ field: 'phone', message: 'Phone number contains invalid characters.' });
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  next();
}

module.exports = validateLead;

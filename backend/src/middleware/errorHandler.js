function errorHandler(err, req, res, next) {
  console.error(`[${new Date().toISOString()}] Error:`, err.message);
  res.status(500).json({
    success: false,
    message: process.env.NODE_ENV === 'production'
      ? 'An internal error occurred. Please try again later.'
      : err.message,
  });
}

module.exports = errorHandler;

const corsOptions = {
  origin: [
    'https://tbsbv.com',
    'https://www.tbsbv.com',
    ...(process.env.NODE_ENV !== 'production'
      ? ['http://localhost:4321', 'http://localhost:3000']
      : []),
  ],
  methods: ['POST', 'GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  maxAge: 86400,
};

module.exports = corsOptions;

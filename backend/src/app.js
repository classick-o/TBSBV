const express = require('express');
const cors = require('cors');
const corsOptions = require('./config/cors');
const leadsRouter = require('./routes/leads');
const healthRouter = require('./routes/health');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.set('trust proxy', 1);

app.use(cors(corsOptions));
app.use(express.json({ limit: '10kb' }));

app.use('/api/leads', leadsRouter);
app.use('/api/health', healthRouter);

app.use(errorHandler);

module.exports = app;

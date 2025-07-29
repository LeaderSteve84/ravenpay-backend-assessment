const express = require('express');
const morgan = require("morgan");
const dotenv = require('dotenv');
dotenv.config();

const authRoutes = require('./routes/auth');
const webhookRoutes = require('./routes/webhook');
const transferRoutes = require('./routes/transfer');
const historyRoutes = require('./routes/history');

const app = express();
app.use(express.json());
app.use(morgan("dev")); // Logs requests in 'dev' format

app.use('/api/auth', authRoutes); // Mount auth routes
app.use('/api/webhook', webhookRoutes); // Mount webhook route
app.use('/api/transfer', transferRoutes); // Mount transfer route
app.use('/api/history', historyRoutes); // Mount history routes

app.get('/', (req, res) => {
  res.send('Welcome to RavenPay API');
});

module.exports = app;

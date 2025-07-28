const express = require('express');
const morgan = require("morgan");
const dotenv = require('dotenv');
dotenv.config();

const authRoutes = require('./routes/auth');
const webhookRoutes = require('./routes/webhook');

const app = express();
app.use(express.json());
app.use(morgan("dev")); // Logs requests in 'dev' format

app.use('/api/auth', authRoutes);
app.use('/api/webhook', webhookRoutes);

module.exports = app;

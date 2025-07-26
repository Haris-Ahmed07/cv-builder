require('dotenv').config(); // Load environment variables

const express = require('express');
const cors = require('cors');

const cvRoutes = require('./routes/cvRoutes');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Enable CORS for frontend-backend communication
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// Routes for CV data
app.use('/api/cv', cvRoutes);

// Routes for authentication (signup/signin)
app.use('/api', authRoutes);

// Global error handler
app.use(errorHandler);

module.exports = app;

const express = require('express');
const cors = require('cors');
const cvRoutes = require('./routes/cvRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/cv', cvRoutes);

app.use(errorHandler);

module.exports = app;

const express = require('express');
const app = express();
const colors = require('colors');
const dotenv = require('dotenv').config();
const errorHandler = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');

connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/report', require('./routes/budgetRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/budget', require('./routes/budgetTotalRoutes'));

app.listen(8000, () => {
  console.log('server started on port 8000');
});

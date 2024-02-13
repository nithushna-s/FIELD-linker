require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const land=require('./routes/lands')
const routes = require('./routes/routes');
const Subscription=require ('./routes/subscription')
const loggerMiddleware = require('./middlewares/loggerMiddleware');
const paymentRoutes = require('./routes/paymentRoutes');
const bill =require ('./routes/bill')
const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString);

const database = mongoose.connection;

database.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

database.once('connected', () => {
  console.log('Database Connected');
});


const app = express();
const port = process.env.PORT || 7000;


app.use(loggerMiddleware);
app.use(cors());
app.use(express.json());

app.use('/api', paymentRoutes);
app.use('/api/bill',bill)
app.use('/api',routes,land ,Subscription);
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});
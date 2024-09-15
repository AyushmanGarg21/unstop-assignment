const express = require('express');
const mongoose = require('mongoose');
const seatRoutes = require('./routes/seatRoutes');
require('dotenv').config();

const app = express();
app.use(express.json()); // To parse JSON bodies
app.use('/api', seatRoutes);

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require('express');
const mongoose = require('mongoose');
const seatRoutes = require('./routes/seatRoutes');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

app.use('/api', seatRoutes);

//connect to MongoDB
mongoose.connect(process.env.DATABASE_URL, {
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

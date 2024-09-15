const express = require('express');
const Seat = require('../models/seat');
const router = express.Router();

// to Initialize seats
router.post('/initialize', async (req, res) => {
  const seats = [];
  for (let i = 1; i <= 80; i++) {
    seats.push({ seatNumber: i });
  }
  await Seat.insertMany(seats);
  res.send('Seats initialized');
});


router.get('/seats', async (req, res) => {
  try {
    // Retrieve all seats from the database, ordered by seat number
    const seats = await Seat.find().sort({ seatNumber: 1 });
    const seatStatuses = seats.map(seat => seat.isBooked ? 1 : 0);

    res.status(200).json(seatStatuses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Book seats
router.post('/book', async (req, res) => {
  const { numOfSeats } = req.body;

  try {
    const availableSeats = await Seat.find({ isBooked: false }).limit(numOfSeats);
    
    if (availableSeats.length < numOfSeats) {
      return res.status(400).json({ message: 'Not enough seats available' });
    }

    const seatNumbers = availableSeats.map(seat => seat.seatNumber);
    await Seat.updateMany({ seatNumber: { $in: seatNumbers } }, { isBooked: true });

    res.status(200).json({ bookedSeats: seatNumbers });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Vacate all seats
router.post('/vacate', async (req, res) => {
  try {
    await Seat.updateMany({}, { isBooked: false });
    res.status(200).json({ message: 'All seats vacated' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
  seatNumber: { type: Number, required: true }, // seat number
  isBooked: { type: Boolean, default: false } // whether the seat is booked or not
});

const Seat = mongoose.model('Seat', seatSchema);
module.exports = Seat;

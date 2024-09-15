import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  numOfSeats: number = 0; // Input for number of seats to book
  seatsArrayLeft: number[] = [];
  seatsArrayRight: number[] = [];

  ngOnInit(): void {
    this.getCurrentBookedSeat();
  }

  // Simulate fetching seat data from the backend
  getCurrentBookedSeat(): void {
    // Simulated backend response with 80 seat states (1 = booked, 0 = available)
    const backendSeatData: number[] = Array(80).fill(0).map(() => Math.round(Math.random())); // For example purpose

    // Fill seatsArrayLeft and seatsArrayRight based on row logic
    this.seatsArrayLeft = [];
    this.seatsArrayRight = [];

    for (let i = 0; i < 80; i += 7) {
      // Push first 4 seats of the row to the left side
      this.seatsArrayLeft.push(...backendSeatData.slice(i, i + 4));
      // Push the remaining 3 seats of the row to the right side
      this.seatsArrayRight.push(...backendSeatData.slice(i + 4, i + 7));
    }
  }

  // Validate number of seats to book
  bookSeatsValidation(): boolean {
    if (this.numOfSeats < 1) {
      alert('Please enter a valid number of seats to book.');
      return false;
    }
    if (this.numOfSeats > 7) {
      alert('You can book up to 7 seats at a time.');
      return false;
    }
    return true;
  }

  // Simulate backend booking
  bookSeatsBackend(): void {
    // Simulated backend booking
    // For example purpose
    this.seatsArrayLeft = this.seatsArrayLeft.map((seat) => seat === 0 ? 1 : seat);
    this.seatsArrayRight = this.seatsArrayRight.map((seat) => seat === 0 ? 1 : seat);
  }

  // When user clicks "Book" button
  bookSeats() {
    if (this.bookSeatsValidation()) {
      this.bookSeatsBackend();
      alert(`Booking ${this.numOfSeats} seat(s) - This will be done via backend.`);
      this.getCurrentBookedSeat();
    }
  }

  vacateAllSeats() {
    this.seatsArrayLeft = Array(44).fill(0); // Reset all left-side seats to available (0)
    this.seatsArrayRight = Array(36).fill(0); // Reset all right-side seats to available (0)
    alert('All seats have been vacated.');
  }
}

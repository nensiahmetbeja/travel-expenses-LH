import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TripService } from '../../../services/trip.service';
import { CreateTripRequest } from '../../../models/trip';

@Component({
  selector: 'app-create-trip',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-trip.html',
  styleUrls: ['./create-trip.scss']
})
export class CreateTripComponent {
  tripName = '';
  startDate = '';
  endDate = '';
  errorMsg = '';
  isLoading = false;

  constructor(
    private tripService: TripService,
    private router: Router
  ) {}

  createTrip(): void {
    if (!this.validateForm()) {
      return;
    }

    this.isLoading = true;
    this.errorMsg = '';

    try {
      const request: CreateTripRequest = {
        name: this.tripName,
        startDate: new Date(this.startDate),
        endDate: new Date(this.endDate)
      };

      const trip = this.tripService.createTrip(request);
      this.router.navigate(['/traveller/trip', trip.id]);
    } catch (error) {
      this.errorMsg = 'Failed to create trip. Please try again.';
    } finally {
      this.isLoading = false;
    }
  }

  private validateForm(): boolean {
    if (!this.tripName.trim()) {
      this.errorMsg = 'Trip name is required';
      return false;
    }

    if (!this.startDate) {
      this.errorMsg = 'Start date is required';
      return false;
    }

    if (!this.endDate) {
      this.errorMsg = 'End date is required';
      return false;
    }

    const start = new Date(this.startDate);
    const end = new Date(this.endDate);

    if (start >= end) {
      this.errorMsg = 'End date must be after start date';
      return false;
    }


    this.errorMsg = '';
    return true;
  }

  cancel(): void {
    this.router.navigate(['/traveller']);
  }
} 
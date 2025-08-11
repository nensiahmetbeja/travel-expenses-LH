import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TripService } from '../../services/trip.service';
import { Trip, ApprovalStatus, FinanceStatus } from '../../models/trip';
import { Role } from '../../models/role';
import { TripListComponent } from '../../components/trip-list/trip-list';

@Component({
  selector: 'app-finance',
  standalone: true,
  imports: [CommonModule, TripListComponent],
  templateUrl: './finance.html',
  styleUrls: ['./finance.scss']
})
export class FinanceComponent implements OnInit {
  trips: Trip[] = [];
  isLoading = true;
  userRole: Role = Role.Finance;

  constructor(
    private tripService: TripService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTrips();
  }

  private loadTrips(): void {
    this.trips = this.tripService.getTrips();
    this.isLoading = false;
  }

  onTripSelected(tripId: string): void {
    this.router.navigate(['/finance/trip', tripId]);
  }

  onTripRefunded(tripId: string): void {
    if (this.tripService.markTripRefunded(tripId)) {
      this.loadTrips(); // Reload to update the view
    }
  }

  onTripInProcess(tripId: string): void {
    if (this.tripService.markTripInProcess(tripId)) {
      this.loadTrips(); // Reload to update the view
    }
  }
}

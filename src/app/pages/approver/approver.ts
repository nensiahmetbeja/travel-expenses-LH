import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TripService } from '../../services/trip.service';
import { Trip, ApprovalStatus, FinanceStatus } from '../../models/trip';
import { Role } from '../../models/role';
import { TripListComponent } from '../../components/trip-list/trip-list';

@Component({
  selector: 'app-approver',
  standalone: true,
  imports: [CommonModule, TripListComponent],
  templateUrl: './approver.html',
  styleUrls: ['./approver.scss']
})
export class ApproverComponent implements OnInit {
  trips: Trip[] = [];
  isLoading = true;
  userRole: Role = Role.Approver;

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
    this.router.navigate(['/approver/trip', tripId]);
  }

  onTripApproved(tripId: string): void {
    if (this.tripService.approveTrip(tripId)) {
      this.loadTrips(); // Reload to update the view
    }
  }

  onTripRejected(tripId: string): void {
    if (this.tripService.rejectTrip(tripId)) {
      this.loadTrips(); // Reload to update the view
    }
  }
}

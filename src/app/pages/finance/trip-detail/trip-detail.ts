import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TripDetailViewComponent } from '../../../components/trip-detail-view/trip-detail-view';
import { TripService } from '../../../services/trip.service';
import { Trip, ApprovalStatus } from '../../../models/trip';
import { Role } from '../../../models/role';
import { ExpenseType } from '../../../models/expense';

@Component({
  selector: 'app-finance-trip-detail',
  standalone: true,
  imports: [CommonModule, TripDetailViewComponent],
  templateUrl: './trip-detail.html',
  styleUrls: ['./trip-detail.scss']
})
export class FinanceTripDetailComponent implements OnInit {
  trip: Trip | null = null;
  isLoading = true;
  userRole: Role = Role.Finance;

  constructor(
    private tripService: TripService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTrip();
  }

  private loadTrip(): void {
    const tripId = this.route.snapshot.paramMap.get('tripId');
    if (!tripId) {
      this.router.navigate(['/finance']);
      return;
    }

    const trip = this.tripService.getTripById(tripId);
    if (!trip) {
      this.router.navigate(['/finance']);
      return;
    }

    // Finance users can only view approved trips
    if (trip.approvalStatus !== ApprovalStatus.Approved) {
      this.router.navigate(['/finance']);
      return;
    }

    this.trip = trip;
    this.isLoading = false;
  }

  onBack(): void {
    this.router.navigate(['/finance']);
  }

  onTripRefunded(tripId: string): void {
    if (this.tripService.markTripRefunded(tripId)) {
      this.loadTrip(); // Reload to update the view
    }
  }

  onTripInProcess(tripId: string): void {
    if (this.tripService.markTripInProcess(tripId)) {
      this.loadTrip(); // Reload to update the view
    }
  }

  onExpenseCreated(event: { type: ExpenseType; data: any }): void {
    // Finance users can't create expenses, but handle the event for consistency
    console.log('Expense creation attempted by finance user:', event);
  }
} 
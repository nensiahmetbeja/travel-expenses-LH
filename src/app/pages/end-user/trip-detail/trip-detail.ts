import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TripService } from '../../../services/trip.service';
import { Trip, ApprovalStatus, FinanceStatus } from '../../../models/trip';
import { TripDetailViewComponent } from '../../../components/trip-detail-view/trip-detail-view';
import { Role } from '../../../models/role';

@Component({
  selector: 'app-trip-detail',
  standalone: true,
  imports: [CommonModule, TripDetailViewComponent],
  templateUrl: './trip-detail.html',
  styleUrls: ['./trip-detail.scss']
})
export class TripDetailComponent implements OnInit {
  trip: Trip | null = null;
  isLoading = true;
  userRole: Role = Role.EndUser;

  constructor(
    private tripService: TripService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTrip();
  }

  loadTrip(): void {
    const tripId = this.route.snapshot.paramMap.get('id');
    if (!tripId) {
      this.router.navigate(['/traveller']);
      return;
    }

    const trip = this.tripService.getTripById(tripId);
    if (!trip) {
      this.router.navigate(['/traveller']);
      return;
    }

    this.trip = trip;
    this.isLoading = false;
  }

  goBack(): void {
    this.router.navigate(['/traveller']);
  }

  editExpense(expenseId: string): void {
    if (this.trip) {
      this.router.navigate(['/traveller/trip', this.trip.id, 'expense', expenseId, 'edit']);
    }
  }

  submitForApproval(): void {
    if (this.trip && confirm('Are you sure you want to submit this trip for approval? You won\'t be able to edit expenses after submission.')) {
      this.tripService.submitForApproval(this.trip.id);
      this.loadTrip(); // Reload to update the view
    }
  }

  canEdit(): boolean {
    return this.trip ? this.trip.approvalStatus === ApprovalStatus.Draft && this.trip.financeStatus === FinanceStatus.InProcess : false;
  }
} 
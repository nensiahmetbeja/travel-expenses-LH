import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TripService } from '../../../services/trip.service';
import { ExpenseType } from '../../../models/expense';
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

  private loadTrip(): void {
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

  onExpenseCreated(event: { type: ExpenseType; data: any }): void {
    if (this.trip) {
      try {
        // Add the expense to the trip
        this.tripService.addExpense(this.trip.id, event.type, event.data);
        
        // Reload trip data to update the view
        this.loadTrip();
      } catch (error) {
        console.error('Error creating expense:', error);
        alert('Error creating expense. Please try again.');
      }
    }
  }

  onExpenseUpdated(event: { expenseId: string; type: ExpenseType; data: any }): void {
    if (this.trip) {
      try {
        // Update the expense
        this.tripService.updateExpense(this.trip.id, event.expenseId, event.data);
        
        // Reload trip data to update the view
        this.loadTrip();
      } catch (error) {
        console.error('Error updating expense:', error);
        alert('Error updating expense. Please try again.');
      }
    }
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
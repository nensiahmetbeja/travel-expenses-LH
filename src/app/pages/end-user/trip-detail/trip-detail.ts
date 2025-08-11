import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TripService } from '../../../services/trip.service';
import { Expense, ExpenseType } from '../../../models/expense';
import { Trip, ApprovalStatus, FinanceStatus } from '../../../models/trip';
import { ExpenseModalComponent } from '../../../components/expense-modal/expense-modal';

@Component({
  selector: 'app-trip-detail',
  standalone: true,
  imports: [CommonModule, ExpenseModalComponent],
  templateUrl: './trip-detail.html',
  styleUrls: ['./trip-detail.scss']
})
export class TripDetailComponent implements OnInit {
  trip: Trip | null = null;
  totalExpenses = 0;
  isLoading = true;
  showExpenseModal = false;

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
    this.totalExpenses = this.tripService.getTotalExpenses(tripId);
    this.isLoading = false;
  }

  getExpenseTypeIcon(type: ExpenseType): string {
    switch (type) {
      case ExpenseType.CarRental:
        return '🚗';
      case ExpenseType.Hotel:
        return '🏨';
      case ExpenseType.Flight:
        return '✈️';
      case ExpenseType.Taxi:
        return '🚕';
      default:
        return '💰';
    }
  }

  getExpenseTypeName(type: ExpenseType): string {
    switch (type) {
      case ExpenseType.CarRental:
        return 'Car Rental';
      case ExpenseType.Hotel:
        return 'Hotel';
      case ExpenseType.Flight:
        return 'Flight';
      case ExpenseType.Taxi:
        return 'Taxi';
      default:
        return 'Expense';
    }
  }

  getExpenseDescription(expense: Expense): string {
    switch (expense.type) {
      case ExpenseType.CarRental:
        return `${expense.carName} - ${expense.pickUpLocation} to ${expense.dropOffLocation}`;
      case ExpenseType.Hotel:
        return `${expense.hotelName} - ${expense.hotelLocation}`;
      case ExpenseType.Flight:
        return `${expense.airline} - ${expense.from} to ${expense.to}`;
      case ExpenseType.Taxi:
        return `${expense.from} to ${expense.to}`;
      default:
        return 'Expense';
    }
  }

  addExpense(): void {
    this.showExpenseModal = true;
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

  onExpenseModalClosed(): void {
    this.showExpenseModal = false;
  }

  editExpense(expenseId: string): void {
    if (this.trip) {
      this.router.navigate(['/traveller/trip', this.trip.id, 'expense', expenseId, 'edit']);
    }
  }

  viewExpense(expenseId: string): void {
    if (this.trip) {
      this.router.navigate(['/traveller/trip', this.trip.id, 'expense', expenseId]);
    }
  }

  deleteExpense(expenseId: string): void {
    if (this.trip && confirm('Are you sure you want to delete this expense?')) {
      this.tripService.deleteExpense(this.trip.id, expenseId);
      this.loadTrip(); // Reload to update the view
    }
  }

  submitForApproval(): void {
    if (this.trip && confirm('Are you sure you want to submit this trip for approval? You won\'t be able to edit expenses after submission.')) {
      this.tripService.submitForApproval(this.trip.id);
      this.loadTrip(); // Reload to update the view
    }
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric'
    });
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }

  canEdit(): boolean {
    return this.trip ? this.trip.approvalStatus === ApprovalStatus.Draft && this.trip.financeStatus === FinanceStatus.InProcess : false;
  }
} 
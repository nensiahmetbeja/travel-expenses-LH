import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Trip, ApprovalStatus, FinanceStatus } from '../../models/trip';
import { Expense, ExpenseType } from '../../models/expense';
import { Role } from '../../models/role';

@Component({
  selector: 'app-trip-detail-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-detail-view.html',
  styleUrls: ['./trip-detail-view.scss']
})
export class TripDetailViewComponent {
  @Input() trip: Trip | null = null;
  @Input() userRole: Role = Role.EndUser;
  @Input() isLoading: boolean = false;
  @Input() showApprovalActions: boolean = false;
  @Input() showFinanceActions: boolean = false;
  @Input() canEdit: boolean = true;

  @Output() backClicked = new EventEmitter<void>();
  @Output() addExpenseClicked = new EventEmitter<void>();
  @Output() expenseEdited = new EventEmitter<string>();
  @Output() expenseDeleted = new EventEmitter<string>();
  @Output() tripApproved = new EventEmitter<string>();
  @Output() tripRejected = new EventEmitter<string>();
  @Output() tripRefunded = new EventEmitter<string>();
  @Output() tripInProcess = new EventEmitter<string>();
  @Output() submitForApprovalClicked = new EventEmitter<void>();

  readonly Role = Role;
  readonly ExpenseType = ExpenseType;
  readonly ApprovalStatus = ApprovalStatus;
  readonly FinanceStatus = FinanceStatus;

  onBack(): void {
    this.backClicked.emit();
  }

  onAddExpense(): void {
    this.addExpenseClicked.emit();
  }

  onEditExpense(expenseId: string): void {
    this.expenseEdited.emit(expenseId);
  }

  onDeleteExpense(expenseId: string): void {
    this.expenseDeleted.emit(expenseId);
  }

  onApproveTrip(): void {
    if (this.trip) {
      this.tripApproved.emit(this.trip.id);
    }
  }

  onRejectTrip(): void {
    if (this.trip) {
      this.tripRejected.emit(this.trip.id);
    }
  }

  onMarkRefunded(): void {
    if (this.trip) {
      this.tripRefunded.emit(this.trip.id);
    }
  }

  onMarkInProcess(): void {
    if (this.trip) {
      this.tripInProcess.emit(this.trip.id);
    }
  }

  onSubmitForApproval(): void {
    this.submitForApprovalClicked.emit();
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
        return type;
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

  getTotalExpenses(): number {
    if (!this.trip) return 0;
    return this.trip.expenses.reduce((total, expense) => total + expense.totalPrice, 0);
  }

  canShowExpenseActions(): boolean {
    if (this.userRole === Role.EndUser) {
      return this.canEdit;
    }
    return false; // Approvers and Finance users can't edit expenses
  }
} 
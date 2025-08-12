import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Trip, ApprovalStatus, FinanceStatus } from '../../models/trip';
import { Expense, ExpenseType } from '../../models/expense';
import { Role } from '../../models/role';
import { ExpenseModalComponent } from '../expense-modal/expense-modal';
import { TripService } from '../../services/trip.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-trip-detail-view',
  standalone: true,
  imports: [CommonModule, ExpenseModalComponent, ReactiveFormsModule],
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
  @Output() tripApproved = new EventEmitter<string>();
  @Output() tripRejected = new EventEmitter<string>();
  @Output() tripRefunded = new EventEmitter<string>();
  @Output() tripInProcess = new EventEmitter<string>();
  @Output() submitForApprovalClicked = new EventEmitter<void>();
  @Output() tripUpdated = new EventEmitter<void>();

  showExpenseModal = false;
  expenseToView: Expense | null = null;

  savingNote = false;
  noteCtrl = new FormControl<string>('', { nonNullable: true });


  readonly Role = Role;
  readonly ExpenseType = ExpenseType;
  readonly ApprovalStatus = ApprovalStatus;
  readonly FinanceStatus = FinanceStatus;

  //inject trip service
  constructor(private tripService: TripService) {
  }


  onBack(): void {
    this.backClicked.emit();
  }

  onAddExpense(): void {
    this.expenseToView = null; // Ensure we're in add mode
    this.showExpenseModal = true;
  }

  onViewExpense(expenseId: string): void {
    if (this.trip) {
      const expense = this.trip.expenses.find(e => e.id === expenseId);
      if (expense) {
        this.expenseToView = expense;
        this.showExpenseModal = true;
      }
    }
  }

  onExpenseCreated(event: { type: ExpenseType; data: any }): void {
    console.log('onExpenseCreated ', event.data, " ", event.type);
    console.log('this.trip from parent comp ', this.trip);
    if (this.trip) {
      this.tripService.addExpense(this.trip.id, event.type, event.data);
      // Emit event to parent to refresh trip data
      this.tripUpdated.emit();
    }
    this.onExpenseModalClosed();
  }

  onExpenseUpdated(event: { expenseId: string; data: any }): void {
    if (this.trip) {
      this.tripService.updateExpense(this.trip.id, event.expenseId, event.data);
      // Emit event to parent to refresh trip data
      this.tripUpdated.emit();
    }
    this.onExpenseModalClosed();
  }

  onExpenseModalClosed(): void {
    this.showExpenseModal = false;
    this.expenseToView = null;
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

  onExpenseDeleted(expenseId: string): void {
    if (this.trip) {
      this.tripService.deleteExpense(this.trip.id, expenseId);
      // Emit event to parent to refresh trip data
      this.tripUpdated.emit();
    }
    this.onExpenseModalClosed();
  }

  addTripNote(): void { //approver only
    if (!this.trip) return;
    const note = this.noteCtrl.value.trim();
    if (!note) return;

    this.savingNote = true;
    const ok = this.tripService.addApprovalNote(this.trip.id, note);
    if (ok) {
      this.trip.approvalNote = note;   // reflect immediately
      this.tripUpdated.emit();         // parent can refresh if needed
    }
    this.savingNote = false;
    this.noteCtrl.reset('');
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
    return this.userRole === Role.EndUser && this.canEdit;
  }
} 
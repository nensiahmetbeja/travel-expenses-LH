import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseFormComponent } from '../expense-form/expense-form';
import { ExpenseType, Expense } from '../../models/expense';
import { Trip } from '../../models/trip';

@Component({
  selector: 'app-expense-modal',
  standalone: true,
  imports: [CommonModule, ExpenseFormComponent],
  templateUrl: './expense-modal.html',
  styleUrls: ['./expense-modal.scss']
})
export class ExpenseModalComponent {
  @Input() trip: Trip | null = null;
  @Input() isOpen = false;
  @Input() expenseToView: Expense | null = null;
  @Output() expenseCreated = new EventEmitter<any>();
  @Output() expenseUpdated = new EventEmitter<any>();
  @Output() closed = new EventEmitter<void>();
  @Output() expenseDeleted = new EventEmitter<string>();

  showSuccessMessage = false;
  isEditMode = false;

  get modalTitle(): string {
    if (this.expenseToView) {
      return this.isEditMode ? 'Edit Expense' : 'View Expense';
    }
    return 'Add Expense';
  }

  get isViewMode(): boolean {
    return this.expenseToView !== null && !this.isEditMode;
  }

  canShowEditButton(): boolean {
    return this.trip?.approvalStatus === 'Draft';
  }

  onDeleteExpense(): void {
    if (this.expenseToView) {
      // Emit delete event to parent component
      this.expenseDeleted.emit(this.expenseToView.id);
      this.closeModal();
    }
  }

  onExpenseCreated(event: { type: ExpenseType; data: any }): void {
    if (this.trip) {
      try {
        // Show success message
        this.showSuccessMessage = true;
        
        // Close modal after a short delay
        setTimeout(() => {
          this.closeModal();
        }, 2000);
        
        // Emit the event to parent component
        this.expenseCreated.emit(event);
      } catch (error) {
        console.error('Error creating expense:', error);
        alert('Error creating expense. Please try again.');
      }
    }
  }

  onExpenseUpdated(event: { expenseId: string; type: ExpenseType; data: any }): void {
    if (this.trip) {
      try {
        // Show success message
        this.showSuccessMessage = true;
        
        // Close modal after a short delay
        setTimeout(() => {
          this.closeModal();
        }, 2000);
        
        // Emit the event to parent component
        this.expenseUpdated.emit(event);
      } catch (error) {
        console.error('Error updating expense:', error);
        alert('Error updating expense. Please try again.');
      }
    }
  }

  onCancelled(): void {
    this.closeModal();
  }

  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
  }

  closeModal(): void {
    this.isOpen = false;
    this.showSuccessMessage = false;
    this.expenseToView = null;
    this.isEditMode = false;
    this.closed.emit();
  }

  onBackdropClick(event: Event): void {
    if (event.target === event.currentTarget) {
      this.closeModal();
    }
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric'
    });
  }

  formatDateTime(date: Date): string {
    return new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
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

  // Type guard methods
  isCarRentalExpense(expense: Expense): expense is import('../../models/expense').CarRentalExpense {
    return expense.type === ExpenseType.CarRental;
  }

  isHotelExpense(expense: Expense): expense is import('../../models/expense').HotelExpense {
    return expense.type === ExpenseType.Hotel;
  }

  isFlightExpense(expense: Expense): expense is import('../../models/expense').FlightExpense {
    return expense.type === ExpenseType.Flight;
  }

  isTaxiExpense(expense: Expense): expense is import('../../models/expense').TaxiExpense {
    return expense.type === ExpenseType.Taxi;
  }
} 
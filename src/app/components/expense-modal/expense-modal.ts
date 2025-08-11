import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseFormComponent } from '../expense-form/expense-form';
import { ExpenseType } from '../../models/expense';
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
  @Output() expenseCreated = new EventEmitter<any>();
  @Output() closed = new EventEmitter<void>();

  showSuccessMessage = false;

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

  onCancelled(): void {
    this.closeModal();
  }

  closeModal(): void {
    this.isOpen = false;
    this.showSuccessMessage = false;
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
} 
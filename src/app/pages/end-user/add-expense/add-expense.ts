import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpenseFormComponent } from '../../../components/expense-form/expense-form';
import { TripService } from '../../../services/trip.service';
import { Trip } from '../../../models/trip';
import { ExpenseType } from '../../../models/expense';

@Component({
  selector: 'app-add-expense',
  standalone: true,
  imports: [CommonModule, ExpenseFormComponent],
  templateUrl: './add-expense.html',
  styleUrls: ['./add-expense.scss']
})
export class AddExpenseComponent implements OnInit {
  trip: Trip | null = null;
  isLoading = true;
  showSuccessMessage = false;

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

  onExpenseCreated(event: { type: ExpenseType; data: any }): void {
    if (this.trip) {
      try {
        // Add the expense to the trip
        this.tripService.addExpense(this.trip.id, event.type, event.data);
        
        // Show success message
        this.showSuccessMessage = true;
        
        // Redirect back to trip detail after a short delay
        setTimeout(() => {
          this.router.navigate(['/traveller/trip', this.trip!.id]);
        }, 2000);
      } catch (error) {
        console.error('Error creating expense:', error);
        alert('Error creating expense. Please try again.');
      }
    }
  }

  onCancelled(): void {
    if (this.trip) {
      this.router.navigate(['/traveller/trip', this.trip.id]);
    } else {
      this.router.navigate(['/traveller']);
    }
  }

  goBack(): void {
    if (this.trip) {
      this.router.navigate(['/traveller/trip', this.trip.id]);
    } else {
      this.router.navigate(['/traveller']);
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
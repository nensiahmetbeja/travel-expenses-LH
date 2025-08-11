import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TripService } from '../../services/trip.service';
import { Trip, ApprovalStatus, FinanceStatus } from '../../models/trip';

@Component({
  selector: 'app-end-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './end-user.html',
  styleUrls: ['./end-user.scss']
})
export class EndUserComponent implements OnInit {
  trips: Trip[] = [];
  isLoading = true;

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

  createNewTrip(): void {
    this.router.navigate(['/traveller/create-trip']);
  }

  viewTrip(tripId: string): void {
    this.router.navigate(['/traveller/trip', tripId]);
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

  getTotalExpenses(tripId: string): number {
    return this.tripService.getTotalExpenses(tripId);
  }

  getStatusColor(status: string): string {
    switch (status.toLowerCase()) {
      case 'draft':
        return 'draft';
      case 'pending approval':
        return 'pending';
      case 'approved':
        return 'approved';
      case 'rejected':
        return 'rejected';
      case 'in process':
        return 'in-process';
      case 'refunded':
        return 'refunded';
      default:
        return 'draft';
    }
  }
}

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Trip, ApprovalStatus, FinanceStatus } from '../../models/trip';
import { Role } from '../../models/role';

@Component({
  selector: 'app-trip-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-list.html',
  styleUrls: ['./trip-list.scss']
})
export class TripListComponent {
  @Input() trips: Trip[] = [];
  @Input() userRole: Role = Role.EndUser;
  @Input() isLoading: boolean = false;
  @Input() showApprovalActions: boolean = false;
  @Input() showFinanceActions: boolean = false;
  @Input() canEdit: boolean = true;

  @Output() tripSelected = new EventEmitter<string>();
  @Output() tripApproved = new EventEmitter<string>();
  @Output() tripRejected = new EventEmitter<string>();
  @Output() tripRefunded = new EventEmitter<string>();
  @Output() tripInProcess = new EventEmitter<string>();
  visibleTrips: Trip[] = [];

  ngOnChanges() {
    this.recomputeVisibleTrips();
  }
  
  ngOnInit() {
    this.recomputeVisibleTrips();
  }
  
  private recomputeVisibleTrips() {
    this.visibleTrips = (this.trips ?? []).filter(t => this.canShowTrip(t));
  }
  

  readonly Role = Role;
  readonly ApprovalStatus = ApprovalStatus;
  readonly FinanceStatus = FinanceStatus;

  onTripClick(tripId: string): void {
    this.tripSelected.emit(tripId);
  }

  onApproveTrip(tripId: string): void {
    this.tripApproved.emit(tripId);
  }

  onRejectTrip(tripId: string): void {
    this.tripRejected.emit(tripId);
  }

  onMarkRefunded(tripId: string): void {
    this.tripRefunded.emit(tripId);
  }

  onMarkInProcess(tripId: string): void {
    this.tripInProcess.emit(tripId);
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

  canShowTrip(trip: Trip): boolean {
    if (!this.userRole) return true;
    if (this.userRole === Role.Approver) {
      return trip.approvalStatus != ApprovalStatus.Draft;
    }
    if (this.userRole === Role.Finance) {
      return trip.approvalStatus === ApprovalStatus.Approved;
    }
    return true;
  }
  
  getTotalExpenses(trip: Trip): number {
    return trip.expenses.reduce((total, expense) => total + expense.totalPrice, 0);
  }
} 
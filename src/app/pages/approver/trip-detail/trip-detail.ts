import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TripDetailViewComponent } from '../../../components/trip-detail-view/trip-detail-view';
import { TripService } from '../../../services/trip.service';
import { Trip } from '../../../models/trip';
import { Role } from '../../../models/role';

@Component({
  selector: 'app-approver-trip-detail',
  standalone: true,
  imports: [CommonModule, TripDetailViewComponent],
  templateUrl: './trip-detail.html',
  styleUrls: ['./trip-detail.scss']
})
export class ApproverTripDetailComponent implements OnInit {
  trip: Trip | null = null;
  isLoading = true;
  userRole: Role = Role.Approver;

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
      this.router.navigate(['/approver']);
      return;
    }

    const trip = this.tripService.getTripById(tripId);
    if (!trip) {
      this.router.navigate(['/approver']);
      return;
    }

    this.trip = trip;
    this.isLoading = false;
  }

  onBack(): void {
    this.router.navigate(['/approver']);
  }

  onTripApproved(tripId: string): void {
    if (this.tripService.approveTrip(tripId)) {
      this.loadTrip(); // Reload to update the view
    }
  }

  onTripRejected(tripId: string): void {
    if (this.tripService.rejectTrip(tripId)) {
      this.loadTrip(); // Reload to update the view
    }
  }
} 
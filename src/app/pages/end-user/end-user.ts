import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TripService } from '../../services/trip.service';
import { Trip, ApprovalStatus, FinanceStatus } from '../../models/trip';
import { Role } from '../../models/role';
import { TripListComponent } from '../../components/trip-list/trip-list';

@Component({
  selector: 'app-end-user',
  standalone: true,
  imports: [CommonModule, TripListComponent],
  templateUrl: './end-user.html',
  styleUrls: ['./end-user.scss']
})
export class EndUserComponent implements OnInit {
  trips: Trip[] = [];
  isLoading = true;
  userRole: Role = Role.EndUser;

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

  onTripSelected(tripId: string): void {
    this.router.navigate(['/traveller/trip', tripId]);
  }
}

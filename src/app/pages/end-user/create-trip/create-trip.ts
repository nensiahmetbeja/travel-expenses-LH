import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TripService } from '../../../services/trip.service';
import { CreateTripRequest } from '../../../models/trip';

@Component({
  selector: 'app-create-trip',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './create-trip.html',
  styleUrls: ['./create-trip.scss']
})
export class CreateTripComponent implements OnInit{
  isLoading = false;
  tripForm: FormGroup= new FormGroup({});

  constructor(
    private tripService: TripService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.tripForm = this.fb.group({
      tripName: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      startDate: ['', [
        Validators.required
      ]],
      endDate: ['', [
        Validators.required
      ]]
    }, {
      validators: [this.dateRangeValidator]
    });
  }

  private dateRangeValidator(group: FormGroup): ValidationErrors | null {
    const startDate = group.get('startDate')?.value;
    const endDate = group.get('endDate')?.value;
    
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      
      if (start >= end) {
        return { invalidDateRange: true };
      }
    }
    return null;
  }

  onSubmit(): void {
    if (this.tripForm.valid) {
      const formValue = this.tripForm.value;
      console.log('Form is valid:', formValue);
      this.handleFormSubmission();
    } else {
      this.markFormGroupTouched(this.tripForm);
    }
  }

    // Helper method to mark all fields as touched
    private markFormGroupTouched(formGroup: FormGroup): void {
      Object.keys(formGroup.controls).forEach(key => {
        const control = formGroup.get(key);
        control?.markAsTouched();
      });
    }

  handleFormSubmission(): void {
    this.isLoading = true;
    try {
      const request: CreateTripRequest = {
        name: this.tripForm.get('tripName')?.value,
        startDate: new Date(this.tripForm.get('startDate')?.value),
        endDate: new Date(this.tripForm.get('endDate')?.value)
      };

      const trip = this.tripService.createTrip(request);
      this.router.navigate(['/traveller/trip', trip.id]);
    } catch (error) {
      console.error('Failed to create trip:', error);
    } finally {
      this.isLoading = false;
    }
  }

  cancel(): void {
    this.router.navigate(['/traveller']);
  }
} 
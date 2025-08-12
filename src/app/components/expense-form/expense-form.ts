import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ExpenseType, CreateCarRentalExpenseRequest, CreateHotelExpenseRequest, CreateFlightExpenseRequest, CreateTaxiExpenseRequest, Expense } from '../../models/expense';


@Component({
  selector: 'app-expense-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './expense-form.html',
  styleUrls: ['./expense-form.scss']
})
export class ExpenseFormComponent implements OnInit, OnChanges {
  @Input() tripId: string = '';
  @Input() expenseToEdit: Expense | null = null;
  @Input() isEditMode: boolean = false;
  @Output() expenseCreated = new EventEmitter<any>();
  @Output() expenseUpdated = new EventEmitter<any>();
  @Output() cancelled = new EventEmitter<void>();

  expenseForm: FormGroup;
  selectedType: ExpenseType | null = null;
  isLoading = false;

  readonly ExpenseType = ExpenseType;
  readonly expenseTypes = Object.values(ExpenseType);
  

  // Custom validators
  private dateRangeValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.parent) return null;
    
    const startDate = control.parent.get('pickUpDateTime')?.value;
    const endDate = control.parent.get('dropOffDateTime')?.value;
    
    if (startDate && endDate && new Date(startDate) >= new Date(endDate)) {
      return { invalidDateRange: true };
    }
    
    return null;
  }

  private hotelDateRangeValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.parent) return null;
    
    const checkIn = control.parent.get('checkInDate')?.value;
    const checkOut = control.parent.get('checkoutDate')?.value;
    
    if (checkIn && checkOut && new Date(checkIn) >= new Date(checkOut)) {
      return { invalidDateRange: true };
    }
    
    return null;
  }

  private flightDateRangeValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.parent) return null;
    
    const departure = control.parent.get('departureDateTime')?.value;
    const arrival = control.parent.get('arrivalDateTime')?.value;
    
    if (departure && arrival && new Date(departure) >= new Date(arrival)) {
      return { invalidDateRange: true };
    }
    
    return null;
  }

  constructor(private fb: FormBuilder) {
    this.expenseForm = this.fb.group({
      type: ['', Validators.required],
      totalPrice: ['', [Validators.required, Validators.min(0.01)]]
    });
  }

  ngOnInit(): void {
    const typeSelected = this.expenseForm.get('type')!;
    console.log('typeSelected ', typeSelected);

    typeSelected.valueChanges.subscribe(type => {
      this.selectedType = type;
      this.updateFormFields(type);
    });

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['expenseToEdit'] && this.expenseToEdit) {
      this.populateFormForEdit();
    }
  }

  private populateFormForEdit(): void {
    if (!this.expenseToEdit) return;

    const expense = this.expenseToEdit;
    this.selectedType = expense.type;
    
    // Set basic fields
    this.expenseForm.patchValue({
      type: expense.type,
      totalPrice: expense.totalPrice
    });

    this.expenseForm.get('type')?.valueChanges.subscribe(type => {
      this.selectedType = type;
      this.updateFormFields(type);
    });
 // Update form fields based on type
 this.updateFormFields(expense.type);

 // Populate type-specific fields
 switch (expense.type) {
   case ExpenseType.CarRental:
     this.expenseForm.patchValue({
       carName: expense.carName,
       pickUpDateTime: this.formatDateForInput(expense.pickUpDateTime),
       dropOffDateTime: this.formatDateForInput(expense.dropOffDateTime),
       pickUpLocation: expense.pickUpLocation,
       dropOffLocation: expense.dropOffLocation
     });
     break;
   
   case ExpenseType.Hotel:
     this.expenseForm.patchValue({
       hotelName: expense.hotelName,
       hotelLocation: expense.hotelLocation,
       checkInDate: this.formatDateForInput(expense.checkInDate, true),
       checkoutDate: this.formatDateForInput(expense.checkoutDate, true)
     });
     break;
   
   case ExpenseType.Flight:
     this.expenseForm.patchValue({
       airline: expense.airline,
       from: expense.from,
       to: expense.to,
       departureDateTime: this.formatDateForInput(expense.departureDateTime),
       arrivalDateTime: this.formatDateForInput(expense.arrivalDateTime)
     });
     break;
   
   case ExpenseType.Taxi:
     this.expenseForm.patchValue({
       from: expense.from,
       to: expense.to,
       dateTime: this.formatDateForInput(expense.dateTime)
     });
     break;
 }
  }

  private formatDateForInput(date: Date, isTime: boolean = false): string {
    const d = new Date(date);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
  
    if (isTime) {
      return `${yyyy}-${mm}-${dd}`;
    }
  
    const hh = String(d.getHours()).padStart(2, '0');
    const min = String(d.getMinutes()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
  }

  private updateFormFields(type: ExpenseType | null): void {

      
    ['carName','pickUpDateTime','dropOffDateTime','pickUpLocation','dropOffLocation',
       'hotelName','hotelLocation','checkInDate','checkoutDate',
       'airline','from','to','departureDateTime','arrivalDateTime',
       'dateTime'
      ].forEach(c => this.expenseForm.contains(c) && this.expenseForm.removeControl(c));
    
      switch (type) {
        case ExpenseType.CarRental:
          this.expenseForm.setControl('carName', this.fb.control('', Validators.required));
          this.expenseForm.setControl('pickUpDateTime', this.fb.control('', Validators.required));
          this.expenseForm.setControl('dropOffDateTime', this.fb.control('', [Validators.required, this.dateRangeValidator.bind(this)]));
          this.expenseForm.setControl('pickUpLocation', this.fb.control('', Validators.required));
          this.expenseForm.setControl('dropOffLocation', this.fb.control('', Validators.required));
          break;
        case ExpenseType.Hotel:
          this.expenseForm.setControl('hotelName', this.fb.control('', Validators.required));
          this.expenseForm.setControl('hotelLocation', this.fb.control('', Validators.required));
          this.expenseForm.setControl('checkInDate', this.fb.control('', Validators.required));
          this.expenseForm.setControl('checkoutDate', this.fb.control('', [Validators.required, this.hotelDateRangeValidator.bind(this)]));
          break;
        case ExpenseType.Flight:
          this.expenseForm.setControl('airline', this.fb.control('', Validators.required));
          this.expenseForm.setControl('from', this.fb.control('', Validators.required));
          this.expenseForm.setControl('to', this.fb.control('', Validators.required));
          this.expenseForm.setControl('departureDateTime', this.fb.control('', Validators.required));
          this.expenseForm.setControl('arrivalDateTime', this.fb.control('', [Validators.required, this.flightDateRangeValidator.bind(this)]));
          break;
        case ExpenseType.Taxi:
          this.expenseForm.setControl('from', this.fb.control('', Validators.required));
          this.expenseForm.setControl('to', this.fb.control('', Validators.required));
          this.expenseForm.setControl('dateTime', this.fb.control('', Validators.required));
          break;
      }
  }

  onSubmit(): void {
    if (this.expenseForm.invalid) {
      this.expenseForm.markAllAsTouched();
      return;
    }

    try {
     
    this.isLoading = true;

      const formValue = this.expenseForm.value;
      
      let expenseData: any = {
        totalPrice: parseFloat(formValue.totalPrice)
      };

      // Add type-specific data
      switch (this.selectedType) {
        case ExpenseType.CarRental:
          expenseData = {
            ...expenseData,
            carName: formValue.carName,
            pickUpDateTime: new Date(formValue.pickUpDateTime),
            dropOffDateTime: new Date(formValue.dropOffDateTime),
            pickUpLocation: formValue.pickUpLocation,
            dropOffLocation: formValue.dropOffLocation
          } as CreateCarRentalExpenseRequest;
          break;
        
        case ExpenseType.Hotel:
          expenseData = {
            ...expenseData,
            hotelName: formValue.hotelName,
            hotelLocation: formValue.hotelLocation,
            checkInDate: new Date(formValue.checkInDate),
            checkoutDate: new Date(formValue.checkoutDate)
          } as CreateHotelExpenseRequest;
          break;
        
        case ExpenseType.Flight:
          expenseData = {
            ...expenseData,
            airline: formValue.airline,
            from: formValue.from,
            to: formValue.to,
            departureDateTime: new Date(formValue.departureDateTime),
            arrivalDateTime: new Date(formValue.arrivalDateTime)
          } as CreateFlightExpenseRequest;
          break;
        
        case ExpenseType.Taxi:
          expenseData = {
            ...expenseData,
            from: formValue.from,
            to: formValue.to,
            dateTime: new Date(formValue.dateTime)
          } as CreateTaxiExpenseRequest;
          break;
      }

      if (this.isEditMode && this.expenseToEdit) {
        this.expenseUpdated.emit(expenseData);
      } else {
        this.expenseCreated.emit(expenseData);
      }
      }
      finally {
        this.isLoading = false;
      }
  }
  onCancel(): void {
    this.cancelled.emit();
  }

  showError(controlName: string, error: string): boolean {
    const control = this.expenseForm.get(controlName);
    return !!(control && control.touched && control.hasError(error));
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

  isFieldVisible(fieldName: string): boolean {
    if (!this.selectedType) return false;
    
    switch (this.selectedType) {
      case ExpenseType.CarRental:
        return ['carName', 'pickUpDateTime', 'dropOffDateTime', 'pickUpLocation', 'dropOffLocation'].includes(fieldName);
      case ExpenseType.Hotel:
        return ['hotelName', 'hotelLocation', 'checkInDate', 'checkoutDate'].includes(fieldName);
      case ExpenseType.Flight:
        return ['airline', 'from', 'to', 'departureDateTime', 'arrivalDateTime'].includes(fieldName);
      case ExpenseType.Taxi:
        return ['from', 'to', 'dateTime'].includes(fieldName);
      default:
        return false;
    }
  }

  getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      carName: 'Car Name',
      pickUpDateTime: 'Pick-up Date & Time',
      pickUpLocation: 'Pick-up Location',
      dropOffLocation: 'Drop-off Location',
      hotelName: 'Hotel Name',
      hotelLocation: 'Hotel Location',
      checkInDate: 'Check-in Date',
      checkoutDate: 'Check-out Date',
      airline: 'Airline',
      from: 'From',
      to: 'To',
      departureDateTime: 'Departure Date & Time',
      arrivalDateTime: 'Arrival Date & Time',
      dateTime: 'Date & Time',
      totalPrice: 'Total Price ($)'
    };
    return labels[fieldName] || fieldName;
  }

  getFieldType(fieldName: string): string {
    if (fieldName.includes('Date') || fieldName.includes('Time')) {
      return 'datetime-local';
    }
    if (fieldName === 'totalPrice') {
      return 'number';
    }
    return 'text';
  }
} 
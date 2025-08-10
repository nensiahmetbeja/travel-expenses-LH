export enum ExpenseType {
  CarRental = 'CarRental',
  Hotel = 'Hotel',
  Flight = 'Flight',
  Taxi = 'Taxi'
}

export interface BaseExpense {
  id: string;
  type: ExpenseType;
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CarRentalExpense extends BaseExpense {
  type: ExpenseType.CarRental;
  carName: string;
  pickUpDateTime: Date;
  dropOffDateTime: Date;
  pickUpLocation: string;
  dropOffLocation: string;
}

export interface HotelExpense extends BaseExpense {
  type: ExpenseType.Hotel;
  hotelName: string;
  hotelLocation: string;
  checkInDate: Date;
  checkoutDate: Date;
}

export interface FlightExpense extends BaseExpense {
  type: ExpenseType.Flight;
  airline: string;
  from: string;
  to: string;
  departureDateTime: Date;
  arrivalDateTime: Date;
}

export interface TaxiExpense extends BaseExpense {
  type: ExpenseType.Taxi;
  from: string;
  to: string;
  dateTime: Date;
}

export type Expense = CarRentalExpense | HotelExpense | FlightExpense | TaxiExpense;

// Request interfaces for creating expenses
export interface CreateCarRentalExpenseRequest {
  carName: string;
  pickUpDateTime: Date;
  dropOffDateTime: Date;
  pickUpLocation: string;
  dropOffLocation: string;
  totalPrice: number;
}

export interface CreateHotelExpenseRequest {
  hotelName: string;
  hotelLocation: string;
  checkInDate: Date;
  checkoutDate: Date;
  totalPrice: number;
}

export interface CreateFlightExpenseRequest {
  airline: string;
  from: string;
  to: string;
  departureDateTime: Date;
  arrivalDateTime: Date;
  totalPrice: number;
}

export interface CreateTaxiExpenseRequest {
  from: string;
  to: string;
  dateTime: Date;
  totalPrice: number;
} 
import { Injectable } from '@angular/core';
import { Trip, CreateTripRequest, FinanceStatus, ApprovalStatus } from '../models/trip';
import { Expense, ExpenseType, CreateCarRentalExpenseRequest, CreateHotelExpenseRequest, CreateFlightExpenseRequest, CreateTaxiExpenseRequest } from '../models/expense';

@Injectable({ providedIn: 'root' })
export class TripService {
  private trips: Trip[] = [];
  private storageKey = 'trips';

  constructor() {
    this.loadTrips();
  }

  private loadTrips(): void {
    const stored = localStorage.getItem(this.storageKey);
    if (stored) {
      this.trips = JSON.parse(stored).map((trip: any) => ({
        ...trip,
        startDate: new Date(trip.startDate),
        endDate: new Date(trip.endDate),
        createdAt: new Date(trip.createdAt),
        updatedAt: new Date(trip.updatedAt),
        financeStatus: trip.financeStatus || FinanceStatus.InProcess,
        approvalStatus: trip.approvalStatus || ApprovalStatus.Draft,
        expenses: trip.expenses.map((expense: any) => ({
          ...expense,
          createdAt: new Date(expense.createdAt),
          updatedAt: new Date(expense.updatedAt),
          ...(expense.pickUpDateTime && { pickUpDateTime: new Date(expense.pickUpDateTime) }),
          ...(expense.dropOffDateTime && { dropOffDateTime: new Date(expense.dropOffDateTime) }),
          ...(expense.checkInDate && { checkInDate: new Date(expense.checkInDate) }),
          ...(expense.checkoutDate && { checkoutDate: new Date(expense.checkoutDate) }),
          ...(expense.departureDateTime && { departureDateTime: new Date(expense.departureDateTime) }),
          ...(expense.arrivalDateTime && { arrivalDateTime: new Date(expense.arrivalDateTime) }),
          ...(expense.dateTime && { dateTime: new Date(expense.dateTime) })
        }))
      }));
    }
  }

  private saveTrips(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.trips));
  }

  createTrip(request: CreateTripRequest): Trip {
    const duration = Math.ceil((request.endDate.getTime() - request.startDate.getTime()) / (1000 * 60 * 60 * 24));
    
    const trip: Trip = {
      id: this.generateId(),
      name: request.name,
      duration,
      startDate: request.startDate,
      endDate: request.endDate,
      financeStatus: FinanceStatus.InProcess,
      approvalStatus: ApprovalStatus.Draft,
      expenses: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.trips.push(trip);
    this.saveTrips();
    return trip;
  }

  getTrips(): Trip[] {
    return [...this.trips];
  }

  getTripById(id: string): Trip | undefined {
    return this.trips.find(trip => trip.id === id);
  }

  addExpense(tripId: string, type: ExpenseType, expenseData: any): Expense | null {
    const trip = this.getTripById(tripId);
    if (!trip || trip.approvalStatus === ApprovalStatus.Approved) {
      return null;
    }

    let expense: Expense;
    const now = new Date();

    switch (type) {
      case ExpenseType.CarRental:
        expense = {
          id: this.generateId(),
          type: ExpenseType.CarRental,
          carName: expenseData.carName,
          pickUpDateTime: expenseData.pickUpDateTime,
          dropOffDateTime: expenseData.dropOffDateTime,
          pickUpLocation: expenseData.pickUpLocation,
          dropOffLocation: expenseData.dropOffLocation,
          totalPrice: expenseData.totalPrice,
          createdAt: now,
          updatedAt: now
        } as Expense;
        break;
      
      case ExpenseType.Hotel:
        expense = {
          id: this.generateId(),
          type: ExpenseType.Hotel,
          hotelName: expenseData.hotelName,
          hotelLocation: expenseData.hotelLocation,
          checkInDate: expenseData.checkInDate,
          checkoutDate: expenseData.checkoutDate,
          totalPrice: expenseData.totalPrice,
          createdAt: now,
          updatedAt: now
        } as Expense;
        break;
      
      case ExpenseType.Flight:
        expense = {
          id: this.generateId(),
          type: ExpenseType.Flight,
          airline: expenseData.airline,
          from: expenseData.from,
          to: expenseData.to,
          departureDateTime: expenseData.departureDateTime,
          arrivalDateTime: expenseData.arrivalDateTime,
          totalPrice: expenseData.totalPrice,
          createdAt: now,
          updatedAt: now
        } as Expense;
        break;
      
      case ExpenseType.Taxi:
        expense = {
          id: this.generateId(),
          type: ExpenseType.Taxi,
          from: expenseData.from,
          to: expenseData.to,
          dateTime: expenseData.dateTime,
          totalPrice: expenseData.totalPrice,
          createdAt: now,
          updatedAt: now
        } as Expense;
        break;
      
      default:
        return null;
    }

    trip.expenses.push(expense);
    trip.updatedAt = now;
    this.saveTrips();
    return expense;
  }

  updateExpense(tripId: string, expenseId: string, expenseRequest: any): Expense | null {
    const trip = this.getTripById(tripId);
    if (!trip || trip.approvalStatus === ApprovalStatus.Approved) {
      return null;
    }

    const expenseIndex = trip.expenses.findIndex(exp => exp.id === expenseId);
    if (expenseIndex === -1) {
      return null;
    }

    const updatedExpense = {
      ...trip.expenses[expenseIndex],
      ...expenseRequest,
      updatedAt: new Date()
    };

    trip.expenses[expenseIndex] = updatedExpense;
    trip.updatedAt = new Date();
    this.saveTrips();
    return updatedExpense;
  }


  deleteExpense(tripId: string, expenseId: string): boolean {
    const trip = this.getTripById(tripId);
    if (!trip || trip.approvalStatus === ApprovalStatus.Approved) {
      return false;
    }

    const expenseIndex = trip.expenses.findIndex(exp => exp.id === expenseId);
    if (expenseIndex === -1) {
      return false;
    }

    trip.expenses.splice(expenseIndex, 1);
    trip.updatedAt = new Date();
    this.saveTrips();
    return true;
  }

  submitForApproval(tripId: string): boolean {
    const trip = this.getTripById(tripId);
    if (!trip || trip.approvalStatus === ApprovalStatus.Approved) {
      return false;
    }

    trip.approvalStatus = ApprovalStatus.PendingApproval;
    trip.updatedAt = new Date();
    this.saveTrips();
    return true;
  }

  approveTrip(tripId: string): boolean {
    const trip = this.getTripById(tripId);
    if (!trip || trip.approvalStatus !== ApprovalStatus.PendingApproval) {
      return false;
    }

    trip.approvalStatus = ApprovalStatus.Approved;
    trip.updatedAt = new Date();
    this.saveTrips();
    return true;
  }

  rejectTrip(tripId: string): boolean {
    const trip = this.getTripById(tripId);
    if (!trip || trip.approvalStatus !== ApprovalStatus.PendingApproval) {
      return false;
    }

    trip.approvalStatus = ApprovalStatus.Rejected;
    trip.updatedAt = new Date();
    this.saveTrips();
    return true;
  }

  markTripRefunded(tripId: string): boolean {
    const trip = this.getTripById(tripId);
    if (!trip || trip.approvalStatus !== ApprovalStatus.Approved) {
      return false;
    }

    trip.financeStatus = FinanceStatus.Refunded;
    trip.updatedAt = new Date();
    this.saveTrips();
    return true;
  }

  markTripInProcess(tripId: string): boolean {
    const trip = this.getTripById(tripId);
    if (!trip || trip.approvalStatus !== ApprovalStatus.Approved) {
      return false;
    }

    trip.financeStatus = FinanceStatus.InProcess;
    trip.updatedAt = new Date();
    this.saveTrips();
    return true;
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  getTotalExpenses(tripId: string): number {
    const trip = this.getTripById(tripId);
    if (!trip) return 0;
    return trip.expenses.reduce((total, expense) => total + expense.totalPrice, 0);
  }
} 
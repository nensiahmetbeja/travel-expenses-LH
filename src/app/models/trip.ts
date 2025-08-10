import { Expense } from "./expense";

export interface Trip {
  id: string;
  name: string;
  duration: number; // in days
  startDate: Date;
  endDate: Date;
  financeStatus: string;
  isApproved: boolean;
  expenses: Expense[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTripRequest {
  name: string;
  startDate: Date;
  endDate: Date;
} 
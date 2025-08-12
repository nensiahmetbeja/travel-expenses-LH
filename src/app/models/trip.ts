import { Expense } from "./expense";

export enum FinanceStatus {
  Refunded = 'Refunded',
  InProcess = 'In Process',
  Rejected = 'Rejected'
}

export enum ApprovalStatus {
  Draft = 'Draft',
  PendingApproval = 'Pending Approval',
  Approved = 'Approved',
  Rejected = 'Rejected'
}

export interface Trip {
  id: string;
  name: string;
  duration: number; // in days
  startDate: Date;
  endDate: Date;
  financeStatus: FinanceStatus;
  approvalStatus: ApprovalStatus;
  approvalNote?: string; //nullable 
  expenses: Expense[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTripRequest {
  name: string;
  startDate: Date;
  endDate: Date;
} 
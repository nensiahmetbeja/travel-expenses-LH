# TravelExpensesLH

A single-page application (SPA) built with **Angular** for managing travel expenses, trip approvals, and reimbursement workflows.  
The application supports three user roles — **End User**, **Approver**, and **Finance** — each with specific capabilities.

---

## Roles & Login Credentials

| Role       | Username   | Password  | Description                                                                 |
|------------|------------|-----------|-----------------------------------------------------------------------------|
| End User   | enduser1   | pass123   | Full trip and expense management: create/edit trips, add expenses, submit for approval |
| Approver   | approver1  | pass123   | Review trips, approve or reject with notes, read-only access to data       |
| Finance    | finance1   | pass123   | View approved trips, update reimbursement status, monitor expense totals   |

> **Note:** This project uses mock users stored in the codebase (`src/app/data/users.ts`). Authentication is role-based and persisted via Local Storage.

---

## Features

### **End User**
- **Trip Management**
  - Create and manage trips with:
    - Trip name
    - Duration
    - Start and end dates
- **Expense Tracking**
  - Add expenses by type with detailed fields:
    - **Car Rental**: Car name, pickup/dropoff date & time, pickup/dropoff location, total price
    - **Hotel**: Name, location, check-in/checkout dates, total price
    - **Flight**: Airline, origin/destination, departure/arrival date & time, total price
    - **Taxi**: Origin/destination, date & time, total price
- **Expense Operations**
  - View, edit, and delete expenses (only when trip is not locked for approval)
- **Approval Workflow**
  - Submit trips for approval (locks editing)

### **Approver**
- View complete trip details and all associated expenses
- Approve or reject trips with notes
- Add contextual notes for decisions
- Read-only access (cannot modify trip or expense data)

### **Finance**
- View all approved trips and their expenses
- Mark trips as **In Process** or **Refunded**
- Monitor expense totals and reimbursement status

---

## Setup Instructions

### **Prerequisites**
- **Node.js** v16+ (LTS recommended)
- **Angular CLI** (install globally if not already)
```bash
npm install -g @angular/cli
```

### Installation 

```bash
  git clone https://github.com/nensiahmetbeja/travel-expenses-LH.git
  cd travel-expenses-LH
```

## Development server
To start a local development server, run:

```bash
ng serve
```

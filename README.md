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

## Getting started

### **Prerequisites**
- **Node.js** v20+ (LTS recommended)
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

---
# Architecture Overview

## Architecture Documentation
- **Technical Decisions**: See [docs/technical-decisions.md](docs/technical-decisions.md) for detailed architecture rationale
- **UML diagram**: See [docs/Travel-Expenses-LH-UML.png](docs/Travel-Expenses-LH-UML.png) for UML diagram, also presented below
- **Additional Documents in Compodoc**: When viewing the generated Compodoc documentation, navigate to the /additional-documents route to explore the technical decisions, architecture notes, and other supplementary materials directly in the interactive documentation.


<img width="3840" height="2219" alt="Travel-Expenses-LH-UML" src="https://github.com/user-attachments/assets/016861c5-0c24-4ec1-a268-47d7fa7996b5" />


## Key Design Decisions
- Role-based routing with guards
- Centralized state management via services
- Reusable component architecture
- Local storage for persistence

---

## Access Documentation

### API Documentation
Generate comprehensive API documentation using Compodoc:

```bash
# Generate and serve documentation
compodoc -p tsconfig.json -s

# Generate documentation only
compodoc -p tsconfig.json

# Generate documentation with specific output directory
compodoc -p tsconfig.json -d docs/api
```

---

## Testing

### Test Coverage
- Unit tests for components and services
- Integration tests for user workflows
- E2E tests for critical user journeys

### Running Tests
```bash
# Unit tests
ng test

# E2E tests
ng e2e
```
---

**Note**: This is a fictional application developed for demonstration purposes. It showcases modern web development practices, Angular best practices, and enterprise-level application architecture.

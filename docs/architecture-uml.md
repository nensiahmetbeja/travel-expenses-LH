# Architecture Overview

The diagram below shows the main modules, shared components, services, and role-based screens.

> Note: Compodoc does not render Mermaid directly, so we embed a pre-rendered SVG.  
> The Mermaid source is included below for maintenance.

<p align="center">
  <img src="../images/architecture-uml.png" alt="Application architecture diagram" style="max-width:100%; height:auto;" />
</p>

---

## Legend

- **Module** (AppModule)  
- **Role Dashboards** (End User / Approver / Finance)  
- **Shared Components** (Trip detail, modal, form)  
- **Services & Security** (AuthService, TripService, AuthGuard)  
- **LocalStorage** persistence

---

## Mermaid Source (for editing)

<details>
<summary>Click to view Mermaid code</summary>

```mermaid
---
config:
  layout: dagre
---
flowchart TB
 subgraph EndUserModule["End User Module"]
        EndUserComponent["EndUserComponent<br><small>User Dashboard</small>"]
        CreateTripComponent["CreateTripComponent<br><small>New Trip Form</small>"]
        TripListComponent["TripListComponent<br><small>Trips Overview</small>"]
  end
 subgraph ApproverModule["Approver Module"]
        ApproverComponent["ApproverComponent<br><small>Approver Dashboard</small>"]
        ApproverTripDetailComponent["ApproverTripDetailComponent<br><small>Approval Management</small>"]
  end
 subgraph FinanceModule["Finance Module"]
        FinanceComponent["FinanceComponent<br><small>Finance Dashboard</small>"]
        FinanceTripDetailComponent["FinanceTripDetailComponent<br><small>Financial Review</small>"]
  end
 subgraph SharedComponents["Shared Components"]
        TripDetailComponent["TripDetailComponent<br><small>Trip Management</small>"]
        TripDetailViewComponent["TripDetailViewComponent<br><small>Trip View &amp; Edit</small>"]
        ExpenseModalComponent["ExpenseModalComponent<br><small>Expense Dialog</small>"]
        ExpenseFormComponent["ExpenseFormComponent<br><small>Expense Input Form</small>"]
  end
 subgraph ServicesLayer["Services & Security"]
        AuthService["AuthService<br><small>Authentication &amp; Authorization</small>"]
        TripService["TripService<br><small>Trip &amp; Expense Management</small>"]
        AuthGuard["AuthGuard<br><small>Route Protection</small>"]
  end
    AppModule["AppModule<br><small>(Root module with routing &amp; HTTP)</small>"] -.-> AppComponent["AppComponent<br><small>Root Component</small>"] & NavbarComponent["NavbarComponent<br><small>Navigation Header</small>"] & LoginComponent["LoginComponent<br><small>Authentication</small>"] & EndUserModule & ApproverModule & FinanceModule & SharedComponents & ServicesLayer
    AppComponent ==> NavbarComponent
    EndUserComponent ==> TripListComponent
    TripDetailComponent ==> TripDetailViewComponent
    TripDetailViewComponent ==> ExpenseModalComponent
    ExpenseModalComponent ==> ExpenseFormComponent
    ApproverComponent ==> TripListComponent
    ApproverTripDetailComponent ==> TripDetailViewComponent
    FinanceComponent ==> TripListComponent
    FinanceTripDetailComponent ==> TripDetailViewComponent
    NavbarComponent --> AuthService
    LoginComponent --> AuthService
    EndUserComponent --> TripService
    CreateTripComponent --> TripService
    TripDetailComponent --> TripService
    TripDetailViewComponent --> TripService
    ApproverComponent --> TripService
    ApproverTripDetailComponent --> TripService
    FinanceComponent --> TripService
    FinanceTripDetailComponent --> TripService
    ExpenseFormComponent -.-> ExpenseModalComponent
    ExpenseModalComponent -.-> TripDetailViewComponent
    TripDetailViewComponent -.-> TripDetailComponent
    AuthGuard --> AuthService
    AuthService --> LocalStorage["LocalStorage<br><small>Client-side Persistence</small>"]
    TripService --> LocalStorage
     EndUserComponent:::componentClass
     CreateTripComponent:::componentClass
     TripListComponent:::componentClass
     ApproverComponent:::componentClass
     ApproverTripDetailComponent:::componentClass
     FinanceComponent:::componentClass
     FinanceTripDetailComponent:::componentClass
     TripDetailComponent:::componentClass
     TripDetailViewComponent:::componentClass
     ExpenseModalComponent:::componentClass
     ExpenseFormComponent:::componentClass
     AuthService:::serviceClass
     TripService:::serviceClass
     AuthGuard:::guardClass
     AppModule:::moduleClass
     AppComponent:::componentClass
     NavbarComponent:::componentClass
     LoginComponent:::componentClass
     LocalStorage:::storageClass
    classDef moduleClass fill:#e1f5fe,stroke:#01579b,stroke-width:3px,color:#000
    classDef componentClass fill:#f3e5f5,stroke:#4a148c,stroke-width:2px,color:#000
    classDef serviceClass fill:#e8f5e8,stroke:#1b5e20,stroke-width:2px,color:#000
    classDef guardClass fill:#fff3e0,stroke:#e65100,stroke-width:2px,color:#000
    classDef storageClass fill:#fce4ec,stroke:#880e4f,stroke-width:2px,color:#000

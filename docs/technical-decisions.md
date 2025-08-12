---

## Table of Contents
- [Security & Authentication](#d1-role-based-authentication-with-localstorage)
- [Routing & Authorization](#d2-role-based-routing-with-path-segmentation)
- [State Management](#d3-service-based-state-with-localstorage-persistence)
- [Component Architecture](#d4-standalone-components-with-clear-hierarchy)
- [Component Communication](#d5-event-driven-communication-via-output)
- [Forms Strategy](#d6-reactive-forms-with-custom-validation)
- [Data Services](#d7-centralized-services-with-localstorage-persistence)
- [UX Architecture](#d8-modal-orchestration-with-component-composition)
- [Testing Strategy](#d9-minimal-testing-with-focus-on-core-functionality)
- [Build & Performance](#d10-angular-17-standalone-components-with-budget-warnings)

---

## Decisions

### [D1] Role-Based Authentication with localStorage
**Status:** Accepted  
**Context:** Need for simple authentication without backend infrastructure, requiring role-based access control across different user dashboards.  
**Options Considered:** JWT tokens, session-based auth, localStorage with role storage  
**Decision:** localStorage-based authentication with role persistence for user sessions.  
**Rationale:** Simplest implementation for demonstration purposes, no backend dependencies, immediate role access across components.  
**Implications:** Security risk of localStorage tampering, no session expiration, potential for role escalation attacks.  
**Fallback/Next Steps:** Migrate to JWT + HTTP-only cookies when backend is available; implement role verification on each request.  
**References:**  
- `src/app/services/auth.service.ts:L1–L35`  
- `src/app/guards/auth.guard.ts:L1–L24`  
- `src/app/models/role.ts:L1–L5`

---

### [D2] Role-Based Routing with Path Segmentation
**Status:** Accepted  
**Context:** Need to separate user experiences by role while maintaining clear URL structure and preventing unauthorized access.  
**Options Considered:** Single route with role-based rendering, role-specific subdomains, path-based role separation  
**Decision:** Path-based role separation (`/traveller`, `/approver`, `/finance`) with authGuard protection.  
**Rationale:** Clear URL structure, easy to understand, simple guard implementation, natural separation of concerns.  
**Implications:** Route duplication for similar functionality, potential for code duplication in role-specific components.  
**Fallback/Next Steps:** Consider feature-based routing if role-specific logic becomes too divergent.  
**References:**  
- `src/app/app.routes.ts:L1–L69`  
- `src/app/guards/auth.guard.ts:L1–L24`

---

### [D3] Service-Based State with localStorage Persistence
**Status:** Accepted  
**Context:** Need for data persistence without backend, requiring state management across components and user sessions.  
**Options Considered:** NgRx store, Angular signals, service-based with localStorage, in-memory only  
**Decision:** Service-based state management with localStorage persistence for trips and expenses.  
**Rationale:** Simplicity over complexity, no external dependencies, immediate persistence, familiar Angular patterns.  
**Implications:** No real-time updates, potential data inconsistency across tabs, limited scalability, localStorage size constraints.  
**Fallback/Next Steps:** Migrate to NgRx when real-time updates and complex state interactions are needed.  
**References:**  
- `src/app/services/trip.service.ts:L1–L100`  
- `src/app/services/auth.service.ts:L1–L35`

---

### [D4] Standalone Components with Clear Hierarchy
**Status:** Accepted  
**Context:** Need for modular, maintainable components that can be easily tested and reused across different role contexts.  
**Options Considered:** NgModule-based architecture, standalone components, hybrid approach  
**Decision:** Angular 17 standalone components with clear parent-child hierarchy for expense operations.  
**Rationale:** Modern Angular approach, better tree-shaking, simpler testing, clear component boundaries, no module complexity.  
**Implications:** Potential for import duplication, need for careful dependency management, learning curve for team.  
**Fallback/Next Steps:** Consider NgModules if component complexity increases significantly.  
**References:**  
- `src/app/components/expense-modal/expense-modal.ts:L1–L40`  
- `src/app/components/trip-detail-view/trip-detail-view.ts:L1–L50`  
- `src/app/components/expense-form/expense-form.ts:L1–L30`

---

### [D5] Event-Driven Communication via @Output/@Input
**Status:** Accepted  
**Context:** Need for loose coupling between components while maintaining clear data flow for expense operations.  
**Options Considered:** Service-based communication, input binding, event emitters, shared state  
**Decision:** Use **@Input** for passing data down to child components and **@Output** event emitters for propagating actions upward to parent components. Parent components then invoke services to handle the business logic or API calls.   
**Rationale:** - Maintains **component independence** — no direct references between sibling components.  
- Keeps data flow **unidirectional and explicit**, which aids debugging and maintenance.  
- Simplifies unit testing by allowing component events to be easily mocked or intercepted.  
**Implications:** Event chain complexity (ExpenseForm → ExpenseModal → TripDetailView → TripDetail), potential for lost events.  
**Fallback/Next Steps:** Consider service-based communication if event chains become too complex.  
**References:**  
- `src/app/components/expense-form/expense-form.ts:L200–L300`  
- `src/app/components/expense-modal/expense-modal.ts:L40–L100`  
- `src/app/components/trip-detail-view/trip-detail-view.ts:L60–L100`

---

### [D6] Reactive Forms with Custom Validation
**Status:** Accepted  
**Context:** Need for complex form validation across different expense types with dynamic field requirements.  
**Options Considered:** Template-driven forms, reactive forms, hybrid approach  
**Decision:** Reactive forms with custom validators for expense type-specific validation.  
**Rationale:** Better validation control, dynamic form generation, easier testing, type safety with TypeScript.  
**Implications:** More boilerplate code, steeper learning curve, potential for complex form state management.  
**Fallback/Next Steps:** Consider template-driven forms for simpler forms if validation requirements decrease.  
**References:**  
- `src/app/components/expense-form/expense-form.ts:L1–L100`  
- `src/app/pages/end-user/create-trip/create-trip.ts:L1–L50`

---

### [D7] Centralized Services with localStorage Persistence
**Status:** Accepted  
**Context:** Need for centralized business logic and data persistence without external dependencies.  
**Options Considered:** Multiple specialized services, single monolithic service, service per feature  
**Decision:** Two centralized services: `AuthService` for authentication, `TripService` for trip/expense management.  
**Rationale:** Clear separation of concerns, easy to maintain, simple dependency injection, centralized data access.  
**Implications:** Services become large, potential for tight coupling, difficult to test individual features.  
**Fallback/Next Steps:** Split into feature-specific services when individual services exceed 300+ lines.  
**References:**  
- `src/app/services/auth.service.ts:L1–L35`  
- `src/app/services/trip.service.ts:L1–L100`

---

### [D8] Modal Orchestration with Component Composition
**Status:** Accepted  
**Context:** Need for expense operations (create, view, edit, delete) without navigation, maintaining context and user experience.  
**Options Considered:** Separate routes for each operation, inline forms, modal-based approach  
**Decision:** Modal-based expense operations with component composition (`ExpenseModal` → `ExpenseForm`).  
**Rationale:** Better user experience, maintains context, no navigation complexity, reusable modal component.  
**Implications:** Complex modal state management, potential for modal state bugs, accessibility challenges.  
**Fallback/Next Steps:** Consider route-based approach if modal complexity increases significantly.  
**References:**  
- `src/app/components/expense-modal/expense-modal.ts:L1–L40`  
- `src/app/components/expense-form/expense-form.ts:L1–L30`  
- `src/app/components/trip-detail-view/trip-detail-view.ts:L40–L60`

---

### [D9] Minimal Testing with Focus on Core Functionality
**Status:** Accepted  
**Context:** Need for rapid development and demonstration, with limited time for comprehensive testing infrastructure.  
**Options Considered:** Comprehensive unit testing, integration testing, minimal testing, TDD approach  
**Decision:** Minimal testing with focus on core functionality and component specifications.  
**Rationale:** Faster development, focus on working features, easier demonstration, reduced complexity.  
**Implications:** Potential for bugs in edge cases, difficult to refactor safely, technical debt accumulation.  
**Fallback/Next Steps:** Implement comprehensive testing when moving to production or when bug count increases.  
**References:**  
- `src/app/app.spec.ts:L1–L26`  
- `src/app/pages/end-user/end-user.spec.ts:L1–L50`

---

### [D10] Angular 17 Standalone Components with Budget Warnings
**Status:** Accepted  
**Context:** Need for modern Angular features and optimal bundle size while maintaining development velocity.  
**Options Considered:** Angular 16 with NgModules, Angular 17 standalone, hybrid approach  
**Decision:** Angular 17 with standalone components and performance budgets.  
**Rationale:** Latest Angular features, better tree-shaking, modern development experience, performance monitoring.  
**Implications:** Budget warnings for SCSS files, potential for large bundles, need for optimization.  
**Fallback/Next Steps:** Optimize SCSS files, implement code splitting if bundle size becomes problematic.  
**References:**  
- `src/app/app.config.ts:L1–L15`  
- `angular.json` (performance budgets)

---

## Open Questions & Risks

### Security Risks
- **localStorage Tampering:** Users can modify their role in localStorage, potentially accessing unauthorized features.
- **No Session Expiration:** Authentication state persists indefinitely.
- **Client-Side Validation:** All validation occurs client-side and can be bypassed.

### Data Consistency Risks
- Multi-tab Behavior: Changes in one tab may not reflect in others.
- localStorage Limits: Potential storage quota exceeded with large datasets.
- No Conflict Resolution: No handling of concurrent modifications.

### Scalability Concerns
- **Service Growth:** `TripService` already at 274 lines, approaching maintainability limits.
- **Component Complexity:** `ExpenseModal` component handles multiple responsibilities.
- **Event Chain Depth:** Four-level event chain for expense operations.
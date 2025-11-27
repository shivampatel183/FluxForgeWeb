# FluxForge Web - Project Structure

## 📁 Directory Organization

This Angular project follows a clean, scalable architecture with clear separation of concerns:

```
src/
├── app/
│   ├── core/                          # Core application services & configuration
│   │   ├── config/
│   │   │   └── api.config.ts         # API endpoints & storage keys
│   │   ├── interfaces/
│   │   │   ├── user.interface.ts     # User data model
│   │   │   ├── project.interface.ts  # Project data model
│   │   │   └── index.ts              # Barrel export
│   │   ├── services/
│   │   │   ├── auth.service.ts       # Authentication logic
│   │   │   ├── project.service.ts    # Project management logic
│   │   │   └── index.ts              # Barrel export
│   │   └── index.ts                  # Barrel export
│   │
│   ├── shared/                        # Reusable components & utilities
│   │   ├── components/
│   │   │   ├── sidebar/
│   │   │   │   ├── sidebar.component.ts
│   │   │   │   ├── sidebar.component.html
│   │   │   │   └── sidebar.component.css
│   │   │   ├── stats/
│   │   │   │   ├── stats.component.ts
│   │   │   │   ├── stats.component.html
│   │   │   │   └── stats.component.css
│   │   │   ├── project-list/
│   │   │   │   ├── project-list.component.ts
│   │   │   │   ├── project-list.component.html
│   │   │   │   └── project-list.component.css
│   │   │   └── index.ts              # Barrel export
│   │   └── index.ts                  # Barrel export
│   │
│   ├── features/                      # Feature modules (lazy-loadable)
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   │   ├── login.component.ts
│   │   │   │   ├── login.component.html
│   │   │   │   └── login.component.css
│   │   │   └── (other auth features)
│   │   │
│   │   ├── dashboard/
│   │   │   ├── dashboard/
│   │   │   │   ├── dashboard.component.ts
│   │   │   │   ├── dashboard.component.html
│   │   │   │   └── dashboard.component.css
│   │   │   └── (other dashboard features)
│   │   │
│   │   └── index.ts                  # Barrel export
│   │
│   ├── app.component.ts              # Root component
│   ├── app.component.html            # Root template
│   ├── app.component.css             # Root styles
│   ├── app.config.ts                 # App-level configuration
│   └── app-routing.module.ts         # (Legacy - can be removed)
│
├── main.ts                            # Application bootstrap
├── styles.css                         # Global styles
└── index.html
```

## 🎯 Architecture Principles

### **1. Core Module** (`/core`)

- **Singleton Services**: Authentication, Project management
- **Configuration**: API endpoints, storage keys
- **Models/Interfaces**: Type definitions
- ✅ Imported only once in the root component

### **2. Shared Module** (`/shared`)

- **Reusable Components**: Sidebar, Stats, ProjectList
- **Dumb/Presentational Components**: No service dependencies
- **Standalone Components**: Self-contained with all dependencies declared
- ✅ Used across multiple features

### **3. Features Module** (`/features`)

- **Feature-specific Components**: Login, Dashboard
- **Smart Components**: Connected to services & state
- **Organized by Feature**: Each feature in its own folder
- ✅ Can be lazy-loaded in future

## 📦 Component Hierarchy

```
App (Root)
├── LoginComponent (auth/login)
│   └── (Basic form, no child components)
│
└── DashboardComponent (features/dashboard)
    ├── SidebarComponent (shared)
    │   └── User profile & navigation
    ├── StatsComponent (shared)
    │   └── Metric cards
    └── ProjectListComponent (shared)
        └── Projects table
```

## 🔧 Services

### **AuthService** (`core/services/auth.service.ts`)

Manages:

- User authentication & token storage
- Current user state (signal)
- HTTP headers for API calls
- Login/logout functionality

```typescript
// Usage
auth = inject(AuthService);
auth.token(); // reactive signal
auth.currentUser(); // reactive signal
auth.login(token);
auth.logout();
auth.getHeaders();
```

### **ProjectService** (`core/services/project.service.ts`)

Manages:

- Project data fetching
- Loading state
- Fallback mock data

```typescript
// Usage
projects = inject(ProjectService);
projects.projects(); // reactive signal
projects.isLoading(); // reactive signal
projects.fetchProjects();
```

## 🎨 Styling Strategy

- **Tailwind CSS**: All utilities for responsive design
- **CSS Files**: Minimal, only if component-specific styles needed
- **Dark Theme**: `#0d1117`, `#161b22` background colors
- **Responsive**: Mobile-first approach with Tailwind breakpoints

## 📡 API Integration

Configuration in `core/config/api.config.ts`:

```typescript
API_CONFIG.BASE_URL = "http://localhost:5057/api";
API_CONFIG.ENDPOINTS.AUTH.LOGIN = "/auth/login";
API_CONFIG.ENDPOINTS.PROJECTS = "/projects";
```

## 🔐 State Management

Using **Angular Signals** for reactive state:

```typescript
// Services use signals for reactive state
currentUser = signal<User | null>(null)
projects = signal<Project[]>([])
isLoading = signal(false)

// Components read signals
{{ auth.currentUser() }}
@if (projects.isLoading()) { ... }
```

## 📋 Component Guidelines

### Standalone Components

All components are **standalone**, meaning:

- Self-contained with all dependencies
- No module declarations needed
- Easier testing & lazy loading

```typescript
@Component({
  selector: 'app-example',
  standalone: true,
  imports: [CommonModule, SomeComponent],
  templateUrl: './example.component.html'
})
```

### Smart vs Dumb Components

- **Smart**: Connected to services, handles logic (Dashboard, Login)
- **Dumb**: Receives @Input/@Output, purely presentational (Sidebar, Stats, ProjectList)

## 🚀 Development Workflow

### 1. **Adding a New Service**

Create in `src/app/core/services/` and export via `index.ts`

### 2. **Adding a Shared Component**

Create in `src/app/shared/components/` with subdirectory structure

### 3. **Adding a Feature**

Create in `src/app/features/[feature-name]/` with page components

### 4. **Importing**

Use barrel exports for cleaner imports:

```typescript
// ✅ Good
import { AuthService } from "@/core";
import { SidebarComponent } from "@/shared";

// ❌ Avoid
import { AuthService } from "@/core/services/auth.service";
```

## 🧪 Testing Structure

Tests should mirror the source structure:

```
src/app/core/services/auth.service.spec.ts
src/app/shared/components/sidebar/sidebar.component.spec.ts
src/app/features/dashboard/dashboard/dashboard.component.spec.ts
```

## 📚 Key Files Overview

| File                 | Purpose                               |
| -------------------- | ------------------------------------- |
| `app.component.ts`   | Root component - handles auth routing |
| `main.ts`            | Bootstrap application with providers  |
| `app.config.ts`      | Global app configuration              |
| `core/services/`     | Business logic & data management      |
| `core/interfaces/`   | TypeScript models                     |
| `shared/components/` | Reusable UI components                |
| `features/`          | Feature-specific pages & components   |

## 🔄 Data Flow

```
User Interaction
    ↓
Component Event
    ↓
Service Method (inject)
    ↓
HTTP Request / Signal Update
    ↓
Signal Reactive Update
    ↓
Component Template Re-render (automatic)
```

## 📖 Best Practices Applied

✅ **Separation of Concerns**: Services, components, interfaces in separate files
✅ **DRY Principle**: Reusable shared components
✅ **Type Safety**: Strong TypeScript interfaces
✅ **Barrel Exports**: Clean, organized imports
✅ **Reactive Programming**: Angular Signals for state
✅ **Standalone Components**: Modern Angular approach
✅ **Configuration Centralization**: API config in one place
✅ **Scalability**: Easy to add features without affecting existing code

---

**Last Updated**: November 27, 2024

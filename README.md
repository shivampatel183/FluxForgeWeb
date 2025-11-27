# 🚀 FluxForge Web - Modern Angular Application

> A next-generation CI/CD platform with a clean, optimized Angular architecture

## ✨ Features

- 🔐 **GitHub OAuth Authentication** - Secure login with GitHub
- 📊 **Dashboard** - Beautiful dark-themed dashboard with metrics
- 📈 **Project Management** - Track your CI/CD pipelines
- 📱 **Responsive Design** - Mobile-first with Tailwind CSS
- ⚡ **Modern Angular** - Standalone components & Signals
- 🎨 **Dark Theme** - GitHub-inspired dark interface
- 🔄 **Reactive State** - Signal-based reactive programming

## 🏗️ Architecture

This project uses a **modular, scalable architecture** organized into three main layers:

### Core Layer (`/core`)

- **Services**: Business logic and API integration
- **Interfaces**: Type definitions and models
- **Config**: Application configuration and constants

### Shared Layer (`/shared`)

- **Reusable Components**: UI components used across features
- **Presentational Components**: Dumb components with @Input/@Output

### Features Layer (`/features`)

- **Auth**: Authentication and login pages
- **Dashboard**: Main application dashboard
- **Page Components**: Smart components connected to services

## 📁 Directory Structure

```
src/app/
├── core/                    # Core services, interfaces, configuration
│   ├── config/
│   │   └── api.config.ts   # API configuration
│   ├── interfaces/
│   │   ├── user.interface.ts
│   │   ├── project.interface.ts
│   │   └── index.ts
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── project.service.ts
│   │   └── index.ts
│   └── index.ts
│
├── shared/                  # Shared, reusable components
│   ├── components/
│   │   ├── sidebar/
│   │   ├── stats/
│   │   ├── project-list/
│   │   └── index.ts
│   └── index.ts
│
├── features/                # Feature-specific pages and components
│   ├── auth/
│   │   └── login/
│   ├── dashboard/
│   │   └── dashboard/
│   └── index.ts
│
├── app.component.ts         # Root component
├── app.config.ts           # App configuration
├── main.ts                 # Bootstrap entry point
└── app-routing.module.ts   # Routing (legacy, can be removed)
```

## 🔧 Tech Stack

- **Angular 16+** - Latest Angular with standalone components
- **TypeScript** - Strong type safety
- **Tailwind CSS** - Utility-first styling
- **Angular Signals** - Reactive state management
- **HttpClient** - API communication
- **Standalone APIs** - Modern Angular approach

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ and npm
- Angular CLI: `npm install -g @angular/cli`

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm start

# Open browser
# http://localhost:4200
```

### Development Server

```bash
npm start
```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any source files.

### Build for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Running Tests

```bash
npm test
```

## 📚 Key Components

### AppComponent (`app.component.ts`)

Root component that handles authentication routing:

- Shows `LoginComponent` if user is not authenticated
- Shows `DashboardComponent` if user is authenticated
- Checks for OAuth token in URL on init

### LoginComponent (`features/auth/login/`)

GitHub OAuth login page:

- Sign in with GitHub button
- Preview mode for testing
- Beautiful dark-themed interface

### DashboardComponent (`features/dashboard/`)

Main application dashboard:

- Sidebar with navigation
- Stats cards showing metrics
- Projects list with status tracking
- Responsive mobile header

### SidebarComponent (`shared/components/sidebar/`)

Navigation sidebar:

- Logo and branding
- Navigation links (Projects, Runners)
- User profile section
- Logout button

### StatsComponent (`shared/components/stats/`)

Dashboard metrics:

- Successful Runs: 124
- Active Runners: 3
- Failed Builds: 2

### ProjectListComponent (`shared/components/project-list/`)

Projects table:

- Repository name and branch
- Last run time
- Build status (active, building, failed)
- Last updated date

## 🔐 Authentication

### AuthService

Located in `core/services/auth.service.ts`

```typescript
// Check authentication
if (auth.isAuthenticated()) { ... }

// Get current token
const token = auth.token();

// Get current user
const user = auth.currentUser();

// Login
auth.login(token);

// Logout
auth.logout();

// Get auth headers for API calls
const headers = auth.getHeaders();
```

### Token Storage

- Tokens are stored in `localStorage` with key `flux_token`
- Automatically loaded on app initialization
- Cleared on logout

## 📡 API Integration

### ProjectService

Located in `core/services/project.service.ts`

```typescript
// Fetch projects
projectService.fetchProjects();

// Access projects reactively
@if (projectService.projects().length > 0) { ... }

// Check loading state
@if (projectService.isLoading()) { ... }
```

### API Configuration

Edit `core/config/api.config.ts`:

```typescript
export const API_CONFIG = {
  BASE_URL: "http://localhost:5057/api",
  ENDPOINTS: {
    AUTH: {
      LOGIN: "/auth/login",
      PROFILE: "/auth/profile",
    },
    PROJECTS: "/projects",
  },
};
```

## 🎨 Styling

### Tailwind CSS

- All components use Tailwind CSS utilities
- Dark theme with custom colors
- Responsive breakpoints (mobile, tablet, desktop)

### Dark Theme Colors

- Background: `#0d1117`
- Card Background: `#161b22`
- Border: `#30363d`
- Accent: `#6366f1` (Indigo)

## 🔄 State Management with Signals

Angular Signals provide reactive state management:

```typescript
// Define state
projects = signal<Project[]>([]);
isLoading = signal(false);
currentUser = signal<User | null>(null);

// Update state
projects.set(newProjects);
isLoading.set(true);

// Read state (creates reactivity)
@if (isLoading()) { ... }
{{ currentUser()?.displayName }}
```

## 📦 Barrel Exports

Clean imports using barrel exports:

```typescript
// Instead of:
import { AuthService } from "app/core/services/auth.service";

// Use:
import { AuthService } from "app/core";
```

## 🧪 Testing Structure

Run tests with:

```bash
npm test
```

## 📖 Documentation

- **PROJECT_STRUCTURE.md** - Detailed architecture documentation
- **SETUP_GUIDE.md** - Quick start and configuration guide
- **README.md** - This file

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## 🤝 Contributing

1. Follow the established file structure
2. Use meaningful component/service names
3. Keep components focused (single responsibility)
4. Add tests for new features

## 📝 License

MIT License

---

**Ready to build amazing CI/CD experiences! 🚀**

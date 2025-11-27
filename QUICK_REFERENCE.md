# 🚀 FluxForge - Quick Reference Guide

## 📁 File Locations Cheat Sheet

### Services

```
📄 Auth       → src/app/core/services/auth.service.ts
📄 Project    → src/app/core/services/project.service.ts
```

### Components - Shared (Reusable)

```
📄 Sidebar    → src/app/shared/components/sidebar/
📄 Stats      → src/app/shared/components/stats/
📄 ProjectList → src/app/shared/components/project-list/
```

### Components - Features (Page)

```
📄 Login      → src/app/features/auth/login/
📄 Dashboard  → src/app/features/dashboard/dashboard/
```

### Configuration

```
📄 API Config → src/app/core/config/api.config.ts
📄 App Config → src/app/app.config.ts
📄 Main       → src/main.ts
```

### Root

```
📄 App Component → src/app/app.component.ts
📄 App HTML      → src/app/app.component.html
```

---

## 🔑 Common Commands

### Development

```bash
npm install          # Install dependencies
npm start            # Start dev server
npm test             # Run tests
npm run build        # Build for production
```

### Project Structure

```
/core               → Business logic
/shared             → Reusable UI
/features           → Pages
```

---

## 💾 Importing Files

### The Right Way ✅

```typescript
// Use barrel exports for clean imports
import { AuthService, ProjectService } from "@app/core";
import { SidebarComponent } from "@app/shared";
```

### Avoid ❌

```typescript
import { AuthService } from "@app/core/services/auth.service";
```

---

## 🔄 Data Flow Quick View

```
Component → inject(Service) → Service.method()
                                  ↓
                           HTTP / Signal
                                  ↓
                           Template Auto-update
```

---

## ⚡ Using Services

### Get Auth Service

```typescript
auth = inject(AuthService);

// Use in template
{
  {
    auth.token();
  }
}
{
  {
    auth.currentUser()?.displayName;
  }
}

// Use in code
auth.login(token);
auth.logout();
```

### Get Project Service

```typescript
projects = inject(ProjectService);

// Use in template
@if (projects.isLoading()) { ... }
@for (project of projects.projects()) { ... }

// Use in code
projects.fetchProjects();
```

---

## 📝 Creating New Components

### 1. Create Files

```
src/app/shared/components/my-component/
├── my-component.component.ts
├── my-component.component.html
└── my-component.component.css
```

### 2. Component Template

```typescript
import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-my-component",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./my-component.component.html",
})
export class MyComponentComponent {
  @Input() data: any;
  @Output() action = new EventEmitter();
}
```

### 3. Export from index.ts

```typescript
// shared/components/index.ts
export * from "./my-component/my-component.component";
```

### 4. Use in Parent

```typescript
import { MyComponentComponent } from "@app/shared";

@Component({
  imports: [MyComponentComponent],
})
export class ParentComponent {}
```

---

## 🆕 Creating New Services

### 1. Create Service

```typescript
import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class MyService {
  private http = inject(HttpClient);

  myMethod() {
    // Your logic
  }
}
```

### 2. Export from index.ts

```typescript
// core/services/index.ts
export * from "./my.service";
```

### 3. Use in Component

```typescript
import { MyService } from "@app/core";

service = inject(MyService);
service.myMethod();
```

---

## 📊 Component Hierarchy

```
AppComponent (Root - decides Login vs Dashboard)
│
├─ LoginComponent (Page)
│  └─ GitHub OAuth
│
└─ DashboardComponent (Page)
   ├─ SidebarComponent (Shared - Dumb)
   ├─ StatsComponent (Shared - Dumb)
   └─ ProjectListComponent (Shared - Dumb)
```

---

## 🧠 Smart vs Dumb Components

### Smart Components (Features)

- Connected to services
- Handle business logic
- Use inject()
- Examples: Login, Dashboard

### Dumb Components (Shared)

- No service dependencies
- Use @Input/@Output only
- Pure presentation
- Examples: Sidebar, Stats, ProjectList

---

## 🎯 Template Syntax Quick Tips

### Check Auth

```html
@if (auth.token()) {
<!-- Show dashboard -->
} @else {
<!-- Show login -->
}
```

### Show Loading

```html
@if (projects.isLoading()) {
<p>Loading...</p>
}
```

### Loop Projects

```html
@for (project of projects.projects(); track project.id) {
<div>{{ project.repoFullName }}</div>
}
```

### Format Date

```html
{{ project.createdAt | date }}
```

---

## 🔐 Accessing Auth Data

### In Component

```typescript
auth = inject(AuthService);

// Read signals
const token = auth.token();
const user = auth.currentUser();

// Methods
auth.login(token);
auth.logout();
auth.getHeaders(); // For API calls
auth.isAuthenticated();
```

### In Template

```html
{{ auth.currentUser()?.displayName }} @if (auth.token()) { ... }
```

---

## 📡 Making API Calls

### In Service

```typescript
constructor(
  private http = inject(HttpClient),
  private auth = inject(AuthService)
) {}

getData() {
  return this.http.get(url, {
    headers: this.auth.getHeaders()
  });
}
```

### Update Config

```typescript
// core/config/api.config.ts
export const API_CONFIG = {
  BASE_URL: "http://your-api.com/api",
  ENDPOINTS: {
    PROJECTS: "/projects",
  },
};
```

---

## 🎨 Styling Guide

### Use Tailwind

```html
<div class="bg-indigo-600 text-white p-4 rounded">Content</div>
```

### Dark Theme Colors

- Background: `bg-[#0d1117]`
- Cards: `bg-[#161b22]`
- Border: `border-gray-700`
- Text: `text-white` or `text-gray-400`

---

## 🧪 Testing Services

```typescript
describe("AuthService", () => {
  it("should login", () => {
    const auth = inject(AuthService);
    auth.login("token");
    expect(auth.token()).toBe("token");
  });
});
```

---

## 🐛 Common Issues & Fixes

| Issue                   | Solution                                |
| ----------------------- | --------------------------------------- |
| Service not injecting   | Check `providedIn: 'root'`              |
| Component not rendering | Check `imports: [Component]`            |
| Styling not working     | Verify Tailwind CSS configured          |
| Import path errors      | Use barrel exports from `index.ts`      |
| Template syntax error   | Use `@if`, `@for`, `@else` (new syntax) |

---

## 📚 Documentation Files

| File                      | Purpose               |
| ------------------------- | --------------------- |
| README.md                 | Main docs & features  |
| PROJECT_STRUCTURE.md      | Detailed architecture |
| SETUP_GUIDE.md            | Configuration & setup |
| REFACTOR_SUMMARY.md       | What changed & why    |
| VERIFICATION_CHECKLIST.md | What was completed    |
| This file                 | Quick reference       |

---

## 🚀 Quick Start (Copy/Paste)

```bash
# 1. Install
cd c:\FluxForge\FluxForgeWeb
npm install

# 2. Start
npm start

# 3. Open browser
# http://localhost:4200

# 4. Test
# Click "Enter Preview Mode" to test without GitHub OAuth
```

---

## 📍 File Paths Lookup

### By Feature

- **Authentication** → `features/auth/login/`
- **Dashboard** → `features/dashboard/dashboard/`
- **Sidebar** → `shared/components/sidebar/`
- **Stats** → `shared/components/stats/`
- **Projects List** → `shared/components/project-list/`
- **Auth Logic** → `core/services/auth.service.ts`
- **Project Logic** → `core/services/project.service.ts`
- **Config** → `core/config/api.config.ts`

### By Type

- **Components** → `src/app/*/`
- **Services** → `src/app/core/services/`
- **Models** → `src/app/core/interfaces/`
- **Config** → `src/app/core/config/`

---

## ✨ Pro Tips

1. **Use barrel exports** - Import from `@app/core` not full path
2. **Keep components small** - One responsibility per component
3. **Use signals** - For reactive state management
4. **Inject services** - Use `inject()` not constructor params
5. **Make shared components dumb** - No service dependencies
6. **Test in isolation** - Each service independently

---

## 🎓 Learning Resources

- `PROJECT_STRUCTURE.md` - Architecture deep dive
- `SETUP_GUIDE.md` - Configuration help
- `README.md` - Feature overview
- Angular docs - https://angular.io
- Tailwind docs - https://tailwindcss.com

---

## 🚀 You're Ready!

Your FluxForge Angular app is now:
✅ Well-organized
✅ Scalable
✅ Maintainable
✅ Production-ready

Start developing! 🎉

---

**Last Updated**: November 27, 2024
**Version**: 1.0
**Status**: Complete ✅

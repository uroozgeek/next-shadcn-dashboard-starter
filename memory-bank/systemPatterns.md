# System Patterns

This file documents recurring patterns and standards used in the project.

[2025-04-08 19:14:00] - Initial patterns documentation created

## Coding Patterns

1. **Route Groups**
   ```plaintext
   src/app/
   ├── (auth)/      # Authentication related routes
   └── (dashboard)/ # Dashboard feature routes
   ```

2. **Feature Module Structure**
   ```plaintext
   features/
   ├── components/  # Feature-specific components
   ├── actions/     # Server actions
   ├── schemas/     # Form validation schemas
   └── utils/      # Feature-specific utilities
   ```

3. **Component Organization**
   - UI components in `components/ui/`
   - Layout components in `components/layout/`
   - Feature components in respective feature directories

## Architectural Patterns

1. **State Management**
   - Local UI state: React useState/useReducer
   - Global state: Zustand stores
   - URL state: Nuqs for searchable parameters
   - Form state: React Hook Form

2. **Data Fetching**
   - Server Components for initial data

4. **Database Patterns**
   - Supabase client initialization in lib/
   - Integration with Clerk auth for row-level security
   - Real-time subscription setup
   - Type-safe database queries

5. **Data Access Patterns**
   - Server-side Supabase queries with Clerk session
   - Client-side real-time subscriptions
   - Protected routes with Clerk middleware
   - User-scoped database queries
   - Error handling and retry logic

   - Server Actions for mutations
   - Client-side fetching for dynamic updates

3. **Authentication Flow**
   - Clerk-managed authentication
   - Protected route groups
   - Role-based access control

## Testing Patterns

1. **Component Testing**
   - Unit tests for utility functions
   - Component tests for UI elements
   - Integration tests for features

2. **Data Validation**
   - Zod schemas for type validation
   - Form validation with React Hook Form
   - API input validation

3. **Error Handling**
   - Error boundaries for component failures
   - Try-catch patterns for async operations
   - Consistent error response format
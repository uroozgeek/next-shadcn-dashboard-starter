# Product Context

This file provides a high-level overview of the project and the expected product that will be created. Initially based on project documentation and available information.

[2025-04-08 19:12:00] - Initial context created

## Project Goal

A Next.js 15 Admin Dashboard Starter Template that provides a modern, feature-rich foundation for building administrative interfaces.

## Key Features

1. **Authentication & User Management**
   - Clerk-based authentication
   - Multiple sign-in options (passwordless, social logins, enterprise SSO)
   - Profile management capabilities

2. **Core Dashboard Features**
   - Analytics overview with recharts graphs
   - Product management with advanced data tables
   - Kanban board with drag-n-drop functionality
   - Profile management interface

3. **Technical Stack**
   - Framework: Next.js 15 with App Router
   - Language: TypeScript
   - Styling: Tailwind CSS v4
   - Components: Shadcn-ui
   - State Management: Zustand
   - Form Handling: React Hook Form + Zod
   - Tables: Tanstack Data Tables
   - Search Params: Nuqs
   - Command Interface: kbar

## Overall Architecture

1. **Application Structure**
   - Feature-based organization
   - Route groups for auth and dashboard
   - Shared components and UI library
   - Feature modules with dedicated components
   - Core utilities and configurations

2. **Key Architectural Patterns**
   - Route grouping for logical separation
   - Feature-based modularity
   - Component-driven development
   - Server-side and client-side state management
   - Type-safe development approach
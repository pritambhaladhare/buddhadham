# Buddha Dhaam

## Overview

Buddha Dhaam is a comprehensive web application for a non-profit organization dedicated to preserving Buddhist heritage and serving monastic communities. The application serves as both a public-facing website showcasing the organization's work and a member portal for supporters to manage their contributions and engage with the community.

The system provides detailed information about Buddha Dhaam's initiatives across sacred Buddhist sites like Bodhgaya, Varanasi, Lumbini, and Kushinagar, while facilitating donations, volunteer applications, and member management. The platform includes interactive features such as a sacred sites map, meditation tools, and multilingual support to reach a global Buddhist community.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The frontend is built using React with TypeScript, utilizing a component-based architecture with the following key patterns:

- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React Query (TanStack Query) for server state management and caching
- **UI Framework**: Radix UI components with custom Tailwind CSS styling
- **Animation System**: Framer Motion for smooth animations and transitions
- **Form Handling**: React Hook Form with Zod validation for type-safe form management
- **Internationalization**: i18next for multi-language support (English, Hindi, Thai, Chinese)

The UI follows a Buddhist-inspired design system with saffron, deep red, and gold color schemes, incorporating cultural elements like lotus flowers and Peepal leaves.

### Backend Architecture
The backend uses Express.js with TypeScript in an ESM module structure:

- **API Layer**: RESTful API endpoints organized in `/server/routes.ts`
- **Authentication**: Session-based authentication with passport.js and Google OAuth integration
- **User Management**: Role-based access control with support for members and administrators
- **Email Integration**: Nodemailer for contact forms and communication

### Data Storage Solutions
The application uses PostgreSQL as the primary database with Drizzle ORM for type-safe database operations:

- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Schema Definition**: Drizzle schema with typed table definitions
- **Migration Strategy**: Drizzle Kit for database migrations and schema management

Key data models include:
- Users with role-based permissions
- Members with subscription management
- Contact messages and newsletter subscriptions
- Donations and volunteer applications
- Member benefits and payment tracking

### Authentication and Authorization
- **Session Management**: Express-session with memory store for development
- **Password Security**: bcryptjs for password hashing
- **OAuth Integration**: Google OAuth 2.0 for social authentication
- **Role-Based Access**: User roles (user, admin) with protected routes

### External Dependencies
- **Database**: Neon Database (PostgreSQL)
- **Email Service**: Nodemailer (requires SMTP configuration)
- **Maps**: Leaflet for interactive sacred sites mapping
- **UI Components**: Radix UI primitive components
- **Styling**: Tailwind CSS with custom Buddhist-inspired theme
- **Development**: Vite for build tooling and development server
- **Deployment**: ESBuild for production bundling

The application includes specialized features for Buddhist organizations such as meditation widgets, mantra displays, sacred site mapping, and culturally appropriate visual elements throughout the interface.
# Code Wiki

## Table of Contents

- [Projects Overview](#projects-overview)
- [MSU Platform](#msu-platform)
  - [Architecture](#msu-platform-architecture)
  - [Key Modules](#msu-platform-key-modules)
  - [Data Layer](#msu-platform-data-layer)
  - [Components](#msu-platform-components)
  - [Running the Project](#msu-platform-running)
- [Source Discussions](#source-discussions)
  - [Architecture](#source-discussions-architecture)
  - [Key Modules](#source-discussions-key-modules)
  - [State Management](#source-discussions-state-management)
  - [Firebase Integration](#source-discussions-firebase)
  - [Running the Project](#source-discussions-running)
- [Source Evntix](#source-evntix)
  - [Architecture](#source-evntix-architecture)
  - [Key Modules](#source-evntix-key-modules)
  - [Database Layer](#source-evntix-database)
  - [Running the Project](#source-evntix-running)
- [Source Dashboard](#source-dashboard)
  - [Architecture](#source-dashboard-architecture)
  - [Key Modules](#source-dashboard-key-modules)
  - [Authentication](#source-dashboard-authentication)
  - [Running the Project](#source-dashboard-running)

## Projects Overview

This repository contains four distinct Next.js applications:

| Project | Description | Tech Stack | Main Features |
|---------|-------------|------------|---------------|
| [MSU Platform](#msu-platform) | Marianopolis Student Union platform | Next.js, Supabase, Tailwind CSS | Events, petitions, clubs, sponsors, admin dashboard |
| [Source Discussions](#source-discussions) | Community discussion platform | Next.js, Firebase, Chakra UI, Jotai | Communities, posts, comments, user management |
| [Source Evntix](#source-evntix) | Event booking platform | Next.js, MongoDB, Cloudinary | Event listing, booking system |
| [Source Dashboard](#source-dashboard) | Admin dashboard | Next.js, PostgreSQL, NextAuth | Customer management, invoices, revenue tracking |

## MSU Platform

### MSU Platform Architecture

The MSU Platform is a Next.js application designed for the Marianopolis Student Union. It follows a standard Next.js App Router architecture with server-side rendering capabilities.

```
msu-platform/
├── app/                 # Next.js App Router
│   ├── about/           # About page
│   ├── admin/           # Admin dashboard
│   ├── calendar/        # Events calendar
│   ├── clubs/           # Clubs page
│   ├── events/          # Events pages
│   ├── petitions/       # Petitions pages
│   ├── sponsors/        # Sponsors page
│   ├── layout.jsx       # Root layout
│   └── page.jsx         # Home page
├── components/          # Reusable components
│   ├── admin/           # Admin-specific components
│   ├── events/          # Event-related components
│   ├── layout/          # Layout components
│   ├── petitions/       # Petition-related components
│   └── ui/              # UI components
├── lib/                 # Utility functions and data
│   ├── data.js          # Data access functions
│   ├── demo-data.js     # Demo data
│   ├── supabase.js      # Supabase client
│   └── utils.js         # Utility functions
└── public/              # Static assets
```

### MSU Platform Key Modules

#### Pages
- **Home Page**: Displays featured events, petitions, and stats
- **Events Pages**: List and detail views for events
- **Petitions Pages**: List, detail, and creation views for petitions
- **Clubs Page**: Displays student clubs
- **Sponsors Page**: Displays sponsor information
- **Admin Dashboard**: Management interface for events, petitions, finance, etc.

#### Components
- **EventCard**: Displays event information in a card format
- **PetitionCard**: Displays petition information in a card format
- **AdminLayout**: Layout for admin pages
- **AdminSidebar**: Sidebar navigation for admin dashboard
- **DataTable**: Table component for admin data display
- **Header**: Main navigation header
- **Footer**: Page footer

### MSU Platform Data Layer

The MSU Platform uses a simple data layer with demo data for development purposes. It includes functions to retrieve and filter data for various entities.

#### Key Data Functions

| Function | Description | File |
|----------|-------------|------|
| `getStats()` | Returns platform statistics | [data.js](file:///workspace/msu-platform/lib/data.js) |
| `getFeaturedEvents()` | Returns featured events | [data.js](file:///workspace/msu-platform/lib/data.js) |
| `getFeaturedPetitions()` | Returns featured petitions | [data.js](file:///workspace/msu-platform/lib/data.js) |
| `getAllEvents()` | Returns all events | [data.js](file:///workspace/msu-platform/lib/data.js) |
| `getEventBySlug()` | Returns event by slug | [data.js](file:///workspace/msu-platform/lib/data.js) |
| `getAllPetitions()` | Returns all petitions | [data.js](file:///workspace/msu-platform/lib/data.js) |
| `getPetitionBySlug()` | Returns petition by slug | [data.js](file:///workspace/msu-platform/lib/data.js) |
| `getAllClubs()` | Returns all clubs | [data.js](file:///workspace/msu-platform/lib/data.js) |
| `getAllSponsors()` | Returns all sponsors | [data.js](file:///workspace/msu-platform/lib/data.js) |
| `getAdminStats()` | Returns admin dashboard statistics | [data.js](file:///workspace/msu-platform/lib/data.js) |

### MSU Platform Components

#### EventCard Component
Displays event information in a card format with title, date, time, location, and category.

#### PetitionCard Component  
Displays petition information in a card format with title, description, signature count, and status.

#### Admin Components
- **AdminLayout**: Provides consistent layout for admin pages
- **AdminSidebar**: Navigation sidebar for admin dashboard
- **DataTable**: Table component for displaying admin data
- **KPICard**: Displays key performance indicators in admin dashboard

### MSU Platform Running

1. **Install dependencies**:
   ```bash
   cd msu-platform
   npm install
   ```

2. **Set up environment variables**:
   - Copy `.env.example` to `.env`
   - Configure Supabase credentials

3. **Run development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   npm start
   ```

## Source Discussions

### Source Discussions Architecture

The Source Discussions platform is a Next.js application designed for community discussions. It uses Firebase for authentication and data storage, Chakra UI for styling, and Jotai for state management.

```
source-discussions/
├── app/                 # Next.js App Router
│   ├── communities/     # Communities listing
│   ├── community/       # Community-specific pages
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page
│   └── providers.tsx    # Global providers
├── atoms/               # Jotai state atoms
├── chakra/              # Chakra UI theme
├── components/          # Reusable components
│   ├── community/       # Community-related components
│   ├── layout/          # Layout components
│   ├── modal/           # Modal components
│   ├── navbar/          # Navigation components
│   ├── posts/           # Post-related components
│   └── ui/              # UI components
├── firebase/            # Firebase configuration
├── functions/           # Firebase Cloud Functions
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
│   ├── comments/        # Comment-related functions
│   ├── community/       # Community-related functions
│   ├── post/            # Post-related functions
│   └── posts/           # Posts-related functions
├── schema/              # Data schemas
├── types/               # TypeScript types
└── public/              # Static assets
```

### Source Discussions Key Modules

#### Pages
- **Home Page**: Displays post feed
- **Communities Page**: Lists available communities
- **Community Pages**: Community-specific posts and discussions
- **Post Pages**: Individual post views with comments

#### Components
- **CommunityHeader**: Displays community information and actions
- **PostItem**: Displays post information and actions
- **CommentItem**: Displays comment information
- **AuthModal**: Modal for user authentication
- **CreateCommunityModal**: Modal for creating new communities
- **NewPostForm**: Form for creating new posts

### Source Discussions State Management

The platform uses Jotai for state management, with atoms defined in the `atoms` directory:

- **authModalAtom**: Manages authentication modal state
- **communitiesAtom**: Manages communities data
- **postsAtom**: Manages posts data
- **savedPostsAtom**: Manages saved posts

### Source Discussions Firebase Integration

The platform uses Firebase for:
- **Authentication**: Email/password and OAuth providers
- **Firestore**: Database for storing communities, posts, comments, etc.
- **Storage**: For community and user images
- **Cloud Functions**: Server-side logic

### Source Discussions Running

1. **Install dependencies**:
   ```bash
   cd source-discussions
   npm install
   ```

2. **Set up environment variables**:
   - Copy `.env.example` to `.env`
   - Configure Firebase credentials

3. **Run development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   npm start
   ```

5. **Run with Docker**:
   ```bash
   npm run docker:compose
   ```

## Source Evntix

### Source Evntix Architecture

Source Evntix is a Next.js event booking platform. It uses MongoDB for data storage and Cloudinary for image hosting.

```
source-evntix/
├── app/                 # Next.js App Router
│   ├── api/             # API routes
│   ├── events/          # Event pages
│   ├── layout.tsx       # Root layout
│   └── page.jsx         # Home page
├── components/          # Reusable components
│   ├── EventCard.tsx    # Event card component
│   ├── EventDetails.tsx # Event details component
│   ├── BookEvent.tsx    # Event booking component
│   └── Navbar.tsx       # Navigation component
├── database/            # Database models
│   ├── event.model.ts   # Event model
│   └── booking.model.ts # Booking model
├── lib/                 # Utility functions
│   ├── actions/         # Server actions
│   ├── mongodb.ts       # MongoDB connection
│   └── utils.ts         # Utility functions
└── public/              # Static assets
```

### Source Evntix Key Modules

#### Pages
- **Home Page**: Displays featured events
- **Event Pages**: Event detail views with booking functionality
- **API Routes**: Backend endpoints for event and booking data

#### Components
- **EventCard**: Displays event information in a card format
- **EventDetails**: Displays detailed event information
- **BookEvent**: Booking form for events
- **Navbar**: Navigation header

### Source Evntix Database Layer

The platform uses MongoDB with Mongoose models:

- **Event Model**: Stores event information (title, description, date, location, etc.)
- **Booking Model**: Stores booking information (event ID, user information, etc.)

### Source Evntix Running

1. **Install dependencies**:
   ```bash
   cd source-evntix
   npm install
   ```

2. **Set up environment variables**:
   - Configure MongoDB connection string
   - Configure Cloudinary credentials

3. **Run development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   npm start
   ```

## Source Dashboard

### Source Dashboard Architecture

Source Dashboard is a Next.js admin dashboard. It uses PostgreSQL for data storage and NextAuth for authentication.

```
source-dashboard/
├── app/                 # Next.js App Router
│   ├── dashboard/       # Dashboard pages
│   ├── login/           # Login page
│   ├── query/           # API routes
│   ├── seed/            # Database seeding
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Home page
├── auth.config.ts       # NextAuth configuration
├── auth.ts              # Authentication utilities
├── middleware.ts        # Middleware for protected routes
└── public/              # Static assets
```

### Source Dashboard Key Modules

#### Pages
- **Dashboard Overview**: Displays key metrics and recent activity
- **Customers Page**: Manages customer information
- **Invoices Page**: Manages invoices (create, edit, view)

#### Components
- **RevenueChart**: Displays revenue data chart
- **LatestInvoices**: Displays latest invoices
- **CustomersTable**: Table for customer data
- **InvoicesTable**: Table for invoice data
- **LoginForm**: Authentication form

### Source Dashboard Authentication

The dashboard uses NextAuth for authentication with email/password credentials. It includes middleware to protect routes and ensure only authenticated users can access the dashboard.

### Source Dashboard Running

1. **Install dependencies**:
   ```bash
   cd source-dashboard
   pnpm install
   ```

2. **Set up environment variables**:
   - Configure PostgreSQL connection string
   - Configure NextAuth secret

3. **Run development server**:
   ```bash
   pnpm dev
   ```

4. **Build for production**:
   ```bash
   pnpm build
   pnpm start
   ```

## Summary

This repository contains four distinct Next.js applications, each with its own purpose and technology stack:

1. **MSU Platform**: A student union platform with events, petitions, and admin capabilities
2. **Source Discussions**: A community discussion platform with Firebase integration
3. **Source Evntix**: An event booking platform with MongoDB and Cloudinary
4. **Source Dashboard**: An admin dashboard with PostgreSQL and NextAuth

Each project follows modern Next.js practices with App Router architecture, server components, and appropriate backend integrations for their specific use cases.
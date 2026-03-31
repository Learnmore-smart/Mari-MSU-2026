# Marianopolis Student Union (MSU) Platform - Product Requirement Document

## Overview
- **Summary**: A unified web platform for the Marianopolis Student Union that combines event management, petition/discussion system, clubs directory, sponsors information, and admin dashboard into a single coherent application.
- **Purpose**: To provide a centralized hub for student union activities, events, community engagement, and administrative functions, improving communication and accessibility for all stakeholders.
- **Target Users**: Marianopolis College students, faculty, staff, club leaders, and student union administrators.

## Goals
- Build a public-facing student union website with intuitive navigation
- Create an event discovery and management system with calendar functionality
- Implement a petition/proposal system with support/vote and discussion capabilities
- Develop a clubs directory with detailed information about each club
- Provide sponsors/partnership information section
- Build a comprehensive admin dashboard for managing events, petitions, finance, clubs, and sponsors
- Ensure the platform is maintainable by a single student developer

## Non-Goals (Out of Scope)
- Social media integration beyond basic sharing capabilities
- Advanced analytics or reporting features
- Mobile app development
- Complex permission systems beyond basic admin/public roles
- Third-party integrations except for Supabase

## Background & Context
- The platform is built using Next.js with App Router and Tailwind CSS
- Supabase is preferred for database and authentication
- The platform borrows concepts from three reference projects: Evntix (event management), next_discussion_platform (petitions/discussions), and nextjs-dashboard (admin functionality)
- The final implementation must be a single coherent application, not three separate apps

## Functional Requirements
- **FR-1**: Public-facing website with home page, events, calendar, petitions, clubs, sponsors, and about pages
- **FR-2**: Event management system with event listing, event detail pages, and calendar view
- **FR-3**: Petition system with creation, listing, detail view, support/vote functionality, and comments
- **FR-4**: Clubs directory with club cards and detailed information
- **FR-5**: Sponsors section with sponsorship information
- **FR-6**: Admin dashboard with event, petition, finance, clubs, and sponsors management
- **FR-7**: Role-based access control with public and admin roles

## Non-Functional Requirements
- **NFR-1**: Modern, clean, student-friendly design
- **NFR-2**: Responsive layout for all devices
- **NFR-3**: Maintainable codebase suitable for a single student developer
- **NFR-4**: Fast loading times and good performance
- **NFR-5**: Clear, consistent navigation across all sections

## Constraints
- **Technical**: Next.js, JavaScript only, React, App Router, Tailwind CSS, Supabase
- **Business**: Low maintenance burden, practical clarity, portfolio-worthy quality
- **Dependencies**: Supabase for database and authentication

## Assumptions
- The platform will use Supabase for data storage and authentication
- Demo data will be provided to make the UI immediately usable
- Admin routes will be protected by role-based access control
- The platform will be deployed as a static site with server-side rendering where needed

## Acceptance Criteria

### AC-1: Home Page
- **Given**: User visits the home page
- **When**: The page loads
- **Then**: User sees a hero section, quick stats, featured events, featured petitions, clubs preview, and CTA sections
- **Verification**: `human-judgment`

### AC-2: Events Section
- **Given**: User navigates to the events page
- **When**: The page loads
- **Then**: User sees a list of events with event cards containing title, image, location, date, and time
- **Verification**: `programmatic`

### AC-3: Event Detail Page
- **Given**: User clicks on an event card
- **When**: The event detail page loads
- **Then**: User sees detailed information about the event including description, date, time, location, and organizer
- **Verification**: `programmatic`

### AC-4: Calendar View
- **Given**: User navigates to the calendar page
- **When**: The page loads
- **Then**: User sees a calendar or calendar-style overview of events grouped by date
- **Verification**: `human-judgment`

### AC-5: Petitions Section
- **Given**: User navigates to the petitions page
- **When**: The page loads
- **Then**: User sees a list of petitions with title, summary, author, status, and supporter count
- **Verification**: `programmatic`

### AC-6: Petition Detail Page
- **Given**: User clicks on a petition
- **When**: The petition detail page loads
- **Then**: User sees detailed information about the petition, can support/vote for it, and can leave comments
- **Verification**: `programmatic`

### AC-7: New Petition Submission
- **Given**: User navigates to the new petition page
- **When**: User fills out the form and submits
- **Then**: A new petition is created with the provided information
- **Verification**: `programmatic`

### AC-8: Clubs Directory
- **Given**: User navigates to the clubs page
- **When**: The page loads
- **Then**: User sees a directory of clubs with club cards containing name, description, and contact information
- **Verification**: `programmatic`

### AC-9: Sponsors Section
- **Given**: User navigates to the sponsors page
- **When**: The page loads
- **Then**: User sees a list of sponsors and information about sponsorship opportunities
- **Verification**: `programmatic`

### AC-10: Admin Dashboard
- **Given**: Admin user logs in and navigates to the admin dashboard
- **When**: The dashboard loads
- **Then**: Admin sees KPI cards, recent events, recent petitions, and finance highlights
- **Verification**: `human-judgment`

### AC-11: Admin Event Management
- **Given**: Admin navigates to the admin events page
- **When**: The page loads
- **Then**: Admin sees a table or card view of events with options to create, edit, and delete events
- **Verification**: `programmatic`

### AC-12: Admin Petition Moderation
- **Given**: Admin navigates to the admin petitions page
- **When**: The page loads
- **Then**: Admin sees a list of petitions with status update controls
- **Verification**: `programmatic`

### AC-13: Admin Finance Management
- **Given**: Admin navigates to the admin finance page
- **When**: The page loads
- **Then**: Admin sees reimbursement records, finance records, sponsor amounts, and budget requests with statuses
- **Verification**: `programmatic`

### AC-14: Admin Clubs/Sponsors Management
- **Given**: Admin navigates to the admin clubs or sponsors page
- **When**: The page loads
- **Then**: Admin sees a management listing with edit-ready structure
- **Verification**: `programmatic`

## Open Questions
- [ ] What specific Supabase setup is needed for the project?
- [ ] How will user authentication be implemented for admin access?
- [ ] What specific demo data should be included for each module?
- [ ] What are the exact budget request and reimbursement workflows?

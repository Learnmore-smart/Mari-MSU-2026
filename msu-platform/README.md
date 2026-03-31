# Marianopolis Student Union (MSU) Platform

A comprehensive platform for the Marianopolis Student Union, built with Next.js, React, and Supabase.

## Features

- **Public Pages:**
  - Home page with featured events and petitions
  - Events listing and detail pages
  - Calendar view for events
  - Petitions listing and detail pages
  - New petition creation
  - Clubs directory
  - Sponsors page
  - About page

- **Admin Portal:**
  - Dashboard with KPI metrics
  - Event management (create, edit, delete)
  - Petition management and moderation
  - Finance management (reimbursements, budget requests)
  - Club management
  - Sponsor management

## Tech Stack

- Next.js 14 with App Router
- React 18
- Tailwind CSS
- Supabase (Authentication and Database)
- JavaScript (no TypeScript)

## Prerequisites

- Node.js 18.17 or later
- Supabase account
- Git

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd msu-platform
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up Supabase

1. Create a new project in Supabase
2. Go to Project Settings > API to get your `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Go to Project Settings > Service Role to get your `SUPABASE_SERVICE_ROLE_KEY`
4. Create a `.env.local` file in the root directory and add the following:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 4. Set up the database

1. Go to the SQL Editor in your Supabase project
2. Copy and paste the contents of `supabase/schema.sql` into the editor
3. Run the SQL to create all the necessary tables and seed the admin user

### 5. Run the development server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Admin Access

To access the admin portal:

1. Navigate to `http://localhost:3000/login`
2. Use the following credentials:
   - Email: `admin@msu.edu`
   - Password: `admin123`

You can then access the admin portal at `http://localhost:3000/admin`

## Project Structure

```
msu-platform/
├── app/
│   ├── admin/            # Admin routes
│   ├── events/           # Event routes
│   ├── petitions/        # Petition routes
│   ├── clubs/            # Club routes
│   ├── sponsors/         # Sponsor routes
│   ├── calendar/         # Calendar route
│   ├── about/            # About route
│   ├── login/            # Login page
│   ├── signup/           # Signup page
│   ├── layout.jsx        # Main layout
│   └── page.jsx          # Home page
├── components/
│   ├── admin/            # Admin components
│   ├── events/           # Event components
│   ├── petitions/        # Petition components
│   ├── layout/           # Layout components
│   └── ui/               # UI components
├── lib/
│   ├── data.js           # Data fetching and CRUD operations
│   ├── supabase.js       # Supabase client setup
│   └── utils.js          # Utility functions
├── supabase/
│   └── schema.sql        # Database schema
└── .env.local            # Environment variables
```

## Deployment

To deploy the application:

1. Build the production version:

```bash
npm run build
```

2. Deploy to your hosting provider of choice (Vercel, Netlify, etc.)

3. Make sure to set up the environment variables in your hosting provider's dashboard

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

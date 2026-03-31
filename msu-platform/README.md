# Marianopolis Student Union (MSU) Platform

A unified web platform for the Marianopolis Student Union, combining event management, petitions, clubs, and admin functionality.

## Features

### Public Routes
- Home page with featured events and petitions
- Events listing and detail pages
- Calendar view for events
- Petitions listing, detail, and submission
- Clubs directory
- Sponsors page
- About/contact page

### Admin Routes
- Admin dashboard with KPIs
- Events management
- Petitions moderation
- Finance management
- Clubs management
- Sponsors management

## Tech Stack

- Next.js
- JavaScript
- React
- App Router
- Tailwind CSS
- Supabase (database and auth)

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account

### Installation

1. Clone the repository
2. Install dependencies
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example` and fill in your Supabase credentials
4. Run the development server
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
msu-platform/
├── app/             # Next.js app directory
├── components/      # Shared components
├── lib/             # Utilities
├── data/            # Demo data
├── public/          # Static assets
├── package.json     # Project config
└── README.md        # This file
```

## Demo Data

The project includes demo data for events, petitions, clubs, sponsors, and finance records to help you get started quickly.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
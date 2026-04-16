# Merged Architecture Plan

## App Structure

```
msu-platform/
├── app/
│   ├── layout.jsx          # Main layout
│   ├── page.jsx            # Home page
│   ├── globals.css         # Global styles
│   ├── events/             # Events module
│   │   ├── page.jsx        # Events listing
│   │   └── [id]/           # Event detail
│   │       └── page.jsx
│   ├── calendar/           # Calendar module
│   │   └── page.jsx
│   ├── petitions/          # Petitions module
│   │   ├── page.jsx        # Petitions listing
│   │   ├── [id]/           # Petition detail
│   │   │   └── page.jsx
│   │   └── new/            # New petition
│   │       └── page.jsx
│   ├── clubs/              # Clubs module
│   │   └── page.jsx
│   ├── sponsors/           # Sponsors module
│   │   └── page.jsx
│   ├── about/              # About page
│   │   └── page.jsx
│   └── admin/              # Admin module
│       ├── page.jsx        # Admin dashboard
│       ├── events/         # Admin events
│       │   └── page.jsx
│       ├── petitions/      # Admin petitions
│       │   └── page.jsx
│       ├── finance/        # Admin finance
│       │   └── page.jsx
│       ├── clubs/          # Admin clubs
│       │   └── page.jsx
│       └── sponsors/       # Admin sponsors
│           └── page.jsx
├── components/             # Shared components
│   ├── layout/             # Layout components
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── ui/                 # UI components
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Badge.jsx
│   │   └── Form.jsx
│   ├── events/             # Event components
│   │   ├── EventCard.jsx
│   │   └── EventDetails.jsx
│   ├── petitions/          # Petition components
│   │   ├── PetitionCard.jsx
│   │   ├── PetitionDetails.jsx
│   │   └── CommentSection.jsx
│   ├── admin/              # Admin components
│   │   ├── SideNav.jsx
│   │   └── KPICard.jsx
│   └── finance/            # Finance components
│       └── FinanceTable.jsx
├── lib/                    # Utilities
│   ├── supabase.js         # Supabase client
│   ├── auth.js             # Auth helpers
│   └── utils.js            # General utilities
├── data/                   # Demo data
│   ├── events.js
│   ├── petitions.js
│   ├── clubs.js
│   ├── sponsors.js
│   └── finance.js
├── public/                 # Static assets
│   ├── images/             # Images
│   └── icons/              # Icons
├── package.json            # Project config
├── next.config.js          # Next.js config
├── tailwind.config.js      # Tailwind config
├── postcss.config.js       # PostCSS config
├── jsconfig.json           # JS config
└── .env.example            # Env example
```

## Route Structure

### Public Routes
- `/` - Home page
- `/events` - Events listing
- `/events/[id]` - Event detail
- `/calendar` - Calendar view
- `/petitions` - Petitions listing
- `/petitions/[id]` - Petition detail
- `/petitions/new` - New petition
- `/clubs` - Clubs directory
- `/sponsors` - Sponsors page
- `/about` - About/contact page

### Admin Routes
- `/admin` - Admin dashboard
- `/admin/events` - Events management
- `/admin/petitions` - Petitions moderation
- `/admin/finance` - Finance management
- `/admin/clubs` - Clubs management
- `/admin/sponsors` - Sponsors management

## Shared Layout
- Main layout with navbar and footer for public routes
- Admin layout with side navigation for admin routes
- Responsive design for all screen sizes

## Shared Navigation
- Public navbar with links to main sections
- Admin sidebar with links to admin sections
- Mobile-friendly navigation

## Shared UI System
- Reusable components using Tailwind CSS
- Consistent design language across public and admin
- Responsive components

## Shared Data Approach
- Supabase for database and auth
- Demo data for initial UI testing
- Reusable data fetching utilities

## Role Gating Approach
- Public routes accessible to all
- Admin routes protected by auth
- Simple role checking utilities

## Demo Data Strategy
- Pre-populated demo data for events, petitions, clubs, sponsors, and finance
- Realistic sample data for a student union context
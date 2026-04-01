# Source Audit

## ./source-evntix

### What to Reuse
- Event browsing patterns and listing ideas
- Event card UI patterns
- Event detail page structure
- Calendar/event grouping concepts
- Public event UX direction
- Clean, modern UI design

### What to Avoid
- MongoDB-specific code
- TypeScript files (we'll use JavaScript)
- Unnecessary booking functionality
- Project-specific branding

### Contribution to Final App
- Events module structure
- Event card and detail page components
- Public-facing event browsing experience

## ./source-discussions

### What to Reuse
- Post/discussion detail flow
- Comments architecture and UI
- Support/vote interaction patterns
- Moderation concepts
- List/detail patterns for petitions
- Community interaction patterns

### What to Avoid
- Firebase-specific code
- TypeScript files
- Community creation and management (beyond basic display)
- Complex auth flows
- Unnecessary social features

### Contribution to Final App
- Petitions module structure
- Support/vote functionality
- Comments section
- Petition submission flow

## ./source-dashboard

### What to Reuse
- Admin layout patterns
- KPI card UI ideas
- Table layouts for data management
- Finance/reimbursement/admin UI concepts
- Dashboard structure and navigation

### What to Avoid
- TypeScript files
- Invoice-specific functionality
- Customer management (beyond basic display)
- Auth implementation (we'll use Supabase)

### Contribution to Final App
- Admin dashboard layout
- Finance module UI
- Admin navigation structure
- KPI and data visualization patterns
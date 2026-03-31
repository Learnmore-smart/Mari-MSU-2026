import {
  events,
  petitions,
  clubs,
  sponsors,
  financeRecords,
  reimbursements,
  budgetRequests,
  users
} from './demo-data'

export function getStats() {
  return {
    events: events.filter(e => e.status === 'upcoming').length,
    petitions: petitions.filter(p => p.status === 'Open' || p.status === 'Under Review').length,
    clubs: clubs.length,
    members: 2450,
  }
}

export function getFeaturedEvents() {
  return events.slice(0, 3)
}

export function getFeaturedPetitions() {
  return petitions.filter(p => p.status === 'Open' || p.status === 'Under Review').slice(0, 3)
}

export function getAllEvents() {
  return events
}

export function getEventBySlug(slug) {
  return events.find(e => e.slug === slug)
}

export function getEventById(id) {
  return events.find(e => e.id === id)
}

export function getEventsByCategory(category) {
  return events.filter(e => e.category === category)
}

export function getEventsByDate(date) {
  return events.filter(e => e.date === date)
}

export function getEventsForCalendar() {
  return events.map(e => ({
    id: e.id,
    title: e.title,
    date: e.date,
    category: e.category,
  }))
}

export function getAllPetitions() {
  return petitions
}

export function getPetitionBySlug(slug) {
  return petitions.find(p => p.slug === slug)
}

export function getPetitionById(id) {
  return petitions.find(p => p.id === id)
}

export function getPetitionsByStatus(status) {
  return petitions.filter(p => p.status === status)
}

export function getPetitionsByCategory(category) {
  return petitions.filter(p => p.category === category)
}

export function getAllClubs() {
  return clubs
}

export function getClubById(id) {
  return clubs.find(c => c.id === id)
}

export function getClubsByCategory(category) {
  return clubs.filter(c => c.category === category)
}

export function getAllSponsors() {
  return sponsors
}

export function getSponsorById(id) {
  return sponsors.find(s => s.id === id)
}

export function getSponsorsByTier(tier) {
  return sponsors.filter(s => s.tier === tier)
}

export function getAllFinanceRecords() {
  return financeRecords
}

export function getFinanceRecordById(id) {
  return financeRecords.find(f => f.id === id)
}

export function getAllReimbursements() {
  return reimbursements
}

export function getReimbursementById(id) {
  return reimbursements.find(r => r.id === id)
}

export function getAllBudgetRequests() {
  return budgetRequests
}

export function getBudgetRequestById(id) {
  return budgetRequests.find(b => b.id === id)
}

export function getUserById(id) {
  return users.find(u => u.id === id)
}

export function getAdminStats() {
  const totalIncome = financeRecords
    .filter(f => f.type === 'income')
    .reduce((sum, f) => sum + f.amount, 0)

  const totalExpenses = financeRecords
    .filter(f => f.type === 'expense')
    .reduce((sum, f) => sum + f.amount, 0)

  const pendingReimbursements = reimbursements
    .filter(r => r.status === 'Pending')
    .reduce((sum, r) => sum + r.amount, 0)

  const pendingBudgetRequests = budgetRequests
    .filter(b => b.status === 'Pending')
    .reduce((sum, b) => sum + b.amount, 0)

  return {
    totalEvents: events.length,
    totalPetitions: petitions.length,
    openPetitions: petitions.filter(p => p.status === 'Open').length,
    totalClubs: clubs.length,
    totalSponsors: sponsors.length,
    totalIncome,
    totalExpenses,
    balance: totalIncome - totalExpenses,
    pendingReimbursements,
    pendingBudgetRequests,
    totalSponsorship: sponsors.reduce((sum, s) => sum + s.contribution, 0),
  }
}

export function getRecentActivity() {
  const recentEvents = events.slice(0, 3).map(e => ({
    type: 'event',
    title: e.title,
    date: e.date,
    status: e.status,
  }))

  const recentPetitions = petitions.slice(0, 3).map(p => ({
    type: 'petition',
    title: p.title,
    date: p.createdAt,
    status: p.status,
  }))

  return [...recentEvents, ...recentPetitions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5)
}

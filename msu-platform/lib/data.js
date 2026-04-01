import { v4 as uuidv4 } from 'uuid'
import * as demoData from './demo-data'

export async function getStats() {
  return {
    events: demoData.events.length,
    petitions: demoData.petitions.length,
    clubs: demoData.clubs.length,
    members: 2450,
  }
}

export async function getFeaturedEvents() {
  return demoData.events.slice(0, 3)
}

export async function getFeaturedPetitions() {
  return demoData.petitions.slice(0, 3)
}

export async function getAllEvents() {
  return demoData.events
}

export async function getEventBySlug(slug) {
  return demoData.events.find(e => e.slug === slug) || null
}

export async function getEventById(id) {
  return demoData.events.find(e => e.id === id) || null
}

export async function getEventsByCategory(category) {
  return demoData.events.filter(e => e.category === category)
}

export async function getEventsByDate(date) {
  return demoData.events.filter(e => e.date === date)
}

export async function getEventsForCalendar() {
  return demoData.events.map(e => ({
    id: e.id,
    title: e.title,
    date: e.date,
    category: e.category
  }))
}

export async function getAllPetitions() {
  return demoData.petitions
}

export async function getPetitionBySlug(slug) {
  return demoData.petitions.find(p => p.slug === slug) || null
}

export async function getPetitionById(id) {
  return demoData.petitions.find(p => p.id === id) || null
}

export async function getPetitionsByStatus(status) {
  return demoData.petitions.filter(p => p.status === status)
}

export async function getPetitionsByCategory(category) {
  return demoData.petitions.filter(p => p.category === category)
}

export async function getAllClubs() {
  return demoData.clubs
}

export async function getClubById(id) {
  return demoData.clubs.find(c => c.id === id) || null
}

export async function getClubsByCategory(category) {
  return demoData.clubs.filter(c => c.category === category)
}

export async function getAllSponsors() {
  return demoData.sponsors
}

export async function getSponsorById(id) {
  return demoData.sponsors.find(s => s.id === id) || null
}

export async function getSponsorsByTier(tier) {
  return demoData.sponsors.filter(s => s.tier === tier)
}

export async function getAllFinanceRecords() {
  return demoData.financeRecords
}

export async function getFinanceRecordById(id) {
  return demoData.financeRecords.find(f => f.id === id) || null
}

export async function getAllReimbursements() {
  return demoData.reimbursements
}

export async function getReimbursementById(id) {
  return demoData.reimbursements.find(r => r.id === id) || null
}

export async function getAllBudgetRequests() {
  return demoData.budgetRequests
}

export async function getBudgetRequestById(id) {
  return demoData.budgetRequests.find(b => b.id === id) || null
}

export async function getUserById(id) {
  return null
}

export async function getAdminStats() {
  const totalIncome = demoData.financeRecords.filter(f => f.type === 'income').reduce((sum, f) => sum + f.amount, 0)
  const totalExpenses = demoData.financeRecords.filter(f => f.type === 'expense').reduce((sum, f) => sum + f.amount, 0)
  const pendingReimbursements = demoData.reimbursements.filter(r => r.status === 'Pending').reduce((sum, r) => sum + r.amount, 0)
  const pendingBudgetRequests = demoData.budgetRequests.filter(b => b.status === 'Pending').reduce((sum, b) => sum + b.amount, 0)
  const totalSponsorship = demoData.sponsors.reduce((sum, s) => sum + s.contribution, 0)

  return {
    totalEvents: demoData.events.length,
    totalPetitions: demoData.petitions.length,
    openPetitions: demoData.petitions.filter(p => p.status === 'Open').length,
    totalClubs: demoData.clubs.length,
    totalSponsors: demoData.sponsors.length,
    totalIncome,
    totalExpenses,
    balance: totalIncome - totalExpenses,
    pendingReimbursements,
    pendingBudgetRequests,
    totalSponsorship,
  }
}

export async function getRecentActivity() {
  const recentEvents = demoData.events.slice(0, 3).map(e => ({
    type: 'event',
    title: e.title,
    date: e.date,
    status: e.status,
  }))

  const recentPetitions = demoData.petitions.slice(0, 3).map(p => ({
    type: 'petition',
    title: p.title,
    date: p.created_at,
    status: p.status,
  }))

  return [...recentEvents, ...recentPetitions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5)
}

// Admin CRUD operations
export async function createEvent(eventData) {
  const newEvent = {
    id: uuidv4(),
    ...eventData
  }
  demoData.events.push(newEvent)
  return newEvent
}

export async function updateEvent(id, eventData) {
  const index = demoData.events.findIndex(e => e.id === id)
  if (index !== -1) {
    demoData.events[index] = { ...demoData.events[index], ...eventData }
    return demoData.events[index]
  }
  return null
}

export async function deleteEvent(id) {
  const index = demoData.events.findIndex(e => e.id === id)
  if (index !== -1) {
    demoData.events.splice(index, 1)
    return true
  }
  return false
}

export async function createPetition(petitionData) {
  const newPetition = {
    id: uuidv4(),
    ...petitionData
  }
  demoData.petitions.push(newPetition)
  return newPetition
}

export async function updatePetition(id, petitionData) {
  const index = demoData.petitions.findIndex(p => p.id === id)
  if (index !== -1) {
    demoData.petitions[index] = { ...demoData.petitions[index], ...petitionData }
    return demoData.petitions[index]
  }
  return null
}

export async function deletePetition(id) {
  const index = demoData.petitions.findIndex(p => p.id === id)
  if (index !== -1) {
    demoData.petitions.splice(index, 1)
    return true
  }
  return false
}

export async function createComment(commentData) {
  const newComment = {
    id: uuidv4(),
    ...commentData
  }
  const petition = demoData.petitions.find(p => p.id === commentData.petitionId)
  if (petition) {
    if (!petition.comments) {
      petition.comments = []
    }
    petition.comments.push(newComment)
  }
  return newComment
}

export async function getCommentsByPetitionId(petitionId) {
  const petition = demoData.petitions.find(p => p.id === petitionId)
  return petition ? petition.comments : []
}

export async function createClub(clubData) {
  const newClub = {
    id: uuidv4(),
    ...clubData
  }
  demoData.clubs.push(newClub)
  return newClub
}

export async function updateClub(id, clubData) {
  const index = demoData.clubs.findIndex(c => c.id === id)
  if (index !== -1) {
    demoData.clubs[index] = { ...demoData.clubs[index], ...clubData }
    return demoData.clubs[index]
  }
  return null
}

export async function deleteClub(id) {
  const index = demoData.clubs.findIndex(c => c.id === id)
  if (index !== -1) {
    demoData.clubs.splice(index, 1)
    return true
  }
  return false
}

export async function createSponsor(sponsorData) {
  const newSponsor = {
    id: uuidv4(),
    ...sponsorData
  }
  demoData.sponsors.push(newSponsor)
  return newSponsor
}

export async function updateSponsor(id, sponsorData) {
  const index = demoData.sponsors.findIndex(s => s.id === id)
  if (index !== -1) {
    demoData.sponsors[index] = { ...demoData.sponsors[index], ...sponsorData }
    return demoData.sponsors[index]
  }
  return null
}

export async function deleteSponsor(id) {
  const index = demoData.sponsors.findIndex(s => s.id === id)
  if (index !== -1) {
    demoData.sponsors.splice(index, 1)
    return true
  }
  return false
}

export async function togglePetitionSupport(petitionId, userId) {
  return {
    success: true,
    supportAdded: true,
    supporters: 100
  }
}

export async function checkPetitionSupport(petitionId, userId) {
  return false
}

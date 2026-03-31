import { supabase, createServerClient } from './supabase'
import { v4 as uuidv4 } from 'uuid'

// Helper function to handle Supabase responses
function handleResponse(data, error) {
  if (error) {
    console.error('Supabase error:', error)
    return null
  }
  return data
}

export async function getStats() {
  if (!supabase) return {
    events: 0,
    petitions: 0,
    clubs: 0,
    members: 2450,
  }

  const [eventsRes, petitionsRes, clubsRes] = await Promise.all([
    supabase.from('events').select('id').eq('status', 'upcoming'),
    supabase.from('petitions').select('id').in('status', ['Open', 'Under Review']),
    supabase.from('clubs').select('id')
  ])

  return {
    events: handleResponse(eventsRes.data, eventsRes.error)?.length || 0,
    petitions: handleResponse(petitionsRes.data, petitionsRes.error)?.length || 0,
    clubs: handleResponse(clubsRes.data, clubsRes.error)?.length || 0,
    members: 2450,
  }
}

export async function getFeaturedEvents() {
  if (!supabase) return []
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('status', 'upcoming')
    .order('date', { ascending: true })
    .limit(3)
  return handleResponse(data, error) || []
}

export async function getFeaturedPetitions() {
  if (!supabase) return []
  const { data, error } = await supabase
    .from('petitions')
    .select('*')
    .in('status', ['Open', 'Under Review'])
    .order('created_at', { ascending: false })
    .limit(3)
  return handleResponse(data, error) || []
}

export async function getAllEvents() {
  if (!supabase) return []
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('date', { ascending: true })
  return handleResponse(data, error) || []
}

export async function getEventBySlug(slug) {
  if (!supabase) return null
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('slug', slug)
    .single()
  return handleResponse(data, error)
}

export async function getEventById(id) {
  if (!supabase) return null
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .single()
  return handleResponse(data, error)
}

export async function getEventsByCategory(category) {
  if (!supabase) return []
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('category', category)
    .order('date', { ascending: true })
  return handleResponse(data, error) || []
}

export async function getEventsByDate(date) {
  if (!supabase) return []
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('date', date)
  return handleResponse(data, error) || []
}

export async function getEventsForCalendar() {
  if (!supabase) return []
  const { data, error } = await supabase
    .from('events')
    .select('id, title, date, category')
    .order('date', { ascending: true })
  return handleResponse(data, error) || []
}

export async function getAllPetitions() {
  if (!supabase) return []
  const { data, error } = await supabase
    .from('petitions')
    .select('*')
    .order('created_at', { ascending: false })
  return handleResponse(data, error) || []
}

export async function getPetitionBySlug(slug) {
  if (!supabase) return null
  const { data, error } = await supabase
    .from('petitions')
    .select('*')
    .eq('slug', slug)
    .single()
  return handleResponse(data, error)
}

export async function getPetitionById(id) {
  if (!supabase) return null
  const { data, error } = await supabase
    .from('petitions')
    .select('*')
    .eq('id', id)
    .single()
  return handleResponse(data, error)
}

export async function getPetitionsByStatus(status) {
  if (!supabase) return []
  const { data, error } = await supabase
    .from('petitions')
    .select('*')
    .eq('status', status)
    .order('created_at', { ascending: false })
  return handleResponse(data, error) || []
}

export async function getPetitionsByCategory(category) {
  if (!supabase) return []
  const { data, error } = await supabase
    .from('petitions')
    .select('*')
    .eq('category', category)
    .order('created_at', { ascending: false })
  return handleResponse(data, error) || []
}

export async function getAllClubs() {
  if (!supabase) return []
  const { data, error } = await supabase
    .from('clubs')
    .select('*')
    .order('name', { ascending: true })
  return handleResponse(data, error) || []
}

export async function getClubById(id) {
  if (!supabase) return null
  const { data, error } = await supabase
    .from('clubs')
    .select('*')
    .eq('id', id)
    .single()
  return handleResponse(data, error)
}

export async function getClubsByCategory(category) {
  if (!supabase) return []
  const { data, error } = await supabase
    .from('clubs')
    .select('*')
    .eq('category', category)
    .order('name', { ascending: true })
  return handleResponse(data, error) || []
}

export async function getAllSponsors() {
  if (!supabase) return []
  const { data, error } = await supabase
    .from('sponsors')
    .select('*')
    .order('contribution', { ascending: false })
  return handleResponse(data, error) || []
}

export async function getSponsorById(id) {
  if (!supabase) return null
  const { data, error } = await supabase
    .from('sponsors')
    .select('*')
    .eq('id', id)
    .single()
  return handleResponse(data, error)
}

export async function getSponsorsByTier(tier) {
  if (!supabase) return []
  const { data, error } = await supabase
    .from('sponsors')
    .select('*')
    .eq('tier', tier)
    .order('contribution', { ascending: false })
  return handleResponse(data, error) || []
}

export async function getAllFinanceRecords() {
  if (!supabase) return []
  const { data, error } = await supabase
    .from('finance_records')
    .select('*')
    .order('date', { ascending: false })
  return handleResponse(data, error) || []
}

export async function getFinanceRecordById(id) {
  if (!supabase) return null
  const { data, error } = await supabase
    .from('finance_records')
    .select('*')
    .eq('id', id)
    .single()
  return handleResponse(data, error)
}

export async function getAllReimbursements() {
  if (!supabase) return []
  const { data, error } = await supabase
    .from('reimbursements')
    .select('*')
    .order('date', { ascending: false })
  return handleResponse(data, error) || []
}

export async function getReimbursementById(id) {
  if (!supabase) return null
  const { data, error } = await supabase
    .from('reimbursements')
    .select('*')
    .eq('id', id)
    .single()
  return handleResponse(data, error)
}

export async function getAllBudgetRequests() {
  if (!supabase) return []
  const { data, error } = await supabase
    .from('budget_requests')
    .select('*')
    .order('date', { ascending: false })
  return handleResponse(data, error) || []
}

export async function getBudgetRequestById(id) {
  if (!supabase) return null
  const { data, error } = await supabase
    .from('budget_requests')
    .select('*')
    .eq('id', id)
    .single()
  return handleResponse(data, error)
}

export async function getUserById(id) {
  if (!supabase) return null
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single()
  return handleResponse(data, error)
}

export async function getAdminStats() {
  if (!supabase) return {
    totalEvents: 0,
    totalPetitions: 0,
    openPetitions: 0,
    totalClubs: 0,
    totalSponsors: 0,
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0,
    pendingReimbursements: 0,
    pendingBudgetRequests: 0,
    totalSponsorship: 0,
  }

  const [eventsRes, petitionsRes, clubsRes, sponsorsRes, financeRes, reimbursementsRes, budgetRes] = await Promise.all([
    supabase.from('events').select('id'),
    supabase.from('petitions').select('id, status'),
    supabase.from('clubs').select('id'),
    supabase.from('sponsors').select('contribution'),
    supabase.from('finance_records').select('type, amount'),
    supabase.from('reimbursements').select('amount, status').eq('status', 'Pending'),
    supabase.from('budget_requests').select('amount, status').eq('status', 'Pending')
  ])

  const totalIncome = financeRes.data?.filter(f => f.type === 'income').reduce((sum, f) => sum + f.amount, 0) || 0
  const totalExpenses = financeRes.data?.filter(f => f.type === 'expense').reduce((sum, f) => sum + f.amount, 0) || 0
  const pendingReimbursements = reimbursementsRes.data?.reduce((sum, r) => sum + r.amount, 0) || 0
  const pendingBudgetRequests = budgetRes.data?.reduce((sum, b) => sum + b.amount, 0) || 0
  const totalSponsorship = sponsorsRes.data?.reduce((sum, s) => sum + s.contribution, 0) || 0

  return {
    totalEvents: eventsRes.data?.length || 0,
    totalPetitions: petitionsRes.data?.length || 0,
    openPetitions: petitionsRes.data?.filter(p => p.status === 'Open').length || 0,
    totalClubs: clubsRes.data?.length || 0,
    totalSponsors: sponsorsRes.data?.length || 0,
    totalIncome,
    totalExpenses,
    balance: totalIncome - totalExpenses,
    pendingReimbursements,
    pendingBudgetRequests,
    totalSponsorship,
  }
}

export async function getRecentActivity() {
  if (!supabase) return []
  
  const [eventsRes, petitionsRes] = await Promise.all([
    supabase.from('events').select('title, date, status').order('date', { ascending: true }).limit(3),
    supabase.from('petitions').select('title, created_at, status').order('created_at', { ascending: false }).limit(3)
  ])

  const recentEvents = (eventsRes.data || []).map(e => ({
    type: 'event',
    title: e.title,
    date: e.date,
    status: e.status,
  }))

  const recentPetitions = (petitionsRes.data || []).map(p => ({
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
  const serverClient = createServerClient()
  if (!serverClient) return null

  const { data, error } = await serverClient
    .from('events')
    .insert({
      id: uuidv4(),
      ...eventData
    })
    .select()
    .single()

  return handleResponse(data, error)
}

export async function updateEvent(id, eventData) {
  const serverClient = createServerClient()
  if (!serverClient) return null

  const { data, error } = await serverClient
    .from('events')
    .update(eventData)
    .eq('id', id)
    .select()
    .single()

  return handleResponse(data, error)
}

export async function deleteEvent(id) {
  const serverClient = createServerClient()
  if (!serverClient) return false

  const { error } = await serverClient
    .from('events')
    .delete()
    .eq('id', id)

  return !error
}

export async function createPetition(petitionData) {
  const serverClient = createServerClient()
  if (!serverClient) return null

  const { data, error } = await serverClient
    .from('petitions')
    .insert({
      id: uuidv4(),
      ...petitionData
    })
    .select()
    .single()

  return handleResponse(data, error)
}

export async function updatePetition(id, petitionData) {
  const serverClient = createServerClient()
  if (!serverClient) return null

  const { data, error } = await serverClient
    .from('petitions')
    .update(petitionData)
    .eq('id', id)
    .select()
    .single()

  return handleResponse(data, error)
}

export async function deletePetition(id) {
  const serverClient = createServerClient()
  if (!serverClient) return false

  const { error } = await serverClient
    .from('petitions')
    .delete()
    .eq('id', id)

  return !error
}

export async function createComment(commentData) {
  const serverClient = createServerClient()
  if (!serverClient) return null

  const { data, error } = await serverClient
    .from('comments')
    .insert({
      id: uuidv4(),
      ...commentData
    })
    .select()
    .single()

  return handleResponse(data, error)
}

export async function getCommentsByPetitionId(petitionId) {
  if (!supabase) return []
  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .eq('petition_id', petitionId)
    .order('created_at', { ascending: true })
  return handleResponse(data, error) || []
}

export async function createClub(clubData) {
  const serverClient = createServerClient()
  if (!serverClient) return null

  const { data, error } = await serverClient
    .from('clubs')
    .insert({
      id: uuidv4(),
      ...clubData
    })
    .select()
    .single()

  return handleResponse(data, error)
}

export async function updateClub(id, clubData) {
  const serverClient = createServerClient()
  if (!serverClient) return null

  const { data, error } = await serverClient
    .from('clubs')
    .update(clubData)
    .eq('id', id)
    .select()
    .single()

  return handleResponse(data, error)
}

export async function deleteClub(id) {
  const serverClient = createServerClient()
  if (!serverClient) return false

  const { error } = await serverClient
    .from('clubs')
    .delete()
    .eq('id', id)

  return !error
}

export async function createSponsor(sponsorData) {
  const serverClient = createServerClient()
  if (!serverClient) return null

  const { data, error } = await serverClient
    .from('sponsors')
    .insert({
      id: uuidv4(),
      ...sponsorData
    })
    .select()
    .single()

  return handleResponse(data, error)
}

export async function updateSponsor(id, sponsorData) {
  const serverClient = createServerClient()
  if (!serverClient) return null

  const { data, error } = await serverClient
    .from('sponsors')
    .update(sponsorData)
    .eq('id', id)
    .select()
    .single()

  return handleResponse(data, error)
}

export async function deleteSponsor(id) {
  const serverClient = createServerClient()
  if (!serverClient) return false

  const { error } = await serverClient
    .from('sponsors')
    .delete()
    .eq('id', id)

  return !error
}

export async function togglePetitionSupport(petitionId, userId) {
  const serverClient = createServerClient()
  if (!serverClient) return null

  // Check if user already supported
  const { data: existingSupport } = await serverClient
    .from('petition_supports')
    .select('id')
    .eq('petition_id', petitionId)
    .eq('user_id', userId)
    .single()

  let supportAdded = false
  if (existingSupport) {
    // Remove support
    await serverClient
      .from('petition_supports')
      .delete()
      .eq('id', existingSupport.id)
    
    // Decrement supporter count
    await serverClient
      .from('petitions')
      .update({ supporters: serverClient.raw('supporters - 1') })
      .eq('id', petitionId)
  } else {
    // Add support
    await serverClient
      .from('petition_supports')
      .insert({
        petition_id: petitionId,
        user_id: userId
      })
    
    // Increment supporter count
    await serverClient
      .from('petitions')
      .update({ supporters: serverClient.raw('supporters + 1') })
      .eq('id', petitionId)
    
    supportAdded = true
  }

  // Get updated petition
  const { data: updatedPetition } = await serverClient
    .from('petitions')
    .select('supporters')
    .eq('id', petitionId)
    .single()

  return {
    success: true,
    supportAdded,
    supporters: updatedPetition?.supporters || 0
  }
}

export async function checkPetitionSupport(petitionId, userId) {
  if (!supabase) return false
  const { data, error } = await supabase
    .from('petition_supports')
    .select('id')
    .eq('petition_id', petitionId)
    .eq('user_id', userId)
    .single()
  return !!handleResponse(data, error)
}

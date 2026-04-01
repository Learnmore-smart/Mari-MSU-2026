import { db } from './firebase-admin';
import { v4 as uuidv4 } from 'uuid';

export async function getStats() {
  const [eventsSnap, petitionsSnap, clubsSnap] = await Promise.all([
    db.collection('events').count().get(),
    db.collection('petitions').count().get(),
    db.collection('clubs').count().get(),
  ]);

  return {
    events: eventsSnap.data().count,
    petitions: petitionsSnap.data().count,
    clubs: clubsSnap.data().count,
    members: 2450,
  };
}

export async function getFeaturedEvents() {
  const snapshot = await db.collection('events').limit(3).get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getFeaturedPetitions() {
  const snapshot = await db.collection('petitions').limit(3).get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getAllEvents() {
  const snapshot = await db.collection('events').get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getEventBySlug(slug) {
  const snapshot = await db.collection('events').where('slug', '==', slug).limit(1).get();
  if (snapshot.empty) return null;
  return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
}

export async function getEventById(id) {
  const docRef = await db.collection('events').doc(id).get();
  if (!docRef.exists) return null;
  return { id: docRef.id, ...docRef.data() };
}

export async function getEventsByCategory(category) {
  const snapshot = await db.collection('events').where('category', '==', category).get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getEventsByDate(date) {
  const snapshot = await db.collection('events').where('date', '==', date).get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getEventsForCalendar() {
  const snapshot = await db.collection('events').select('id', 'title', 'date', 'category').get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getAllPetitions() {
  const snapshot = await db.collection('petitions').get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getPetitionBySlug(slug) {
  const snapshot = await db.collection('petitions').where('slug', '==', slug).limit(1).get();
  if (snapshot.empty) return null;
  return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
}

export async function getPetitionById(id) {
  const docRef = await db.collection('petitions').doc(id).get();
  if (!docRef.exists) return null;
  return { id: docRef.id, ...docRef.data() };
}

export async function getPetitionsByStatus(status) {
  const snapshot = await db.collection('petitions').where('status', '==', status).get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getPetitionsByCategory(category) {
  const snapshot = await db.collection('petitions').where('category', '==', category).get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getAllClubs() {
  const snapshot = await db.collection('clubs').get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getClubById(id) {
  const docRef = await db.collection('clubs').doc(id).get();
  if (!docRef.exists) return null;
  return { id: docRef.id, ...docRef.data() };
}

export async function getClubsByCategory(category) {
  const snapshot = await db.collection('clubs').where('category', '==', category).get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getAllSponsors() {
  const snapshot = await db.collection('sponsors').get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getSponsorById(id) {
  const docRef = await db.collection('sponsors').doc(id).get();
  if (!docRef.exists) return null;
  return { id: docRef.id, ...docRef.data() };
}

export async function getSponsorsByTier(tier) {
  const snapshot = await db.collection('sponsors').where('tier', '==', tier).get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getAllFinanceRecords() {
  const snapshot = await db.collection('financeRecords').get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getFinanceRecordById(id) {
  const docRef = await db.collection('financeRecords').doc(id).get();
  if (!docRef.exists) return null;
  return { id: docRef.id, ...docRef.data() };
}

export async function getAllReimbursements() {
  const snapshot = await db.collection('reimbursements').get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getReimbursementById(id) {
  const docRef = await db.collection('reimbursements').doc(id).get();
  if (!docRef.exists) return null;
  return { id: docRef.id, ...docRef.data() };
}

export async function getAllBudgetRequests() {
  const snapshot = await db.collection('budgetRequests').get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getBudgetRequestById(id) {
  const docRef = await db.collection('budgetRequests').doc(id).get();
  if (!docRef.exists) return null;
  return { id: docRef.id, ...docRef.data() };
}

export async function getUserById(id) {
  const docRef = await db.collection('users').doc(id).get();
  if (!docRef.exists) return null;
  return { id: docRef.id, ...docRef.data() };
}

export async function getAdminStats() {
  const [
    eventsSnap,
    petitionsSnap,
    openPetitionsSnap,
    clubsSnap,
    sponsorsSnap,
    financeRecordsSnap,
    reimbursementsSnap,
    budgetRequestsSnap
  ] = await Promise.all([
    db.collection('events').count().get(),
    db.collection('petitions').count().get(),
    db.collection('petitions').where('status', '==', 'Open').count().get(),
    db.collection('clubs').count().get(),
    db.collection('sponsors').get(),
    db.collection('financeRecords').get(),
    db.collection('reimbursements').where('status', '==', 'Pending').get(),
    db.collection('budgetRequests').where('status', '==', 'Pending').get(),
  ]);

  const totalIncome = financeRecordsSnap.docs
    .filter(doc => doc.data().type === 'income')
    .reduce((sum, doc) => sum + doc.data().amount, 0);
  
  const totalExpenses = financeRecordsSnap.docs
    .filter(doc => doc.data().type === 'expense')
    .reduce((sum, doc) => sum + doc.data().amount, 0);

  const pendingReimbursements = reimbursementsSnap.docs.reduce((sum, doc) => sum + doc.data().amount, 0);
  const pendingBudgetRequests = budgetRequestsSnap.docs.reduce((sum, doc) => sum + doc.data().amount, 0);
  const totalSponsorship = sponsorsSnap.docs.reduce((sum, doc) => sum + doc.data().contribution, 0);

  return {
    totalEvents: eventsSnap.data().count,
    totalPetitions: petitionsSnap.data().count,
    openPetitions: openPetitionsSnap.data().count,
    totalClubs: clubsSnap.data().count,
    totalSponsors: sponsorsSnap.size,
    totalIncome,
    totalExpenses,
    balance: totalIncome - totalExpenses,
    pendingReimbursements,
    pendingBudgetRequests,
    totalSponsorship,
  };
}

export async function getRecentActivity() {
  const [eventsSnap, petitionsSnap] = await Promise.all([
    db.collection('events').limit(3).get(),
    db.collection('petitions').limit(3).get(),
  ]);

  const recentEvents = eventsSnap.docs.map(doc => ({
    type: 'event',
    title: doc.data().title,
    date: doc.data().date,
    status: doc.data().status,
  }));

  const recentPetitions = petitionsSnap.docs.map(doc => ({
    type: 'petition',
    title: doc.data().title,
    date: doc.data().createdAt,
    status: doc.data().status,
  }));

  return [...recentEvents, ...recentPetitions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);
}

export async function createEvent(eventData) {
  const docRef = await db.collection('events').add({
    id: uuidv4(),
    ...eventData
  });
  const doc = await docRef.get();
  return { id: doc.id, ...doc.data() };
}

export async function updateEvent(id, eventData) {
  const docRef = db.collection('events').doc(id);
  await docRef.update(eventData);
  const doc = await docRef.get();
  return { id: doc.id, ...doc.data() };
}

export async function deleteEvent(id) {
  await db.collection('events').doc(id).delete();
  return true;
}

export async function createPetition(petitionData) {
  const docRef = await db.collection('petitions').add({
    id: uuidv4(),
    comments: [],
    ...petitionData
  });
  const doc = await docRef.get();
  return { id: doc.id, ...doc.data() };
}

export async function updatePetition(id, petitionData) {
  const docRef = db.collection('petitions').doc(id);
  await docRef.update(petitionData);
  const doc = await docRef.get();
  return { id: doc.id, ...doc.data() };
}

export async function deletePetition(id) {
  await db.collection('petitions').doc(id).delete();
  return true;
}

export async function createComment(commentData) {
  const petitionRef = db.collection('petitions').doc(commentData.petitionId);
  const petitionDoc = await petitionRef.get();
  if (!petitionDoc.exists) return null;

  const newComment = {
    id: uuidv4(),
    ...commentData
  };

  await petitionRef.update({
    comments: [...(petitionDoc.data().comments || []), newComment]
  });

  return newComment;
}

export async function getCommentsByPetitionId(petitionId) {
  const docRef = await db.collection('petitions').doc(petitionId).get();
  if (!docRef.exists) return [];
  return docRef.data().comments || [];
}

export async function createClub(clubData) {
  const docRef = await db.collection('clubs').add({
    id: uuidv4(),
    ...clubData
  });
  const doc = await docRef.get();
  return { id: doc.id, ...doc.data() };
}

export async function updateClub(id, clubData) {
  const docRef = db.collection('clubs').doc(id);
  await docRef.update(clubData);
  const doc = await docRef.get();
  return { id: doc.id, ...doc.data() };
}

export async function deleteClub(id) {
  await db.collection('clubs').doc(id).delete();
  return true;
}

export async function createSponsor(sponsorData) {
  const docRef = await db.collection('sponsors').add({
    id: uuidv4(),
    ...sponsorData
  });
  const doc = await docRef.get();
  return { id: doc.id, ...doc.data() };
}

export async function updateSponsor(id, sponsorData) {
  const docRef = db.collection('sponsors').doc(id);
  await docRef.update(sponsorData);
  const doc = await docRef.get();
  return { id: doc.id, ...doc.data() };
}

export async function deleteSponsor(id) {
  await db.collection('sponsors').doc(id).delete();
  return true;
}

export async function togglePetitionSupport(petitionId, userId) {
  const petitionRef = db.collection('petitions').doc(petitionId);
  const petitionDoc = await petitionRef.get();
  if (!petitionDoc.exists) return { success: false };

  const supportersRef = petitionRef.collection('supporters');
  const userSupportDoc = await supportersRef.doc(userId).get();

  let supportAdded;
  let newSupportersCount;

  if (userSupportDoc.exists) {
    await supportersRef.doc(userId).delete();
    supportAdded = false;
    newSupportersCount = petitionDoc.data().supporters - 1;
  } else {
    await supportersRef.doc(userId).set({
      userId,
      supportedAt: new Date().toISOString()
    });
    supportAdded = true;
    newSupportersCount = petitionDoc.data().supporters + 1;
  }

  await petitionRef.update({ supporters: newSupportersCount });

  return {
    success: true,
    supportAdded,
    supporters: newSupportersCount
  };
}

export async function checkPetitionSupport(petitionId, userId) {
  const supporterDoc = await db.collection('petitions').doc(petitionId).collection('supporters').doc(userId).get();
  return supporterDoc.exists;
}

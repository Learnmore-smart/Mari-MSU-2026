import { db } from './firebase-admin';
import { v4 as uuidv4 } from 'uuid';
import * as demoData from './demo-data';

function isFirebaseConfigured() {
  return db !== null;
}

export async function getStats() {
  if (!isFirebaseConfigured()) {
    return {
      events: demoData.events.length,
      petitions: demoData.petitions.length,
      clubs: demoData.clubs.length,
      members: 2450,
    };
  }

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
  if (!isFirebaseConfigured()) {
    return demoData.events.slice(0, 3);
  }
  const snapshot = await db.collection('events').limit(3).get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getFeaturedPetitions() {
  if (!isFirebaseConfigured()) {
    return demoData.petitions.slice(0, 3);
  }
  const snapshot = await db.collection('petitions').limit(3).get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getAllEvents() {
  if (!isFirebaseConfigured()) {
    return demoData.events;
  }
  const snapshot = await db.collection('events').get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getEventBySlug(slug) {
  if (!isFirebaseConfigured()) {
    return demoData.events.find(e => e.slug === slug) || null;
  }
  const snapshot = await db.collection('events').where('slug', '==', slug).limit(1).get();
  if (snapshot.empty) return null;
  return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
}

export async function getEventById(id) {
  if (!isFirebaseConfigured()) {
    return demoData.events.find(e => e.id === id) || null;
  }
  const docRef = await db.collection('events').doc(id).get();
  if (!docRef.exists) return null;
  return { id: docRef.id, ...docRef.data() };
}

export async function getEventsByCategory(category) {
  if (!isFirebaseConfigured()) {
    return demoData.events.filter(e => e.category === category);
  }
  const snapshot = await db.collection('events').where('category', '==', category).get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getEventsByDate(date) {
  if (!isFirebaseConfigured()) {
    return demoData.events.filter(e => e.date === date);
  }
  const snapshot = await db.collection('events').where('date', '==', date).get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getEventsForCalendar() {
  if (!isFirebaseConfigured()) {
    return demoData.events.map(({ id, title, date, category }) => ({ id, title, date, category }));
  }
  const snapshot = await db.collection('events').select('id', 'title', 'date', 'category').get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getAllPetitions() {
  if (!isFirebaseConfigured()) {
    return demoData.petitions;
  }
  const snapshot = await db.collection('petitions').get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getPetitionBySlug(slug) {
  if (!isFirebaseConfigured()) {
    return demoData.petitions.find(p => p.slug === slug) || null;
  }
  const snapshot = await db.collection('petitions').where('slug', '==', slug).limit(1).get();
  if (snapshot.empty) return null;
  return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
}

export async function getPetitionById(id) {
  if (!isFirebaseConfigured()) {
    return demoData.petitions.find(p => p.id === id) || null;
  }
  const docRef = await db.collection('petitions').doc(id).get();
  if (!docRef.exists) return null;
  return { id: docRef.id, ...docRef.data() };
}

export async function getPetitionsByStatus(status) {
  if (!isFirebaseConfigured()) {
    return demoData.petitions.filter(p => p.status === status);
  }
  const snapshot = await db.collection('petitions').where('status', '==', status).get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getPetitionsByCategory(category) {
  if (!isFirebaseConfigured()) {
    return demoData.petitions.filter(p => p.category === category);
  }
  const snapshot = await db.collection('petitions').where('category', '==', category).get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getAllClubs() {
  if (!isFirebaseConfigured()) {
    return demoData.clubs;
  }
  const snapshot = await db.collection('clubs').get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getClubById(id) {
  if (!isFirebaseConfigured()) {
    return demoData.clubs.find(c => c.id === id) || null;
  }
  const docRef = await db.collection('clubs').doc(id).get();
  if (!docRef.exists) return null;
  return { id: docRef.id, ...docRef.data() };
}

export async function getClubsByCategory(category) {
  if (!isFirebaseConfigured()) {
    return demoData.clubs.filter(c => c.category === category);
  }
  const snapshot = await db.collection('clubs').where('category', '==', category).get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getAllSponsors() {
  if (!isFirebaseConfigured()) {
    return demoData.sponsors;
  }
  const snapshot = await db.collection('sponsors').get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getSponsorById(id) {
  if (!isFirebaseConfigured()) {
    return demoData.sponsors.find(s => s.id === id) || null;
  }
  const docRef = await db.collection('sponsors').doc(id).get();
  if (!docRef.exists) return null;
  return { id: docRef.id, ...docRef.data() };
}

export async function getSponsorsByTier(tier) {
  if (!isFirebaseConfigured()) {
    return demoData.sponsors.filter(s => s.tier === tier);
  }
  const snapshot = await db.collection('sponsors').where('tier', '==', tier).get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getAllFinanceRecords() {
  if (!isFirebaseConfigured()) {
    return demoData.financeRecords;
  }
  const snapshot = await db.collection('financeRecords').get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getFinanceRecordById(id) {
  if (!isFirebaseConfigured()) {
    return demoData.financeRecords.find(f => f.id === id) || null;
  }
  const docRef = await db.collection('financeRecords').doc(id).get();
  if (!docRef.exists) return null;
  return { id: docRef.id, ...docRef.data() };
}

export async function getAllReimbursements() {
  if (!isFirebaseConfigured()) {
    return demoData.reimbursements;
  }
  const snapshot = await db.collection('reimbursements').get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getReimbursementById(id) {
  if (!isFirebaseConfigured()) {
    return demoData.reimbursements.find(r => r.id === id) || null;
  }
  const docRef = await db.collection('reimbursements').doc(id).get();
  if (!docRef.exists) return null;
  return { id: docRef.id, ...docRef.data() };
}

export async function getAllBudgetRequests() {
  if (!isFirebaseConfigured()) {
    return demoData.budgetRequests;
  }
  const snapshot = await db.collection('budgetRequests').get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getBudgetRequestById(id) {
  if (!isFirebaseConfigured()) {
    return demoData.budgetRequests.find(b => b.id === id) || null;
  }
  const docRef = await db.collection('budgetRequests').doc(id).get();
  if (!docRef.exists) return null;
  return { id: docRef.id, ...docRef.data() };
}

export async function getUserById(id) {
  if (!isFirebaseConfigured()) {
    return demoData.users.find(u => u.id === id) || null;
  }
  const docRef = await db.collection('users').doc(id).get();
  if (!docRef.exists) return null;
  return { id: docRef.id, ...docRef.data() };
}

export async function getAdminStats() {
  if (!isFirebaseConfigured()) {
    const totalIncome = demoData.financeRecords
      .filter(r => r.type === 'income')
      .reduce((sum, r) => sum + r.amount, 0);
    const totalExpenses = demoData.financeRecords
      .filter(r => r.type === 'expense')
      .reduce((sum, r) => sum + r.amount, 0);
    const pendingReimbursements = demoData.reimbursements
      .filter(r => r.status === 'Pending')
      .reduce((sum, r) => sum + r.amount, 0);
    const pendingBudgetRequests = demoData.budgetRequests
      .filter(r => r.status === 'Pending')
      .reduce((sum, r) => sum + r.amount, 0);
    const totalSponsorship = demoData.sponsors.reduce((sum, s) => sum + s.contribution, 0);

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
    };
  }

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
  if (!isFirebaseConfigured()) {
    const recentEvents = demoData.events.slice(0, 3).map(e => ({
      type: 'event',
      title: e.title,
      date: e.date,
      status: e.status,
    }));
    const recentPetitions = demoData.petitions.slice(0, 3).map(p => ({
      type: 'petition',
      title: p.title,
      date: p.createdAt,
      status: p.status,
    }));
    return [...recentEvents, ...recentPetitions]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);
  }

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
  if (!isFirebaseConfigured()) {
    console.warn('Firebase not configured: createEvent is not available');
    return null;
  }
  const docRef = await db.collection('events').add({
    id: uuidv4(),
    ...eventData
  });
  const doc = await docRef.get();
  return { id: doc.id, ...doc.data() };
}

export async function updateEvent(id, eventData) {
  if (!isFirebaseConfigured()) {
    console.warn('Firebase not configured: updateEvent is not available');
    return null;
  }
  const docRef = db.collection('events').doc(id);
  await docRef.update(eventData);
  const doc = await docRef.get();
  return { id: doc.id, ...doc.data() };
}

export async function deleteEvent(id) {
  if (!isFirebaseConfigured()) {
    console.warn('Firebase not configured: deleteEvent is not available');
    return false;
  }
  await db.collection('events').doc(id).delete();
  return true;
}

export async function createPetition(petitionData) {
  if (!isFirebaseConfigured()) {
    console.warn('Firebase not configured: createPetition is not available');
    return null;
  }
  const docRef = await db.collection('petitions').add({
    id: uuidv4(),
    comments: [],
    ...petitionData
  });
  const doc = await docRef.get();
  return { id: doc.id, ...doc.data() };
}

export async function updatePetition(id, petitionData) {
  if (!isFirebaseConfigured()) {
    console.warn('Firebase not configured: updatePetition is not available');
    return null;
  }
  const docRef = db.collection('petitions').doc(id);
  await docRef.update(petitionData);
  const doc = await docRef.get();
  return { id: doc.id, ...doc.data() };
}

export async function deletePetition(id) {
  if (!isFirebaseConfigured()) {
    console.warn('Firebase not configured: deletePetition is not available');
    return false;
  }
  await db.collection('petitions').doc(id).delete();
  return true;
}

export async function createComment(commentData) {
  if (!isFirebaseConfigured()) {
    console.warn('Firebase not configured: createComment is not available');
    return null;
  }
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
  if (!isFirebaseConfigured()) {
    const petition = demoData.petitions.find(p => p.id === petitionId);
    return petition?.comments || [];
  }
  const docRef = await db.collection('petitions').doc(petitionId).get();
  if (!docRef.exists) return [];
  return docRef.data().comments || [];
}

export async function createClub(clubData) {
  if (!isFirebaseConfigured()) {
    console.warn('Firebase not configured: createClub is not available');
    return null;
  }
  const docRef = await db.collection('clubs').add({
    id: uuidv4(),
    ...clubData
  });
  const doc = await docRef.get();
  return { id: doc.id, ...doc.data() };
}

export async function updateClub(id, clubData) {
  if (!isFirebaseConfigured()) {
    console.warn('Firebase not configured: updateClub is not available');
    return null;
  }
  const docRef = db.collection('clubs').doc(id);
  await docRef.update(clubData);
  const doc = await docRef.get();
  return { id: doc.id, ...doc.data() };
}

export async function deleteClub(id) {
  if (!isFirebaseConfigured()) {
    console.warn('Firebase not configured: deleteClub is not available');
    return false;
  }
  await db.collection('clubs').doc(id).delete();
  return true;
}

export async function createSponsor(sponsorData) {
  if (!isFirebaseConfigured()) {
    console.warn('Firebase not configured: createSponsor is not available');
    return null;
  }
  const docRef = await db.collection('sponsors').add({
    id: uuidv4(),
    ...sponsorData
  });
  const doc = await docRef.get();
  return { id: doc.id, ...doc.data() };
}

export async function updateSponsor(id, sponsorData) {
  if (!isFirebaseConfigured()) {
    console.warn('Firebase not configured: updateSponsor is not available');
    return null;
  }
  const docRef = db.collection('sponsors').doc(id);
  await docRef.update(sponsorData);
  const doc = await docRef.get();
  return { id: doc.id, ...doc.data() };
}

export async function deleteSponsor(id) {
  if (!isFirebaseConfigured()) {
    console.warn('Firebase not configured: deleteSponsor is not available');
    return false;
  }
  await db.collection('sponsors').doc(id).delete();
  return true;
}

export async function togglePetitionSupport(petitionId, userId) {
  if (!isFirebaseConfigured()) {
    console.warn('Firebase not configured: togglePetitionSupport is not available');
    return { success: false };
  }
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
  if (!isFirebaseConfigured()) {
    return false;
  }
  const supporterDoc = await db.collection('petitions').doc(petitionId).collection('supporters').doc(userId).get();
  return supporterDoc.exists;
}

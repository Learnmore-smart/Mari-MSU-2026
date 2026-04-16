import admin from 'firebase-admin';

let db = null;
let auth = null;

if (!admin.apps.length) {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (projectId && clientEmail && privateKey) {
    const serviceAccount = {
      project_id: projectId,
      client_email: clientEmail,
      private_key: privateKey,
    };

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });

    db = admin.firestore();
    auth = admin.auth();
  } else {
    console.warn('Firebase Admin SDK not initialized: missing environment variables');
  }
}

export { admin, db, auth };

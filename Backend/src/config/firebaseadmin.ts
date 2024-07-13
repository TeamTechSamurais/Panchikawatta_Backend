import admin from 'firebase-admin';

import serviceAccount from 'C:/Project_Backend/Panchikawatta_Backend/panchikawatta-d9e2e-firebase-adminsdk-42fm8-d6a3dbf461.json';
// Path to your Firebase service account key JSON file

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: serviceAccount.project_id,
});

module.exports = admin;
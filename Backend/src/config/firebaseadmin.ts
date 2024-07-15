import admin from 'firebase-admin';

import serviceAccount from 'C:/Users/Shehara Fernando/OneDrive/Desktop/Panchikawatta/Backend/Panchikawatta_Backend/Backend/panchikawatta-d9e2e-firebase-adminsdk-42fm8-e29b1feb43.json';
// Path to your Firebase service account key JSON file

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  projectId: serviceAccount.project_id,
});

module.exports = admin;

export { admin };

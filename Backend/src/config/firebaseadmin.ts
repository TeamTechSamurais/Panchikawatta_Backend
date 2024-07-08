const admin = require('firebase-admin');

const serviceAccount = require('C:/Users/USER/Desktop/fltr/Panchikawatta_Backend/panchikawatta-d9e2e-firebase-adminsdk-42fm8-d6a3dbf461');
// Path to your Firebase service account key JSON file

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: serviceAccount.project_id,
});

module.exports = admin;

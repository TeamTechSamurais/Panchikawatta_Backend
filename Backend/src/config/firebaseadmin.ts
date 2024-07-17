import admin from 'firebase-admin';
import * as serviceAccount from '../../panchikawatta-d9e2e-firebase-adminsdk-42fm8-90e73f05c7.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  projectId: serviceAccount.project_id,
});

export { admin };

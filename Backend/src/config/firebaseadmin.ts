import admin from 'firebase-admin';
import * as serviceAccount from '../../panchikawatta-d9e2e-firebase-adminsdk-42fm8-e29b1feb43.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  projectId: serviceAccount.project_id,
});

export { admin };
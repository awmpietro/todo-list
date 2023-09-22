const admin = require('firebase-admin');

const serviceAccount = require('./credentials/firestore-prod.json');

admin.initializeApp({
   credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

module.exports = db;

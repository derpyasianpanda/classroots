const admin = require("firebase-admin");

const serviceAccount = require("./classroots-58836-firebase-adminsdk-xq8cd-3e5c6c844f.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = db;
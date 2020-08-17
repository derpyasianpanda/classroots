const admin = require("firebase-admin");

admin.initializeApp({
    credential: admin.credential.cert({
        // For Firebase private keys, you need to sanitize the \n inputs
        private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
        project_id: process.env.FIREBASE_PROJECT_ID
    }),
    databaseURL: "https://classroots-hack20.firebaseio.com"
});

const db = admin.firestore();

module.exports = db;
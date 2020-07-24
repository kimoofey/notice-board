const admin = require('firebase-admin');
let serviceAccount = {};

if (process.env.NODE_ENV === 'production') {
    serviceAccount = process.env.FIREBASEACCOUNTKEY;
} else {
    serviceAccount = require('./serviceAccountKey.json');
}


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://testing-chat-10f25.firebaseio.com',
});

module.exports = admin;
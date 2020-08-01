const express = require('express');
const router = express.Router();
const firebase = require('../../config/firebaseDatabase');
const db = firebase.firestore();
db.settings({ ignoreUndefinedProperties: true });
const userCollection = 'users';

/* Get all users */
router.get('/', async (req, res) => {
    try {
        const userQuerySnapshot = await db.collection(userCollection).get();
        const users = [];
        userQuerySnapshot.forEach((doc) => {
            users.push(doc);
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).send(error);
    }
});

/* Create user */
router.post('/', async (req, res) => {
    try {
        const { query: { email, password } } = req;
        const userRecord = await firebase.auth().createUser({
            email,
            password,
        });
        const docRef = db.collection(userCollection).doc();
        await docRef.set({
            name: '',
            id: userRecord.uid,
            email,
            password,
            URL: '',
            description: '',
            messages: [],
        });
        res.status(200).json({
            uid: userRecord.uid,
            email: userRecord.uid,
            email_verified: userRecord.emailVerified,
            disabled: userRecord.disabled,
            docID: docRef.id,
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

/* Update user */
router.put('/', async (req, res) => {
    try {
        const userRecord = await firebase.auth().getUser(req.body.userId);
        const docRef = db.collection(userCollection).doc(req.body.docId);
        //need to check if values not undefined
        const response = await docRef.update({
            name: req.body.name,
            URL: req.body.url,
            description: req.body.description,
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
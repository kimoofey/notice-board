const express = require('express');
const router = express.Router();
const fb = require('../../config/firebaseDatabase');
const db = fb.firestore();
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
        const result = await fb.auth().createUser({
            email,
            password,
        });
        const docRef = db.collection(userCollection).doc();
        await docRef.set({
            name: '',
            id: result.uid,
            email,
            password,
            URL: '',
            description: '',
            messages: [],
        });
        res.status(200).json();
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
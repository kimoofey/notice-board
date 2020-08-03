const express = require('express');
const router = express.Router();
const firebase = require('../../config/firebase');
const admin = require('../../config/firebaseDatabase');
const storage = require('../../config/firebaseStorage');
const db = admin.firestore();
db.settings({ ignoreUndefinedProperties: true });
const userCollection = 'users';

/* Get all users */
router.get('/', async (req, res) => {
    try {
        const userQuerySnapshot = await db.collection(userCollection).get();
        const users = [];
        userQuerySnapshot.forEach((doc) => {
            users.push({ ...doc.data(), docId: doc.id });
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).send(error);
    }
});

/* Create user */
router.post('/', async (req, res) => {
    try {
        const { body: { email, password, nickname } } = req;
        const userRecord = await admin.auth().createUser({
            email,
            password,
        });
        const docRef = db.collection(userCollection).doc();
        await docRef.set({
            name: nickname,
            id: userRecord.uid,
            email,
            password,
            URL: '',
            description: '',
            messages: [],
        });
        res.status(200).json({
            id: userRecord.uid,
            name: nickname,
            email: email,
            password: password,
            URL: '',
            description: '',
            docId: docRef.id,
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

/* Update user */
router.put('/', async (req, res) => {
    try {
        const userRecord = await admin.auth().getUser(req.body.userId);
        const docRef = db.collection(userCollection).doc(req.body.docId);
        const data = {};
        if (req.body.name) {
            data.name = req.body.name;
        }
        if (req.body.url) {
            data.url = req.body.url;
        }
        if (req.body.description) {
            data.description = req.body.description;
        }
        //need to check if values not undefined
        const response = await docRef.update(data);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).send(error);
    }
});

/* Update user's messages */
router.put('/messages', async (req, res) => {
    try {
        const docRef = db.collection(userCollection).doc(req.body.docId);
        const response = await docRef.update({
            messages: req.body.messages,
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).send(error);
    }
});

/* Get user's messages */
router.get('/messages', async (req, res) => {
    try {
        let messages = [];
        db.collection(userCollection).doc(req.query.docId).get()
            .then((doc) => {
                doc.data().messages.map((item) => {
                    messages.push({
                        notificationId: item.notificationId,
                        number: item.number,
                    });
                });
            });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post('/auth', async (req, res) => {
    try {
        const { body } = req;
        const result = await firebase.auth().signInWithEmailAndPassword(body.email, body.password);
        const user = await admin.firestore().collection('users')
            .where('id', '==', result.user.uid)
            .get()
            .then((result) => {
                const response = [];
                result.forEach((doc) => {
                    response.push({ ...doc.data(), docId: doc.id });
                });
                return response;
            });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
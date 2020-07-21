const express = require('express');
const router = express.Router();
const fb = require('../../config/direbaseDatabase');
const db = fb.firestore();
const userCollection = 'users';

router.get('/accounts', async (req, res) => {
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

module.exports = router;
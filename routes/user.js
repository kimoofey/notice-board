const express = require('express');

const router = express.Router();

router.get('/:userId(\\d+)', (req, res) => {
    res.json({
        id: 1,
        username: 'testData01',
    });
});

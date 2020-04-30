const express = require('express');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
    // res.send('respond with a resource');
    res.json([{
        id: 1,
        username: 'testData01',
    }, {
        id: 2,
        username: 'Everything works well. Congrats!',
    }]);
});

module.exports = router;

const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
    // res.send('respond with a resource');
    res.json([{
        id: 1,
        title: "Item 1"
    }, {
        id: 2,
        title: "Item 2"
    }, {
        id: 3,
        title: "Item 3"
    }
    ]);
});

module.exports = router;

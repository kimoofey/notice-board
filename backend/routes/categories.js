const express = require('express');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
    // res.send('respond with a resource');
    res.json([{
        id: 1,
        title: 'Item 1',
        img: 'https://via.placeholder.com/250?text=Pretty-image-id-1',
    }, {
        id: 2,
        title: 'Item 2',
        img: 'https://via.placeholder.com/250?text=Pretty-image-id-2',
    }, {
        id: 3,
        title: 'Item 3',
        img: 'https://via.placeholder.com/250?text=Pretty-image-id-3',
    },
    ]);
});

module.exports = router;

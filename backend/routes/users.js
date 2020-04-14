var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/*', function (req, res, next) {
    // res.send('respond with a resource');
    res.json([{
        id: 1,
        username: "testData01"
    }, {
        id: 2,
        username: "Everything works well. Congrats!"
    }]);
});

module.exports = router;

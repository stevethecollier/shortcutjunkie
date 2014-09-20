var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (shortcuts){
    return function(req, res) {
        res.send(shortcuts);
    };
});

module.exports = router;

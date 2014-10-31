var express = require('express');
var router = express.Router();

//Set up Mongo
var Mongoose = require('mongoose');
var db = Mongoose.createConnection('localhost', 'mytestapp');

var User = require('../../models/User.js').User(db);

var authentication = require('../authentication.js');

router.use('/secure', authentication);

/* POST new shortcut. listing */
router.post('/secure', function(req, res) {
    User.find({
        user_id: req.body.user_id
    }, function(error, usersFound) {
        if (usersFound.length == 0) {
            var newUser = new User({});
            newUser.user_id = req.body.user_id;
            newUser.votes = [];
            newUser.save(function(error, newUser) {
                if (error || !newUser) {
                    res.json({
                        error: error
                    });
                } else {
                    res.send(newUser);
                }
            });
        } else {
            res.send();
        }
    });
});

/* GET all shortcut listings. */
router.get('/', function(req, res) {
    User.find({}, function(error, users) {
        res.send({
            users: users
        });
    });
});

router.delete('/', function(req, res){
    User.remove({}, function(error){
        res.send();
    });
})
module.exports = router;
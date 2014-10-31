var express = require('express');
var router = express.Router();

//Set up Mongo
var Mongoose = require('mongoose');
var db = Mongoose.createConnection('localhost', 'mytestapp');

var userDAO = require('../dao/userDAO.js');

var authentication = require('../authentication.js');

//router.use('/secure', authentication);

/* POST new shortcut. listing */
router.post('/', function(req, res) {
    userDAO.save(req.body).then(function(newVote) {
        res.send(newVote)
    });
});

/* GET all vote listings. */
router.get('/', function(req, res) {
    userDAO.findAll().then(function(users) {
        res.send({
            users: users
        });
    }, function(error){
        console.log('error');
    });
});

router.delete('/', function(req, res){
    User.remove({}, function(error){
        res.send();
    });
})
module.exports = router;
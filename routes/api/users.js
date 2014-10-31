var express = require('express');
var router = express.Router();

//Set up Mongo
var Mongoose = require('mongoose');
var db = Mongoose.createConnection('localhost', 'mytestapp');

var userDAO = require('../dao/userDAO.js');

var authentication = require('../authentication.js');

//router.use('/secure', authentication);

/* POST new user. listing */
router.post('/', function(req, res) {
    userDAO.save(req.body).then(function(newVote) {
        res.send(newVote)
    });
});

/* GET all user listings. */
router.get('/', function(req, res) {
    userDAO.findAll().then(function(users) {
        res.send({
            users: users
        });
    }, function(error){
        console.log('error');
    });
});

/* PUT update user listing. */
router.put('/', function(req, res) {
    userDAO.update(req.body).then(function(updatedUser) {
        res.send(updatedUser);
    }, function(error) {
        console.log('did not update vote');
        res.json({
            error: error
        });
    });
});

/* DELETE user listing. */
router.delete('/', function(req, res) {
    userDAO.delete(req.param('id')).then(function() {
        res.send('successfully deleted vote');
    }, function(error) {
        console.log('did not delete vote');
        res.json({
            error: error
        });
    });
});
module.exports = router;
var express = require('express');
var router = express.Router();

//Set up Mongo
var Mongoose = require('mongoose');
var db = Mongoose.createConnection('localhost', 'mytestapp');

var Shortcut = require('../../models/Shortcut.js').Shortcut(db);
var User = require('../../models/User.js').User(db);

var shortcutDAO = require('../dao/shortcutDAO.js');

/* GET all shortcut listings. */
router.get('/', function(req, res) {
    shortcutDAO.findAll().then(function(shortcuts) {
        res.send({
            shortcuts: shortcuts
        })
    });
});

/* POST new shortcut. listing */
router.post('/', function(req, res) {
    shortcutDAO.save(req.body).then(function(newShortcut) {
        res.send(newShortcut);
    }, function(error) {
        res.json({
            error: error
        });
    });
});

/* PUT update shortcut listing. */
router.put('/', function(req, res) {
    shortcutDAO.update(req.body).then(function(shortcut) {
        res.send(shortcut);
    }, function(error) {
        res.json({
            error: error
        });

    });
});

/* DELETE shortcut listing. */
router.delete('/', function(req, res) {
    console.log('in delete');
    shortcutDAO.delete(req.param('id')).then(function() {
        res.send('successfully deleted shortcut');
    }, function(error) {
        console.log('did not delete shortcut');
        res.json({
            error: error
        });
    });
});


var authentication = require('../authentication.js');
router.use('/vote', authentication);

/* POST vote up or down*/
router.post('/vote', function(req, res) {
    Shortcut.findOne({
        _id: req.body._id
    }, function(error, shortcut) {
        if (error || !shortcut) {
            res.json({
                error: error
            });
        } else {
            if (req.body.direction == 'up') {
                //shortcut.votes.push(req.body.user_id);
                shortcut.upvotes += 1;
                recordUserVote(req.body.user_id, req.body.direction);
                //shortcut.upvotes += 1;
            } else if (req.body.direction == 'down') {
                shortcut.downvotes += 1;
            }
            shortcut.save(function(error, shortcut) {
                if (error || !shortcut) {
                    res.json({
                        error: error
                    });
                } else {
                    res.send(shortcut);
                }
            });
        }
    })
});

function recordUserVote(id, direction) {
    User.findOne({
        user_id: id
    }, function(error, user) {
        if (error || !user) {
            console.log('unable to record vote in user');
            console.log(error);
        } else {
            user.votes.push(id);
            user.save(function(error, user) {
                if (error || !user) {
                    console.log('unable to record vote in user');
                    console.log(error);
                } else {
                    console.log('vote recorded');
                }
            });
        }
    });
}

module.exports = router;
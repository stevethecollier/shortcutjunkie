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
    Shortcut.find({}, function(error, shortcuts) {
        res.send({
            title: 'shortcut page',
            shortcuts: shortcuts
        });
    });
});

/* POST new shortcut. listing */
router.post('/', function(req, res) {
    var newShortcut = new Shortcut(req.body);
    //default 0 upvotes and downvotes
    newShortcut.upvotes = 0;
    newShortcut.downvotes = 0;
    newShortcut.save(function(error, newShortcut) {
        if (error || !newShortcut) {
            res.json({
                error: error
            });
        } else {
            res.send(newShortcut);
        }
    });
});

/* PUT update shortcut listing. */
router.put('/', function(req, res) {
    var requestShortcut = req.body;
    Shortcut.findOne({
        _id: requestShortcut._id
    }, function(error, shortcut) {
        if (error || !shortcut) {
            res.json({
                error: error
            });
        } else {
            shortcut.application = requestShortcut.application,
            shortcut.operatingSystem = requestShortcut.operatingSystem,
            shortcut.keyset = requestShortcut.keyset,
            shortcut.description = requestShortcut.description
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

/* DELETE shortcut listing. */
router.delete('/', function(req, res) {
    Shortcut.findOne({
        _id: req.param('id')
    }, function(error, shortcut) {
        if (error || !shortcut) {
            res.json({
                error: error
            });
        } else {
            shortcut.remove(function(error, shortcut) {
                if (error || !shortcut) {
                    res.json({
                        error: error
                    });
                } else {
                    //TODO add a message for successfully deleting the shortcut 
                    res.send('successfully deleted shortcut');
                }
            })
        }
    })
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
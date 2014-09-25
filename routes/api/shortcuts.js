var express = require('express');
var router = express.Router();

var shortcuts = [{
    application: 'OS X',
    operatingSystem: 'OS X',
    keyset: 'ctrl + c',
    description: 'copy text'
}, {
    application: 'Sublime',
    operatingSystem: 'Windows',
    keyset: 'ctrl + /',
    description: 'Toggle comment'
}];


/* GET users listing. */
router.get('/', function(req, res) {
	res.send({
	    title: 'shortcut page',
	    shortcuts: shortcuts
	});
});

router.post('/', function(req, res){
	res.send(req.body);
});

module.exports = router;
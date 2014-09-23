var express = require('express');
var router = express.Router();

var shortcuts = require('./shortcuts');

// /* render partials to include */
// router.get('/partials/:name', function(req, res){
// 	console.log('calling partials function');
// 	var name = req.params.name;
// 	res.render('partials/' + name);
// });

/* GET users listing. */
router.use('/shortcuts', shortcuts.page);

module.exports = router;

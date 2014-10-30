var jwt = require('express-jwt');

//Auth0 JWT
var jwtCheck = jwt({
    secret: new Buffer('ATIHQozqBgmJcy0OnxXEXiS8ZD2if0QSIBSqLRNEyLqv-FG0O5tNsqsBvx9du1n-', 'base64'),
    audience: 'ko7shLb1fQmFoYzMBGXUpSaNKGeeQ9HK'
});

module.exports = jwtCheck;
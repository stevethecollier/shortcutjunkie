
var es = require('elasticsearch'),
    config = require('../config');

var client = new es.Client({
    host: config.elasticsearch.host,
    log: config.elasticsearch.log
});

console.log('client created');

module.exports = {
    client: client,
    index: config.elasticsearch.index,
    type: config.elasticsearch.type
};

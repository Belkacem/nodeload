var http = require('http'),
    nlhttp = require('../lib/http'),
    HTTP_SERVER = nlhttp.HTTP_SERVER;

module.exports = {
    'example: add a new route': function(assert, beforeExit) {
        var done = false;
        HTTP_SERVER.start();
        HTTP_SERVER.on('^/route', function() {
            done = true;
            HTTP_SERVER.stop();
        });

        var client = http.createClient(8000, '127.0.0.1'),
            req = client.request('GET', '/route/item');
        req.end();
        
        beforeExit(function() {
            assert.ok(done, 'Never got request to /route');
        });
    },
    'test file server finds package.json': function(assert, beforeExit) {
        var done = false;
        HTTP_SERVER.start();
        var client = http.createClient(8000, '127.0.0.1'),
            req = client.request('GET', '/package.json');
        req.end();
        req.on('response', function(res) {
            assert.equal(res.statusCode, 200);
            res.on('data', function(chunk) {
                done = true;
                HTTP_SERVER.stop();
            });
        });

        beforeExit(function() {
            assert.ok(done, 'Never got response data from /package.json');
        });
    },
};
const assert = require('assert');
const request = require('request');
const Router = require('../src/Router');
const Server = require('../src/Server');

// TODO test query string data
// TODO test post body data
// TODO test url path vars
// TODO test changing the Content-Type header
// TODO test unknown route

describe.only('Server', () => {
    const baseUrl = 'http://localhost:1337';

    let router = null;
    let server = null;

    before(done => {
        router = new Router();
        server = new Server(router);
        server.start().then(done);
    });

    after((done) => {
        server.stop().then(done);
    });

    it('should 404 for undefined route', done => {
        request.get(`${baseUrl}/unkown`, (err, response) => {
            assert.equal(response.statusCode, 404);
            done();
        });
    });

});

const assert = require('assert');
const request = require('request');
const Router = require('../src/Router');
const Server = require('../src/Server');

describe('Server', () => {
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

    it('should have query string data', done => {
        router.get('/queryParams', (requestData, respondWith) => {
            let  { queryParams } = requestData;

            respondWith(200, queryParams.test);
        });

        request.get(`${baseUrl}/queryParams?test=data`, (err, response) => {
            assert.equal(response.statusCode, 200);
            assert.equal(response.body, '"data"');
            done();
        });
    });

    it('should have request body data', done => {
        router.post('/postData', (requestData, respondWith) => {
            let  { body } = requestData;

            respondWith(200, body.test);
        });

        request.post({url: `${baseUrl}/postData`, json: {test: 'data'}}, (err, response) => {
            assert.equal(response.statusCode, 200);
            assert.equal(response.body, 'data');
            done();
        });
    });

    it('should be able to have path params', done => {
        router.get('/pathParams/:id/test', (requestData, respondWith) => {
            let {pathParams} = requestData;

            respondWith(200, pathParams.id);
        });

        request.get(`${baseUrl}/pathParams/2/test`, (err, response) => {
            assert.equal(response.statusCode, 200);
            assert.equal(response.body, '"2"');
            done();
        });
    });

    it('should be able to have multiple path params', done => {
        router.get('/pathParams/:id/test/:another', (requestData, respondWith) => {
            let {pathParams} = requestData;

            respondWith(200, pathParams.id + pathParams.another);
        });

        request.get(`${baseUrl}/pathParams/2/test/something`, (err, response) => {
            assert.equal(response.statusCode, 200);
            assert.equal(response.body, '"2something"');
            done();
        });
    });

    it('should be able to change content-type', done => {
        router.get('/contentTypePlain', (requestData, respondWith) => {
            respondWith(200, 'text', 'text/plain');
        });

        request.get({url: `${baseUrl}/contentTypePlain`, json: {test: 'data'}}, (err, response) => {
            assert.equal(response.statusCode, 200);
            assert.equal(response.headers['content-type'], 'text/plain');
            done();
        });
    });

});

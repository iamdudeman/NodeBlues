const assert = require('assert');
const Router = require('../src/Router');

describe('Router', () => {
    let router = null;

    beforeEach(() => {
        router = new Router();
    });

    it('should route get', () => {
        assertRoute('get', '/test', () => {});
    });

    it('should route post', () => {
        assertRoute('post', '/test', () => {});
    });

    it('should route put', () => {
        assertRoute('put', '/test', () => {});
    });

    it('should route delete', () => {
        assertRoute('delete', '/test', () => {});
    });


    function assertRoute(method, route, cb) {
        router[method](route, cb);
        
        assert.equal(router.routes[method][route], cb);
    }
});


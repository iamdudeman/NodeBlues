const assert = require('assert');
const Router = require('../src/Router');

describe('Router', () => {
    let router = null;

    beforeEach(() => {
        router = new Router();
    });

    it('should be able to route a registered route', () => {
        let cb = () => {};

        router.routes.get['/test'] = cb;
        
        let routeCallback = router.route('GET', '/test');

        assert.equal(routeCallback, cb);
    });

    it('should be able to register get routes', () => {
        assertRoute('get', '/test', () => {});
    });

    it('should be able to register post routes', () => {
        assertRoute('post', '/test', () => {});
    });

    it('should be able to register put routes', () => {
        assertRoute('put', '/test', () => {});
    });

    it('should be able to register delete routes', () => {
        assertRoute('delete', '/test', () => {});
    });


    function assertRoute(method, route, cb) {
        router[method](route, cb);
        
        assert.equal(router.routes[method][route], cb);
    }
});

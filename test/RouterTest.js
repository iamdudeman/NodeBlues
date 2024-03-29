const assert = require('assert');
const Router = require('../src/Router');

describe('Router', () => {
    let router = null;

    beforeEach(() => {
        router = new Router();
    });

    describe('routing', () => {
        it('should be able to route a registered route', () => {
            let cb = () => {};

            router.routes.get['/test'] = cb;

            let routeCallback = router.route('GET', '/test').callback;

            assert.equal(routeCallback, cb);
        });

        it('should be able to route with url params', () => {
            let cb = () => {};

            router.routes.get['/test/:id/rawr/:mytest'] = cb;

            let routeCallback = router.route('GET', '/test/12/rawr/heya').callback;

            assert.equal(routeCallback, cb);
        });

        it('should not route if incorrect path', () => {
            router.routes.get['/test/:id/rawr/:mytest'] = () => {};

            let routeCallback = router.route('GET', '/test/12/wrong/heya').callback;

            assert.equal(routeCallback, undefined);
        });

        it('should return pathParams if there are any', () => {
            router.routes.get['/test/:id/rawr/:mytest'] = () => {};

            let pathParams = router.route('GET', '/test/12/rawr/heya').pathParams;

            assert.equal(pathParams.id, 12);
            assert.equal(pathParams.mytest, 'heya');
        });

        it('should be able to handle pathParams with - and .', () => {
            router.routes.get['/test/:id/rawr/:mytest'] = () => {};

            let pathParams = router.route('GET', '/test/12-2/rawr/hey.a').pathParams;

            assert.equal(pathParams.id, '12-2');
            assert.equal(pathParams.mytest, 'hey.a');
        });
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

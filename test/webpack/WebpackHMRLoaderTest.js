const assert = require('assert');
const webpackHMRLoader = require('../../src/webpack/WebpackHMRLoader');

describe('WebpackHMRLoader', () => {
    let cacheableCalled = false;
    let webpackThisContext = {
        query: {
            host: 'localhost',
            port: 1338
        },
        cacheable: () => {
            cacheableCalled = true;
        }
    };

    beforeEach(() => {
        cacheableCalled = false;
    });

    it('Should call cacheable and add enableHMR call to host:port', () => {
        let webpackHMRLoaderBound = webpackHMRLoader.bind(webpackThisContext);
        let result = webpackHMRLoaderBound('let blah = 1;');

        assert.equal(cacheableCalled, true);
        assert.equal(result, 'let blah = 1; import { enableHMR } from \'nodeblues/browser\'; enableHMR(\'localhost\', 1338);');
    });
});

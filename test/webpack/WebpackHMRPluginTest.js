const assert = require('assert');
const WebpackHMRPlugin = require('../../src/webpack/WebpackHMRPlugin');

describe('WebpackHMRPlugin', () => {
    it('should have onBuildExit', () => {
        let plugin = new WebpackHMRPlugin('localhost', 1337);

        assert.equal(plugin.options.onBuildExit.length, 1);
        assert.equal(plugin.options.onBuildExit[0], 'node ./triggerHMR.js localhost 1337');
    });
});

const assert = require('assert');
const WebpackHMRPlugin = require('../../src/webpack/WebpackHMRPlugin');

describe('WebpackHMRPlugin', () => {
    it('should have onBuildExit', done => {
        let plugin = new WebpackHMRPlugin('localhost', 1337);

        const WebSocket = require('ws');
        const wss = new WebSocket.Server({ port: 1337 });

        wss.on('connection', (ws) => {
            ws.on('message', (data) => {
                assert(JSON.parse(data).HMR, true);
                done();
            });
        });

        plugin.callback();
    });
});

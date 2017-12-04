const WebpackOnBuildPlugin = require('on-build-webpack');

module.exports = function createWebpackHMRPlugin(host, port) {
    return new WebpackOnBuildPlugin(() => {
        const WebSocket = require('ws');
        const ws = new WebSocket(`ws://${host}:${port}`);

        ws.on('open', () => {
            ws.on('message', data => {
                if (JSON.parse(data).HMR) {
                    ws.terminate();
                }
            });
            ws.send(JSON.stringify({HMR: true}));
        });
    });
};

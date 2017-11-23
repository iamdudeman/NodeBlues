const assert = require('assert');
const child_process = require('child_process');

describe('triggerHMR', () => {
    it('should open a socket on host and port', done => {
        const WebSocket = require('ws');
        const wss = new WebSocket.Server({ port: 1337 });

        wss.on('connection', (ws) => {
            ws.on('message', (data) => {
                assert(JSON.parse(data).HMR, true);
                done();
            });
        });

        child_process.fork('./src/webpack/triggerHMR', ['localhost', 1337]);        
    });
});

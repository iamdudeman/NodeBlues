const host = process.argv[2];
const port = process.argv[3];

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

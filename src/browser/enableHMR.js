module.exports = function enableHMR(host, port) {
    var socket = new WebSocket(`ws://${host}:${port}`);
 
    socket.addEventListener('message', function (event) {
        if (JSON.parse(event.data).HMR) {
            location.reload();
        }
    });
};

const Database = require('./Database');
const Router = require('./Router');
const Server = require('./Server');

const host = 'localhost';
const port = 1337;

let database = new Database();
let router = new Router();

router.get('/test', (requestData, respondWith) => {
    let data = database.get('test');

    respondWith(200, {data});
});

router.post('/test', (requestData, respondWith) => {
    let value = requestData.body.test;

    database.set('test', value);
    database.save();

    respondWith(200);
});

let server = new Server(router);

server.start(host, port);

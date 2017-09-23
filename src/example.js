const Database = require('./Database');
const Router = require('./Router');
const Server = require('./Server');

// Create a database that we can access from our route callbacks
let database = new Database();

// NOTE: If you want data to persist after restarting the server
database.load();



// Define some routes
let router = new Router();

router.get('/test', (requestData, respondWith) => {
    let data = database.get('test');

    respondWith(200, {data});
});

router.post('/test', (requestData, respondWith) => {
    let value = requestData.body.test;

    database.set('test', value);

    // NOTE: Only needed if you want ot persist data
    database.save();

    respondWith(200);
});

router.get('/test/:id', (requestData, respondWith) => {
    let value = requestData.pathParams.id;

    respondWith(200, value);
});


// Create our server and start it
const host = 'localhost';
const port = 1337;
let server = new Server(router);

server.start(host, port).then(() => {
    console.log(`Running on http://${host}:${port}`); // eslint-disable-line no-console    
});

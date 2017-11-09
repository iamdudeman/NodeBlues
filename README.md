# NodeBlues
NodeBlues is a node server targetted at rapid prototyping. It has two main focusses
1. Make handling request data and sending responses quick and easy
2. Make persisting data quick and easy

By registering a callback to a route in the Router you will have access to a requestData object that contains the body, query parameters, and the url parameters that were used for the request. You can then send a response by using the "respondWith" function to send a response after you process the request data.

If you want to persist data you can use a Database instance. You can load data every time your server starts to keep testing data or you can ignore that step and have a fresh testing environment every time the server starts. By calling the save function before a route calls "respondWith" you can save the current state of the database.

Link to [JSDocs](https://iamdudeman.github.io/NodeBlues/ "NodeBlues Docs")
---


# Installation
```
$ npm install nodeblues --save-dev
```
---


# Run Example Code or Tests
```
$ npm install # Must be run before running tests
$ npm test    # Runs all tests
$ npm start   # Runs example server

```

# Hello World

```
const {Router, Server} = require('nodeblues');

let router = new Router();
let server = new Server(router);

router.get('/', (requestData, respondWith) => {
    respondWith(200, 'Hello World!');
});

server.start('localhost', 1337);

```


# Example Code
```
const {Database, Router, Server} = require('nodeblues');

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

    // NOTE: Only needed if you want to persist data after restarting the server
    database.save();

    // NOTE: Add a cookie if desired
    requestData.cookieJar.set('testCookie', 'testValue');

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

```


## requestData
This object is passed into the route callbacks and contains the body, pathParams, and queryParams from
the request.

```
requestData.body         // Object/String containing the body from the request
requestData.cookieJar    // CookieJar object that can be used to "set" cookies for the response
requestData.pathParams   // Object containing all path parameters
requestData.queryParams  // Object containing the query params
```


## respondWith
This function is passed into the route callbacks and is used to fire off a response. You can pass in a statusCode,
responseData, and/or a contentType header to use.

```
let respondWith = function respondWith (statusCode = 200, responseData = '', contentType = 'text/json') {
    res.statusCode = statusCode;
    res.setHeader('Content-Type', contentType);
    res.setHeader('Cookie', cookieJar.toHeader());
    res.end(JSON.stringify(responseData));
};
```

### For Those Curious
NodeBlues was named after a character from one of my favorite game series Megaman. The character's name in America was Protoman, *prototyping*, but in Japan he was called Blues.

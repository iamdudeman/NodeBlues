# NodeBlues
NodeBlues is a node server targeted at rapid prototyping. It has two main focuses
1. Make handling request data and sending responses quick and easy
2. Make persisting data quick and easy

By registering a callback to a route in the Router you will have access to a requestData object that contains the body, query parameters, and the url parameters that were used for the request. You can then send a response by using the "respondWith" function to send a response after you process the request data.

If you want to persist data you can use a Database instance. You can load data every time your server starts to keep testing data, or you can ignore that step and have a fresh testing environment every time the server starts. By calling the save function before a route calls "respondWith" you can save the current state of the database.

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

// Access request body data and save db changes
router.post('/test', (requestData, respondWith) => {
    let value = requestData.body.test;

    database.set('test', value);

    // NOTE: Only needed if you want to persist data after restarting the server
    database.save();

    // NOTE: Add a cookie if desired
    requestData.cookieJar.set('testCookie', 'testValue');

    respondWith(200);
});

// Access path params data
router.get('/test/:id', (requestData, respondWith) => {
    let value = requestData.pathParams.id;

    respondWith(200, value);
});

// Example of returning files
router.get('/:filename', (requestData, respondWith) => {
    let pathToFile = requestData.pathParams.filename;
    let mimeType = pathToFile.endsWith('.js') ? 'application/javascript' : 'text/html';

    // NOTE: need to require in 'fs' dependency here
    fs.readFile(pathToFile, 'utf8', (err, html) => {
        if (err) {
            respondWith(400, `Something bad happened [${err}]`, 'text/plain');
        } else {
            respondWith(200, html, mimeType);
        }
    });
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

## Hot Module Reloading
NodeBlues makes hot module reloading with Webpack a breeze! Import WebpackHMRPlugin and include it in your webpack config. The port for hot module reloading will be 1 above what you set the server as. By default uses port 1337 so you will want to use 1338 for HMR. Then add in the hmr-loader and point it to one of your files (typically your entry point file) with the host and port defined as query parameters. Then you're all set! No changes to any source code needed! Then you can easily remove HMR from your production build using your webpack config file!

NOTE: The 'hmr-loader' should be run before any other loaders to ensure it functions properly.

```
const WebpackHMRPlugin = require('nodeblues/webpack').WebpackHMRPlugin;

{
    module: {
        loaders: [
            {
                test: ENTRY_FILE, // Path to your one entry file so it's only added once
                loader: 'nodeblues/hmr-loader',
                query: {
                    host: 'localhost',
                    port: 1338
                }
            }
        ]
    },
    plugins: [
        new WebpackHMRPlugin('localhost', 1338)
    ]
}
```

Then when creating your Server instance be sure to pass in a true for the second parameter
```
const {Database, Router, Server} = require('nodeblues');

let router = new Router();
let server = new Server(router, true);
```

### For Those Curious
NodeBlues was named after a character from one of my favorite game series Megaman. The character's name in America was Protoman, *prototyping*, but in Japan he was called Blues.



# TODO List
1. Add an easy tool for testing api routes

const http =  require('http');
const url = require('url');

const hostname = 'localhost';
const port = 1337;
const server = http.createServer((req, res) => {
    let urlParts = url.parse(req.url, true);
    let queryParams = urlParts.query;
    let pathname = urlParts.pathname;

    console.log(urlParts);
    console.log(queryParams);


    let body = [];

    req.on('data', chunk => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString(); 

        let requestData = {
            body,
            query: queryParams
        };

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/json');
        res.end(JSON.stringify({woot: 'test', body}));
    
    }).on('error', err => {
      console.error(err.stack);  
    });



});


server.listen(port, hostname, () => {
    console.log(`Running on http://${hostname}:${port}`);
});

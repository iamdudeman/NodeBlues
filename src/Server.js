const http =  require('http');
const url = require('url');


class Server {
    constructor(router) {
        this.router = router;
    }

    start(host, port) {

        const server = http.createServer((req, res) => {
            let respondWith = (statusCode, responseData = '', contentType = 'text/json') => {
                res.statusCode = statusCode;
                res.setHeader('Content-Type', contentType);
                res.end(JSON.stringify(responseData));
            };

            let urlParts = url.parse(req.url, true);
            let queryParams = urlParts.query;    
            let pathname = urlParts.pathname;
            let method = req.method;
        
            // TODO path params

            console.log(queryParams);
            console.log(method, pathname);
        
            let body = '';
        
            req.on('data', (data) => {
                body += data;
            }).on('end', () => {
                try {
                    body = JSON.parse(body); 
                } catch (error) {
                    body = {};
                }

                let requestData = {
                    body,
                    query: queryParams
                };

                // TODO logic if router path not found
                let routeCallback = this.router.route(method, pathname);
                
                routeCallback(requestData, respondWith);


                // res.statusCode = 200;
                // res.setHeader('Content-Type', 'text/json');
                // res.end(JSON.stringify({woot: 'test', body}));
            
            }).on('error', err => {
              console.error(err.stack);  
            });
        
        
        
        });
        
        
        server.listen(port, host, () => {
            console.log(`Running on http://${host}:${port}`); // eslint-disable-line no-console
        });
        
    }
}

module.exports = Server;

const http =  require('http');
const url = require('url');

/**
 * Server handles listening to a host and port, passing request data to Router routes, and
 * passing a respondWith method to registered routes.
 */
class Server {
    /**
     * Create a Server instance.
     * 
     * @param {Router} router - The Router to be used for this Server
     */
    constructor(router) {
        this.router = router;
    }

    /**
     * Start this Server for a host on a port.
     * 
     * @param {string} host - The host
     * @param {number} port - The port
     */
    start(host = 'localhost', port = 1337) {

        const server = http.createServer((req, res) => {
            let respondWith = function respondWith (statusCode = 200, responseData = '', contentType = 'text/json') {
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
 
            }).on('error', err => {
                // TODO handle error better
              console.error(err.stack);  
            });
        
        });
        
        
        server.listen(port, host, () => {
            console.log(`Running on http://${host}:${port}`); // eslint-disable-line no-console
        });
        
    }
}

module.exports = Server;

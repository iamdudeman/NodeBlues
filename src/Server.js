const http =  require('http');
const url = require('url');

// TODO handle path params


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
        this.server = null;
    }

    /**
     * Stops the server.
     */
    stop() {
        return new Promise((resolve) => {
            this.server.close().on('close', () => {
                resolve();
            });
        });
    }

    /**
     * Start this Server for a host on a port.
     * 
     * @param {string} host - The host
     * @param {number} port - The port
     */
    start(host = 'localhost', port = 1337) {
        return new Promise((resolve) => {
            this.server = http.createServer((req, res) => {
                let respondWith = function respondWith (statusCode = 200, responseData = '', contentType = 'text/json') {
                    res.statusCode = statusCode;
                    res.setHeader('Content-Type', contentType);
                    res.end(JSON.stringify(responseData));
                };
    
                let urlParts = url.parse(req.url, true);
                let queryParams = urlParts.query;    
                let pathname = urlParts.pathname;
                let method = req.method;
            
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
                        queryParams
                    };
    
                    let routeCallback = this.router.route(method, pathname);

                    routeCallback ? routeCallback(requestData, respondWith) : respondWith(404, 'Route not found');
                }).on('error', err => {
                    console.error(err.stack); // eslint-disable-line no-console
                });
            
            });
            
            
            this.server.listen(port, host, () => {
                resolve();            
            });
    
        });
    }
}

module.exports = Server;

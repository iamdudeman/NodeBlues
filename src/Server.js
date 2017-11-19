const CookieJar = require('./CookieJar');
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
        this.server = null;
    }

    /**
     * Stops the server.
     *
     * @returns {Promise} A promise that resolves when the server has stopped
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
     * @returns {Promise} A promise that resolves when the server has started
     */
    start(host = 'localhost', port = 1337) {
        return new Promise((resolve) => {
            this.server = http.createServer((req, res) => {
                let cookieJar = new CookieJar();
                let respondWith = function respondWith (statusCode = 200, responseData = '', contentType = 'text/json') {
                    let responseText = typeof responseData === 'string' ? responseData : JSON.stringify(responseData);

                    res.statusCode = statusCode;
                    res.setHeader('Content-Type', contentType);
                    res.setHeader('Cookie', cookieJar.toHeader());
                    res.end(responseText);
                };

                let urlParts = url.parse(req.url, true);
                let queryParams = urlParts.query;
                let pathname = urlParts.pathname;
                let method = req.method;
                let body = '';

                cookieJar.addCookiesFromHeader(req.headers['cookie']);
                req.on('data', (data) => {
                    body += data;
                }).on('end', () => {
                    try {
                        body = JSON.parse(body);
                    } catch (error) {
                        body = {};
                    }

                    let route = this.router.route(method, pathname);
                    let routeCallback = route.callback;
                    let requestData = {
                        body,
                        cookieJar,
                        pathParams: route.pathParams,
                        queryParams
                    };

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

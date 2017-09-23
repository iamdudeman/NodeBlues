/**
 * Router contains all route definitions for the Server to use.
 */
class Router {
    /**
     * Create a Router instance.
     */
    constructor() {
        this.routes = {
            get: {},
            post: {},
            put: {},
            delete: {}
        };
    }

    /**
     * Returns the callback for the route defined by the method and path.
     * 
     * @param {string} method - The http method used (GET, POST, etc)
     * @param {string} path - The path for the route
     * @return {function} The function registered for the desired route
     */
    route(method, path) {
        let methodRoutes = this.routes[method.toLowerCase()];

        const PATH_PARAM_PATTERN=/\/:[a-zA-Z0-9]+/g;
        const REPLACE_PATTERN='/[a-zA-Z0-9]*';

        let methodPath = Object.keys(methodRoutes).filter(routePath => {
            let routePathWithPattern = new RegExp(routePath.replace(PATH_PARAM_PATTERN, REPLACE_PATTERN));

            return routePathWithPattern.test(path);
        })[0];

        return methodRoutes[methodPath];
    }

    /**
     * Register a callback for a GET route.
     * Callback with receive params (requestData, respondWith)
     * requestData is an object with various request data like "body"
     * respondWith is a function that takes (statusCode = 200, responseData = '', contentType = 'text/json')
     * 
     * @param {string} path - The path
     * @param {function} callback - The callback
     */
    get(path, callback) {
        this.routes.get[path] = callback;
    }

    /**
     * Register a callback for a POST route.
     * Callback with receive params (requestData, respondWith)
     * requestData is an object with various request data like "body"
     * respondWith is a function that takes (statusCode = 200, responseData = '', contentType = 'text/json')
     * 
     * @param {string} path - The path
     * @param {function} callback - The callback
     */
    post(path, callback) {
        this.routes.post[path] = callback;        
    }

    /**
     * Register a callback for a PUT route.
     * Callback with receive params (requestData, respondWith)
     * requestData is an object with various request data like "body"
     * respondWith is a function that takes (statusCode = 200, responseData = '', contentType = 'text/json')
     * 
     * @param {string} path - The path
     * @param {function} callback - The callback
     */
    put(path, callback) {
        this.routes.put[path] = callback;        
    }

    /**
     * Register a callback for a DELETE route.
     * Callback with receive params (requestData, respondWith)
     * requestData is an object with various request data like "body"
     * respondWith is a function that takes (statusCode = 200, responseData = '', contentType = 'text/json')
     * 
     * @param {string} path - The path
     * @param {function} callback - The callback
     */
    delete(path, callback) {
        this.routes.delete[path] = callback;        
    }
}

module.exports = Router;

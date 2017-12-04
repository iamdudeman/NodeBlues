const PATH_PARAM_KEY_PATTERN=/\/:([a-zA-Z0-9]+)/g;
const PATH_PARAM_VALUE_PATTERN='/([a-zA-Z0-9]*)';

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
     * @param {string} path - The path being called
     * @return {function} The function registered for the desired route
     */
    route(method, path) {
        let methodRoutes = this.routes[method.toLowerCase()];
        let pathParams = {};
        let methodPath = Object.keys(methodRoutes).filter(routePath => {
            let pathParamValuesRegEx = new RegExp('^' + routePath.replace(PATH_PARAM_KEY_PATTERN, PATH_PARAM_VALUE_PATTERN) + '$');
            let doesMatch = pathParamValuesRegEx.test(path);

            if (doesMatch) {
                let pathParamKeys = [];
                let match;
                while (match = PATH_PARAM_KEY_PATTERN.exec(routePath)) { // eslint-disable-line no-cond-assign
                    pathParamKeys.push(match[1]);
                }

                // I'm not sure why the values regex doesn't need the loop but the keys do
                let pathParamValues = pathParamValuesRegEx.exec(path);

                if (pathParamKeys) {
                    for (let i = 0; i < pathParamKeys.length; i++) {
                        pathParams[pathParamKeys[i]] = pathParamValues[i + 1];
                    }
                }

                return true;
            }

            return false;
        })[0];

        return {
            callback: methodRoutes[methodPath],
            pathParams
        };
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

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

    route(method, path) {
        return this.routes[method.toLowerCase()][path];
    }

    get(path, callback) {
        this.routes.get[path] = callback;
    }

    post(path, callback) {
        this.routes.post[path] = callback;        
    }

    put(path, callback) {
        this.routes.put[path] = callback;        
    }

    delete(path, callback) {
        this.routes.delete[path] = callback;        
    }
}

module.exports = Router;

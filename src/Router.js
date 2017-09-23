class Router {
    constructor() {
        this.routes = {
            get: {},
            post: {},
            put: {},
            delete: {}
        };
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

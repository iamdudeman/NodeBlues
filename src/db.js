const fs = require('fs');

class db {
    constructor() {
        this.data = {};
    }

    load() {
        this.data = JSON.parse(fs.readFileSync('db.json', 'utf8'));
    }

    save() {
        fs.writeFileSync('db.json', JSON.stringify(this.data));
    }

    get(key) {
        return this.data(key);
    }

    set(key, value) {
        this.data[key] = value;
    }
}

module.exports = db;
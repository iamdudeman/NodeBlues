const fs = require('fs');
const DATA_FILE = 'db.json';

/**
 * Database is a simple persistence utility that saves stored data to a json file.
 */
class Database {
    /**
     * The file the data is stored to.
     */
    static get DATA_FILE() { return DATA_FILE; }

    /**
     * Create a db object.
     */
    constructor() {
        this.data = {};
    }

    /**
     * Replaces the current state of the db with the contents from the DATA_FILE.
     */
    load() {
        this.data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    }

    /**
     * Saves the current state of the db to the DATA_FILE.
     */
    save() {
        fs.writeFileSync(DATA_FILE, JSON.stringify(this.data));
    }

    /**
     * Returns a value from the db.
     * 
     * @param {string} key - The key for the desired value
     * @return {object} The value that was stored on the key
     */
    get(key) {
        return this.data[key];
    }

    /**
     * Sets a value for a key in the db.
     * 
     * @param {*} key - The key to store to
     * @param {*} value - The value to store
     */
    set(key, value) {
        this.data[key] = value;
    }
}

module.exports = Database;

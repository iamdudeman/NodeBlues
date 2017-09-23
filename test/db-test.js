const assert = require('assert');
const DB = require('../src/db');
const fs = require('fs');

describe('db', () => {
    let db = null;

    beforeEach(() => {
        db = new DB();
    });

    describe('get/set', () => {
        it('should set data', () => {
            db.set('key', 'value');

            assert.equal(db.data.key, 'value');
        });

        it('should get data', () => {
            db.data.key = 'value';

            let value = db.get('key');

            assert.equal(value, 'value');
        });
    });

    describe('saves and reads from file system', () => {
        afterEach(() => {
            fs.unlinkSync(DB.DATA_FILE);
        });
        
        it('should save', () => {
            db.data.key = 'value';

            db.save();

            let readData = JSON.parse(fs.readFileSync(DB.DATA_FILE));

            assert.equal(readData.key, 'value');
        });

        it('should load', () => {
            fs.writeFileSync(DB.DATA_FILE, JSON.stringify({key: 'value'}));
        
            db.load();

            assert.equal(db.data.key, 'value');
        });
    });
});

const assert = require('assert');
const CookieJar = require('../src/CookieJar');

describe('CookieJar', () => {
    let cookieJar = null;

    beforeEach(() => {
        cookieJar = new CookieJar();
    });

    it('get/set cookie', () => {
        cookieJar.set('test', 'test2');

        assert.equal(cookieJar.get('test'), 'test2');
    });

    it('toHeader', () => {
        cookieJar.set('test', 'test2');
        cookieJar.set('test3', 'test4');

        assert.equal(cookieJar.toHeader(), 'test=test2;test3=test4');
    });

    it('addCookiesFromHeader', () => {
        let header = 'test=test2;test3=test4';

        cookieJar.addCookiesFromHeader(header);

        assert.equal(cookieJar.get('test'), 'test2');
        assert.equal(cookieJar.get('test3'), 'test4');
    });

    it('addCookiesFromHeader when undefined should not error', () => {
        cookieJar.addCookiesFromHeader(undefined);
    });
});

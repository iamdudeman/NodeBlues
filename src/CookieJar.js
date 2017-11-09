/**
 * CookieJar is a simple container for cookies. <br>
 * addCookiesFromHeader will take a Cookie header string from the request and parse out the cookie keys and values. <br>
 * toHeader will take all the cookies in the CookieJar and create a Cookie header string.
 */
class CookieJar {
    /**
     * Initialize and empty CookieJar.
     */
    constructor() {
        this.cookies = {};
    }

    /**
     * Add a cookie to the CookieJar.
     *
     * @param {String} key - The key of the cookie
     * @param {String} value - The value of the cookie
     */
    set(key, value) {
        this.cookies[key] = value;
    }

    /**
     * Retrieve a cookie from the CookieJar.
     *
     * @param {String} key - The key of the cookie
     */
    get(key) {
        return this.cookies[key];
    }

    /**
     * Adds all the cookies from the request's Cookie header to the CookieJar.
     *
     * @param {String} cookieHeader - The cookie header from the request
     */
    addCookiesFromHeader(cookieHeader) {
        if (!cookieHeader) return;

        let cookies = cookieHeader.split(';');

        cookies.forEach(cookie => this.set(...cookie.split('=')));
    }

    /**
     * Formats all the current cookies in the CookieJar as a string that can be set as the response Cookie header.
     */
    toHeader() {
        return Object.keys(this.cookies)
            .reduce((cookieString, cookieKey) => {
                let cookieValue = this.get(cookieKey);

                return cookieString + `;${cookieKey}=${cookieValue}`;
            }, '')
            .replace(';', '');
    }
}

module.exports = CookieJar;

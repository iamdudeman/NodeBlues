module.exports = function (source) {
    this.cacheable();
    return `${source} import { enableHMR } from 'nodeblues/browser'; enableHMR('${this.query.host}', ${this.query.port});`;
};

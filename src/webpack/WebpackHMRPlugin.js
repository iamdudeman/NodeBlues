const WebpackShellPlugin = require('webpack-shell-plugin');

module.exports = function createWebpackHMRPlugin(host, port) {
    return new WebpackShellPlugin({
        onBuildExit: [`node ./triggerHMR.js ${host} ${port}`]
    });
};

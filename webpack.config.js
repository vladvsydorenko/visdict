const { makeWebpackConfig, generatePackageConfig } = require('./webpack.make');

const PackageNames = {
    APP: 'app',
};

const packages = {
    [PackageNames.APP]: generatePackageConfig({
        name: PackageNames.APP,
        html: true,
        css: true
    }),
};

module.exports = ({ package }) => makeWebpackConfig(packages[package]);

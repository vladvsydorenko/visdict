const { makeWebpackConfig, generatePackageConfig } = require('./webpack.make');

const PackageNames = {
    CLIENT: 'client',
    SERVER: 'server',
    SERVER_UTIL_GQL: 'server-util-gql',
};

const packages = {
    [PackageNames.CLIENT]: generatePackageConfig({
        name: PackageNames.CLIENT,
        html: true,
        css: true,
        tsx: true,
    }),
    [PackageNames.SERVER]: generatePackageConfig({
        name: PackageNames.SERVER,
        html: false,
        css: false,
        tsx: false,
        node: true,
    }),
    [PackageNames.SERVER_UTIL_GQL]: generatePackageConfig({
        name: PackageNames.SERVER_UTIL_GQL,
        html: false,
        css: false,
        tsx: false,
        node: true,
    }),
};

module.exports = ({ package }) => makeWebpackConfig(packages[package]);

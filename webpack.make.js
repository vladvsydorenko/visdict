const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader');

const moduleHandlers = {
    html: (config, options) => {
        config.plugins.push(new HtmlWebpackPlugin(options));
        return config;
    },
    css: (config, options, dir) => {
        config.module.loaders.push({
            test: /\.css$/,
            include: path.join(__dirname, `${dir}/src`),
            use: [
                'style-loader',
                {
                    loader: 'typings-for-css-modules-loader',
                    options: {
                        modules: true,
                        namedExport: true
                    }
                },
                'postcss-loader'
            ]
        });
        return config;
    },

    node: (config, options, dir) => {
        config.node = {
            fs: 'empty',
            net: 'empty'
        };
        config.target = 'node';
        return config;
    }
};

exports.generatePackageConfig = function({
    name,
    html = false,
    css = false,
    tsx = false,
    node = false,
}) {
    let modules = {};

    if (html) {
        modules.html = {
            template: `./packages/${name}/${html.template ? html.template : "index.html"}`
        };
    }

    if (css) {
        modules.css = {};
    }

    if (node) {
        modules.node = {};
    }

    return {
        name,
        dir: `./packages/${name}`,
        entry: `./src/index.ts${tsx ? "x": ""}`,
        modules,
        externals: [],
        node
    }
};

exports.makeWebpackConfig = function({
    name,
    dir,
    entry = './src/index.ts',
    externals = [],
    modules = [],
    node
}) {
    const config = {
        entry: path.join(__dirname, dir, entry),
        output: {
            path: path.join(__dirname, `${dir}/dist`),
            filename: `${name}.js`,
            library: `@inless/${name}`,
            libraryTarget: 'umd',
        },
        resolve: { extensions: ['.ts', '.tsx', '.js'] },
        devtool: 'source-map',
        module: {
            loaders: [
                {
                    test: /\.tsx?$/,
                    use: [
                        {
                            loader: `awesome-typescript-loader`,
                            options: {
                                configFileName: `${dir}/tsconfig.json`
                            },
                        },
                        path.join(__dirname, 'ts-cssdts-loader'),
                    ],
                },
            ],
        },
        externals,
        plugins: [
            new CheckerPlugin(),
            new webpack.WatchIgnorePlugin([
                path.join(__dirname, `${dir}/dist`)
            ]),
        ],
    };

    return Object.keys(modules).reduce((history, key) => moduleHandlers[key](history, modules[key], dir), config);
}

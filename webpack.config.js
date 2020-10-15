const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { resolve } = require('path');

//App Directory
const appDirectory = fs.realpathSync(process.cwd());

// Get absolute path of file within app directory
const resolveAppPath = relativePath => path.resolve(appDirectory, relativePath);

// Host
const host = process.env.HOST || 'localhost';

module.exports = {
    //Environment
    mode: 'development',

    //Entry point of app
    entry: resolveAppPath('src/app.js'),

    output: {
        path: resolveAppPath('public/build'),
        filename: 'app.js'
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'app.css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,

                use: [{
                    loader: MiniCssExtractPlugin.loader,
                }, {
                    loader: 'css-loader', // translates CSS into CommonJS modules
                }, {
                    loader: 'postcss-loader', // Run postcss actions
                    options: {
                        plugins: function () { // postcss plugins, can be exported to postcss.config.js
                            return [
                                require('autoprefixer')
                            ];
                        }
                    }
                }, {
                    loader: 'sass-loader' // compiles Sass to CSS
                }]
            }
        ]
    }
};
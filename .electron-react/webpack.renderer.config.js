'use strict'

process.env.BABEL_ENV = 'renderer'

const path = require('path')
const { dependencies } = require('../package.json')
const webpack = require('webpack')

const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

let rendererConfig = {
    mode: 'development',
    devtool: 'inline-source-map',
    target: 'electron-renderer',
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
    entry: {
        renderer: path.join(__dirname, '../src/renderer/index.js')
    },
    externals: [
        ...Object.keys(dependencies || {}),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [[
                            '@babel/preset-env', {
                                targets: {
                                    esmodules: true
                                }
                            }],
                            '@babel/preset-react']
                    }
                }
            },
            {
                test: [/\.s[ac]ss$/i, /\.css$/i],
                use: [
                    // Creates `style` nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|jpeg|jpg|gif|svg)(\?.*)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: '../src/renderer/images/[name].[ext]'
                    }
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    name: 'media/[name]--[folder].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '../src/renderer/fonts/[name].[ext]'
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, '../src/index.ejs'),
            minify: {
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                removeComments: true
            },
            isBrowser: false,
            isDevelopment: process.env.NODE_ENV !== 'production',
            nodeModules: process.env.NODE_ENV !== 'production'
                ? path.resolve(__dirname, '../node_modules')
                : false
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ],
    output: {
        filename: '[name].js',
        path: path.join(__dirname, '../dist/electron')
    },
    resolve: {
        alias: {
            '@': path.join(__dirname, '../src/renderer'),
        },
        extensions: ['.js', '.json', '.css', '.node']
    }
}

/**
 * Adjust rendererConfig for development settings
 */
// if (process.env.NODE_ENV !== 'production') {
//     rendererConfig.plugins.push(
//         new webpack.DefinePlugin({
//             '__static': `"${path.join(__dirname, '../static').replace(/\\/g, '\\\\')}"`
//         })
//     )
// }

/**
 * Adjust rendererConfig for production settings
 */
// if (process.env.NODE_ENV === 'production') {
//     rendererConfig.devtool = false
//
//     rendererConfig.plugins.push(
//         new CopyWebpackPlugin([
//             {
//                 from: path.join(__dirname, '../static'),
//                 to: path.join(__dirname, '../dist/electron/static'),
//                 ignore: ['.*']
//             }
//         ]),
//         new webpack.DefinePlugin({
//             'process.env.NODE_ENV': '"production"'
//         }),
//         new webpack.LoaderOptionsPlugin({
//             minimize: true
//         })
//     )
// }

module.exports = rendererConfig

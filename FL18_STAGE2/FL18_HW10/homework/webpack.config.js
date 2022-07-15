const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
    entry: './js/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js',
        environment: {
            arrowFunction: false
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css'
        }),
        new ESLintPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
};

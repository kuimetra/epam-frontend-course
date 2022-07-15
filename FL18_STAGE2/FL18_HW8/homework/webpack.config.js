const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  entry: './js/index.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, './dist'),
    environment: {
      arrowFunction: false,
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Tools',
      template: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
    new ImageMinimizerPlugin({
      minimizer: {
        filename: () => 'optimized-[name][ext]',
        implementation: ImageMinimizerPlugin.imageminMinify,
        options: {
          plugins: [
            ['gifsicle', { interlaced: true }],
            ['jpegtran', { progressive: true }],
            ['optipng', { optimizationLevel: 5 }],
          ],
        },
      },
    }),
    new ESLintPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: 'asset',
      },
    ],
  },
};

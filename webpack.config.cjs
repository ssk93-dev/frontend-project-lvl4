// @ts-check

const path = require('path');
const Dotenv = require('dotenv-webpack');
// eslint-disable-next-line import/no-extraneous-dependencies
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const mode = process.env.NODE_ENV || 'development';

module.exports = {
  mode,
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    path: path.join(__dirname, 'dist', 'public'),
    publicPath: '/assets/',
    clean: true,
  },
  devServer: {
    compress: true,
    port: 8080,
    host: '0.0.0.0',
    publicPath: '/assets/',
    historyApiFallback: true,
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new Dotenv(),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
          publicPath: '/assets/',
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
          { loader: 'sass-loader' },
        ],
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
    ],
  },
};

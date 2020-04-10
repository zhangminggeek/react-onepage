const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  entry: path.join(__dirname, './example/src/app.jsx'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[hash:8].js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: false,
              sourceMap: false,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () =>
                autoprefixer({
                  browsers: ['last 2 version', '> 1%'],
                }),
            },
          },
          {
            loader: 'less-loader',
            options: {
              strictMath: true,
              noIeCompat: true,
              sourceMap: false,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './example/src/index.html'),
      filename: './index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  devServer: {
    port: 8000,
  },
};

/**
 * ################################
 * DO NOT EDIT, GENERATED BY YEOMAN
 * ################################
 */
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const LIB_NAME = '@codelab/component';

module.exports = {
  mode: 'development',
  entry: './index.ts',
  target: 'node',
  devtool: false,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.bundle.js',
    libraryTarget: 'umd',
    library: LIB_NAME,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' },
      },
      // Namespace not supported by babel-loader, need ts-loader to handle
      // typescript files
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          configFile: 'tsconfig.build.json',
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    // SourceMap fix for Typescript
    // https://github.com/webpack/webpack/issues/7172
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map',
      exclude: [/.*node_modules.*/],
      namespace: LIB_NAME,
      moduleFilenameTemplate: 'webpack://[namespace]/[resource-path]?[loaders]',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    modules: [
      path.resolve(__dirname, './'),
      path.resolve(__dirname, 'node_modules'),
      // Lerna installs shared packages in project root upstream
      path.resolve(__dirname, '../..', 'node_modules'),
    ],
  },
  externals: [
    'styled-components',
    'react',
    'react-dom',
    'antd',
    'formik',
    'yup',
  ],
};

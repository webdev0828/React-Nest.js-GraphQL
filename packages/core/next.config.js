// next.config.js
const webpack = require('webpack');
const withPlugins = require('next-compose-plugins');
const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const withTypescript = require('@zeit/next-typescript');
const path = require('path');
const withFonts = require('next-fonts');

/**
 * Fix for :root error loading aws-amplify-react
 * https://spectrum.chat/next-js/general/unexpected-token-error-when-importing-aws-amplify-react~ba3668b1-f0b1-42a6-9c71-d7d9d3b67f04
 *
 */
// if (typeof require !== 'undefined') {
//   require.extensions['.less'] = () => {
//   };
//   require.extensions['.css'] = file => {
//   };
// }

const nextConfig = {
  webpack(config, { dev }) {
    if (dev) {
      /**
       * Source maps
       */
      config.devtool = 'cheap-module-source-map';
      config.module.rules.push({
        test: /\.js$/,
        use: ['source-map-loader'],
        enforce: 'pre',
        exclude: [/.*node_modules.*/],
      });
    }

    // Hot reload stopped working because of an Warning when compiling files:
    // https://github.com/webpack/webpack/issues/3078
    config.plugins.push(new webpack.IgnorePlugin(/\/iconv-loader$/));

    // Typescript absolute import
    config.resolve.modules.unshift(path.resolve(__dirname));

    // Add graphql to extensions
    // config.resolve.extensions.push('.graphql');
    // config.module.rules.push({
    //   test: /\.(graphql|gql)$/,
    //   exclude: /node_modules/,
    //   loader: ['graphql-tag/loader'],
    // });

    /**
     * Styled component duplicate, resolve to project's node_modules. Add to
     * second to last.
     *
     * [ '/Users/Webber/Code/UIB/uib-next',
     '/Users/Webber/Code/UIB/uib-next/node_modules/next/node_modules',
     '/Users/Webber/Code/UIB/uib-next/node_modules',        <--------
     'node_modules'
     ]
     * https://github.com/styled-components/styled-components/issues/1076#issuecomment-390837273
     */
    config.resolve.modules.unshift(path.resolve(__dirname, 'node_modules'));

    // Look in workspace root last
    config.resolve.modules.unshift(
      path.resolve(__dirname, '../../node_modules'),
    );

    return config;
  },
};

module.exports = withPlugins(
  [withTypescript, withCSS, withSass, withFonts],
  nextConfig,
);

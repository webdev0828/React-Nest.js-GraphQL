const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (baseConfig, env, config) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve('awesome-typescript-loader'),
      },
      {
        loader: require.resolve('react-docgen-typescript-loader'),
      },
    ],
  });

  config.module.rules.push({
    test: /\.scss$/,
    loaders: ['style-loader', 'css-loader', 'sass-loader'],
    include: path.resolve(__dirname, '../'),
  });

  config.resolve.extensions.push('.ts', '.tsx');
  //
  // Resolve absolute imports
  //
  config.resolve.modules = [
    ...(config.resolve.modules || []),
    path.resolve('./'),
  ];
  return config;
};

const path = require('path');


module.exports = ({ config }) => {
    config.module.rules.push({
        test: /\.(ts|tsx)$/,
        use: [
            {
                loader: require.resolve('awesome-typescript-loader'),
                query: {
                    configFileName: path.resolve(
                        __dirname,
                        "../",
                        "tsconfig.build.json",
                    ),
                },
            },
            // Optional
            {
                loader: require.resolve('react-docgen-typescript-loader'),
            },
        ],
    });
    config.module.rules.push({
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        include: path.resolve(__dirname, '../'),
    });
    config.resolve.extensions.push('.ts', '.tsx');
    config.resolve.modules.push(path.resolve(__dirname, "../"));
    config.resolve.modules.push(path.resolve(__dirname, "../../../", "node_modules"));
    return config;
};
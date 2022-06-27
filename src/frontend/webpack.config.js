const path = require('path');

module.exports = {
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.js$/,
                enforce: 'pre',
                use: ['source-map-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './static/scripts/'),
    },
    optimization: {
        minimize: true,
    },
    // plugins: [
    //     new webpack.DefinePlugin({
    //         "process.env": {
    //             // This has effect on the react lib size
    //             NODE_ENV: JSON.stringify("production"),
    //         },
    //     }),
    // ],
};
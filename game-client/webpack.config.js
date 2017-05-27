var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/ts/Engine/VoxelEngine.ts',
    output: {
        filename: 'bundle.js',
        path: __dirname + '/dist/',
        library: 'VoxelEngine',
        libraryTarget: 'var'
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: './src/index.html'
        })
    ],
    resolve: {
        root: './src',
        extensions: ['', '.js', '.ts'],
        modulesDirectories: ['node_modules', 'src']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    devtool: 'inline-source-map'
};
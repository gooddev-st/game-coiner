const path = require("path");

module.exports = {

    context: __dirname,
    entry: {
        client: './index',
        chat: './chat-page',
    },
    output: {
        path: path.resolve(__dirname, '../static/js'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        ],
    },
    devtool: "inline-source-map",
    watch: process.env.WEBPACK_WATCH !== "0",
    mode: "development"
    // mode: "production"
};

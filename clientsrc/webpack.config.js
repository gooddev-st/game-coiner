const path = require("path");

module.exports = {

    context: __dirname,
    entry: './index',
    output: {
        path: path.resolve(__dirname, '../static/js'),
        filename: 'client.js'
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

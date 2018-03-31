var path = require("path");

module.exports = {

    context: __dirname,
    entry: './index',
    output:{
        path: path.resolve(__dirname, '../static/js'),
        filename: 'client.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ],
    },
    devtool: "#inline-sourcemap",
    watch: true,
    mode: "development"
    // mode: "production"
}
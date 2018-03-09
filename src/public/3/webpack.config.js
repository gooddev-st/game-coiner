module.exports = {

    context: __dirname,
    entry: './client',
    output:{
        filename: 'client_build.js'
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
module.exports = {

    context: __dirname,
    entry: './main',
    output:{
        filename: 'build.js'
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
            },
            {
                test: /\.vue$/,
                include: /components/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        scss: 'vue-style-loader!css-loader!sass-loader', // <style lang="scss">
                    }
                }
            }
        ],
    },
    devtool: "#source-map",
    watch: true,
        mode: "development"
    // mode: "production"
}
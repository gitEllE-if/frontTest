module.exports = {
    devServer: {
        port: 8080,
        hot: true,
        open: false,
        proxy: 'http://localhost:5050'
    }
}
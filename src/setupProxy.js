const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
    app.use(createProxyMiddleware('/api', {
        target: 'http://192.168.104.233:8080/',
        secure: false,
        changeOrigin: true,
        pathRewrite: {
            "^/api/": "/api/"
        }
    }))
}
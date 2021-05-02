const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    // app.use(
    //     proxy('/', {
    //         target: 'http://localhost:9527',
    //         changeOrigin: true,
    //     })
    // );
    app.use(
        createProxyMiddleware('/api', {
            target: 'http://localhost:9527',
            changeOrigin: true,
            pathRewrite: {'/api': ''}
        })
    );
}